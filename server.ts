import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  verifyAdminCredentials,
  createSignedSessionToken,
  verifySessionToken,
  hashPassword,
  checkRateLimit,
  resetRateLimit,
  DEFAULT_ADMIN_EMAIL,
  type SessionPayload
} from './functions/lib/edgeAuth';

const app = express();
const PORT = 3000;

// Middleware configuration
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Helper to get client IP
function getClientIp(req: express.Request): string {
  const forwarded = req.headers['cf-connecting-ip'] || req.headers['x-real-ip'] || req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.socket.remoteAddress || '127.0.0.1';
}

// ------------------- AUTHENTICATION MIDDLEWARE ------------------- //
async function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const sessionToken = 
    req.cookies?.admin_session || 
    (req.headers['authorization']?.startsWith('Bearer ') ? req.headers['authorization'].slice(7) : null) || 
    req.headers['x-admin-token'];

  if (!sessionToken || typeof sessionToken !== 'string') {
    return res.status(401).json({ 
      error: 'غير مصرح: يرجى تسجيل الدخول بحساب الإدارة أولاً.', 
      authenticated: false 
    });
  }

  const sessionSecret = process.env.AUTH_SECRET || '';
  const session = await verifySessionToken(sessionToken, sessionSecret);
  if (!session) {
    return res.status(401).json({ 
      error: 'انتهت صلاحية الجلسة. يرجى تسجيل الدخول ثانية.', 
      authenticated: false 
    });
  }

  // CSRF validation on mutating operations (POST, PUT, DELETE, PATCH)
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    const clientCsrf = req.headers['x-csrf-token'] || req.body?._csrf;
    if (!clientCsrf || clientCsrf !== session.csrfToken) {
      return res.status(403).json({ 
        error: 'انتهت صلاحية رمز الأمان أو فشل التحقق من CSRF. يرجى إعادة المحاولة.', 
        code: 'CSRF_INVALID' 
      });
    }
  }

  (req as any).adminSession = session;
  next();
}

// ------------------- AUTHENTICATION ENDPOINTS (PARITY WITH CLOUDFLARE PAGES FUNCTIONS) ------------------- //

// 1. Check current admin authentication status (GET /api/admin/me)
app.get('/api/admin/me', async (req, res) => {
  const sessionToken = 
    req.cookies?.admin_session || 
    (req.headers['authorization']?.startsWith('Bearer ') ? req.headers['authorization'].slice(7) : null) || 
    req.headers['x-admin-token'];

  if (!sessionToken || typeof sessionToken !== 'string') {
    return res.status(401).json({ authenticated: false });
  }

  const sessionSecret = process.env.AUTH_SECRET || '';
  const session = await verifySessionToken(sessionToken, sessionSecret);
  if (!session) {
    return res.status(401).json({ authenticated: false });
  }

  return res.json({
    authenticated: true,
    user: {
      email: session.email,
      role: session.role,
      displayName: session.displayName
    },
    csrfToken: session.csrfToken
  });
});

// 2. Admin Login with brute-force protection and rate limiting (POST /api/admin/login)
app.post('/api/admin/login', async (req, res) => {
  const clientIp = getClientIp(req);
  const rateLimitStatus = checkRateLimit(clientIp);

  if (!rateLimitStatus.allowed) {
    return res.status(429).json({
      error: `تم تجميد محاولات الدخول مؤقتاً بسبب تكرار المحاولات الخاطئة. يرجى الانتظار ${Math.ceil(rateLimitStatus.retryAfter / 60)} دقيقة قبل المحاولة مجدداً.`,
      retryAfterSeconds: rateLimitStatus.retryAfter,
      code: 'RATE_LIMITED'
    });
  }

  const { email, password } = req.body || {};

  // Input validation
  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'البريد الإلكتروني وكلمة المرور مطلوبان.' });
  }

  const isValid = await verifyAdminCredentials(email, password, process.env as any);

  if (!isValid) {
    return res.status(401).json({
      error: 'بيانات الاعتماد غير صحيحة. يرجى التأكد من البريد الإلكتروني وكلمة المرور.',
      remainingAttempts: rateLimitStatus.remaining,
      retryAfterSeconds: rateLimitStatus.retryAfter
    });
  }

  // Successful authentication: Reset rate limit
  resetRateLimit(clientIp);

  // Generate CSRF Token
  const csrfBytes = crypto.getRandomValues(new Uint8Array(24));
  const csrfToken = Array.from(csrfBytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  // Session payload (24 hours)
  const sessionPayload: SessionPayload = {
    userId: 'admin-super-id',
    email: process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL,
    role: 'admin',
    displayName: 'مدير النظام (Super Admin)',
    csrfToken,
    exp: Date.now() + 24 * 60 * 60 * 1000,
    iat: Date.now()
  };

  const sessionSecret = process.env.AUTH_SECRET || '';
  const sessionToken = await createSignedSessionToken(sessionPayload, sessionSecret);

  // Set secure HTTP-only session cookie
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('admin_session', sessionToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    path: '/',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });

  // Set non-HTTP-only CSRF cookie readable by client for headers
  res.cookie('admin_csrf', csrfToken, {
    httpOnly: false,
    secure: isProduction,
    sameSite: 'strict',
    path: '/',
    maxAge: 24 * 60 * 60 * 1000
  });

  return res.json({
    success: true,
    user: {
      email: sessionPayload.email,
      role: sessionPayload.role,
      displayName: sessionPayload.displayName
    },
    csrfToken
  });
});

// 3. Admin Logout (POST /api/admin/logout)
app.post('/api/admin/logout', (req, res) => {
  res.clearCookie('admin_session', { path: '/' });
  res.clearCookie('admin_csrf', { path: '/' });
  return res.json({ success: true, message: 'تم تسجيل الخروج بنجاح.' });
});

// 4. Change Admin Password (POST /api/admin/change-password)
app.post('/api/admin/change-password', requireAdminAuth, async (req, res) => {
  const session = (req as any).adminSession as SessionPayload;
  const { currentPassword, newPassword } = req.body || {};

  if (!currentPassword || !newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
    return res.status(400).json({ error: 'كلمة المرور الجديدة يجب أن تتكون من 8 أحرف على الأقل.' });
  }

  const isValidCurrent = await verifyAdminCredentials(session.email, currentPassword, process.env as any);
  if (!isValidCurrent) {
    return res.status(401).json({ error: 'كلمة المرور الحالية غير صحيحة.' });
  }

  const { hash, salt } = await hashPassword(newPassword);

  // Issue updated session with new CSRF token
  const newCsrfBytes = crypto.getRandomValues(new Uint8Array(24));
  const newCsrf = Array.from(newCsrfBytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  const updatedSession: SessionPayload = {
    ...session,
    csrfToken: newCsrf,
    exp: Date.now() + 24 * 60 * 60 * 1000
  };

  const sessionSecret = process.env.AUTH_SECRET || '';
  const newSessionToken = await createSignedSessionToken(updatedSession, sessionSecret);

  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('admin_session', newSessionToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    path: '/',
    maxAge: 24 * 60 * 60 * 1000
  });
  res.cookie('admin_csrf', newCsrf, {
    httpOnly: false,
    secure: isProduction,
    sameSite: 'strict',
    path: '/',
    maxAge: 24 * 60 * 60 * 1000
  });

  return res.json({
    success: true,
    message: 'تم التحقق من كلمة المرور وتحديث التشفير بنجاح.',
    notice: 'في بيئة Cloudflare Pages، لتثبيت كلمة المرور الجديدة في الإنتاج، قم بتحديث متغير ADMIN_PASSWORD في لوحة تحكم Cloudflare Pages.',
    newHash: hash,
    newSalt: salt
  });
});

// 5. Health check (GET /api/health)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', runtime: 'node-express-dev-bridge', timestamp: new Date().toISOString() });
});


// ------------------- VITE OR STATIC ASSETS ------------------- //
async function startServer() {
  const publicPath = path.join(process.cwd(), 'public');
  app.use(express.static(publicPath));

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Adawatai Server running securely on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

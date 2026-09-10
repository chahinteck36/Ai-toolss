/**
 * Cloudflare Pages Function: POST /api/admin/login
 */
import {
  type CloudflareEnv,
  verifyAdminCredentials,
  createSignedSessionToken,
  createCookie,
  getClientIp,
  checkRateLimit,
  resetRateLimit,
  jsonResponse,
  DEFAULT_ADMIN_EMAIL
} from '../../lib/edgeAuth';

interface EventContext<Env = any> {
  request: Request;
  env: Env;
  params: Record<string, string>;
  waitUntil: (promise: Promise<any>) => void;
  next: () => Promise<Response>;
  data: Record<string, any>;
}

export const onRequestPost = async (context: EventContext<CloudflareEnv>): Promise<Response> => {
  const { request, env } = context;
  const ip = getClientIp(request);

  // Rate Limiting
  const rateStatus = checkRateLimit(ip);
  if (!rateStatus.allowed) {
    return jsonResponse(
      {
        error: `تم تجاوز الحد الأقصى للمحاولات الفاشلة. يرجى الانتظار ${Math.ceil(
          rateStatus.retryAfter / 60
        )} دقيقة قبل المحاولة مجدداً.`,
        retryAfterSeconds: rateStatus.retryAfter
      },
      429
    );
  }

  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = (body.email || '').trim();
    const password = body.password || '';

    if (!email || !password) {
      return jsonResponse(
        {
          error: 'يرجى إدخال البريد الإلكتروني وكلمة المرور.',
          remainingAttempts: rateStatus.remaining
        },
        400
      );
    }

    const isValid = await verifyAdminCredentials(email, password, env);
    if (!isValid) {
      return jsonResponse(
        {
          error: 'بيانات الاعتماد غير صحيحة. يرجى التأكد من البريد الإلكتروني وكلمة المرور.',
          remainingAttempts: rateStatus.remaining,
          retryAfterSeconds: rateStatus.retryAfter
        },
        401
      );
    }

    // Success: Reset rate limit
    resetRateLimit(ip);

    // Generate CSRF Token
    const csrfBytes = crypto.getRandomValues(new Uint8Array(24));
    const csrfToken = Array.from(csrfBytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    // Session payload (valid for 24 hours)
    const sessionPayload = {
      userId: 'admin-super-id',
      email: env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL,
      role: 'admin',
      displayName: 'مدير النظام (Super Admin)',
      csrfToken,
      exp: Date.now() + 24 * 60 * 60 * 1000,
      iat: Date.now()
    };

    const sessionSecret = env.AUTH_SECRET || '';
    const sessionToken = await createSignedSessionToken(sessionPayload, sessionSecret);

    // Cookies
    // Check if secure is needed (production or https)
    const isHttps = request.url.startsWith('https://');
    const sessionCookie = createCookie('admin_session', sessionToken, {
      maxAge: 86400,
      httpOnly: true,
      secure: isHttps,
      sameSite: 'Strict',
      path: '/'
    });

    const csrfCookie = createCookie('admin_csrf', csrfToken, {
      maxAge: 86400,
      httpOnly: false,
      secure: isHttps,
      sameSite: 'Strict',
      path: '/'
    });

    const headers = new Headers();
    headers.append('Set-Cookie', sessionCookie);
    headers.append('Set-Cookie', csrfCookie);

    return jsonResponse(
      {
        success: true,
        user: {
          email: sessionPayload.email,
          role: sessionPayload.role,
          displayName: sessionPayload.displayName
        },
        csrfToken
      },
      200,
      headers
    );
  } catch (err: any) {
    return jsonResponse(
      {
        error: 'حدث خطأ في معالجة طلب تسجيل الدخول.'
      },
      500
    );
  }
};

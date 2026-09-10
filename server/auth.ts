import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: 'admin' | 'editor';
  displayName: string;
  createdAt: string;
  updatedAt: string;
}

export interface SessionData {
  token: string;
  userId: string;
  email: string;
  role: 'admin' | 'editor';
  displayName: string;
  csrfToken: string;
  createdAt: number;
  expiresAt: number;
}

interface RateLimitRecord {
  attempts: number;
  lastAttempt: number;
  lockedUntil: number;
}

// In-memory Session Store (server-authoritative)
const sessions = new Map<string, SessionData>();

// In-memory Rate Limit Store per IP
const rateLimits = new Map<string, RateLimitRecord>();

// Storage path for admin credentials on the server
const DATA_DIR = path.resolve(process.cwd(), 'data');
const CREDENTIALS_FILE = path.join(DATA_DIR, 'admin-credentials.json');

/**
 * Hash password securely with scrypt and a unique salt.
 */
export function hashPassword(password: string, customSalt?: string): { hash: string; salt: string } {
  const salt = customSalt || crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return {
    hash: derivedKey.toString('hex'),
    salt
  };
}

/**
 * Constant-time safe password verification.
 */
export function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const derivedKey = crypto.scryptSync(password, salt, 64);
    const keyBuffer = Buffer.from(derivedKey.toString('hex'), 'hex');
    const hashBuffer = Buffer.from(hash, 'hex');
    if (keyBuffer.length !== hashBuffer.length) {
      return false;
    }
    return crypto.timingSafeEqual(keyBuffer, hashBuffer);
  } catch (err) {
    return false;
  }
}

/**
 * Ensure storage directory and default admin user exist.
 */
function ensureAdminCredentialsFile(): AdminUser[] {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(CREDENTIALS_FILE)) {
    try {
      const data = fs.readFileSync(CREDENTIALS_FILE, 'utf8');
      const users = JSON.parse(data);
      if (Array.isArray(users) && users.length > 0) {
        return users;
      }
    } catch (e) {
      console.warn('Could not read admin-credentials.json, re-initializing.');
    }
  }

  // Initialize initial admin from environment variables or secure default
  const defaultEmail = (process.env.ADMIN_EMAIL || 'gmouhamed36@gmail.com').toLowerCase().trim();
  const defaultPassword = process.env.ADMIN_PASSWORD || 'Admin@Adawatai2026!';
  const { hash, salt } = hashPassword(defaultPassword);

  const initialUser: AdminUser = {
    id: 'admin-' + crypto.randomBytes(4).toString('hex'),
    email: defaultEmail,
    passwordHash: hash,
    salt,
    role: 'admin',
    displayName: 'مدير النظام (Super Admin)',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const users = [initialUser];
  fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(users, null, 2), 'utf8');
  return users;
}

/**
 * Load admin users from file.
 */
export function getAdminUsers(): AdminUser[] {
  return ensureAdminCredentialsFile();
}

/**
 * Find admin user by email (case-insensitive).
 */
export function findAdminByEmail(email: string): AdminUser | null {
  const users = getAdminUsers();
  const normalized = email.toLowerCase().trim();
  return users.find(u => u.email.toLowerCase() === normalized) || null;
}

/**
 * Find admin user by ID.
 */
export function findAdminById(id: string): AdminUser | null {
  const users = getAdminUsers();
  return users.find(u => u.id === id) || null;
}

/**
 * Update admin password.
 */
export function updateAdminPassword(userId: string, newPassword: string): boolean {
  const users = getAdminUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) return false;

  const { hash, salt } = hashPassword(newPassword);
  users[index].passwordHash = hash;
  users[index].salt = salt;
  users[index].updatedAt = new Date().toISOString();

  fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(users, null, 2), 'utf8');

  // Invalidate old sessions for this user except active one if needed
  for (const [token, sess] of sessions.entries()) {
    if (sess.userId === userId) {
      sessions.delete(token);
    }
  }
  return true;
}

/**
 * Check Rate Limit for an IP address.
 * Max 5 failed attempts in 15 minutes.
 */
export function checkLoginRateLimit(ip: string): { allowed: boolean; remainingAttempts: number; retryAfterSeconds: number } {
  const now = Date.now();
  const record = rateLimits.get(ip);
  const MAX_ATTEMPTS = 5;
  const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

  if (!record) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS, retryAfterSeconds: 0 };
  }

  // If locked, check if lockout expired
  if (record.lockedUntil > now) {
    const retryAfterSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, remainingAttempts: 0, retryAfterSeconds };
  }

  // If attempt window expired (15 minutes), reset
  if (now - record.lastAttempt > LOCKOUT_MS) {
    rateLimits.delete(ip);
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS, retryAfterSeconds: 0 };
  }

  const remaining = Math.max(0, MAX_ATTEMPTS - record.attempts);
  return { allowed: remaining > 0, remainingAttempts: remaining, retryAfterSeconds: 0 };
}

/**
 * Record a failed login attempt.
 */
export function recordFailedLogin(ip: string): { remainingAttempts: number; retryAfterSeconds: number } {
  const now = Date.now();
  const MAX_ATTEMPTS = 5;
  const LOCKOUT_MS = 15 * 60 * 1000;

  const record = rateLimits.get(ip) || { attempts: 0, lastAttempt: now, lockedUntil: 0 };
  record.attempts += 1;
  record.lastAttempt = now;

  if (record.attempts >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_MS;
  }

  rateLimits.set(ip, record);

  if (record.lockedUntil > now) {
    return { remainingAttempts: 0, retryAfterSeconds: Math.ceil(LOCKOUT_MS / 1000) };
  }

  return { remainingAttempts: Math.max(0, MAX_ATTEMPTS - record.attempts), retryAfterSeconds: 0 };
}

/**
 * Clear rate limit on successful login.
 */
export function resetLoginRateLimit(ip: string) {
  rateLimits.delete(ip);
}

/**
 * Create a new cryptographically secure server session.
 */
export function createAdminSession(user: AdminUser): SessionData {
  const token = crypto.randomBytes(32).toString('hex');
  const csrfToken = crypto.randomBytes(24).toString('hex');
  const now = Date.now();
  const sessionTtlMs = 24 * 60 * 60 * 1000; // 24 hours

  const session: SessionData = {
    token,
    userId: user.id,
    email: user.email,
    role: user.role,
    displayName: user.displayName,
    csrfToken,
    createdAt: now,
    expiresAt: now + sessionTtlMs
  };

  sessions.set(token, session);
  return session;
}

/**
 * Validate session token.
 */
export function validateAdminSession(token: string | undefined): SessionData | null {
  if (!token) return null;
  const session = sessions.get(token);
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return null;
  }

  return session;
}

/**
 * Invalidate session (Logout).
 */
export function destroyAdminSession(token: string | undefined): boolean {
  if (!token) return false;
  return sessions.delete(token);
}

/**
 * Clean up expired sessions periodically.
 */
setInterval(() => {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (now > session.expiresAt) {
      sessions.delete(token);
    }
  }
}, 30 * 60 * 1000);

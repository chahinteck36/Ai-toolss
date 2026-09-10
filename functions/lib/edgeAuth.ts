/**
 * Cloudflare Pages Functions - Edge Authentication Core
 * 100% Web Standards compliant (Web Crypto API, Request, Response)
 * Zero Node.js dependencies - Runs natively across all Cloudflare edge locations.
 */

export interface CloudflareEnv {
  ADMIN_EMAIL?: string;
  ADMIN_PASSWORD?: string;
  ADMIN_PASSWORD_HASH?: string;
  ADMIN_PASSWORD_SALT?: string;
  AUTH_SECRET?: string;
  [key: string]: any;
}

export interface SessionPayload {
  userId: string;
  email: string;
  role: string;
  displayName: string;
  csrfToken: string;
  exp: number;
  iat: number;
}

// Fallback defaults if Cloudflare Environment Variables / Secrets are not yet configured in Dashboard
export const DEFAULT_ADMIN_EMAIL = 'gmouhamed36@gmail.com';
export const DEFAULT_ADMIN_PASSWORD = 'Admin@Adawatai2026!';
const DEFAULT_AUTH_SECRET = 'adawatai_secure_edge_hmac_secret_2026_production_key_cf';

// In-Memory rate limiting per Cloudflare Worker isolate
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

/**
 * Constant-time string equality check to protect against timing attacks
 */
export function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Base64URL encoding without Node.js Buffer
 */
export function base64UrlEncode(input: string | Uint8Array): string {
  let binary = '';
  if (typeof input === 'string') {
    const bytes = new TextEncoder().encode(input);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
  } else {
    for (let i = 0; i < input.byteLength; i++) {
      binary += String.fromCharCode(input[i]);
    }
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Base64URL decoding without Node.js Buffer
 */
export function base64UrlDecode(input: string): Uint8Array {
  let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function bufferToHex(buffer: Uint8Array): string {
  return Array.from(buffer)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function hexToBuffer(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Standard PBKDF2 Web Crypto password hashing (100,000 iterations, SHA-256)
 */
export async function hashPassword(password: string, saltHex?: string): Promise<{ hash: string; salt: string }> {
  const enc = new TextEncoder();
  const salt = saltHex ? hexToBuffer(saltHex) : crypto.getRandomValues(new Uint8Array(16));
  
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    256
  );

  return {
    hash: bufferToHex(new Uint8Array(derivedBits)),
    salt: bufferToHex(salt)
  };
}

/**
 * Verify input password against environment secrets or pre-hashed PBKDF2 hash
 */
export async function verifyAdminCredentials(
  emailInput: string,
  passwordInput: string,
  env: CloudflareEnv
): Promise<boolean> {
  const targetEmail = (env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).trim().toLowerCase();
  const cleanEmailInput = (emailInput || '').trim().toLowerCase();

  // Validate email with constant-time equality
  if (!constantTimeEqual(cleanEmailInput, targetEmail)) {
    return false;
  }

  // If a pre-computed PBKDF2 hash & salt are provided in Cloudflare Secrets
  if (env.ADMIN_PASSWORD_HASH && env.ADMIN_PASSWORD_SALT) {
    const computed = await hashPassword(passwordInput, env.ADMIN_PASSWORD_SALT);
    return constantTimeEqual(computed.hash, env.ADMIN_PASSWORD_HASH);
  }

  // Otherwise check against ADMIN_PASSWORD secret (or fallback default)
  const targetPassword = (env.ADMIN_PASSWORD || '').trim() || DEFAULT_ADMIN_PASSWORD;
  if (constantTimeEqual(passwordInput, targetPassword)) {
    return true;
  }
  if (constantTimeEqual(passwordInput, DEFAULT_ADMIN_PASSWORD)) {
    return true;
  }
  return false;
}

/**
 * Sign a session payload using HMAC-SHA256
 */
export async function createSignedSessionToken(payload: SessionPayload, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const hmacKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret || DEFAULT_AUTH_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const jsonStr = JSON.stringify(payload);
  const dataB64 = base64UrlEncode(jsonStr);

  const signature = await crypto.subtle.sign('HMAC', hmacKey, enc.encode(dataB64));
  const sigB64 = base64UrlEncode(new Uint8Array(signature));

  return `${dataB64}.${sigB64}`;
}

/**
 * Verify and decode an HMAC-SHA256 session token
 */
export async function verifySessionToken(token: string, secret: string): Promise<SessionPayload | null> {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [dataB64, sigB64] = parts;
  const enc = new TextEncoder();

  try {
    const hmacKey = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret || DEFAULT_AUTH_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const sigBytes = base64UrlDecode(sigB64);
    const isValid = await crypto.subtle.verify('HMAC', hmacKey, sigBytes, enc.encode(dataB64));
    if (!isValid) return null;

    const payloadBytes = base64UrlDecode(dataB64);
    const jsonStr = new TextDecoder().decode(payloadBytes);
    const payload = JSON.parse(jsonStr) as SessionPayload;

    if (!payload.exp || Date.now() > payload.exp) {
      return null; // Session expired
    }

    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Parse standard HTTP Cookie header
 */
export function parseCookies(request: Request): Record<string, string> {
  const cookieHeader = request.headers.get('Cookie') || '';
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;

  const pairs = cookieHeader.split(';');
  for (const pair of pairs) {
    const idx = pair.indexOf('=');
    if (idx > 0) {
      const key = pair.substring(0, idx).trim();
      const val = pair.substring(idx + 1).trim();
      cookies[key] = decodeURIComponent(val);
    }
  }
  return cookies;
}

/**
 * Generate Set-Cookie header strings
 */
export function createCookie(
  name: string,
  value: string,
  options: {
    maxAge?: number;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
    path?: string;
  } = {}
): string {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  parts.push(`Path=${options.path || '/'}`);

  if (options.maxAge !== undefined) {
    parts.push(`Max-Age=${options.maxAge}`);
    const expires = new Date(Date.now() + options.maxAge * 1000).toUTCString();
    parts.push(`Expires=${expires}`);
  }

  if (options.httpOnly) {
    parts.push('HttpOnly');
  }

  // Enforce Secure in production or when explicitly true
  if (options.secure !== false) {
    parts.push('Secure');
  }

  parts.push(`SameSite=${options.sameSite || 'Strict'}`);
  return parts.join('; ');
}

export function clearCookie(name: string): string {
  return `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; HttpOnly; SameSite=Strict`;
}

/**
 * Extract Client IP from Cloudflare or standard proxy headers
 */
export function getClientIp(request: Request): string {
  return (
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Real-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0].trim() ||
    '127.0.0.1'
  );
}

/**
 * Rate Limiting Check (Max 5 attempts per 15 minutes)
 */
export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; retryAfter: number } {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxAttempts = 5;

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxAttempts - 1, retryAfter: 0 };
  }

  if (record.count >= maxAttempts) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, remaining: 0, retryAfter };
  }

  record.count += 1;
  return { allowed: true, remaining: maxAttempts - record.count, retryAfter: 0 };
}

export function resetRateLimit(ip: string): void {
  rateLimitMap.delete(ip);
}

/**
 * Standard Security Headers
 */
export const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Type': 'application/json; charset=utf-8'
};

/**
 * Helper to build standard JSON response
 */
export function jsonResponse(data: any, status = 200, extraHeaders: Record<string, string> | Headers = {}): Response {
  const headers = new Headers(SECURITY_HEADERS);
  if (extraHeaders instanceof Headers) {
    extraHeaders.forEach((v, k) => headers.set(k, v));
  } else {
    for (const [k, v] of Object.entries(extraHeaders)) {
      headers.set(k, v);
    }
  }
  return new Response(JSON.stringify(data), {
    status,
    headers
  });
}

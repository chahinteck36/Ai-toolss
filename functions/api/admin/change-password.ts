/**
 * Cloudflare Pages Function: POST /api/admin/change-password
 */
import {
  type CloudflareEnv,
  verifySessionToken,
  parseCookies,
  verifyAdminCredentials,
  hashPassword,
  jsonResponse
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
  const cookies = parseCookies(request);
  const sessionToken = cookies['admin_session'];

  if (!sessionToken) {
    return jsonResponse({ error: 'غير مصرح. يرجى تسجيل الدخول أولاً.' }, 401);
  }

  const sessionSecret = env.AUTH_SECRET || '';
  const session = await verifySessionToken(sessionToken, sessionSecret);

  if (!session) {
    return jsonResponse({ error: 'انتهت صلاحية الجلسة. يرجى تسجيل الدخول ثانية.' }, 401);
  }

  // CSRF Protection
  const csrfHeader = request.headers.get('X-CSRF-Token');
  if (!csrfHeader || csrfHeader !== session.csrfToken) {
    return jsonResponse({ error: 'طلب غير صالح (فشل التحقق من رمز CSRF).' }, 403);
  }

  try {
    const body = (await request.json()) as { currentPassword?: string; newPassword?: string };
    const currentPassword = body.currentPassword || '';
    const newPassword = body.newPassword || '';

    if (!currentPassword || !newPassword) {
      return jsonResponse({ error: 'يرجى تزويد كلمة المرور الحالية والجديدة.' }, 400);
    }

    if (newPassword.length < 8) {
      return jsonResponse({ error: 'كلمة المرور الجديدة يجب ألا تقل عن 8 أحرف.' }, 400);
    }

    // Verify current password against active credentials
    const isCurrentValid = await verifyAdminCredentials(session.email, currentPassword, env);
    if (!isCurrentValid) {
      return jsonResponse({ error: 'كلمة المرور الحالية غير صحيحة.' }, 400);
    }

    // Hash new password using standard Web Crypto PBKDF2
    const { hash, salt } = await hashPassword(newPassword);

    return jsonResponse({
      success: true,
      message: 'تم التحقق من كلمة المرور وتوليد التشفير بنجاح.',
      notice: 'في بيئة Cloudflare Pages، لتثبيت كلمة المرور الجديدة في الإنتاج، قم بتحديث متغير ADMIN_PASSWORD في لوحة تحكم Cloudflare Pages.',
      newHash: hash,
      newSalt: salt
    });
  } catch (err: any) {
    return jsonResponse({ error: 'فشل في تحديث كلمة المرور.' }, 500);
  }
};

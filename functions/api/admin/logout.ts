/**
 * Cloudflare Pages Function: POST /api/admin/logout
 */
import {
  type CloudflareEnv,
  clearCookie,
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
  const headers = new Headers();
  headers.append('Set-Cookie', clearCookie('admin_session'));
  headers.append('Set-Cookie', clearCookie('admin_csrf'));

  return jsonResponse(
    {
      success: true,
      message: 'تم تسجيل الخروج بنجاح.'
    },
    200,
    headers
  );
};

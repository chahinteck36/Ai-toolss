/**
 * Cloudflare Pages Function: GET /api/admin/me
 */
import {
  type CloudflareEnv,
  verifySessionToken,
  parseCookies,
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

export const onRequestGet = async (context: EventContext<CloudflareEnv>): Promise<Response> => {
  const { request, env } = context;
  const cookies = parseCookies(request);
  const sessionToken = cookies['admin_session'];

  if (!sessionToken) {
    return jsonResponse({ authenticated: false }, 401);
  }

  const sessionSecret = env.AUTH_SECRET || '';
  const session = await verifySessionToken(sessionToken, sessionSecret);

  if (!session) {
    return jsonResponse({ authenticated: false }, 401);
  }

  return jsonResponse({
    authenticated: true,
    user: {
      email: session.email,
      role: session.role,
      displayName: session.displayName
    },
    csrfToken: session.csrfToken
  });
};

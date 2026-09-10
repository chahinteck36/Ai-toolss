/**
 * Cloudflare Pages Function: GET /api/health
 */
import { jsonResponse } from '../lib/edgeAuth';

export const onRequestGet = async (): Promise<Response> => {
  return jsonResponse({
    status: 'ok',
    runtime: 'cloudflare-pages-edge',
    timestamp: new Date().toISOString()
  });
};

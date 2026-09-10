/**
 * Secure Admin API Client
 * Interacts with server-side authentication and session endpoints.
 * All requests use HttpOnly cookies and CSRF tokens.
 */

export interface AdminAuthResponse {
  authenticated: boolean;
  user?: {
    email: string;
    role: 'admin' | 'editor';
    displayName: string;
  };
  csrfToken?: string;
  error?: string;
  remainingAttempts?: number;
  retryAfterSeconds?: number;
  code?: string;
}

let cachedCsrfToken: string | null = null;

export function getCsrfToken(): string | null {
  if (cachedCsrfToken) return cachedCsrfToken;
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(/(?:^|;\s*)admin_csrf=([^;]+)/);
    if (match) {
      cachedCsrfToken = decodeURIComponent(match[1]);
      return cachedCsrfToken;
    }
  }
  return null;
}

export function setCsrfToken(token: string | null) {
  cachedCsrfToken = token;
}

/**
 * Check if the current user has a valid authenticated admin session on the server.
 */
export async function checkAdminAuth(): Promise<AdminAuthResponse> {
  try {
    const res = await fetch('/api/admin/me', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'include'
    });

    if (res.ok) {
      const data = await res.json();
      if (data.csrfToken) {
        setCsrfToken(data.csrfToken);
      }
      return data;
    }

    return { authenticated: false };
  } catch (err) {
    return { authenticated: false };
  }
}

/**
 * Authenticate admin with email and password.
 */
export async function adminLogin(email: string, password: string): Promise<AdminAuthResponse> {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok && data.success) {
      if (data.csrfToken) {
        setCsrfToken(data.csrfToken);
      }
      return {
        authenticated: true,
        user: data.user,
        csrfToken: data.csrfToken
      };
    }

    return {
      authenticated: false,
      error: data.error || 'فشل في تسجيل الدخول. يرجى التحقق من البيانات.',
      remainingAttempts: data.remainingAttempts,
      retryAfterSeconds: data.retryAfterSeconds,
      code: data.code
    };
  } catch (err: any) {
    return {
      authenticated: false,
      error: 'تعذر الاتصال بخادم المصادقة. يرجى التحقق من الاتصال بالإنترنت.'
    };
  }
}

/**
 * Logout admin and invalidate server session.
 */
export async function adminLogout(): Promise<boolean> {
  try {
    const csrf = getCsrfToken();
    await fetch('/api/admin/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(csrf ? { 'X-CSRF-Token': csrf } : {})
      },
      credentials: 'include'
    });
  } catch (e) {
    // Non-blocking
  } finally {
    setCsrfToken(null);
  }
  return true;
}

/**
 * Change Admin Password on the server.
 */
export async function adminChangePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string; message?: string }> {
  try {
    const csrf = getCsrfToken();
    const res = await fetch('/api/admin/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(csrf ? { 'X-CSRF-Token': csrf } : {})
      },
      credentials: 'include',
      body: JSON.stringify({ currentPassword, newPassword })
    });

    const data = await res.json();
    if (res.ok && data.success) {
      if (data.csrfToken) {
        setCsrfToken(data.csrfToken);
      }
      return { success: true, message: data.message };
    }

    return { success: false, error: data.error || 'فشل في تحديث كلمة المرور.' };
  } catch (err: any) {
    return { success: false, error: 'حدث خطأ أثناء الاتصال بالخادم.' };
  }
}

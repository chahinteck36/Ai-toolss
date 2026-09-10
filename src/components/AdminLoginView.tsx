import React, { useState, useEffect } from 'react';
import { Shield, Lock, Mail, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowRight, Clock } from 'lucide-react';
import { adminLogin, AdminAuthResponse } from '../lib/adminApi';

interface AdminLoginViewProps {
  onLoginSuccess: (user: NonNullable<AdminAuthResponse['user']>) => void;
  onBackToHome: () => void;
  isDarkMode: boolean;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  onLoginSuccess,
  onBackToHome,
  isDarkMode
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [lockoutTimer, setLockoutTimer] = useState<number>(0);

  // Countdown timer if rate limited
  useEffect(() => {
    if (lockoutTimer <= 0) return;
    const interval = setInterval(() => {
      setLockoutTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setErrorMessage(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTimer > 0) return;

    if (!email.trim() || !password) {
      setErrorMessage('يرجى إدخال البريد الإلكتروني وكلمة المرور.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const result = await adminLogin(email.trim(), password);
    setIsLoading(false);

    if (result.authenticated && result.user) {
      onLoginSuccess(result.user);
    } else {
      setErrorMessage(result.error || 'فشل في تسجيل الدخول. يرجى التحقق من بيانات الاعتماد.');
      if (typeof result.remainingAttempts === 'number') {
        setRemainingAttempts(result.remainingAttempts);
      }
      if (result.retryAfterSeconds && result.retryAfterSeconds > 0) {
        setLockoutTimer(result.retryAfterSeconds);
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 transition-colors duration-200 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`} dir="rtl">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          isDarkMode ? 'bg-indigo-600' : 'bg-indigo-300'
        }`} />
        <div className={`absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          isDarkMode ? 'bg-purple-600' : 'bg-purple-300'
        }`} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800' 
                : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>العودة إلى الموقع الرئيسي</span>
          </button>

          <span className="text-[11px] font-mono text-slate-400">نظام الإدارة الآمن</span>
        </div>

        {/* Card Container */}
        <div className={`rounded-2xl border p-6 sm:p-8 shadow-xl backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-slate-900/90 border-slate-800 shadow-black/40' 
            : 'bg-white border-slate-200/80 shadow-slate-200/50'
        }`}>
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">بوابة إدارة النظام</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              تسجيل الدخول الموثق للوصول إلى لوحة التحكم
            </p>
          </div>

          {/* Error Notification */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">
                <p>{errorMessage}</p>
                {lockoutTimer > 0 && (
                  <p className="mt-1 font-mono font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>يمكنك إعادة المحاولة بعد: {lockoutTimer} ثانية</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                البريد الإلكتروني الإداري
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  autoFocus
                  dir="ltr"
                  disabled={isLoading || lockoutTimer > 0}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className={`w-full pr-10 pl-3 py-2.5 text-sm rounded-xl border transition-all outline-none font-mono ${
                    isDarkMode
                      ? 'bg-slate-800/80 border-slate-700 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  } disabled:opacity-50`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  dir="ltr"
                  disabled={isLoading || lockoutTimer > 0}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full pr-10 pl-10 py-2.5 text-sm rounded-xl border transition-all outline-none font-mono ${
                    isDarkMode
                      ? 'bg-slate-800/80 border-slate-700 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  } disabled:opacity-50`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {remainingAttempts !== null && remainingAttempts > 0 && remainingAttempts < 5 && (
              <p className="text-[11px] text-amber-500 font-medium">
                تنبيه أمان: متبقي لديك {remainingAttempts} محاولات قبل حظر الدخول مؤقتاً.
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading || lockoutTimer > 0}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>جاري التحقق والمصادقة...</span>
                </>
              ) : lockoutTimer > 0 ? (
                <span>مغلق مؤقتاً ({lockoutTimer} ث)</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>تسجيل الدخول الآمن</span>
                </>
              )}
            </button>
          </form>

          {/* Security Features Info */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>مصادقة مشفرة من جهة الخادم (Server-Authoritative Session)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>جلسات آمنة بملفات تعريف ارتباط محمية (HttpOnly & SameSite)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>حماية مضاعفة من هجمات التخمين (Brute-force & CSRF Guard)</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

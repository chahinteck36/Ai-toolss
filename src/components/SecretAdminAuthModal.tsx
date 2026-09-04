import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  ExternalLink, 
  Eye, 
  EyeOff, 
  X, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Command, 
  ArrowLeft,
  LayoutDashboard
} from 'lucide-react';

interface SecretAdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticateSuccess: (openInNewTab: boolean) => void;
  isDarkMode: boolean;
}

const VALID_PASSCODES = ['admin2026', 'ai2026', 'admin123', 'admin', '123456'];

export const SecretAdminAuthModal: React.FC<SecretAdminAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticateSuccess,
  isDarkMode
}) => {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleVerify = (openInNewTab: boolean) => {
    setErrorMsg(null);
    const trimmed = passcode.trim().toLowerCase();

    // Check against standard passcodes or custom saved admin passcode
    const customCode = localStorage.getItem('ai_directory_custom_admin_pin') || '';
    const isValid = VALID_PASSCODES.includes(trimmed) || (customCode && trimmed === customCode.toLowerCase());

    if (!isValid) {
      setErrorMsg('الرمز السري غير صحيح. يرجى تجربة الرمز الافتراضي: admin2026');
      return;
    }

    setIsSuccess(true);
    // Store authenticated session token
    sessionStorage.setItem('ai_directory_admin_auth', 'true');

    setTimeout(() => {
      onAuthenticateSuccess(openInNewTab);
      setIsSuccess(false);
      setPasscode('');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" dir="rtl">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all animate-in zoom-in-95 duration-200 ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 text-white shadow-indigo-950/40' 
              : 'bg-white border-slate-200 text-slate-900 shadow-slate-300/50'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute left-4 top-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Icon & Title */}
          <div className="text-center mb-6">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-1.5 flex items-center justify-center gap-2">
              <span>بوابة الإدارة المستقلة (لوحة التحكم)</span>
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
              لوحة تحكم الدليل سرية ومستقلة تماماً عن واجهة الزوار. يرجى إدخال الرمز السري للمتابعة.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleVerify(false); }} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                الرمز السري للإدارة (Secret Master PIN)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  id="secret-admin-passcode-input"
                  type={showPasscode ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  placeholder="أدخل الرمز السري (مثال: admin2026)..."
                  className={`w-full py-3 pr-10 pl-11 text-sm rounded-xl border font-mono tracking-wider focus:outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20' 
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20'
                  }`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Default hint for user */}
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>الرمز السري الافتراضي: <strong className="font-mono text-indigo-500">admin2026</strong></span>
                <button
                  type="button"
                  onClick={() => setPasscode('admin2026')}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  تعبئة تلقائية
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Message */}
            {isSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>تم التحقق من الرمز بنجاح! جاري تحميل لوحة التحكم...</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 space-y-2.5">
              {/* Open in New Tab Button */}
              <button
                type="button"
                id="btn-open-admin-new-tab"
                onClick={() => handleVerify(true)}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white hover:opacity-95 shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>فتح لوحة التحكم في صفحة / متصفح مستقل جديد</span>
              </button>

              {/* Direct In-App Open Button */}
              <button
                type="submit"
                id="btn-open-admin-direct"
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-indigo-500" />
                <span>الدخول المباشر للوحة الإدارة هنا</span>
              </button>
            </div>
          </form>

          {/* Secret Access Shortcuts Helper Box */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
              <Command className="w-3.5 h-3.5 text-indigo-500" />
              <span>طرق الدخول السري للوحة الإدارة:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
              <li>اختصار لوحة المفاتيح: <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">Ctrl + Shift + A</kbd> أو <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">Alt + A</kbd></li>
              <li>إضافة <span className="font-mono text-indigo-500">#admin</span> أو <span className="font-mono text-indigo-500">?admin=1</span> إلى رابط الموقع في شريط المتصفح</li>
              <li>النقر على قفل الإدارة السري الموجود بأسفل الفوتر</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

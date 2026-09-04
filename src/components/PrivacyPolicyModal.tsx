import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  Cookie, 
  Server, 
  Mail, 
  CheckCircle2, 
  Globe,
  Database,
  ExternalLink
} from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onOpenAboutUs?: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  onOpenAboutUs
}) => {
  if (!isOpen) return null;

  const lastUpdatedDate = '1 سبتمبر 2026';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" dir="rtl">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
        <div 
          className={`relative w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all animate-in zoom-in-95 duration-200 ${
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
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="text-center sm:text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
                <Globe className="w-3.5 h-3.5" />
                <span>نطاق الموقع: adawatai.online</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                سياسة الخصوصية وسرية المعلومات
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                آخر تحديث: {lastUpdatedDate} • التزامنا الكامل بحماية بياناتك وخصوصيتك
              </p>
            </div>
          </div>

          {/* Content sections */}
          <div className="space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-h-[65vh] overflow-y-auto pr-1 pl-2">
            
            {/* Intro */}
            <div className={`p-4 rounded-2xl border ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <p className="leading-relaxed">
                في <strong>أدواتي AI (adawatai.online)</strong>، نولي خصوصية زوارنا أهمية قصوى. توضح وثيقة سياسة الخصوصية هذه أنواع المعلومات الشخصية والتقنية التي نقوم بجمعها وكيفية استخدامها وحمايتها عند تصفحك للموقع أو استخدام خدمات الدليل.
              </p>
            </div>

            {/* 1. Data we collect */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-emerald-500" />
                <span>1. المعلومات التي نجمعها</span>
              </h3>
              <ul className="space-y-2 text-xs leading-relaxed mr-4 list-disc text-slate-600 dark:text-slate-300">
                <li>
                  <strong>تصفح الدليل دون تسجيل:</strong> يمكنك تصفح دليل الأدوات واستخدام محرك البحث وفلاتر التصنيف بحرية كاملة دون الحاجة لتقديم أي بيانات شخصية.
                </li>
                <li>
                  <strong>المفضلة والملاحظات والتقييمات المحلية:</strong> يتم حفظ أدواتك المفضلة وتقييماتك وملاحظاتك داخل متصفحك محلياً عبر تقنية (Local Storage) ولا يتم نقلها لأي خوادم خارجية إلا إذا طلبت مزامنة محددة.
                </li>
                <li>
                  <strong>نموذج اقتراح أداة:</strong> عند إرسالك مقترحاً لإضافة أداة جديدة، نجمع الاسم، البريد الإلكتروني، ورابط الأداة للتواصل والتحقق من صحة المقترح فقط.
                </li>
                <li>
                  <strong>بيانات السجل والتحليلات المجهولة:</strong> نسجل بيانات عامة غير معرّفة للشخصية مثل نوع المتصفح، عدد النقرات على الأدوات لتحسين الترتيب، وزمن الزيارة.
                </li>
              </ul>
            </div>

            {/* 2. Cookies & Local Storage */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                <Cookie className="w-4 h-4 text-amber-500" />
                <span>2. ملفات تعريف الارتباط (Cookies) والتخزين المحلي</span>
              </h3>
              <p className="text-xs leading-relaxed mb-2">
                يستخدم موقع <strong>adawatai.online</strong> تقنيات التخزين لتذكر تفضيلاتك، مثل:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>تفضيل المظهر (الوضع الداكن / الفاتح).</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>قائمة الأدوات المحفوظة في المفضلة.</span>
                </div>
              </div>
            </div>

            {/* 3. External Links & Affiliates */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                <ExternalLink className="w-4 h-4 text-indigo-500" />
                <span>3. الروابط الخارجية ومواقع الطرف الثالث</span>
              </h3>
              <p className="text-xs leading-relaxed">
                يحتوي دليل <strong>أدواتي AI</strong> على روابط مباشرة تنقلك إلى مواقع أدوات الذكاء الاصطناعي الخارجية. نحن لسنا مسؤولين عن سياسات الخصوصية أو الممارسات المعمول بها في تلك المواقع، وننصحك دائماً بالاطلاع على سياسة خصوصية كل موقع تزوره.
              </p>
            </div>

            {/* 4. Security & Firebase */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-purple-500" />
                <span>4. حماية وأمان البيانات</span>
              </h3>
              <p className="text-xs leading-relaxed">
                نطبق معايير أمنية تقنية وتشفير SSL/HTTPS قياسي عبر سحابة Google Firebase لحماية جميع العمليات والبيانات المخزنة في قواعد البيانات من الوصول غير المصرح به أو التعديل أو الإفشاء.
              </p>
            </div>

            {/* 5. Contact info */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>مسؤول الخصوصية: <strong className="text-slate-800 dark:text-slate-200">privacy@adawatai.online</strong></span>
              </div>

              <div className="flex items-center gap-2">
                {onOpenAboutUs && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAboutUs();
                    }}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                  >
                    من نحن
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
                >
                  فهمت وأوافق
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

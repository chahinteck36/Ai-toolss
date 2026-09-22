import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  FileText, 
  Cookie, 
  Mail, 
  CheckCircle2, 
  Globe,
  ExternalLink
} from 'lucide-react';
import { SupportedLanguage } from '../types';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  lang?: SupportedLanguage;
  onOpenAboutUs?: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  lang = 'ar',
  onOpenAboutUs
}) => {
  if (!isOpen) return null;

  const isAr = lang === 'ar';
  const lastUpdatedDate = isAr ? '1 سبتمبر 2026' : 'September 1, 2026';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" dir={isAr ? 'rtl' : 'ltr'}>
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
            className={`absolute ${isAr ? 'left-4' : 'right-4'} top-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors`}
            aria-label={isAr ? 'إغلاق' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className={`text-center ${isAr ? 'sm:text-right' : 'sm:text-left'}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
                <Globe className="w-3.5 h-3.5" />
                <span>{isAr ? 'نطاق الموقع: adawatai.online' : 'Domain: adawatai.online'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {isAr ? 'سياسة الخصوصية وسرية المعلومات' : 'Privacy & Confidentiality Policy'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {isAr ? `آخر تحديث: ${lastUpdatedDate} • التزامنا الكامل بحماية بياناتك وخصوصيتك` : `Last Updated: ${lastUpdatedDate} • Our commitment to data privacy and security`}
              </p>
            </div>
          </div>

          {/* Content sections */}
          <div className={`space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-h-[65vh] overflow-y-auto ${isAr ? 'pr-1 pl-2' : 'pl-1 pr-2'}`}>
            
            {/* Intro */}
            <div className={`p-4 rounded-2xl border ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <p className="leading-relaxed">
                {isAr ? (
                  <>في <strong>أدواتي AI (adawatai.online)</strong>، نولي خصوصية زوارنا أهمية قصوى. توضح وثيقة سياسة الخصوصية هذه أنواع المعلومات الشخصية والتقنية التي نقوم بجمعها وكيفية استخدامها وحمايتها عند تصفحك للموقع أو استخدام خدمات الدليل.</>
                ) : (
                  <>At <strong>Adawatai AI (adawatai.online)</strong>, we hold our visitors' privacy in the highest regard. This privacy policy describes the categories of information we collect, how it is processed, and how your privacy is safeguarded while browsing our directory.</>
                )}
              </p>
            </div>

            {/* 1. Data we collect */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-emerald-500" />
                <span>{isAr ? '1. المعلومات التي نجمعها' : '1. Information We Collect'}</span>
              </h3>
              <ul className={`space-y-2 text-xs leading-relaxed ${isAr ? 'mr-4' : 'ml-4'} list-disc text-slate-600 dark:text-slate-300`}>
                <li>
                  <strong>{isAr ? 'تصفح الدليل دون تسجيل:' : 'Anonymous Browsing:'}</strong> {isAr ? 'يمكنك تصفح دليل الأدوات واستخدام محرك البحث وفلاتر التصنيف بحرية كاملة دون الحاجة لتقديم أي بيانات شخصية.' : 'You can browse the directory, execute searches, and filter categories freely with zero mandatory registration or credentials.'}
                </li>
                <li>
                  <strong>{isAr ? 'المفضلة والملاحظات والتقييمات المحلية:' : 'Local Storage Preferences:'}</strong> {isAr ? 'يتم حفظ أدواتك المفضلة وتقييماتك وملاحظاتك داخل متصفحك محلياً عبر تقنية (Local Storage) ولا يتم نقلها لأي خوادم خارجية إلا إذا طلبت مزامنة محددة.' : 'Your favorite tools, private notes, and ratings reside directly on your client browser storage without third-party server tracking.'}
                </li>
                <li>
                  <strong>{isAr ? 'نموذج اقتراح أداة:' : 'Tool Submission Form:'}</strong> {isAr ? 'عند إرسالك مقترحاً لإضافة أداة جديدة، نجمع الاسم، البريد الإلكتروني، ورابط الأداة للتواصل والتحقق من صحة المقترح فقط.' : 'When submitting a tool, we collect the submitter name, email, and tool URL exclusively to verify and curate listings.'}
                </li>
                <li>
                  <strong>{isAr ? 'بيانات السجل والتحليلات المجهولة:' : 'Aggregated Telemetry:'}</strong> {isAr ? 'نسجل بيانات عامة غير معرّفة للشخصية مثل نوع المتصفح، عدد النقرات على الأدوات لتحسين الترتيب، وزمن الزيارة.' : 'We log non-personally identifiable metrics (browser family, popular clicks, session length) to continuously refine index rankings.'}
                </li>
              </ul>
            </div>

            {/* 2. Cookies & Local Storage */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                <Cookie className="w-4 h-4 text-amber-500" />
                <span>{isAr ? '2. ملفات تعريف الارتباط (Cookies) والتخزين المحلي' : '2. Cookies & Local State'}</span>
              </h3>
              <p className="text-xs leading-relaxed mb-2">
                {isAr ? 'يستخدم موقع adawatai.online تقنيات التخزين لتذكر تفضيلاتك، مثل:' : 'adawatai.online utilizes minimal client-side state solely to preserve preferences:'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{isAr ? 'تفضيل المظهر (الوضع الداكن / الفاتح).' : 'Theme mode (Dark / Light)'}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{isAr ? 'قائمة الأدوات المحفوظة في المفضلة ولغة الواجهة.' : 'Bookmarked tools and language choice'}</span>
                </div>
              </div>
            </div>

            {/* 3. External Links */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                <ExternalLink className="w-4 h-4 text-indigo-500" />
                <span>{isAr ? '3. الروابط الخارجية ومواقع الطرف الثالث' : '3. External Outbound Links'}</span>
              </h3>
              <p className="text-xs leading-relaxed">
                {isAr 
                  ? 'يحتوي دليل أدواتي AI على روابط مباشرة تنقلك إلى مواقع أدوات الذكاء الاصطناعي الخارجية. نحن لسنا مسؤولين عن سياسات الخصوصية أو الممارسات المعمول بها في تلك المواقع، وننصحك دائماً بالاطلاع على سياسة خصوصية كل موقع تزوره.' 
                  : 'Adawatai AI connects you directly to official third-party software websites. We bear no liability for the data practices of external domains and encourage reviewing their individual privacy disclosures.'}
              </p>
            </div>

            {/* 4. Security */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-purple-500" />
                <span>{isAr ? '4. حماية وأمان البيانات' : '4. Security & Encryption'}</span>
              </h3>
              <p className="text-xs leading-relaxed">
                {isAr 
                  ? 'نطبق معايير أمنية تقنية وتشفير SSL/HTTPS قياسي عبر سحابة Google Firebase لحماية جميع العمليات والبيانات المخزنة في قواعد البيانات من الوصول غير المصرح به أو التعديل أو الإفشاء.' 
                  : 'We enforce stringent SSL/HTTPS end-to-end encryption backed by modern cloud architectures to prevent unauthorized data tampering or disclosure.'}
              </p>
            </div>

            {/* 5. Contact info */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>{isAr ? 'مسؤول الخصوصية: ' : 'Privacy Inquiries: '}<strong className="text-slate-800 dark:text-slate-200">privacy@adawatai.online</strong></span>
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
                    {isAr ? 'من نحن' : 'About Us'}
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
                >
                  {isAr ? 'فهمت وأوافق' : 'I Understand & Agree'}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

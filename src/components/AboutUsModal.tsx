import React from 'react';
import { 
  X, 
  Sparkles, 
  Target, 
  ShieldCheck, 
  Users, 
  Zap, 
  Globe, 
  Award, 
  CheckCircle2, 
  Mail, 
  ArrowLeft,
  ExternalLink,
  Bot,
  Heart
} from 'lucide-react';

interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onOpenPrivacyPolicy?: () => void;
  onOpenContact?: () => void;
  onOpenSuggestTool?: () => void;
}

export const AboutUsModal: React.FC<AboutUsModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  onOpenPrivacyPolicy,
  onOpenContact,
  onOpenSuggestTool
}) => {
  if (!isOpen) return null;

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

          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 shrink-0">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
            <div className="text-center sm:text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-2">
                <Globe className="w-3.5 h-3.5" />
                <span>المنصة الرسمية: adawatai.online</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                من نحن — أدواتي AI
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                دليلك العربي الشامل والموثوق لاكتشاف وتوظيف أفضل تقنيات الذكاء الاصطناعي
              </p>
            </div>
          </div>

          {/* Main Content Body */}
          <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-h-[65vh] overflow-y-auto pr-1 pl-2">
            
            {/* Vision Section */}
            <div className={`p-4 sm:p-5 rounded-2xl border ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-indigo-50/50 border-indigo-100'
            }`}>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-indigo-500" />
                <span>رؤيتنا ورسالتنا</span>
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                انطلق موقع <strong>أدواتي AI (adawatai.online)</strong> ليكون المرجع العربي الأول والموثوق لكل من يبحث عن أدوات الذكاء الاصطناعي التوليدي والعملي. نهدف إلى سد الفجوة المعرفية بين أحدث التطورات التقنية العالمية والمستخدم العربي، من خلال تقديم مراجعات دقيقة، تصنيفات ذكية، وتوضيح مدى دعم كل أداة للغة العربية والأسعار الحقيقية بكل شفافية.
              </p>
            </div>

            {/* Core Values / Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`p-4 rounded-2xl border ${
                isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200/80'
              }`}>
                <div className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white mb-2 text-sm">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>المصداقية والحيادية</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  نختبر الأدوات عملياً ونوضح الإيجابيات والسلبيات الحقيقية دون أي تحيز تجاري مضلل.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${
                isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200/80'
              }`}>
                <div className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white mb-2 text-sm">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span>التركيز على المحتوى العربي</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  فلاتر متخصصة لفرز الأدوات التي تدعم اللغة العربية بكفاءة عالية في الكتابة والصوت والترجمة.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${
                isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200/80'
              }`}>
                <div className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white mb-2 text-sm">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span>محرك بحث ذكي وسريع</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  بحث مرن ومتقدم يتسامح مع الأخطاء الإملائية ويقترح أفضل البدائل في ثوانٍ معدودة.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${
                isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200/80'
              }`}>
                <div className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white mb-2 text-sm">
                  <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <span>مشاركة مجتمعية مفتوحة</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  نفتح المجال لرواد الأعمال والمستخدمين لاقتراح أدوات جديدة والمساهمة في إثراء الدليل.
                </p>
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-indigo-500" />
                <span>لمن تم تصميم هذا الدليل؟</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>صناع المحتوى والكتّاب:</strong> لتوليد الأفكار والمقالات والنصوص.</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>المصممون والفنانون:</strong> لابتكار الصور والفيديوهات والشعارات.</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>المبرمجون والتقنيون:</strong> لتسريع كتابة الأكواد وتصحيحها.</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>الطلاب والباحثون:</strong> لتلخيص الأبحاث وتحليل البيانات الأكاديمية.</span>
                </div>
              </div>
            </div>

            {/* Official Contact & Domain info */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>
                  للتواصل والاستفسارات:{' '}
                  {onOpenContact ? (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenContact();
                      }}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold font-mono"
                    >
                      contact@adawatai.online (إرسال مباشر)
                    </button>
                  ) : (
                    <a
                      href="mailto:gmouhamed36@gmail.com?cc=contact@adawatai.online"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold font-mono"
                    >
                      contact@adawatai.online
                    </a>
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {onOpenPrivacyPolicy && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenPrivacyPolicy();
                    }}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                  >
                    سياسة الخصوصية
                  </button>
                )}
                {onOpenSuggestTool && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSuggestTool();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-semibold"
                  >
                    اقترح أداة للدليل
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

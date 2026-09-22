import React from 'react';
import { ShieldCheck, Repeat, GraduationCap, Zap, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../../lib/i18n';

interface ValuePropositionSectionProps {
  isDarkMode: boolean;
  lang?: SupportedLanguage;
}

export const ValuePropositionSection: React.FC<ValuePropositionSectionProps> = ({ isDarkMode, lang = 'ar' }) => {
  const isAr = lang === 'ar';

  const pillars = isAr ? [
    {
      icon: ShieldCheck,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-200 dark:border-emerald-800',
      title: 'معالجة محلية آمنة',
      description: 'أدوات تعمل داخل المتصفح مباشرة دون رفع ملفاتك لأي خادم.'
    },
    {
      icon: Repeat,
      color: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-200 dark:border-purple-800',
      title: 'دليل بدائل محايد',
      description: 'أقوى بدائل ChatGPT وMidjourney المجانية والمفتوحة 2026.'
    },
    {
      icon: GraduationCap,
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-200 dark:border-indigo-800',
      title: 'حقيبة الباحث العلمي',
      description: 'أدوات توثيق مراجع APA وتلخيص الأوراق ومذكرات التخرج.'
    },
    {
      icon: Zap,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-200 dark:border-amber-800',
      title: 'استخدام فوري مباشر',
      description: 'وصول سريع ومجاني للأدوات دون اشتراكات أو تعقيدات.'
    }
  ] : [
    {
      icon: ShieldCheck,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-200 dark:border-emerald-800',
      title: 'Private & Local Processing',
      description: 'Client-side processing directly in your browser without uploading files.'
    },
    {
      icon: Repeat,
      color: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-200 dark:border-purple-800',
      title: 'Neutral Alternatives Guide',
      description: 'Top free & open-source alternatives to ChatGPT, Midjourney & more.'
    },
    {
      icon: GraduationCap,
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-200 dark:border-indigo-800',
      title: 'Academic & Scholar Pack',
      description: 'APA citation generators, thesis summarizers, and student toolkits.'
    },
    {
      icon: Zap,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-200 dark:border-amber-800',
      title: 'Instant Direct Access',
      description: 'Fast, clutter-free access to tools without forced registrations.'
    }
  ];

  return (
    <section 
      id="value-proposition-section"
      dir={isAr ? 'rtl' : 'ltr'}
      className="space-y-2 pt-1 sm:pt-2"
      aria-label={isAr ? 'معايير ومميزات منصة أدواتي' : 'Adawatai Platform Standards'}
    >
      <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-colors ${
        isDarkMode 
          ? 'bg-slate-900/60 border-slate-800' 
          : 'bg-slate-50/80 border-slate-200/80'
      }`}>
        <div className="flex items-center gap-1.5 mb-2.5 sm:mb-3">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
            {isAr ? 'معايير منصة أدواتي' : 'Adawatai Platform Standards'}
          </h3>
        </div>

        {/* 2x2 on mobile, 4 columns on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl border transition-all ${
                  isDarkMode 
                    ? 'bg-slate-950/70 border-slate-800/80' 
                    : 'bg-white border-slate-200/70 shadow-2xs'
                }`}
              >
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center mb-1.5 ${pillar.color}`}>
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white leading-tight">
                  {pillar.title}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1 leading-snug">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

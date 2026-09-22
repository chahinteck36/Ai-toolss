import React from 'react';
import { Search, X, Sparkles, Wand2, Lightbulb, Zap, Terminal, GraduationCap, Repeat } from 'lucide-react';
import { CategoryId } from '../types';
import { HeroIllustration } from './home/HeroIllustration';
import { SupportedLanguage, TRANSLATIONS } from '../lib/i18n';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectKeyword: (keyword: string) => void;
  onOpenSmartFinder: () => void;
  onOpenPromptsLibrary?: () => void;
  onSelectCategory?: (catId: CategoryId) => void;
  isDarkMode: boolean;
  bestSuggestion?: string;
  hasTypoCorrection?: boolean;
  lang?: SupportedLanguage;
}

const QUICK_TAGS = [
  'DeepSeek-R1',
  'Claude 3.7',
  'Gemini 2.5 Pro',
  'Perplexity',
  'Zotero',
  'SciSpace',
  'Overleaf',
  'GeoGebra',
  'Consensus',
  'Suno AI',
  'Cursor AI'
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onSelectKeyword,
  onOpenSmartFinder,
  onOpenPromptsLibrary,
  onSelectCategory,
  isDarkMode,
  bestSuggestion,
  hasTypoCorrection,
  lang = 'ar'
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ar;
  const isAr = lang === 'ar';

  const academicTags = isAr ? [
    { label: '#مذكرات_تخرج', query: 'مذكرات_تخرج' },
    { label: '#توثيق_مراجع_APA', query: 'توثيق_مراجع_APA' },
    { label: '#تلخيص_الأوراق_العلمية', query: 'تلخيص_الأوراق_العلمية' },
    { label: '#فحص_الانتحال_العلمي', query: 'فحص_الانتحال_العلمي' }
  ] : [
    { label: '#Thesis_Research', query: 'thesis' },
    { label: '#APA_Citation', query: 'citation' },
    { label: '#Paper_Summarizer', query: 'summary' },
    { label: '#Plagiarism_Check', query: 'plagiarism' }
  ];

  return (
    <section 
      dir={isAr ? 'rtl' : 'ltr'} 
      className={`relative overflow-hidden py-6 sm:py-10 border-b transition-colors ${
        isDarkMode 
          ? 'bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-slate-800' 
          : 'bg-gradient-to-b from-slate-100/90 via-indigo-50/40 to-slate-100/70 border-slate-200/80'
      }`}
    >
      {/* Decorative background ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[500px] h-80 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-3 sm:px-6 text-center">
        {/* Badges Bar */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-2.5 sm:mb-3.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-indigo-100/80 text-indigo-900 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80 shadow-2xs">
            <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="truncate">{t.heroBadge}</span>
          </div>

          {onSelectCategory && (
            <a
              href="/category/ai_alternatives"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('ai_alternatives');
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-purple-500/15 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-700/70 hover:scale-105 transition-all shadow-2xs cursor-pointer"
            >
              <Repeat className="w-3 h-3 text-purple-600 dark:text-purple-400" />
              <span>{isAr ? 'منصة البدائل' : 'AI Alternatives'}</span>
            </a>
          )}

          {onSelectCategory && (
            <a
              href="/category/academic_scholar"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('academic_scholar');
              }}
              className="hidden xs:inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/70 hover:scale-105 transition-all shadow-2xs cursor-pointer"
            >
              <GraduationCap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>{isAr ? 'حقيبة الباحث' : 'Scholar Suite'}</span>
            </a>
          )}

          {onOpenPromptsLibrary && (
            <button
              onClick={onOpenPromptsLibrary}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/70 hover:scale-105 transition-all shadow-2xs cursor-pointer"
            >
              <Terminal className="w-3 h-3 text-amber-500" />
              <span>{t.promptsLibrary}</span>
            </button>
          )}
        </div>

        {/* Main Title */}
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2 sm:mb-3 leading-tight">
          {t.heroTitleHighlight}
          <span className="block mt-0.5 sm:mt-1 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            {t.heroTitleRest}
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-4 sm:mb-6 leading-relaxed font-normal px-2 line-clamp-2 sm:line-clamp-none">
          {t.heroSubtitle}
        </p>

        {/* Search Bar Container */}
        <div className="relative max-w-2xl mx-auto mb-3 sm:mb-4">
          <div className="relative flex items-center shadow-md shadow-slate-900/5 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-300/80 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all focus-within:ring-2 focus-within:ring-indigo-600 focus-within:border-indigo-600">
            <div className={`px-3 text-indigo-700 dark:text-indigo-400 shrink-0 ${isAr ? 'order-first' : 'order-first'}`}>
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>

            <input
              id="hero-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={`w-full py-2.5 sm:py-3.5 text-xs sm:text-sm md:text-base bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none ${
                isAr ? 'pr-1 pl-20 sm:pl-28' : 'pl-1 pr-20 sm:pr-28'
              }`}
              dir={isAr ? 'rtl' : 'ltr'}
            />

            {searchQuery && (
              <button
                id="hero-search-clear-btn"
                onClick={() => onSearchChange('')}
                className={`absolute p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                  isAr ? 'left-14 sm:left-22' : 'right-14 sm:right-22'
                }`}
                title={isAr ? 'مسح البحث' : 'Clear search'}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              id="hero-search-submit-btn"
              onClick={onOpenSmartFinder}
              className={`absolute px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg sm:rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-1 shadow-xs shrink-0 cursor-pointer ${
                isAr ? 'left-1.5 sm:left-2' : 'right-1.5 sm:right-2'
              }`}
              title={t.smartFinder}
            >
              <Wand2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{isAr ? 'اقترح لي' : 'Smart AI'}</span>
            </button>
          </div>

          {/* Fuse.js Typo Correction */}
          {hasTypoCorrection && bestSuggestion && searchQuery.trim().length > 2 && (
            <div className="mt-1.5 p-2 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-[11px] sm:text-xs flex items-center justify-between text-start animate-in fade-in shadow-2xs">
              <div className="flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{t.didYouMean} <strong>{bestSuggestion}</strong>?</span>
              </div>
              <button
                onClick={() => onSearchChange(bestSuggestion.split(' ')[0])}
                className="font-bold underline text-amber-800 dark:text-amber-300 hover:text-amber-950 shrink-0 mx-2 cursor-pointer"
              >
                {isAr ? 'تطبيق' : 'Apply'}
              </button>
            </div>
          )}
        </div>

        {/* Compact Quick Tags */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 max-w-2xl mx-auto text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-semibold mx-1 flex items-center gap-1 text-[11px]">
            <Zap className="w-3 h-3 text-amber-500" />
            <span>{isAr ? 'رائج:' : 'Trending:'}</span>
          </span>
          {QUICK_TAGS.map((tag, idx) => (
            <button
              key={tag}
              id={`quick-tag-${tag.replace(/\s+/g, '-')}`}
              onClick={() => onSelectKeyword(tag)}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700/80 dark:hover:bg-slate-700 hover:border-indigo-400 transition-all text-[11px] sm:text-xs font-medium cursor-pointer ${
                idx >= 5 ? 'hidden sm:inline-block' : 'inline-block'
              }`}
            >
              {tag}
            </button>
          ))}
          {academicTags.map((at) => (
            <button
              key={at.query}
              onClick={() => onSearchChange(at.query)}
              className="px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold transition-all cursor-pointer hidden xs:inline-block"
            >
              {at.label}
            </button>
          ))}
        </div>

        {/* Abstract SaaS Platform Visual Hub */}
        <div className="mt-4 sm:mt-6 max-w-lg mx-auto px-1 sm:px-2">
          <HeroIllustration isDarkMode={isDarkMode} />
        </div>
      </div>
    </section>
  );
};

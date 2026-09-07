import React from 'react';
import { Search, X, Sparkles, Wand2, Lightbulb, Zap, Terminal, GraduationCap, Repeat, BookOpen, Cpu } from 'lucide-react';
import { CategoryId } from '../types';

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

const ACADEMIC_TAGS = [
  { label: '#مذكرات_تخرج', query: 'مذكرات_تخرج' },
  { label: '#توثيق_مراجع_APA', query: 'توثيق_مراجع_APA' },
  { label: '#تلخيص_الأوراق_العلمية', query: 'تلخيص_الأوراق_العلمية' },
  { label: '#فحص_الانتحال_العلمي', query: 'فحص_الانتحال_العلمي' },
  { label: '#محاكاة_رياضية', query: 'محاكاة_رياضية' },
  { label: '#كتابة_أكاديمية_LaTeX', query: 'كتابة_أكاديمية_LaTeX' },
  { label: '#بدائل_ChatGPT_2026', query: 'بدائل_ChatGPT_2026' },
  { label: '#أكواد_وبرمجة', query: 'أكواد_وبرمجة' }
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
  hasTypoCorrection
}) => {
  return (
    <section className={`relative overflow-hidden py-10 sm:py-14 border-b transition-colors ${
      isDarkMode 
        ? 'bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-slate-800' 
        : 'bg-gradient-to-b from-slate-100/90 via-indigo-50/40 to-slate-100/70 border-slate-200/80'
    }`}>
      {/* Decorative background ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-3 sm:px-6 text-center">
        {/* Badges Bar */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-3 sm:mb-4">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-indigo-100/80 text-indigo-900 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80 shadow-2xs">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="truncate">دليل وبدائل الذكاء الاصطناعي العربي 2026</span>
          </div>

          {onSelectCategory && (
            <a
              href="/category/ai_alternatives"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('ai_alternatives');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-purple-500/15 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-700/70 hover:scale-105 transition-all shadow-2xs cursor-pointer"
            >
              <Repeat className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 animate-pulse" />
              <span>⚡ منصة البدائل 2026</span>
            </a>
          )}

          {onSelectCategory && (
            <a
              href="/category/academic_scholar"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('academic_scholar');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/70 hover:scale-105 transition-all shadow-2xs cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>🎓 حقيبة الطلبة والأساتذة</span>
            </a>
          )}

          {onOpenPromptsLibrary && (
            <button
              onClick={onOpenPromptsLibrary}
              className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/70 hover:scale-105 transition-all shadow-2xs cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-amber-500" />
              <span>مكتبة الأوامر</span>
            </button>
          )}
        </div>

        {/* Main Title */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3 sm:mb-4 leading-tight">
          اكتشف أفضل أدوات وبدائل الذكاء الاصطناعي
          <span className="block mt-1 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            وحقيبة البحث العلمي للطلبة والأساتذة 2026
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed font-normal px-2">
          كتالوج تفاعلي شامل لأقوى بدائل ChatGPT وMidjourney وCopilot المجانية والمفتوحة، مع قسم مخصص لأدوات مذكرات التخرج، توثيق مراجع APA، وتلخيص الأوراق العلمية.
        </p>

        {/* Search Bar Container */}
        <div className="relative max-w-2xl mx-auto mb-4">
          <div className="relative flex items-center shadow-md shadow-slate-900/5 rounded-2xl overflow-hidden border border-slate-300/80 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all focus-within:ring-2 focus-within:ring-indigo-600 focus-within:border-indigo-600">
            <div className="pr-3.5 pl-1.5 text-indigo-700 dark:text-indigo-400 shrink-0">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>

            <input
              id="hero-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث باسم الأداة، البديل، أو الكلمة المفتاحية (مثال: APA, DeepSeek, Zotero)..."
              className="w-full py-3 sm:py-4 pr-1 pl-20 sm:pl-28 text-xs sm:text-base bg-transparent text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none"
              dir="rtl"
            />

            {searchQuery && (
              <button
                id="hero-search-clear-btn"
                onClick={() => onSearchChange('')}
                className="absolute left-16 sm:left-24 p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                title="مسح البحث"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}

            <button
              id="hero-search-submit-btn"
              onClick={onOpenSmartFinder}
              className="absolute left-2 sm:left-2.5 px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-1 shadow-xs shrink-0"
              title="مساعد الذكاء الاصطناعي لاختيار الأداة"
            >
              <Wand2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>اقترح لي</span>
            </button>
          </div>

          {/* Fuse.js Typo Correction / Did you mean suggestion */}
          {hasTypoCorrection && bestSuggestion && searchQuery.trim().length > 2 && (
            <div className="mt-2 p-2 px-3 sm:px-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-[11px] sm:text-xs flex items-center justify-between text-right animate-in fade-in shadow-2xs">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0" />
                <span>هل تقصد: <strong>{bestSuggestion}</strong>؟</span>
              </div>
              <button
                onClick={() => onSearchChange(bestSuggestion.split(' ')[0])}
                className="font-bold underline text-amber-800 dark:text-amber-300 hover:text-amber-950 shrink-0 mr-2"
              >
                تطبيق
              </button>
            </div>
          )}
        </div>

        {/* Academic Hashtags for Students & Scholars */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-2xl mx-auto mb-3">
          <span className="text-emerald-700 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1 ml-1">
            <BookOpen className="w-3 h-3 text-emerald-600" />
            <span>وسوم أكاديمية:</span>
          </span>
          {ACADEMIC_TAGS.map((at) => (
            <button
              key={at.query}
              onClick={() => onSearchChange(at.query)}
              className="px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold transition-all hover:scale-105"
            >
              {at.label}
            </button>
          ))}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-2xl mx-auto text-xs">
          <span className="text-slate-600 dark:text-slate-400 font-semibold ml-1 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-600" />
            <span>الأدوات الرائجة:</span>
          </span>
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              id={`quick-tag-${tag.replace(/\s+/g, '-')}`}
              onClick={() => onSelectKeyword(tag)}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-300/80 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700/80 dark:hover:bg-slate-700 hover:border-indigo-400 transition-all text-[12px] shadow-2xs font-medium"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};


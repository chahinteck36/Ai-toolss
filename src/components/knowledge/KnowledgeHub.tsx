import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Clock, Calendar, ArrowLeft, ArrowRight, Sparkles, Filter, CheckCircle2, ChevronRight, Tag } from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../../lib/i18n';
import { ARTICLE_CATEGORIES, KNOWLEDGE_ARTICLES } from '../../articles/articleData';
import { ArticleCategoryId, KnowledgeArticle } from '../../articles/types';
import { getLocalizedArticle } from '../../articles/articleTranslations';

interface KnowledgeHubProps {
  lang: SupportedLanguage;
  isDarkMode: boolean;
  onSelectArticle: (slug: string) => void;
  onNavigateHome: () => void;
}

export const KnowledgeHub: React.FC<KnowledgeHubProps> = ({
  lang,
  isDarkMode,
  onSelectArticle,
  onNavigateHome
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const t = TRANSLATIONS[lang] || TRANSLATIONS.ar;
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    return KNOWLEDGE_ARTICLES.filter((article) => {
      if (!article.isPublished) return false;

      // Category filter
      if (selectedCategory !== 'all' && article.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const localized = getLocalizedArticle(article, lang);
        const matchTitle = localized.title.toLowerCase().includes(query);
        const matchDesc = localized.description.toLowerCase().includes(query);
        const matchKeywords = article.keywords.some((k) => k.toLowerCase().includes(query));
        return matchTitle || matchDesc || matchKeywords;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, lang]);

  // Featured article (first featured or first item)
  const featuredArticle = useMemo(() => {
    if (searchQuery.trim() || selectedCategory !== 'all') return null;
    return KNOWLEDGE_ARTICLES.find((a) => a.featured && a.isPublished) || KNOWLEDGE_ARTICLES[0];
  }, [searchQuery, selectedCategory]);

  const regularArticles = useMemo(() => {
    if (!featuredArticle) return filteredArticles;
    return filteredArticles.filter((a) => a.id !== featuredArticle.id);
  }, [filteredArticles, featuredArticle]);

  const getCategoryName = (catId: ArticleCategoryId): string => {
    const cat = ARTICLE_CATEGORIES.find((c) => c.id === catId);
    if (!cat) return catId;
    if (lang === 'en') return cat.nameEn;
    if (lang === 'fr') return cat.nameFr;
    return cat.nameAr;
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Breadcrumb Bar */}
      <div className={`border-b ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <button
              onClick={onNavigateHome}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {t.backToHome}
            </button>
            <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            <span className="font-semibold text-slate-900 dark:text-white">
              {t.knowledgeCenter}
            </span>
          </nav>
        </div>
      </div>

      {/* Hub Hero Banner */}
      <div className={`relative overflow-hidden border-b ${
        isDarkMode 
          ? 'bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-slate-800' 
          : 'bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 border-slate-200'
      }`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>{t.knowledgeCenter} • Adawatai</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {t.knowledgeCenter}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.knowledgeCenterDesc}
            </p>

            {/* Search Input */}
            <div className="pt-2 max-w-xl mx-auto">
              <div className="relative">
                <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${isRtl ? 'right-4' : 'left-4'}`} />
                <input
                  id="knowledge-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchArticles}
                  className={`w-full py-3 text-sm rounded-2xl border transition-all shadow-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'
                  } ${
                    isDarkMode 
                      ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' 
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className={`absolute top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 ${isRtl ? 'left-3' : 'right-3'}`}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                : isDarkMode
                ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {t.categoryAll}
          </button>

          {ARTICLE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const catName = lang === 'en' ? cat.nameEn : lang === 'fr' ? cat.nameFr : cat.nameAr;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-bold shadow-sm shadow-indigo-600/20'
                    : isDarkMode
                    ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {catName}
              </button>
            );
          })}
        </div>

        {/* Featured Article Card (Shown when not searching and on 'all' category) */}
        {featuredArticle && (
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{lang === 'ar' ? 'المقال المميز' : lang === 'fr' ? 'Article à la une' : 'Featured Guide'}</span>
            </div>

            {(() => {
              const loc = getLocalizedArticle(featuredArticle, lang);
              return (
                <div
                  onClick={() => onSelectArticle(featuredArticle.slug)}
                  className={`group relative p-6 sm:p-8 rounded-3xl border transition-all hover:shadow-xl cursor-pointer ${
                    isDarkMode
                      ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border-slate-800 hover:border-indigo-500/50'
                      : 'bg-gradient-to-br from-white via-white to-indigo-50/50 border-slate-200 hover:border-indigo-300 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2.5 flex-wrap text-xs">
                        <span className="px-2.5 py-1 rounded-lg font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                          {getCategoryName(featuredArticle.category)}
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{loc.readingTimeText}</span>
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{featuredArticle.updatedAt}</span>
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {loc.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                        {loc.description}
                      </p>

                      <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400">
                        <span>{lang === 'ar' ? 'قراءة الدليل بالكامل' : lang === 'fr' ? 'Lire le guide complet' : 'Read Full Guide'}</span>
                        <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {lang === 'ar' ? 'جميع المقالات والشروحات' : lang === 'fr' ? 'Tous les articles et guides' : 'All Articles & Tutorials'}
            </h3>
            <span className="text-xs text-slate-400">
              {filteredArticles.length} {lang === 'ar' ? 'مقال متوفر' : 'articles available'}
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto opacity-50" />
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {lang === 'ar' ? 'لم يتم العثور على مقالات تطابق خيارات البحث' : 'No articles match your criteria'}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {t.resetFilters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {regularArticles.map((article) => {
                const loc = getLocalizedArticle(article, lang);
                return (
                  <article
                    key={article.id}
                    onClick={() => onSelectArticle(article.slug)}
                    className={`group flex flex-col justify-between p-5 sm:p-6 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer ${
                      isDarkMode
                        ? 'bg-slate-900/90 border-slate-800 hover:border-indigo-500/50'
                        : 'bg-white border-slate-200 hover:border-indigo-300 shadow-xs'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Meta Tags */}
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="px-2.5 py-0.5 rounded-md font-semibold text-[11px] bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80">
                          {getCategoryName(article.category)}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{loc.readingTimeText}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {loc.title}
                      </h4>

                      {/* Excerpt */}
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                        {loc.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs mt-4">
                      <span className="text-slate-400 text-[11px]">
                        {article.updatedAt}
                      </span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                        <span>{lang === 'ar' ? 'قراءة' : lang === 'fr' ? 'Lire' : 'Read'}</span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

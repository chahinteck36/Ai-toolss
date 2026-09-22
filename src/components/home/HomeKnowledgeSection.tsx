import React from 'react';
import { BookOpen, ArrowLeft, ArrowRight, Clock, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { KnowledgeArticle } from '../../articles/types';
import { getLocalizedArticle } from '../../articles/articleTranslations';
import { SupportedLanguage } from '../../lib/i18n';

interface HomeKnowledgeSectionProps {
  articles: KnowledgeArticle[];
  onOpenArticle: (article: KnowledgeArticle) => void;
  onOpenKnowledgeHub: () => void;
  isDarkMode: boolean;
  lang?: SupportedLanguage;
}

export const HomeKnowledgeSection: React.FC<HomeKnowledgeSectionProps> = ({
  articles,
  onOpenArticle,
  onOpenKnowledgeHub,
  isDarkMode,
  lang = 'ar',
}) => {
  if (!articles || articles.length === 0) return null;

  const isAr = lang === 'ar';
  const safeLang: SupportedLanguage = lang === 'en' ? 'en' : 'ar';

  // Find featured article or fallback to first one with a heroImage
  const featuredArticle = 
    articles.find((a) => a.id === 'comprehensive-guide-file-conversion-2026' || a.id === 'ai-image-generation-editing-guide-2026' || a.featured) || 
    articles[0];

  const localizedFeatured = getLocalizedArticle(featuredArticle, safeLang);

  // Other secondary articles (take up to 2 for compactness)
  const secondaryArticles = articles
    .filter((a) => a.id !== featuredArticle.id && a.isPublished !== false)
    .slice(0, 2);

  const NavArrow = isAr ? ArrowLeft : ArrowRight;
  const NavChevron = isAr ? ChevronLeft : ChevronRight;

  return (
    <section 
      id="home-knowledge-section"
      dir={isAr ? 'rtl' : 'ltr'}
      className="space-y-3 sm:space-y-4 pt-2 sm:pt-4"
      aria-label={isAr ? 'مركز المعرفة والأدلة التخصصية' : 'Knowledge Center & Practical Guides'}
    >
      {/* Compact Section Header */}
      <div className="flex items-center justify-between pb-1 sm:pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              {isAr ? 'مركز المعرفة والأدلة التخصصية' : 'Knowledge Center & Practical Guides'}
            </h2>
          </div>
        </div>

        <button
          onClick={onOpenKnowledgeHub}
          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
        >
          <span>{isAr ? 'عرض مركز المعرفة' : 'View Knowledge Hub'}</span>
          <NavArrow className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Structured Layout: 1 Featured Article (Left/Main) + 2 Secondary Articles (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch">
        
        {/* Featured Article Card (7 Cols) */}
        <div className="lg:col-span-7">
          <a
            href={`/knowledge/${featuredArticle.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onOpenArticle(featuredArticle);
            }}
            className={`group h-full flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-900/90 border-slate-800 hover:border-indigo-500/60 shadow-xs' 
                : 'bg-white border-slate-200/90 hover:border-indigo-400 shadow-2xs'
            }`}
          >
            <div>
              {/* Featured Badge & Reading time */}
              <div className="flex items-center justify-between gap-2 mb-2.5 text-xs">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-[11px]">
                  <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                  <span>{isAr ? 'دليل مميز' : 'Featured Guide'}</span>
                </span>
                <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-[11px] font-medium">
                  <Clock className="w-3 h-3" />
                  <span>{isAr ? `${featuredArticle.readingTime} دقائق قراءة` : `${featuredArticle.readingTime} min read`}</span>
                </span>
              </div>

              {/* Small & Crisp Hero Image Preview */}
              {featuredArticle.heroImage && (
                <div className="relative w-full aspect-[16/7] max-h-40 sm:max-h-44 mb-2.5 rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-slate-950/20">
                  <img
                    src={featuredArticle.heroImage.src}
                    alt={featuredArticle.heroImage.alt}
                    width={featuredArticle.heroImage.width || 800}
                    height={featuredArticle.heroImage.height || 350}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}

              {/* Title */}
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2">
                {localizedFeatured.title}
              </h3>

              {/* Short Intro */}
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed font-normal">
                {localizedFeatured.intro}
              </p>
            </div>

            {/* Bottom CTA */}
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span>{isAr ? 'قراءة الدليل' : 'Read Guide'}</span>
              <NavChevron className={`w-3.5 h-3.5 ${isAr ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`} />
            </div>
          </a>
        </div>

        {/* Secondary Articles Stack (5 Cols) - Exactly 2 Articles */}
        <div className="lg:col-span-5 flex flex-col gap-2.5 sm:gap-3">
          {secondaryArticles.map((article) => {
            const loc = getLocalizedArticle(article, safeLang);
            return (
              <a
                key={article.id}
                href={`/knowledge/${article.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onOpenArticle(article);
                }}
                className={`group flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer flex-1 ${
                  isDarkMode 
                    ? 'bg-slate-900/70 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900' 
                    : 'bg-white border-slate-200/80 hover:border-indigo-300 hover:bg-slate-50/80 shadow-2xs'
                }`}
              >
                {/* Thumbnail */}
                {article.heroImage ? (
                  <div className="w-18 h-14 sm:w-20 sm:h-16 rounded-lg overflow-hidden border border-slate-200/70 dark:border-slate-800 bg-slate-950/20 shrink-0">
                    <img
                      src={article.heroImage.src}
                      alt={article.heroImage.alt}
                      width={article.heroImage.width || 180}
                      height={article.heroImage.height || 120}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                )}

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mb-0.5">
                    <span>{isAr ? `${article.readingTime} دقائق` : `${article.readingTime} min`}</span>
                    <span>•</span>
                    <span className="truncate">{article.author.name}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                    {loc.title}
                  </h4>
                </div>

                <NavChevron className={`w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 ${isAr ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-all shrink-0`} />
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};

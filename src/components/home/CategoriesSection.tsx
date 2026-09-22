import React, { useState } from 'react';
import { Category, CategoryId } from '../../types';
import { CategoryVisualIcon } from './CategoryVisualIcon';
import { ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { SupportedLanguage } from '../../lib/i18n';

interface CategoriesSectionProps {
  categories: Category[];
  selectedCategory: CategoryId;
  onSelectCategory: (categoryId: CategoryId) => void;
  categoryCounts: Record<string, number>;
  totalToolsCount: number;
  isDarkMode: boolean;
  lang?: SupportedLanguage;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  totalToolsCount,
  isDarkMode,
  lang = 'ar',
}) => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const isAr = lang === 'ar';

  // Filter out the 'all' pseudo-category for the compact grid
  const actualCategories = categories.filter((c) => c.id !== 'all');

  // Initial display: 6 top categories (or all if expanded)
  const INITIAL_COUNT = 6;
  const displayedCategories = showAllCategories 
    ? actualCategories 
    : actualCategories.slice(0, INITIAL_COUNT);

  const remainingCount = actualCategories.length - INITIAL_COUNT;

  const handleCardClick = (catId: CategoryId) => {
    onSelectCategory(catId);
    // Smooth scroll to the tools filter anchor
    const targetElement = document.getElementById('tools-filter-anchor') || document.getElementById('tools-catalog');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="categories-section"
      className="space-y-3 sm:space-y-4 pt-1 sm:pt-2"
      aria-label={isAr ? 'تصنيفات الأدوات' : 'Tool categories'}
    >
      {/* Compact Section Header */}
      <div className="flex items-center justify-between pb-1 sm:pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              {isAr ? 'تصفح حسب التصنيف' : 'Browse by Category'}
            </h2>
          </div>
        </div>

        {/* Reset to all / Show count */}
        <button
          onClick={() => handleCardClick('all')}
          className={`px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
              : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          {isAr ? `كل الأدوات (${totalToolsCount})` : `All Tools (${totalToolsCount})`}
        </button>
      </div>

      {/* Compact Category Grid (2 columns on mobile, 3 on sm, 6 on md+) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-2.5">
        {displayedCategories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <a
              key={cat.id}
              href={`/category/${cat.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleCardClick(cat.id);
              }}
              className={`group relative p-2.5 sm:p-3 rounded-xl border transition-all duration-150 flex flex-col items-center text-center justify-center cursor-pointer ${
                isSelected
                  ? 'bg-indigo-50/95 dark:bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                  : 'bg-white hover:bg-slate-50 dark:bg-slate-900/90 dark:hover:bg-slate-850 border-slate-200/90 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600/60 hover:shadow-2xs'
              }`}
            >
              {/* Visual Icon */}
              <div className={`p-1.5 sm:p-2 rounded-lg border mb-1.5 transition-transform duration-150 group-hover:scale-105 ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400'
                  : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300'
              }`}>
                <CategoryVisualIcon categoryId={cat.id} className="w-4 h-4 sm:w-5 sm:h-5" isDarkMode={isDarkMode} />
              </div>

              {/* Category Name */}
              <h3 className={`text-xs sm:text-[13px] font-bold transition-colors leading-tight line-clamp-1 w-full px-1 ${
                isSelected
                  ? 'text-indigo-900 dark:text-white'
                  : 'text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
              }`}>
                {isAr ? cat.nameAr : cat.nameEn}
              </h3>

              {/* Tool Count */}
              <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                {isAr 
                  ? `${count} ${count === 1 ? 'أداة' : count === 2 ? 'أداتان' : 'أدوات'}`
                  : `${count} ${count === 1 ? 'Tool' : 'Tools'}`
                }
              </span>
            </a>
          );
        })}
      </div>

      {/* Expand/Collapse Toggle for Remaining Categories */}
      {remainingCount > 0 && (
        <div className="flex justify-center pt-1">
          <button
            onClick={() => setShowAllCategories((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100/90 hover:bg-slate-200/90 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
          >
            <span>
              {showAllCategories 
                ? (isAr ? 'عرض تصنيفات أقل' : 'Show fewer categories')
                : (isAr ? `عرض جميع التصنيفات (+${remainingCount})` : `Show all categories (+${remainingCount})`)}
            </span>
            {showAllCategories ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      )}
    </section>
  );
};

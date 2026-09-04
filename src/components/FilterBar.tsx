import React from 'react';
import { 
  Filter, 
  ArrowUpDown, 
  Check, 
  Heart, 
  Globe, 
  Sparkles, 
  Grid, 
  List, 
  RotateCcw,
  Bot,
  PenTool,
  Image,
  Video,
  Code2,
  Headphones,
  Search,
  Palette,
  Languages,
  GraduationCap,
  LayoutGrid
} from 'lucide-react';
import { Category, CategoryId, FilterState } from '../types';

interface FilterBarProps {
  categories: Category[];
  filterState: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
  totalToolsCount: number;
  viewMode: 'grid' | 'compact';
  onToggleViewMode: (mode: 'grid' | 'compact') => void;
  isDarkMode: boolean;
  categoryCounts: Record<string, number>;
}

// Icon mapping helper
const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Bot': return Bot;
    case 'PenTool': return PenTool;
    case 'Image': return Image;
    case 'Video': return Video;
    case 'Code2': return Code2;
    case 'Headphones': return Headphones;
    case 'Search': return Search;
    case 'Palette': return Palette;
    case 'Languages': return Languages;
    case 'GraduationCap': return GraduationCap;
    case 'Sparkles': return Sparkles;
    case 'LayoutGrid':
    default: return LayoutGrid;
  }
};

const PRICING_OPTIONS = [
  { id: 'all', label: 'كافة خيارات الأسعار' },
  { id: 'free', label: 'مجاني 100%' },
  { id: 'freemium', label: 'مجاني جزئياً (Freemium)' },
  { id: 'open_source', label: 'مفتوح المصدر (Open Source)' },
  { id: 'free_trial', label: 'تجربة مجانية' },
  { id: 'paid', label: 'مدفوع' },
];

const SORT_OPTIONS: { id: FilterState['sortBy']; label: string }[] = [
  { id: 'rating', label: 'الأعلى تقييماً ⭐' },
  { id: 'popular', label: 'الأكثر شهرة 🔥' },
  { id: 'newest', label: 'المضافة حديثاً 🆕' },
  { id: 'alphabetical', label: 'أبجدياً (أ - ي)' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  filterState,
  onFilterChange,
  onResetFilters,
  totalFilteredCount,
  totalToolsCount,
  viewMode,
  onToggleViewMode,
  isDarkMode,
  categoryCounts,
}) => {
  const isFiltered = 
    filterState.searchQuery !== '' ||
    filterState.selectedCategory !== 'all' ||
    filterState.selectedPricing !== 'all' ||
    filterState.onlyFavorites ||
    filterState.onlyArabicSupport;

  return (
    <div className="space-y-4">
      {/* Category Pills Navigation (Horizontal scrollable) */}
      <div className="relative">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
          {categories.map((cat) => {
            const IconComponent = getCategoryIcon(cat.iconName);
            const isSelected = filterState.selectedCategory === cat.id;
            const count = cat.id === 'all' ? totalToolsCount : (categoryCounts[cat.id] || 0);

            return (
              <button
                key={cat.id}
                id={`category-pill-${cat.id}`}
                onClick={() => onFilterChange({ selectedCategory: cat.id })}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 shadow-2xs border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-500/25'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300/80 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700/80 hover:border-indigo-400'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'}`} />
                <span>{cat.nameAr}</span>
                <span className={`inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-bold rounded-full ${
                  isSelected
                    ? 'bg-indigo-800/60 text-white'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Controls Bar: Pricing, Arabic support, Favorites, Sort & View Mode */}
      <div className={`p-3 sm:p-3.5 rounded-2xl border transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/90 shadow-xs'
      }`}>
        {/* Left Side: Filter toggles & Pricing Dropdown */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Pricing Select */}
          <div className="relative flex-1 sm:flex-none min-w-[125px]">
            <select
              id="filter-pricing-select"
              value={filterState.selectedPricing}
              onChange={(e) => onFilterChange({ selectedPricing: e.target.value })}
              className="w-full appearance-none pr-7 sm:pr-8 pl-2.5 sm:pl-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {PRICING_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-2.5 text-slate-500">
              <Filter className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Arabic Support Toggle */}
          <button
            id="filter-arabic-toggle"
            onClick={() => onFilterChange({ onlyArabicSupport: !filterState.onlyArabicSupport })}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all ${
              filterState.onlyArabicSupport
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-700 dark:text-emerald-300'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-300/80 text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
            }`}
          >
            <Globe className={`w-3.5 h-3.5 ${filterState.onlyArabicSupport ? 'text-emerald-700' : 'text-slate-500'}`} />
            <span>يدعم العربية</span>
            {filterState.onlyArabicSupport && <Check className="w-3 h-3 text-emerald-700" />}
          </button>

          {/* Favorites Only Toggle */}
          <button
            id="filter-favorites-toggle"
            onClick={() => onFilterChange({ onlyFavorites: !filterState.onlyFavorites })}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all ${
              filterState.onlyFavorites
                ? 'bg-rose-50 border-rose-300 text-rose-800 dark:bg-rose-950/40 dark:border-rose-700 dark:text-rose-300'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-300/80 text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${filterState.onlyFavorites ? 'fill-rose-600 text-rose-600' : 'text-slate-500'}`} />
            <span>المفضلة</span>
            {filterState.onlyFavorites && <Check className="w-3 h-3 text-rose-600" />}
          </button>

          {/* Reset Filters button if any filter active */}
          {isFiltered && (
            <button
              id="filter-reset-btn"
              onClick={onResetFilters}
              className="flex items-center gap-1 px-2 py-1.5 sm:py-2 text-xs text-rose-700 hover:text-rose-800 dark:text-rose-400 hover:underline font-bold"
              title="إعادة ضبط كافة الفلاتر"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط</span>
            </button>
          )}
        </div>

        {/* Right Side: Sorting & View Mode */}
        <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
          {/* Result Count */}
          <div className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span>النتائج: </span>
            <strong className="text-indigo-700 dark:text-indigo-400 font-bold text-xs sm:text-sm">
              {totalFilteredCount}
            </strong>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                id="filter-sort-select"
                value={filterState.sortBy}
                onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
                className="appearance-none pr-6 sm:pr-7 pl-2.5 sm:pl-3 py-1.5 text-[11px] sm:text-xs font-semibold rounded-xl border border-slate-300/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5 sm:pr-2 text-slate-500">
                <ArrowUpDown className="w-3 h-3" />
              </div>
            </div>

            {/* View Mode Toggle (Grid vs Compact) */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-300/80 dark:border-slate-700">
              <button
                id="view-mode-grid"
                onClick={() => onToggleViewMode('grid')}
                className={`p-1 sm:p-1.5 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-400 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="عرض شبكي للبطاقات"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                id="view-mode-compact"
                onClick={() => onToggleViewMode('compact')}
                className={`p-1 sm:p-1.5 rounded-md transition-colors ${
                  viewMode === 'compact'
                    ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-400 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="عرض مدمج ومفصل"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

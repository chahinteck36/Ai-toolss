import React, { useState, memo } from 'react';
import { 
  ExternalLink, 
  Star, 
  Heart, 
  Globe, 
  Info, 
  Share2, 
  Check, 
  Flame, 
  Sparkles, 
  Tag,
  Laptop,
  Repeat,
  GraduationCap
} from 'lucide-react';
import { AiTool, PricingType } from '../types';

interface ToolCardProps {
  tool: AiTool;
  isFavorite: boolean;
  userRating: number | undefined;
  onToggleFavorite: (id: string) => void;
  onRateTool: (id: string, rating: number) => void;
  onOpenDetails: (tool: AiTool) => void;
  onTagClick: (tag: string) => void;
  viewMode: 'grid' | 'compact';
  isDarkMode: boolean;
}

const ToolCardComponent: React.FC<ToolCardProps> = ({
  tool,
  isFavorite,
  userRating,
  onToggleFavorite,
  onRateTool,
  onOpenDetails,
  onTagClick,
  viewMode,
  isDarkMode,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(tool.websiteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPricingBadge = (pricing: PricingType, pricingAr: string) => {
    switch (pricing) {
      case 'free':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            {pricingAr}
          </span>
        );
      case 'freemium':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
            {pricingAr}
          </span>
        );
      case 'open_source':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
            {pricingAr}
          </span>
        );
      case 'free_trial':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            {pricingAr}
          </span>
        );
      case 'paid':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
            {pricingAr}
          </span>
        );
    }
  };

  const displayRating = userRating || tool.rating;

  if (viewMode === 'compact') {
    return (
      <div 
        id={`tool-card-compact-${tool.id}`}
        className={`group p-4 rounded-2xl border transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/50 hover:shadow-indigo-950/30' 
            : 'bg-white border-slate-200/90 hover:border-indigo-400 hover:shadow-indigo-500/10'
        }`}
      >
        {/* Left side: Icon & Title & Tagline */}
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg bg-gradient-to-br ${tool.gradient} shrink-0 shadow-xs group-hover:scale-110 group-hover:rotate-1 transition-all duration-300`}>
            {tool.nameEn.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                {tool.nameAr}
              </h3>
              <span className="text-xs text-slate-400 font-normal">
                ({tool.nameEn})
              </span>
              {getPricingBadge(tool.pricing, tool.pricingAr)}
              {tool.supportsArabic && (
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  <Globe className="w-3 h-3" />
                  عربي
                </span>
              )}
              {tool.alternativeTo && tool.alternativeTo.length > 0 && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  <Repeat className="w-2.5 h-2.5" />
                  بديل لـ: {tool.alternativeTo[0]}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
              {tool.taglineAr}
            </p>
          </div>
        </div>

        {/* Right side: Interactive Rating, Favorite, & Actions */}
        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
          {/* Star Rating */}
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded-lg border border-amber-200/60 dark:border-amber-800/40">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
              {displayRating.toFixed(1)}
            </span>
          </div>

          {/* Favorite Toggle */}
          <button
            id={`favorite-btn-compact-${tool.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(tool.id);
            }}
            className={`p-2 rounded-xl border transition-all duration-200 active:scale-90 ${
              isFavorite 
                ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/40 dark:border-rose-800' 
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-600 dark:bg-slate-800 dark:border-slate-700'
            }`}
            title={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Details Button */}
          <a
            id={`details-btn-compact-${tool.id}`}
            href={`/tools/${encodeURIComponent(tool.id)}`}
            onClick={(e) => {
              e.preventDefault();
              onOpenDetails(tool);
            }}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors inline-flex items-center justify-center"
          >
            التفاصيل
          </a>

          {/* Visit Website */}
          <a
            id={`visit-link-compact-${tool.id}`}
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200 shadow-2xs hover:shadow-indigo-500/20 active:scale-95"
          >
            <span>زيارة</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div 
      id={`tool-card-${tool.id}`}
      className={`group relative rounded-2xl border transition-all duration-300 ease-out flex flex-col justify-between hover:-translate-y-2 hover:shadow-2xl ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/60 hover:shadow-indigo-950/40 shadow-slate-950/50 hover:ring-1 hover:ring-indigo-500/30' 
          : 'bg-white border-slate-200/90 hover:border-indigo-400/90 hover:shadow-indigo-500/15 shadow-xs shadow-slate-200/50 hover:ring-1 hover:ring-indigo-400/30'
      }`}
    >
      {/* Subtle Top Gradient Accent on Hover */}
      <div className="absolute top-0 inset-x-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Top Header inside card */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Logo & Name */}
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg bg-gradient-to-br ${tool.gradient} shadow-md shrink-0 group-hover:scale-110 group-hover:rotate-2 group-hover:shadow-indigo-500/30 transition-all duration-300`}>
              {tool.nameEn.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                  {tool.nameAr}
                </h3>
                {tool.isFeatured && (
                  <span className="flex items-center text-amber-500 group-hover:rotate-12 transition-transform duration-300" title="أداة مميزة">
                    <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
                  </span>
                )}
                {tool.isPopular && (
                  <span className="flex items-center text-rose-500 group-hover:scale-110 transition-transform duration-300" title="شعبية عالية">
                    <Flame className="w-3.5 h-3.5 fill-rose-500" />
                  </span>
                )}
              </div>
              <p className="text-xs font-medium text-slate-400 truncate">
                {tool.nameEn}
              </p>
            </div>
          </div>

          {/* Top Actions: Favorite & Share */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              id={`share-btn-${tool.id}`}
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors"
              title={copied ? 'تم نسخ الرابط!' : 'مشاركة رابط الأداة'}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              id={`favorite-btn-${tool.id}`}
              onClick={() => onToggleFavorite(tool.id)}
              className={`p-2 rounded-xl transition-transform active:scale-90 ${
                isFavorite 
                  ? 'bg-rose-50 text-rose-500 dark:bg-rose-950/50' 
                  : 'text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800'
              }`}
              title={isFavorite ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Pricing Badge & Arabic Support & Alternative to */}
        <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
          {getPricingBadge(tool.pricing, tool.pricingAr)}
          
          {tool.supportsArabic && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <Globe className="w-3 h-3 text-emerald-600" />
              <span>عربي</span>
            </span>
          )}

          {tool.category === 'academic_scholar' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700">
              <GraduationCap className="w-3 h-3" />
              حقيبة أكاديمية
            </span>
          )}

          {tool.alternativeTo && tool.alternativeTo.length > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 border border-purple-200 dark:border-purple-800 truncate max-w-[180px]">
              <Repeat className="w-2.5 h-2.5 shrink-0" />
              <span>بديل {tool.alternativeTo[0]}</span>
            </span>
          )}
        </div>

        {/* Tagline / Description */}
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 line-clamp-1 mb-1.5">
          {tool.taglineAr}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
          {tool.descriptionAr}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {tool.tags.slice(0, 3).map((tag) => (
            <button
              key={tag}
              id={`tool-${tool.id}-tag-${tag}`}
              onClick={() => onTagClick(tag)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              <Tag className="w-2.5 h-2.5 opacity-60" />
              <span>{tag}</span>
            </button>
          ))}
          {tool.tags.length > 3 && (
            <span className="text-[10px] text-slate-400 self-center">
              +{tool.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Interactive Rating & Action Buttons */}
      <div className={`p-4 pt-3 border-t rounded-b-2xl transition-colors ${
        isDarkMode ? 'bg-slate-900/50 border-slate-800/80' : 'bg-slate-50/70 border-slate-100'
      }`}>
        {/* Rating Stars Bar */}
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5" title="انقر لتقييم الأداة">
              {[1, 2, 3, 4, 5].map((starIndex) => {
                const isStarActive = (hoverRating !== null ? hoverRating >= starIndex : displayRating >= starIndex);
                return (
                  <button
                    key={starIndex}
                    id={`rate-${tool.id}-star-${starIndex}`}
                    type="button"
                    onMouseEnter={() => setHoverRating(starIndex)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => onRateTool(tool.id, starIndex)}
                    className="p-0.5 hover:scale-125 transition-transform"
                    title={`تقييم ${starIndex} من 5`}
                  >
                    <Star 
                      className={`w-3.5 h-3.5 ${
                        isStarActive 
                          ? 'fill-amber-400 text-amber-400' 
                          : 'text-slate-300 dark:text-slate-600'
                      }`} 
                    />
                  </button>
                );
              })}
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200 mr-1">
              {displayRating.toFixed(1)}
            </span>
            {userRating && (
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                (تقييمك)
              </span>
            )}
          </div>

          <span className="text-[11px] text-slate-400">
            {tool.reviewsCount} مراجعة
          </span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <a
            id={`open-modal-btn-${tool.id}`}
            href={`/tools/${encodeURIComponent(tool.id)}`}
            onClick={(e) => {
              e.preventDefault();
              onOpenDetails(tool);
            }}
            className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 active:scale-95 transition-all shadow-2xs cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-indigo-500 group-hover:rotate-12 transition-transform duration-300" />
            <span>التفاصيل</span>
          </a>

          <a
            id={`direct-link-btn-${tool.id}`}
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 transition-all shadow-xs shadow-indigo-500/20 hover:shadow-indigo-500/30"
          >
            <span>زيارة الأداة</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
};

export const ToolCard = memo(ToolCardComponent);



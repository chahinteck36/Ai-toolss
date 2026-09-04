import React, { useEffect } from 'react';
import { Advertisement } from '../types';
import { Sparkles, ExternalLink, Megaphone, ArrowLeft, Zap } from 'lucide-react';
import { recordAdClick, recordAdImpression } from '../lib/firebase';

interface SponsoredBannerProps {
  ad: Advertisement;
  isDarkMode: boolean;
}

export const SponsoredBanner: React.FC<SponsoredBannerProps> = ({
  ad,
  isDarkMode
}) => {
  useEffect(() => {
    if (ad?.id && ad.isActive) {
      recordAdImpression(ad.id);
    }
  }, [ad?.id, ad?.isActive]);

  if (!ad || !ad.isActive) return null;

  const handleClick = () => {
    recordAdClick(ad.id);
    window.open(ad.targetUrl, '_blank', 'noopener,noreferrer');
  };

  // 1. In-Article Top Banner
  if (ad.placement === 'in_article_top') {
    return (
      <div className={`my-3 p-3.5 sm:p-4 rounded-2xl border transition-all ${
        isDarkMode
          ? 'bg-indigo-950/30 border-indigo-500/30 text-indigo-200'
          : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-600 text-white">
              {ad.badgeText || 'إعلان مميز'}
            </span>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {ad.title}
              </h5>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-1">
                {ad.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={handleClick}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-xs shrink-0 self-end sm:self-center"
          >
            <span>{ad.ctaText || 'اكتشف المزيد'}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  // 2. In-Article Bottom Banner
  if (ad.placement === 'in_article_bottom') {
    return (
      <div className={`my-4 p-4 rounded-2xl border transition-all ${
        isDarkMode
          ? 'bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-900 border-purple-500/30'
          : 'bg-gradient-to-r from-purple-50 via-indigo-50 to-white border-purple-200 shadow-xs'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500 text-white">
                  {ad.badgeText || 'عرض حصري'}
                </span>
                <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {ad.title}
                </h5>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {ad.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={handleClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-all shadow-sm shrink-0 self-end sm:self-center"
          >
            <span>{ad.ctaText || 'الحصول على العرض'}</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // 3. Top Banner
  if (ad.placement === 'top_banner') {
    return (
      <div className={`relative overflow-hidden rounded-2xl p-4 sm:p-5 border transition-all ${
        isDarkMode
          ? 'bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-indigo-500/30'
          : 'bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 border-indigo-200/80 shadow-xs'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 sm:mt-0">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-600 text-white shadow-xs">
                  <Sparkles className="w-3 h-3" />
                  {ad.badgeText || 'إعلان برعاية'}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {ad.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                {ad.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              onClick={handleClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all transform active:scale-95 shadow-sm"
            >
              <span>{ad.ctaText || 'اكتشف المزيد'}</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. Footer CTA Banner
  if (ad.placement === 'footer') {
    return (
      <div className={`p-6 rounded-3xl border text-center transition-all ${
        isDarkMode
          ? 'bg-gradient-to-b from-indigo-950/40 to-slate-900 border-indigo-500/30'
          : 'bg-gradient-to-b from-indigo-50 to-white border-indigo-200/80 shadow-xs'
      }`}>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white mb-3 shadow-xs">
          <Zap className="w-3.5 h-3.5" />
          {ad.badgeText || 'إعلان معتمد'}
        </span>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          {ad.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-4 leading-relaxed">
          {ad.subtitle}
        </p>
        <button
          onClick={handleClick}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md transform active:scale-95"
        >
          <span>{ad.ctaText || 'اكتشف الآن'}</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // 5. Grid Sponsored Card Style (Default)
  return (
    <div
      onClick={handleClick}
      className={`group cursor-pointer relative rounded-2xl p-5 border transition-all hover:scale-[1.01] hover:shadow-md ${
        isDarkMode
          ? 'bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 border-amber-500/30 hover:border-amber-500/50'
          : 'bg-gradient-to-br from-amber-50/70 via-white to-orange-50/50 border-amber-200/80 hover:border-amber-400 shadow-xs'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-white shadow-xs">
          <Sparkles className="w-3 h-3" />
          {ad.badgeText || 'شريك موثوق'}
        </span>
        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
          <span>إعلان</span>
          <ExternalLink className="w-3 h-3" />
        </span>
      </div>

      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
        {ad.title}
      </h3>
      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
        {ad.subtitle}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
          {ad.ctaText || 'زيارة العرض'}
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
        </span>
        <span className="text-[10px] text-slate-400">نقرات: {ad.clicks || 0}</span>
      </div>
    </div>
  );
};


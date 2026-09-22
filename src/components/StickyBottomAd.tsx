import React, { useState, useEffect, useRef } from 'react';
import { Advertisement, SupportedLanguage } from '../types';
import { Sparkles, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { recordAdClick, recordAdImpression } from '../lib/firebase';

interface StickyBottomAdProps {
  ads: Advertisement[];
  isDarkMode: boolean;
  lang?: SupportedLanguage;
}

export const StickyBottomAd: React.FC<StickyBottomAdProps> = ({
  ads,
  isDarkMode,
  lang = 'ar'
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isAr = lang === 'ar';

  // Find active sticky bottom ad (or fallback to top_banner if specified)
  const stickyAd = ads.find((a) => a.isActive && a.placement === 'sticky_bottom');

  useEffect(() => {
    if (stickyAd) {
      recordAdImpression(stickyAd.id);
    }
  }, [stickyAd?.id]);

  useEffect(() => {
    if (!stickyAd || isDismissed) {
      document.documentElement.style.setProperty('--sticky-ad-height', '0px');
      document.body.classList.remove('has-sticky-bottom-ad');
      return;
    }

    const updateHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.offsetHeight || 72;
        // Provide safe clearance (ad height + 20px breathing room)
        document.documentElement.style.setProperty('--sticky-ad-height', `${height + 20}px`);
        document.body.classList.add('has-sticky-bottom-ad');
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      document.documentElement.style.setProperty('--sticky-ad-height', '0px');
      document.body.classList.remove('has-sticky-bottom-ad');
      window.removeEventListener('resize', updateHeight);
    };
  }, [stickyAd, isDismissed]);

  if (!stickyAd || isDismissed) return null;

  const handleClick = () => {
    recordAdClick(stickyAd.id);
    window.open(stickyAd.targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-0 inset-x-0 z-40 p-2.5 sm:p-3 animate-in slide-in-from-bottom duration-300 pointer-events-none"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className={`max-w-5xl mx-auto rounded-2xl sm:rounded-3xl p-3 sm:p-4 border shadow-2xl backdrop-blur-md pointer-events-auto flex items-center justify-between gap-3 sm:gap-4 transition-all ${
        isDarkMode
          ? 'bg-slate-900/95 border-indigo-500/40 text-slate-100'
          : 'bg-white/95 border-indigo-200 text-slate-900 shadow-indigo-500/10'
      }`}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-5 h-5 animate-pulse text-amber-300" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shrink-0">
                {stickyAd.badgeText || (isAr ? 'إعلان مميز' : 'Featured Ad')}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                {stickyAd.title}
              </h4>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 truncate max-w-xl">
              {stickyAd.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleClick}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all transform active:scale-95 shadow-sm"
          >
            <span>{stickyAd.ctaText || (isAr ? 'زيارة العرض' : 'Visit Offer')}</span>
            {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isAr ? 'إخفاء الإعلان' : 'Dismiss Ad'}
            aria-label="Close sticky ad"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

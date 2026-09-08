import React from 'react';

interface AdSlotProps {
  slotType: 'top' | 'content' | 'bottom';
  lang: string;
  isDarkMode: boolean;
}

export const AdSlot: React.FC<AdSlotProps> = ({ slotType, lang, isDarkMode }) => {
  const isAr = lang === 'ar';

  return (
    <div
      className={`w-full mx-auto my-4 p-3 rounded-2xl border text-center transition-all ${
        isDarkMode
          ? 'bg-slate-900/40 border-slate-800/80 text-slate-500'
          : 'bg-slate-50/60 border-slate-200/60 text-slate-400'
      } ${
        slotType === 'top'
          ? 'min-h-[90px] max-w-4xl'
          : slotType === 'content'
          ? 'min-h-[120px] max-w-3xl'
          : 'min-h-[100px] max-w-4xl'
      } flex flex-col items-center justify-center`}
    >
      {/* Google AdSense container placeholder for production integration */}
      <span className="text-[10px] tracking-wider uppercase opacity-50 mb-1">
        {isAr ? 'مساحة إعلانية مخصصة (AdSense)' : 'Sponsored Space'}
      </span>
      <div className="w-full h-8 flex items-center justify-center opacity-40">
        <span className="text-xs">Adawatai.online Ads • Non-intrusive placement</span>
      </div>
    </div>
  );
};

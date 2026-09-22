import React from 'react';

interface HeroIllustrationProps {
  isDarkMode: boolean;
}

/**
 * Clean, technical, abstract SaaS UI illustration representing:
 * "Discovering & orchestrating AI tools, research, documents & creative workflows from a single hub"
 * Built with pure responsive SVGs in the site's primary indigo/purple and neutral palettes.
 */
export const HeroIllustration: React.FC<HeroIllustrationProps> = ({ isDarkMode }) => {
  return (
    <div 
      className="relative w-full max-w-lg mx-auto select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Subtle outer glow backdrop */}
      <div 
        className={`absolute -inset-1.5 rounded-2xl blur-xl opacity-35 transition-colors duration-500 ${
          isDarkMode 
            ? 'bg-gradient-to-tr from-indigo-900/30 via-purple-900/20 to-slate-900/10' 
            : 'bg-gradient-to-tr from-indigo-200/40 via-purple-100/30 to-slate-100/20'
        }`} 
      />

      {/* Main SaaS Platform Window */}
      <div className={`relative rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden shadow-lg ${
        isDarkMode 
          ? 'bg-slate-900/95 border-slate-800 shadow-indigo-950/30' 
          : 'bg-white/95 border-slate-200/90 shadow-indigo-500/10'
      }`}>
        {/* Window Top Bar with OS Dots and breadcrumb */}
        <div className={`flex items-center justify-between px-3 py-1.5 sm:px-4 sm:py-2 border-b text-[10px] font-mono ${
          isDarkMode ? 'bg-slate-950/60 border-slate-800 text-slate-400' : 'bg-slate-50/90 border-slate-200 text-slate-500'
        }`}>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-rose-400/80" />
            <div className="w-2 h-2 rounded-full bg-amber-400/80" />
            <div className="w-2 h-2 rounded-full bg-emerald-400/80" />
            <span className="mr-1.5 text-[9px] sm:text-[10px] text-slate-400 font-sans">adawatai // hub-2026</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-sans font-medium text-emerald-600 dark:text-emerald-400">معالجة محلية</span>
          </div>
        </div>

        {/* Interior Grid Visual Layout */}
        <div className="p-2.5 sm:p-3.5 space-y-2 sm:space-y-3">
          
          {/* Visual Mini Search & Nodes Bar */}
          <div className={`p-1.5 sm:p-2 rounded-lg border flex items-center justify-between gap-2 ${
            isDarkMode ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50/80 border-slate-200/80'
          }`}>
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <svg className="w-3.5 h-3.5 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path d="m21 21-4.3-4.3" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div className="h-1.5 rounded bg-indigo-500/20 dark:bg-indigo-400/20 w-24 sm:w-40 animate-pulse" />
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                AI Match
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 hidden xs:inline-block">
                100% Client-Side
              </span>
            </div>
          </div>

          {/* 3 Abstract Workflow Cards */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
            {/* Card 1: Documents & PDF Engine */}
            <div className={`p-2 sm:p-2.5 rounded-lg border flex flex-col justify-between transition-colors ${
              isDarkMode ? 'bg-slate-950/40 border-slate-800/80' : 'bg-rose-50/30 border-rose-100'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <span className="text-[8px] sm:text-[9px] font-bold text-slate-400">PDF</span>
              </div>
              <div className="space-y-1">
                <div className="h-1 w-10 sm:w-12 bg-slate-300 dark:bg-slate-700 rounded-full" />
                <div className="h-1 w-6 sm:w-8 bg-rose-400/40 rounded-full" />
              </div>
            </div>

            {/* Card 2: AI Vision & Creative Layers */}
            <div className={`p-2 sm:p-2.5 rounded-lg border flex flex-col justify-between transition-colors ${
              isDarkMode ? 'bg-slate-950/40 border-slate-800/80' : 'bg-indigo-50/40 border-indigo-100'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                  </svg>
                </div>
                <span className="text-[8px] sm:text-[9px] font-bold text-slate-400">STUDIO</span>
              </div>
              <div className="space-y-1">
                <div className="h-1 w-12 sm:w-14 bg-slate-300 dark:bg-slate-700 rounded-full" />
                <div className="h-1 w-8 sm:w-10 bg-indigo-400/40 rounded-full" />
              </div>
            </div>

            {/* Card 3: Academic & Research Suite */}
            <div className={`p-2 sm:p-2.5 rounded-lg border flex flex-col justify-between transition-colors ${
              isDarkMode ? 'bg-slate-950/40 border-slate-800/80' : 'bg-emerald-50/40 border-emerald-100'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  </svg>
                </div>
                <span className="text-[8px] sm:text-[9px] font-bold text-slate-400">SCHOLAR</span>
              </div>
              <div className="space-y-1">
                <div className="h-1 w-10 sm:w-12 bg-slate-300 dark:bg-slate-700 rounded-full" />
                <div className="h-1 w-7 sm:w-9 bg-emerald-400/40 rounded-full" />
              </div>
            </div>
          </div>

          {/* Workflow Connector Graphic */}
          <div className="pt-0.5 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-500 font-sans">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">منظومة موحدة</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <span>بدائل ذكية</span>
              <span className="text-[8px]">•</span>
              <span>أدوات متصفح</span>
              <span className="text-[8px]">•</span>
              <span>أوراق بحثية</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

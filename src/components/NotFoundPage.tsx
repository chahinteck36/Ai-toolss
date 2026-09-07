import React, { useState } from 'react';
import { Search, Home, ArrowLeft, ArrowRight, AlertCircle, Sparkles, Compass } from 'lucide-react';
import { AiTool } from '../types';
import { SupportedLanguage, TRANSLATIONS } from '../lib/i18n';
import { SEO } from './SEO';
import { get404SEO } from '../lib/seoHelpers';

interface NotFoundPageProps {
  onBackHome: () => void;
  onSearch: (query: string) => void;
  onSelectTool: (tool: AiTool) => void;
  suggestedTools: AiTool[];
  lang: SupportedLanguage;
  isDarkMode: boolean;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onBackHome,
  onSearch,
  onSelectTool,
  suggestedTools,
  lang,
  isDarkMode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ar;
  const isRtl = lang === 'ar';
  const seoData = get404SEO(lang);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      onBackHome();
    }
  };

  return (
    <div className={`min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center ${
      isDarkMode ? 'text-slate-200' : 'text-slate-800'
    }`}>
      {/* 404 SEO with strict noindex */}
      <SEO
        title={seoData.title}
        description={seoData.description}
        canonical={seoData.canonical}
        robots={seoData.robots}
        jsonLd={seoData.jsonLd}
        lang={lang}
      />

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Visual Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-2 border border-indigo-500/20 shadow-lg shadow-indigo-500/10 animate-bounce">
          <AlertCircle className="w-10 h-10" />
        </div>

        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-900 mb-3">
            Error 404 • Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            {t.pageNotFoundHeading}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            {t.pageNotFoundDesc}
          </p>
        </div>

        {/* Quick Search in Catalog */}
        <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto relative mt-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className={`w-full py-3 px-4 ${isRtl ? 'pr-11 pl-24' : 'pl-11 pr-24'} text-sm rounded-2xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' 
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-sm'
            }`}
          />
          <Search className={`w-5 h-5 absolute top-3.5 ${isRtl ? 'right-3.5' : 'left-3.5'} text-slate-400`} />
          <button
            type="submit"
            className={`absolute top-2 ${isRtl ? 'left-2' : 'right-2'} px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors`}
          >
            {isRtl ? 'بحث' : 'Search'}
          </button>
        </form>

        {/* Primary Action Button */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onBackHome}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>{t.backToHome}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Suggested Popular Tools */}
        {suggestedTools.length > 0 && (
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{isRtl ? 'أدوات ذكاء اصطناعي شائعة قد تبحث عنها' : 'Popular AI Tools You Might Be Looking For'}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
              {suggestedTools.slice(0, 4).map((tool) => (
                <a
                  key={tool.id}
                  href={`/tools/${encodeURIComponent(tool.id)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool(tool);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all hover:border-indigo-400 hover:shadow-xs group cursor-pointer ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className={`w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br ${tool.gradient || 'from-indigo-600 to-purple-600'}`}>
                    {tool.nameEn.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block truncate group-hover:text-indigo-600 transition-colors">
                    {isRtl ? tool.nameAr : tool.nameEn}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                    {tool.pricingAr}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { Sparkles, Bookmark, PlusCircle, Compass, Moon, Sun, Layers, Cpu, Database, Info, ShieldCheck, Terminal, Globe, BookOpen } from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../lib/i18n';

interface HeaderProps {
  totalTools: number;
  favoritesCount: number;
  freeToolsCount: number;
  categoriesCount: number;
  pendingSubmissionsCount?: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAddModal: () => void;
  onOpenSmartFinder: () => void;
  onOpenPromptsLibrary?: () => void;
  onOpenKnowledgeCenter?: () => void;
  onOpenAboutUs?: () => void;
  onOpenPrivacyPolicy?: () => void;
  onOpenContact?: () => void;
  onlyFavorites: boolean;
  onToggleFavoritesOnly: () => void;
  isAdmin?: boolean;
  lang?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalTools,
  favoritesCount,
  freeToolsCount,
  categoriesCount,
  pendingSubmissionsCount = 0,
  isDarkMode,
  onToggleDarkMode,
  onOpenAddModal,
  onOpenSmartFinder,
  onOpenPromptsLibrary,
  onOpenKnowledgeCenter,
  onOpenAboutUs,
  onOpenPrivacyPolicy,
  onOpenContact,
  onlyFavorites,
  onToggleFavoritesOnly,
  isAdmin = true,
  lang = 'ar',
  onLanguageChange
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ar;

  return (
    <header className={`sticky top-0 z-30 backdrop-blur-md border-b transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-slate-900/90 border-slate-800 text-slate-100' 
        : 'bg-white/90 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <a 
              href={lang === 'ar' ? '/' : `/?lang=${lang}`} 
              className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-amber-500 text-white shadow-md shadow-indigo-500/20 group shrink-0 ring-1 ring-white/20"
              title={`${t.siteName} - adawatai.online`}
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse text-amber-200" />
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white text-[9px] font-bold text-white">
                ✓
              </span>
            </a>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <a 
                  href={lang === 'ar' ? '/' : `/?lang=${lang}`} 
                  className="text-lg sm:text-2xl font-black tracking-tight bg-gradient-to-l from-indigo-600 via-purple-600 to-amber-600 dark:from-indigo-400 dark:via-purple-300 dark:to-amber-300 bg-clip-text text-transparent hover:opacity-90 transition-opacity truncate"
                >
                  {t.siteName}
                </a>
                <span className="hidden xs:inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700/80">
                  {t.vipBadge}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden md:block truncate">
                {t.headerTagline}
              </p>
            </div>
          </div>

          {/* Action Buttons & Navigation */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* About Us Link */}
            {onOpenAboutUs && (
              <button
                id="header-about-us-btn"
                onClick={onOpenAboutUs}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title={t.aboutUs}
              >
                <Info className="w-3.5 h-3.5 text-indigo-500" />
                <span className="hidden lg:inline">{t.aboutUs}</span>
              </button>
            )}

            {/* Contact Us Link */}
            {onOpenContact && (
              <button
                id="header-contact-btn"
                onClick={onOpenContact}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title={t.contactUs}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="hidden lg:inline">{t.contactUs}</span>
              </button>
            )}

            {/* Knowledge Center Link */}
            {onOpenKnowledgeCenter && (
              <button
                id="header-knowledge-center-btn"
                onClick={onOpenKnowledgeCenter}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                title={t.knowledgeCenter}
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="hidden md:inline">{t.knowledgeCenter}</span>
              </button>
            )}

            {/* Prompts Library Button */}
            {onOpenPromptsLibrary && (
              <button
                id="header-prompts-library-btn"
                onClick={onOpenPromptsLibrary}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white shadow-xs shadow-amber-500/30 transition-all transform active:scale-95 ring-1 ring-amber-400/40 cursor-pointer"
                title={t.promptsLibrary}
              >
                <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-100 animate-pulse" />
                <span className="hidden md:inline">{t.promptsLibrary}</span>
                <span className="hidden sm:inline-block md:hidden px-1 py-0.2 rounded text-[10px] bg-black/20 font-mono text-amber-100">
                  {lang === 'ar' ? 'أوامر' : 'Prompts'}
                </span>
              </button>
            )}

            {/* Smart Finder Assistant Button */}
            <button
              id="header-smart-finder-btn"
              onClick={onOpenSmartFinder}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-xs shadow-purple-500/25 transition-all transform active:scale-95 cursor-pointer"
              title={t.smartFinder}
            >
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{t.smartFinder}</span>
            </button>

            {/* Favorites shortcut */}
            <button
              id="header-favorites-btn"
              onClick={onToggleFavoritesOnly}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-xl border transition-all cursor-pointer ${
                onlyFavorites
                  ? 'bg-rose-50 border-rose-300 text-rose-600 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-400'
                  : 'bg-slate-100/80 hover:bg-slate-200/80 border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700'
              }`}
              title={t.favorites}
            >
              <Bookmark className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${onlyFavorites ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="hidden lg:inline">{t.favorites}</span>
              <span className={`inline-flex items-center justify-center min-w-[18px] sm:min-w-[20px] h-4 sm:h-5 px-1 text-[10px] sm:text-xs font-bold rounded-full ${
                favoritesCount > 0 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-slate-300 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
              }`}>
                {favoritesCount}
              </span>
            </button>

            {/* Add / Suggest Tool Modal Button */}
            <button
              id="header-add-tool-btn"
              onClick={onOpenAddModal}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title={t.suggestTool}
            >
              <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
              <span className="hidden lg:inline">{t.suggestTool}</span>
            </button>

            {/* Language Switcher (Segmented 1-click toggle: AR / EN) */}
            {onLanguageChange && (
              <div 
                id="header-lang-switch" 
                className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs"
                title={t.changeLanguageTitle}
              >
                <button
                  id="header-lang-ar"
                  onClick={() => onLanguageChange('ar')}
                  className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    lang === 'ar'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  aria-pressed={lang === 'ar'}
                >
                  عربي
                </button>
                <button
                  id="header-lang-en"
                  onClick={() => onLanguageChange('en')}
                  className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer font-mono ${
                    lang === 'en'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  aria-pressed={lang === 'en'}
                >
                  EN
                </button>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <button
              id="header-dark-mode-toggle"
              onClick={onToggleDarkMode}
              className="p-1.5 sm:p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer"
              title={isDarkMode ? t.lightModeTitle : t.darkModeTitle}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />}
            </button>
          </div>
        </div>

        {/* Quick directory live stats ticker */}
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 overflow-x-auto gap-3 sm:gap-4 scrollbar-none">
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <span className="flex items-center gap-1 font-medium">
              <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-500" />
              <span>{t.toolsCountLabel}</span>
              <strong className="text-slate-800 dark:text-slate-200 font-mono">{totalTools}</strong>
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-500" />
              <span>{t.categoriesCountLabel}</span>
              <strong className="text-slate-800 dark:text-slate-200 font-mono">{categoriesCount}</strong>
            </span>
            <span className="flex items-center gap-1 font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>{t.freeOrFreemiumLabel}</span>
              <strong className="text-slate-800 dark:text-slate-200 font-mono">{freeToolsCount}</strong>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-400 shrink-0">
            <Database className="w-3 h-3 text-indigo-400" />
            <span>{t.officialDomainLabel} <strong className="font-mono text-indigo-500">adawatai.online</strong></span>
          </div>
        </div>
      </div>
    </header>
  );
};

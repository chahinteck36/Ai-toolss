import React from 'react';
import { Sparkles, Bookmark, PlusCircle, Compass, Moon, Sun, Layers, Cpu, Database, Info, ShieldCheck, Terminal } from 'lucide-react';

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
  onOpenAboutUs?: () => void;
  onOpenPrivacyPolicy?: () => void;
  onOpenContact?: () => void;
  onOpenAdminDashboard?: () => void;
  onlyFavorites: boolean;
  onToggleFavoritesOnly: () => void;
  isAdmin?: boolean;
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
  onOpenAboutUs,
  onOpenPrivacyPolicy,
  onOpenContact,
  onOpenAdminDashboard,
  onlyFavorites,
  onToggleFavoritesOnly,
  isAdmin = true
}) => {
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
              href="/" 
              className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-amber-500 text-white shadow-md shadow-indigo-500/20 group shrink-0 ring-1 ring-white/20"
              title="أدواتي AI - adawatai.online"
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse text-amber-200" />
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white text-[9px] font-bold text-white">
                ✓
              </span>
            </a>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <a href="/" className="text-lg sm:text-2xl font-black tracking-tight bg-gradient-to-l from-indigo-600 via-purple-600 to-amber-600 dark:from-indigo-400 dark:via-purple-300 dark:to-amber-300 bg-clip-text text-transparent hover:opacity-90 transition-opacity truncate">
                  أدواتي AI
                </a>
                <span className="hidden xs:inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700/80">
                  VIP 2026
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden md:block">
                المرجع العربي الشامل لاكتشاف وتصنيف ومراجعة أفضل أدوات الذكاء الاصطناعي
              </p>
            </div>
          </div>

          {/* Action Buttons & Navigation */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* About Us Link */}
            {onOpenAboutUs && (
              <button
                id="header-about-us-btn"
                onClick={onOpenAboutUs}
                className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="من نحن - أدواتي AI"
              >
                <Info className="w-3.5 h-3.5 text-indigo-500" />
                <span>من نحن</span>
              </button>
            )}

            {/* Contact Us Link */}
            {onOpenContact && (
              <button
                id="header-contact-btn"
                onClick={onOpenContact}
                className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="تواصل مع الإدارة"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>تواصل معنا</span>
              </button>
            )}

            {/* Prompts Library Button */}
            {onOpenPromptsLibrary && (
              <button
                id="header-prompts-library-btn"
                onClick={onOpenPromptsLibrary}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white shadow-xs shadow-amber-500/30 transition-all transform active:scale-95 ring-1 ring-amber-400/40"
                title="مكتبة الأوامر والبرومبتات الحصرية"
              >
                <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-100 animate-pulse" />
                <span>مكتبة الأوامر</span>
                <span className="hidden sm:inline-block px-1 py-0.2 rounded text-[10px] bg-black/20 font-mono text-amber-100">
                  Prompts
                </span>
              </button>
            )}

            {/* Smart Finder Assistant Button */}
            <button
              id="header-smart-finder-btn"
              onClick={onOpenSmartFinder}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-xs shadow-purple-500/25 transition-all transform active:scale-95"
              title="مساعد اختيار الأداة المناسبة"
            >
              <Compass className="w-4 h-4" />
              <span className="hidden sm:inline">المستكشف الذكي</span>
            </button>

            {/* Favorites shortcut */}
            <button
              id="header-favorites-btn"
              onClick={onToggleFavoritesOnly}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-xl border transition-all ${
                onlyFavorites
                  ? 'bg-rose-50 border-rose-300 text-rose-600 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-400'
                  : 'bg-slate-100/80 hover:bg-slate-200/80 border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700'
              }`}
              title="عرض الأدوات المفضلة"
            >
              <Bookmark className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${onlyFavorites ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="hidden md:inline">المفضلة</span>
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
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="إضافة أو اقتراح أداة ذكاء اصطناعي جديدة"
            >
              <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
              <span className="hidden md:inline">اقترح أداة</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              id="header-dark-mode-toggle"
              onClick={onToggleDarkMode}
              className="p-1.5 sm:p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:text-white transition-colors"
              title={isDarkMode ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />}
            </button>
          </div>
        </div>

        {/* Quick directory live stats ticker (horizontal scrollable on mobile) */}
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 overflow-x-auto gap-3 sm:gap-4 scrollbar-none">
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <span className="flex items-center gap-1 font-medium">
              <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-500" />
              <span>الأدوات:</span>
              <strong className="text-slate-800 dark:text-slate-200">{totalTools}</strong>
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-500" />
              <span>التصنيفات:</span>
              <strong className="text-slate-800 dark:text-slate-200">{categoriesCount}</strong>
            </span>
            <span className="flex items-center gap-1 font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>مجانية / فريميوم:</span>
              <strong className="text-slate-800 dark:text-slate-200">{freeToolsCount}</strong>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-400 shrink-0">
            <Database className="w-3 h-3 text-indigo-400" />
            <span>الموقع الرسمي: <strong className="font-mono text-indigo-500">adawatai.online</strong></span>
          </div>
        </div>
      </div>
    </header>
  );
};


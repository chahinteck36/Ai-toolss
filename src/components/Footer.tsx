import React from 'react';
import { Sparkles, Globe, ArrowUp, Info, ShieldCheck, PlusCircle, Mail, Terminal, BookOpen } from 'lucide-react';
import { Category, CategoryId } from '../types';
import { SupportedLanguage, SUPPORTED_LANGUAGES, TRANSLATIONS } from '../lib/i18n';

interface FooterProps {
  categories: Category[];
  onSelectCategory: (catId: CategoryId) => void;
  isDarkMode: boolean;
  onOpenPromptsLibrary?: () => void;
  onOpenKnowledgeCenter?: () => void;
  onOpenAboutUs?: () => void;
  onOpenPrivacyPolicy?: () => void;
  onOpenContact?: () => void;
  onOpenAddModal?: () => void;
  lang?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
}

export const Footer: React.FC<FooterProps> = ({
  categories,
  onSelectCategory,
  isDarkMode,
  onOpenPromptsLibrary,
  onOpenKnowledgeCenter,
  onOpenAboutUs,
  onOpenPrivacyPolicy,
  onOpenContact,
  onOpenAddModal,
  lang = 'ar',
  onLanguageChange
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ar;
  const isAr = lang === 'ar';

  return (
    <footer 
      dir={isAr ? 'rtl' : 'ltr'}
      className={`border-t transition-colors mt-20 ${
        isDarkMode 
          ? 'bg-slate-950 border-slate-800 text-slate-400' 
          : 'bg-white border-slate-200 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-sm shadow-md shadow-indigo-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  {t.siteName}
                </span>
                <span className="block text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                  adawatai.online
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {isAr 
                ? 'المنصة العربية المفتوحة لاكتشاف وتصنيف ومراجعة أفضل حلول ونماذج الذكاء الاصطناعي التوليدي ومستندات الإنتاجية لمساعدة الباحثين والطلاب والمبدعين.'
                : 'The premier directory to discover, categorize, and review generative AI tools and document productivity solutions for researchers and creators.'
              }
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <Globe className="w-3 h-3" />
                {isAr ? 'تحديث مستمر 2026 • adawatai.online' : 'Updated 2026 • adawatai.online'}
              </span>
            </div>
          </div>

          {/* Quick Categories Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {isAr ? 'أبرز التصنيفات' : 'Top Categories'}
            </h4>
            <ul className="space-y-1.5 text-xs">
              {categories.slice(1, 6).map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`/category/${cat.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectCategory(cat.id);
                      scrollToTop();
                    }}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block"
                  >
                    {isAr ? cat.nameAr : cat.nameEn}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {isAr ? 'أقسام أخرى' : 'More Categories'}
            </h4>
            <ul className="space-y-1.5 text-xs">
              {categories.slice(6, 11).map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`/category/${cat.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectCategory(cat.id);
                      scrollToTop();
                    }}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block"
                  >
                    {isAr ? cat.nameAr : cat.nameEn}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links & Info: About Us, Privacy, Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {isAr ? 'روابط المنصة الرسمية' : 'Platform Links'}
            </h4>
            <ul className="space-y-2 text-xs">
              {onOpenKnowledgeCenter && (
                <li>
                  <button
                    onClick={onOpenKnowledgeCenter}
                    className="flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{t.knowledgeCenter}</span>
                  </button>
                </li>
              )}
              {onOpenPromptsLibrary && (
                <li>
                  <button
                    onClick={onOpenPromptsLibrary}
                    className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <Terminal className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                    <span>{t.promptsLibrary}</span>
                  </button>
                </li>
              )}
              {onOpenAboutUs && (
                <li>
                  <button
                    onClick={onOpenAboutUs}
                    className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{t.aboutUs}</span>
                  </button>
                </li>
              )}
              {onOpenPrivacyPolicy && (
                <li>
                  <button
                    onClick={onOpenPrivacyPolicy}
                    className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{t.privacyPolicy}</span>
                  </button>
                </li>
              )}
              {onOpenContact && (
                <li>
                  <button
                    onClick={onOpenContact}
                    className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-pink-500" />
                    <span>{t.contactUs}</span>
                  </button>
                </li>
              )}
              {onOpenAddModal && (
                <li>
                  <button
                    onClick={onOpenAddModal}
                    className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-purple-500" />
                    <span>{t.suggestTool}</span>
                  </button>
                </li>
              )}
              <li className="pt-1 text-[11px] text-slate-400">
                <a 
                  href="mailto:gmouhamed36@gmail.com?cc=contact@adawatai.online&subject=Message from Adawatai" 
                  className="flex items-center gap-1.5 hover:text-indigo-500 font-mono"
                >
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>contact@adawatai.online</span>
                </a>
              </li>
            </ul>

            <button
              onClick={scrollToTop}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-1 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{t.backToTop}</span>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {t.siteName} (adawatai.online). {t.allRightsReserved}</p>
          
          {/* Language Switch Links in Footer */}
          {onLanguageChange && (
            <div className="flex items-center gap-2 text-xs">
              <Globe className="w-3.5 h-3.5 text-indigo-500" />
              {SUPPORTED_LANGUAGES.map((l, idx) => (
                <React.Fragment key={l.code}>
                  <button
                    onClick={() => onLanguageChange(l.code)}
                    className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer ${
                      lang === l.code ? 'font-bold text-indigo-600 dark:text-indigo-400' : ''
                    }`}
                  >
                    {l.flag} {l.label}
                  </button>
                  {idx < SUPPORTED_LANGUAGES.length - 1 && <span className="text-slate-300 dark:text-slate-700">•</span>}
                </React.Fragment>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            <span>{isAr ? 'دليل الذكاء الاصطناعي العربي الشامل' : 'Comprehensive AI & Productivity Directory'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { 
  BookOpen, Clock, Calendar, ChevronRight, ArrowLeft, ArrowRight, 
  Share2, Check, ExternalLink, Sparkles, HelpCircle, 
  ChevronDown, Layers, Lightbulb, AlertCircle, Info, Wrench
} from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../../lib/i18n';
import { KnowledgeArticle } from '../../articles/types';
import { ARTICLE_CATEGORIES, getRelatedArticlesForArticle } from '../../articles/articleData';
import { getLocalizedArticle } from '../../articles/articleTranslations';
import { resolveToolById } from '../../articles/toolResolver';

interface ArticleViewProps {
  article: KnowledgeArticle;
  lang: SupportedLanguage;
  isDarkMode: boolean;
  onNavigateHome: () => void;
  onNavigateKnowledge: () => void;
  onSelectArticle: (slug: string) => void;
  onNavigateTool: (toolUrl: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  lang,
  isDarkMode,
  onNavigateHome,
  onNavigateKnowledge,
  onSelectArticle,
  onNavigateTool
}) => {
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.ar;
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const loc = getLocalizedArticle(article, lang);
  const relatedArticles = getRelatedArticlesForArticle(article);

  // Resolve featured tool
  const featuredTool = article.featuredToolId ? resolveToolById(article.featuredToolId, lang) : null;

  // Resolve related tools
  const resolvedRelatedTools = (article.relatedTools || [])
    .map((tid) => resolveToolById(tid, lang))
    .filter((t): t is NonNullable<typeof t> => t !== null)
    .slice(0, 8);

  const currentCategory = ARTICLE_CATEGORIES.find((c) => c.id === article.category);
  const categoryName = currentCategory
    ? lang === 'en'
      ? currentCategory.nameEn
      : lang === 'fr'
      ? currentCategory.nameFr
      : currentCategory.nameAr
    : article.category;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderFormattedText = (text: string) => {
    const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      if (match[2] && match[3]) {
        const label = match[2];
        const url = match[3];
        const isInternal = url.startsWith('/');
        parts.push(
          <a
            key={match.index}
            href={url}
            onClick={(e) => {
              if (isInternal) {
                e.preventDefault();
                onNavigateTool(url);
              }
            }}
            target={isInternal ? undefined : '_blank'}
            rel={isInternal ? undefined : 'noopener noreferrer'}
            className="text-indigo-600 dark:text-indigo-400 font-semibold underline decoration-indigo-400/40 hover:decoration-indigo-600 underline-offset-2 transition-colors cursor-pointer"
          >
            {label}
          </a>
        );
      } else if (match[4]) {
        parts.push(
          <strong key={match.index} className="font-bold text-slate-900 dark:text-white">
            {match[4]}
          </strong>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return <>{parts}</>;
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Breadcrumb Navigation */}
      <div className={`border-b ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
            <button
              onClick={onNavigateHome}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {t.backToHome}
            </button>
            <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            <button
              onClick={onNavigateKnowledge}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {t.knowledgeCenter}
            </button>
            <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            <span className="text-slate-700 dark:text-slate-300">
              {categoryName}
            </span>
            <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-xs">
              {loc.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <header className={`border-b ${isDarkMode ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-5">
          {/* Metadata badges */}
          <div className="flex items-center gap-2.5 flex-wrap text-xs">
            <span className="px-3 py-1 rounded-lg font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {categoryName}
            </span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{loc.readingTimeText}</span>
            </span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.lastUpdated}: {article.updatedAt}</span>
            </span>
          </div>

          {/* H1 SEO Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight">
            {loc.title}
          </h1>

          {/* Lead Intro Paragraph */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {loc.intro}
          </p>

          {/* Author and Share actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                A
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{article.author.name}</p>
                <p className="text-slate-500 dark:text-slate-400">{article.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  copied
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? t.linkCopied : t.shareTool}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Article Body (8 cols) */}
          <main className="lg:col-span-8 space-y-10">
            
            {/* Table of Contents for Mobile */}
            {article.toc && article.toc.length > 0 && (
              <div className={`p-5 rounded-2xl border lg:hidden ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mb-3">
                  <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{t.tableOfContents}</span>
                </div>
                <ul className="space-y-2 text-xs">
                  {article.toc.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-right cursor-pointer"
                      >
                        • {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Structured Sections */}
            {loc.sections.map((sec, idx) => {
              const originalSec = article.content.sections.find((s) => s.id === sec.id);
              return (
                <section key={sec.id} id={sec.id} className="scroll-mt-24 space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {sec.heading}
                  </h2>

                  {sec.subheading && (
                    <h3 className="text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-400">
                      {sec.subheading}
                    </h3>
                  )}

                  {sec.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                      {renderFormattedText(para)}
                    </p>
                  ))}

                  {/* Bullet points */}
                  {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                    <ul className="space-y-2.5 my-4">
                      {sec.bulletPoints.map((bp, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-2 shrink-0" />
                          <span>{renderFormattedText(bp)}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Section Tools Cards (if any) */}
                  {originalSec?.tools && originalSec.tools.length > 0 && (
                    <div className="space-y-4 my-6">
                      {originalSec.tools.map((tool) => (
                        <div
                          key={tool.id}
                          className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                            isDarkMode ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-indigo-200 shadow-xs'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                              {tool.name}
                            </h4>
                            <span className="inline-flex text-xs px-2.5 py-1 rounded-lg font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40 self-start sm:self-auto">
                              {tool.pricingCategory}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 my-4 text-xs sm:text-sm">
                            <div className={`p-3.5 rounded-xl ${isDarkMode ? 'bg-slate-950/60' : 'bg-slate-50'}`}>
                              <span className="block font-bold text-slate-900 dark:text-white mb-1">
                                {lang === 'ar' ? 'فيمَ تفيدك الأداة؟' : 'Useful for:'}
                              </span>
                              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                                {tool.usefulFor}
                              </p>
                            </div>

                            <div className={`p-3.5 rounded-xl ${isDarkMode ? 'bg-slate-950/60' : 'bg-slate-50'}`}>
                              <span className="block font-bold text-slate-900 dark:text-white mb-1">
                                {lang === 'ar' ? 'أفضل استخدام للطلاب:' : 'Best for students:'}
                              </span>
                              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                                {tool.bestUse}
                              </p>
                            </div>

                            <div className={`p-3.5 rounded-xl ${isDarkMode ? 'bg-slate-950/60' : 'bg-slate-50'}`}>
                              <span className="block font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                                {lang === 'ar' ? 'الميزة الأبرز:' : 'Main advantage:'}
                              </span>
                              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm font-medium">
                                {tool.advantage}
                              </p>
                            </div>
                          </div>

                          <div className="pt-2 flex items-center justify-end">
                            <a
                              href={tool.toolUrl}
                              onClick={(e) => {
                                e.preventDefault();
                                onNavigateTool(tool.toolUrl);
                              }}
                              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group cursor-pointer"
                            >
                              <span>{lang === 'ar' ? 'عرض تفاصيل الأداة في أدواتي' : 'View tool on Adawatai'}</span>
                              <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Steps (if any) */}
                  {originalSec?.steps && originalSec.steps.length > 0 && (
                    <div className="space-y-3 my-6">
                      {originalSec.steps.map((step) => (
                        <div
                          key={step.step}
                          className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-4 ${
                            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shrink-0 shadow-xs">
                            {step.step}
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                              {step.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                              {renderFormattedText(step.desc)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Callout box (tip/warning/info) */}
                  {originalSec?.callout && (
                    <div className={`p-4 sm:p-5 rounded-2xl border my-5 flex items-start gap-3.5 ${
                      originalSec.callout.type === 'tip'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
                        : originalSec.callout.type === 'warning'
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200'
                        : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-900 dark:text-indigo-200'
                    }`}>
                      {originalSec.callout.type === 'tip' ? (
                        <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      ) : originalSec.callout.type === 'warning' ? (
                        <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                      ) : (
                        <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-1 text-xs sm:text-sm">
                        <strong className="block font-bold">
                          {originalSec.callout.title}
                        </strong>
                        <p className="leading-relaxed opacity-95">
                          {renderFormattedText(originalSec.callout.text)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Comparison table */}
                  {originalSec?.comparisonTable && (
                    <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                      <table className="w-full text-right text-xs sm:text-sm">
                        <thead className={`border-b ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-800'}`}>
                          <tr>
                            {originalSec.comparisonTable.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3.5 font-bold">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800 bg-slate-950/60' : 'divide-slate-200 bg-white'}`}>
                          {originalSec.comparisonTable.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className={`p-3.5 ${cIdx === 0 ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              );
            })}

            {/* Featured Tool CTA Box ("هل تحتاج الأداة الآن؟") */}
            {featuredTool && (
              <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 border-indigo-800/80 shadow-lg' 
                  : 'bg-gradient-to-br from-indigo-50 via-white to-indigo-100/50 border-indigo-200 shadow-md'
              }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-600 text-white">
                      <Wrench className="w-3.5 h-3.5" />
                      <span>{loc.needToolPrompt}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                      {featuredTool.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                      {featuredTool.tagline}
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigateTool(featuredTool.url)}
                    className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>{lang === 'ar' ? 'استخدم الأداة الآن مجاناً' : lang === 'fr' ? 'Utiliser l\'outil gratuitement' : 'Try Free Tool Now'}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Conclusion */}
            {loc.conclusion && (
              <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {lang === 'ar' ? 'خلاصة القول' : lang === 'fr' ? 'Conclusion' : 'Final Takeaway'}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {renderFormattedText(loc.conclusion)}
                </p>
              </div>
            )}

            {/* Discovery Directory CTA */}
            <div className={`p-6 sm:p-8 rounded-3xl border text-center space-y-4 my-8 ${
              isDarkMode 
                ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800' 
                : 'bg-gradient-to-b from-indigo-50/50 to-white border-indigo-100 shadow-xs'
            }`}>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-2 max-w-xl mx-auto">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {lang === 'ar' ? 'هل تبحث عن أداة محددة؟' : lang === 'fr' ? 'Vous cherchez un outil spécifique ?' : 'Looking for a specific tool?'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {lang === 'ar' 
                    ? 'استخدم دليل أدوات الذكاء الاصطناعي في Adawatai لاكتشاف المزيد من الأدوات حسب احتياجك الدراسي والمهني.'
                    : lang === 'fr'
                    ? 'Utilisez l\'annuaire des outils IA sur Adawatai pour découvrir d\'autres solutions adaptées à vos besoins.'
                    : 'Explore the full AI tools directory on Adawatai to discover more tools customized for your study and work needs.'}
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={onNavigateHome}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'اكتشف أدوات الذكاء الاصطناعي' : lang === 'fr' ? 'Découvrir les outils IA' : 'Explore AI Tools Directory'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* FAQ Accordion Section */}
            {loc.faq && loc.faq.length > 0 && (
              <section id="faq" className="scroll-mt-24 space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {lang === 'ar' ? 'الأسئلة الأكثر شيوعاً' : lang === 'fr' ? 'Foire aux questions (FAQ)' : 'Frequently Asked Questions (FAQ)'}
                  </h3>
                </div>

                <div className="space-y-3">
                  {loc.faq.map((item, fIdx) => {
                    const isOpen = openFaqIndex === fIdx;
                    return (
                      <div
                        key={fIdx}
                        className={`rounded-2xl border transition-all ${
                          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                        }`}
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                          className="w-full p-4 text-right flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer"
                        >
                          <span>{item.question}</span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Related Tools Section */}
            {resolvedRelatedTools.length > 0 && (
              <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>{lang === 'ar' ? 'الأدوات المقترحة في هذا الدليل' : lang === 'fr' ? 'Outils recommandés' : 'Recommended Tools Mentioned'}</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {resolvedRelatedTools.map((tool) => (
                    <div
                      key={tool.id}
                      onClick={() => onNavigateTool(tool.url)}
                      className={`group p-4 rounded-2xl border transition-all hover:shadow-md cursor-pointer ${
                        isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/50' : 'bg-white border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {tool.name}
                        </h4>
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold shrink-0">
                          {tool.pricingText || (lang === 'ar' ? 'أداة مجانية' : 'Free')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                        {tool.tagline}
                      </p>
                      <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                        <span>{lang === 'ar' ? 'فتح الأداة' : lang === 'fr' ? 'Ouvrir' : 'Open Tool'}</span>
                        <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Related Articles Section */}
            {relatedArticles.length > 0 && (
              <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{t.relatedArticles}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedArticles.map((relArt) => {
                    const relLoc = getLocalizedArticle(relArt, lang);
                    return (
                      <div
                        key={relArt.id}
                        onClick={() => onSelectArticle(relArt.slug)}
                        className={`group p-4 rounded-2xl border transition-all hover:shadow-md cursor-pointer flex flex-col justify-between ${
                          isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/50' : 'bg-white border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className="space-y-2">
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{relLoc.readingTimeText}</span>
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {relLoc.title}
                          </h4>
                        </div>
                        <div className="mt-3 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                          <span>{lang === 'ar' ? 'قراءة' : lang === 'fr' ? 'Lire' : 'Read'}</span>
                          <ArrowIcon className="w-3 h-3" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

          </main>

          {/* Sticky Desktop Sidebar (4 cols) */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6 sticky top-24">
            
            {/* Table of Contents */}
            {article.toc && article.toc.length > 0 && (
              <div className={`p-5 rounded-3xl border ${
                isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{t.tableOfContents}</span>
                </div>
                <nav className="space-y-2">
                  {article.toc.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-right text-xs text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:font-bold transition-all py-1 cursor-pointer"
                    >
                      {item.title}
                    </button>
                  ))}
                </nav>
              </div>
            )}

            {/* Sticky Sidebar CTA for featured tool */}
            {featuredTool && (
              <div className={`p-5 rounded-3xl border ${
                isDarkMode ? 'bg-gradient-to-br from-indigo-950/40 to-slate-900 border-indigo-900/60' : 'bg-indigo-50/70 border-indigo-200'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  <Wrench className="w-4 h-4" />
                  <span>{loc.needToolPrompt}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                  {featuredTool.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  {featuredTool.tagline}
                </p>
                <button
                  onClick={() => onNavigateTool(featuredTool.url)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'ابدأ الاستخدام الآن' : lang === 'fr' ? 'Essayer maintenant' : 'Start Using Now'}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Back to Knowledge Center */}
            <button
              onClick={onNavigateKnowledge}
              className={`w-full py-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{t.knowledgeCenter}</span>
            </button>
          </aside>

        </div>
      </div>
    </div>
  );
};

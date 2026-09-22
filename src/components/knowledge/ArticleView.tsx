import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Clock, Calendar, ChevronRight, ArrowLeft, ArrowRight, 
  Share2, Check, ExternalLink, Sparkles, HelpCircle, 
  ChevronDown, Layers, Lightbulb, AlertCircle, Info, Wrench,
  Cpu, ArrowDown
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
      : currentCategory.nameAr
    : article.category;

  // SEO metadata & Structured Data (JSON-LD) Injection
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 1. Page Title
    const originalTitle = document.title;
    const pageTitle = loc.seoTitle || `${loc.title} | Adawatai`;
    document.title = pageTitle;

    // 2. Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const prevDescription = metaDescription?.getAttribute('content') || '';
    if (metaDescription) {
      metaDescription.setAttribute('content', loc.seoDescription || loc.description);
    }

    // 3. OpenGraph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', loc.seoDescription || loc.description);

    const ogImage = document.querySelector('meta[property="og:image"]');
    const fullImageUrl = article.heroImage
      ? `https://adawatai.online${article.heroImage.src}`
      : 'https://adawatai.online/logo.svg';
    if (ogImage) ogImage.setAttribute('content', fullImageUrl);

    // 4. Structured Data (Schema.org JSON-LD)
    const canonicalUrl = `https://adawatai.online/knowledge/${article.slug}`;
    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${canonicalUrl}#article`,
          isPartOf: {
            '@type': 'WebSite',
            '@id': 'https://adawatai.online/#website',
            name: 'Adawatai',
            url: 'https://adawatai.online/'
          },
          headline: loc.title,
          description: loc.seoDescription || loc.description,
          image: fullImageUrl,
          inLanguage: lang === 'ar' ? 'ar' : 'en',
          mainEntityOfPage: canonicalUrl,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          author: {
            '@type': 'Organization',
            name: article.author.name,
            url: 'https://adawatai.online'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Adawatai',
            url: 'https://adawatai.online',
            logo: {
              '@type': 'ImageObject',
              url: 'https://adawatai.online/logo.svg'
            }
          }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonicalUrl}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: lang === 'ar' ? 'الرئيسية' : 'Home',
              item: 'https://adawatai.online/'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: lang === 'ar' ? 'مركز المعرفة' : 'Knowledge',
              item: 'https://adawatai.online/knowledge'
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: loc.title,
              item: canonicalUrl
            }
          ]
        },
        ...(loc.faq && loc.faq.length > 0
          ? [
              {
                '@type': 'FAQPage',
                '@id': `${canonicalUrl}#faq`,
                mainEntity: loc.faq.map((f) => ({
                  '@type': 'Question',
                  name: f.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: f.answer
                  }
                }))
              }
            ]
          : [])
      ]
    };

    const scriptId = 'article-structured-data';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

    return () => {
      document.title = originalTitle;
      if (metaDescription && prevDescription) {
        metaDescription.setAttribute('content', prevDescription);
      }
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [article.slug, article.publishedAt, article.updatedAt, article.author.name, loc, lang]);

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
    <div 
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}
      style={{ paddingBottom: 'calc(2.5rem + var(--sticky-ad-height, 0px))' }}
    >
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

      {/* Article Header: Breadcrumb -> H1 -> Metadata -> Hero Image -> Intro */}
      <header className={`border-b ${isDarkMode ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            {loc.title}
          </h1>

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

          {/* Hero / Featured Image in its primary natural spot */}
          {article.heroImage && (
            <figure className="my-6 sm:my-8 overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 shadow-xs">
              <div className="relative w-full aspect-[1200/630] max-h-[460px] flex items-center justify-center bg-slate-950/20 dark:bg-slate-950/50 overflow-hidden">
                <img
                  src={article.heroImage.src}
                  alt={article.heroImage.alt}
                  width={article.heroImage.width || 1200}
                  height={article.heroImage.height || 630}
                  className="w-full h-full object-cover rounded-t-2xl max-w-full"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
              {article.heroImage.caption && (
                <figcaption className="py-2.5 px-4 text-center text-xs sm:text-sm text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-slate-900/90 border-t border-slate-200/70 dark:border-slate-800/70 font-medium leading-relaxed">
                  {article.heroImage.caption}
                </figcaption>
              )}
            </figure>
          )}

          {/* Lead Intro Paragraph */}
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed sm:leading-loose font-normal">
            {loc.intro}
          </p>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16 sm:pb-24">
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
              const placement = originalSec?.illustrationPlacement || 'after-paragraphs';
              const hasIllustration = Boolean(originalSec?.illustration);
              
              const showIllustrationBetweenParagraphs = 
                hasIllustration && 
                placement === 'after-first-paragraph' && 
                sec.paragraphs.length > 1;

              const firstBatchParagraphs = showIllustrationBetweenParagraphs 
                ? [sec.paragraphs[0]] 
                : sec.paragraphs;
              const secondBatchParagraphs = showIllustrationBetweenParagraphs 
                ? sec.paragraphs.slice(1) 
                : [];

              return (
                <section key={sec.id} id={sec.id} className="scroll-mt-24 space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                    {sec.heading}
                  </h2>

                  {sec.subheading && (
                    <h3 className="text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-400 leading-normal">
                      {sec.subheading}
                    </h3>
                  )}

                  {firstBatchParagraphs.map((para, pIdx) => (
                    <p key={`p1-${pIdx}`} className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed sm:leading-loose">
                      {renderFormattedText(para)}
                    </p>
                  ))}

                  {/* Section Illustration (if placed after first paragraph) */}
                  {showIllustrationBetweenParagraphs && originalSec?.illustration && (
                    <figure className="my-6 sm:my-8 overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 shadow-xs">
                      <div className="p-3 sm:p-5 flex items-center justify-center bg-slate-950/10 dark:bg-slate-950/40 rounded-t-2xl">
                        <img
                          src={originalSec.illustration.src}
                          alt={originalSec.illustration.alt}
                          width={originalSec.illustration.width || 960}
                          height={originalSec.illustration.height || 420}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-auto object-contain rounded-xl max-h-[420px] max-w-full"
                        />
                      </div>
                      {originalSec.illustration.caption && (
                        <figcaption className="py-2.5 px-4 text-center text-xs sm:text-sm text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-slate-900/90 border-t border-slate-200/70 dark:border-slate-800/70 font-medium leading-relaxed">
                          {originalSec.illustration.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}

                  {secondBatchParagraphs.map((para, pIdx) => (
                    <p key={`p2-${pIdx}`} className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed sm:leading-loose">
                      {renderFormattedText(para)}
                    </p>
                  ))}

                  {/* Section Illustration (if placed after all paragraphs) */}
                  {!showIllustrationBetweenParagraphs && originalSec?.illustration && (
                    <figure className="my-6 sm:my-8 overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 shadow-xs">
                      <div className="p-3 sm:p-5 flex items-center justify-center bg-slate-950/10 dark:bg-slate-950/40 rounded-t-2xl">
                        <img
                          src={originalSec.illustration.src}
                          alt={originalSec.illustration.alt}
                          width={originalSec.illustration.width || 960}
                          height={originalSec.illustration.height || 420}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-auto object-contain rounded-xl max-h-[420px] max-w-full"
                        />
                      </div>
                      {originalSec.illustration.caption && (
                        <figcaption className="py-2.5 px-4 text-center text-xs sm:text-sm text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-slate-900/90 border-t border-slate-200/70 dark:border-slate-800/70 font-medium leading-relaxed">
                          {originalSec.illustration.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}

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
                  {((sec as any).comparisonTable || originalSec?.comparisonTable) && (() => {
                    const table = (sec as any).comparisonTable || originalSec?.comparisonTable;
                    return (
                      <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                        <table className="w-full min-w-[580px] text-right text-xs sm:text-sm">
                          <thead className={`border-b ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-800'}`}>
                            <tr>
                              {table.headers.map((h: string, hIdx: number) => (
                                <th key={hIdx} className="p-3.5 font-bold whitespace-nowrap">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800 bg-slate-950/60' : 'divide-slate-200 bg-white'}`}>
                            {table.rows.map((row: string[], rIdx: number) => (
                              <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                {row.map((cell: string, cIdx: number) => (
                                  <td key={cIdx} className={`p-3.5 ${cIdx === 0 ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                                    {renderFormattedText(cell)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  })()}

                  {/* Technical Illustration / Architecture Diagram */}
                  {originalSec?.technicalIllustration && (
                    <div className={`my-8 p-5 sm:p-6 rounded-2xl border ${
                      isDarkMode 
                        ? 'bg-slate-900/90 border-slate-800 shadow-lg shadow-black/20' 
                        : 'bg-slate-50/80 border-slate-200/90 shadow-sm'
                    }`}>
                      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-indigo-600/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                            <Cpu className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                              {originalSec.technicalIllustration.title}
                            </h4>
                            {originalSec.technicalIllustration.description && (
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {originalSec.technicalIllustration.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shrink-0">
                          {lang === 'ar' ? 'مخطط تقني تدفقي' : 'Technical Architecture'}
                        </span>
                      </div>

                      {/* Diagram Flow Nodes */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative my-4">
                        {originalSec.technicalIllustration.nodes.map((node, nIdx) => (
                          <div key={nIdx} className="relative flex flex-col items-center">
                            <div className={`w-full p-4 rounded-xl border text-center relative transition-all ${
                              isDarkMode 
                                ? 'bg-slate-950/80 border-slate-800 hover:border-indigo-500/50' 
                                : 'bg-white border-slate-200 hover:border-indigo-300 shadow-xs'
                            }`}>
                              {node.badge && (
                                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 mb-2">
                                  {node.badge}
                                </span>
                              )}
                              <div className="w-7 h-7 mx-auto rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs mb-2">
                                {node.step}
                              </div>
                              <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1">
                                {node.label}
                              </h5>
                              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                {node.desc}
                              </p>
                            </div>

                            {/* Arrow between nodes for md+ screens */}
                            {nIdx < originalSec.technicalIllustration!.nodes.length - 1 && (
                              <div className="hidden md:flex absolute -left-2.5 top-1/2 -translate-y-1/2 z-10 text-indigo-500">
                                <ArrowIcon className="w-4 h-4" />
                              </div>
                            )}

                            {/* Down arrow for mobile */}
                            {nIdx < originalSec.technicalIllustration!.nodes.length - 1 && (
                              <div className="md:hidden my-1 text-indigo-500">
                                <ArrowDown className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {originalSec.technicalIllustration.caption && (
                        <p className="text-center text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 italic">
                          {originalSec.technicalIllustration.caption}
                        </p>
                      )}
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
                    <span>{lang === 'ar' ? 'استخدم الأداة الآن مجاناً' : 'Try Free Tool Now'}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Conclusion */}
            {loc.conclusion && (
              <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {lang === 'ar' ? 'خلاصة القول' : 'Final Takeaway'}
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
                  {lang === 'ar' ? 'هل تبحث عن أداة محددة؟' : 'Looking for a specific tool?'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {lang === 'ar' 
                    ? 'استخدم دليل أدوات الذكاء الاصطناعي في Adawatai لاكتشاف المزيد من الأدوات حسب احتياجك الدراسي والمهني.'
                    : 'Explore the full AI tools directory on Adawatai to discover more tools customized for your study and work needs.'}
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={onNavigateHome}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'اكتشف أدوات الذكاء الاصطناعي' : 'Explore AI Tools Directory'}</span>
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
                    {lang === 'ar' ? 'الأسئلة الأكثر شيوعاً' : 'Frequently Asked Questions (FAQ)'}
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
                    <span>{lang === 'ar' ? 'الأدوات المقترحة في هذا الدليل' : 'Recommended Tools Mentioned'}</span>
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
                        <span>{lang === 'ar' ? 'فتح الأداة' : 'Open Tool'}</span>
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
                          <span>{lang === 'ar' ? 'قراءة' : 'Read'}</span>
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
                      className={`block w-full text-xs text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:font-bold transition-all py-1 cursor-pointer ${lang === 'ar' ? 'text-right' : 'text-left'}`}
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
                  <span>{lang === 'ar' ? 'ابدأ الاستخدام الآن' : 'Start Using Now'}</span>
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

import React, { useState, useEffect } from 'react';
import { DigitalTool } from '../../types';
import { DigitalToolRenderer } from './DigitalToolRenderer';
import { AdSlot } from './common/AdSlot';
import { getDigitalToolBySlug, DIGITAL_TOOLS_REGISTRY } from '../../data/digitalToolsRegistry';
import {
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Sparkles,
  HelpCircle,
  Zap,
  ArrowRight,
  Home,
  CheckCircle2
} from 'lucide-react';

interface DigitalToolPageProps {
  tool: DigitalTool;
  lang: string;
  isDarkMode: boolean;
  onSelectTool: (tool: DigitalTool) => void;
  onBackToHome: () => void;
}

export const DigitalToolPage: React.FC<DigitalToolPageProps> = ({
  tool,
  lang,
  isDarkMode,
  onSelectTool,
  onBackToHome
}) => {
  const isAr = lang === 'ar';
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const title = isAr ? tool.nameAr : tool.nameEn;
  const description = isAr ? tool.descriptionAr : tool.descriptionEn;
  const howToUse = isAr ? tool.howToUseAr : tool.howToUseEn;
  const features = isAr ? tool.featuresAr : tool.featuresEn;
  const faqs = isAr ? tool.faqAr : tool.faqEn;

  // Find related tools
  const relatedSlugs = tool.relatedToolSlugs || (tool as any).relatedTools || [];
  const relatedTools = relatedSlugs
    .map((slug: string) => getDigitalToolBySlug(slug))
    .filter((t: any): t is DigitalTool => !!t)
    .slice(0, 4);

  // Fallback related tools from same category if empty
  const finalRelated =
    relatedTools.length > 0
      ? relatedTools
      : DIGITAL_TOOLS_REGISTRY.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 4);

  // SEO updates
  useEffect(() => {
    document.title = `${title} - مجاناً 100% أونلاين | Adawatai.online`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-fadeIn">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>{isAr ? 'الرئيسية' : 'Home'}</span>
        </button>
        <ChevronRight className={`w-3 h-3 ${isAr ? 'rotate-180' : ''}`} />
        <button
          onClick={onBackToHome}
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          {isAr ? 'الأدوات الرقمية' : 'Digital Tools'}
        </button>
        <ChevronRight className={`w-3 h-3 ${isAr ? 'rotate-180' : ''}`} />
        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
          {title}
        </span>
      </nav>

      {/* Header Section */}
      <div className="space-y-4 text-center sm:text-start">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>{isAr ? 'معالجة مجانية 100% خاصة ومحلية في متصفحك' : '100% Free & Private Client-Side Processing'}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          {description}
        </p>
      </div>

      {/* Top Ad Slot */}
      <AdSlot slotType="top" lang={lang} isDarkMode={isDarkMode} />

      {/* Main Interactive Tool Workspace */}
      <section aria-label="Tool Workspace" className="w-full">
        <DigitalToolRenderer tool={tool} lang={lang} isDarkMode={isDarkMode} />
      </section>

      {/* Content Ad Slot */}
      <AdSlot slotType="content" lang={lang} isDarkMode={isDarkMode} />

      {/* How To Use Guide */}
      {howToUse && howToUse.length > 0 && (
        <section className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-6`}>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-500" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {isAr ? `كيفية استخدام ${title}` : `How to use ${title}`}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {howToUse.map((step: any, index) => (
              <div
                key={step.step || step.stepNumber || index}
                className={`p-5 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200/70'
                } relative`}
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center mb-3 shadow-xs">
                  {step.step || step.stepNumber || index + 1}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {step.desc || step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features Grid */}
      {features && features.length > 0 && (
        <section className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-6`}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {isAr ? 'أهم مميزات الأداة' : 'Key Features & Advantages'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature: any, idx) => {
              const isString = typeof feature === 'string';
              const featTitle = isString ? feature : feature.title;
              const featDesc = isString ? null : feature.description;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                    isDarkMode ? 'bg-slate-800/30 border-slate-700/50' : 'bg-slate-50/70 border-slate-200/60'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">
                      {featTitle}
                    </h3>
                    {featDesc && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {featDesc}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* FAQ Accordion */}
      {faqs && faqs.length > 0 && (
        <section className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-6`}>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-500" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {isAr ? 'الأسئلة الشائعة (FAQ)' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? isDarkMode ? 'border-indigo-500/50 bg-indigo-950/10' : 'border-indigo-200 bg-indigo-50/20'
                      : isDarkMode ? 'border-slate-800 bg-slate-800/30' : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 text-start flex items-center justify-between gap-4"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : ''}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Bottom Ad Slot */}
      <AdSlot slotType="bottom" lang={lang} isDarkMode={isDarkMode} />

      {/* Related Tools */}
      {finalRelated.length > 0 && (
        <section className="space-y-4 pt-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            {isAr ? 'أدوات مجانية ذات صلة قد تهمك' : 'Related Free Tools You Might Like'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {finalRelated.map((relTool) => (
              <div
                key={relTool.id}
                onClick={() => onSelectTool(relTool)}
                className={`p-5 rounded-2xl border cursor-pointer hover:scale-[1.02] transition-all group ${
                  isDarkMode
                    ? 'bg-slate-900/60 border-slate-800 hover:border-indigo-500/50'
                    : 'bg-white border-slate-200 hover:border-indigo-300 shadow-xs'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {isAr ? relTool.nameAr : relTool.nameEn}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {isAr ? relTool.descriptionAr : relTool.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  ExternalLink, 
  Star, 
  Heart, 
  Share2, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Check, 
  Globe, 
  Tag, 
  Layers, 
  CreditCard, 
  FileText, 
  Copy, 
  Laptop, 
  Terminal, 
  Repeat, 
  GraduationCap, 
  PenTool, 
  Palette, 
  Code2, 
  TrendingUp, 
  Briefcase, 
  ShieldCheck, 
  ChevronLeft,
  ArrowUpRight,
  Info,
  Users,
  Compass,
  BookOpen,
  ShieldAlert,
  CheckSquare,
  HelpCircle
} from 'lucide-react';
import { AiTool, PricingType, Advertisement, CategoryId } from '../types';
import { CATEGORIES } from '../data/toolsData';
import { KNOWLEDGE_ARTICLES } from '../articles/articleData';
import { SponsoredBanner } from './SponsoredBanner';
import { SEO } from './SEO';
import { getToolSEO } from '../lib/seoHelpers';
import { SupportedLanguage } from '../lib/i18n';

interface ToolDetailModalProps {
  tool: AiTool | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  userRating: number | undefined;
  userNote: string;
  onToggleFavorite: (id: string) => void;
  onRateTool: (id: string, rating: number) => void;
  onSaveNote: (id: string, note: string) => void;
  onSelectTool: (tool: AiTool) => void;
  onOpenPromptsForTool?: (toolName: string) => void;
  onSelectCategory?: (category: CategoryId) => void;
  onSelectTag?: (tag: string) => void;
  allTools: AiTool[];
  advertisements?: Advertisement[];
  isDarkMode: boolean;
  lang?: SupportedLanguage;
  isStandaloneRoute?: boolean;
}

interface AudienceItem {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ALL_AUDIENCES: Record<string, AudienceItem> = {
  students: {
    id: 'students',
    nameAr: 'الطلاب والباحثون',
    nameEn: 'Students & Researchers',
    descriptionAr: 'لإعداد الأبحاث الأكاديمية، تلخيص المراجع المعقدة، والتحصيل العلمي.',
    descriptionEn: 'For preparing academic research, summarizing complex literature, and scientific studies.',
    icon: GraduationCap,
  },
  creators: {
    id: 'creators',
    nameAr: 'صناع المحتوى والكتاب',
    nameEn: 'Content Creators & Writers',
    descriptionAr: 'لتوليد الأفكار، صياغة المقالات، وتطوير السيناريوهات والمحتوى الرقمي.',
    descriptionEn: 'For brainstorming ideas, drafting articles, and developing scripts and digital media.',
    icon: PenTool,
  },
  designers: {
    id: 'designers',
    nameAr: 'المصممون والمبدعون',
    nameEn: 'Designers & Visual Artists',
    descriptionAr: 'لإنشاء وتعديل الرسومات الفنية، واجهات الاستخدام، والمؤثرات البصرية.',
    descriptionEn: 'For creating and refining visual artwork, user interfaces, and visual assets.',
    icon: Palette,
  },
  developers: {
    id: 'developers',
    nameAr: 'المبرمجون والمطورون',
    nameEn: 'Developers & Engineers',
    descriptionAr: 'لكتابة الأكواد، فحص الأخطاء، وتسريع وتيرة بناء التطبيقات.',
    descriptionEn: 'For writing clean code, debugging issues, and accelerating software engineering.',
    icon: Code2,
  },
  marketers: {
    id: 'marketers',
    nameAr: 'المسوقون ورواد الأعمال',
    nameEn: 'Marketers & Entrepreneurs',
    descriptionAr: 'لإطلاق الحملات الإعلانية، كتابة نصوص الإعلانات، وتحسين نتائج محركات البحث.',
    descriptionEn: 'For launching ad campaigns, crafting marketing copy, and boosting SEO rankings.',
    icon: TrendingUp,
  },
  businesses: {
    id: 'businesses',
    nameAr: 'الشركات وفرق العمل',
    nameEn: 'Businesses & Teams',
    descriptionAr: 'لأتمتة المهام التشغيلية، تنظيم المشاريع، ورفع كفاءة الإنتاجية الإدارية.',
    descriptionEn: 'For automating operations, organizing workflows, and maximizing team productivity.',
    icon: Briefcase,
  },
};

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({
  tool,
  isOpen,
  onClose,
  isFavorite,
  userRating,
  userNote,
  onToggleFavorite,
  onRateTool,
  onSaveNote,
  onSelectTool,
  onOpenPromptsForTool,
  onSelectCategory,
  onSelectTag,
  allTools,
  advertisements = [],
  isDarkMode,
  lang = 'ar' as SupportedLanguage,
  isStandaloneRoute = false
}) => {
  const isAr = lang === 'ar';
  const [noteText, setNoteText] = useState(userNote);
  const [copied, setCopied] = useState(false);
  const [noteSavedToast, setNoteSavedToast] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [logoImgError, setLogoImgError] = useState(false);

  // Compute related articles from Knowledge Hub
  const relatedArticles = useMemo(() => {
    if (!tool) return [];
    return KNOWLEDGE_ARTICLES.filter((art) => {
      const toolId = tool.id.toLowerCase();
      const inRelatedTools = art.relatedTools?.some((t) => t.toLowerCase() === toolId);
      const sameCategory = art.category === tool.category;
      return inRelatedTools || sameCategory;
    }).slice(0, 3);
  }, [tool]);

  // Sync user note
  useEffect(() => {
    setNoteText(userNote || '');
  }, [userNote, tool]);

  // Reset logo error on tool change
  useEffect(() => {
    setLogoImgError(false);
  }, [tool?.id]);

  // Keyboard escape listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Target audiences mapping based on category, tags, and use cases
  const targetAudiences = useMemo<AudienceItem[]>(() => {
    if (!tool) return [];
    const matched = new Set<string>();

    switch (tool.category) {
      case 'coding_dev':
        matched.add('developers');
        matched.add('students');
        matched.add('businesses');
        break;
      case 'academic_scholar':
      case 'search_research':
        matched.add('students');
        matched.add('creators');
        break;
      case 'image_generation':
      case 'design_ui':
        matched.add('designers');
        matched.add('creators');
        matched.add('marketers');
        break;
      case 'video_generation':
        matched.add('creators');
        matched.add('marketers');
        matched.add('designers');
        break;
      case 'audio_music':
        matched.add('creators');
        matched.add('designers');
        matched.add('marketers');
        break;
      case 'text_writing':
        matched.add('creators');
        matched.add('marketers');
        matched.add('students');
        matched.add('businesses');
        break;
      case 'productivity':
        matched.add('businesses');
        matched.add('marketers');
        matched.add('students');
        matched.add('developers');
        break;
      case 'chatbots':
        matched.add('students');
        matched.add('creators');
        matched.add('developers');
        matched.add('businesses');
        break;
      case 'translation':
        matched.add('students');
        matched.add('businesses');
        matched.add('creators');
        break;
      case 'education':
        matched.add('students');
        matched.add('creators');
        matched.add('businesses');
        break;
      default:
        matched.add('students');
        matched.add('creators');
        break;
    }

    const corpus = (
      tool.tags.join(' ') + ' ' +
      tool.useCases.join(' ') + ' ' +
      (tool.academicTags?.join(' ') || '') + ' ' +
      tool.descriptionAr
    ).toLowerCase();

    if (corpus.includes('برمج') || corpus.includes('كود') || corpus.includes('مطور') || corpus.includes('api')) {
      matched.add('developers');
    }
    if (corpus.includes('تصميم') || corpus.includes('رسم') || corpus.includes('صور') || corpus.includes('جرافيك')) {
      matched.add('designers');
    }
    if (corpus.includes('تسويق') || corpus.includes('سوشيال') || corpus.includes('seo') || corpus.includes('إعلان')) {
      matched.add('marketers');
    }
    if (corpus.includes('طالب') || corpus.includes('أكاديم') || corpus.includes('جامع') || corpus.includes('بحث علمي') || tool.academicFocus) {
      matched.add('students');
    }
    if (corpus.includes('شركة') || corpus.includes('فريق') || corpus.includes('إدارة') || corpus.includes('أعمال')) {
      matched.add('businesses');
    }
    if (corpus.includes('مقال') || corpus.includes('صانع') || corpus.includes('فيديو') || corpus.includes('يوتيوب') || corpus.includes('كتابة')) {
      matched.add('creators');
    }

    const results: AudienceItem[] = [];
    matched.forEach((key) => {
      if (ALL_AUDIENCES[key]) {
        results.push(ALL_AUDIENCES[key]);
      }
    });

    return results;
  }, [tool]);

  // Pricing model explanation helper
  const pricingInfo = useMemo(() => {
    if (!tool) return null;
    switch (tool.pricing) {
      case 'free':
        return {
          labelAr: 'مجاني بالكامل',
          labelEn: 'Free',
          badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
          explanation: 'الأداة مجانية للاستخدام بشكل كامل دون الحاجة إلى اشتراك مالي أو بطاقة بنكية.',
          explanationEn: 'The tool is completely free to use without requiring any financial subscription or credit card.'
        };
      case 'freemium':
        return {
          labelAr: 'مجاني جزئياً',
          labelEn: 'Freemium',
          badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-300 dark:border-blue-800',
          explanation: 'توفر الأداة خطة مجانية دائمة مع ميزات قياسية، مع توفير خطط مدفوعة للحصول على ميزات متقدمة أو سعة استخدام أكبر.',
          explanationEn: 'Offers a perpetual free plan with standard features, alongside paid plans for advanced capabilities and higher limits.'
        };
      case 'paid':
        return {
          labelAr: 'مدفوع',
          labelEn: 'Paid',
          badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300 dark:border-amber-800',
          explanation: 'تتطلب الأداة اشتراكاً مدفوعاً للوصول إلى كامل إمكانياتها واستخدام خدماتها.',
          explanationEn: 'Requires a paid subscription to access full capabilities and leverage its services.'
        };
      case 'free_trial':
        return {
          labelAr: 'تجربة مجانية',
          labelEn: 'Free Trial',
          badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950/70 dark:text-teal-300 border-teal-300 dark:border-teal-800',
          explanation: 'تتيح الأداة تجربة خدماتها مجاناً لفترة محددة أو بعدد نقاط تجريبية قبل الترقية إلى خطة مدفوعة.',
          explanationEn: 'Provides free trial access for a limited time or credits before upgrading to a paid tier.'
        };
      case 'open_source':
        return {
          labelAr: 'مفتوح المصدر',
          labelEn: 'Open Source',
          badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 border-purple-300 dark:border-purple-800',
          explanation: 'الأداة مفتوحة المصدر بالكامل ومتاحة مجاناً للجميع للاستخدام، التعديل، أو الاستضافة الذاتية.',
          explanationEn: 'Fully open-source and free for everyone to use, modify, or self-host.'
        };
      default:
        return {
          labelAr: tool.pricingAr || 'غير محدد',
          labelEn: 'Available',
          badgeColor: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700',
          explanation: 'يرجى مراجعة الموقع الرسمي للتحقق من تفاصيل الباقات المحدثة.',
          explanationEn: 'Please refer to the official website to verify current plan details.'
        };
    }
  }, [tool]);

  // Alternatives discovery (3-5 tools from Adawatai database)
  const alternatives = useMemo<AiTool[]>(() => {
    if (!tool) return [];
    const found: AiTool[] = [];
    const addedIds = new Set<string>([tool.id]);

    // 1. Direct alternativeTo links
    if (tool.alternativeTo && tool.alternativeTo.length > 0) {
      for (const altName of tool.alternativeTo) {
        const lower = altName.toLowerCase().trim();
        const match = allTools.find(
          (t) => !addedIds.has(t.id) && (
            t.nameEn.toLowerCase().includes(lower) ||
            t.nameAr.includes(altName) ||
            t.id.toLowerCase().includes(lower)
          )
        );
        if (match) {
          found.push(match);
          addedIds.add(match.id);
        }
      }
    }

    // 2. Tools referencing this tool
    for (const t of allTools) {
      if (!addedIds.has(t.id) && t.alternativeTo) {
        const matches = t.alternativeTo.some(
          (alt) => alt.toLowerCase().includes(tool.nameEn.toLowerCase()) || tool.nameEn.toLowerCase().includes(alt.toLowerCase())
        );
        if (matches) {
          found.push(t);
          addedIds.add(t.id);
        }
      }
      if (found.length >= 5) break;
    }

    // 3. Same category high-rated tools
    if (found.length < 4) {
      const sameCategory = allTools
        .filter((t) => !addedIds.has(t.id) && t.category === tool.category)
        .sort((a, b) => b.rating - a.rating);
      for (const t of sameCategory) {
        found.push(t);
        addedIds.add(t.id);
        if (found.length >= 4) break;
      }
    }

    return found.slice(0, 5);
  }, [tool, allTools]);

  // Related tools (from same category, excluding active tool and alternatives)
  const relatedTools = useMemo<AiTool[]>(() => {
    if (!tool) return [];
    const excludedIds = new Set<string>([tool.id, ...alternatives.map((a) => a.id)]);

    return allTools
      .filter((t) => !excludedIds.has(t.id) && t.category === tool.category)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }, [tool, allTools, alternatives]);

  // Find category object
  const categoryObj = CATEGORIES.find((c) => tool ? c.id === tool.category : false);

  // Generate dynamic SEO metadata and structured JSON-LD for this tool
  const currentLang: SupportedLanguage = lang || 'ar';
  const seoData = useMemo(() => {
    if (!tool) return null;
    return getToolSEO(tool, categoryObj, currentLang);
  }, [tool, categoryObj, currentLang]);

  if (!isOpen || !tool) return null;

  const handleCopyLink = () => {
    const shareUrl = `https://adawatai.online/tools/${tool.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveNote(tool.id, noteText);
    setNoteSavedToast(true);
    setTimeout(() => setNoteSavedToast(false), 2500);
  };

  const displayRating = userRating || tool.rating;

  // Derive domain for official favicon logo
  let domain = '';
  try {
    if (tool.websiteUrl) {
      domain = new URL(tool.websiteUrl).hostname;
    }
  } catch (e) {}
  const faviconUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : '';

  // In-article ads if enabled
  const inArticleTopAd = advertisements.find((a) => a.isActive && a.placement === 'in_article_top');
  const inArticleBottomAd = advertisements.find((a) => a.isActive && a.placement === 'in_article_bottom');

  const modalContent = (
    <div 
      id={isStandaloneRoute ? 'tool-detail-page-container' : 'tool-detail-modal-container'}
      className={`relative w-full ${
        isStandaloneRoute 
          ? 'max-w-5xl mx-auto shadow-sm my-0 sm:my-4' 
          : 'max-w-4xl shadow-2xl my-4 sm:my-8 z-10'
      } rounded-3xl border overflow-hidden transition-colors ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-800 text-slate-100' 
          : 'bg-white border-slate-200 text-slate-900'
      }`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* 1. Tool Header (Breadcrumb + Title + Logo + Rating + Badges + Quick Actions) */}
      <header className={`relative p-5 sm:p-7 border-b ${
        isDarkMode 
          ? 'bg-gradient-to-b from-slate-800/80 to-slate-900 border-slate-800' 
          : 'bg-gradient-to-b from-slate-50/90 to-white border-slate-200/80'
      }`}>
        {/* Close button top corner (or Back to Directory for standalone route) */}
        {isStandaloneRoute ? (
          <button
            onClick={onClose}
            className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-200/70 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors z-20 cursor-pointer`}
            title={lang === 'ar' ? 'العودة للدليل' : 'Back to Directory'}
            aria-label={lang === 'ar' ? 'العودة للدليل' : 'Back to Directory'}
          >
            <ChevronLeft className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            <span>{lang === 'ar' ? 'العودة للدليل' : 'Back to Directory'}</span>
          </button>
        ) : (
          <button
            id="close-modal-btn"
            onClick={onClose}
            className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} p-2 rounded-full bg-slate-200/60 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors z-20 cursor-pointer`}
            title={lang === 'ar' ? 'إغلاق النافذة (Esc)' : 'Close window (Esc)'}
            aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        )}

          {/* Breadcrumbs Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4 flex-wrap">
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'الرئيسية' : 'Home'}
            </a>
            <span className="text-slate-400">/</span>
            <a 
              href={`/category/${tool.category}`}
              onClick={(e) => {
                e.preventDefault();
                if (onSelectCategory) {
                  onClose();
                  onSelectCategory(tool.category);
                }
              }}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium cursor-pointer"
            >
              {lang === 'en' ? (categoryObj?.nameEn || 'Directory') : (categoryObj?.nameAr || 'دليل الأدوات')}
            </a>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 dark:text-white font-semibold truncate max-w-[240px]">
              {lang === 'en' ? tool.nameEn : tool.nameAr}
            </span>
          </nav>

          {/* Header Content Grid */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
            {/* Logo + Titles */}
            <div className="flex items-start gap-4 min-w-0">
              {/* Official Logo / Badge */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-2 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm shrink-0 overflow-hidden">
                {!logoImgError && faviconUrl ? (
                  <img
                    src={faviconUrl}
                    alt={`${tool.nameEn} logo`}
                    onError={() => setLogoImgError(true)}
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                ) : (
                  <div className={`w-full h-full rounded-xl flex items-center justify-center text-white font-black text-xl bg-gradient-to-br ${tool.gradient || 'from-indigo-600 to-purple-700'}`}>
                    {tool.nameEn.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Title & Tagline */}
              <div className="min-w-0 space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 id="tool-title-h1" className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                    {lang === 'en' ? tool.nameEn : tool.nameAr}
                    {lang === 'ar' && (
                      <span className="mr-2 text-base sm:text-lg font-semibold text-slate-500 dark:text-slate-400">
                        ({tool.nameEn})
                      </span>
                    )}
                  </h1>

                  {tool.isFeatured && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                      {lang === 'ar' ? 'أداة رائدة' : 'Featured'}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  {lang === 'en' ? (tool.taglineEn || tool.descriptionEn || tool.taglineAr) : tool.taglineAr}
                </p>

                {/* Badges Row: Category, Rating, Pricing Model */}
                <div className="flex items-center gap-2 pt-1 flex-wrap text-xs">
                  {/* Category Badge */}
                  <button
                    onClick={() => {
                      if (onSelectCategory) {
                        onClose();
                        onSelectCategory(tool.category);
                      }
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 transition-colors cursor-pointer"
                    title={isAr ? `استعراض أدوات تصنيف ${categoryObj?.nameAr}` : `Browse ${categoryObj?.nameEn || 'category'} tools`}
                  >
                    <Layers className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{isAr ? (categoryObj?.nameAr || 'القسم') : (categoryObj?.nameEn || 'Category')}</span>
                  </button>

                  {/* Editorial Rating Badge */}
                  <div 
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80 cursor-help"
                    title={isAr 
                      ? 'التقييم الظاهر هو تقييم تحريري من أدواتي، وليس متوسط تقييمات المستخدمين.' 
                      : 'This is an editorial score from Adawatai, not a user-review average.'}
                  >
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{displayRating.toFixed(1)} / 5</span>
                    <span className="text-[10px] font-semibold text-amber-700/90 dark:text-amber-300/80">
                      ({isAr ? 'تقييم تحريري' : 'Editorial score'})
                    </span>
                  </div>

                  {/* Pricing Model Badge */}
                  {pricingInfo && (
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold border text-xs ${pricingInfo.badgeColor}`}>
                      <CreditCard className="w-3.5 h-3.5 opacity-75" />
                      <span>{isAr ? pricingInfo.labelAr : pricingInfo.labelEn}</span>
                      {isAr && (
                        <span className="text-[10px] font-normal opacity-75">({pricingInfo.labelEn})</span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions & Official Website CTA */}
            <div className="flex items-center gap-2 shrink-0 self-stretch sm:self-auto justify-end">
              {/* Favorite Button */}
              <button
                id="modal-favorite-btn"
                onClick={() => onToggleFavorite(tool.id)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isFavorite 
                    ? 'bg-rose-500 text-white border-rose-400 shadow-sm' 
                    : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
                title={isFavorite ? (isAr ? 'إزالة من المفضلة' : 'Remove from favorites') : (isAr ? 'حفظ في المفضلة' : 'Add to favorites')}
                aria-label={isFavorite ? (isAr ? 'إزالة من المفضلة' : 'Remove from favorites') : (isAr ? 'حفظ في المفضلة' : 'Add to favorites')}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
              </button>

              {/* Share/Copy Link Button */}
              <button
                id="modal-copy-btn"
                onClick={handleCopyLink}
                className="p-2.5 rounded-xl border bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                title={isAr ? 'نسخ رابط صفحة الأداة' : 'Copy page link'}
                aria-label={isAr ? 'مشاركة الأداة' : 'Share tool'}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              </button>

              {/* 10. Official Website CTA (Header) */}
              <a
                id="modal-visit-btn-top"
                href={tool.isDigitalTool ? `/tools/${tool.digitalToolSlug || tool.id}` : tool.websiteUrl}
                onClick={(e) => {
                  if (tool.isDigitalTool) {
                    e.preventDefault();
                    onClose();
                    window.history.pushState(null, '', `/tools/${tool.digitalToolSlug || tool.id}`);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }
                }}
                target={tool.isDigitalTool ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>{tool.isDigitalTool ? (isAr ? 'استخدام الأداة مجاناً الآن' : 'Launch Free Tool Now') : (isAr ? 'زيارة الموقع الرسمي' : 'Visit Official Website')}</span>
                {tool.isDigitalTool ? <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" /> : <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </a>
            </div>
          </div>
        </header>

        {/* Scrollable Body Content */}
        <div className="p-5 sm:p-8 space-y-7 max-h-[72vh] overflow-y-auto">
          {/* Top in-article sponsored ad if active */}
          {inArticleTopAd && (
            <SponsoredBanner ad={inArticleTopAd} isDarkMode={isDarkMode} />
          )}

          {/* 2. What is [Tool Name]? (ما هي أداة وما المشكلة التي تحلها) */}
          <section aria-labelledby="section-about-title">
            <h2 id="section-about-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2.5 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>
                {isAr 
                  ? `ما هي أداة ${tool.nameAr} (${tool.nameEn}) وما المشكلة التي تحلها؟` 
                  : `What is ${tool.nameEn} and what problem does it solve?`}
              </span>
            </h2>
            <div className={`p-4 sm:p-5 rounded-2xl border leading-relaxed text-sm ${
              isDarkMode ? 'bg-slate-800/40 border-slate-800 text-slate-300' : 'bg-slate-50/80 border-slate-200/90 text-slate-700'
            }`}>
              <p className="mb-2.5 font-normal">
                {!isAr && tool.descriptionEn ? tool.descriptionEn : tool.descriptionAr}
              </p>
              <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  {isAr 
                    ? 'حل ذكي متكامل مصمم لاختصار الوقت والجهد ورفع دقة المخرجات بجودة احترافية.'
                    : 'An integrated intelligent solution engineered to save time, streamline workflows, and deliver professional results.'}
                </span>
              </div>
            </div>
          </section>

          {/* 3. Key Features (أبرز المميزات والخصائص كعناصر نقطية واضحة) */}
          <section aria-labelledby="section-features-title">
            <h2 id="section-features-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>
                {isAr 
                  ? `أبرز مميزات وخصائص ${tool.nameAr} (Key Features)` 
                  : `Key Features & Capabilities of ${tool.nameEn}`}
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {tool.pros && tool.pros.length > 0 ? (
                tool.pros.map((feature, idx) => (
                  <div 
                    key={idx}
                    className={`flex items-start gap-2.5 p-3.5 rounded-xl border ${
                      isDarkMode ? 'bg-slate-800/40 border-slate-700/80 text-slate-200' : 'bg-slate-50/90 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </div>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed">{feature}</span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-500 p-3">
                  {isAr ? 'تتميز الأداة بدقة عالية وسرعة استجابة فائقة.' : 'Features high precision and rapid responsiveness.'}
                </div>
              )}
            </div>
          </section>

          {/* 4. Who is it for? (لمن هذه الأداة - الفئات المستفيدة ذات الصلة فقط) */}
          <section aria-labelledby="section-audience-title">
            <div className="flex items-center justify-between mb-3">
              <h2 id="section-audience-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>{isAr ? 'لمن هذه الأداة؟ (الجمهور والفئات المستفيدة)' : 'Who is this tool for? (Target Audience)'}</span>
              </h2>
              <span className="text-xs text-slate-400 hidden sm:inline">
                {isAr ? 'الفئات الأكثر استفادة من وظائف الأداة' : 'Key users and teams who benefit most'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {targetAudiences.map((aud) => {
                const IconComponent = aud.icon;
                return (
                  <div
                    key={aud.id}
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-all ${
                      isDarkMode 
                        ? 'bg-slate-800/40 border-slate-700/70 text-slate-200' 
                        : 'bg-white border-slate-200/80 text-slate-800 shadow-2xs'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-0.5">
                        {isAr ? aud.nameAr : aud.nameEn}
                      </h3>
                      <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                        {isAr ? aud.descriptionAr : aud.descriptionEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 5. Main Use Cases (أبرز حالات الاستخدام والتطبيقات العملية) */}
          {((!isAr && tool.useCasesEn && tool.useCasesEn.length > 0) || (tool.useCases && tool.useCases.length > 0)) && (
            <section aria-labelledby="section-usecases-title">
              <h2 id="section-usecases-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>{isAr ? 'أبرز حالات الاستخدام والتطبيقات العملية (Main Use Cases)' : 'Main Use Cases & Practical Applications'}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {((!isAr && tool.useCasesEn && tool.useCasesEn.length > 0) ? tool.useCasesEn : tool.useCases).map((uc, idx) => (
                  <div 
                    key={idx}
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                      isDarkMode ? 'bg-slate-800/40 border-slate-700/70' : 'bg-slate-50/70 border-slate-200/80'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                        {uc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 6. Pros & Cons (المميزات والسلبيات بنموذج متوازن وببيانات موثقة فقط) */}
          <section aria-labelledby="section-proscons-title">
            <h2 id="section-proscons-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Repeat className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>{isAr ? 'المميزات والسلبيات (Pros & Cons)' : 'Pros & Cons'}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pros */}
              <div className={`p-4 sm:p-5 rounded-2xl border ${
                isDarkMode ? 'bg-emerald-950/20 border-emerald-900/40' : 'bg-emerald-50/50 border-emerald-200/70'
              }`}>
                <h3 className="text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{isAr ? 'أبرز المميزات ونقاط القوة (Pros)' : 'Key Advantages & Strengths (Pros)'}</span>
                </h3>
                <ul className="space-y-2.5">
                  {((!isAr && tool.prosEn && tool.prosEn.length > 0) ? tool.prosEn : tool.pros).map((pro, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2 leading-relaxed">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className={`p-4 sm:p-5 rounded-2xl border ${
                isDarkMode ? 'bg-rose-950/20 border-rose-900/40' : 'bg-rose-50/50 border-rose-200/70'
              }`}>
                <h3 className="text-xs sm:text-sm font-bold text-rose-800 dark:text-rose-300 mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>{isAr ? 'المحددات والملاحظات (Cons)' : 'Limitations & Considerations (Cons)'}</span>
                </h3>
                {((!isAr && tool.consEn && tool.consEn.length > 0) ? tool.consEn : tool.cons) && ((!isAr && tool.consEn && tool.consEn.length > 0) ? tool.consEn : tool.cons).length > 0 ? (
                  <ul className="space-y-2.5">
                    {((!isAr && tool.consEn && tool.consEn.length > 0) ? tool.consEn : tool.cons).map((con, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2 leading-relaxed">
                        <span className="text-rose-600 dark:text-rose-400 font-bold shrink-0 mt-0.5">✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    {isAr 
                      ? 'لم تسجل أي سلبيات أو قيود جوهرية في بنية الاستخدام المعتادة للأداة.' 
                      : 'No major limitations or architectural drawbacks recorded under standard usage.'}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* 7. Pricing (شرح نموذج التسعير وتفاصيل الاشتراكات) */}
          <section aria-labelledby="section-pricing-title">
            <h2 id="section-pricing-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>{isAr ? 'تفاصيل الأسعار ونموذج الاشتراك (Pricing Model)' : 'Pricing Details & Subscription Model'}</span>
            </h2>

            <div className={`p-4 sm:p-5 rounded-2xl border space-y-4 ${
              isDarkMode ? 'bg-slate-800/40 border-slate-700/70' : 'bg-slate-50/80 border-slate-200/90'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${pricingInfo?.badgeColor}`}>
                    {isAr ? `${pricingInfo?.labelAr} (${pricingInfo?.labelEn})` : pricingInfo?.labelEn}
                  </span>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    {tool.supportsArabic 
                      ? (isAr ? '✓ تدعم اللغة العربية بطلاقة' : '✓ Fluent Arabic Support') 
                      : (isAr ? '— واجهة إنجليزية' : '— English Interface')}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <Laptop className="w-3.5 h-3.5" />
                  <span>
                    {isAr 
                      ? `المنصات: ${tool.platforms?.join('، ') || 'المتصفح (Web)'}` 
                      : `Platforms: ${(tool.platformsEn || tool.platforms)?.join(', ') || 'Web Browser'}`}
                  </span>
                </div>
              </div>

              {/* Verified Pricing Breakdown from Database */}
              {(!isAr && tool.pricingDetailsEn) || (isAr && tool.pricingDetailsAr) || tool.pricingDetailsAr ? (
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                    {isAr ? 'تفاصيل الخطة الموثقة:' : 'Verified Plan Details:'}
                  </span>
                  <p>{!isAr && tool.pricingDetailsEn ? tool.pricingDetailsEn : tool.pricingDetailsAr}</p>
                </div>
              ) : (
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {isAr ? pricingInfo?.explanation : pricingInfo?.explanationEn}
                </p>
              )}

              <p className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {isAr 
                    ? 'ملاحظة: تخضع خطط وباقات الأسعار للتحديث الدوري المستمر من قبل الموقع الرسمي للأداة.'
                    : 'Note: Pricing tiers and plans are subject to periodic updates by the official provider.'}
                </span>
              </p>
            </div>
          </section>

          {/* Editorial Methodology & Transparency */}
          <section aria-labelledby="section-methodology-title" className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
            isDarkMode ? 'bg-indigo-950/20 border-indigo-900/40 text-slate-200' : 'bg-indigo-50/50 border-indigo-100 text-slate-800'
          }`}>
            <h2 id="section-methodology-title" className="text-xs sm:text-sm font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{isAr ? 'منهجية صفحة الأداة' : 'Editorial Methodology'}</span>
            </h2>
            <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <p>
                {isAr 
                  ? 'هذه الصفحة إدخال تحريري في دليل أدواتي وليست صفحة تقييمات مستخدمين. نعتمد على معلومات الأداة ووصفها وحالات استخدامها ونموذج التسعير المتاح لدينا، ونحيلك إلى الموقع الرسمي للتحقق من آخر التغييرات.'
                  : 'This is an editorial directory entry, not a user-review page. We use the tool information, use cases and pricing data available to us, and link to the official provider so visitors can verify the latest changes.'}
              </p>
              <p className="font-semibold text-indigo-700 dark:text-indigo-300">
                {isAr 
                  ? 'التقييم الظاهر هو تقييم تحريري داخلي، وليس متوسطاً لمراجعات المستخدمين.'
                  : 'The score shown is an internal editorial rating, not a user-review average.'}
              </p>
            </div>
          </section>

          {/* Before Subscribing or Purchasing Checklist */}
          <section aria-labelledby="section-checklist-title" className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
            isDarkMode ? 'bg-amber-950/20 border-amber-900/40' : 'bg-amber-50/60 border-amber-200/70'
          }`}>
            <h2 id="section-checklist-title" className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{isAr ? 'قبل الاشتراك أو الشراء' : 'Before Subscribing or Purchasing'}</span>
            </h2>
            <p className="text-xs text-amber-800/90 dark:text-amber-200/90 leading-relaxed">
              {isAr 
                ? 'لضمان اتخاذ قرار استثماري مدروس يتناسب مع احتياجاتك، ينصح فريق تحرير أدواتي بما يلي:'
                : 'To ensure a well-informed decision that fits your workflow and budget, our editorial team recommends:'}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {isAr 
                    ? 'مراجعة الأسعار والباقات الحالية على الموقع الرسمي مباشرة قبل الدفع.' 
                    : 'Review current prices and tiers directly on the official provider website before purchasing.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {isAr 
                    ? 'التأكد من سياسة الاسترجاع والإلغاء وشروط تجديد الاشتراك التلقائي.' 
                    : 'Verify refund and cancellation policies along with automatic renewal terms.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {isAr 
                    ? 'فحص ما إذا كانت الأداة تدعم العربية بشكل كافٍ لمتطلباتك وتنسيق النصوص.' 
                    : 'Check whether Arabic language and RTL formatting adequately meet your project requirements.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {isAr 
                    ? 'التحقق من حدود الاستخدام (Rate limits أو حصص الائتمان) في الباقة المجانية أو المدفوعة.' 
                    : 'Inspect usage limits (token/rate limits or generation credits) in free and paid tiers.'}
                </span>
              </li>
            </ul>
          </section>

          {/* Academic or Scholar Focus if present */}
          {(tool.academicFocus || (tool.academicTags && tool.academicTags.length > 0)) && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200">
              <div className="flex items-center gap-2 mb-1.5 font-bold text-xs sm:text-sm">
                <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{isAr ? 'حقيبة البحث العلمي والطلبة والأساتذة:' : 'Academic, Student & Researcher Toolkit:'}</span>
              </div>
              {tool.academicFocus && (
                <p className="text-xs text-emerald-800 dark:text-emerald-300 mb-2 leading-relaxed">
                  {tool.academicFocus}
                </p>
              )}
              {tool.academicTags && tool.academicTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tool.academicTags.map((at) => (
                    <span key={at} className="px-2 py-0.5 rounded-md bg-emerald-100/70 dark:bg-emerald-900/60 text-[11px] font-semibold text-emerald-900 dark:text-emerald-200">
                      #{at}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Prompts library deep-link banner for this tool */}
          {onOpenPromptsForTool && (
            <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-amber-950/40 via-indigo-950/40 to-slate-900 border-amber-500/30' 
                : 'bg-gradient-to-r from-amber-50/90 via-indigo-50/70 to-purple-50/60 border-amber-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Terminal className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {isAr 
                      ? `أوامر وبرومبتات احترافية لـ ${tool.nameAr} (${tool.nameEn})` 
                      : `Curated Prompts & Formulas for ${tool.nameEn}`}
                  </h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    {isAr 
                      ? 'احصل على أفضل صياغات الأوامر باللغة العربية لتحقيق أقصى فاعلية واستجابة من الأداة.'
                      : 'Access optimized prompt formulas engineered for maximum precision and results.'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenPromptsForTool(tool.nameEn);
                }}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white shadow-xs transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? 'تصفح الأوامر المخصصة' : 'Browse Custom Prompts'}</span>
              </button>
            </div>
          )}

          {/* Bottom in-article sponsored ad if active */}
          {inArticleBottomAd && (
            <SponsoredBanner ad={inArticleBottomAd} isDarkMode={isDarkMode} />
          )}

          {/* 8. Alternatives (بدائل مقترحة للأداة من قاعدة بيانات أدواتي - قابلة للنقر) */}
          {alternatives.length > 0 && (
            <section aria-labelledby="section-alternatives-title" className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <h2 id="section-alternatives-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Repeat className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span>
                    {isAr 
                      ? `أفضل بدائل ${tool.nameAr} على منصة أدواتي (AI Alternatives)` 
                      : `Top Alternatives to ${tool.nameEn} on Adawatai`}
                  </span>
                </h2>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  {isAr ? 'أدوات مشابهة تقدم وظائف منافسة' : 'Similar tools with comparable features'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {alternatives.map((altTool) => (
                  <a
                    key={altTool.id}
                    href={`/tools/${encodeURIComponent(altTool.id)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectTool(altTool);
                    }}
                    className={`p-3.5 rounded-2xl border ${isAr ? 'text-right' : 'text-left'} transition-all hover:border-indigo-400 hover:shadow-md flex flex-col justify-between gap-3 group cursor-pointer ${
                      isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br ${altTool.gradient || 'from-indigo-600 to-purple-600'} shrink-0 shadow-xs`}>
                        {altTool.nameEn.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {isAr ? altTool.nameAr : altTool.nameEn}
                          </span>
                          <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5 shrink-0">
                            <Star className="w-3 h-3 fill-amber-400" />
                            {altTool.rating.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 block truncate">
                          {isAr ? altTool.nameEn : altTool.nameAr}
                        </span>
                      </div>
                    </div>

                    <p className={`text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed ${isAr ? 'text-right' : 'text-left'}`}>
                      {isAr ? altTool.taglineAr : (altTool.taglineEn || altTool.descriptionEn || altTool.taglineAr)}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400 truncate max-w-[120px]">
                        {isAr ? altTool.pricingAr : altTool.pricing}
                      </span>
                      <span className="text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1 font-medium transition-colors">
                        <span>{isAr ? 'عرض التفاصيل' : 'View Details'}</span>
                        <ChevronLeft className={`w-3.5 h-3.5 ${!isAr ? 'rotate-180' : ''}`} />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* 9. Related Tools (أدوات ذات صلة في نفس التصنيف لتشجيع التصفح المستمر) */}
          {relatedTools.length > 0 && (
            <section aria-labelledby="section-related-title" className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <h2 id="section-related-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span>
                    {isAr 
                      ? `أدوات ذات صلة في تصنيف ${categoryObj?.nameAr || 'القسم'}` 
                      : `Related Tools in ${categoryObj?.nameEn || 'Category'}`}
                  </span>
                </h2>
                <a
                  href={`/category/${tool.category}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onSelectCategory) {
                      onClose();
                      onSelectCategory(tool.category);
                    }
                  }}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{isAr ? 'استعراض كل القسم' : 'Browse All in Category'}</span>
                  <ChevronLeft className={`w-3.5 h-3.5 ${!isAr ? 'rotate-180' : ''}`} />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {relatedTools.map((relTool) => (
                  <a
                    key={relTool.id}
                    href={`/tools/${encodeURIComponent(relTool.id)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectTool(relTool);
                    }}
                    className={`p-3 rounded-xl border ${isAr ? 'text-right' : 'text-left'} transition-all hover:border-indigo-400 hover:shadow-sm flex flex-col justify-between gap-2 group cursor-pointer ${
                      isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br ${relTool.gradient || 'from-indigo-500 to-purple-600'} shrink-0`}>
                        {relTool.nameEn.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-white block truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {isAr ? relTool.nameAr : relTool.nameEn}
                        </span>
                        <span className="text-[10px] text-slate-400 block truncate">
                          {isAr ? relTool.pricingAr : relTool.pricing}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Related Guides & Articles from Knowledge Hub */}
          {relatedArticles.length > 0 && (
            <section aria-labelledby="section-knowledge-title" className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <h2 id="section-knowledge-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span>
                    {isAr 
                      ? 'مقالات وأدلة ذات صلة من مركز المعرفة' 
                      : 'Related Guides & Articles from Knowledge Hub'}
                  </span>
                </h2>
                <a
                  href="/knowledge"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    window.history.pushState(null, '', '/knowledge');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{isAr ? 'مركز المعرفة كاملاً' : 'All Guides'}</span>
                  <ChevronLeft className={`w-3.5 h-3.5 ${!isAr ? 'rotate-180' : ''}`} />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedArticles.map((art) => (
                  <a
                    key={art.id}
                    href={`/knowledge/${art.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      window.history.pushState(null, '', `/knowledge/${art.slug}`);
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                    className={`p-3.5 rounded-2xl border transition-all hover:border-indigo-400 hover:shadow-md flex flex-col justify-between gap-3 group cursor-pointer ${
                      isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                        {art.readingTime} {isAr ? 'دقائق قراءة' : 'min read'}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {art.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {art.description}
                      </p>
                    </div>

                    <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span>{isAr ? 'اقرأ الدليل' : 'Read Guide'}</span>
                      <ChevronLeft className={`w-3 h-3 ${!isAr ? 'rotate-180' : ''}`} />
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Interactive Rating & Personal User Notes Section (Local State) */}
          <section aria-labelledby="section-notes-title" className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
            isDarkMode ? 'bg-slate-800/50 border-slate-700/80' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 id="section-notes-title" className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>
                  {isAr 
                    ? `تقييمك الشخصي وملاحظاتك الخاصة حول ${tool.nameAr}` 
                    : `Your Private Rating & Notes for ${tool.nameEn}`}
                </span>
              </h3>
              
              {/* Star Picker */}
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-500 ml-1">
                  {isAr ? 'قيم تجربتك:' : 'Rate your experience:'}
                </span>
                {[1, 2, 3, 4, 5].map((star) => {
                  const isActive = hoverRating !== null ? hoverRating >= star : (userRating || 0) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => onRateTool(tool.id, star)}
                      className="p-1 hover:scale-125 transition-transform cursor-pointer"
                      title={isAr ? `تقييم ${star} نجوم` : `Rate ${star} stars`}
                      aria-label={isAr ? `تقييم ${star} نجوم` : `Rate ${star} stars`}
                    >
                      <Star className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Note form */}
            <form onSubmit={handleSaveNoteSubmit} className="space-y-2">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder={isAr 
                  ? 'اكتب ملاحظاتك الشخصية حول تجربتك لهذه الأداة (تُحفظ تلقائياً في ذاكرة متصفحك)...' 
                  : 'Write your private personal notes and workflow observations (saved locally in your browser)...'}
                rows={2}
                className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {noteSavedToast ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> {isAr ? 'تم حفظ الملاحظة بنجاح' : 'Note saved successfully'}
                    </span>
                  ) : (
                    isAr ? 'ملاحظاتك وتقييمك سرية وخاصة بك ومخزنة محلياً في جهازك' : 'Your notes and ratings are private and stored locally on your device'
                  )}
                </span>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-2xs cursor-pointer"
                >
                  {isAr ? 'حفظ الملاحظة' : 'Save Note'}
                </button>
              </div>
            </form>
          </section>

          {/* Tags cloud & internal link exploration */}
          {tool.tags && tool.tags.length > 0 && (
            <div className="pt-1 flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-slate-400 flex items-center gap-1 ml-1">
                <Tag className="w-3 h-3" /> {isAr ? 'الكلمات المفتاحية:' : 'Keywords:'}
              </span>
              {tool.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    if (onSelectTag) {
                      onClose();
                      onSelectTag(tag);
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 hover:text-indigo-600 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom Footer (Close + Share + Prominent 10. Official Website CTA) */}
        <footer className={`p-4 sm:p-5 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              {isStandaloneRoute ? (
                <>
                  <ChevronLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                  <span>{isAr ? 'العودة للدليل' : 'Back to Directory'}</span>
                </>
              ) : (
                <span>{isAr ? 'إغلاق النافذة' : 'Close Window'}</span>
              )}
            </button>

            <button
              onClick={handleCopyLink}
              className="px-3 py-2 text-xs font-medium rounded-xl text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? (isAr ? 'تم نسخ الرابط' : 'Link Copied!') : (isAr ? 'مشاركة الأداة' : 'Share Tool')}</span>
            </button>
          </div>

          {/* 10. Official Website CTA (Prominent Bottom Button) */}
          <a
            id="modal-visit-btn-bottom"
            href={tool.isDigitalTool ? `/tools/${tool.digitalToolSlug || tool.id}` : tool.websiteUrl}
            onClick={(e) => {
              if (tool.isDigitalTool) {
                e.preventDefault();
                onClose();
                window.history.pushState(null, '', `/tools/${tool.digitalToolSlug || tool.id}`);
                window.dispatchEvent(new PopStateEvent('popstate'));
              }
            }}
            target={tool.isDigitalTool ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>
              {tool.isDigitalTool 
                ? (isAr ? 'استخدام الأداة مجاناً الآن' : 'Launch Free Tool Now') 
                : (isAr ? 'زيارة الموقع الرسمي' : 'Visit Official Website')}
            </span>
            {tool.isDigitalTool ? <Sparkles className="w-4 h-4 text-amber-300" /> : <ExternalLink className="w-4 h-4" />}
          </a>
        </footer>
      </div>
  );

  if (isStandaloneRoute) {
    return (
      <div className="w-full animate-fadeIn">
        {seoData && (
          <SEO
            title={seoData.title}
            description={seoData.description}
            canonical={seoData.canonical}
            robots={seoData.robots}
            image={seoData.image}
            type="product"
            jsonLd={seoData.jsonLd}
            lang={lang}
            keywords={seoData.keywords}
          />
        )}
        {modalContent}
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tool-title-h1"
    >
      {seoData && (
        <SEO
          title={seoData.title}
          description={seoData.description}
          canonical={seoData.canonical}
          robots={seoData.robots}
          image={seoData.image}
          type="product"
          jsonLd={seoData.jsonLd}
          lang={lang}
          keywords={seoData.keywords}
        />
      )}
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      {modalContent}
    </div>
  );
};

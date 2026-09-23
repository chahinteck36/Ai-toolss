import { AiTool, Category } from '../types';
import { SupportedLanguage } from './i18n';

const BASE_URL = 'https://adawatai.online';

export interface GeneratedSEOData {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  image?: string;
  keywords?: string[];
  jsonLd: Record<string, any>;
}

// Category schema mapping for WebApplication applicationCategory
const CATEGORY_SCHEMA_MAP: Record<string, string> = {
  chatbots: 'BusinessApplication',
  text_writing: 'AuthoringApplication',
  image_generation: 'DesignApplication',
  video_generation: 'MultimediaApplication',
  coding_dev: 'DeveloperApplication',
  audio_music: 'AudioApplication',
  productivity: 'ProductivityApplication',
  search_research: 'ResearchApplication',
  design_ui: 'DesignApplication',
  translation: 'TranslationApplication',
  education: 'EducationalApplication',
  academic_scholar: 'EducationalApplication',
  ai_alternatives: 'UtilitiesApplication',
};

/**
 * Generate Home Page SEO Metadata and JSON-LD Structured Data
 */
export function getHomeSEO(lang: SupportedLanguage = 'ar', totalToolsCount: number = 50): GeneratedSEOData {
  const isAr = lang === 'ar';

  const title = isAr
    ? 'أدواتي AI | دليل أدوات الذكاء الاصطناعي الشامل - adawatai.online'
    : 'Adawatai AI | Comprehensive AI Tools Discovery Directory';

  const description = isAr
    ? `المرجع العربي الشامل لاكتشاف وتصنيف ومراجعة أكثر من ${totalToolsCount} أداة وتطبيق ذكاء اصطناعي رائد في الكتابة، التصميم، البرمجة، والإنتاجية بدقة وتحديث مستمر.`
    : `Discover, compare and explore over ${totalToolsCount} leading artificial intelligence tools for writing, image creation, coding, and workflow productivity.`;

  const canonical = lang === 'ar' ? `${BASE_URL}/` : `${BASE_URL}/?lang=${lang}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        'url': `${BASE_URL}/`,
        'name': 'أدواتي AI',
        'alternateName': 'Adawatai.online',
        'description': description,
        'inLanguage': lang,
        'publisher': {
          '@id': `${BASE_URL}/#organization`,
        },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': {
            '@type': 'EntryPoint',
            'urlTemplate': `${BASE_URL}/?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        'name': 'أدواتي AI - adawatai.online',
        'url': `${BASE_URL}/`,
        'logo': {
          '@type': 'ImageObject',
          'url': `${BASE_URL}/logo.svg`,
          'contentUrl': `${BASE_URL}/logo.svg`,
          'width': 800,
          'height': 240,
          'caption': 'شعار أدواتي AI',
        },
        'sameAs': [
          'https://adawatai.online',
        ],
      },
    ],
  };

  return {
    title,
    description,
    canonical,
    robots: 'index, follow',
    image: `${BASE_URL}/logo.svg`,
    keywords: ['ذكاء اصطناعي', 'أدوات الذكاء الاصطناعي', 'AI tools', 'ChatGPT', 'Claude', 'adawatai'],
    jsonLd,
  };
}

/**
 * Generate Category Page SEO Metadata and JSON-LD Structured Data
 */
export function getCategorySEO(category: Category, lang: SupportedLanguage = 'ar'): GeneratedSEOData {
  const isAr = lang === 'ar';

  const categoryName = isAr ? category.nameAr : category.nameEn;
  const title = isAr
    ? `أفضل أدوات ${category.nameAr} | دليل أدواتي AI - adawatai.online`
    : `Best ${category.nameEn} AI Tools | Adawatai AI Directory`;

  const description = isAr
    ? `دليل ومراجعات أفضل أدوات ${category.nameAr} بالذكاء الاصطناعي: ${category.descriptionAr}. استعرض الأسعار والمميزات والبدائل.`
    : `Explore the top ${category.nameEn} artificial intelligence applications and software: features, user ratings, and pricing plans.`;

  const canonical = lang === 'ar' 
    ? `${BASE_URL}/category/${category.id}` 
    : `${BASE_URL}/category/${category.id}?lang=${lang}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': canonical,
    'url': canonical,
    'name': title,
    'description': description,
    'inLanguage': lang,
    'isPartOf': {
      '@type': 'WebSite',
      'name': 'أدواتي AI',
      'url': `${BASE_URL}/`,
    },
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': isAr ? 'الرئيسية' : 'Home',
          'item': `${BASE_URL}/`,
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': categoryName,
          'item': canonical,
        },
      ],
    },
  };

  return {
    title,
    description,
    canonical,
    robots: 'index, follow',
    image: `${BASE_URL}/logo.svg`,
    keywords: [categoryName, 'ذكاء اصطناعي', 'أدوات AI', 'adawatai'],
    jsonLd,
  };
}

/**
 * Generate Tool Page SEO Metadata and JSON-LD Structured Data (WebApplication Schema)
 */
export function getToolSEO(tool: AiTool, category?: Category, lang: SupportedLanguage = 'ar'): GeneratedSEOData {
  const isAr = lang === 'ar';

  const toolDisplayName = isAr ? `${tool.nameAr} (${tool.nameEn})` : tool.nameEn;
  const categoryName = category ? (isAr ? category.nameAr : category.nameEn) : tool.category;

  const title = isAr
    ? `${tool.nameAr} - دليل ومميزات، أسعار وبدائل الأداة | أدواتي AI`
    : `${tool.nameEn} - Editorial Guide, Features, Pricing & Alternatives | Adawatai AI`;

  const baseDesc = tool.taglineAr || tool.descriptionAr.slice(0, 160);
  const description = isAr
    ? `دليل تحريري شامل لأداة ${tool.nameAr} (${tool.nameEn}): ${baseDesc} استكشف المميزات، نموذج التسعير (${tool.pricingAr})، والبدائل المتاحة.`
    : `Editorial guide for ${tool.nameEn}: ${baseDesc} Explore features, pros & cons, pricing models, and top AI alternatives.`;

  const canonical = lang === 'ar'
    ? `${BASE_URL}/tools/${encodeURIComponent(tool.id)}`
    : `${BASE_URL}/tools/${encodeURIComponent(tool.id)}?lang=${lang}`;

  const isFree = tool.pricing === 'free' || tool.pricing === 'open_source';
  const appCategory = CATEGORY_SCHEMA_MAP[tool.category] || 'UtilitiesApplication';
  const osList = tool.platforms && tool.platforms.length > 0 ? tool.platforms.join(', ') : 'Web';

  // Schema.org WebApplication structured data - strictly verified without fabricated reviews or pricing
  const webAppSchema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': canonical,
    'name': tool.nameEn,
    'alternateName': tool.nameAr,
    'url': canonical,
    'applicationCategory': appCategory,
    'operatingSystem': osList,
    'browserRequirements': 'Requires JavaScript. Requires HTML5.',
    'description': tool.descriptionAr,
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': isAr ? 'الرئيسية' : 'Home',
          'item': `${BASE_URL}/`,
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': categoryName,
          'item': `${BASE_URL}/category/${tool.category}`,
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': isAr ? tool.nameAr : tool.nameEn,
          'item': canonical,
        },
      ],
    },
  };

  // Only include offer schema when the tool is genuinely 100% free / open source ($0)
  // Deceptive price 0.00 on paid/freemium tools is strictly omitted to comply with Google guidelines
  if (isFree) {
    webAppSchema.offers = {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock',
      'url': tool.websiteUrl,
    };
  }

  const jsonLd = webAppSchema;

  return {
    title,
    description,
    canonical,
    robots: 'index, follow',
    image: `${BASE_URL}/logo.svg`,
    keywords: [tool.nameEn, tool.nameAr, ...(tool.tags || []), 'أدوات الذكاء الاصطناعي', 'بدائل'],
    jsonLd,
  };
}

/**
 * Generate 404 Page SEO Metadata (with strict noindex)
 */
export function get404SEO(lang: SupportedLanguage = 'ar'): GeneratedSEOData {
  const isAr = lang === 'ar';

  const title = isAr
    ? '404 - الصفحة غير موجودة | أدواتي AI'
    : '404 - Page Not Found | Adawatai AI';

  const description = isAr
    ? 'الصفحة أو أداة الذكاء الاصطناعي التي تبحث عنها غير موجودة أو تم نقلها. تصفح دليل أدواتي AI للوصول إلى كافة الأدوات المتاحة.'
    : 'The requested AI tool or page could not be found. Please browse the catalog to find alternative tools.';

  return {
    title,
    description,
    canonical: `${BASE_URL}/404`,
    robots: 'noindex, nofollow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': title,
      'description': description,
    },
  };
}

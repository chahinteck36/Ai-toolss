import { SupportedLanguage } from '../lib/i18n';

export type ArticleCategoryId =
  | 'ai-tools'
  | 'pdf-tools'
  | 'file-conversion'
  | 'image-tools'
  | 'productivity'
  | 'students'
  | 'business'
  | 'tutorials'
  | 'comparisons';

export interface ArticleCategory {
  id: ArticleCategoryId;
  nameAr: string;
  nameEn: string;
  nameFr: string;
  descriptionAr: string;
  descriptionEn: string;
  descriptionFr: string;
  iconName: string;
}

export interface ArticleFaqItem {
  question: string;
  answer: string;
}

export interface ArticleTocItem {
  id: string;
  title: string;
  level?: 2 | 3;
}

export interface ArticleStep {
  step: number;
  title: string;
  desc: string;
}

export interface ArticleSection {
  id: string;
  heading: string;
  subheading?: string;
  paragraphs: string[];
  bulletPoints?: string[];
  steps?: ArticleStep[];
  callout?: {
    type: 'tip' | 'warning' | 'info';
    title: string;
    text: string;
  };
  comparisonTable?: {
    headers: string[];
    rows: string[][];
  };
  imagePlaceholder?: {
    alt: string;
    caption: string;
    svgIcon?: string;
  };
}

export interface ArticleContent {
  intro: string;
  sections: ArticleSection[];
  conclusion?: string;
}

export interface KnowledgeArticle {
  id: string;
  slug: string;
  language: SupportedLanguage;
  title: string;
  description: string;
  category: ArticleCategoryId;
  publishedAt: string;
  updatedAt: string;
  readingTime: number; // in minutes
  author: {
    name: string;
    role: string;
  };
  toc: ArticleTocItem[];
  content: ArticleContent;
  faq: ArticleFaqItem[];
  relatedTools: string[]; // Tool IDs in toolsData or digitalToolsRegistry
  relatedArticles: string[]; // Slugs of related articles
  featuredToolId?: string; // Existing tool id for "هل تحتاج الأداة الآن؟"
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  isPublished: boolean;
  featured?: boolean;
}

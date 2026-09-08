export type PricingType = 
  | 'free' // مجاني بالكامل
  | 'freemium' // مجاني جزئياً (Freemium)
  | 'free_trial' // تجربة مجانية
  | 'paid' // مدفوع
  | 'open_source'; // مفتوح المصدر

export type CategoryId = 
  | 'all'
  | 'pdf_documents' // PDF & Documents
  | 'image_tools' // Image Tools
  | 'text_tools' // Text Tools
  | 'calculators' // Calculators
  | 'developer_tools' // Developer Tools
  | 'seo_marketing' // SEO & Marketing
  | 'business_tools' // Business Tools
  | 'career_tools' // Career Tools
  | 'education_tools' // Education Tools
  | 'ai_tools' // AI Tools
  | 'academic_scholar' // حقيبة الطلبة والجامعيين والأساتذة
  | 'ai_alternatives' // منصة بدائل الذكاء الاصطناعي 2026
  | 'text_writing'
  | 'image_generation'
  | 'video_generation'
  | 'coding_dev'
  | 'audio_music'
  | 'productivity'
  | 'search_research'
  | 'chatbots'
  | 'design_ui'
  | 'translation'
  | 'education';

export interface Category {
  id: CategoryId;
  nameAr: string;
  nameEn: string;
  nameFr?: string;
  iconName: string;
  descriptionAr: string;
  descriptionEn?: string;
  color: string;
}

export interface DigitalToolStep {
  step: number;
  title: string;
  desc: string;
}

export interface DigitalToolFaq {
  question: string;
  answer: string;
}

export interface DigitalTool {
  id: string;
  slug: string;
  category: CategoryId;
  nameAr: string;
  nameEn: string;
  nameFr?: string;
  taglineAr: string;
  taglineEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: string;
  seoTitleAr: string;
  seoTitleEn: string;
  seoDescriptionAr: string;
  seoDescriptionEn: string;
  keywords: string[];
  isClientSide: boolean;
  howToUseAr: DigitalToolStep[];
  howToUseEn: DigitalToolStep[];
  featuresAr: string[];
  featuresEn: string[];
  faqAr: DigitalToolFaq[];
  faqEn: DigitalToolFaq[];
  relatedToolSlugs: string[];
}

export interface AiTool {
  id: string;
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  descriptionAr: string;
  category: CategoryId;
  pricing: PricingType;
  pricingAr: string;
  pricingDetailsAr?: string;
  websiteUrl: string;
  rating: number; // Base rating 1-5
  reviewsCount: number;
  tags: string[];
  isPopular?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  supportsArabic: boolean;
  platforms: string[];
  pros: string[];
  cons: string[];
  useCases: string[];
  addedDate: string;
  customAdded?: boolean;
  gradient?: string;
  iconBg?: string;
  status?: 'published' | 'pending' | 'draft' | 'archived';
  clicksCount?: number;
  submitterEmail?: string;
  submitterName?: string;
  // New academic & alternative features
  alternativeTo?: string[];
  isAlternative?: boolean;
  academicFocus?: boolean;
  academicTags?: string[];
  isDigitalTool?: boolean;
  digitalToolSlug?: string;
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: CategoryId;
  selectedPricing: string;
  onlyFavorites: boolean;
  onlyArabicSupport: boolean;
  onlyAcademic?: boolean;
  onlyAlternatives?: boolean;
  selectedAcademicTag?: string;
  sortBy: 'rating' | 'popular' | 'newest' | 'alphabetical';
}

export interface UserRatingData {
  toolId: string;
  rating: number;
  timestamp: number;
}

export interface ToolSubmission {
  id: string;
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  descriptionAr: string;
  category: CategoryId;
  pricing: PricingType;
  websiteUrl: string;
  submittedBy: string;
  submitterEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  notes?: string;
  supportsArabic?: boolean;
  tags?: string[];
}

export interface Advertisement {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  targetUrl: string;
  placement: 'top_banner' | 'grid_sponsored' | 'sidebar' | 'in_article_top' | 'in_article_bottom' | 'sticky_bottom' | 'footer';
  badgeText: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  clicks: number;
  impressions: number;
  bgGradient: string;
}

export interface Member {
  id: string;
  uid?: string;
  email: string;
  displayName: string;
  role: 'admin' | 'editor' | 'member';
  joinedAt: string;
  lastActive: string;
  avatarUrl?: string;
  status: 'active' | 'suspended';
}

export interface ToolReview {
  id: string;
  toolId: string;
  userName: string;
  userEmail?: string;
  rating: number;
  comment: string;
  createdAt: string;
  status: 'approved' | 'pending';
}

export interface SiteSettings {
  siteTitle: string;
  siteTagline: string;
  enableVisitorSubmissions: boolean;
  requireApprovalForSubmissions: boolean;
  showSponsoredAds: boolean;
  contactEmail: string;
  maintenanceMode: boolean;
}

export type PromptCategoryKey = 
  | 'all'
  | 'writing' 
  | 'marketing' 
  | 'coding' 
  | 'design_art' 
  | 'business' 
  | 'education' 
  | 'productivity';

export interface PromptItem {
  id: string;
  titleAr: string;
  category: PromptCategoryKey;
  categoryAr: string;
  targetTools: string[]; // e.g. ['ChatGPT', 'Claude', 'Gemini'] or ['Midjourney', 'DALL-E 3', 'Flux']
  promptText: string;
  instructionAr: string;
  tags: string[];
  difficulty: 'مبتدئ' | 'متوسط' | 'احترافي';
  isPopular?: boolean;
  isFeatured?: boolean;
  copyCount?: number;
  outputPreviewAr?: string;
}


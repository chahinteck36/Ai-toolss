// Language and Localization System for Adawatai.online
// Supports Arabic ('ar'), English ('en'), and French ('fr')

export type SupportedLanguage = 'ar' | 'en' | 'fr';

export const SUPPORTED_LANGUAGES: { code: SupportedLanguage; label: string; flag: string; dir: 'rtl' | 'ltr' }[] = [
  { code: 'ar', label: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'en', label: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', dir: 'ltr' },
];

export interface Translations {
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  vipBadge: string;
  headerTagline: string;
  aboutUs: string;
  contactUs: string;
  promptsLibrary: string;
  smartFinder: string;
  favorites: string;
  suggestTool: string;
  allTools: string;
  categories: string;
  freeOrFreemium: string;
  officialDomain: string;
  searchPlaceholder: string;
  categoryAll: string;
  rating: string;
  pricing: string;
  visitWebsite: string;
  viewDetails: string;
  whatIsTool: string;
  keyFeatures: string;
  targetAudience: string;
  mainUseCases: string;
  prosAndCons: string;
  pros: string;
  cons: string;
  pricingModel: string;
  alternativesTitle: string;
  relatedToolsTitle: string;
  copyLink: string;
  linkCopied: string;
  pageNotFoundTitle: string;
  pageNotFoundHeading: string;
  pageNotFoundDesc: string;
  backToHome: string;
  browseCatalog: string;
  noToolsFound: string;
  resetFilters: string;
  academicSuite: string;
  aiAlternatives: string;
  shareTool: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  ar: {
    siteName: 'أدواتي AI',
    siteTitle: 'أدواتي AI | دليل أدوات الذكاء الاصطناعي الشامل - adawatai.online',
    siteDescription: 'المرجع العربي الشامل لاكتشاف وتصنيف ومراجعة أفضل أدوات وتطبيقات الذكاء الاصطناعي في الكتابة، التصميم، البرمجة، والإنتاجية.',
    vipBadge: 'VIP 2026',
    headerTagline: 'المرجع العربي الشامل لاكتشاف وتصنيف ومراجعة أفضل أدوات الذكاء الاصطناعي',
    aboutUs: 'من نحن',
    contactUs: 'تواصل معنا',
    promptsLibrary: 'مكتبة الأوامر',
    smartFinder: 'المستكشف الذكي',
    favorites: 'المفضلة',
    suggestTool: 'اقترح أداة',
    allTools: 'جميع الأدوات',
    categories: 'التصنيفات',
    freeOrFreemium: 'مجانية / فريميوم',
    officialDomain: 'الموقع الرسمي: adawatai.online',
    searchPlaceholder: 'ابحث عن أداة ذكاء اصطناعي (مثال: ChatGPT, Claude, Midjourney...)',
    categoryAll: 'كافة التصنيفات',
    rating: 'التقييم',
    pricing: 'الأسعار',
    visitWebsite: 'زيارة الموقع الرسمي',
    viewDetails: 'عرض التفاصيل',
    whatIsTool: 'ما هي الأداة وما المشكلة التي تحلها؟',
    keyFeatures: 'أبرز المميزات والخصائص (Key Features)',
    targetAudience: 'لمن هذه الأداة؟ (الفئات المستفيدة)',
    mainUseCases: 'أبرز حالات الاستخدام والتطبيقات العملية',
    prosAndCons: 'المميزات والسلبيات (Pros & Cons)',
    pros: 'أبرز المميزات ونقاط القوة',
    cons: 'المحددات والملاحظات',
    pricingModel: 'تفاصيل الأسعار ونموذج الاشتراك',
    alternativesTitle: 'أفضل بدائل الأداة المتاحة',
    relatedToolsTitle: 'أدوات ذات صلة في نفس التصنيف',
    copyLink: 'نسخ رابط الأداة',
    linkCopied: 'تم نسخ الرابط بنجاح',
    pageNotFoundTitle: '404 - الصفحة غير موجودة | أدواتي AI',
    pageNotFoundHeading: 'عذراً، لم نتمكن من العثور على الأداة أو الصفحة المطلوبة',
    pageNotFoundDesc: 'الصفحة أو الأداة التي تحاول الوصول إليها قد تم نقلها أو تعديل اسمها أو أنها غير متوفرة حالياً في الدليل.',
    backToHome: 'العودة للرئيسية',
    browseCatalog: 'استعراض كل الأدوات',
    noToolsFound: 'لم يتم العثور على أدوات تطابق خيارات البحث الحالية',
    resetFilters: 'إعادة تعيين الفلاتر',
    academicSuite: 'حقيبة الطلبة والأساتذة',
    aiAlternatives: 'منصة البدائل 2026',
    shareTool: 'مشاركة الأداة'
  },
  en: {
    siteName: 'Adawatai AI',
    siteTitle: 'Adawatai AI | Comprehensive AI Tools Discovery Directory - adawatai.online',
    siteDescription: 'The comprehensive directory to discover, filter, and review the best artificial intelligence tools for writing, coding, image creation, and productivity.',
    vipBadge: 'VIP 2026',
    headerTagline: 'The premier directory to discover and evaluate the best AI tools worldwide',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    promptsLibrary: 'Prompts Library',
    smartFinder: 'AI Finder',
    favorites: 'Favorites',
    suggestTool: 'Submit Tool',
    allTools: 'All Tools',
    categories: 'Categories',
    freeOrFreemium: 'Free / Freemium',
    officialDomain: 'Official Site: adawatai.online',
    searchPlaceholder: 'Search AI tools (e.g., ChatGPT, Claude, Midjourney...)',
    categoryAll: 'All Categories',
    rating: 'Rating',
    pricing: 'Pricing',
    visitWebsite: 'Visit Official Website',
    viewDetails: 'View Details',
    whatIsTool: 'What is this tool and what problem does it solve?',
    keyFeatures: 'Key Features & Capabilities',
    targetAudience: 'Who is this tool for? (Target Audience)',
    mainUseCases: 'Main Use Cases & Applications',
    prosAndCons: 'Pros & Cons',
    pros: 'Key Strengths & Pros',
    cons: 'Limitations & Cons',
    pricingModel: 'Pricing Model & Plans',
    alternativesTitle: 'Best AI Alternatives',
    relatedToolsTitle: 'Related Tools in Same Category',
    copyLink: 'Copy Tool Link',
    linkCopied: 'Link copied successfully',
    pageNotFoundTitle: '404 - Page Not Found | Adawatai AI',
    pageNotFoundHeading: 'Oops! The requested tool or page was not found',
    pageNotFoundDesc: 'The page or tool you are looking for might have been moved, renamed, or is currently unavailable in the catalog.',
    backToHome: 'Back to Homepage',
    browseCatalog: 'Browse All AI Tools',
    noToolsFound: 'No tools match your current search criteria',
    resetFilters: 'Reset Filters',
    academicSuite: 'Academic & Scholar Suite',
    aiAlternatives: 'AI Alternatives 2026',
    shareTool: 'Share Tool'
  },
  fr: {
    siteName: 'Adawatai AI',
    siteTitle: 'Adawatai AI | Répertoire Complet d\'Outils d\'Intelligence Artificielle - adawatai.online',
    siteDescription: 'Le répertoire complet pour découvrir, comparer et évaluer les meilleurs outils d\'intelligence artificielle pour la rédaction, le code, l\'image et la productivité.',
    vipBadge: 'VIP 2026',
    headerTagline: 'Le répertoire de référence pour découvrir et évaluer les meilleurs outils d\'IA',
    aboutUs: 'À propos',
    contactUs: 'Contactez-nous',
    promptsLibrary: 'Bibliothèque de Prompts',
    smartFinder: 'Assistant IA',
    favorites: 'Favoris',
    suggestTool: 'Proposer un outil',
    allTools: 'Tous les outils',
    categories: 'Catégories',
    freeOrFreemium: 'Gratuit / Freemium',
    officialDomain: 'Site officiel: adawatai.online',
    searchPlaceholder: 'Rechercher un outil d\'IA (ex: ChatGPT, Claude, Midjourney...)',
    categoryAll: 'Toutes les catégories',
    rating: 'Évaluation',
    pricing: 'Tarification',
    visitWebsite: 'Visiter le site officiel',
    viewDetails: 'Voir les détails',
    whatIsTool: 'Qu\'est-ce que cet outil et quel problème résout-il ?',
    keyFeatures: 'Fonctionnalités Clés',
    targetAudience: 'À qui s\'adresse cet outil ? (Public cible)',
    mainUseCases: 'Cas d\'usage principaux',
    prosAndCons: 'Avantages et Inconvénients',
    pros: 'Points forts & Avantages',
    cons: 'Limites & Inconvénients',
    pricingModel: 'Modèle de tarification & Forfaits',
    alternativesTitle: 'Meilleures Alternatives d\'IA',
    relatedToolsTitle: 'Outils similaires dans cette catégorie',
    copyLink: 'Copier le lien',
    linkCopied: 'Lien copié avec succès',
    pageNotFoundTitle: '404 - Page Non Trouvée | Adawatai AI',
    pageNotFoundHeading: 'Oups ! L\'outil ou la page demandée est introuvable',
    pageNotFoundDesc: 'La page ou l\'outil que vous recherchez a peut-être été déplacé ou n\'est pas disponible actuellement.',
    backToHome: 'Retour à l\'accueil',
    browseCatalog: 'Explorer tous les outils',
    noToolsFound: 'Aucun outil ne correspond à vos critères',
    resetFilters: 'Réinitialiser les filtres',
    academicSuite: 'Suite Académique & Étudiants',
    aiAlternatives: 'Alternatives IA 2026',
    shareTool: 'Partager l\'outil'
  }
};

export const detectInitialLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') return 'ar';

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang')?.toLowerCase();
    if (langParam === 'en' || langParam === 'fr' || langParam === 'ar') {
      return langParam as SupportedLanguage;
    }

    const savedLang = localStorage.getItem('ai_directory_lang');
    if (savedLang === 'en' || savedLang === 'fr' || savedLang === 'ar') {
      return savedLang as SupportedLanguage;
    }
  } catch (e) {}

  return 'ar';
};

// Language and Localization System for Adawatai.online
// Strictly supports Arabic ('ar') and English ('en') with Arabic as default.

export type SupportedLanguage = 'ar' | 'en';

export const SUPPORTED_LANGUAGES: { code: SupportedLanguage; label: string; flag: string; dir: 'rtl' | 'ltr' }[] = [
  { code: 'ar', label: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'en', label: 'English', flag: '🇺🇸', dir: 'ltr' },
];

export interface Translations {
  // Brand & Site Meta
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  vipBadge: string;
  headerTagline: string;
  aboutUs: string;
  contactUs: string;
  privacyPolicy: string;
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

  // Header Ticker & Actions
  toolsCountLabel: string;
  categoriesCountLabel: string;
  freeOrFreemiumLabel: string;
  officialDomainLabel: string;
  lightModeTitle: string;
  darkModeTitle: string;
  changeLanguageTitle: string;

  // Hero Section
  heroBadge: string;
  heroTitleHighlight: string;
  heroTitleRest: string;
  heroSubtitle: string;
  trendingSearches: string;
  arabicSupportBadge: string;
  suggestedKeyword: string;
  didYouMean: string;
  openSmartFinderHero: string;
  promptsLibraryHero: string;

  // Categories Section
  browseByCategoryTitle: string;
  browseByCategorySubtitle: string;
  viewAllCategories: string;
  viewFewerCategories: string;
  toolSingular: string;
  toolPlural: string;

  // Filter Bar
  allPricing: string;
  freeOnly: string;
  freemiumOnly: string;
  paidOnly: string;
  freeTrialOnly: string;
  openSourceOnly: string;
  sortBy: string;
  sortPopular: string;
  sortRating: string;
  sortNewest: string;
  sortAlphabetical: string;
  filterArabicSupport: string;
  onlyFavoritesFilter: string;
  resultsCount: string;
  clearFilters: string;
  gridView: string;
  listView: string;

  // Tool Card & Details
  rating: string;
  pricing: string;
  visitWebsite: string;
  viewDetails: string;
  featuredBadge: string;
  popularBadge: string;
  arabicSupportedBadge: string;
  alternativeToLabel: string;
  authenticReviews: string;
  yourRatingBadge: string;
  rateOutOfFive: string;
  clickToRate: string;
  copyLink: string;
  linkCopied: string;
  shareTool: string;
  shareSuccessNotification: string;
  removeFromFavorites: string;
  addToFavorites: string;
  exploreAllToolsBtn: string;
  showingToolsCount: string;
  showFewerToolsBtn: string;

  // Tool Detail Modal Sections
  whatIsTool: string;
  keyFeatures: string;
  targetAudience: string;
  mainUseCases: string;
  prosAndCons: string;
  pros: string;
  cons: string;
  pricingModel: string;
  supportedPlatforms: string;
  personalNotesTitle: string;
  personalNotesPlaceholder: string;
  saveNoteBtn: string;
  noteSavedToast: string;
  alternativesTitle: string;
  relatedToolsTitle: string;
  promptsForToolBtn: string;
  closeBtn: string;

  // Value Proposition
  platformStandardsTitle: string;
  platformStandardsSubtitle: string;
  standardLocal: string;
  standardLocalDesc: string;
  standardUnbiased: string;
  standardUnbiasedDesc: string;
  standardAcademic: string;
  standardAcademicDesc: string;
  standardInstant: string;
  standardInstantDesc: string;

  // Knowledge Hub
  knowledgeCenter: string;
  knowledgeCenterDesc: string;
  searchArticles: string;
  tableOfContents: string;
  relatedArticles: string;
  needToolNow: string;
  lastUpdated: string;
  minRead: string;
  readArticleBtn: string;
  backToKnowledgeHub: string;
  writtenBy: string;

  // Empty State & Errors
  pageNotFoundTitle: string;
  pageNotFoundHeading: string;
  pageNotFoundDesc: string;
  backToHome: string;
  browseCatalog: string;
  noToolsFound: string;
  noToolsFoundDesc: string;
  resetFilters: string;
  academicSuite: string;
  aiAlternatives: string;

  // Footer
  quickLinksTitle: string;
  topCategoriesTitle: string;
  moreCategoriesTitle: string;
  officialLinksTitle: string;
  copyrightNotice: string;
  allRightsReserved: string;
  continuousUpdateBadge: string;
  brandBio: string;
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
    privacyPolicy: 'سياسة الخصوصية',
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

    toolsCountLabel: 'الأدوات:',
    categoriesCountLabel: 'التصنيفات:',
    freeOrFreemiumLabel: 'مجانية / فريميوم:',
    officialDomainLabel: 'الموقع الرسمي:',
    lightModeTitle: 'التبديل إلى الوضع الفاتح',
    darkModeTitle: 'التبديل إلى الوضع الداكن',
    changeLanguageTitle: 'تغيير اللغة',

    heroBadge: 'دليل أدوات الذكاء الاصطناعي العربي 2026',
    heroTitleHighlight: 'أفضل أدوات الذكاء الاصطناعي',
    heroTitleRest: 'في مكان واحد لاحتياجاتك اليومية والمهنية',
    heroSubtitle: 'دليل منظم ومحدث باستمرار لاكتشاف أدوات الذكاء الاصطناعي التوليدي، معالجة النصوص، الصور، البرمجة والإنتاجية بأعلى موثوقية.',
    trendingSearches: 'عمليات البحث الشائعة:',
    arabicSupportBadge: 'دعم اللغة العربية',
    suggestedKeyword: 'اقتراح:',
    didYouMean: 'هل تقصد:',
    openSmartFinderHero: 'المستكشف الذكي لاختيار الأداة',
    promptsLibraryHero: 'تصفح مكتبة الأوامر (Prompts)',

    browseByCategoryTitle: 'استكشف الأدوات حسب التصنيف',
    browseByCategorySubtitle: 'تصفح تشكيلة واسعة من التصنيفات الدقيقة والمخصصة لكل تخصص ومجال',
    viewAllCategories: 'عرض جميع التصنيفات',
    viewFewerCategories: 'عرض تصنيفات أقل',
    toolSingular: 'أداة',
    toolPlural: 'أدوات',

    allPricing: 'جميع الأسعار',
    freeOnly: 'مجاني 100%',
    freemiumOnly: 'مجاني جزئياً (Freemium)',
    paidOnly: 'مدفوع فقط',
    freeTrialOnly: 'تجربة مجانية',
    openSourceOnly: 'مفتوح المصدر',
    sortBy: 'ترتيب حسب:',
    sortPopular: 'الأكثر شعبية',
    sortRating: 'الأعلى تقييماً',
    sortNewest: 'الأحدث إضافة',
    sortAlphabetical: 'أبجدياً (A-Z)',
    filterArabicSupport: 'يدعم العربية فقط',
    onlyFavoritesFilter: 'المفضلة فقط',
    resultsCount: 'النتائج:',
    clearFilters: 'إعادة ضبط الفلاتر',
    gridView: 'عرض شبكي',
    listView: 'عرض قائمة',

    rating: 'التقييم',
    pricing: 'الأسعار',
    visitWebsite: 'زيارة الموقع الرسمي',
    viewDetails: 'عرض التفاصيل',
    featuredBadge: 'أداة مميزة',
    popularBadge: 'شعبية عالية',
    arabicSupportedBadge: 'عربي',
    alternativeToLabel: 'بديل لـ:',
    authenticReviews: 'تقييم حقيقي',
    yourRatingBadge: '(تقييمك)',
    rateOutOfFive: 'تقييم من 5 نجوم',
    clickToRate: 'انقر للتقييم',
    copyLink: 'نسخ الرابط',
    linkCopied: 'تم نسخ الرابط بنجاح',
    shareTool: 'مشاركة الأداة',
    shareSuccessNotification: 'تم نسخ الرابط لمشاركته بنجاح!',
    removeFromFavorites: 'إزالة من المفضلة',
    addToFavorites: 'إضافة للمفضلة',
    exploreAllToolsBtn: 'استكشاف جميع الأدوات',
    showingToolsCount: 'يتم عرض',
    showFewerToolsBtn: 'عرض عدد أقل من الأدوات',

    whatIsTool: 'ما هي الأداة وما المشكلة التي تحلها؟',
    keyFeatures: 'أبرز المميزات والخصائص (Key Features)',
    targetAudience: 'لمن هذه الأداة؟ (الفئات المستفيدة)',
    mainUseCases: 'أبرز حالات الاستخدام والتطبيقات العملية',
    prosAndCons: 'المميزات والسلبيات (Pros & Cons)',
    pros: 'أبرز المميزات ونقاط القوة',
    cons: 'المحددات والملاحظات',
    pricingModel: 'تفاصيل الأسعار ونموذج الاشتراك',
    supportedPlatforms: 'المنصات وأنظمة التشغيل المدعومة',
    personalNotesTitle: 'ملاحظاتك الشخصية الخاصة عن هذه الأداة',
    personalNotesPlaceholder: 'اكتب ملاحظاتك الخاصة هنا... (تحفظ تلقائياً في جهازك ولا يراها أحد سواك)',
    saveNoteBtn: 'حفظ الملاحظة',
    noteSavedToast: 'تم حفظ ملاحظاتك بنجاح!',
    alternativesTitle: 'أفضل بدائل الأداة المتاحة',
    relatedToolsTitle: 'أدوات ذات صلة في نفس التصنيف',
    promptsForToolBtn: 'توليد أوامر برومبت لهذه الأداة',
    closeBtn: 'إغلاق',

    platformStandardsTitle: 'معايير منصة أدواتي AI للموثوقية والجودة',
    platformStandardsSubtitle: 'نلتزم بأعلى معايير الحياد والتحقق المستمر لتقديم تجربة اكتشاف موثوقة وآمنة',
    standardLocal: 'معالجة محلية وسرية تامة',
    standardLocalDesc: 'أدواتنا الرقمية المباشرة تعالج الملفات محلياً داخل متصفحك دون رفعها إلى أي خوادم خارجية للحفاظ على خصوصيتك.',
    standardUnbiased: 'تقييمات محايدة ومستمرة',
    standardUnbiasedDesc: 'فريقنا يفحص كل أداة للتأكد من استقرارها، تسعيرها الحقيقي، ودعمها للمستخدمين قبل إدراجها.',
    standardAcademic: 'حقيبة الطلبة والباحثين',
    standardAcademicDesc: 'تصنيف مخصص للجامعيين والأساتذة للوصول إلى أدوات البحث الأكاديمي، التلخيص، وصياغة المراجع الموثوقة.',
    standardInstant: 'وصول فوري ومجاني',
    standardInstantDesc: 'تصفح كل الأدوات، واقرأ المراجعات، واكتشف البدائل المجانية بدون الحاجة إلى إنشاء حساب أو اشتراك مسبق.',

    knowledgeCenter: 'مركز المعرفة',
    knowledgeCenterDesc: 'مقالات وأدلة وشروحات تقنية شاملة لاحتراف أدوات الذكاء الاصطناعي ومعالجة الملفات والإنتاجية',
    searchArticles: 'ابحث في مقالات وشروحات مركز المعرفة...',
    tableOfContents: 'فهرس المحتويات',
    relatedArticles: 'مقالات وشروحات ذات صلة',
    needToolNow: 'هل تحتاج الأداة الآن؟',
    lastUpdated: 'آخر تحديث',
    minRead: 'دقائق قراءة',
    readArticleBtn: 'قراءة المقال بالكامل',
    backToKnowledgeHub: 'العودة لمركز المعرفة',
    writtenBy: 'بقلم فريق:',

    pageNotFoundTitle: '404 - الصفحة غير موجودة | أدواتي AI',
    pageNotFoundHeading: 'عذراً، لم نتمكن من العثور على الأداة أو الصفحة المطلوبة',
    pageNotFoundDesc: 'الصفحة أو الأداة التي تحاول الوصول إليها قد تم نقلها أو تعديل اسمها أو أنها غير متوفرة حالياً في الدليل.',
    backToHome: 'العودة للرئيسية',
    browseCatalog: 'استعراض كل الأدوات',
    noToolsFound: 'لم يتم العثور على أدوات مطابقة',
    noToolsFoundDesc: 'جرّب تغيير كلمات البحث، أو إزالة بعض الفلاتر المفعلة، أو اقترح إضافة هذه الأداة إلى المنصة.',
    resetFilters: 'إعادة ضبط الفلاتر',
    academicSuite: 'حقيبة الطلبة والأساتذة',
    aiAlternatives: 'منصة البدائل 2026',

    quickLinksTitle: 'روابط سريعة',
    topCategoriesTitle: 'أبرز التصنيفات',
    moreCategoriesTitle: 'أقسام أخرى',
    officialLinksTitle: 'روابط المنصة الرسمية',
    copyrightNotice: 'جميع الحقوق محفوظة.',
    allRightsReserved: 'المرجع العربي الشامل لاكتشاف وتصنيف ومراجعة أفضل أدوات الذكاء الاصطناعي.',
    continuousUpdateBadge: 'تحديث مستمر 2026 • adawatai.online',
    brandBio: 'المنصة العربية المفتوحة لاكتشاف وتصنيف ومراجعة أفضل حلول ونماذج الذكاء الاصطناعي التوليدي عالمياً لمساعدة المبدعين والشركات.'
  },
  en: {
    siteName: 'Adawatai AI',
    siteTitle: 'Adawatai AI | Comprehensive AI Tools Discovery Directory - adawatai.online',
    siteDescription: 'The comprehensive directory to discover, filter, and review the best artificial intelligence tools for writing, coding, image creation, and productivity.',
    vipBadge: 'VIP 2026',
    headerTagline: 'The premier directory to discover and evaluate the best AI tools worldwide',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    privacyPolicy: 'Privacy Policy',
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

    toolsCountLabel: 'Tools:',
    categoriesCountLabel: 'Categories:',
    freeOrFreemiumLabel: 'Free / Freemium:',
    officialDomainLabel: 'Official Site:',
    lightModeTitle: 'Switch to Light Mode',
    darkModeTitle: 'Switch to Dark Mode',
    changeLanguageTitle: 'Change Language',

    heroBadge: 'Global AI Tools Directory 2026',
    heroTitleHighlight: 'Discover Top AI Tools',
    heroTitleRest: 'Curated for your daily and professional workflows',
    heroSubtitle: 'A structured, continuously updated directory to explore generative AI, document processing, image creation, coding, and productivity tools.',
    trendingSearches: 'Trending Searches:',
    arabicSupportBadge: 'Arabic Support',
    suggestedKeyword: 'Suggestion:',
    didYouMean: 'Did you mean:',
    openSmartFinderHero: 'Smart Tool Matcher Assistant',
    promptsLibraryHero: 'Browse Prompts & Commands Library',

    browseByCategoryTitle: 'Browse AI Tools by Category',
    browseByCategorySubtitle: 'Explore a rich assortment of meticulously curated categories tailored to each discipline and industry',
    viewAllCategories: 'View All Categories',
    viewFewerCategories: 'View Fewer Categories',
    toolSingular: 'tool',
    toolPlural: 'tools',

    allPricing: 'All Pricing Plans',
    freeOnly: '100% Free',
    freemiumOnly: 'Freemium',
    paidOnly: 'Paid Only',
    freeTrialOnly: 'Free Trial',
    openSourceOnly: 'Open Source',
    sortBy: 'Sort By:',
    sortPopular: 'Most Popular',
    sortRating: 'Highest Rated',
    sortNewest: 'Recently Added',
    sortAlphabetical: 'Alphabetical (A-Z)',
    filterArabicSupport: 'Arabic Support Only',
    onlyFavoritesFilter: 'Favorites Only',
    resultsCount: 'Results:',
    clearFilters: 'Reset Filters',
    gridView: 'Grid View',
    listView: 'List View',

    rating: 'Rating',
    pricing: 'Pricing',
    visitWebsite: 'Visit Official Website',
    viewDetails: 'View Details',
    featuredBadge: 'Featured',
    popularBadge: 'Popular',
    arabicSupportedBadge: 'Arabic',
    alternativeToLabel: 'Alternative to:',
    authenticReviews: 'authentic reviews',
    yourRatingBadge: '(Your rating)',
    rateOutOfFive: 'Rating out of 5 stars',
    clickToRate: 'Click to rate',
    copyLink: 'Copy Link',
    linkCopied: 'Link copied successfully',
    shareTool: 'Share Tool',
    shareSuccessNotification: 'Tool link copied to clipboard successfully!',
    removeFromFavorites: 'Remove from Favorites',
    addToFavorites: 'Add to Favorites',
    exploreAllToolsBtn: 'Explore All Tools',
    showingToolsCount: 'Showing',
    showFewerToolsBtn: 'Show Fewer Tools',

    whatIsTool: 'What is this tool and what problem does it solve?',
    keyFeatures: 'Key Features & Capabilities',
    targetAudience: 'Who is this tool for? (Target Audience)',
    mainUseCases: 'Main Use Cases & Applications',
    prosAndCons: 'Pros & Cons',
    pros: 'Key Strengths & Pros',
    cons: 'Limitations & Cons',
    pricingModel: 'Pricing Model & Plans',
    supportedPlatforms: 'Supported Platforms & Operating Systems',
    personalNotesTitle: 'Your Private Notes for this Tool',
    personalNotesPlaceholder: 'Write your private notes here... (saved locally on your device only)',
    saveNoteBtn: 'Save Note',
    noteSavedToast: 'Your notes have been saved successfully!',
    alternativesTitle: 'Best AI Alternatives',
    relatedToolsTitle: 'Related Tools in Same Category',
    promptsForToolBtn: 'Generate Prompts for this Tool',
    closeBtn: 'Close',

    platformStandardsTitle: 'Adawatai AI Quality & Reliability Standards',
    platformStandardsSubtitle: 'We adhere to the highest standards of neutrality and verification to deliver a secure, trustworthy discovery experience.',
    standardLocal: 'Private & Local Processing',
    standardLocalDesc: 'Our built-in digital utility tools process files directly inside your browser without uploading to any remote servers, safeguarding your privacy.',
    standardUnbiased: 'Unbiased & Continuous Reviews',
    standardUnbiasedDesc: 'Our editorial team verifies every tool for stability, genuine pricing models, and ongoing feature reliability before cataloging.',
    standardAcademic: 'Academic & Scholar Suite',
    standardAcademicDesc: 'A dedicated category for university students, educators, and scholars to quickly access citation, research summarization, and paper writing tools.',
    standardInstant: 'Instant & Free Access',
    standardInstantDesc: 'Browse all tools, read comprehensive breakdowns, and discover free alternatives with zero required registration or pre-commitments.',

    knowledgeCenter: 'Knowledge Center',
    knowledgeCenterDesc: 'In-depth articles, tutorials, and practical guides to master AI tools, PDF processing, and productivity workflows',
    searchArticles: 'Search Knowledge Center articles and guides...',
    tableOfContents: 'Table of Contents',
    relatedArticles: 'Related Articles & Guides',
    needToolNow: 'Need the tool right now?',
    lastUpdated: 'Last updated',
    minRead: 'min read',
    readArticleBtn: 'Read Complete Guide',
    backToKnowledgeHub: 'Back to Knowledge Center',
    writtenBy: 'Written by team:',

    pageNotFoundTitle: '404 - Page Not Found | Adawatai AI',
    pageNotFoundHeading: 'Oops! The requested tool or page was not found',
    pageNotFoundDesc: 'The page or tool you are looking for might have been moved, renamed, or is currently unavailable in the catalog.',
    backToHome: 'Back to Homepage',
    browseCatalog: 'Browse All AI Tools',
    noToolsFound: 'No matching tools found',
    noToolsFoundDesc: 'Try adjusting your search terms, clearing some filters, or suggest this tool for inclusion.',
    resetFilters: 'Reset Filters',
    academicSuite: 'Academic & Scholar Suite',
    aiAlternatives: 'AI Alternatives 2026',

    quickLinksTitle: 'Quick Links',
    topCategoriesTitle: 'Top Categories',
    moreCategoriesTitle: 'More Categories',
    officialLinksTitle: 'Official Platform Links',
    copyrightNotice: 'All rights reserved.',
    allRightsReserved: 'Comprehensive discovery directory for premier artificial intelligence applications worldwide.',
    continuousUpdateBadge: 'Continuously Updated 2026 • adawatai.online',
    brandBio: 'The open directory to discover, filter, and review the best generative AI tools worldwide, empowering creators, developers, and businesses.'
  }
};

export const detectInitialLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') return 'ar';

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang')?.toLowerCase();

    if (langParam === 'en' || langParam === 'ar') {
      return langParam as SupportedLanguage;
    }

    const savedLang = localStorage.getItem('adawatai_lang') || localStorage.getItem('ai_directory_lang');
    if (savedLang === 'en' || savedLang === 'ar') {
      return savedLang as SupportedLanguage;
    }

    // Check browser language
    const browserLang = (navigator.language || (navigator as any).userLanguage || '').toLowerCase();
    if (browserLang.startsWith('en')) {
      return 'en';
    }
  } catch (e) {}

  return 'ar';
};

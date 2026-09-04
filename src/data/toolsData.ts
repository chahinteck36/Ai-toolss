import { AiTool, Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'all',
    nameAr: 'جميع الأدوات',
    nameEn: 'All Tools',
    iconName: 'LayoutGrid',
    descriptionAr: 'استعرض كافة أدوات وتطبيقات الذكاء الاصطناعي',
    color: 'from-slate-600 to-slate-800'
  },
  {
    id: 'ai_alternatives',
    nameAr: 'منصة البدائل 2026',
    nameEn: 'AI Alternatives Hub',
    iconName: 'Sparkles',
    descriptionAr: 'أقوى بدائل ChatGPT وMidjourney وCopilot المجانية والمفتوحة',
    color: 'from-purple-600 to-indigo-700'
  },
  {
    id: 'academic_scholar',
    nameAr: 'حقيبة الطلبة والأساتذة',
    nameEn: 'Academic & Scholar Suite',
    iconName: 'GraduationCap',
    descriptionAr: 'أدوات البحث العلمي، إدارة مراجع APA، وتلخيص الأوراق العلمية والرياضيات',
    color: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'chatbots',
    nameAr: 'روبوتات المحادثة والمساعدين',
    nameEn: 'Chatbots & Assistants',
    iconName: 'Bot',
    descriptionAr: 'نماذج المحادثة الذكية والمساعدين الشخصيين',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'text_writing',
    nameAr: 'الكتابة وصناعة المحتوى',
    nameEn: 'Text & Content Writing',
    iconName: 'PenTool',
    descriptionAr: 'تأليف المقالات، صياغة الإيميلات، والتدقيق اللغوي',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'image_generation',
    nameAr: 'توليد وتعديل الصور',
    nameEn: 'Image Generation & Editing',
    iconName: 'Image',
    descriptionAr: 'رسم الصور الفنية، تعديل الصور، وإزالة الخلفيات',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'video_generation',
    nameAr: 'صناعة وتعديل الفيديو',
    nameEn: 'Video Generation & Editing',
    iconName: 'Video',
    descriptionAr: 'توليد الفيديو من نصوص وتعديل ومونتاج الفيديو بالذكاء الاصطناعي',
    color: 'from-rose-500 to-red-600'
  },
  {
    id: 'coding_dev',
    nameAr: 'البرمجة والتطوير',
    nameEn: 'Coding & Developers',
    iconName: 'Code2',
    descriptionAr: 'مساعدو كتابة الأكواد، فحص الأخطاء وتطوير البرمجيات',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'audio_music',
    nameAr: 'الصوت والموسيقى والتعليق',
    nameEn: 'Audio & Music',
    iconName: 'Headphones',
    descriptionAr: 'تحويل النص إلى صوت، استنساخ الأصوات، وصناعة الموسيقى',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'productivity',
    nameAr: 'الإنتاجية وإدارة الأعمال',
    nameEn: 'Productivity & Workflow',
    iconName: 'Sparkles',
    descriptionAr: 'تنظيم المهام، إنشاء العروض التقديمية، وتلخيص الاجتماعات',
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 'search_research',
    nameAr: 'البحث والتحليل الأكاديمي',
    nameEn: 'Search & Research',
    iconName: 'Search',
    descriptionAr: 'محركات بحث مدعومة بالذكاء الاصطناعي وتلخيص الأوراق البحثية',
    color: 'from-sky-500 to-indigo-600'
  },
  {
    id: 'design_ui',
    nameAr: 'التصميم وواجهات المستخدم',
    nameEn: 'UI/UX & Design',
    iconName: 'Palette',
    descriptionAr: 'توليد واجهات المستخدم وتصاميم السوشيال ميديا',
    color: 'from-fuchsia-500 to-pink-600'
  },
  {
    id: 'translation',
    nameAr: 'الترجمة واللغات',
    nameEn: 'Translation & Localization',
    iconName: 'Languages',
    descriptionAr: 'ترجمة فورية احترافية ودبلجة بالذكاء الاصطناعي',
    color: 'from-lime-600 to-emerald-600'
  },
  {
    id: 'education',
    nameAr: 'التعليم والتدريب',
    nameEn: 'Education & Learning',
    iconName: 'GraduationCap',
    descriptionAr: 'شرح الدروس وحل المسائل وإنشاء اختبارات تفاعلية',
    color: 'from-yellow-500 to-amber-600'
  }
];

export const INITIAL_TOOLS: AiTool[] = [
  {
    id: 'chatgpt',
    nameAr: 'شات جي بي تي',
    nameEn: 'ChatGPT',
    taglineAr: 'روبوت المحادثة الأشهر عالمياً من OpenAI للمحادثات وتحليل البيانات',
    descriptionAr: 'نموذج محادثة ذكي متطور يقدم إجابات دقيقة عن مختلف المواضيع، كتابة النصوص، كتابة الأكواد، وتحليل المستندات والصور، مع دعم واسع للغة العربية.',
    category: 'chatbots',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'خطة مجانية بنموذج GPT-4o mini، واشتراك Plus بسعر 20 دولار شهرياً للوصول الكامل لأحدث النماذج وإنشاء الصور.',
    websiteUrl: 'https://chat.openai.com',
    rating: 4.9,
    reviewsCount: 1420,
    tags: ['محادثة', 'GPT-4o', 'توليد نصوص', 'تحليل ملفات', 'OpenAI'],
    isPopular: true,
    isFeatured: true,
    supportsArabic: true,
    platforms: ['ويب', 'iOS', 'Android', 'macOS', 'Windows'],
    pros: [
      'فهم استثنائي للغة العربية واللهجات المختلفة',
      'إمكانية رفع الملفات والصور والرسوم البيانية لتحليلها',
      'تكامل مع متجر مخصص للمساعدين (GPTs Store)'
    ],
    cons: [
      'قد تفرض النسخة المجانية حدوداً على الاستخدام في أوقات الذروة'
    ],
    useCases: [
      'كتابة المقالات والرسائل الرسمية وتعديلها',
      'مساعدة البرمجة وتصحيح أخطاء الأكواد البرمجية',
      'تلخيص الملفات والكتب واستخراج النقاط الرئيسية'
    ],
    addedDate: '2024-01-15',
    gradient: 'from-emerald-500 to-teal-700',
    iconBg: 'bg-emerald-50 text-emerald-600'
  },
  {
    id: 'claude',
    nameAr: 'كلود',
    nameEn: 'Claude (Anthropic)',
    taglineAr: 'مساعد ذكي فائق الدقة في معالجة النصوص الطويلة والبرمجة',
    descriptionAr: 'من أقوى نماذج الذكاء الاصطناعي التوليدي من شركة Anthropic، يتميز بقدرته الهائلة على تحليل المستندات الضخمة بكفاءة وأسلوب كتابة طبيعي جداً.',
    category: 'chatbots',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'استخدام مجاني يومي بنموذج Sonnet، وخطة Pro بسعر 20 دولار شهرياً للحصول على أولوية الاستخدام وسعة نافذة سياق أوسع.',
    websiteUrl: 'https://claude.ai',
    rating: 4.9,
    reviewsCount: 980,
    tags: ['تحليل مستندات', 'برمجة دقيقة', 'كتابة محتوى', 'Anthropic'],
    isPopular: true,
    isFeatured: true,
    supportsArabic: true,
    platforms: ['ويب', 'iOS', 'Android'],
    pros: [
      'قدرات متفوقة جداً في البرمجة والمنطق الرياضي',
      'نافذة سياق ضخمة تصل لأكثر من 200,000 توكن للمستندات',
      'أسلوب كتابة إنساني وموضوعي بدون مبالغة'
    ],
    cons: [
      'لا يدعم توليد الصور المباشر داخل واجهة المحادثة'
    ],
    useCases: [
      'قراءة الكتب والأبحاث الطويلة وتلخيصها واستخراج الاستنتاجات',
      'مراجعة بنية المشاريع البرمجية وتطوير الدوال المعقدة'
    ],
    addedDate: '2024-02-01',
    gradient: 'from-amber-600 to-orange-700',
    iconBg: 'bg-amber-50 text-amber-700'
  },
  {
    id: 'gemini',
    nameAr: 'جيميناي من جوجل',
    nameEn: 'Google Gemini',
    taglineAr: 'مساعد جوجل الذكي المتعدد الوسائط المتكامل مع خدمات Google',
    descriptionAr: 'نموذج ذكاء اصطناعي فائق من Google يجمع بين فهم النصوص، الصور، الفيديو، والصوت مع ربط مباشر ومحدث بالإنترنت وتطبيقات جوجل كالبريد والمستندات.',
    category: 'chatbots',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'مجاني للاستخدام العام، مع خطة Gemini Advanced ضمن باقة Google One AI Premium.',
    websiteUrl: 'https://gemini.google.com',
    rating: 4.8,
    reviewsCount: 1100,
    tags: ['Google', 'متعدد الوسائط', 'بحث مباشر', 'مستندات', 'يوتيوب'],
    isPopular: true,
    isFeatured: true,
    supportsArabic: true,
    platforms: ['ويب', 'Android', 'iOS'],
    pros: [
      'تكامل فوري وسلس مع Gmail، Google Docs و Google Drive',
      'إمكانية تلخيص مقاطع يوتيوب الطويلة مباشرة من الرابط',
      'دعم ممتاز وسلس للغة العربية'
    ],
    cons: [
      'قد يحتاج تدقيق إضافي في الأسئلة البرمجية المتخصصة'
    ],
    useCases: [
      'البحث عن أحدث المعلومات على الويب ببيانات آنية',
      'تلخيص مقاطع اليوتيوب وقراءة مستندات جوجل درايف'
    ],
    addedDate: '2024-01-20',
    gradient: 'from-blue-600 to-indigo-800',
    iconBg: 'bg-blue-50 text-blue-600'
  },
  {
    id: 'deepseek',
    nameAr: 'ديب سيك',
    nameEn: 'DeepSeek',
    taglineAr: 'نموذج استدلال وبرمجة فائق القوة ومفتوح المصدر',
    descriptionAr: 'منصة ذكاء اصطناعي رائدة حققت ثورة في كفاءة التفكير المنطقي وكتابة الأكواد والرياضيات مع توفير وصول مجاني ونماذج مفتوحة المصدر عالية الأداء.',
    category: 'coding_dev',
    pricing: 'open_source',
    pricingAr: 'مفتوح المصدر / مجاني',
    pricingDetailsAr: 'مجاني تماماً للاستخدام على الويب والتطبيق، وأسعار API هي الأرخص عالمياً.',
    websiteUrl: 'https://chat.deepseek.com',
    rating: 4.9,
    reviewsCount: 890,
    tags: ['استدلال عميق R1', 'برمجة', 'مفتوح المصدر', 'رياضيات'],
    isPopular: true,
    isFeatured: true,
    supportsArabic: true,
    platforms: ['ويب', 'iOS', 'Android', 'API'],
    pros: [
      'نموذج استدلال وتفكير منطقي مذهل (DeepSeek-R1)',
      'كفاءة خارقة في كتابة وتحليل الأكواد البرمجية',
      'متاح مجاناً ونماذجه مفتوحة للتحميل والتطوير المحلي'
    ],
    cons: [
      'قد يواجه ضغطاً في الخوادم بسبب الإقبال العالمي الضخم'
    ],
    useCases: [
      'حل المسائل البرمجية والرياضية المعقدة خطوة بخطوة',
      'بناء الأنظمة البرمجية وتوليد الخوارزميات'
    ],
    addedDate: '2024-03-01',
    gradient: 'from-blue-500 to-cyan-700',
    iconBg: 'bg-cyan-50 text-cyan-700'
  },
  {
    id: 'midjourney',
    nameAr: 'ميدجورني',
    nameEn: 'Midjourney',
    taglineAr: 'الأداة الرائدة عالمياً في توليد الصور الفنية والواقعية الخارقة',
    descriptionAr: 'منصة تحويل النص إلى صور بجودة سينمائية فائقة وتفاصيل بصرية مذهلة، تعد المعيار الذهبي للمصممين والفنانين الرقميين وصناع الأفلام.',
    category: 'image_generation',
    pricing: 'paid',
    pricingAr: 'مدفوع (اشتراك)',
    pricingDetailsAr: 'تبدأ الاشتراكات من 10 دولارات شهرياً للخطة الأساسية حتى 60 دولار للخطة المتقدمة.',
    websiteUrl: 'https://www.midjourney.com',
    rating: 4.9,
    reviewsCount: 1650,
    tags: ['توليد صور', 'فن رقمي', 'سينمائي', 'تصميم جرافيك'],
    isPopular: true,
    isFeatured: true,
    supportsArabic: false,
    platforms: ['ويب', 'Discord'],
    pros: [
      'جودة صور سينمائية لا تضاهى ودقة تفاصيل استثنائية',
      'تحكم دقيق بالأنماط الفنية وزوايا الإضاءة والكاميرا',
      'واجهة ويب حديثة وسهلة الاستخدام'
    ],
    cons: [
      'لا توجد خطة مجانية دائمة',
      'يفضل استخدام الأوامر (Prompts) باللغة الإنجليزية للحصول على أفضل دقة'
    ],
    useCases: [
      'تصميم الأغلفة والبوسترات والشخصيات الفنية',
      'إنشاء لوحات المزاج والتصاميم المعمارية والسينمائية'
    ],
    addedDate: '2024-01-10',
    gradient: 'from-purple-600 to-indigo-900',
    iconBg: 'bg-purple-50 text-purple-700'
  },
  {
    id: 'leonardo-ai',
    nameAr: 'ليوناردو للذكاء الاصطناعي',
    nameEn: 'Leonardo.Ai',
    taglineAr: 'منصة متكاملة لتوليد الصور والشخصيات وتعديلها مع نقاط يومية مجانية',
    descriptionAr: 'منصة تصميم ذكية شاملة تمنح المستخدمين نقاطاً يومية مجانية لتوليد الصور، تدريب نماذج مخصصة، وإعادة الرسم والتعديل الاحترافي.',
    category: 'image_generation',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'تجديد 150 نقطة مجانية يومياً، مع خطط مدفوعة تبدأ من 10 دولارات للسرعة والميزات المتقدمة.',
    websiteUrl: 'https://leonardo.ai',
    rating: 4.8,
    reviewsCount: 740,
    tags: ['صور مجانية', 'شخصيات ألعاب', 'تعديل الصور', 'Canva'],
    isPopular: true,
    supportsArabic: true,
    platforms: ['ويب', 'iOS'],
    pros: [
      '150 رصيد مجاني يتجدد يومياً بدون بطاقة ائتمان',
      'أدوات تحكم رائعة مثل Canvas Editor و Realtime Gen',
      'سهولة تعديل الصور وتوليد شخصيات متناسقة'
    ],
    cons: [
      'الميزات المتقدمة مثل النماذج فائقة الدقة تتطلب اشتراكاً'
    ],
    useCases: [
      'تصميم أصول وشخصيات الألعاب والمواقع',
      'توليد صور إعلانية لمنتجات التجارة الإلكترونية'
    ],
    addedDate: '2024-01-25',
    gradient: 'from-fuchsia-600 to-pink-700',
    iconBg: 'bg-fuchsia-50 text-fuchsia-700'
  },
  {
    id: 'runway-gen3',
    nameAr: 'رانواي جين-3',
    nameEn: 'Runway Gen-3 Alpha',
    taglineAr: 'توليد مقاطع فيديو سينمائية مذهلة من النصوص والصور',
    descriptionAr: 'واحدة من أقوى منصات توليد ومونتاج الفيديو بالذكاء الاصطناعي، توفر تحكماً سينمائياً بحركة الكاميرا وتوليد فيديو واقعي بدقة عالية.',
    category: 'video_generation',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'رصيد مجاني مبدئي للتجربة، واشتراكات تبدأ من 12 دولار شهرياً لتوليد فيديوهات أطول وأسرع.',
    websiteUrl: 'https://runwayml.com',
    rating: 4.8,
    reviewsCount: 620,
    tags: ['فيديو سينمائي', 'تحريك الصور', 'مؤثرات بصرية', 'Runway'],
    isPopular: true,
    isFeatured: true,
    supportsArabic: false,
    platforms: ['ويب', 'iOS'],
    pros: [
      'حركة واقعية وسلسة للكاميرا والعناصر داخل الفيديو',
      'أداة Motion Brush المبتكرة للتحكم في حركة جزء محدد فقط',
      'أدوات إزالة العناصر والمونتاج الذكي المتطورة'
    ],
    cons: [
      'توليد الفيديوهات يستهلك الرصيد بسرعة'
    ],
    useCases: [
      'صناعة مقاطع إعلانية قصيرة وجذابة لمنصات التواصل',
      'تحويل الصور الثابتة إلى مقاطع فيديو متحركة عالية الجودة'
    ],
    addedDate: '2024-02-18',
    gradient: 'from-rose-600 to-pink-800',
    iconBg: 'bg-rose-50 text-rose-700'
  },
  {
    id: 'cursor-ide',
    nameAr: 'محرر كيرسور',
    nameEn: 'Cursor IDE',
    taglineAr: 'بيئة تطوير برمجية متقدمة مبنية على VS Code ومدعومة بالكامل بالذكاء الاصطناعي',
    descriptionAr: 'المحرر البرمجي الأكثر تفضيلاً لدى المطورين حالياً، يفهم بنية مشروعك بالكامل ويقوم بإنشاء الميزات وتعديل الملفات المتعددة بأمر واحد.',
    category: 'coding_dev',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'نسخة مجانية سخية، وخطة Pro بسعر 20 دولار شهرياً للوصول غير المحدود لنماذج Claude 3.5 و GPT-4o.',
    websiteUrl: 'https://www.cursor.com',
    rating: 4.9,
    reviewsCount: 1150,
    tags: ['محرر كود', 'VS Code', 'إكمال تلقائي', 'Composer', 'Agent'],
    isPopular: true,
    isFeatured: true,
    supportsArabic: true,
    platforms: ['Windows', 'macOS', 'Linux'],
    pros: [
      'ميزة Composer لتعديل عدة ملفات برمجية متصلة دفعة واحدة',
      'فهم عميق لكامل الكود البرمجي لمشروعك (@Codebase)',
      'إمكانية استيراد جميع إضافات وإعدادات VS Code بنقرة زر'
    ],
    cons: [
      'يتطلب تثبيت برنامج محلي على جهاز الكمبيوتر'
    ],
    useCases: [
      'بناء تطبيقات ومواقع كاملة من الصفر بسرعة مضاعفة',
      'فحص الأخطاء البرمجية وإصلاحها تلقائياً'
    ],
    addedDate: '2024-02-10',
    gradient: 'from-slate-800 to-indigo-950',
    iconBg: 'bg-slate-100 text-slate-900'
  },
  {
    id: 'v0-dev',
    nameAr: 'في زيرو من Vercel (توليد واجهات تفاعلية)',
    nameEn: 'v0 by Vercel',
    taglineAr: 'توليد واجهات مستخدم React ومكونات Tailwind CSS تفاعلية من الوصف الفوري',
    descriptionAr: 'أداة مبتكرة من شركة Vercel تحول الوصف النصي أو لقطات الشاشة إلى كود فرونت إند نظيف وجاهز للنسخ والتنفيذ باستخدام Next.js و React و Tailwind CSS و Shadcn UI.',
    category: 'design_ui',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'رصيد مجاني شهري كافٍ للتجارب، واشتراك Premium بسعر 20 دولار شهرياً للوصول غير المحدود.',
    websiteUrl: 'https://v0.dev',
    rating: 4.9,
    reviewsCount: 1750,
    tags: ['React', 'Tailwind CSS', 'واجهات مستخدم', 'Vercel', 'أكواد_وبرمجة', 'بديل_Figma_to_Code'],
    isAlternative: true,
    alternativeTo: ['Figma to Code', 'Locofy', 'Lovable', 'Bolt.new'],
    academicTags: ['#أكواد_وبرمجة', '#مذكرات_تخرج'],
    isPopular: true,
    isFeatured: true,
    supportsArabic: true,
    platforms: ['ويب'],
    pros: [
      'توليد كود واجهات نظيف ومرتب وقابل للتعديل الفوري متوافق 100% مع معايير Tailwind و React',
      'معاينة حية وتفاعلية للكود وتعديل العناصر بضغطة زر مباشرة في المتصفح',
      'تكامل سريع مع مشاريع Next.js و shadcn/ui وتثبيت مباشر عبر npx v0 add'
    ],
    cons: [
      'مخصص لتطوير واجهات المستخدم Front-end ويتطلب ربطاً بالباك إند'
    ],
    useCases: [
      'تصميم نماذج أولية سريعة ومشاريع تخرج للطلبة ولوحات التحكم في دقائق',
      'تحويل تصاميم الصور ولقطات الشاشة إلى كود حقيقي تفاعلي'
    ],
    addedDate: '2024-02-25',
    gradient: 'from-zinc-800 to-black',
    iconBg: 'bg-zinc-100 text-zinc-900'
  },
  {
    id: 'elevenlabs',
    nameAr: 'إليفن لابس',
    nameEn: 'ElevenLabs',
    taglineAr: 'المنصة الأقوى عالمياً لتحويل النصوص إلى صوت طبيعي واستنساخ الأصوات',
    descriptionAr: 'تقنية صوتية فائقة الواقعية تدعم اللغة العربية بلهجات متعددة، تتيح التعليق الصوتي، الدبلجة الذكية، واستنساخ صوتك بدقة مذهلة ومشاعر طبيعية.',
    category: 'audio_music',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: '10,000 حرف مجاني شهرياً، وتبدأ الباقات المدفوعة من 5 دولارات شهرياً.',
    websiteUrl: 'https://elevenlabs.io',
    rating: 4.9,
    reviewsCount: 880,
    tags: ['تحويل نص لصوت', 'دبلجة عربية', 'استنساخ صوت', 'بودكاست'],
    isPopular: true,
    isFeatured: true,
    supportsArabic: true,
    platforms: ['ويب', 'API', 'iOS', 'Android'],
    pros: [
      'أصوات ناطقة باللغة العربية طبيعية جداً وبدون نبرة آلية',
      'دبلجة الفيديوهات تلقائياً مع مزامنة حركة الشفاه',
      'مكتبة ضخمة من الأصوات المتنوعة بنبرات ومشاعر مختلفة'
    ],
    cons: [
      'استنساخ الأصوات بجودة احترافية يتطلب الباقة المدفوعة'
    ],
    useCases: [
      'التعليق الصوتي لمقاطع يوتيوب وريلز وتيك توك',
      'قراءة الكتب الصوتية والمقالات بنبرات إذاعية فخمة'
    ],
    addedDate: '2024-01-30',
    gradient: 'from-indigo-600 to-blue-700',
    iconBg: 'bg-indigo-50 text-indigo-700'
  },
  {
    id: 'suno-ai',
    nameAr: 'سونو ميوزيك (صناعة الأغاني والموسيقى المتكاملة)',
    nameEn: 'Suno AI',
    taglineAr: 'تأليف أغاني ومقطوعات موسيقية كاملة بالكلمات والألحان والصوت البشري من النص',
    descriptionAr: 'منصة ذكاء اصطناعي ثورية تمكنك من إنشاء مقطوعات وأغاني كاملة مع الغناء البشري والآلات الموسيقية بأي لغة ونمط موسيقي بمجرد كتابة الفكرة أو الكلمات، مع دعم استثنائي للغة العربية.',
    category: 'audio_music',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: '50 رصيد مجاني يومياً (تتيح إنشاء حتى 10 أغانٍ مجاناً يومياً)، واشتراك Pro بسعر 10 دولارات شهرياً.',
    websiteUrl: 'https://suno.com',
    rating: 4.9,
    reviewsCount: 2600,
    tags: ['موسيقى', 'تأليف أغاني', 'غناء', 'إنتاج صوتي', 'توليد_موسيقى', 'بديل_الاستوديو'],
    isAlternative: true,
    alternativeTo: ['Udio', 'Soundraw', 'استوديوهات التسجيل التقليدية'],
    isPopular: true,
    isFeatured: true,
    supportsArabic: true,
    platforms: ['ويب', 'iOS', 'Android'],
    pros: [
      'إنتاج أغاني كاملة بصوت بشري عالي الجودة وتوزيع موسيقي مميز ومبهر',
      'دعم رائع لتأليف وغناء كلمات باللغة العربية ومختلف اللهجات والمقامات',
      'سهولة اختيار النمط وتجديد الرصيد المجاني يومياً للمستخدمين'
    ],
    cons: [
      'الاستخدام التجاري للمقاطع يتطلب اشتراكاً مدفوعاً'
    ],
    useCases: [
      'إنتاج موسيقى تصويرية وخلفية لصناع المحتوى والبودكاست واليوتيوب',
      'صناعة أغانٍ ترويجية أو إهداءات وتجارب صوتية إبداعية مخصصة'
    ],
    addedDate: '2024-02-14',
    gradient: 'from-amber-500 to-rose-600',
    iconBg: 'bg-amber-50 text-amber-600'
  },
  {
    id: 'perplexity-ai',
    nameAr: 'بيربلكسيتي للبحث (بديل محركات البحث التقليدية)',
    nameEn: 'Perplexity AI',
    taglineAr: 'محرك بحث ذكي يقدم إجابات موثقة بالمصادر وروابط المواقع المباشرة والاستشهادات',
    descriptionAr: 'بديل محركات البحث التقليدية؛ يقوم بالبحث في الويب لحظياً، ويقرأ عشرات المصادر، ويقدم لك ملخصاً شاملاً ودقيقاً مع إدراج أرقام المصادر وروابط الاستشهاد المباشرة للاقتباس العلمي.',
    category: 'search_research',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'بحث مجاني غير محدود بنموذج Quick، مع اشتراك Pro بسعر 20 دولار للبحث المعمق واستخدام Claude و GPT-4o ورفع الملفات.',
    websiteUrl: 'https://www.perplexity.ai',
    rating: 4.9,
    reviewsCount: 1980,
    tags: ['محرك بحث', 'أبحاث موثقة', 'اقتباس مصادر', 'Pro Search', 'بدائل_ChatGPT_2026', 'بديل_Google_Search'],
    isAlternative: true,
    alternativeTo: ['Google Search', 'ChatGPT Search', 'Bing AI'],
    academicFocus: true,
    academicTags: ['#بحث_علمي_محكم', '#مذكرات_تخرج', '#توثيق_مراجع_APA'],
    isPopular: true,
    isFeatured: true,
    supportsArabic: true,
    platforms: ['ويب', 'iOS', 'Android', 'Chrome Extension'],
    pros: [
      'توثيق كل جملة بمصدرها الأصلي للتحقق من الصحة وتسهيل الاستشهاد',
      'ميزة Focus للبحث المخصص (أكاديمي، أوراق علمية، يوتيوب، ريديت، ويب)',
      'سرعة استجابة فائقة ودعم رائع للغة العربية ورفع المستندات والـ PDFs'
    ],
    cons: [
      'البحث المعمق Pro مقيد بعدد مرات يومية في النسخة المجانية'
    ],
    useCases: [
      'إجراء الأبحاث الأكاديمية ومذكرات التخرج وجمع المراجع الموثوقة فورياً',
      'متابعة الأخبار العاجلة والتحليلات السوقية ببيانات محدثة في نفس اليوم'
    ],
    addedDate: '2024-01-18',
    gradient: 'from-cyan-600 to-teal-700',
    iconBg: 'bg-cyan-50 text-cyan-600'
  },
  {
    id: 'gamma-app',
    nameAr: 'جاما للعروض والمستندات',
    nameEn: 'Gamma App',
    taglineAr: 'إنشاء عروض تقديمية (PowerPoint) ومواقع وصفحات بصرية من النص بثوانٍ',
    descriptionAr: 'منصة سحرية تصمم لك شرائح عرض تقديمية احترافية، مستندات جذابة، وصفحات ويب تفاعلية من خلال فكرة أو ملف نصي في ثوانٍ مع خيارات تخصيص واسعة.',
    category: 'productivity',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'رصيد مجاني 400 نقطة عند التسجيل، واشتراك Plus يبدأ من 8 دولارات شهرياً.',
    websiteUrl: 'https://gamma.app',
    rating: 4.8,
    reviewsCount: 820,
    tags: ['عروض تقديمية', 'بوربوينت', 'تصميم شرائح', 'مستندات بصرية'],
    isPopular: true,
    isFeatured: true,
    supportsArabic: true,
    platforms: ['ويب'],
    pros: [
      'تصاميم عصرية جذابة تفوق قوالب البوربوينت التقليدية',
      'دعم كامل وممتاز للكتابة باللغة العربية واتجاه النص',
      'تصدير العرض التقديمي بصيغة PDF أو PowerPoint بنقرة واحدة'
    ],
    cons: [
      'تصدير بدون علامة مائية يحتاج إلى خطة مدفوعة'
    ],
    useCases: [
      'إعداد عروض العمل والمشاريع المدرسية والجامعية',
      'إنشاء صفحات هبوط وملخصات بصرية للشركات'
    ],
    addedDate: '2024-02-05',
    gradient: 'from-violet-600 to-purple-800',
    iconBg: 'bg-violet-50 text-violet-700'
  },
  {
    id: 'notion-ai',
    nameAr: 'نوشن بالذكاء الاصطناعي',
    nameEn: 'Notion AI',
    taglineAr: 'مساعد كتابة وتنظيم مدمج داخل منصة إدارة المهام والملاحظات Notion',
    descriptionAr: 'يوفر مساعد Notion الذكي قدرات استثنائية لكتابة الملاحظات، تلخيص صفحات المشاريع، استخراج بنود العمل من الاجتماعات، والبحث في كامل مساحة عملك.',
    category: 'productivity',
    pricing: 'paid',
    pricingAr: 'مدفوع (إضافة)',
    pricingDetailsAr: 'تجربة مجانية محدودة، ثم إضافة بسعر 10 دولارات شهرياً لكل مستخدم.',
    websiteUrl: 'https://www.notion.so/product/ai',
    rating: 4.7,
    reviewsCount: 650,
    tags: ['إدارة مهام', 'ملاحظات', 'تلخيص اجتماعات', 'تنظيم عمل'],
    supportsArabic: true,
    platforms: ['ويب', 'macOS', 'Windows', 'iOS', 'Android'],
    pros: [
      'مدمج بشكل مباشر في مستنداتك اليومية بدون نسخ ولصق',
      'القدرة على الإجابة عن أي سؤال حول مستندات فريقك السابقة',
      'تحويل الملاحظات غير المرتبة إلى جداول ومهام منظمة'
    ],
    cons: [
      'يتطلب اشتراكاً إضافياً فوق اشتراك Notion'
    ],
    useCases: [
      'كتابة وتوثيق خطط العمل ومحاضر الاجتماعات',
      'تنظيم قواعد المعرفة للشركات وفرق العمل'
    ],
    addedDate: '2024-01-22',
    gradient: 'from-neutral-800 to-slate-900',
    iconBg: 'bg-neutral-100 text-neutral-900'
  },
  {
    id: 'canva-magic-studio',
    nameAr: 'كانفا ماجيك ستوديو',
    nameEn: 'Canva Magic Studio',
    taglineAr: 'مجموعة أدوات الذكاء الاصطناعي لتصميم البوسترات، تعديل الصور والفيديو',
    descriptionAr: 'حزمة أدوات ذكاء اصطناعي مدمجة في منصة كانفا الشهيرة تشمل: Magic Write للكتابة، Magic Media لتوليد الصور والفيديو، و Magic Eraser لإزالة العناصر.',
    category: 'design_ui',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'ميزات أساسية مجانية، مع فتح كامل الميزات ضمن Canva Pro بسعر 13 دولار شهرياً.',
    websiteUrl: 'https://www.canva.com/magic-studio/',
    rating: 4.8,
    reviewsCount: 1350,
    tags: ['تصميم سوشيال ميديا', 'إزالة خلفية', 'كانفا', 'بوسترات'],
    isPopular: true,
    isFeatured: true,
    supportsArabic: true,
    platforms: ['ويب', 'iOS', 'Android', 'Windows', 'macOS'],
    pros: [
      'سهولة استثنائية في الاستخدام لغير المصممين',
      'مكتبة قوالب عربية وخطوط ضخمة ومتنوعة',
      'أداة تفريغ الخلفيات بنقرة واحدة فائقة الدقة'
    ],
    cons: [
      'أفضل ميزات الذكاء الاصطناعي محصورة في Canva Pro'
    ],
    useCases: [
      'تصميم بوستات وتصاميم مواقع التواصل الاجتماعي',
      'إنشاء البنرات الإعلانية وبطاقات العمل بسرعة'
    ],
    addedDate: '2024-01-12',
    gradient: 'from-cyan-500 to-indigo-600',
    iconBg: 'bg-cyan-50 text-cyan-600'
  },
  {
    id: 'heygen',
    nameAr: 'هيجن لتوليد الفيديو الرمزي',
    nameEn: 'HeyGen',
    taglineAr: 'صناعة مقاطع فيديو احترافية بشخصيات رقمية ناطقة (Avatars) ودبلجة ذكية',
    descriptionAr: 'منصة رائدة تتيح إنشاء فيديوهات تقديمية بشخصيات رمزية ناطقة تتحدث بأكثر من 40 لغة بحركات شفاه دقيقة، أو استنساخ شخصيتك الحقيقية لتقديم المحتوى.',
    category: 'video_generation',
    pricing: 'free_trial',
    pricingAr: 'تجربة مجانية',
    pricingDetailsAr: 'فيديو تجريبي مجاني، وتبدأ الخطط الشهرية من 29 دولار.',
    websiteUrl: 'https://www.heygen.com',
    rating: 4.8,
    reviewsCount: 490,
    tags: ['شخصيات افتراضية', 'أفاتار ناطق', 'فيديوهات تدريبية', 'دبلجة'],
    isPopular: true,
    supportsArabic: true,
    platforms: ['ويب'],
    pros: [
      'تطابق واقعي لحركة الشفاه وتعبيرات الوجه',
      'دعم ممتاز للغة العربية واللهجات المتنوعة',
      'توفير تكاليف التصوير والاستوديوهات'
    ],
    cons: [
      'الخطط الشهرية تعتبر مرتفعة السعر للمستخدم الفردي'
    ],
    useCases: [
      'إنتاج الفيديوهات التعليمية وتدريب الموظفين',
      'صناعة الإعلانات الترويجية بدون الحاجة لكاميرا'
    ],
    addedDate: '2024-02-20',
    gradient: 'from-purple-700 to-indigo-800',
    iconBg: 'bg-purple-50 text-purple-800'
  },
  {
    id: 'github-copilot',
    nameAr: 'جيت هب كوبايلوت',
    nameEn: 'GitHub Copilot',
    taglineAr: 'المساعد البرمجي المفضل في كتابة واقتراح الأكواد أثناء التطوير',
    descriptionAr: 'أداة مساعدة من GitHub و OpenAI تقترح عليك أسطر ودوال برمجية كاملة في الوقت الفعلي أثناء كتابتك للكود داخل بيئة التطوير المفضلة لديك.',
    category: 'coding_dev',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'خطة مجانية تتضمن 2000 اقتراح شهرياً، وخطة مدفوعة بسعر 10 دولارات شهرياً للوصول غير المحدود.',
    websiteUrl: 'https://github.com/features/copilot',
    rating: 4.8,
    reviewsCount: 1280,
    tags: ['برمجة', 'GitHub', 'VS Code', 'إكمال كود'],
    isPopular: true,
    supportsArabic: false,
    platforms: ['VS Code', 'Visual Studio', 'JetBrains', 'Neovim'],
    pros: [
      'تكامل أصيل وسريع داخل برامج التطوير',
      'توفير وقت كتابة الأكواد المكررة وتوليد الاختبارات (Unit Tests)',
      'دعم معظم لغات البرمجة وأطر العمل الحديثة'
    ],
    cons: [
      'قد يقترح أحياناً مكتبات قديمة ما لم يتم توجيهه'
    ],
    useCases: [
      'تسريع وتيرة كتابة الأكواد اليومية وتوثيقها',
      'كتابة اختبارات البرمجيات والشروحات التوضيحية'
    ],
    addedDate: '2024-01-14',
    gradient: 'from-slate-700 to-slate-900',
    iconBg: 'bg-slate-100 text-slate-900'
  },
  {
    id: 'deepl-translate',
    nameAr: 'ديب إل للترجمة الاحترافية',
    nameEn: 'DeepL Translator',
    taglineAr: 'أدق محرك ترجمة ذكي في العالم مع فهم فائق للسياق اللغوي',
    descriptionAr: 'منصة ترجمة فورية تعتمد على شبكات عصبية متطورة توفر ترجمات طبيعية ودقيقة بعيدة عن الركاكة، مع دعم ترجمة المستندات والملفات بالكامل مع الحفاظ على التنسيق.',
    category: 'translation',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'استخدام مجاني لترجمة النصوص والمستندات بحد أقصى، مع باقة Pro للملفات الضخمة وحماية الخصوصية.',
    websiteUrl: 'https://www.deepl.com/translator',
    rating: 4.9,
    reviewsCount: 920,
    tags: ['ترجمة احترافية', 'ترجمة مستندات', 'دقة لغوية', 'DeepL'],
    isPopular: true,
    isFeatured: true,
    supportsArabic: true,
    platforms: ['ويب', 'Windows', 'macOS', 'iOS', 'Android', 'Chrome Extension'],
    pros: [
      'ترجمة فائقة الطبيعية تفهم المعنى الحقيقي للجمل والمصطلحات',
      'إمكانية ترجمة ملفات PDF و Word كاملة مع الحفاظ على التصميم',
      'توفير بدائل مرادفة للكلمات لتخصيص الأسلوب'
    ],
    cons: [
      'عدد اللغات المدعومة أقل مقارنة بجوجل ترانزليت'
    ],
    useCases: [
      'ترجمة المقالات والوثائق الرسمية والأكاديمية',
      'ترجمة المواقع والمحتوى التسويقي بدقة عالية'
    ],
    addedDate: '2024-01-28',
    gradient: 'from-blue-700 to-sky-900',
    iconBg: 'bg-blue-50 text-blue-800'
  },
  {
    id: 'jasper-ai',
    nameAr: 'جاسبر للتسويق وصناعة المحتوى',
    nameEn: 'Jasper AI',
    taglineAr: 'منصة متخصصة في كتابة المحتوى الإعلاني والتسويقي للشركات والمتاجر',
    descriptionAr: 'منصة كتابة محتوى مخصصة للمسوقين والشركات تساعد في صياغة الإعلانات، المقالات المتوافقة مع محركات البحث (SEO)، وحملات البريد الإلكتروني بنبرة صوت العلامة التجارية.',
    category: 'text_writing',
    pricing: 'paid',
    pricingAr: 'مدفوع (تجربة مجانية)',
    pricingDetailsAr: 'تجربة مجانية لمدة 7 أيام، وتبدأ الخطط من 39 دولار شهرياً.',
    websiteUrl: 'https://www.jasper.ai',
    rating: 4.7,
    reviewsCount: 680,
    tags: ['تسويق بالمحتوى', 'SEO', 'إعلانات', 'كتابة مقالات'],
    supportsArabic: true,
    platforms: ['ويب', 'Chrome Extension'],
    pros: [
      'أكثر من 50 قالب تسويقي متخصص (AIDA, PAS, إلخ)',
      'تحديد نبرة صوت العلامة التجارية (Brand Voice) وتطبيقها في كل النصوص',
      'تكامل مدمج مع أدوات تحسين محركات البحث مثل SurferSEO'
    ],
    cons: [
      'سعره مرتفع مقارنة بمنافسيه للاستخدام الفردي'
    ],
    useCases: [
      'كتابة نصوص إعلانات فيسبوك وجوجل الموجهة للتحويل',
      'صياغة مقالات مدونات متوافقة مع معايير السيو'
    ],
    addedDate: '2024-02-08',
    gradient: 'from-amber-600 to-rose-700',
    iconBg: 'bg-amber-50 text-amber-700'
  },
  {
    id: 'quillbot',
    nameAr: 'كويل بوت لإعادة الصياغة وفحص الانتحال',
    nameEn: 'QuillBot',
    taglineAr: 'الأداة الأشهر لإعادة الصياغة الأكاديمية الاحترافية، التدقيق النحوي، ومكافحة الانتحال والاقتباس',
    descriptionAr: 'منصة كتابة أكاديمية رائدة تساعد الطلبة والباحثين على تحسين أسلوب الكتابة، إعادة صياغة الفقرات بأساليب متعددة (Academic Mode, Formal, Simple)، فحص الانتحال والتشابه الأدبي، وتوليد الاقتباسات بنظام APA.',
    category: 'academic_scholar',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'استخدام مجاني لإعادة الصياغة، وخطة Premium بحد غير محدود وفاحص انتحال متقدم.',
    websiteUrl: 'https://quillbot.com',
    rating: 4.8,
    reviewsCount: 2300,
    tags: ['فحص_الانتحال_العلمي', 'إعادة_صياغة', 'تدقيق_لغوي', 'مذكرات_تخرج', 'أكاديمي', 'توثيق_مراجع_APA'],
    academicFocus: true,
    academicTags: ['#فحص_الانتحال_العلمي', '#مذكرات_تخرج', '#توثيق_مراجع_APA'],
    isPopular: true,
    supportsArabic: true,
    platforms: ['ويب', 'إضافة Word', 'إضافة Chrome'],
    pros: [
      'أنماط صياغة متعددة تشمل النمط الأكاديمي والرسمي والمختصر',
      'تكامل مباشر وسلس داخل برنامج Microsoft Word ومتصفح Chrome',
      'فاحص دقيق لنسبة التشابه والانتحال مقارنة بقواعد البيانات العالمية وتوليد المراجع'
    ],
    cons: [
      'النسخة المجانية تحدد عدد الكلمات لكل عملية صياغة'
    ],
    useCases: [
      'إعادة صياغة الفقرات وتجنب الوقوع في نسبة الاقتباس المرتفعة بالجامعات',
      'التدقيق الإملائي والنحوي للمقالات والأبحاث باللغة الإنجليزية والعربية'
    ],
    addedDate: '2024-01-19',
    gradient: 'from-emerald-500 to-green-700',
    iconBg: 'bg-emerald-50 text-emerald-600'
  },
  {
    id: 'phind-ai',
    nameAr: 'فايند لمحركات البحث البرمجية',
    nameEn: 'Phind AI',
    taglineAr: 'محرك بحث ذكي مخصص وموجه للمبرمجين ومهندسي البرمجيات',
    descriptionAr: 'محرك بحث يجيب مباشرة على الاستفسارات التقنية والبرمجية مع جلب أحدث حلول المشاكل من التوثيقات الرسمية ومجتمعات مثل Stack Overflow.',
    category: 'coding_dev',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'مجاني تماماً للاستخدام العادي، مع خطة Pro مدفوعة لنماذج أعلى قدرة.',
    websiteUrl: 'https://www.phind.com',
    rating: 4.8,
    reviewsCount: 420,
    tags: ['بحث برمجي', 'حل أخطاء', 'توثيق', 'Stack Overflow'],
    supportsArabic: true,
    platforms: ['ويب', 'VS Code Extension'],
    pros: [
      'إجابات برمجية تقنية مباشرة ومفصلة مع كود نظيف',
      'الربط بالتوثيقات الرسمية الحية لأطر العمل',
      'تطبيق إضافي مباشر داخل VS Code'
    ],
    cons: [
      'مخصص فقط للمجال البرمجي والتقني'
    ],
    useCases: [
      'تشخيص أخطاء الأكواد وفهم رسائل الخطأ الغامضة',
      'تعلم كيفية استخدام مكتبات وأطر عمل جديدة'
    ],
    addedDate: '2024-02-12',
    gradient: 'from-sky-700 to-indigo-900',
    iconBg: 'bg-sky-50 text-sky-800'
  },
  {
    id: 'descript',
    nameAr: 'ديسكربت للمونتاج عبر النص',
    nameEn: 'Descript',
    taglineAr: 'تعديل ومونتاج البودكاست والفيديو بسهولة مثل تعديل مستند وورد',
    descriptionAr: 'برنامج ثوري يقوم بتفريغ الصوت في الفيديو إلى نص، ويتيح لك حذف أي لقطة أو خطأ في الكلام بمجرد حذف الكلمة من النص، مع إزالة كلمات الحشو تلقائياً.',
    category: 'video_generation',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'خطة مجانية لساعة تفريغ شهرياً، وخطط مدفوعة تبدأ من 12 دولار شهرياً.',
    websiteUrl: 'https://www.descript.com',
    rating: 4.8,
    reviewsCount: 510,
    tags: ['مونتاج بودكاست', 'تفريغ صوتي', 'إزالة أخطاء الكلام', 'تعديل فيديو'],
    supportsArabic: true,
    platforms: ['macOS', 'Windows', 'ويب'],
    pros: [
      'تعديل الفيديو والصوت عبر تحرير النص المفرغ مباشرة',
      'إزالة كلمات التردد (مثل: أممم، آه) بنقرة زر واحدة',
      'ميزة Studio Sound لتحويل تسجيل الميكروفون العادي إلى جودة استوديو'
    ],
    cons: [
      'تفريغ اللهجات العربية العامية قد يحتاج لمراجعة يدوية خفيفة'
    ],
    useCases: [
      'تسجيل ومونتاج حلقات البودكاست والمقابلات',
      'قص المقاطع ونشر مقتطفات جذابة على شبكات التواصل'
    ],
    addedDate: '2024-02-16',
    gradient: 'from-indigo-600 to-purple-800',
    iconBg: 'bg-indigo-50 text-indigo-700'
  },
  {
    id: 'krea-ai',
    nameAr: 'كريا للرسم التوليدي الفوري',
    nameEn: 'Krea AI',
    taglineAr: 'توليد الصور في الوقت الفعلي أثناء الرسم وتحسين جودة الصور بالفيديو',
    descriptionAr: 'منصة إبداعية تتيح لك الرسم والتلوين ورؤية الذكاء الاصطناعي يولد الصورة في نفس اللحظة فورياً (Real-time Generation)، بالإضافة لأدوات ترقية الجودة وتوليد الفيديو.',
    category: 'image_generation',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'توليد مجاني يومي محدود، مع خطط اشتراك تبدأ من 8 دولارات شهرياً.',
    websiteUrl: 'https://www.krea.ai',
    rating: 4.7,
    reviewsCount: 380,
    tags: ['رسم فوري', 'ترقية دقة الصور', 'توليد سريع', 'فنانين'],
    isNew: true,
    supportsArabic: false,
    platforms: ['ويب'],
    pros: [
      'توليد صور فوري بدون أي انتظار أثناء الرسم المباشر',
      'أداة AI Enhancer لترقية دقة الصور القديمة وتفاصيلها بدقة 4K',
      'واجهة سلسة وممتعة جداً للمصممين'
    ],
    cons: [
      'الترقية عالية الدقة تستهلك الكثير من النقاط'
    ],
    useCases: [
      'ترقية جودة الصور الباهتة وتوضيح ملامحها',
      'العصف الذهني البصري والرسم السريع للشعارات والرسومات'
    ],
    addedDate: '2024-03-05',
    gradient: 'from-rose-500 to-amber-600',
    iconBg: 'bg-rose-50 text-rose-600'
  },
  {
    id: 'huggingface',
    nameAr: 'هانغينج فيس',
    nameEn: 'Hugging Face',
    taglineAr: 'المجتمع والمنصة الأكبر عالمياً لنماذج وأكواد الذكاء الاصطناعي مفتوحة المصدر',
    descriptionAr: 'المنصة الأساسية للمطورين والباحثين لاكتشاف وتجربة وتشغيل آلاف نماذج الذكاء الاصطناعي مفتوحة المصدر في كافة المجالات كالرؤية، الصوت، والنصوص مجاناً.',
    category: 'coding_dev',
    pricing: 'open_source',
    pricingAr: 'مفتوح المصدر / مجاني',
    pricingDetailsAr: 'مجاني للوصول للنماذج والأكواد، مع خدمات استضافة سحابية مدفوعة حسب الاستهلاك.',
    websiteUrl: 'https://huggingface.co',
    rating: 4.9,
    reviewsCount: 1400,
    tags: ['مفتوح المصدر', 'نماذج ذكاء اصطناعي', 'Spaces', 'Transformers'],
    isPopular: true,
    supportsArabic: true,
    platforms: ['ويب', 'Python', 'API'],
    pros: [
      'مستودع يضم مئات الآلاف من النماذج المدربة الجاهزة',
      'قسم Spaces لتجربة النماذج عبر تطبيقات ويب تفاعلية مجاناً',
      'أكبر مجتمع مفتوح للمطورين والباحثين في العالم'
    ],
    cons: [
      'يحتاج إلى خلفية برمجية وتقنية للاستفادة الكاملة منه'
    ],
    useCases: [
      'تحميل وتشغيل النماذج محلياً على الأجهزة الخاصة',
      'بناء واختبار تطبيقات الذكاء الاصطناعي الخاصة بالشركات'
    ],
    addedDate: '2024-01-05',
    gradient: 'from-yellow-500 to-amber-700',
    iconBg: 'bg-yellow-50 text-yellow-800'
  },
  // ==========================================
  // 🎓 حقيبة الطلبة والجامعيين والأساتذة (Academic & Scholar Suite)
  // ==========================================
  {
    id: 'zotero',
    nameAr: 'زوتيرو لإدارة وتوثيق المراجع',
    nameEn: 'Zotero',
    taglineAr: 'المساعد الأكاديمي المجاني الأول لإدارة وتنظيم المراجع وتنسيق الاقتباسات بنظام APA و MLA',
    descriptionAr: 'برنامج مفتوح المصدر ومجاني بالكامل يساعد الباحثين والطلبة والأساتذة على جمع وتنظيم وتوثيق المراجع والكتب والأوراق البحثية تلقائياً وتوليد قوائم المصادر بأنظمة التوثيق العالمية (APA, MLA, Harvard, Chicago, IEEE).',
    category: 'academic_scholar',
    pricing: 'open_source',
    pricingAr: 'مفتوح المصدر / مجاني 100%',
    pricingDetailsAr: 'مجاني تماماً للاستخدام المكتبي مع سعة تخزين سحابية مجانية للمزامنة.',
    websiteUrl: 'https://www.zotero.org',
    rating: 4.9,
    reviewsCount: 1820,
    tags: ['توثيق_مراجع_APA', 'مذكرات_تخرج', 'بحث_علمي_محكم', 'إدارة_مراجع', 'مجاني'],
    academicFocus: true,
    academicTags: ['#مذكرات_تخرج', '#توثيق_مراجع_APA', '#إدارة_المراجع', '#بحث_علمي_محكم'],
    isPopular: true,
    isFeatured: true,
    supportsArabic: true,
    platforms: ['Windows', 'macOS', 'Linux', 'iOS', 'إضافة للمتصفح'],
    pros: [
      'توليد التوثيق المرجعي بضغطة زر واحدة داخل Microsoft Word و Google Docs و LibreOffice',
      'حفظ الأوراق العلمية والكتب بضغطة زر من المتصفح مع استخراج البيانات الببليوغرافية تلقائياً',
      'دعم كامل لأنظمة التوثيق العالمية المعتمدة في الجامعات العربية (APA 7th, Harvard, Chicago)'
    ],
    cons: [
      'السعة السحابية المجانية 300MB وتكفي لآلاف المراجع النصية ولكنها قد تمتلئ مع ملفات الـ PDF الكبيرة'
    ],
    useCases: [
      'توثيق مراجع مذكرات التخرج ورسائل الماجستير والدكتوراه',
      'تنظيم مكتبة الأبحاث وتصنيفها في مجلدات وتوليد قائمة المراجع بضغطة زر'
    ],
    addedDate: '2026-01-10',
    gradient: 'from-rose-600 to-red-700',
    iconBg: 'bg-rose-50 text-rose-600'
  },
  {
    id: 'scispace',
    nameAr: 'ساي سبيس لتلخيص الأوراق العلمية',
    nameEn: 'SciSpace (Typeset)',
    taglineAr: 'المساعد الذكي لفهم الأوراق البحثية المعقدة، شرح المعادلات، واستخراج الاستنتاجات باللغة العربية',
    descriptionAr: 'منصة ثورية للطلبة والأساتذة تتيح رفع أي ورقة بحثية بصيغة PDF وطرح الأسئلة عليها بالعربية مباشرة، مع شرح وتبسيط المعادلات الرياضية والجداول والمصطلحات الصعبة وتلخيص النتائج بأسلوب أكاديمي دقيق.',
    category: 'academic_scholar',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'خطة مجانية سخية يومياً، مع خطة بريميوم بسعر مخفض للطلبة والباحثين.',
    websiteUrl: 'https://typeset.io',
    rating: 4.9,
    reviewsCount: 1450,
    tags: ['تلخيص_الأوراق_العلمية', 'مذكرات_تخرج', 'شرح_معادلات', 'بحث_علمي_محكم', 'PDF_AI'],
    academicFocus: true,
    academicTags: ['#تلخيص_الأوراق_العلمية', '#مذكرات_تخرج', '#بحث_علمي_محكم', '#شرح_المعادلات'],
    isPopular: true,
    isFeatured: true,
    supportsArabic: true,
    platforms: ['ويب', 'إضافة كروم'],
    pros: [
      'تظليل أي معادلة أو جدول بالماوس وشرحها فورياً باللغة العربية البسيطة',
      'استخراج خلاصة النتائج والمنهجية المتبعة من عشرات الأبحاث دفعة واحدة في جدول مقارنة',
      'إمكانية الاستشهاد المباشر برقم الصفحة والفقرة لضمان الدقة الأكاديمية ومكافحة التزييف'
    ],
    cons: [
      'التحليل المقارن لمئات الأوراق في وقت واحد يتطلب باقة مدفوعة'
    ],
    useCases: [
      'مراجعة الأدبيات السابقة (Literature Review) لمذكرات التخرج',
      'فهم وتفكيك المعادلات الرياضية والنظريات المعقدة في الأوراق المنشورة'
    ],
    addedDate: '2026-01-15',
    gradient: 'from-emerald-600 to-teal-800',
    iconBg: 'bg-emerald-50 text-emerald-700'
  },
  {
    id: 'overleaf',
    nameAr: 'أوفرليف لكتابة الأبحاث بـ LaTeX',
    nameEn: 'Overleaf (LaTeX)',
    taglineAr: 'المحرر السحابي التعاوني الأول لكتابة ونشر رسائل التخرج والماجستير والأوراق الأكاديمية بنظام LaTeX',
    descriptionAr: 'منصة سحابية معتمدة في كبرى الجامعات والمجلات العلمية لكتابة الأطروحات والمذكرات باللاتيك (LaTeX) دون الحاجة لتثبيت أي برامج، مع مئات القوالب الجاهزة للجامعات ومحرر تعاوني للمشرف والطالب.',
    category: 'academic_scholar',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'مجاني لمشاريع غير محدودة، وخطة مدفوعة لتاريخ التعديلات والمشاركة التعاونية المتقدمة.',
    websiteUrl: 'https://www.overleaf.com',
    rating: 4.9,
    reviewsCount: 1620,
    tags: ['كتابة_أكاديمية_LaTeX', 'مذكرات_تخرج', 'معادلات_رياضية', 'رسائل_جامعية'],
    academicFocus: true,
    academicTags: ['#كتابة_أكاديمية_LaTeX', '#مذكرات_تخرج', '#نشر_أكاديمي'],
    isPopular: true,
    supportsArabic: true,
    platforms: ['ويب'],
    pros: [
      'تنسيق تلقائي ومثالي للمعادلات الرياضية والجداول والمراجع بدون القلق من اختلال التنسيق',
      'مئات القوالب الرسمية المعتمدة لرسائل الماجستير ومؤتمرات IEEE و Springer و Elsevier',
      'العمل التعاوني اللحظي بين الأستاذ المشرف والطالب في نفس الوقت'
    ],
    cons: [
      'يتطلب تعلم أساسيات أوامر LaTeX في البداية (تتوفر قوالب واجهة بصرية جاهزة)'
    ],
    useCases: [
      'كتابة مذكرات تخرج كليات الهندسة والعلوم والحاسوب والرياضيات',
      'إعداد ونشر الأوراق العلمية الموجهة للمجلات والمؤتمرات الدولية'
    ],
    addedDate: '2026-01-20',
    gradient: 'from-green-600 to-emerald-800',
    iconBg: 'bg-green-50 text-green-700'
  },
  {
    id: 'research-rabbit',
    nameAr: 'ريسيرش رابيت - خرائط الأبحاث الذكية',
    nameEn: 'Research Rabbit',
    taglineAr: 'سبوتيفاي الأبحاث العلمية لاكتشاف الدراسات المترابطة ورسم شبكات الاستشهادات والمؤلفين بصرياً',
    descriptionAr: 'أداة مجانية ساحرة للطلبة والباحثين تمكنك من بناء خرائط بصرية تفاعلية توضح كيف ترتبط الأوراق العلمية ببعضها، ومن هم أبرز المؤلفين في مجالك، وما هي الدراسات السابقة واللاحقة المرتبطة ببحثك.',
    category: 'academic_scholar',
    pricing: 'free',
    pricingAr: 'مجاني 100% للباحثين',
    pricingDetailsAr: 'مجاني بالكامل بدون أي رسوم لجميع الطلبة والأساتذة والأكاديميين.',
    websiteUrl: 'https://www.researchrabbit.ai',
    rating: 4.8,
    reviewsCount: 940,
    tags: ['خرائط_الأبحاث_العلمية', 'مذكرات_تخرج', 'دراسات_سابقة', 'شبكات_الاستشهاد'],
    academicFocus: true,
    academicTags: ['#خرائط_الأبحاث_العلمية', '#مذكرات_تخرج', '#بحث_علمي_محكم'],
    isPopular: true,
    supportsArabic: true,
    platforms: ['ويب'],
    pros: [
      'رسم بياني شبكي تفاعلي يوضح الأوراق المبكرة والأوراق الحديثة المرتبطة بموضوعك',
      'مزامنة فورية وسلسة مع حسابك في Zotero لتغذية مكتبتك تلقائياً',
      'تنبيهات بريدية أسبوعية عند نشر أوراق جديدة في موضوع بحثك الدقيق'
    ],
    cons: [
      'يعتمد على الواجهة الإنجليزية ولكن يدعم البحث في الأوراق بكافة اللغات'
    ],
    useCases: [
      'العثور على جميع الدراسات السابقة الضرورية لكتابة الإطار النظري للمذكرة',
      'تحديد الفجوة البحثية (Research Gap) وأبرز الرواد في التخصص'
    ],
    addedDate: '2026-01-25',
    gradient: 'from-purple-600 to-violet-800',
    iconBg: 'bg-purple-50 text-purple-700'
  },
  {
    id: 'geogebra',
    nameAr: 'جيوجبرا للمحاكاة والرياضيات التفاعلية',
    nameEn: 'GeoGebra',
    taglineAr: 'المنصة العالمية الأقوى للمحاكاة الرياضية والهندسية والرسم البياني ثلاثي الأبعاد للأساتذة والطلبة',
    descriptionAr: 'برمجية تعليمية مجانية شاملة للرياضيات والهندسة والجبر وحساب التفاضل والتكامل والإحصاء، تتيح رسم المنحنيات ومحاكاة النماذج الفيزيائية والهندسية بشكل تفاعلي وتصدير الرسوم بدقة عالية.',
    category: 'academic_scholar',
    pricing: 'free',
    pricingAr: 'مجاني بالكامل 100%',
    pricingDetailsAr: 'مجاني ومتاح للمدارس والجامعات والأساتذة بدون أي قيود.',
    websiteUrl: 'https://www.geogebra.org',
    rating: 4.9,
    reviewsCount: 2100,
    tags: ['محاكاة_رياضية', 'رسم_بياني_3D', 'جبر_وهندسة', 'تعليم_جامعي'],
    academicFocus: true,
    academicTags: ['#محاكاة_رياضية', '#تحليل_بيانات_إحصائية', '#تعليم_جامعي'],
    isPopular: true,
    supportsArabic: true,
    platforms: ['ويب', 'Windows', 'macOS', 'iOS', 'Android'],
    pros: [
      'دعم كامل للواجهة والرموز باللغة العربية',
      'رسم بياني ثنائي وثلاثي الأبعاد (2D & 3D) مع تحكم بالزوايا والمتغيرات التفاعلية',
      'مكتبة ضخمة تضم ملايين الأنشطة الرياضية الجاهزة التي صممها أساتذة وعلماء'
    ],
    cons: [
      'يحتاج لممارسة للتعود على كتابة الأوامر البرمجية المتقدمة للرسوم المعقدة'
    ],
    useCases: [
      'شرح الدروس الجامعية وتوضيح المفاهيم الهندسية والفيزيائية عملياً',
      'إدراج الرسوم البيانية الدقيقة في مذكرات التخرج ومشاريع التخرج'
    ],
    addedDate: '2026-02-01',
    gradient: 'from-blue-600 to-cyan-700',
    iconBg: 'bg-blue-50 text-blue-700'
  },
  {
    id: 'desmos',
    nameAr: 'ديسموس للحسابات والرسوم البيانية',
    nameEn: 'Desmos Studio',
    taglineAr: 'حاسبة الرسوم البيانية والمعادلات الرياضية المتقدمة التفاعلية والسريعة للطلبة والجامعيين',
    descriptionAr: 'حاسبة بيانية مجانية فائقة السرعة تتيح رسم المعادلات الصعبة والاقترانات وتوضيح الجداول والنقاط والمصفوفات الرياضية فورياً في متصفحك أو هاتفك مع واجهة عربية جذابة وسهلة للغاية.',
    category: 'academic_scholar',
    pricing: 'free',
    pricingAr: 'مجاني بالكامل 100%',
    pricingDetailsAr: 'مجاني تماماً للاستخدام الأكاديمي والتعليمي.',
    websiteUrl: 'https://www.desmos.com',
    rating: 4.9,
    reviewsCount: 1950,
    tags: ['محاكاة_رياضية', 'حاسبة_بيانية', 'معادلات_رياضية', 'مجاني'],
    academicFocus: true,
    academicTags: ['#محاكاة_رياضية', '#تعليم_جامعي'],
    isPopular: true,
    supportsArabic: true,
    platforms: ['ويب', 'iOS', 'Android'],
    pros: [
      'سرعة خارقة في رسم الدوال المتشعبة والمتجهات والتكاملات',
      'إمكانية مشاركة الرسوم وتصديرها كصور بدقة عالية أو تضمينها في المواقع',
      'واجهة بديهية لا تتطلب أي خبرة مسبقة'
    ],
    cons: [
      'محدود في المحاكاة ثلاثية الأبعاد مقارنة بـ GeoGebra'
    ],
    useCases: [
      'حل واجبات الرياضيات والفيزياء الجامعية والتحقق من صحة المنحنيات',
      'توضيح الرسوم البيانية في بحوث ومذكرات التخرج'
    ],
    addedDate: '2026-02-05',
    gradient: 'from-teal-600 to-cyan-800',
    iconBg: 'bg-teal-50 text-teal-700'
  },
  {
    id: 'consensus',
    nameAr: 'كونسينسوس - محرك البحث العلمي المحكم',
    nameEn: 'Consensus AI',
    taglineAr: 'محرك بحث ذكي يستند لأكثر من 200 مليون ورقة بحثية محكمة للإجابة على الأسئلة العلمية بأدلة قطعية',
    descriptionAr: 'محرك بحث أكاديمي ثوري يبحث حصرياً في المجلات والأوراق العلمية المحكمة (Peer-reviewed Papers) ويقدم إجابات مدعومة بنسب إجماع العلماء (Consensus Meter) مع الاستشهاد المباشر بالمصادر المعتمدة.',
    category: 'academic_scholar',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'عمليات بحث مجانية غير محدودة، وميزات تلخيص ذكية باشتراك مخفض.',
    websiteUrl: 'https://consensus.app',
    rating: 4.9,
    reviewsCount: 1320,
    tags: ['بحث_علمي_محكم', 'مذكرات_تخرج', 'استشهادات_موثقة', 'طب_وعلوم'],
    academicFocus: true,
    academicTags: ['#بحث_علمي_محكم', '#مذكرات_تخرج', '#تلخيص_الأوراق_العلمية'],
    isPopular: true,
    isFeatured: true,
    supportsArabic: true,
    platforms: ['ويب'],
    pros: [
      'إجابات خالية تماماً من الهلوسة مستخرجة حصراً من أوراق علمية موثوقة',
      'مقياس الإجماع العلمي (Consensus Meter) لمعرفة هل العلماء يتفقون أم يختلفون',
      'تصدير الاستشهادات بنظام APA و BibTeX بنقرة زر'
    ],
    cons: [
      'يركز على العلوم الطبيعية والطبية والاجتماعية أكثر من العلوم الإنسانية البحتة'
    ],
    useCases: [
      'توثيق الحقائق العلمية في مقدمة وفصول مذكرات التخرج',
      'التأكد من أحدث الاستنتاجات الطبية والعلمية بناءً على دراسات حديثة'
    ],
    addedDate: '2026-02-10',
    gradient: 'from-indigo-600 to-blue-800',
    iconBg: 'bg-indigo-50 text-indigo-700'
  },

  // ==========================================
  // ⚡ منصة بدائل الذكاء الاصطناعي لعام 2026 (Alternative AI Tools Hub)
  // ==========================================
  {
    id: 'deepseek-r1',
    nameAr: 'ديب سيك R1 (بديل ChatGPT التفكيري ومفتوح المصدر)',
    nameEn: 'DeepSeek-R1',
    taglineAr: 'أقوى بديل مفتوح المصدر ومجاني لنماذج OpenAI التفكيرية (o1/o3) في الاستدلال والبرمجة',
    descriptionAr: 'نموذج استدلال وتفكير عميق أحدث ثورة عالمية في 2026، يضاهي أقوى النماذج المدفوعة في حل الرياضيات المعقدة، تحليل الخوارزميات، والبرمجة، ومتاح مجاناً للجميع بدون اشتراكات أو قيود.',
    category: 'ai_alternatives',
    pricing: 'open_source',
    pricingAr: 'مفتوح المصدر / مجاني 100%',
    pricingDetailsAr: 'مجاني تماماً للاستخدام المباشر عبر الويب والتطبيقات وأسعار API شبه مجانية.',
    websiteUrl: 'https://chat.deepseek.com',
    rating: 4.9,
    reviewsCount: 2850,
    tags: ['بدائل_ChatGPT_2026', 'استدلال_عميق', 'أكواد_وبرمجة', 'مفتوح_المصدر', 'مجاني'],
    isAlternative: true,
    alternativeTo: ['ChatGPT Plus', 'OpenAI o1', 'OpenAI o3-mini', 'Claude 3.5 Sonnet'],
    academicTags: ['#بدائل_ChatGPT_2026', '#محاكاة_رياضية', '#أكواد_وبرمجة'],
    isPopular: true,
    isFeatured: true,
    isNew: true,
    supportsArabic: true,
    platforms: ['ويب', 'iOS', 'Android', 'API', 'Ollama محلي'],
    pros: [
      'تفكير استدلالي خطوة بخطوة (Chain of Thought) مجاني بدون حدود اشتراك',
      'قدرات تفوق النماذج المدفوعة في كتابة واختبار الأكواد والمسائل الرياضية',
      'إمكانية تشغيل النموذج محلياً بالكامل على حاسوبك الشخصي دون الحاجة لإنترنت عبر Ollama'
    ],
    cons: [
      'قد تظهر رسالة ضغط السيرفرات في أوقات الذروة العالمية'
    ],
    useCases: [
      'كتابة وتصحيح الأكواد البرمجية والخوارزميات المعقدة',
      'حل المسائل الرياضية والفيزيائية الجامعية مع الشرح المنطقي المفصل'
    ],
    addedDate: '2026-01-20',
    gradient: 'from-blue-600 via-indigo-700 to-cyan-600',
    iconBg: 'bg-cyan-50 text-cyan-700'
  },
  {
    id: 'claude-3-7',
    nameAr: 'كلود 3.7 سونيت (النموذج الهجين الأقوى 2026)',
    nameEn: 'Claude 3.7 Sonnet',
    taglineAr: 'النموذج الهجين الأول عالمياً الذي يجمع بين الاستجابة الفورية والتفكير العميق والبرمجة الفائقة',
    descriptionAr: 'أحدث إطلاق من شركة Anthropic لعام 2026، يتيح للمستخدم التبديل بين الرد الفوري السريع أو تشغيل التفكير العميق الممتد، وهو المعيار القياسي الحالي لمهندسي البرمجيات والباحثين في دقة النتائج وسلامة المنطق.',
    category: 'ai_alternatives',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'استخدام يومي مجاني، وخطة Pro بسعر 20 دولار شهرياً للوصول الموسع والتفكير الأطول.',
    websiteUrl: 'https://claude.ai',
    rating: 5.0,
    reviewsCount: 3100,
    tags: ['بدائل_ChatGPT_2026', 'برمجة_فائقة', 'تفكير_عميق_Hybrid', 'تحليل_مستندات'],
    isAlternative: true,
    alternativeTo: ['ChatGPT Pro', 'GPT-4.5', 'Gemini Ultra'],
    academicTags: ['#بدائل_ChatGPT_2026', '#كتابة_أكاديمية_LaTeX', '#تلخيص_الأوراق_العلمية'],
    isPopular: true,
    isFeatured: true,
    isNew: true,
    supportsArabic: true,
    platforms: ['ويب', 'iOS', 'Android', 'Cursor IDE', 'API'],
    pros: [
      'دقة لا مثيل لها في بناء المشاريع البرمجية الكاملة وتعديل الشفرات بدون أخطاء',
      'أسلوب صياغة لغوية أكاديمية طبيعية تخلو من النبرة الروبوتية المبتذلة',
      'دعم نافذة سياق ضخمة تتيح قراءة كتب كاملة ومذكرات تخرج في رسالة واحدة'
    ],
    cons: [
      'الحدود المجانية اليومية تنفد سريعاً عند استخدام التفكير العميق المكثف'
    ],
    useCases: [
      'تطوير وتصحيح الأنظمة البرمجية ومشاريع التخرج التقنية',
      'مراجعة وتنسيق الأطروحات العلمية وصياغة المقالات الأكاديمية'
    ],
    addedDate: '2026-02-25',
    gradient: 'from-amber-600 via-orange-600 to-yellow-600',
    iconBg: 'bg-amber-50 text-amber-800'
  },
  {
    id: 'gemini-2-5-pro',
    nameAr: 'جوجل جيميناي 2.5 برو (بديل فائق السرعة بمليوني توكن)',
    nameEn: 'Google Gemini 2.5 Pro',
    taglineAr: 'المساعد المتعدد الوسائط الأسرع مع نافذة سياق عملاقة 2 مليون توكن وربط مباشر بالويب ويوتيوب',
    descriptionAr: 'الجيل الأحدث من نماذج Google للذكاء الاصطناعي لعام 2026، يتميز بقدرته على تحليل ساعات من الفيديو وكتب كاملة دفعة واحدة، مع ربط حي بمحرك بحث Google وGoogle Workspace لتوليد إجابات حية وموثوقة.',
    category: 'ai_alternatives',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'مجاني للاستخدام العام، وتكامل متقدم مع باقات Google One AI.',
    websiteUrl: 'https://gemini.google.com',
    rating: 4.8,
    reviewsCount: 2200,
    tags: ['بدائل_ChatGPT_2026', 'Google', '2M_Context', 'تحليل_فيديو_يوتيوب'],
    isAlternative: true,
    alternativeTo: ['ChatGPT', 'Copilot', 'Claude Pro'],
    academicTags: ['#بدائل_ChatGPT_2026', '#تلخيص_الأوراق_العلمية'],
    isPopular: true,
    isFeatured: true,
    isNew: true,
    supportsArabic: true,
    platforms: ['ويب', 'Android', 'iOS'],
    pros: [
      'أكبر نافذة سياق في العالم (2,000,000 توكن) لقراءة مجلدات كاملة من المستندات',
      'تحليل مقاطع الفيديو والمحاضرات الطويلة على يوتيوب واستخراج تلخيص فوري',
      'دعم عربي أصيل وتكامل ممتاز مع Google Drive و Docs و Gmail'
    ],
    cons: [
      'توليد الأكواد المعقدة قد يتطلب تدقيقاً مقارنة بـ Claude 3.7'
    ],
    useCases: [
      'تلخيص المحاضرات والندوات المصورة على اليوتيوب للطلبة والأساتذة',
      'البحث عن أحدث البيانات الإخبارية والعلمية المنشورة على الويب فورياً'
    ],
    addedDate: '2026-02-15',
    gradient: 'from-blue-600 via-indigo-600 to-purple-700',
    iconBg: 'bg-blue-50 text-blue-600'
  },
  {
    id: 'cursor-ai',
    nameAr: 'كيرسور AI (بديل VS Code و Copilot الثوري)',
    nameEn: 'Cursor AI',
    taglineAr: 'محرر الأكواد الذكي رقم 1 عالمياً لعام 2026 القادر على فهم وتعديل مشاريعك البرمجية بالكامل',
    descriptionAr: 'محرر أكواد مبني على VS Code ومزود بنماذج الذكاء الاصطناعي المتقدمة، يتيح لك بناء تطبيقات كاملة، وتصحيح الأخطاء عبر كامل المشروع (Codebase Indexing)، وتوليد الدوال تلقائياً باللغة الطبيعية.',
    category: 'ai_alternatives',
    pricing: 'freemium',
    pricingAr: 'مجاني جزئياً (Freemium)',
    pricingDetailsAr: 'خطة مجانية تتضمن ميزات Composer الأساسية، مع خطة Pro لطلبات الذكاء الاصطناعي غير المحدودة.',
    websiteUrl: 'https://www.cursor.com',
    rating: 5.0,
    reviewsCount: 3400,
    tags: ['أكواد_وبرمجة', 'بديل_VSCode', 'بديل_GitHub_Copilot', 'مشاريع_تخرج'],
    isAlternative: true,
    alternativeTo: ['GitHub Copilot', 'VS Code', 'JetBrains AI', 'Replit'],
    academicTags: ['#أكواد_وبرمجة', '#مذكرات_تخرج'],
    isPopular: true,
    isFeatured: true,
    supportsArabic: true,
    platforms: ['macOS', 'Windows', 'Linux'],
    pros: [
      'فهم بنيوي شامل لكامل ملفات المشروع وليس الملف المفتوح فقط',
      'ميزة Cursor Tab للإكمال التلقائي الذكي لأسطر ودوال كاملة',
      'يدعم التبديل بين Claude 3.7 و GPT-4o و DeepSeek-R1 داخل المحرر'
    ],
    cons: [
      'يتطلب تثبيت البرنامج على الحاسوب للعمل'
    ],
    useCases: [
      'برمجة مشاريع التخرج ومواقع الويب وتطبيقات الهواتف بسرعة مضاعفة 10x',
      'إصلاح الأخطاء البرمجية المعقدة في المشاريع الضخمة تلقائياً'
    ],
    addedDate: '2026-01-20',
    gradient: 'from-slate-800 via-indigo-900 to-purple-900',
    iconBg: 'bg-indigo-50 text-indigo-800'
  },
  {
    id: 'mistral-lechat',
    nameAr: 'ميسترال لو شات (المساعد الأوروبي السريع والمجاني)',
    nameEn: 'Mistral Le Chat',
    taglineAr: 'المساعد الذكي الأوروبي فائق السرعة والمجاني مع محرك بحث على الويب ومولد صور Flux',
    descriptionAr: 'منصة محادثة متطورة من شركة Mistral AI الفرنسية تقدم وصولاً مجانياً لأحدث نماذجها الرائدة (Mistral Large 2 و Pixtral)، مع دعم البحث المباشر في الويب وتوليد الصور بنموذج Flux وتحليل المستندات.',
    category: 'ai_alternatives',
    pricing: 'free',
    pricingAr: 'مجاني بالكامل للجمهور',
    pricingDetailsAr: 'متاح مجاناً للمستخدمين بدون اشتراكات مفروضة.',
    websiteUrl: 'https://chat.mistral.ai',
    rating: 4.8,
    reviewsCount: 1120,
    tags: ['بدائل_ChatGPT_2026', 'أوروبي_مستقل', 'سريع_جداً', 'توليد_صور_Flux'],
    isAlternative: true,
    alternativeTo: ['ChatGPT', 'Claude Free', 'Microsoft Copilot'],
    academicTags: ['#بدائل_ChatGPT_2026'],
    isPopular: true,
    supportsArabic: true,
    platforms: ['ويب', 'iOS', 'Android'],
    pros: [
      'استجابة سريعة جداً بدون قيود مشددة على الاستخدام اليومي',
      'توليد صور فوتوغرافية مدمج مجاناً بنموذج Flux.1 المتقدم',
      'حماية خصوصية عالية متوافقة مع القوانين الأوروبية الصارمة'
    ],
    cons: [
      'يحتاج إتقان الصياغة في بعض اللهجات العربية المحلية'
    ],
    useCases: [
      'المحادثات السريعة والعصف الذهني وكتابة النصوص بدون انتظار',
      'توليد صور توضيحية فورية أثناء المحادثة مجاناً'
    ],
    addedDate: '2026-02-01',
    gradient: 'from-amber-500 to-red-600',
    iconBg: 'bg-orange-50 text-orange-600'
  },
  {
    id: 'flux-ai',
    nameAr: 'فلوكس Flux.1 (البديل المفتوح لـ Midjourney)',
    nameEn: 'Flux.1 by Black Forest Labs',
    taglineAr: 'أحدث نموذج مفتوح المصدر لتوليد الصور الفوتوغرافية الفائقة وكتابة النصوص الإنجليزية بدقة داخل الصور',
    descriptionAr: 'نموذج توليد صور متفوق من مبتكري Stable Diffusion، تفوق على Midjourney في دقة التفاصيل الواقعية للأشخاص، الإضاءة السينمائية، والقدرة المذهلة على كتابة نصوص واضحة وصحيحة داخل الصور دون تشويش.',
    category: 'ai_alternatives',
    pricing: 'open_source',
    pricingAr: 'مفتوح المصدر / مجاني',
    pricingDetailsAr: 'متاح للتحميل والتشغيل محلياً مجاناً، ومتاح عبر منصات ويب مجانية مثل HuggingFace.',
    websiteUrl: 'https://blackforestlabs.ai',
    rating: 4.9,
    reviewsCount: 1890,
    tags: ['بديل_Midjourney', 'توليد_صور', 'مفتوح_المصدر', 'واقعية_سينمائية'],
    isAlternative: true,
    alternativeTo: ['Midjourney', 'DALL-E 3', 'Adobe Firefly'],
    isPopular: true,
    isFeatured: true,
    supportsArabic: false,
    platforms: ['ويب', 'HuggingFace', 'ComfyUI محلي'],
    pros: [
      'جودة فوتوغرافية فائقة الواقعية لملامح الوجه والجلد والإضاءة',
      'كتابة نصوص وشعارات واضحة ومقروءة تماماً داخل الصور المولدة',
      'مفتوح المصدر بالكامل (نسخة Schnell و Dev) للتشغيل المحلي المجاني'
    ],
    cons: [
      'التشغيل المحلي يتطلب كرت شاشة GPU قوي (8GB+ VRAM)'
    ],
    useCases: [
      'توليد الصور الإعلانية وبوسترات السوشيال ميديا بجودة احترافية مجاناً',
      'تصميم أغلفة الكتب والبوسترات لمشاريع التخرج'
    ],
    addedDate: '2026-02-01',
    gradient: 'from-fuchsia-600 via-purple-700 to-indigo-800',
    iconBg: 'bg-fuchsia-50 text-fuchsia-700'
  }
];

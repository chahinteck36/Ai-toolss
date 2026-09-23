import React from 'react';
import { ShieldCheck, Target, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Category } from '../types';

interface CategoryEditorialBannerProps {
  category: Category;
  totalToolsInCategory: number;
  isDarkMode: boolean;
  lang: 'ar' | 'en';
}

interface EditorialData {
  overviewAr: string;
  overviewEn: string;
  criteriaAr: string[];
  criteriaEn: string[];
  useCasesAr: string[];
  useCasesEn: string[];
}

const CATEGORY_EDITORIAL_GUIDES: Record<string, EditorialData> = {
  pdf_documents: {
    overviewAr: 'قسم أدوات PDF والمستندات في أدواتي يركز على توفير حلول معالجة الملفات محلياً داخل متصفح المستخدم دون الحاجة لرفع مستنداتك الحساسة لخوادم خارجية، مع سرعة فائقة وجودة استخراج عالية.',
    overviewEn: 'The PDF & Documents suite focuses on client-side, browser-based document utilities that protect privacy without uploading sensitive documents to external servers, providing fast and secure processing.',
    criteriaAr: [
      'الأمان والخصوصية: تفضيل الأدوات التي تعمل في متصفحك محلياً WebAssembly دون إرسال البيانات.',
      'سهولة الاستخدام: واجهات واضحة خالية من النوافذ المضللة ومباشرة الاستخدام بنقرة واحدة.',
      'التسعير الشفاف: مجانية بالكامل أو إيضاح أي قيود على الحجم أو عدد الصفحات قبل البدء.'
    ],
    criteriaEn: [
      'Privacy & Security: Prioritizing tools processing files locally without external cloud transfer.',
      'Simplicity & Usability: Clean interfaces without misleading prompts or deceptive ads.',
      'Transparent Pricing: 100% free browser tools with explicit file size and limits disclosure.'
    ],
    useCasesAr: [
      'دمج عقود العمل والأوراق الثبوتية في ملف PDF واحد متكامل',
      'ضغط المستندات الجامعية لتتوافق مع منصات التسجيل والتقديم',
      'استخراج النصوص والبيانات من التقارير الرقمية بسرعة ودقة'
    ],
    useCasesEn: [
      'Merging contracts and formal document packs into single PDFs',
      'Compressing academic and research papers for submission portals',
      'Extracting clean text and figures from digital reports'
    ]
  },
  image_tools: {
    overviewAr: 'يضم هذا القسم أدوات التحويل والضغط وتنسيق الصور الرقمية الموجهة للمصممين ومطوري المواقع وصناع المحتوى، مع الحفاظ على أعلى مستويات الدقة والسرعة.',
    overviewEn: 'This section contains image compression, resizing, conversion, and QR utilities tailored for designers, web developers, and content creators.',
    criteriaAr: [
      'خوارزميات الضغط الذكي: تقليل حجم الصور دون تشويه بصري ملحوظ WebP / PNG / JPG.',
      'الاستقلالية في المعالجة: دعم المعالجة المباشرة في المتصفح لضمان الأمان والسرعة.',
      'التوافق مع معايير الويب: توفير مقاسات وصيغ قياسية لشبكات التواصل ومحركات البحث.'
    ],
    criteriaEn: [
      'Smart Compression: Minimizing file size without noticeable visual loss.',
      'Local Processing: Browser-native processing for confidentiality and instant response.',
      'Web Standards: Modern formats (WebP, optimized JPEG) for optimal SEO and performance.'
    ],
    useCasesAr: [
      'تسريع مواقع الويب عن طريق ضغط الصور والبانرات بصيغة WebP',
      'تجهيز مقاسات صور المنشورات والقصص لمنصات التواصل الاجتماعي',
      'إنشاء رموز QR مخصصة للروابط وشبكات الواي فاي ومشاركتها'
    ],
    useCasesEn: [
      'Speeding up websites by optimizing banners and thumbnails to modern formats',
      'Preparing social media post dimensions and profile assets',
      'Generating custom QR codes for direct URLs and contact sharing'
    ]
  },
  text_tools: {
    overviewAr: 'مجموعة أدوات تحرير وفحص النصوص العربية والإنجليزية، وتنسيق الأسطر وتوليد الروابط الدائمة، مصممة خصيصاً للمترجمين، الكتاب، ومديري المواقع.',
    overviewEn: 'A focused suite of text manipulation, counting, duplicate cleaning, and slug generation tools designed for copywriters, translators, and webmasters.',
    criteriaAr: [
      'دعم كامل للغة العربية: معالجة دقيقة للعلامات التشكيلية والهمزات والمسافات.',
      'أداء خفيف وفوري: تنفيذ العمليات على آلاف الأسطر في أجزاء من الثانية.',
      'أمان المحتوى: عدم تخزين أو حفظ أي مسودات أو نصوص مدخلة نهائياً.'
    ],
    criteriaEn: [
      'Full Arabic & Multilingual Support: Accurate diacritics, character counting, and sorting.',
      'Instant Performance: Processing thousands of lines in milliseconds without lag.',
      'Zero Retention: Zero server-side storage of user-entered text or sensitive drafts.'
    ],
    useCasesAr: [
      'حساب دقيق لعدد الكلمات والحروف للمقالات والمنشورات التسويقية',
      'تنظيف القوائم والبيانات من الأسطر المتكررة والفارغة بنقرة واحدة',
      'توليد الروابط الدائمة (Slugs) الصديقة لمحركات البحث للمقالات'
    ],
    useCasesEn: [
      'Precise word and character statistics for essays and articles',
      'Cleaning bulk lists from duplicates and trailing whitespaces',
      'Generating SEO-friendly URL slugs for publishing platforms'
    ]
  },
  ai_alternatives: {
    overviewAr: 'دليل البدائل الذكية المحدث هو مرجع تحريري متخصص يهدف لمساعدتك على إيجاد أقوى البدائل المجانية والمفتوحة أو الأعلى كفاءة للخدمات الاحتكارية المكلفة مثل ChatGPT Plus وCopilot وMidjourney.',
    overviewEn: 'The Smart AI Alternatives Hub is a curated directory helping users discover open-weight, free, or higher-efficiency alternatives to expensive proprietary platforms.',
    criteriaAr: [
      'القيمة الفعلية مقابل التكلفة: إبراز النماذج المفتوحة أو المجانية التي تقدم أداءً موازياً أو متفوقاً.',
      'سلامة الاستدلال والمنطق: اختبار النماذج في حل الأكواد والرياضيات وتحليل المستندات المعقدة.',
      'إمكانية التشغيل المحلي: تسليط الضوء على الحلول التي تحترم الخصوصية وتعمل دون اتصال.'
    ],
    criteriaEn: [
      'Value & Accessibility: Highlighting open-source or free tiers that match paid benchmarks.',
      'Reasoning Rigor: Testing tools across coding, analytical logic, and long-context documents.',
      'Privacy & Self-Hosting: Evaluating models that run locally on private hardware.'
    ],
    useCasesAr: [
      'الاستغناء عن الاشتراكات الشهرية الباهظة باستخدام نماذج تفكيرية مفتوحة ومجانية',
      'تطوير البرمجيات ومشاريع التخرج عبر محررات ذكية تفهم شفرة المشروع بالكامل',
      'تحليل وقراءة مستندات ضخمة ومحاضرات مطولة عبر نوافذ سياق تتجاوز المليون توكن'
    ],
    useCasesEn: [
      'Replacing costly monthly subscriptions with high-performing open reasoning models',
      'Developing production codebases with codebase-aware AI IDEs',
      'Analyzing massive research papers and lecture recordings with ultra-long context windows'
    ]
  },
  academic_scholar: {
    overviewAr: 'قسم البحث العلمي والأكاديمي مصمم لخدمة طلاب الماجستير والدكتوراه، الأساتذة، والباحثين المستقلين عبر أدوات متخصصة في توثيق المراجع، محركات البحث المحكمة، وتلخيص الأوراق العلمية.',
    overviewEn: 'The Academic & Scholar Suite supports postgraduate students, professors, and independent researchers with citation tools, peer-reviewed engines, and paper analysis.',
    criteriaAr: [
      'موثوقية الاقتباسات: استبعاد الأدوات التي تولد مراجع وهمية، والاعتماد على قواعد بيانات علمية حقيقية.',
      'دعم تنسيقات APA و IEEE و MLA: سلامة التوثيق الأكاديمي المعتمد في الجامعات.',
      'تكامل LaTeX والرياضيات: القدرة على قراءة وكتابة المعادلات والرموز المعقدة بدقة.'
    ],
    criteriaEn: [
      'Citation Reliability: Filtering out hallucinated sources; prioritizing real DOI and arXiv links.',
      'Academic Formats: Support for APA, IEEE, MLA citation standards.',
      'LaTeX & Formula Support: Seamless handling of complex mathematical and scientific notation.'
    ],
    useCasesAr: [
      'مراجعة الأدبيات السابقة واستكشاف الدراسات الحديثة في مجالك البحثي',
      'إدارة وتنسيق قائمة المراجع وفق دليل APA 7th لمذكرات التخرج',
      'شرح وتفكيك المنهجيات الإحصائية والمعادلات الرياضية المعقدة'
    ],
    useCasesEn: [
      'Conducting systematic literature reviews and exploring frontier arXiv preprints',
      'Managing APA 7th bibliography formatting for thesis submissions',
      'Demystifying complex econometric formulas and statistical proofs'
    ]
  },
  chatbots: {
    overviewAr: 'يستعرض هذا القسم أبرز روبوتات المحادثة والمساعدين الذكيين القائمين على أحدث نماذج اللغة الكبيرة (LLMs)، مع تقييم دقتها اللغوية، اتساع نافذة سياقها، وقدرتها على التعامل مع الأسئلة المعقدة.',
    overviewEn: 'A directory of conversational assistants powered by frontier LLMs, audited for conversational naturalness, context retention, multilingual accuracy, and research capabilities.',
    criteriaAr: [
      'سلامة الاستجابة اللغوية العربية وجودة صياغة المعاني بدون ركاكة روبوتية.',
      'الوصول للبيانات الحية وربط النتائج بمصادر موثوقة ومحدثة على الإنترنت.',
      'تنوع باقات الاستخدام المجانية قبل إلزام الزائر باشتراك مدفوع.'
    ],
    criteriaEn: [
      'Linguistic fluency in Arabic and English without generic boilerplate tones.',
      'Live web connectivity and verifiable source attribution.',
      'Generous free tiers evaluated before highlighting paid tiers.'
    ],
    useCasesAr: [
      'العصف الذهني وصياغة خطط العمل وتنسيق الرسائل الرسمية',
      'المساعدة في حل المشكلات البرمجية وشرح المفاهيم المعقدة خطوة بخطوة',
      'البحث السريع وتلخيص المواضيع المتشعبة في صيغة نقاط مركزة'
    ],
    useCasesEn: [
      'Brainstorming, drafting business briefs, and composing business correspondence',
      'Debugging code snippets and walking through technical concepts step-by-step',
      'Fast synthesis and thematic summarization of complex topics'
    ]
  }
};

const DEFAULT_EDITORIAL_GUIDE: EditorialData = {
  overviewAr: 'يقدم دليل أدواتي مراجعة وتصنيفاً دورياً للأدوات الرقمية وبرمجيات الذكاء الاصطناعي في هذا القسم، بهدف توفير خيارات موثوقة ومجربة للمستخدم العربي.',
  overviewEn: 'The Adawatai directory periodically curates, verifies, and catalogs digital tools and AI applications in this category to help users make informed decisions.',
  criteriaAr: [
    'سهولة الوصول وتوفر نسخة مجانية أو تجريبية واضحة المعالم للمستخدم.',
    'حماية الخصوصية وموثوقية جهة التطوير والموقع الرسمي للأداة.',
    'التحديث المستمر وملاءمة الأداة لاحتياجات المحترفين والهواة على السواء.'
  ],
  criteriaEn: [
    'Clear accessibility, with a transparent free tier or trial for visitors.',
    'Privacy standards and organizational credibility of the provider.',
    'Regular maintenance and alignment with practical professional needs.'
  ],
  useCasesAr: [
    'رفع الإنتاجية اليومية وتسريع إنجاز المهام الرقمية المعقدة',
    'تقليل التكاليف التشغيلية بالاعتماد على أدوات ذات قيمة عالية',
    'اكتشاف أحدث التقنيات الرقمية المعتمدة عالمياً وتجربتها بأمان'
  ],
  useCasesEn: [
    'Boosting daily productivity and streamlining technical workflows',
    'Minimizing operational software costs with high-value alternatives',
    'Safely discovering and deploying verified frontier digital utilities'
  ]
};

export const CategoryEditorialBanner: React.FC<CategoryEditorialBannerProps> = ({
  category,
  totalToolsInCategory,
  isDarkMode,
  lang
}) => {
  const isAr = lang === 'ar';
  const editorial = CATEGORY_EDITORIAL_GUIDES[category.id] || DEFAULT_EDITORIAL_GUIDE;

  return (
    <section 
      aria-labelledby="category-editorial-heading"
      className={`rounded-3xl border p-5 sm:p-7 mb-6 transition-colors ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-slate-100' 
          : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Category Header with Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'دليل تصنيف تحريري' : 'Editorial Category Guide'}</span>
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {isAr ? `${totalToolsInCategory} أدوات مدرجة ومفحوصة` : `${totalToolsInCategory} verified listings`}
            </span>
          </div>
          <h2 id="category-editorial-heading" className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {isAr ? category.nameAr : category.nameEn}
          </h2>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{isAr ? 'روابط رسمية ومراجعة دورية' : 'Verified Links & Audited Tiers'}</span>
        </div>
      </div>

      {/* Editorial Overview */}
      <div className="py-4">
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          {isAr ? editorial.overviewAr : editorial.overviewEn}
        </p>
      </div>

      {/* Two columns: Selection Criteria & Practical Use Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 pt-3 border-t border-slate-100 dark:border-slate-800">
        {/* Selection Criteria */}
        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200/80'
        }`}>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2.5">
            <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>{isAr ? 'معايير الاختيار والتقييم في أدواتي' : 'Adawatai Evaluation Criteria'}</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            {(isAr ? editorial.criteriaAr : editorial.criteriaEn).map((crit, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{crit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Practical Use Cases */}
        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200/80'
        }`}>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2.5">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{isAr ? 'أبرز حالات ومجالات الاستخدام' : 'Primary Use Cases & Beneficiaries'}</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            {(isAr ? editorial.useCasesAr : editorial.useCasesEn).map((useCase, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Editorial Disclaimer Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
        <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>
          {isAr 
            ? 'هذا الدليل مدخل تحريري مستقل من فريق أدواتي لمساعدتك في اتخاذ القرار، ويتم التحقق من الروابط ونماذج التسعير دورياً.' 
            : 'This is an independent editorial guide from Adawatai to help you make decisions. Links and pricing are audited regularly.'}
        </span>
      </div>
    </section>
  );
};

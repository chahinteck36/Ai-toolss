import { DigitalTool } from '../types';

export const DIGITAL_TOOLS: DigitalTool[] = [
  // ==========================================
  // PDF & DOCUMENTS
  // ==========================================
  {
    id: 'pdf-to-word',
    slug: 'pdf-to-word',
    category: 'pdf_documents',
    nameAr: 'تحويل PDF إلى Word',
    nameEn: 'PDF to Word Converter',
    nameFr: 'Convertisseur PDF en Word',
    taglineAr: 'حوّل مستندات PDF إلى ملفات Word قابلة للتعديل مجاناً وبأعلى دقة',
    taglineEn: 'Convert PDF documents into editable Word files for free in your browser',
    descriptionAr: 'أداة مجانية وسريعة تتيح لك استخراج النصوص وتنسيقات مستندات PDF وتحويلها إلى ملف مستند Word أو RTF قابل للتحرير مباشرة دون رفع ملفاتك إلى خوادم خارجية.',
    descriptionEn: 'Easily convert PDF files to editable Word documents directly inside your browser. 100% private and client-side.',
    icon: 'FileText',
    seoTitleAr: 'تحويل PDF إلى Word مجاناً بدون برامج | أدواتي AI',
    seoTitleEn: 'Free PDF to Word Converter Online - Adawatai',
    seoDescriptionAr: 'حوّل ملفات PDF إلى Word قابلة للتعديل مجاناً وبسرعة فائقة. معالجة آمنة داخل المتصفح تحافظ على خصوصية بياناتك.',
    seoDescriptionEn: 'Convert PDF files into editable Word documents online for free. Fast, private client-side processing.',
    keywords: ['تحويل pdf الى word', 'pdf to word', 'تحويل بي دي اف لوورد', 'مستند وورد', 'تعديل pdf'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'اختر ملف PDF', desc: 'اسحب وأفلت الملف أو اضغط لاختيار ملف من جهازك.' },
      { step: 2, title: 'معالجة المستند', desc: 'يقوم المتصفح بقراءة الصفحات واستخراج النصوص والجداول بدقة.' },
      { step: 3, title: 'تحميل ملف Word', desc: 'اضغط على زر التنزيل للحصول على ملف Word القابل للتعديل.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Select PDF', desc: 'Drag and drop your PDF or click to browse.' },
      { step: 2, title: 'Extract Content', desc: 'Browser extracts paragraphs, headings, and formatting.' },
      { step: 3, title: 'Download DOCX', desc: 'Click download to save your editable document.' }
    ],
    featuresAr: [
      'معالجة محلية بالكامل Client-Side تحافظ على سرية مستنداتك',
      'دعم كامل للغة العربية والإنجليزية',
      'تنزيل فوري بدون تسجيل أو اشتراكات',
      'الحفاظ على الفقرات والترتيب الأصلي للنصوص'
    ],
    featuresEn: [
      '100% client-side processing keeps your documents private',
      'Full Arabic and English text support',
      'Instant download with no sign-up or limits',
      'Retains structural paragraphs and layout'
    ],
    faqAr: [
      { question: 'هل ملفاتي آمنة وسرية؟', answer: 'نعم بالتأكيد. تتم عملية التحويل بالكامل داخل متصفحك دون رفع الملف إلى أي خادم خارجي.' },
      { question: 'هل الأداة مجانية؟', answer: 'نعم، مجانية 100% بدون حدود وبدون اشتراكات.' },
      { question: 'هل تدعم الملفات المكتوبة باللغة العربية؟', answer: 'نعم، تدعم استخراج النصوص العربية بكفاءة عالية.' }
    ],
    faqEn: [
      { question: 'Are my files safe?', answer: 'Yes! Processing is done directly in your browser. No files are uploaded to any server.' },
      { question: 'Is this converter free?', answer: '100% free with no hidden subscriptions or page caps.' },
      { question: 'Does it support Arabic text?', answer: 'Yes, full RTL and Arabic text decoding is supported.' }
    ],
    relatedToolSlugs: ['word-to-pdf', 'pdf-text-extractor', 'merge-pdf', 'pdf-to-jpg']
  },
  {
    id: 'word-to-pdf',
    slug: 'word-to-pdf',
    category: 'pdf_documents',
    nameAr: 'تحويل Word إلى PDF',
    nameEn: 'Word to PDF Converter',
    nameFr: 'Convertisseur Word en PDF',
    taglineAr: 'حوّل مستندات Word و DOCX إلى ملفات PDF احترافية بجودة طباعة عالية',
    taglineEn: 'Convert Word documents (.docx, .txt) into professional PDF files instantly',
    descriptionAr: 'حوّل مستندات Word ونصوصك إلى ملفات PDF جاهزة للمشاركة والطباعة مع دعم الخطوط والتنسيقات ومطابقة المعايير القياسية.',
    descriptionEn: 'Convert Word and text documents into print-ready PDF files with crisp vector typography and layout preservation.',
    icon: 'FileCheck',
    seoTitleAr: 'تحويل Word إلى PDF مجاناً وبجودة عالية | أدواتي AI',
    seoTitleEn: 'Free Word to PDF Converter Online - Adawatai',
    seoDescriptionAr: 'حوّل مستندات Word و DOCX إلى PDF احترافي مجاناً وبدون تثبيت برامج. حماية تامة لبياناتك ومعالجة سريعة.',
    seoDescriptionEn: 'Convert Word and text files into standard PDF documents online for free. Secure, browser-based conversion.',
    keywords: ['تحويل word الى pdf', 'word to pdf', 'تحويل وورد لبي دي اف', 'طباعة pdf'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'رفع ملف المستند', desc: 'اختر ملف Word أو نص من جهازك.' },
      { step: 2, title: 'تنسيق الصفحة', desc: 'اختر هوامش الصفحة واتجاه العرض (عمودي أو أفقي).' },
      { step: 3, title: 'توليد وتحميل PDF', desc: 'اضغط على إنشاء PDF واحفظ المستند في ثوانٍ.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Upload Document', desc: 'Select your Word or text file from your device.' },
      { step: 2, title: 'Configure Page', desc: 'Pick page margins and orientation (portrait or landscape).' },
      { step: 3, title: 'Generate PDF', desc: 'Click generate and download your clean PDF.' }
    ],
    featuresAr: [
      'توليد ملفات PDF متوافقة مع جميع الأجهزة والهواتف',
      'إمكانية تحديد حجم الصفحة (A4, Letter) وتنسيق الهوامش',
      'حماية الخصوصية: كل العمليات تنفذ على جهازك',
      'يدعم المستندات متعددة الصفحات'
    ],
    featuresEn: [
      'Generates standard PDFs viewable across all devices',
      'Adjustable page sizes (A4, Letter) and margin controls',
      'Privacy guaranteed with in-browser processing',
      'Supports multi-page document creation'
    ],
    faqAr: [
      { question: 'هل يتغير تنسيق الخطوط عند التحويل؟', answer: 'تحرص الأداة على المحافظة على التنسيق والفقرات بدقة عالية.' },
      { question: 'هل أحتاج لبرنامج Microsoft Word؟', answer: 'لا، تعمل الأداة كلياً داخل المتصفح دون الحاجة لأي برامج إضافية.' }
    ],
    faqEn: [
      { question: 'Do I need Microsoft Office installed?', answer: 'No, everything runs right inside your web browser.' }
    ],
    relatedToolSlugs: ['pdf-to-word', 'merge-pdf', 'compress-pdf']
  },
  {
    id: 'merge-pdf',
    slug: 'merge-pdf',
    category: 'pdf_documents',
    nameAr: 'دمج ملفات PDF',
    nameEn: 'Merge PDF Files',
    nameFr: 'Fusionner des fichiers PDF',
    taglineAr: 'اجمع عدة ملفات PDF في ملف واحد منظم وسهل التصفح',
    taglineEn: 'Combine multiple PDF documents into a single organized file in seconds',
    descriptionAr: 'أداة مجانية لدمج ملفين أو أكثر من ملفات PDF في ملف واحد مرتب. رتّب الصفحات بالسحب والإفلات، واجمع أوراق العمل والتقارير بسهولة تامة.',
    descriptionEn: 'Easily merge two or more PDF files into a single consolidated document. Reorder files, combine chapters, and download instantly.',
    icon: 'Layers',
    seoTitleAr: 'دمج ملفات PDF في ملف واحد مجاناً | أدواتي AI',
    seoTitleEn: 'Merge PDF Online Free - Combine PDF Files - Adawatai',
    seoDescriptionAr: 'ادمج ملفات PDF المتعددة في ملف واحد بسهولة وسرعة وبدون حدود للحجم. خصوصية تامة ومعالجة آمنة محلياً.',
    seoDescriptionEn: 'Combine multiple PDF files into one online for free. Reorder files and merge in seconds with zero uploads.',
    keywords: ['دمج pdf', 'merge pdf', 'دمج ملفات بي دي اف', 'تجميع pdf في ملف واحد'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'اختر ملفات PDF', desc: 'أضف ملفين أو أكثر من ملفات PDF التي ترغب في دمجها.' },
      { step: 2, title: 'رتّب الترتيب', desc: 'استخدم الأسهم لتحريك الملفات وترتيبها حسب الرغبة.' },
      { step: 3, title: 'دمج وتحميل', desc: 'اضغط دمج PDF واحصل على ملفك الموحد فوراً.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Add PDF Files', desc: 'Select two or more PDF documents to merge.' },
      { step: 2, title: 'Reorder Files', desc: 'Move files up or down to set the exact sequence.' },
      { step: 3, title: 'Merge & Save', desc: 'Click merge and download your unified document.' }
    ],
    featuresAr: [
      'دمج غير محدود لعدد الملفات والصفحات',
      'إمكانية إعادة ترتيب الملفات بسهولة',
      'سرعة فائقة ومعالجة آمنة داخل المتصفح',
      'حفظ جودة الملفات الأصلية دون تشويه'
    ],
    featuresEn: [
      'Unlimited file and page merges',
      'Easy drag & click file reordering',
      'Ultra-fast client-side processing',
      'Original quality preserved without degradation'
    ],
    faqAr: [
      { question: 'هل يوجد حد لعدد الملفات التي يمكن دمجها؟', answer: 'لا، يمكنك دمج أي عدد من الملفات المدعومة بذاكرة متصفحك.' },
      { question: 'هل تظل جودة الصور والنصوص كما هي؟', answer: 'نعم، لا يتم تقليل دقة العناصر الأصلية أثناء عملية الدمج.' }
    ],
    faqEn: [
      { question: 'Is there a limit on how many files I can merge?', answer: 'No limit! Merge as many documents as your device memory allows.' }
    ],
    relatedToolSlugs: ['split-pdf', 'compress-pdf', 'rotate-pdf', 'extract-pdf-pages']
  },
  {
    id: 'split-pdf',
    slug: 'split-pdf',
    category: 'pdf_documents',
    nameAr: 'تقسيم وتجزئة PDF',
    nameEn: 'Split PDF Files',
    nameFr: 'Diviser un fichier PDF',
    taglineAr: 'قسّم مستند PDF كبير إلى صفحات منفصلة أو استخرج مجالات محددة',
    taglineEn: 'Split a large PDF into individual pages or extract custom page ranges',
    descriptionAr: 'قسّم ملف PDF الخاص بك إلى ملفات متعددة بسهولة. يمكنك استخراج كل صفحة كملف مستقل، أو تحديد نطاق صفحات مخصص مثل (1-5، 8، 11-14).',
    descriptionEn: 'Split large PDF documents into separate files by page range or single pages directly in your browser.',
    icon: 'Scissors',
    seoTitleAr: 'تقسيم ملف PDF وفصل الصفحات مجاناً | أدواتي AI',
    seoTitleEn: 'Split PDF Online Free - Extract Pages - Adawatai',
    seoDescriptionAr: 'قسّم مستندات PDF واستخرج صفحات معينة مجاناً. أداة سريعة وآمنة تعمل داخل المتصفح بدون تثبيت أي برنامج.',
    seoDescriptionEn: 'Split PDF files into separate pages or ranges online for free. Secure, fast, and 100% private.',
    keywords: ['تقسيم pdf', 'split pdf', 'فصل صفحات بي دي اف', 'استخراج صفحات pdf'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'حدد ملف PDF', desc: 'اختر المستند المراد تقسيمه.' },
      { step: 2, title: 'اختر طريقة التقسيم', desc: 'حدد تقسيم كل صفحة على حدة أو اكتب نطاق الصفحات (مثال: 1-3, 5).' },
      { step: 3, title: 'تنزيل الأجزاء', desc: 'اضغط على استخراج وحمّل الملفات الناتجة فوراً.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Upload PDF', desc: 'Select the PDF file you want to split.' },
      { step: 2, title: 'Choose Mode', desc: 'Split each page individually or enter specific page ranges.' },
      { step: 3, title: 'Download Files', desc: 'Click split to download your processed documents.' }
    ],
    featuresAr: [
      'استخراج صفحات محددة بدقة',
      'خيار تقسيم كل صفحة إلى ملف مستقل',
      'معاينة لعدد صفحات المستند وحجمه',
      'حماية خصوصية 100% بدون إرسال الملف لخادم'
    ],
    featuresEn: [
      'Extract custom page ranges with precision',
      'Burst mode: split every page into a standalone PDF',
      'Live preview of page count and dimensions',
      '100% private client-side processing'
    ],
    faqAr: [
      { question: 'كيف أحدد نطاق صفحات معين؟', answer: 'يمكنك كتابة أرقام الصفحات مفصولة بفواصل أو شرطة مثل: 1-4, 7, 10.' }
    ],
    faqEn: [
      { question: 'How do I specify page ranges?', answer: 'Use comma-separated numbers and dashes, for example: 1-4, 7, 9-12.' }
    ],
    relatedToolSlugs: ['merge-pdf', 'extract-pdf-pages', 'rotate-pdf']
  },
  {
    id: 'compress-pdf',
    slug: 'compress-pdf',
    category: 'pdf_documents',
    nameAr: 'ضغط وتقليل حجم PDF',
    nameEn: 'Compress PDF',
    nameFr: 'Compresser un PDF',
    taglineAr: 'قلل حجم ملفات PDF الكبيرة لتسهيل إرسالها بالبريد أو رفعها للمواقع',
    taglineEn: 'Reduce PDF file size while preserving document readability and quality',
    descriptionAr: 'أداة ضغط PDF ذكية تُقلل حجم المستند بإزالة العناصر غير الضرورية وضغط المخطوطات والوسائط، مما يجعلها مثالية للإرسال عبر البريد الإلكتروني أو التقديم على الوظائف والمناقصات.',
    descriptionEn: 'Optimize and reduce PDF document size without losing readable quality. Perfect for email attachments and portal uploads.',
    icon: 'Minimize2',
    seoTitleAr: 'ضغط ملفات PDF وتقليل الحجم مجاناً | أدواتي AI',
    seoTitleEn: 'Compress PDF Online Free - Reduce File Size - Adawatai',
    seoDescriptionAr: 'أداة مجانية لتقليل وضغط حجم ملفات PDF بسهولة مع الحفاظ على وضوح النصوص. معالجة سريعة وآمنة.',
    seoDescriptionEn: 'Compress PDF files online for free. Shrink document file size quickly while keeping text clear and legible.',
    keywords: ['ضغط pdf', 'compress pdf', 'تقليل حجم بي دي اف', 'تصغير حجم ملف pdf'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'اختر ملف PDF', desc: 'اختر الملف الذي ترغب في ضغطه.' },
      { step: 2, title: 'اختر مستوى الضغط', desc: 'اختر بين ضغط قياسي متوازن أو ضغط أقصى.' },
      { step: 3, title: 'تنزيل الملف المضغوط', desc: 'احصل على الملف بحجم أصغر بنسبة تصل إلى 70%.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Select PDF', desc: 'Choose the file you want to shrink.' },
      { step: 2, title: 'Select Compression', desc: 'Choose standard balanced or maximum compression.' },
      { step: 3, title: 'Download PDF', desc: 'Download your compressed file instantly.' }
    ],
    featuresAr: [
      'تقليل حجم المستند مع الحفاظ على وضوح النصوص',
      'حساب فوري لنسبة التوفير في المساحة',
      'معالجة سريعة ومحلية دون رفع ملفاتك',
      'ملائم لملفات التوظيف والأوراق الجامعية'
    ],
    featuresEn: [
      'Shrinks file size while keeping typography sharp',
      'Real-time calculation of saved space percentage',
      'Safe, in-browser optimization without uploads',
      'Ideal for university submissions and job applications'
    ],
    faqAr: [
      { question: 'هل يؤثر الضغط على جودة النص؟', answer: 'النصوص تظل واضحة بنسبة 100% لأنها متجهات رقمية، والضغط يستهدف البيانات المكررة والصور الفائضة.' }
    ],
    faqEn: [
      { question: 'Will compressing hurt text quality?', answer: 'Vector text remains 100% crisp. The optimizer targets metadata redundancy and image streams.' }
    ],
    relatedToolSlugs: ['merge-pdf', 'pdf-to-word', 'split-pdf']
  },
  {
    id: 'rotate-pdf',
    slug: 'rotate-pdf',
    category: 'pdf_documents',
    nameAr: 'تدوير صفحات PDF',
    nameEn: 'Rotate PDF Pages',
    nameFr: 'Faire pivoter des pages PDF',
    taglineAr: 'عدّل اتجاه صفحات PDF المقلوبة أو الأفقية بدقة 90 أو 180 أو 270 درجة',
    taglineEn: 'Rotate upside-down or sideways PDF pages by 90, 180, or 270 degrees',
    descriptionAr: 'أصلح اتجاه صفحات PDF الممسوحة ضوئياً بشكل مقلوب أو مائل. قم بتدوير جميع الصفحات أو صفحات محددة وحفظ المستند المعدل في ثوانٍ.',
    descriptionEn: 'Fix rotated or upside-down scanned PDF pages. Rotate all pages or individual sheets with a single click.',
    icon: 'RotateCw',
    seoTitleAr: 'تدوير صفحات PDF وتعديل الاتجاه مجاناً | أدواتي AI',
    seoTitleEn: 'Rotate PDF Online Free - Permanent Page Rotation - Adawatai',
    seoDescriptionAr: 'أداة مجانية لتدوير صفحات PDF المقلوبة وتعديل اتجاه المستندات بزاوية 90 أو 180 درجة بسهولة وأمان.',
    seoDescriptionEn: 'Rotate PDF pages online for free. Adjust page orientation by 90, 180, or 270 degrees permanently.',
    keywords: ['تدوير pdf', 'rotate pdf', 'تعديل اتجاه بي دي اف', 'قلب صفحات pdf'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'ارفع ملف PDF', desc: 'اختر المستند الذي يحتوي على صفحات مقلوبة.' },
      { step: 2, title: 'اختر زاوية التدوير', desc: 'اضغط على زر التدوير (90° يميناً، 90° يساراً، أو 180°).' },
      { step: 3, title: 'احفظ الملف', desc: 'حمّل المستند بالاتجاه الصحيح فوراً.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Add PDF File', desc: 'Upload the PDF with rotated or sideways pages.' },
      { step: 2, title: 'Rotate Pages', desc: 'Click to rotate 90° clockwise, 90° counter-clockwise, or 180°.' },
      { step: 3, title: 'Save Document', desc: 'Download your properly oriented PDF.' }
    ],
    featuresAr: [
      'تدوير بزوايا 90، 180، 270 درجة',
      'معاينة حية للمستند قبل الحفظ',
      'حفظ دائم للاتجاه الجديد',
      'حماية كاملة للملفات على جهازك'
    ],
    featuresEn: [
      'Supports 90°, 180°, and 270° rotations',
      'Live visual feedback before saving',
      'Permanent orientation persistence',
      'Zero uploads - runs entirely in-browser'
    ],
    faqAr: [
      { question: 'هل التدوير دائم عند فتح الملف في برامج أخرى؟', answer: 'نعم، يتم تعديل بيانات الزاوية الأصلية في ملف PDF بشكل دائم.' }
    ],
    faqEn: [
      { question: 'Is the rotation saved permanently?', answer: 'Yes, the updated orientation is written directly to the PDF metadata.' }
    ],
    relatedToolSlugs: ['merge-pdf', 'split-pdf', 'extract-pdf-pages']
  },
  {
    id: 'extract-pdf-pages',
    slug: 'extract-pdf-pages',
    category: 'pdf_documents',
    nameAr: 'استخراج صفحات من PDF',
    nameEn: 'Extract PDF Pages',
    nameFr: 'Extraire des pages PDF',
    taglineAr: 'اختر صفحات محددة من ملف PDF واستخرجها في مستند مستقل جديد',
    taglineEn: 'Pick specific pages from a PDF document and save them as a clean new PDF',
    descriptionAr: 'استخرج الصفحات الهامة فقط من كتاب أو تقرير ضخم دون الحاجة للاحتفاظ بكامل الملف. حدد الصفحات المطلوبة وقم بتنزيلها في ملف PDF نقي.',
    descriptionEn: 'Extract only the pages you need from huge PDF documents. Fast, accurate, and completely private.',
    icon: 'FileSpreadsheet',
    seoTitleAr: 'استخراج صفحات من PDF مجاناً | أدواتي AI',
    seoTitleEn: 'Extract PDF Pages Online Free - Adawatai',
    seoDescriptionAr: 'استخرج صفحات محددة من أي ملف PDF واحفظها في مستند جديد مجاناً. أداة سريعة بدون برامج.',
    seoDescriptionEn: 'Extract specific pages from any PDF file online for free. Clean, lightweight, client-side extraction.',
    keywords: ['استخراج صفحات pdf', 'extract pdf pages', 'فصل صفحات من بي دي اف'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'رفع المستند', desc: 'اختر ملف PDF المراد استخراج الصفحات منه.' },
      { step: 2, title: 'تحديد أرقام الصفحات', desc: 'أدخل أرقام الصفحات المطلوبة (مثال: 1, 3, 5-9).' },
      { step: 3, title: 'إنشاء المستند الجديد', desc: 'اضغط استخراج وحمّل ملفك المنقح فوراً.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Upload Document', desc: 'Select the PDF from which you want pages extracted.' },
      { step: 2, title: 'Specify Pages', desc: 'Type page numbers or ranges (e.g., 2, 4, 7-10).' },
      { step: 3, title: 'Generate & Save', desc: 'Download your targeted new PDF.' }
    ],
    featuresAr: [
      'دعم النطاقات المجمعة والصفحات الفردية',
      'الحفاظ على جودة النصوص والرسوم البيانية',
      'سرعة إنجاز فائقة في أجزاء من الثانية',
      'لا قيود على حجم الملفات أو عدد العمليات'
    ],
    featuresEn: [
      'Supports custom ranges and single page selections',
      'Preserves original graphic and font fidelity',
      'Sub-second processing performance',
      'No size caps or daily quotas'
    ],
    faqAr: [
      { question: 'هل يمكن استخراج صفحة واحدة فقط؟', answer: 'نعم بكل تأكيد، ما عليك سوى كتابة رقم تلك الصفحة.' }
    ],
    faqEn: [
      { question: 'Can I extract just one single page?', answer: 'Yes, just enter that single page number.' }
    ],
    relatedToolSlugs: ['split-pdf', 'merge-pdf', 'rotate-pdf']
  },
  {
    id: 'pdf-text-extractor',
    slug: 'pdf-text-extractor',
    category: 'pdf_documents',
    nameAr: 'استخراج النصوص من PDF',
    nameEn: 'PDF Text Extractor',
    nameFr: 'Extracteur de texte PDF',
    taglineAr: 'استخرج جميع النصوص المكتوبة داخل ملف PDF وانسخها بضغطة زر',
    taglineEn: 'Extract all readable text from any PDF document and copy or export to TXT',
    descriptionAr: 'أداة سريعة ومفيدة لقراءة واستخراج النصوص والفقرات من ملفات PDF المكتوبة، مع إمكانية نسخ النص مباشرة إلى الحافظة أو تحميله كملف نصي TXT.',
    descriptionEn: 'Extract all digital text contents from PDF documents. Cleanly formatted, ready to copy or download as a text file.',
    icon: 'AlignLeft',
    seoTitleAr: 'استخراج وقراءة النصوص من ملفات PDF مجاناً | أدواتي AI',
    seoTitleEn: 'Extract Text from PDF Online Free - Adawatai',
    seoDescriptionAr: 'استخرج النصوص الكاملة من ملفات PDF مجاناً وبدون برامج. انسخ النصوص أو نزّلها كملف نصي فوري.',
    seoDescriptionEn: 'Extract plain text from PDF documents online for free. Copy to clipboard or download as TXT.',
    keywords: ['استخراج نصوص pdf', 'نسخ نص من بي دي اف', 'pdf text extractor', 'تحويل pdf الى نص'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'اختر ملف PDF', desc: 'حدد الملف الذي ترغب في استخراج نصوصه.' },
      { step: 2, title: 'فحص النصوص', desc: 'يقوم المتصفح بقراءة طبقات النصوص تلقائياً.' },
      { step: 3, title: 'نسخ أو حفظ', desc: 'انسخ النص مباشرة أو احفظه كملف TXT.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Upload PDF', desc: 'Choose the file containing text.' },
      { step: 2, title: 'Extract Content', desc: 'Browser decodes digital text layers.' },
      { step: 3, title: 'Copy or Save', desc: 'Copy to clipboard or export as TXT.' }
    ],
    featuresAr: [
      'استخراج النصوص العربية والإنجليزية بكفاءة',
      'إحصائيات فورية لعدد الكلمات والأحرف في المستند',
      'زر نسخ سريع للحافظة بنقرة واحدة',
      'تصدير النص بصيغة TXT نظيفة'
    ],
    featuresEn: [
      'Extracts Arabic, English, and multilingual text',
      'Instant live word and character count stats',
      'One-click copy to clipboard',
      'Clean TXT file export'
    ],
    faqAr: [
      { question: 'هل يدعم ملفات PDF الممسوحة ضوئياً (صور)؟', answer: 'الأداة مخصصة لملفات PDF التي تحتوي على نصوص رقمية أصلية.' }
    ],
    faqEn: [
      { question: 'Does it support scanned image-only PDFs?', answer: 'This tool extracts native digital text layers. For pure scans, OCR is required.' }
    ],
    relatedToolSlugs: ['pdf-to-word', 'word-counter', 'character-counter']
  },
  {
    id: 'pdf-to-jpg',
    slug: 'pdf-to-jpg',
    category: 'pdf_documents',
    nameAr: 'تحويل PDF إلى صور JPG',
    nameEn: 'PDF to JPG Converter',
    nameFr: 'Convertir PDF en JPG',
    taglineAr: 'حوّل صفحات ملف PDF إلى صور JPG عالية الوضوح مجاناً',
    taglineEn: 'Convert PDF pages into high-resolution JPG images directly in your browser',
    descriptionAr: 'حوّل كل صفحة من مستند PDF الخاص بك إلى صورة JPG واضحة وعالية الجودة. مثالية لمشاركة العروض والشهادات عبر واتساب وشبكات التواصل.',
    descriptionEn: 'Turn PDF pages into crisp JPG images. Save individual slides, certificates, and reports for easy sharing.',
    icon: 'Image',
    seoTitleAr: 'تحويل PDF إلى صور JPG مجاناً وعالي الجودة | أدواتي AI',
    seoTitleEn: 'PDF to JPG Converter Online Free - Adawatai',
    seoDescriptionAr: 'حوّل صفحات مستند PDF إلى صور JPG عالية الدقة مجاناً وبدون رفع ملفاتك إلى خوادم خارجية. خصوصية وسرعة فائقة.',
    seoDescriptionEn: 'Convert PDF pages into high-resolution JPG images online for free. 100% private in-browser conversion.',
    keywords: ['تحويل pdf الى jpg', 'pdf to jpg', 'تحويل بي دي اف الى صور', 'حفظ pdf كصورة'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'اختر مستند PDF', desc: 'ارفع ملف PDF المراد تحويله.' },
      { step: 2, title: 'معاينة الصفحات', desc: 'يقوم النظام برسم ومعاينة الصفحات بدقة عالية.' },
      { step: 3, title: 'تحميل الصور', desc: 'حمّل الصور الفردية أو حزمة كاملة بضغطة زر.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Select PDF', desc: 'Upload the PDF you wish to convert.' },
      { step: 2, title: 'Preview Pages', desc: 'Browser renders pages at crisp resolution.' },
      { step: 3, title: 'Download Images', desc: 'Download individual JPGs or all pages.' }
    ],
    featuresAr: [
      'جودة صور نقية وعالية الدقة',
      'معالجة سريعة وآمنة داخل المتصفح',
      'تنزيل صفحات فردية أو جماعية',
      'دعم ملفات PDF متعددة الصفحات'
    ],
    featuresEn: [
      'High definition crisp image outputs',
      'Private client-side rendering',
      'Download individual or all pages',
      'Handles multi-page documents seamlessly'
    ],
    faqAr: [
      { question: 'هل الصور الناتجة واضحة بما يكفي للطباعة؟', answer: 'نعم، يتم تصيير الصفحات بدقة عالية تضمن قراءة النصوص والرسوم بوضوح.' }
    ],
    faqEn: [
      { question: 'Are output images high resolution?', answer: 'Yes, pages are rendered with high fidelity for clear reading and printing.' }
    ],
    relatedToolSlugs: ['jpg-to-pdf', 'image-to-pdf', 'merge-pdf']
  },
  {
    id: 'jpg-to-pdf',
    slug: 'jpg-to-pdf',
    category: 'pdf_documents',
    nameAr: 'تحويل الصور إلى PDF',
    nameEn: 'JPG to PDF Converter',
    nameFr: 'Convertir JPG en PDF',
    taglineAr: 'اجمع صورك ومستنداتك المصورة وحوّلها إلى ملف PDF أنيق وموحد',
    taglineEn: 'Convert JPG, PNG, and WebP images into a single clean PDF document',
    descriptionAr: 'أداة سهلة وسريعة لجمع الصور الشخصية، الإيصالات، والمستندات المصورة وتنسيقها في ملف PDF واحد متكامل جاهز للمشاركة والطباعة.',
    descriptionEn: 'Combine photos, scanned receipts, and image files into a single standardized PDF file in seconds.',
    icon: 'FileImage',
    seoTitleAr: 'تحويل الصور JPG إلى ملف PDF مجاناً | أدواتي AI',
    seoTitleEn: 'JPG to PDF Converter Online Free - Adawatai',
    seoDescriptionAr: 'حوّل صورك بصيغة JPG و PNG إلى ملف PDF موحد مجاناً وبدون برامج. تحكم في الهوامش وترتيب الصفحات بسهولة.',
    seoDescriptionEn: 'Convert JPG, PNG, and WebP images to PDF online for free. Arrange pages and set margins in seconds.',
    keywords: ['تحويل الصور الى pdf', 'jpg to pdf', 'تجميع الصور في ملف بي دي اف', 'تحويل jpg الى pdf'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'اختر الصور', desc: 'أضف صورة واحدة أو مجموعة صور من جهازك.' },
      { step: 2, title: 'رتّب وحسّن', desc: 'رتّب تسلسل الصفحات واختر اتجاه الصفحة والهوامش.' },
      { step: 3, title: 'إنشاء PDF', desc: 'اضغط على إنشاء PDF واحفظ الملف فوراً.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Upload Images', desc: 'Select one or more images from your device.' },
      { step: 2, title: 'Arrange & Configure', desc: 'Reorder pages, set margins and orientation.' },
      { step: 3, title: 'Generate PDF', desc: 'Click generate and download your clean PDF.' }
    ],
    featuresAr: [
      'دمج صور متعددة في ملف PDF واحد',
      'دعم صيغ JPG، PNG، و WebP',
      'إمكانية ضبط الهوامش وحجم الصفحة (A4)',
      'معالجة محلية بالكامل بدون رفع لبياناتك'
    ],
    featuresEn: [
      'Combines multiple images into a single PDF',
      'Supports JPG, PNG, and WebP image formats',
      'Adjustable margins and standard A4 sizing',
      '100% private, client-side generation'
    ],
    faqAr: [
      { question: 'هل يمكنني ترتيب الصور قبل دمجها؟', answer: 'نعم، يمكنك تحريك الصور للأعلى والأسفل لاختيار التسلسل المناسب.' }
    ],
    faqEn: [
      { question: 'Can I reorder pictures before creating the PDF?', answer: 'Yes, easily reorder pictures with intuitive move buttons.' }
    ],
    relatedToolSlugs: ['pdf-to-jpg', 'merge-pdf', 'compress-pdf']
  },
  {
    id: 'pdf-password-remover',
    slug: 'pdf-password-remover',
    category: 'pdf_documents',
    nameAr: 'إزالة كلمة مرور PDF',
    nameEn: 'PDF Password Remover',
    nameFr: 'Supprimer le mot de passe PDF',
    taglineAr: 'أزل كلمة المرور من ملفات PDF التي تملكها لتصفحها بحرية بدون قفل',
    taglineEn: 'Unlock and remove password restrictions from user-owned PDF documents',
    descriptionAr: 'إذا كنت تملك ملف PDF محمياً بكلمة مرور وترغب في إزالة القفل بشكل دائم لتسهيل القراءة والطباعة دون إعادة إدخال الرمز، تتيح لك هذه الأداة فتح وتصدير نسخة غير مشفرة بأمان داخل متصفحك.',
    descriptionEn: 'Remove password protection from your owned PDF files so you can view, print, and share them effortlessly.',
    icon: 'Unlock',
    seoTitleAr: 'إزالة كلمة مرور PDF للملفات المملوكة مجاناً | أدواتي AI',
    seoTitleEn: 'Remove PDF Password Online Free - Adawatai',
    seoDescriptionAr: 'أزل كلمة المرور وقيود القراءة والطباعة من ملفات PDF الخاصة بك مجاناً وبأمان تام داخل متصفحك بدون رفع أي ملفات.',
    seoDescriptionEn: 'Unlock your password-protected PDF documents online for free. Secure, in-browser decryption for user-owned files.',
    keywords: ['ازالة كلمة مرور pdf', 'فك قفل بي دي اف', 'unlock pdf', 'remove pdf password'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'اختر الملف المحمي', desc: 'حدد ملف PDF المقفل بكلمة مرور.' },
      { step: 2, title: 'أدخل كلمة المرور الحالية', desc: 'اكتب كلمة المرور التي تملكها لفك تشفير الملف محلياً.' },
      { step: 3, title: 'حفظ المستند غير المقفل', desc: 'احصل على نسخة حرة مفتوحة بدون حماية.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Upload Locked PDF', desc: 'Select the encrypted PDF document.' },
      { step: 2, title: 'Enter Current Password', desc: 'Type the valid password to decrypt the file locally.' },
      { step: 3, title: 'Download Unlocked PDF', desc: 'Save a clean, unencrypted copy permanently.' }
    ],
    featuresAr: [
      'إزالة دائمة للقيود دون المساس بمحتوى الملف',
      'معالجة سرية ومشفرة محلياً 100%',
      'متوافقة مع معايير الأمان القانونية للملفات الشخصية',
      'تصدير فوري بدون إعلانات إجبارية'
    ],
    featuresEn: [
      'Permanently removes locks while keeping content intact',
      '100% confidential and local decryption',
      'Safe for personal and business documents',
      'Instant export without intrusive delays'
    ],
    faqAr: [
      { question: 'هل يمكن كسر ملف لا أعرف كلمة مروره؟', answer: 'تتطلب الأداة إدخال كلمة المرور الصحيحة لفك التشفير قانونياً وأمنياً.' }
    ],
    faqEn: [
      { question: 'Can it unlock files if I forgot the password?', answer: 'The tool requires the valid password once to safely decrypt and export the unlocked copy.' }
    ],
    relatedToolSlugs: ['merge-pdf', 'compress-pdf', 'split-pdf']
  },
  {
    id: 'image-to-pdf',
    slug: 'image-to-pdf',
    category: 'pdf_documents',
    nameAr: 'دمج الصور في PDF',
    nameEn: 'Image to PDF Maker',
    nameFr: 'Créateur Image en PDF',
    taglineAr: 'حوّل أي صورة أو صور متعددة إلى مستند PDF جاهز للطباعة والمشاركة',
    taglineEn: 'Turn any image or batch of photos into a print-ready PDF document',
    descriptionAr: 'حوّل صور الوثائق، الفواتير، والبطاقات التعريفية إلى ملف PDF قياسي عالي الوضوح. تحكم بحجم الهوامش وجودة الإخراج بسهولة.',
    descriptionEn: 'Quickly convert single or multiple photos into a beautifully formatted PDF document. Clean layout and instant download.',
    icon: 'FilePlus',
    seoTitleAr: 'دمج الصور في ملف PDF مجاناً وبأعلى دقة | أدواتي AI',
    seoTitleEn: 'Image to PDF Maker Online Free - Adawatai',
    seoDescriptionAr: 'اصنع ملفات PDF من صورك مجاناً وبدون برامج. تحكم في الهوامش وترتيب الصفحات وحجم الورقة بسهولة تامة.',
    seoDescriptionEn: 'Combine your photos and scans into standard PDF files online for free. Fast, responsive, and 100% client-side.',
    keywords: ['دمج الصور في pdf', 'صنع pdf من الصور', 'image to pdf', 'تحويل الصور الى مستند'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'إضافة الصور', desc: 'اختر الصور التي تود تضمينها في المستند.' },
      { step: 2, title: 'ترتيب الصفحات', desc: 'نسق تسلسل الصور وهوامش الطباعة.' },
      { step: 3, title: 'تنزيل PDF', desc: 'اضغط على إنشاء المستند واحفظه فوراً.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Add Images', desc: 'Select the photos you want in your document.' },
      { step: 2, title: 'Adjust Settings', desc: 'Configure page order and printing margins.' },
      { step: 3, title: 'Download PDF', desc: 'Click generate and save your new file.' }
    ],
    featuresAr: [
      'دعم كافة صيغ الصور الشائعة (JPG, PNG, WebP)',
      'توليد ملفات PDF متوافقة مع معايير A4 العالمية',
      'سرعة فائقة ومعالجة آمنة داخل المتصفح',
      'حجم ملف متوازن بجودة عالية'
    ],
    featuresEn: [
      'Supports all standard formats (JPG, PNG, WebP)',
      'Standard A4 format output',
      'Ultra fast client-side generation',
      'Optimal balance of size and visual quality'
    ],
    faqAr: [
      { question: 'هل يقلل من دقة الصور؟', answer: 'تحتفظ الأداة بأعلى دقة ممكنة لضمان وضوح النصوص والأرقام.' }
    ],
    faqEn: [
      { question: 'Does it reduce image sharpness?', answer: 'No, high quality vector rendering ensures texts and graphics stay crisp.' }
    ],
    relatedToolSlugs: ['jpg-to-pdf', 'pdf-to-jpg', 'merge-pdf']
  },

  // ==========================================
  // IMAGE TOOLS
  // ==========================================
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    category: 'image_tools',
    nameAr: 'ضغط الصور وتقليل الحجم',
    nameEn: 'Image Compressor',
    nameFr: 'Compresseur d\'images',
    taglineAr: 'اضغط صور JPG و PNG و WebP بنسبة تصل إلى 90% مع الحفاظ على الجودة',
    taglineEn: 'Compress JPG, PNG, and WebP images up to 90% without losing visual quality',
    descriptionAr: 'أداة ذكية لضغط الصور وتقليل حجمها لتسريع تحميل المواقع وتوفير المساحة وتسهيل الإرسال عبر التطبيقات. معالجة سريعة وآمنة 100% داخل جهازك.',
    descriptionEn: 'Compress images and reduce file size with intelligent lossy & lossless algorithms right in your browser. Fast, private, and unlimited.',
    icon: 'ImageDown',
    seoTitleAr: 'ضغط الصور أونلاين مجاناً وتقليل الحجم | أدواتي AI',
    seoTitleEn: 'Free Image Compressor Online - Shrink JPG, PNG, WebP - Adawatai',
    seoDescriptionAr: 'اضغط صور JPG و PNG و WebP مجاناً وقلل حجمها بنسبة تصل إلى 90% مع الحفاظ على جودة الألوان والوضوح. معالجة سريعة وآمنة داخل المتصفح.',
    seoDescriptionEn: 'Compress images online for free. Reduce file size of JPG, PNG, and WebP images quickly while maintaining crisp quality.',
    keywords: ['ضغط الصور', 'image compressor', 'تقليل حجم الصور', 'تصغير حجم الصورة', 'ضغط jpg', 'ضغط png'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'اختر الصورة', desc: 'اسحب وأفلت الصورة أو اخترها من جهازك.' },
      { step: 2, title: 'تحكم بمستوى الجودة', desc: 'حرّك مؤشر الجودة لمعاينة الحجم الجديد ومقارنة الوضوح.' },
      { step: 3, title: 'تنزيل الصورة المضغوطة', desc: 'اضغط تحميل لحفظ صورتك المصغرة فوراً.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Select Image', desc: 'Drag and drop or browse for your image.' },
      { step: 2, title: 'Adjust Quality', desc: 'Use the quality slider to preview savings in real-time.' },
      { step: 3, title: 'Download Image', desc: 'Save your compressed image with one click.' }
    ],
    featuresAr: [
      'توفير مساحة يصل إلى 90% مع الحفاظ على وضوح التفاصيل',
      'معاينة حية للمقارنة قبل التحميل',
      'دعم كامل لصيغ JPG و PNG و WebP',
      'معالجة سرية بالكامل داخل المتصفح بدون أي رفع لخوادم'
    ],
    featuresEn: [
      'Save up to 90% file size while preserving fine details',
      'Live real-time preview and size comparison',
      'Full support for JPG, PNG, and WebP formats',
      '100% private: images never leave your browser'
    ],
    faqAr: [
      { question: 'هل تتأثر أبعاد الصورة؟', answer: 'لا، تظل أبعاد الصورة (الطول والعرض) كما هي بالضبط، ويتم فقط ضغط بيانات الألوان.' },
      { question: 'هل توجد قيود على عدد الصور؟', answer: 'لا قيود إطلاقاً، يمكنك ضغط أي عدد من الصور مجاناً.' }
    ],
    faqEn: [
      { question: 'Are dimensions affected?', answer: 'No, pixel dimensions remain identical; only compression byte streams are optimized.' }
    ],
    relatedToolSlugs: ['resize-image', 'image-converter', 'image-cropper']
  },
  {
    id: 'resize-image',
    slug: 'resize-image',
    category: 'image_tools',
    nameAr: 'تغيير حجم وأبعاد الصور',
    nameEn: 'Resize Image',
    nameFr: 'Redimensionner une image',
    taglineAr: 'غيّر أبعاد صورك بالبكسل أو بالنسبة المئوية مع الحفاظ على تناسق العرض والارتفاع',
    taglineEn: 'Change image dimensions in pixels or percentage with aspect ratio lock',
    descriptionAr: 'أداة سهلة وسريعة لتغيير مقاسات الصور بدقة عالية. حدد العرض والارتفاع المطلوبين أو صغّر بنسبة مئوية مخصصة لتلائم متطلبات مواقع التواصل والوثائق الرسمية.',
    descriptionEn: 'Resize photos to exact pixel dimensions or percentages with aspect ratio preservation. Fast, high-fidelity in-browser rendering.',
    icon: 'Maximize2',
    seoTitleAr: 'تغيير حجم ومقاسات الصور أونلاين مجاناً | أدواتي AI',
    seoTitleEn: 'Free Image Resizer Online - Change Dimensions - Adawatai',
    seoDescriptionAr: 'غيّر مقاسات الصور بالبكسل أو النسبة المئوية مجاناً وبسرعة فائقة. حافظ على تناسق الأبعاد وجودة التفاصيل.',
    seoDescriptionEn: 'Resize images online for free. Set exact pixel width and height or scale by percentage with aspect ratio lock.',
    keywords: ['تغيير حجم الصورة', 'resize image', 'تصغير مقاس الصورة', 'تعديل ابعاد الصورة بالبكسل'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'ارفع صورتك', desc: 'اختر الصورة المراد تغيير مقاسها.' },
      { step: 2, title: 'حدد المقاسات', desc: 'اكتب العرض والارتفاع أو اختر نسبة مئوية (مثل 50%).' },
      { step: 3, title: 'تحميل الصورة', desc: 'اضغط تطبيق وحمّل صورتك بالمقاس الجديد.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Upload Image', desc: 'Select the image you want to resize.' },
      { step: 2, title: 'Set Dimensions', desc: 'Enter width & height in pixels or scale by percentage.' },
      { step: 3, title: 'Download Image', desc: 'Download your resized image instantly.' }
    ],
    featuresAr: [
      'قفل نسبة التناسب (Aspect Ratio) لمنع تشوه الصورة',
      'خيارات قياس سريعة بالبكسل أو بالنسبة المئوية',
      'خوارزمية تنعيم متطورة للمحافظة على حدة التفاصيل',
      'معالجة محلية وسريعة بدون رفع ملفات'
    ],
    featuresEn: [
      'Aspect ratio lock prevents image distortion',
      'Quick scaling by pixels or percentage',
      'Bicubic interpolation keeps edges sharp',
      'Zero uploads - private and immediate'
    ],
    faqAr: [
      { question: 'ما هو قفل نسبة التناسب؟', answer: 'هو خيار يضمن تعديل الارتفاع تلقائياً عند تغيير العرض لمنع تمدد الصورة أو تشوهها.' }
    ],
    faqEn: [
      { question: 'What does aspect ratio lock do?', answer: 'It automatically recalculates height when you change width so your image is never stretched.' }
    ],
    relatedToolSlugs: ['image-compressor', 'image-cropper', 'image-converter']
  },
  {
    id: 'jpg-to-png',
    slug: 'jpg-to-png',
    category: 'image_tools',
    nameAr: 'تحويل JPG إلى PNG',
    nameEn: 'JPG to PNG Converter',
    nameFr: 'Convertisseur JPG en PNG',
    taglineAr: 'حوّل صور JPG إلى صيغة PNG عالية الجودة وغير مضغوطة بضغطة زر',
    taglineEn: 'Convert JPG images into lossless PNG format with crisp clarity',
    descriptionAr: 'حوّل صورك من صيغة JPG إلى صيغة PNG النقية لدعم الرسومات، المخططات، والتصميمات التي تتطلب جودة غير منقوصة دون فقدان أي بيانات لونية.',
    descriptionEn: 'Convert JPG photos to PNG format for lossless visual fidelity and graphic design readiness.',
    icon: 'Repeat',
    seoTitleAr: 'تحويل JPG إلى PNG مجاناً وبأعلى جودة | أدواتي AI',
    seoTitleEn: 'JPG to PNG Converter Online Free - Adawatai',
    seoDescriptionAr: 'حوّل صور JPG إلى PNG مجاناً وبدون فقدان في الجودة. أداة سريعة وآمنة تعمل داخل المتصفح بدون برامج.',
    seoDescriptionEn: 'Convert JPG to PNG online for free. Fast, high-fidelity lossless image conversion with zero uploads.',
    keywords: ['تحويل jpg الى png', 'jpg to png', 'تحويل صيغة الصورة الى png'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'اختر صورة JPG', desc: 'حدد الصورة المراد تحويلها.' },
      { step: 2, title: 'التحويل التلقائي', desc: 'يقوم المحرك برسم الصورة بأعلى عمق لوني.' },
      { step: 3, title: 'تحميل PNG', desc: 'احفظ ملف PNG الجديد مباشرة.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Select JPG', desc: 'Choose the JPG photo to convert.' },
      { step: 2, title: 'Instant Processing', desc: 'Browser renders the image into a PNG buffer.' },
      { step: 3, title: 'Download PNG', desc: 'Save your clean PNG file.' }
    ],
    featuresAr: [
      'تصدير بصيغة PNG النقية غير المضغوطة',
      'حفظ أقصى عمق للألوان',
      'سرعة تحويل فورية',
      'أمان تام وخصوصية على جهازك'
    ],
    featuresEn: [
      'Lossless uncompressed PNG output',
      'Full 24-bit color depth preservation',
      'Instant client-side speed',
      'Private and secure'
    ],
    faqAr: [
      { question: 'هل تصبح الصورة شفافة تلقائياً؟', answer: 'صيغة JPG لا تحتوي على خلفية شفافة في الأصل، ولكن صيغة PNG الناتجة ستكون مهيأة للقص والتعديل.' }
    ],
    faqEn: [
      { question: 'Does it make the background transparent?', answer: 'Original JPGs do not have transparency, but the output PNG is ready for editing.' }
    ],
    relatedToolSlugs: ['png-to-jpg', 'jpg-to-webp', 'image-converter']
  },
  {
    id: 'png-to-jpg',
    slug: 'png-to-jpg',
    category: 'image_tools',
    nameAr: 'تحويل PNG إلى JPG',
    nameEn: 'PNG to JPG Converter',
    nameFr: 'Convertisseur PNG en JPG',
    taglineAr: 'حوّل صور PNG الكبيرة إلى JPG خفيفة الحجم وسريعة المشاركة',
    taglineEn: 'Convert heavy PNG images into lightweight JPG files for easy sharing',
    descriptionAr: 'حوّل صور PNG ذات الحجم الكبير إلى ملفات JPG مضغوطة وخفيفة مع إمكانية تحديد لون خلفية مخصص عند استبدال المناطق الشفافة.',
    descriptionEn: 'Transform heavy PNG images into compact JPG files with customizable background color filling.',
    icon: 'Repeat',
    seoTitleAr: 'تحويل PNG إلى JPG مجاناً وتقليل الحجم | أدواتي AI',
    seoTitleEn: 'PNG to JPG Converter Online Free - Adawatai',
    seoDescriptionAr: 'حوّل صور PNG إلى JPG مجاناً وبأعلى جودة وسرعة. وفّر المساحة وسرّع تحميل الصور داخل المتصفح.',
    seoDescriptionEn: 'Convert PNG to JPG online for free. Shrink image file size with customized background color handling.',
    keywords: ['تحويل png الى jpg', 'png to jpg', 'تحويل الصور الى جي بي جي'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'اختر صورة PNG', desc: 'حدد الصورة المراد تحويلها.' },
      { step: 2, title: 'ضبط الجودة والخلفية', desc: 'اختر لون الخلفية (أبيض أو أسود) للشفافية.' },
      { step: 3, title: 'تنزيل JPG', desc: 'احفظ صورة JPG المضغوطة فوراً.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Select PNG', desc: 'Upload your PNG image.' },
      { step: 2, title: 'Configure Output', desc: 'Select background fill for transparent areas.' },
      { step: 3, title: 'Download JPG', desc: 'Save your compressed JPG.' }
    ],
    featuresAr: [
      'تقليل كبير في حجم الملف لتسريع المواقع',
      'ملء ذكي للمناطق الشفافة باللون الأبيض النقي',
      'تحكم بمستوى الجودة ونسبة الضغط',
      'معالجة محلية سريعة 100%'
    ],
    featuresEn: [
      'Substantial file size savings',
      'Clean background fills for transparent pixels',
      'Quality and compression controls',
      'Fast 100% client-side processing'
    ],
    faqAr: [
      { question: 'ماذا يحدث للأجزاء الشفافة في صورة PNG؟', answer: 'يتم ملؤها تلقائياً بخلفية بيضاء نظيفة لأن صيغة JPG لا تدعم الشفافية.' }
    ],
    faqEn: [
      { question: 'What happens to transparency?', answer: 'It is cleanly filled with a crisp background (default white) since JPG does not support transparency.' }
    ],
    relatedToolSlugs: ['jpg-to-png', 'webp-to-jpg', 'image-compressor']
  },
  {
    id: 'jpg-to-webp',
    slug: 'jpg-to-webp',
    category: 'image_tools',
    nameAr: 'تحويل JPG إلى WebP',
    nameEn: 'JPG to WebP Converter',
    nameFr: 'Convertisseur JPG en WebP',
    taglineAr: 'حوّل صور JPG إلى صيغة WebP الحديثة فائقة السرعة لتحسين السيو وموقعك',
    taglineEn: 'Convert JPG images to next-gen WebP format for faster web speed and SEO',
    descriptionAr: 'صيغة WebP هي صيغة الويب الحديثة المعتمدة من Google لتقليل حجم الصور بنسبة تصل إلى 35% أكثر من JPG مع الحفاظ على نفس الجودة لتسريع صفحات الويب وتحسين نتائج السيو.',
    descriptionEn: 'Convert JPG to modern Google WebP format. Save up to 35% bandwidth with identical visual clarity for maximum SEO speed.',
    icon: 'Zap',
    seoTitleAr: 'تحويل JPG إلى WebP أونلاين لتسريع المواقع | أدواتي AI',
    seoTitleEn: 'JPG to WebP Converter Online Free - Adawatai',
    seoDescriptionAr: 'حوّل صور JPG إلى WebP مجاناً وسرّع موقعك الإلكتروني بنسبة تصل إلى 35%. معالجة فورية داخل المتصفح.',
    seoDescriptionEn: 'Convert JPG to WebP online for free. Next-gen image format conversion for ultra-fast websites and better SEO.',
    keywords: ['تحويل jpg الى webp', 'jpg to webp', 'صيغة webp', 'تسريع الصور webp'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'اختر صورة JPG', desc: 'حدد الصورة المراد ترقيتها إلى WebP.' },
      { step: 2, title: 'اختر الجودة', desc: 'تحكم بمعدل الضغط والمعاينة الفورية.' },
      { step: 3, title: 'تحميل WebP', desc: 'احصل على صورة فائقة الخفة والسرعة.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Select JPG', desc: 'Choose the image to convert.' },
      { step: 2, title: 'Adjust Quality', desc: 'Pick your preferred compression level.' },
      { step: 3, title: 'Download WebP', desc: 'Save your modern lightweight image.' }
    ],
    featuresAr: [
      'توفير حتى 35% من حجم الملف مقارنة بـ JPG',
      'معتمدة رسمياً وموصى بها في اختبارات Google PageSpeed',
      'تحميل فوري بدون خوادم خارجية',
      'مناسبة لأصحاب المواقع والمتاجر الإلكترونية'
    ],
    featuresEn: [
      'Saves up to 35% more data than standard JPG',
      'Recommended by Google PageSpeed Insights',
      'Instant local browser conversion',
      'Essential for webmasters and e-commerce stores'
    ],
    faqAr: [
      { question: 'لماذا يُنصح باستخدام صيغة WebP للمواقع؟', answer: 'لأنها تمنحك نفس وضوح الصورة بحجم أصغر بكثير، مما يجعل موقعك يفتح بسرعة أكبر ويرتفع في نتائج بحث Google.' }
    ],
    faqEn: [
      { question: 'Why is WebP recommended?', answer: 'It offers identical fidelity at significantly lower file weights, boosting website load times.' }
    ],
    relatedToolSlugs: ['webp-to-jpg', 'image-compressor', 'image-converter']
  },
  {
    id: 'webp-to-jpg',
    slug: 'webp-to-jpg',
    category: 'image_tools',
    nameAr: 'تحويل WebP إلى JPG',
    nameEn: 'WebP to JPG Converter',
    nameFr: 'Convertisseur WebP en JPG',
    taglineAr: 'حوّل صور WebP التي حمّلتها من الإنترنت إلى JPG للتوافق مع البرامج القديمة',
    taglineEn: 'Convert downloaded WebP images to universal JPG format for any program',
    descriptionAr: 'إذا قمت بتحميل صور بصيغة WebP ولم تتمكن من فتحها في بعض البرامج أو إرسالها لجهات معينة، تتيح لك هذه الأداة تحويلها فوراً إلى صيغة JPG القياسية المتوافقة مع جميع الأجهزة.',
    descriptionEn: 'Easily convert WebP images back into standard JPG format for universal compatibility with legacy photo editors and viewers.',
    icon: 'Repeat',
    seoTitleAr: 'تحويل WebP إلى JPG مجاناً وبسرعة فائقة | أدواتي AI',
    seoTitleEn: 'WebP to JPG Converter Online Free - Adawatai',
    seoDescriptionAr: 'حوّل صور WebP إلى JPG مجاناً للتوافق مع برامج التصميم وجميع الأجهزة. أداة سريعة وآمنة بدون برامج.',
    seoDescriptionEn: 'Convert WebP to JPG online for free. Guaranteed compatibility across all photo viewers and mobile devices.',
    keywords: ['تحويل webp الى jpg', 'webp to jpg', 'فتح صور webp', 'تحويل صيغة ويب بي'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'اختر صورة WebP', desc: 'حدد الصورة المراد تحويلها.' },
      { step: 2, title: 'تحويل فوري', desc: 'يقوم المتصفح بفك التشفير وتوليد JPG.' },
      { step: 3, title: 'حفظ الصورة', desc: 'حمّل صورة JPG المتوافقة مع كافة البرامج.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Select WebP', desc: 'Pick the WebP image to convert.' },
      { step: 2, title: 'Fast Conversion', desc: 'Browser decodes and generates standard JPG.' },
      { step: 3, title: 'Download JPG', desc: 'Save your universally compatible image.' }
    ],
    featuresAr: [
      'توافق شامل 100% مع جميع برامج التعديل والهواتف',
      'حفظ ألوان الصورة وتفاصيلها بدقة',
      'سرعة فائقة في أجزاء من الثانية',
      'أمان وخصوصية كاملة على جهازك'
    ],
    featuresEn: [
      '100% universal compatibility across all editors',
      'Preserves original color and contrast',
      'Sub-second instant conversion',
      'Completely private on your device'
    ],
    faqAr: [
      { question: 'لماذا لا تفتح بعض الصور بصيغة WebP على جهازي؟', answer: 'لأن بعض برامج عارض الصور القديمة ومحررات الفيديو لا تدعم بعد فك تشفير WebP، وتحويلها إلى JPG يحل المشكلة فوراً.' }
    ],
    faqEn: [
      { question: 'Why don\'t some apps open WebP?', answer: 'Older software may lack WebP decoders; converting to JPG ensures universal support.' }
    ],
    relatedToolSlugs: ['jpg-to-webp', 'image-converter', 'resize-image']
  },
  {
    id: 'image-cropper',
    slug: 'image-cropper',
    category: 'image_tools',
    nameAr: 'قص واقتطاع الصور',
    nameEn: 'Image Cropper',
    nameFr: 'Recadrer une image',
    taglineAr: 'اقتطع جزءاً من الصورة وقص الحواف بدقة عالية وبنسب أبعاد مخصصة',
    taglineEn: 'Crop images with precision boxes and popular social media aspect ratios',
    descriptionAr: 'أداة قص صور تفاعلية تتيح لك قص الأطراف غير المرغوب فيها واختيار نسب أبعاد قياسية (1:1 مربع، 16:9 شاشة عريضة، 4:3، أو حر) لحساباتك ومشاريعك.',
    descriptionEn: 'Interactive in-browser image cropper. Crop unwanted borders and export with preset aspect ratios (1:1, 16:9, 4:3, or free).',
    icon: 'Crop',
    seoTitleAr: 'قص الصور أونلاين وتحديد المقاسات مجاناً | أدواتي AI',
    seoTitleEn: 'Free Image Cropper Online - Crop Photos - Adawatai',
    seoDescriptionAr: 'قص وتعديل مقاسات صورك أونلاين مجاناً. اقتطع الأجزاء المهمة بدقة وبنسب أبعاد مخصصة للسوشيال ميديا.',
    seoDescriptionEn: 'Crop photos online for free. Custom aspect ratios (1:1, 16:9, 4:3) and freehand cropping with instant download.',
    keywords: ['قص الصور', 'image cropper', 'اقتصاص الصورة', 'تعديل حواف الصورة', 'قص مربع'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'اختر الصورة', desc: 'حدد الصورة التي ترغب في قصها.' },
      { step: 2, title: 'حدد مربع القص', desc: 'اسحب الإطار لتحديد المنطقة المطلوبة أو اختر نسبة مسبقة.' },
      { step: 3, title: 'قص وتنزيل', desc: 'اضغط على قص واحفظ النتيجة فوراً.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Select Image', desc: 'Upload the photo you want to crop.' },
      { step: 2, title: 'Adjust Box', desc: 'Drag crop handles or choose a preset aspect ratio.' },
      { step: 3, title: 'Crop & Save', desc: 'Click crop and download the trimmed image.' }
    ],
    featuresAr: [
      'نسب أبعاد شائعة جاهزة (مربع، 16:9، 4:3، حر)',
      'إطار قص تفاعلي وسلس بالسحب والإفلات',
      'حفظ الجودة العالية للجزء المقتطع',
      'خصوصية تامة بدون رفع الصورة لأي خادم'
    ],
    featuresEn: [
      'Presets for social media (1:1, 16:9, 4:3, free)',
      'Smooth interactive dragging and resizing handles',
      'Maintains full resolution of cropped region',
      '100% private in-browser canvas rendering'
    ],
    faqAr: [
      { question: 'هل يمكن القص بشكل مربع للصورة الشخصية؟', answer: 'نعم، ما عليك سوى اختيار نسبة 1:1 وستحصل على قص مربع مثالي.' }
    ],
    faqEn: [
      { question: 'Can I crop to a square for profile avatars?', answer: 'Yes, select the 1:1 preset for a perfect square crop.' }
    ],
    relatedToolSlugs: ['resize-image', 'image-compressor', 'favicon-generator']
  },
  {
    id: 'image-converter',
    slug: 'image-converter',
    category: 'image_tools',
    nameAr: 'محول صيغ الصور الشامل',
    nameEn: 'All-in-One Image Converter',
    nameFr: 'Convertisseur d\'images universel',
    taglineAr: 'حوّل أي صورة بين صيغ JPG و PNG و WebP بنقرة واحدة وبأعلى دقة',
    taglineEn: 'Convert any image between JPG, PNG, and WebP with a single click',
    descriptionAr: 'محول صيغ شامل ومرن يتيح لك التبديل السريع بين جميع صيغ الصور الرئيسية (JPG, PNG, WebP) مع إمكانية معاينة الحجم الجديد والتحكم بنقاء الإخراج.',
    descriptionEn: 'Universal client-side image converter supporting JPG, PNG, and WebP formats. Clean, fast, and multi-format conversion.',
    icon: 'RefreshCw',
    seoTitleAr: 'محول صيغ الصور أونلاين مجاناً (JPG, PNG, WebP) | أدواتي AI',
    seoTitleEn: 'All-in-One Image Converter Online Free - Adawatai',
    seoDescriptionAr: 'حوّل صيغ الصور بين JPG و PNG و WebP مجاناً وبأعلى دقة. أداة شاملة وسريعة تعمل داخل المتصفح بأمان تام.',
    seoDescriptionEn: 'Convert photos between JPG, PNG, and WebP online for free. Multi-format image conversion with zero uploads.',
    keywords: ['محول صيغ الصور', 'image converter', 'تحويل صيغة صورة', 'تحويل بين png و jpg و webp'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'ارفع صورتك', desc: 'اختر الصورة من أي صيغة مدعومة.' },
      { step: 2, title: 'اختر الصيغة المستهدفة', desc: 'حدد الصيغة المرغوبة (PNG أو JPG أو WebP).' },
      { step: 3, title: 'تحميل فوري', desc: 'اضغط تحويل واحفظ ملفك بالصيغة الجديدة.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Upload Photo', desc: 'Select an image in any supported format.' },
      { step: 2, title: 'Pick Format', desc: 'Select target format (PNG, JPG, or WebP).' },
      { step: 3, title: 'Download', desc: 'Click convert and download your converted photo.' }
    ],
    featuresAr: [
      'تبديل سريع بين جميع الصيغ الشائعة',
      'حفظ أقصى دقة وجودة للألوان',
      'معاينة حية للصيغة وحجم الملف قبل التنزيل',
      'معالجة سرية وسريعة على جهازك'
    ],
    featuresEn: [
      'Fast switching between all popular image formats',
      'Preserves original sharpness and colors',
      'Live size and format preview',
      'Private, local, zero-upload tool'
    ],
    faqAr: [
      { question: 'ما هي أفضل صيغة للمواقع الإلكترونية؟', answer: 'صيغة WebP هي الأفضل لسرعة المواقع، بينما PNG ممتازة للرسومات الشفافة و JPG للصور الفوتوغرافية.' }
    ],
    faqEn: [
      { question: 'Which format is best for web?', answer: 'WebP offers the best speed/quality ratio, PNG for transparency, and JPG for photos.' }
    ],
    relatedToolSlugs: ['jpg-to-png', 'png-to-jpg', 'jpg-to-webp', 'image-compressor']
  },
  {
    id: 'image-dpi-calculator',
    slug: 'image-dpi-calculator',
    category: 'image_tools',
    nameAr: 'حاسبة دقة الطباعة DPI',
    nameEn: 'Image DPI & Print Calculator',
    nameFr: 'Calculateur DPI d\'image',
    taglineAr: 'احسب مقاس الطباعة بالسنتيمتر والبوصة بناءً على دقة بكسل الصورة و DPI',
    taglineEn: 'Calculate print size in cm and inches based on pixel resolution and DPI',
    descriptionAr: 'أداة حاسبة متخصصة للمصممين والطباعة. احسب الحجم الفعلي للطباعة (بالسنتيمتر والبوصة) بناءً على دقة الصورة بالبكسل، أو اعرف عدد البكسلات المطلوبة للطباعة بدقة 300 DPI الاحترافية.',
    descriptionEn: 'Calculate actual print dimensions in cm and inches from pixel resolution and DPI. Essential for print design and photography.',
    icon: 'Calculator',
    seoTitleAr: 'حاسبة دقة الطباعة DPI ومقاسات الصور بالسنتيمتر | أدواتي AI',
    seoTitleEn: 'Image DPI & Print Size Calculator Online - Adawatai',
    seoDescriptionAr: 'احسب مقاسات طباعة الصور بالسنتيمتر والبوصة بدقة 300 DPI و 150 DPI مجاناً. أداة دقيقة للمصممين والمطابع.',
    seoDescriptionEn: 'Calculate image print sizes in cm and inches from pixel dimensions and DPI. Free tool for designers and photographers.',
    keywords: ['حاسبة dpi', 'حساب مقاس الطباعة بالبكسل', 'image dpi calculator', 'طباعة 300 dpi', 'تحويل البكسل الى سم'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'أدخل أبعاد البكسل', desc: 'اكتب عرض وارتفاع الصورة بالبكسل أو ارفع صورتك لقراءتها آلياً.' },
      { step: 2, title: 'اختر قيمة DPI', desc: 'اختر دقة الطباعة (300 DPI للطباعة الفاخرة، 150 DPI للملصقات، 72 DPI للشاشات).' },
      { step: 3, title: 'عرض النتائج', desc: 'شاهد الأبعاد الدقيقة بالسنتيمتر، المليمتر، والبوصة فوراً.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Enter Pixels', desc: 'Enter width & height or upload an image to read its dimensions.' },
      { step: 2, title: 'Select DPI', desc: 'Pick target DPI (300 for fine print, 150 for posters, 72 for screen).' },
      { step: 3, title: 'View Sizes', desc: 'Read exact dimensions in centimeters, millimeters, and inches.' }
    ],
    featuresAr: [
      'قراءة أبعاد الصور المرفوعة تلقائياً',
      'حساب فوري للأبعاد بالسنتيمتر (cm) والمليمتر (mm) والبوصة (inch)',
      'إرشادات لمعايير جودة الطباعة القياسية (300 DPI للمجلات والكتب)',
      'حاسبة عكسية: احسب البكسل المطلوب لمقاس سم معين'
    ],
    featuresEn: [
      'Automatically detects uploaded image dimensions',
      'Real-time output in centimeters, millimeters, and inches',
      'Guidance for standard print metrics (300 DPI magazines, 150 DPI posters)',
      'Reverse calculator: calculate needed pixels from target cm'
    ],
    faqAr: [
      { question: 'لماذا تعتبر 300 DPI هي المعيار الذهبي للطباعة؟', answer: 'لأن العين البشرية لا تستطيع تمييز النقاط المنفصلة عند 300 نقطة في البوصة، مما ينتج طباعة فائقة النعومة والحدة.' }
    ],
    faqEn: [
      { question: 'Why is 300 DPI standard for print?', answer: 'At 300 dots per inch, individual print dots are indistinguishable to the human eye, resulting in razor-sharp imagery.' }
    ],
    relatedToolSlugs: ['resize-image', 'image-cropper', 'favicon-generator']
  },
  {
    id: 'favicon-generator',
    slug: 'favicon-generator',
    category: 'image_tools',
    nameAr: 'مولد أيقونات المواقع Favicon',
    nameEn: 'Favicon & App Icon Generator',
    nameFr: 'Générateur de Favicon',
    taglineAr: 'اصنع أيقونة Favicon احترافية لموقعك بجميع المقاسات القياسية وحمّلها بحزمة واحدة',
    taglineEn: 'Generate favicon icons in standard sizes (16x16, 32x32, 192x192, 512x512) for web and PWA',
    descriptionAr: 'حوّل شعارك أو صورتك إلى حزمة أيقونات Favicon متكاملة تناسب جميع المتصفحات، وهواتف أبل وأندرويد وتطبيقات الويب التقدمية PWA مع كود HTML جاهز للنسخ.',
    descriptionEn: 'Create multi-size favicon packages (16x16, 32x32, 180x180, 192x192, 512x512) with ready-to-paste HTML code.',
    icon: 'Sparkles',
    seoTitleAr: 'توليد أيقونة الموقع Favicon مجاناً لجميع المقاسات | أدواتي AI',
    seoTitleEn: 'Free Favicon Generator Online - Multi-Size Icons - Adawatai',
    seoDescriptionAr: 'اصنع أيقونات Favicon احترافية لموقعك الإلكتروني بجميع المقاسات مجاناً. كود HTML جاهز وتنزيل فوري.',
    seoDescriptionEn: 'Generate favicon packages online for free. Create multi-size icons for websites, Apple touch icons, and Android PWA.',
    keywords: ['مولد favicon', 'favicon generator', 'ايقونة الموقع', 'صنع favicon', 'ايقونة المتصفح'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'ارفع شعارك', desc: 'اختر صورة مربعة أو شعاراً واضحاً.' },
      { step: 2, title: 'معاينة المقاسات', desc: 'شاهد معاينة لشكل الأيقونة في تبويب المتصفح وشاشات الهواتف.' },
      { step: 3, title: 'تنزيل الحزمة وكود HTML', desc: 'حمّل المقاسات وانسخ وسوم الرأس (meta tags) لموقعك.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Upload Logo', desc: 'Select a clean square graphic or logo.' },
      { step: 2, title: 'Preview Sizes', desc: 'Preview tab appearance across desktop and mobile.' },
      { step: 3, title: 'Download & Copy HTML', desc: 'Save PNG icons and copy the embed code.' }
    ],
    featuresAr: [
      'توليد المقاسات القياسية: 16x16 و 32x32 و 180x180 و 192x192 و 512x512',
      'معاينة فورية لطريقة ظهور الأيقونة في شريط المتصفح',
      'كود HTML جاهز للنسخ واللصق في وسم <head>',
      'دعم ملفات PNG الشفافة والصور العادية'
    ],
    featuresEn: [
      'Standard sizes: 16x16, 32x32, 180x180 (Apple), 192x192, 512x512',
      'Live interactive preview of browser tab mockup',
      'Ready-to-use HTML code snippet for <head>',
      'Full support for transparent PNG assets'
    ],
    faqAr: [
      { question: 'ما هو المقاس الأفضل للشعار المرفوع؟', answer: 'يُفضل رفع صورة مربعة بدقة 512x512 بكسل أو أعلى لضمان أعلى وضوح في كافة المقاسات المصغرة.' }
    ],
    faqEn: [
      { question: 'What is the best source image size?', answer: 'A 512x512 transparent PNG is optimal to scale down crisply to all dimensions.' }
    ],
    relatedToolSlugs: ['image-cropper', 'resize-image', 'qr-code-generator']
  },
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    category: 'image_tools',
    nameAr: 'مولد رموز الاستجابة السريعة QR Code',
    nameEn: 'QR Code Generator',
    nameFr: 'Générateur de QR Code',
    taglineAr: 'أنشئ باركود QR Code مخصص للروابط والنصوص والواتساب والواي فاي وحمّله فوراً',
    taglineEn: 'Generate custom QR codes for URLs, text, WhatsApp, and WiFi with instant download',
    descriptionAr: 'أداة مجانية واحترافية لتوليد رموز QR Code لجميع الاستخدامات: الروابط، أرقام الهواتف، رسائل الواتساب، شبكات الواي فاي، والبطاقات التعريفية مع تخصيص الألوان والتنزيل بجودة عالية.',
    descriptionEn: 'Create custom QR codes for links, plain text, WhatsApp chats, and WiFi logins. Customizable colors and high-res image download.',
    icon: 'QrCode',
    seoTitleAr: 'إنشاء باركود QR Code مجاناً للروابط والواتساب | أدواتي AI',
    seoTitleEn: 'Free QR Code Generator Online - Adawatai',
    seoDescriptionAr: 'أنشئ رموز QR Code مخصصة للروابط والواتساب والواي فاي مجاناً وبدون انتهاء صلاحية. تحكم بالألوان وحمّل الباركود فوراً.',
    seoDescriptionEn: 'Generate custom QR codes online for free. Create permanent QR codes for URLs, text, WiFi, and WhatsApp with custom colors.',
    keywords: ['توليد qr code', 'انشاء باركود', 'qr code generator', 'صانع كيو ار كود', 'باركود واتساب'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'اختر نوع المحتوى', desc: 'حدد رابط، نص، رسالة واتساب، أو شبكة واي فاي.' },
      { step: 2, title: 'أدخل البيانات وخصص الألوان', desc: 'اكتب الرابط واختر لون الباركود ولون الخلفية.' },
      { step: 3, title: 'تحميل QR Code', desc: 'حمّل الصورة بصيغة PNG عالية الدقة فوراً.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Choose Content Type', desc: 'Select URL, plain text, WhatsApp, or WiFi credentials.' },
      { step: 2, title: 'Customize', desc: 'Enter your data and pick custom foreground & background colors.' },
      { step: 3, title: 'Download QR Code', desc: 'Save high-resolution PNG image immediately.' }
    ],
    featuresAr: [
      'رموز دائمة 100% بدون أي انتهاء صلاحية وبدون اشتراكات',
      'تخصيص الألوان (لون الرمز ولون الخلفية)',
      'دعم روابط المواقع، نصوص، رسائل واتساب، وشبكات WiFi',
      'تحميل بصيغة PNG عالية الدقة قابلة للطباعة على الكروت والملصقات'
    ],
    featuresEn: [
      '100% permanent QR codes with no expiration dates',
      'Custom color themes for foreground and background',
      'Supports URLs, text notes, WhatsApp links, and WiFi configs',
      'High-resolution PNG export suitable for printed banners and cards'
    ],
    faqAr: [
      { question: 'هل تنتهي صلاحية رمز الـ QR Code المنشأ هنا؟', answer: 'لا تنتهي صلاحيته أبداً! يتم ترميز البيانات مباشرة داخل الرمز دون روابط وسيطة أو قيود.' },
      { question: 'هل يعمل على جميع الهواتف وكاميرات الذكاء الاصطناعي؟', answer: 'نعم، الرمز قياسي ومعتمد دولياً ويعمل على كافة كاميرات هواتف iPhone وأندرويد.' }
    ],
    faqEn: [
      { question: 'Do these QR codes expire?', answer: 'Never! Data is encoded directly into the matrix, so it works forever without third-party redirection.' }
    ],
    relatedToolSlugs: ['favicon-generator', 'image-compressor', 'slug-generator']
  },

  // ==========================================
  // TEXT TOOLS
  // ==========================================
  {
    id: 'word-counter',
    slug: 'word-counter',
    category: 'text_tools',
    nameAr: 'عداد الكلمات والأحرف المتقدم',
    nameEn: 'Word & Character Counter',
    nameFr: 'Compteur de mots et de caractères',
    taglineAr: 'احسب عدد الكلمات، الأحرف، الجمل، ووقت القراءة والإلقاء مع تحليل الكلمات المفتاحية',
    taglineEn: 'Count words, characters, sentences, reading time, and keyword density in real time',
    descriptionAr: 'محرر عداد كلمات متطور للكتّاب، الطلاب، والمدونين. يحسب الكلمات بدقة، الأحرف مع وبدون مسافات، الفقرات، وقت القراءة المقدر، وقت الإلقاء الصوتي، وكثافة الكلمات الأكثر تكراراً.',
    descriptionEn: 'Advanced text statistics analyzer. Real-time counter for words, characters, paragraphs, reading time, speaking time, and keyword density.',
    icon: 'FileText',
    seoTitleAr: 'عداد الكلمات والأحرف المتقدم أونلاين مجاناً | أدواتي AI',
    seoTitleEn: 'Free Word and Character Counter Online - Adawatai',
    seoDescriptionAr: 'احسب عدد الكلمات والأحرف والفقرات ووقت القراءة بدقة فورية. أداة مجانية ممتازة للمقالات والبحوث ومنشورات التواصل.',
    seoDescriptionEn: 'Count words, characters, paragraphs, and reading time online for free. Accurate, real-time statistics with keyword density.',
    keywords: ['عداد الكلمات', 'word counter', 'حساب عدد الاحرف', 'كم كلمة في النص', 'وقت القراءة'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'اكتب أو الصق النص', desc: 'ألصق مقالك أو بحثك في صندوق النص.' },
      { step: 2, title: 'متابعة الإحصائيات الحية', desc: 'تظهر النتائج فوراً: كلمات، أحرف، جمل، وفقرات.' },
      { step: 3, title: 'فحص التكرار والأوقات', desc: 'اطلع على وقت القراءة والكثافة اللغوية للكلمات.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Paste or Type Text', desc: 'Enter your article or text into the editor.' },
      { step: 2, title: 'Live Statistics', desc: 'Word, character, sentence, and paragraph counts update instantly.' },
      { step: 3, title: 'Read & Speak Times', desc: 'Review estimated reading time and top frequent keywords.' }
    ],
    featuresAr: [
      'حساب فوري للكلمات والأحرف مع وبدون مسافات',
      'تقدير دقيق لوقت القراءة ووقت التحدث والإلقاء',
      'تحليل الكلمات الأكثر تكراراً (كثافة السيو)',
      'زر نسخ سريع وزر مسح النص بلمسة واحدة'
    ],
    featuresEn: [
      'Live count for words, characters with/without spaces',
      'Estimated reading and speaking duration',
      'Keyword density frequency breakdown',
      'One-click copy and clear buttons'
    ],
    faqAr: [
      { question: 'كيف يُحسب وقت القراءة؟', answer: 'يُحسب بناءً على المعدل العالمي للقراءة للبالغين (حوالي 200 كلمة في الدقيقة).' }
    ],
    faqEn: [
      { question: 'How is reading time estimated?', answer: 'Based on the average human reading speed of 200 words per minute.' }
    ],
    relatedToolSlugs: ['character-counter', 'case-converter', 'text-cleaner', 'remove-duplicate-lines']
  },
  {
    id: 'character-counter',
    slug: 'character-counter',
    category: 'text_tools',
    nameAr: 'عداد الأحرف والرموز وحدود النشر',
    nameEn: 'Character Counter & Social Limits',
    nameFr: 'Compteur de caractères',
    taglineAr: 'احسب عدد الحروف وتحقق من حدود التغريد (X) وسيو العناوين والوصف',
    taglineEn: 'Count exact characters and check Twitter/X, Meta title, and SMS limits in real time',
    descriptionAr: 'أداة متخصصة لحساب الأحرف بدقة لمعرفة مدى توافق نصوصك مع حدود منصات التواصل: تغريدات X (280 حرف)، عناوين السيو (60 حرف)، الوصف التعريفي (160 حرف)، ورسائل SMS.',
    descriptionEn: 'Check character counts against strict social and SEO limits: Twitter/X (280), Meta Title (60), Meta Description (160), and SMS (160).',
    icon: 'Hash',
    seoTitleAr: 'عداد الأحرف والرموز وحدود النشر في السوشيال ميديا | أدواتي AI',
    seoTitleEn: 'Character Counter & Social Limits Online - Adawatai',
    seoDescriptionAr: 'احسب عدد الأحرف مع المسافات وبدونها وتحقق من حدود التغريدات وعناوين السيو مجاناً. أداة دقيقة وسريعة.',
    seoDescriptionEn: 'Count characters and spaces online. Monitor Twitter/X, SEO Meta, and SMS character limits in real time.',
    keywords: ['عداد الاحرف', 'character counter', 'كم حرف في النص', 'حدود التغريدة', 'احرف السيو'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'ألصق النص', desc: 'أدخل جملك أو عنوانك المراد قياسه.' },
      { step: 2, title: 'شاهد أشرطة التقدم', desc: 'تحقق من عداد X (تويتر) وسيو العناوين والوصف.' },
      { step: 3, title: 'نسخ النص المنقح', desc: 'اضبط النص ليتناسب مع الحد المطلوب وانسخه فوراً.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Type or Paste Text', desc: 'Enter your headline, tweet, or message.' },
      { step: 2, title: 'Check Limit Bars', desc: 'Inspect progress bars for Twitter/X (280), Meta Title (60), and Meta Desc (160).' },
      { step: 3, title: 'Copy Optimized Text', desc: 'Copy your fine-tuned text with one click.' }
    ],
    featuresAr: [
      'مؤشرات حية لحدود تويتر/إكس (280 حرف)',
      'مؤشرات لحدود عنوان السيو (60 حرف) والوصف (160 حرف)',
      'فصل دقيق بين الأحرف مع المسافات وبدون مسافات',
      'حساب عدد الأرقام والرموز الخاصة'
    ],
    featuresEn: [
      'Real-time status indicators for Twitter/X (280 chars)',
      'SEO title (60 chars) and meta description (160 chars) indicators',
      'Precise split between characters with and without spaces',
      'Counts digits, punctuation, and special symbols'
    ],
    faqAr: [
      { question: 'كم عدد أحرف عنوان السيو المثالي لـ Google؟', answer: 'يُفضل ألا يتجاوز عنوان الصفحة 60 حرفاً حتى لا يقتطعه محرك بحث Google في نتائج البحث.' }
    ],
    faqEn: [
      { question: 'What is the optimal SEO title length?', answer: 'Around 50 to 60 characters ensures your headline does not get truncated on Google SERPs.' }
    ],
    relatedToolSlugs: ['word-counter', 'slug-generator', 'case-converter']
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    category: 'text_tools',
    nameAr: 'محول حالة الأحرف الإنجليزية (Case Converter)',
    nameEn: 'Letter Case Converter',
    nameFr: 'Convertisseur de casse de texte',
    taglineAr: 'حوّل النصوص بين الحروف الكبيرة، الصغيرة، العناوين، camelCase، و snake_case',
    taglineEn: 'Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more',
    descriptionAr: 'أداة تحويل حالة الأحرف الإنجليزية الأكثر شمولاً. بدّل نصوصك بضغطة زر بين: أحرف كبيرة (UPPERCASE)، أحرف صغيرة (lowercase)، حالة الجملة (Sentence case)، حالة العناوين (Title Case)، وأنساق البرمجة (camelCase, snake_case, kebab-case, PascalCase).',
    descriptionEn: 'Easily change English text case between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case.',
    icon: 'Type',
    seoTitleAr: 'محول حالة الأحرف الكبيرة والصغيرة Title Case أونلاين | أدواتي AI',
    seoTitleEn: 'Letter Case Converter Online Free - UPPERCASE, lowercase, camelCase - Adawatai',
    seoDescriptionAr: 'حوّل حالة النصوص الإنجليزية إلى أحرف كبيرة، صغيرة، حالة العناوين، أو صيغ البرمجة مجاناً وبضغطة زر.',
    seoDescriptionEn: 'Convert letter case online for free. Transform text into UPPERCASE, lowercase, Title Case, camelCase, and snake_case.',
    keywords: ['تحويل حالة الاحرف', 'case converter', 'حروف كبيرة وصغيرة', 'uppercase to lowercase', 'camelCase'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'ألصق النص الإنجليزي', desc: 'اكتب أو الصق النص المراد تحويله.' },
      { step: 2, title: 'اختر النمط المطلوب', desc: 'اضغط على زر النمط: UPPERCASE، Title Case، camelCase، إلخ.' },
      { step: 3, title: 'نسخ النتيجة', desc: 'انسخ النص المعدل فوراً بنقرة زر.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Enter Text', desc: 'Paste the text you want to transform.' },
      { step: 2, title: 'Select Case', desc: 'Click any style: UPPERCASE, lowercase, Title Case, camelCase, etc.' },
      { step: 3, title: 'Copy Result', desc: 'Copy the transformed text instantly.' }
    ],
    featuresAr: [
      'يدعم كافة أنماط الكتابة: UPPERCASE, lowercase, Sentence case, Title Case',
      'يدعم أنساق البرمجة: camelCase, snake_case, kebab-case, PascalCase',
      'نمط التناوب الطريف (aLtErNaTiNg cAsE)',
      'معالجة فورية وتحديث سريع'
    ],
    featuresEn: [
      'Supports standard formats: UPPERCASE, lowercase, Sentence case, Title Case',
      'Developer coding cases: camelCase, snake_case, kebab-case, PascalCase',
      'Fun alternating case toggle (aLtErNaTiNg cAsE)',
      'Instant sub-millisecond conversion'
    ],
    faqAr: [
      { question: 'ما هو نمط Title Case؟', answer: 'هو النمط الذي يبدأ فيه كل كلمة رئيسية بحرف كبير، وهو المعيار في عناوين المقالات والكتب الإنجليزية.' }
    ],
    faqEn: [
      { question: 'What is Title Case?', answer: 'Title Case capitalizes the first letter of each major word, standard for article and book headlines.' }
    ],
    relatedToolSlugs: ['slug-generator', 'word-counter', 'text-cleaner']
  },
  {
    id: 'remove-duplicate-lines',
    slug: 'remove-duplicate-lines',
    category: 'text_tools',
    nameAr: 'حذف وتصفية الأسطر المكررة',
    nameEn: 'Remove Duplicate Lines',
    nameFr: 'Supprimer les lignes en double',
    taglineAr: 'نظّف قوائمك وبياناتك من التكرار واحذف الأسطر المكررة والفارغة فوراً',
    taglineEn: 'Clean lists and data by stripping duplicate lines and empty rows instantly',
    descriptionAr: 'أداة سريعة وقوية لتنقية القوائم، الإيميلات، الكلمات المفتاحية، والأكواد من التكرار. تحذف جميع الأسطر المكررة بضغطة زر مع إمكانية فرز النتائج وحذف الأسطر الفارغة.',
    descriptionEn: 'Deduplicate text lists, email databases, and keyword banks. Remove duplicate and blank lines in one click.',
    icon: 'ListFilter',
    seoTitleAr: 'حذف الأسطر المكررة من النصوص والقوائم أونلاين | أدواتي AI',
    seoTitleEn: 'Remove Duplicate Lines Online Free - Text Deduplicator - Adawatai',
    seoDescriptionAr: 'احذف الأسطر المكررة من النصوص والقوائم وقوائم الإيميلات مجاناً. أداة سريعة بدون برامج للحصول على بيانات نظيفة وفريدة.',
    seoDescriptionEn: 'Remove duplicate lines from text and lists online for free. Keep unique lines, remove empty spaces, and sort results.',
    keywords: ['حذف الاسطر المكررة', 'remove duplicate lines', 'تصفية النصوص', 'تنظيف القوائم', 'استخراج العناصر الفريدة'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'الصق القائمة أو النص', desc: 'ألصق البيانات أو قائمة العناصر المراد تنقيتها.' },
      { step: 2, title: 'اختر خيارات التنظيف', desc: 'حدد حذف الأسطر الفارغة أو حساسية حالة الأحرف.' },
      { step: 3, title: 'نسخ القائمة النقية', desc: 'شاهد عدد الأسطر المكررة المحذوفة وانسخ قائمتك الفريدة.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Paste Your List', desc: 'Enter the text or data lines you want to clean.' },
      { step: 2, title: 'Configure Options', desc: 'Toggle empty line removal and case sensitivity.' },
      { step: 3, title: 'Copy Unique Lines', desc: 'View how many duplicates were purged and copy your clean list.' }
    ],
    featuresAr: [
      'حذف فوري لكافة العناصر المكررة مع الحفاظ على أول ظهور',
      'إحصائيات واضحة: عدد الأسطر الأصلية، المكررة، والنهائية',
      'خيار إزالة الأسطر الفارغة والمسافات الزائدة',
      'خيار الفرز التلقائي أبجدياً'
    ],
    featuresEn: [
      'Instant removal of all duplicate occurrences',
      'Clear statistics: original, duplicated, and final line counts',
      'Option to strip blank lines and leading/trailing whitespace',
      'Optional automatic alphabetical sorting'
    ],
    faqAr: [
      { question: 'هل يحافظ على الترتيب الأصلي للأسطر؟', answer: 'نعم، يتم الاحتفاظ بالترتيب الأصلي لكل عنصر في أول ظهور له ما لم تختر خيار الفرز الأبجدي.' }
    ],
    faqEn: [
      { question: 'Does it preserve original order?', answer: 'Yes, the first occurrence of each unique line remains in its original position unless you choose to sort.' }
    ],
    relatedToolSlugs: ['text-sorter', 'text-cleaner', 'word-counter']
  },
  {
    id: 'text-sorter',
    slug: 'text-sorter',
    category: 'text_tools',
    nameAr: 'ترتيب وفرز النصوص والقوائم',
    nameEn: 'Text & List Sorter',
    nameFr: 'Trier du texte et des listes',
    taglineAr: 'رتّب الأسطر والكلمات أبجدياً (أ-ي أو A-Z) تصاعدياً أو تنازلياً أو حسب الطول',
    taglineEn: 'Sort text lines alphabetically (A-Z or Z-A), by length, or reverse order',
    descriptionAr: 'أداة فرز وترتيب سريعة تتيح لك ترتيب القوائم، الكلمات، والأسطر أبجدياً من الألف إلى الياء، أو عكسياً، أو حسب طول النص، أو بنظام الأرقام الطبيعي مع دعم كامل للغة العربية والإنجليزية.',
    descriptionEn: 'Sort any list or text lines alphabetically (A-Z, Z-A), numerically, or by length. Works seamlessly with Arabic and Latin scripts.',
    icon: 'ArrowUpDown',
    seoTitleAr: 'ترتيب النصوص والأسطر أبجدياً أونلاين مجاناً | أدواتي AI',
    seoTitleEn: 'Alphabetical Text Sorter Online Free - Adawatai',
    seoDescriptionAr: 'رتّب النصوص والقوائم أبجدياً تصاعدياً أو تنازلياً مجاناً وبضغطة زر. أداة دقيقة تدعم الحروف العربية والإنجليزية والأرقام.',
    seoDescriptionEn: 'Sort text and lists alphabetically online for free. Sort ascending, descending, by length, or natural number order.',
    keywords: ['ترتيب النصوص ابجديا', 'text sorter', 'فرز الاسطر', 'ترتيب الكلمات من الالف الى الياء', 'alphabetical sort'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'ألصق قائمتك', desc: 'أدخل الأسطر المراد ترتيبها.' },
      { step: 2, title: 'اختر طريقة الترتيب', desc: 'اختر: أبجدي تصاعدي (أ-ي)، تنازلي (ي-أ)، حسب الطول، أو عشوائي.' },
      { step: 3, title: 'نسخ القائمة المرتبة', desc: 'احصل على قائمتك المنظمة وانسخها بنقرة واحدة.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Paste Your Lines', desc: 'Input the text lines to be sorted.' },
      { step: 2, title: 'Choose Sorting Mode', desc: 'Pick A-Z, Z-A, length, natural numbers, or random shuffle.' },
      { step: 3, title: 'Copy Sorted Output', desc: 'Copy your sorted list with one click.' }
    ],
    featuresAr: [
      'ترتيب أبجدي عربي وإنجليزي دقيق (A-Z و Z-A)',
      'ترتيب طبيعي للأرقام (1, 2, 10 بدلاً من 1, 10, 2)',
      'ترتيب حسب طول السطر (من الأقصر للأطول والعكس)',
      'خيار خلط عشوائي (Shuffle) لإنشاء قرعة أو تنويع'
    ],
    featuresEn: [
      'Precise alphabetical sorting for Arabic and English',
      'Natural number sorting (1, 2, 10 instead of 1, 10, 2)',
      'Sort by line length (shortest to longest and vice versa)',
      'Random shuffle mode for raffles and variety'
    ],
    faqAr: [
      { question: 'هل يدعم الترتيب الحروف العربية المشكولة؟', answer: 'نعم، يتعامل بذكاء مع الأبجدية العربية وترتيب الهمزات والحروف القياسية.' }
    ],
    faqEn: [
      { question: 'Does natural sort work on numbers?', answer: 'Yes! It intelligently handles numbered items so item 10 comes after item 9, not after item 1.' }
    ],
    relatedToolSlugs: ['remove-duplicate-lines', 'text-cleaner', 'word-counter']
  },
  {
    id: 'text-cleaner',
    slug: 'text-cleaner',
    category: 'text_tools',
    nameAr: 'منظف النصوص وإزالة الفراغات',
    nameEn: 'Text Cleaner & Sanitizer',
    nameFr: 'Nettoyeur de texte',
    taglineAr: 'نظّف النصوص من الفراغات المكررة، وسوم HTML، الأسطر الفارغة، والرموز الزائدة',
    taglineEn: 'Clean text by stripping extra spaces, empty lines, HTML tags, and unwanted characters',
    descriptionAr: 'أداة تنظيف النصوص الاحترافية لإصلاح النصوص المنسوخة من ملفات PDF أو المواقع. تزيل المسافات الزائدة، وتدمج الأسطر المكسورة، وتزيل وسوم HTML، وتنقي النص ليصبح جاهزاً للنشر.',
    descriptionEn: 'Sanitize messy text copied from PDFs, websites, or emails. Strip extra whitespace, tabs, HTML tags, and broken line breaks.',
    icon: 'Sparkles',
    seoTitleAr: 'تنظيف النصوص وإزالة المسافات الزائدة أونلاين | أدواتي AI',
    seoTitleEn: 'Free Text Cleaner Online - Strip Extra Spaces & HTML - Adawatai',
    seoDescriptionAr: 'نظّف نصوصك من الفراغات الزائدة والأسطر الفارغة ووسوم HTML بضغطة زر. أداة مجانية وسريعة لإعداد نصوص خالية من الشوائب.',
    seoDescriptionEn: 'Clean up messy text online for free. Strip extra spaces, remove empty lines, unwrap paragraphs, and strip HTML tags.',
    keywords: ['تنظيف النصوص', 'text cleaner', 'ازالة المسافات الزائدة', 'حذف وسوم html', 'ازالة الاسطر الفارغة'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'ألصق النص المشوش', desc: 'ضع النص المنسوخ من PDF أو موقع ويب.' },
      { step: 2, title: 'فعّل خيارات التنظيف', desc: 'اختر: إزالة المسافات المزدوجة، حذف وسوم HTML، دمج الأسطر المكسورة.' },
      { step: 3, title: 'نسخ النص المنقى', desc: 'انسخ النص النظيف والصحيح مباشرة.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Paste Messy Text', desc: 'Paste text from a PDF, web page, or document.' },
      { step: 2, title: 'Select Cleaners', desc: 'Toggle double-space removal, HTML tag stripping, and line break fixes.' },
      { step: 3, title: 'Copy Clean Text', desc: 'Copy your polished, purified text.' }
    ],
    featuresAr: [
      'إزالة المسافات المكررة وعلامات التبويب الزائدة',
      'حذف وسوم ولغات البرمجة (HTML / XML tags)',
      'إصلاح الأسطر المكسورة ودمج الفقرات',
      'إزالة التشكيل العربي أو الرموز التعبيرية اختيارياً'
    ],
    featuresEn: [
      'Removes extra consecutive spaces and tabs',
      'Strips HTML and XML markup cleanly',
      'Unwraps hard line breaks to restore smooth paragraphs',
      'Optional Arabic diacritics (tashkeel) or emoji remover'
    ],
    faqAr: [
      { question: 'هل تفيد الأداة في إصلاح نصوص PDF المنسوخة؟', answer: 'نعم جداً، لأن نسخ النصوص من PDF غالباً ما يضيف فواصل أسطر ومسافات مزعجة تقوم الأداة بدمجها وتصحيحها فوراً.' }
    ],
    faqEn: [
      { question: 'Is it helpful for text copied from PDFs?', answer: 'Extremely! It removes the abrupt hard line breaks and double spaces typical of PDF copies.' }
    ],
    relatedToolSlugs: ['word-counter', 'remove-duplicate-lines', 'slug-generator']
  },
  {
    id: 'slug-generator',
    slug: 'slug-generator',
    category: 'text_tools',
    nameAr: 'مولد الروابط الصديقة للسيو (URL Slug)',
    nameEn: 'URL Slug Generator',
    nameFr: 'Générateur de Slug d\'URL',
    taglineAr: 'حوّل عناوين المقالات والنصوص إلى روابط URL نظيفة وصديقة لمحركات البحث (SEO Slug)',
    taglineEn: 'Convert titles and phrases into clean, SEO-friendly URL slugs for blogs and websites',
    descriptionAr: 'أنشئ روابط URL نظيفة ومثالية لمقالات مدونتك، صفحات موقعك، ومنتجاتك. تدعم الأداة تحويل العناوين العربية إلى Slug عربي نظيف مع فواصل، أو تعريبه وترجمته إلى حروف لاتينية إنجليزية مطابقة لمعايير السيو.',
    descriptionEn: 'Generate SEO-friendly URL slugs from any headline or title. Supports clean Arabic hyphenated slugs or Latin transliteration.',
    icon: 'Link2',
    seoTitleAr: 'مولد روابط السيو URL Slug Generator أونلاين | أدواتي AI',
    seoTitleEn: 'URL Slug Generator Online Free - SEO Friendly - Adawatai',
    seoDescriptionAr: 'حوّل عناوين مقالاتك إلى روابط URL نظيفة ومحسنة لمحركات البحث مجاناً. يدعم الروابط العربية والإنجليزية بدون رموز مشوهة.',
    seoDescriptionEn: 'Generate clean, SEO-optimized URL slugs online for free. Transform headlines into clean hyphen-separated slugs in seconds.',
    keywords: ['مولد slug', 'url slug generator', 'روابط السيو', 'تحويل العنوان الى رابط', 'slug عربي'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'اكتب عنوان المقال', desc: 'أدخل عنوان مقالك أو اسم المنتج.' },
      { step: 2, title: 'اختر الفاصل والنمط', desc: 'اختر فاصل الشرطة (-) أو الشرطة السفلية (_) ونمط الأحرف.' },
      { step: 3, title: 'نسخ الرابط الجاهز', desc: 'انسخ الـ Slug الصديق لـ Google والصقه في موقعك.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Enter Headline', desc: 'Type your blog title, article name, or product label.' },
      { step: 2, title: 'Pick Separator', desc: 'Choose hyphens (-) or underscores (_) and case style.' },
      { step: 3, title: 'Copy Clean Slug', desc: 'Copy your Google-ready URL slug with one click.' }
    ],
    featuresAr: [
      'توليد روابط عربية نظيفة بدون رموز %20 المشوهة',
      'خيار تعريب العنوان إلى أحرف إنجليزية ذكية',
      'إزالة علامات الترقيم والأقواس وحروف الجر الزائدة',
      'تخصيص الفاصل: شرطة (-) أو شرطة سفلية (_)'
    ],
    featuresEn: [
      'Creates clean URL paths without unsightly %20 percent-encoding',
      'Optional transliteration of non-Latin characters',
      'Strips punctuation, brackets, and redundant stop words',
      'Customizable separators (hyphen or underscore)'
    ],
    faqAr: [
      { question: 'ما هو الفاصل المفضل لدى Google في روابط السيو؟', answer: 'توصي Google دائماً باستخدام الشرطة العادية (-) بدلاً من الشرطة السفلية (_) لأنها تعتبرها فاصلاً بين الكلمات المستقلة.' }
    ],
    faqEn: [
      { question: 'Does Google prefer hyphens or underscores?', answer: 'Google officially recommends hyphens (-) because its algorithms interpret them as word dividers.' }
    ],
    relatedToolSlugs: ['case-converter', 'word-counter', 'text-cleaner']
  },
  {
    id: 'lorem-ipsum-generator',
    slug: 'lorem-ipsum-generator',
    category: 'text_tools',
    nameAr: 'مولد النصوص الوهمية (Lorem Ipsum عربي ولاتيني)',
    nameEn: 'Lorem Ipsum & Dummy Text Generator',
    nameFr: 'Générateur de Lorem Ipsum',
    taglineAr: 'ولّد نصوصاً وفقرات وهمية جاهزة للتصميم والمعاينة باللغتين العربية واللاتينية',
    taglineEn: 'Generate placeholder dummy text and paragraphs in Arabic and Latin for design mockups',
    descriptionAr: 'أداة توليد نصوص بديلة (Placeholder Dummy Text) للمصممين ومطوري المواقع. اختر عدد الفقرات أو الكلمات أو القوائم، مع دعم النص اللاتيني الكلاسيكي (Lorem Ipsum) والنص العربي النموذجي لملء قوالب التصميم.',
    descriptionEn: 'Generate dummy placeholder text for website mockups, graphic designs, and wireframes. Choose paragraphs, words, or lists in Arabic or Latin.',
    icon: 'FileCode2',
    seoTitleAr: 'توليد نص لوريم إيبسوم عربي ولاتيني أونلاين | أدواتي AI',
    seoTitleEn: 'Lorem Ipsum Generator Online - Arabic & Latin Placeholder - Adawatai',
    seoDescriptionAr: 'ولّد نصوصاً وهمية وفقرات لوريم إيبسوم بالعربية والإنجليزية لتصاميمك مجاناً. اختر عدد الكلمات والفقرات وانسخ فوراً.',
    seoDescriptionEn: 'Generate Lorem Ipsum dummy text in Arabic and Latin online for free. Custom paragraphs, words, and bullet points for designers.',
    keywords: ['لوريم ايبسوم عربي', 'lorem ipsum generator', 'نص وهمي للتصميم', 'توليد نص تجريبي', 'dummy text'],
    isClientSide: true,
    howToUseAr: [
      { step: 1, title: 'اختر اللغة والنوع', desc: 'اختر لوريم إيبسوم عربي أو لاتيني، وحدد فقرات أو كلمات أو قوائم.' },
      { step: 2, title: 'حدد الكمية المطلوبة', desc: 'اختر عدد الفقرات (1 إلى 20) أو عدد الكلمات.' },
      { step: 3, title: 'نسخ النص', desc: 'انسخ النص البديل والصقه مباشرة في مشروع التصميم الخاص بك.' }
    ],
    howToUseEn: [
      { step: 1, title: 'Select Language & Type', desc: 'Pick Arabic or Latin, and choose paragraphs, words, or lists.' },
      { step: 2, title: 'Set Count', desc: 'Choose the number of paragraphs (1 to 20) or words.' },
      { step: 3, title: 'Copy Text', desc: 'Copy the dummy text and paste it into your layout mockup.' }
    ],
    featuresAr: [
      'دعم كامل لنص عربي فصيح ومتناسق لملء القوالب',
      'النص اللاتيني الكلاسيكي المعتمد عالمياً (Lorem Ipsum)',
      'توليد فقرات، جمل، كلمات، أو قوائم تعداد نقطي',
      'زر نسخ سريع بلمسة واحدة لسهولة النقل للفوتوشوب والفيجما'
    ],
    featuresEn: [
      'High-quality flowing Arabic placeholder text',
      'Classic standard Latin Lorem Ipsum text',
      'Generate paragraphs, single sentences, words, or bullet lists',
      'One-click instant copy ready for Figma, Photoshop, and code'
    ],
    faqAr: [
      { question: 'لماذا يُستخدم لوريم إيبسوم في التصميم؟', answer: 'لأنه يمنح القارئ توزيعاً طبيعياً للحروف والفقرات دون أن ينشغل بقراءة المعنى الحقيقي للنص، مما يسمح بالتركيز على جودة التصميم والخطوط.' }
    ],
    faqEn: [
      { question: 'Why use placeholder text?', answer: 'It mimics natural letter distribution so clients and designers can evaluate layout and typography without getting distracted by content.' }
    ],
    relatedToolSlugs: ['word-counter', 'character-counter', 'case-converter']
  }
];

export const getDigitalToolBySlug = (slug: string): DigitalTool | undefined => {
  const normalized = slug.toLowerCase().trim();
  return DIGITAL_TOOLS.find(
    (tool) => tool.slug.toLowerCase() === normalized || tool.id.toLowerCase() === normalized
  );
};

export const DIGITAL_TOOLS_REGISTRY = DIGITAL_TOOLS;

export const getDigitalToolsByCategory = (category: string): DigitalTool[] => {
  if (category === 'all') return DIGITAL_TOOLS;
  return DIGITAL_TOOLS.filter((tool) => tool.category === category);
};

// Helper to convert DigitalTool to the AiTool interface format for directory compatibility
export const digitalToolToAiTool = (d: DigitalTool): any => {
  return {
    id: d.id,
    nameAr: d.nameAr,
    nameEn: d.nameEn,
    taglineAr: d.taglineAr,
    descriptionAr: d.descriptionAr,
    category: d.category,
    pricing: 'free',
    pricingAr: 'مجاني بالكامل 100%',
    pricingDetailsAr: 'أداة مجانية تعمل بالكامل في المتصفح، بدون حدود وبدون اشتراك.',
    websiteUrl: `/tools/${d.slug}`,
    rating: 4.9,
    reviewsCount: 150 + Math.floor(d.id.length * 12),
    tags: d.keywords || [],
    isPopular: true,
    isFeatured: true,
    supportsArabic: true,
    platforms: ['Web', 'Mobile', 'Chrome', 'Safari'],
    pros: d.featuresAr || [],
    cons: [],
    useCases: [d.taglineAr],
    addedDate: '2026-03-01',
    gradient: 'from-indigo-600 to-violet-700',
    isDigitalTool: true,
    digitalToolSlug: d.slug
  };
};

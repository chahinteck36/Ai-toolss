import { PromptItem, PromptCategoryKey } from '../types';

export interface PromptCategoryInfo {
  id: PromptCategoryKey;
  nameAr: string;
  iconName: string;
  descriptionAr: string;
  count?: number;
}

export const PROMPT_CATEGORIES: PromptCategoryInfo[] = [
  {
    id: 'all',
    nameAr: 'جميع الأوامر',
    iconName: 'Sparkles',
    descriptionAr: 'استكشف كافة الأوامر والبرومبتات الحصرية'
  },
  {
    id: 'writing',
    nameAr: 'كتابة ومحتوى',
    iconName: 'PenTool',
    descriptionAr: 'مقالات، سيناريوهات، إعادة صياغة، تدقيق لغوي وبوستات'
  },
  {
    id: 'marketing',
    nameAr: 'تسويق وإعلانات',
    iconName: 'Megaphone',
    descriptionAr: 'إعلانات، خطط نمو، بريد إلكتروني، واستراتيجيات مبيعات'
  },
  {
    id: 'coding',
    nameAr: 'برمجة وتطوير',
    iconName: 'Code',
    descriptionAr: 'كتابة كود، مراجعة وتصحيح، تصميم قواعد بيانات وشروحات'
  },
  {
    id: 'design_art',
    nameAr: 'توليد صور وفنون',
    iconName: 'Palette',
    descriptionAr: 'برومبتات Midjourney, DALL-E, Flux وشعارات وخلفيات'
  },
  {
    id: 'business',
    nameAr: 'إدارة وأعمال',
    iconName: 'Briefcase',
    descriptionAr: 'دراسات جدوى، تحليل منافسين، عروض تقديمية، ومفاوضات'
  },
  {
    id: 'education',
    nameAr: 'تعليم وبحث',
    iconName: 'GraduationCap',
    descriptionAr: 'تلخيص أبحاث، شرح مفاهيم معقدة، خطط دراسية واختبارات'
  },
  {
    id: 'productivity',
    nameAr: 'إنتاجية وتنظيم',
    iconName: 'CheckCircle',
    descriptionAr: 'إدارة وقت، جداول يومية، تنظيم مهام، وتفريغ ذهني'
  }
];

export const INITIAL_PROMPTS: PromptItem[] = [
  // 1. كتابة ومحتوى
  {
    id: 'prompt-seo-article-arabic',
    titleAr: 'كتابة مقال عربي متوافق 100% مع SEO',
    category: 'writing',
    categoryAr: 'كتابة ومحتوى',
    targetTools: ['ChatGPT', 'Claude', 'Gemini'],
    promptText: `أريدك أن تعمل كخبير محترف في تحسين محركات البحث (SEO Copywriter) باللغة العربية.
اكتب مقالاً شاملاً وجذاباً عن: [الموضوع أو الكلمة المفتاحية الرئيسية].

الشروط والمعايير المطلوبة:
1. صياغة عنوان H1 جذاب وغني بالكلمة المفتاحية.
2. مقدمة مشوقة بنموذج (Hook - Problem - Promise) بدون حشو إنشائي.
3. استخدام عناوين فرعية H2 و H3 منظمة منطقياً تغطي كل نواحي الموضوع.
4. توزيع الكلمات المفتاحية الثانوية: [أدخل 3-4 كلمات ثانوية هنا] بشكل طبيعي وانسيابي.
5. تضمين قائمة نقطية (Bullet Points) وجدول مقارنة سريع إذا كان ذلك مناسباً.
6. فقرة أسئلة شائعة (FAQ) مكونة من 3 أسئلة مع إجابات دقيقة ومباشرة.
7. خاتمة تلخص أهم النقاط ودعوة واضحة لاتخاذ إجراء (Call to Action).
8. أسلوب عربي سليم، لغة فصيحة عصرية، خالية من الركاكة والترجمة الحرفية.`,
    instructionAr: 'استبدل [الموضوع] بالكلمة الرئيسية وضع الكلمات المرادفة لتحصل على مقال مهيأ لتصدر نتائج جوجل فوراً.',
    tags: ['سيو', 'محتوى عربي', 'مقالات', 'تصدر نتائج البحث'],
    difficulty: 'متوسط',
    isPopular: true,
    isFeatured: true,
    copyCount: 1420,
    outputPreviewAr: 'ينتج مقالاً منظماً بعناوين H2/H3 وجدول مقارنة مع قسم أسئلة شائعة مهيأ لمقتطفات جوجل المميزة.'
  },
  {
    id: 'prompt-viral-linkedin-post',
    titleAr: 'صناعة منشور فيروسي احترافي لـ LinkedIn',
    category: 'writing',
    categoryAr: 'كتابة ومحتوى',
    targetTools: ['ChatGPT', 'Claude'],
    promptText: `أنت كاتب محتوى خبير في خوارزميات لينكدإن وتفاعل المنشورات المهنية.
اكتب منشور لينكدإن تفاعلي حول التجربة أو الموضوع التالي: [اكتب الفكرة أو التجربة بإيجاز].

الهيكل المطلوب:
- السطر الأول (Hook): جملة قصيرة صادمة أو تثير الفضول تدفع القارئ للنقر على "عرض المزيد / see more".
- صلب المنشور: قصة أو 4 نقاط عملية قابلة للتطبيق مباشرة بأسلوب سطور متباعدة ومريحة للعين.
- الدرس المستفاد: خلاصة عميقة ومفيدة للقارئ.
- سؤال تفاعلي في النهاية يشجع المتابعين على التعليق ومشاركة آرائهم.
- 3-4 وسوم (Hashtags) متخصصة وذات صلة.
- النبرة: شخصية، ملهمة، واحترافية بدون مبالغة أو تصنع.`,
    instructionAr: 'أدخل ملخص فكرتك أو إنجازك وسينتج منشوراً منسقاً بسطور متباعدة لجلب أقصى تفاعل.',
    tags: ['لينكدإن', 'سوشيال ميديا', 'كتابة محتوى', 'Viral Post'],
    difficulty: 'مبتدئ',
    isPopular: true,
    copyCount: 980
  },
  {
    id: 'prompt-video-script-reels',
    titleAr: 'سيناريو ريلز وتيك توك سريع وجذاب (Short Script)',
    category: 'writing',
    categoryAr: 'كتابة ومحتوى',
    targetTools: ['ChatGPT', 'Claude', 'Gemini'],
    promptText: `أنت صانع محتوى وسيناريست محترف لفيديوهات السوشيال ميديا القصيرة (Reels / TikTok / Shorts).
اكتب سكريبت فيديو مدته 45-60 ثانية عن: [فكرة الفيديو أو الأداة أو النصيحة].

قسّم السكريبت إلى جدول يحتوي على 3 أعمدة:
1. التوقيت (بالثواني).
2. المشهد البصري (وصف حركة الكاميرا، العناصر المعروضة، والمؤثرات).
3. الصوت / الكلام (ما يقوله المتحدث بدقة باللهجة البيضاء أو الفصحى المبسطة مع نبرة الحماس).

احرص على أن تكون أول 3 ثوانٍ عبارة عن خطاف بصري وسمعي قوي يمنع التمرير السريع.`,
    instructionAr: 'حدد فكرة الفيديو والجمهور وستحصل على سكريبت جاهز للتصوير مشهداً بمشهد.',
    tags: ['ريلز', 'تيك توك', 'يوتيوب شورتس', 'سيناريو فيديو'],
    difficulty: 'مبتدئ',
    copyCount: 840
  },

  // 2. تسويق وإعلانات
  {
    id: 'prompt-meta-ads-copy',
    titleAr: 'صياغة نصوص إعلانية مقنعة (Meta & Google Ads)',
    category: 'marketing',
    categoryAr: 'تسويق وإعلانات',
    targetTools: ['ChatGPT', 'Claude'],
    promptText: `أنت خبير إعلانات رقمية وكوبي رايتر متخصص في إعلانات التحويل (Direct Response Copywriter).
المنتج / الخدمة: [اسم ووصف المنتج]
الجمهور المستهدف: [من هم، مشاكلهم، ودوافع الشراء لديهم]
الميزة التنافسية: [ما الذي يميزك عن المنافسين]

قدم لي 3 نسخ إعلانية مختلفة لإعلانات Facebook/Instagram:
1. النسخة الأولى: تعتمد نموذج PAS (المشكلة - التحريض - الحل).
2. النسخة الثانية: تعتمد نموذج AIDA (الانتباه - الاهتمام - الرغبة - الإجراء).
3. النسخة الثالثة: تركز على قصة سريعة وتجربة عميل (Storytelling).

لكل نسخة، حدد:
- العنوان الرئيسي (Headline) مع 3 اقتراحات بديلة.
- النص الإعلاني (Primary Text).
- زر الدعوة للإجراء (CTA Button).`,
    instructionAr: 'انسخ الأمر وأدخل تفاصيل منتجك لتحصل على حملات إعلانية عالية التحويل (High-Converting Copy).',
    tags: ['إعلانات فيسبوك', 'كتابة إعلانية', 'تسويق رقمي', 'Copywriting'],
    difficulty: 'احترافي',
    isPopular: true,
    isFeatured: true,
    copyCount: 1650
  },
  {
    id: 'prompt-marketing-persona',
    titleAr: 'بناء شخصية العميل المثالي بدقة (Buyer Persona)',
    category: 'marketing',
    categoryAr: 'تسويق وإعلانات',
    targetTools: ['ChatGPT', 'Claude', 'Gemini'],
    promptText: `أريدك أن تبني شخصية عميل مثالي (Buyer Persona) مفصلة وشاملة لمشروعي:
طبيعة المشروع: [وصف مختصر للمنتج أو الخدمة والبلد المستهدف].

المطلوب تفصيله في بطاقة الشخصية:
1. البيانات الديموغرافية (الاسم التخيلي، العمر، الوظيفة، الدخل، الحالة الاجتماعية).
2. الأهداف والطموحات اليومية والمهنية.
3. أكبر 3 مخاوف وتحديات (Pain Points) يواجهها.
4. أين يقضي وقته على الإنترنت وما المنصات المفضلة لديه؟
5. ما الاعتراضات المحتملة التي قد تمنعه من الشراء وكيف نتغلب عليها؟
6. ما الكلمات والجمل السحرية التي تحفزه على اتخاذ قرار الشراء؟`,
    instructionAr: 'أمر أساسي لكل مسوق أو رائد أعمال لتحديد الرسالة الإعلانية الدقيقة.',
    tags: ['شخصية العميل', 'استراتيجية تسويق', 'أبحاث السوق'],
    difficulty: 'متوسط',
    copyCount: 720
  },

  // 3. برمجة وتطوير
  {
    id: 'prompt-code-reviewer-refactor',
    titleAr: 'مراجعة الكود وتحسين الأداء والأمان (Code Review & Clean Code)',
    category: 'coding',
    categoryAr: 'برمجة وتطوير',
    targetTools: ['ChatGPT', 'Claude', 'Cursor'],
    promptText: `أنت Senior Software Architect ومراجع كود معتمد.
راجع الكود التالي المكتوب بلغة [اللغة، مثل: TypeScript / Python / Go]:

\`\`\`
[الصق الكود البرمجي هنا]
\`\`\`

يرجى تقديم التقييم وفق المعايير التالية:
1. الأداء والتعقيد الزمني والمكاني (Time & Space Complexity - Big O).
2. الثغرات الأمنية أو حالات الحافة غير المعالجة (Edge cases & Security flaws).
3. قابلية القراءة وتطبيق مبادئ Clean Code و SOLID.
4. إعادة كتابة الكود بعد التحسين والتنظيف مع تعليقات توضيحية بالعربية تبين سبب كل تغيير.`,
    instructionAr: 'الصق أي كود برمجي تريده وسيعيد هيكلته بأعلى معايير الصناعة مع شرح الأخطاء وحلها.',
    tags: ['مراجعة كود', 'تحسين الأداء', 'برمجة', 'Clean Code'],
    difficulty: 'احترافي',
    isPopular: true,
    isFeatured: true,
    copyCount: 1890
  },
  {
    id: 'prompt-regex-master',
    titleAr: 'إنشاء تعبير نمطي معقد (Regex Generator & Explainer)',
    category: 'coding',
    categoryAr: 'برمجة وتطوير',
    targetTools: ['ChatGPT', 'Claude'],
    promptText: `أحتاج إلى تعبير نمطي (Regular Expression - Regex) للقيام بالمهمة التالية:
[صف ما تريد مطابقته أو استخراجه أو استبداله بالتفصيل مع أمثلة لنصوص صحيحة ونصوص خاطئة].

المطلوب:
1. صياغة نمط الـ Regex الأمثل.
2. تفكيك النمط وشرح كل رمز فيه باللغة العربية.
3. تقديم أمثلة برمجية لكيفية استخدامه بلغة [مثل: JavaScript / Python].
4. توضيح معالجة حالات الخطأ.`,
    instructionAr: 'وفر وقت كتابة وتجربة الـ Regex المعقد واحصل على شرح كامل لكل جزء فيه.',
    tags: ['Regex', 'تطوير ويب', 'معالجة نصوص'],
    difficulty: 'متوسط',
    copyCount: 650
  },

  // 4. توليد صور وفنون
  {
    id: 'prompt-photorealistic-portrait-midjourney',
    titleAr: 'بورتريه سينمائي واقعي خارق الدقة (Midjourney v6)',
    category: 'design_art',
    categoryAr: 'توليد صور وفنون',
    targetTools: ['Midjourney', 'Flux', 'DALL-E 3'],
    promptText: `cinematic portrait of [وصف الشخص مثلاً: a wise middle-eastern astronomer with silver beard], looking towards the cosmos, golden hour rim lighting, highly detailed skin textures, soft atmospheric volumetric lighting, shot on 85mm lens, f/1.8 aperture, Hasselblad medium format camera, natural bokeh, 8k resolution, photorealistic, cinematic color grading, masterpiece --ar 16:9 --style raw --v 6.0`,
    instructionAr: 'عدل وصف الشخص في البداية للحصول على صورة سينمائية بجودة كاميرات التصوير الاحترافية.',
    tags: ['ميدجورني', 'بورتريه', 'تصوير سينمائي', 'Midjourney v6'],
    difficulty: 'متوسط',
    isPopular: true,
    isFeatured: true,
    copyCount: 2310
  },
  {
    id: 'prompt-modern-app-ui-mockup',
    titleAr: 'تصميم واجهة مستخدم عصرية ثلاثية الأبعاد (Modern UI/UX Mockup)',
    category: 'design_art',
    categoryAr: 'توليد صور وفنون',
    targetTools: ['Midjourney', 'DALL-E 3', 'Recraft'],
    promptText: `modern sleek mobile app UI design for [نوع التطبيق مثلا: fintech crypto wallet / fitness health tracker], floating 3d glassmorphism cards, vibrant gradients, clean Arabic/English typography, micro-interactions, dark mode aesthetic with neon violet and emerald accents, Behance featured, dribbble trend, soft studio clay shadow, isometric perspective, 8k, crisp UI elements --ar 4:3 --v 6.0`,
    instructionAr: 'أمر لتوليد شاشات وتطبيقات جذابة لعرضها في ملفات الأعمال والعروض التقديمية.',
    tags: ['تصميم واجهات', 'UI/UX', 'موك اب', 'Dribbble style'],
    difficulty: 'مبتدئ',
    copyCount: 1120
  },
  {
    id: 'prompt-minimalist-logo-vector',
    titleAr: 'شعار فيكتور عصري مينيماليست (Minimalist Vector Logo)',
    category: 'design_art',
    categoryAr: 'توليد صور وفنون',
    targetTools: ['Midjourney', 'DALL-E 3', 'Recraft'],
    promptText: `minimalist modern vector logo of [رمز الشعار مثلا: a majestic falcon merged with neural network nodes], geometric clean lines, negative space, premium luxury corporate identity, flat design, white background, no gradients, timeless, Paul Rand style, vector graphics --no realistic photo, shading, background texture`,
    instructionAr: 'استبدل رمز الشعار باسم أو فكرة مشروعك للحصول على أيقونة نظيفة قابلة للاستخدام كشعار.',
    tags: ['لوجو', 'تصميم شعار', 'فيكتور', 'Minimalist Logo'],
    difficulty: 'مبتدئ',
    copyCount: 1470
  },

  // 5. إدارة وأعمال
  {
    id: 'prompt-pitch-deck-investor',
    titleAr: 'هيكلة العرض التقديمي لجذب المستثمرين (Pitch Deck Outline)',
    category: 'business',
    categoryAr: 'إدارة وأعمال',
    targetTools: ['ChatGPT', 'Claude', 'Gemini'],
    promptText: `أنت مستشار استثماري ومؤسس شركات ناشئة ساهم في جمع ملايين الدولارات.
فكرة مشروعي: [وصف دقيق للمشروع، النموذج الربحي، والسوق المستهدف].

اكتب لي خطة العرض الاستثماري (Pitch Deck) المكونة من 10 إلى 12 شريحة:
لكل شريحة:
1. عنوان الشريحة وهدفها الأساسي.
2. المحتوى والنقاط الرئيسية التي يجب ذكرها بالأرقام والوقائع.
3. التوصيات البصرية (كيفية عرض البيانات بصرياً أو كرسوم بيانية).
4. رسالة الإقناع الجوهرية (Takeaway) التي ستعلق في ذهن المستثمر.`,
    instructionAr: 'أدخل تفاصيل شركتك الناشئة وستحصل على هيكل احترافي جاهز لتصميمه وتقديمه للمستثمرين.',
    tags: ['ستارتب', 'عروض استثمارية', 'Pitch Deck', 'ريادة أعمال'],
    difficulty: 'احترافي',
    isPopular: true,
    copyCount: 890
  },
  {
    id: 'prompt-swot-competitor-analysis',
    titleAr: 'تحليل SWOT عميق ومقارنة المنافسين في السوق',
    category: 'business',
    categoryAr: 'إدارة وأعمال',
    targetTools: ['ChatGPT', 'Claude', 'Gemini'],
    promptText: `أنت خبير استراتيجيات أعمال وتحليل أسواق.
حلل مشروعي: [اسم ومجال العمل والموقع الجغرافي] مقارنة بالمنافسين الرئيسيين في السوق: [اذكر المنافسين إن وجدوا].

قم بإعداد جدول تحليل رباعي (SWOT Analysis) متقدم:
- نقاط القوة (Strengths) الداخلية التي يجب استغلالها.
- نقاط الضعف (Weaknesses) التي تتطلب علاجاً عاجلاً.
- الفرص (Opportunities) المتاحة في السوق والتوجهات الحديثة.
- التهديدات (Threats) المحتملة من المنافسين أو تغيرات السوق.

ثم اختتم بـ 3 مبادرات استراتيجية فورية ذات أولوية قصوى لتعزيز الحصة السوقية.`,
    instructionAr: 'احصل على تحليل استراتيجي متكامل لمشروعك لمعرفة موقعك التنافسي والفرص المتاحة.',
    tags: ['تحليل SWOT', 'دراسة السوق', 'استراتيجية أعمال'],
    difficulty: 'متوسط',
    copyCount: 760
  },

  // 6. تعليم وبحث
  {
    id: 'prompt-explain-like-im-5',
    titleAr: 'تبسيط المفاهيم المعقدة والعلوم (Feynman Technique)',
    category: 'education',
    categoryAr: 'تعليم وبحث',
    targetTools: ['ChatGPT', 'Claude', 'Gemini'],
    promptText: `أريدك أن تعمل كمعلم عبقري يستخدم تقنية فاينمان (Feynman Technique) في تبسيط العلوم.
اشرح لي المفهوم التالي: [اكتب اسم المفهوم أو النظرية مثل: الحوسبة الكمومية / البلوك تشين / الشبكات العصبية].

اتبع هذا التدرج في الشرح:
1. شرح مبسط جداً لطفل في العاشرة من عمره باستخدام تشبيه واقعي وممتع من الحياة اليومية.
2. الشرح الأكاديمي العملي والمصطلحات الأساسية بدون تعقيد غير مبرر.
3. أهم التطبيقات العملية لهذا المفهوم في عالمنا اليوم.
4. 3 أسئلة تفاعلية لاختبار مدى فهمي للموضوع مع إجاباتها في النهاية.`,
    instructionAr: 'أفضل أداة للطلاب والباحثين لفهم أي موضوع صعب أو تقنية معقدة في دقائق.',
    tags: ['تبسيط العلوم', 'شرح مفاهيم', 'فاينمان', 'تعليم'],
    difficulty: 'مبتدئ',
    isPopular: true,
    copyCount: 1320
  },
  {
    id: 'prompt-research-paper-summary',
    titleAr: 'تلخيص الأوراق العلمية واستخراج النتائج الأساسية',
    category: 'education',
    categoryAr: 'تعليم وبحث',
    targetTools: ['Claude', 'Gemini', 'ChatGPT'],
    promptText: `أنت باحث أكاديمي متخصص. قمت بإرفاق / لصق محتوى هذه الورقة البحثية:
[الصق نص البحث أو ملخصه هنا]

المطلوب استخراج النقاط التالية بدقة باللغة العربية:
1. مشكلة البحث الأساسية وسؤال الدراسة.
2. المنهجية والأدوات المستخدمة (Methodology).
3. أهم 4 نتائج رئيسية بالأرقام والبيانات الإحصائية.
4. محددات الدراسة (Limitations) والجوانب التي لم تتم تغطيتها.
5. الفائدة العملية المباشرة لصناع القرار أو المطورين.`,
    instructionAr: 'يلخص عشرات الصفحات الأكاديمية في نقاط جوهرية مركزة ومفيدة للبحث.',
    tags: ['أبحاث علمية', 'تلخيص', 'دراسات عليا', 'أكاديمي'],
    difficulty: 'احترافي',
    copyCount: 680
  },

  // 7. إنتاجية وتنظيم
  {
    id: 'prompt-daily-timeblocking-routine',
    titleAr: 'تخطيط اليوم وتقنية كتل الوقت (Time-Blocking System)',
    category: 'productivity',
    categoryAr: 'إنتاجية وتنظيم',
    targetTools: ['ChatGPT', 'Claude'],
    promptText: `أنت مدرب إنتاجية متخصص في هندسة الروتين اليومي وإدارة الطاقة (Energy & Time Management).
إليك قائمة المهام والالتزامات التي علي إنجازها غداً:
[اكتب مهامك، مواعيد اجتماعاتك، وساعات استيقاظك ونومك]

المطلوب:
1. تنظيم هذه المهام في جدول زمني بنظام كتل الوقت (Time-Blocking) من الصباح حتى المساء.
2. تخصيص فترات تركيز عميق (Deep Work) للمهام الصعبة في أوقات ذروة التركيز.
3. وضع فترات راحة قصيرة (Pomodoro breaks) وتفريغ ذهني.
4. تحديد أهم 3 أولويات لا يمكن تأجيلها غداً (Non-Negotiable Top 3).
5. نصيحة عملية للتغلب على المماطلة في أصعب مهمة في الجدول.`,
    instructionAr: 'حول فوضى المهام اليومية إلى جدول زمني متقن يضمن إنجاز كل شيء دون إرهاق.',
    tags: ['إدارة الوقت', 'تنظيم اليوم', 'إنتاجية', 'Time-Blocking'],
    difficulty: 'مبتدئ',
    isPopular: true,
    copyCount: 940
  }
];

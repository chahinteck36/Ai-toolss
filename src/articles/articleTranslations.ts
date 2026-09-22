import { SupportedLanguage } from '../lib/i18n';
import { KnowledgeArticle } from './types';
import { CLUSTER_ARTICLE_TRANSLATIONS } from './cluster/translations';
import { NEW_ARTICLE_TRANSLATIONS } from './newArticleTranslations';

export interface LocalizedArticleContent {
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  sections: {
    id: string;
    heading: string;
    subheading?: string;
    paragraphs: string[];
    bulletPoints?: string[];
    steps?: { step: number; title: string; desc: string }[];
    comparisonTable?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  conclusion?: string;
  faq: { question: string; answer: string }[];
  readingTimeText: string;
  needToolPrompt: string;
}

export const ARTICLE_TRANSLATIONS: Record<string, Partial<Record<SupportedLanguage, LocalizedArticleContent>>> = {
  ...CLUSTER_ARTICLE_TRANSLATIONS,
  ...NEW_ARTICLE_TRANSLATIONS,
  'best-ai-tools-for-students-2026': {
    en: {
      title: 'Best AI Tools for Students in 2026',
      description: 'Discover the best AI tools for students in 2026 for studying, writing, translation, presentations, and coding, with in-depth comparisons and selection guidance.',
      seoTitle: 'Best AI Tools for Students in 2026 | Adawatai',
      seoDescription: 'Discover the best AI tools for students in 2026 for studying, writing, translation, presentations, and coding, with comparisons and workflow tips.',
      intro: 'In 2026, using artificial intelligence in education is no longer a gimmick or a way to get quick homework answers; it has evolved into a personal tutor, study partner, and research assistant. However, relying on a single general chat app often results in inaccurate citations, poorly formatted presentations, or unnatural translations. This comprehensive guide highlights the best AI tools tailored for students in 2026 across studying, writing, languages, presentations, coding, and academic research.',
      sections: [
        {
          id: 'study-comprehension',
          heading: '1. Best AI Tools for Studying and Comprehension',
          subheading: 'Demystifying complex concepts, active learning, and personalized tutoring',
          paragraphs: [
            'Active study is about understanding deep principles rather than rote memorization. In 2026, conversational AI tools act as Socratic mentors: prompting you with thought-provoking questions, identifying gaps in your understanding, and providing intuitive analogies.',
            'Leading tools like Google Gemini, Claude, and NotebookLM handle massive volumes of lecture notes and textbook chapters, generating custom quizzes and guided explanations.'
          ],
          bulletPoints: [
            'Use the Feynman Technique: Ask the AI to explain advanced concepts in simple terms, then try explaining them back to verify your grasp.',
            'Upload past exam papers and ask the AI to generate similar practice questions along with step-by-step solutions.',
            'Connect Google NotebookLM to your course readings to ground all answers in approved sources with page citations.'
          ]
        },
        {
          id: 'writing-summarization',
          heading: '2. Best AI Tools for Writing & Summarization',
          subheading: 'Structuring arguments, proofreading, and synthesizing academic papers',
          paragraphs: [
            'Academic writing requires clarity, concise argumentation, and rigorous citation. Rather than having an AI write assignments for you—which risks plagiarism and hallucinations—smart students use tools to overcome blank page paralysis and refine draft structure.',
            'Claude 3.7 and ChatGPT Canvas excel at outlining research papers, restructuring disjointed paragraphs, and checking stylistic tone.'
          ],
          bulletPoints: [
            'Brainstorm multi-level outlines by specifying your paper thesis and key supporting evidence.',
            'Use AI to generate counterarguments to strengthen your literature review and thesis defense.',
            'Always verify facts and statistics independently using academic engines like Perplexity or Consensus.'
          ]
        },
        {
          id: 'language-translation',
          heading: '3. Best AI Tools for Languages & Translation',
          subheading: 'Contextual translation, grammar mastery, and academic phrasing',
          paragraphs: [
            'Literal word-for-word translation frequently fails in academic contexts where idiomatic expressions and technical terminology dominate. Modern AI models understand cultural nuance, terminology registers, and sentence cadence.',
            'DeepL and specialized LLM prompts provide fluent translations between English, Arabic, and French while preserving original formatting.'
          ]
        },
        {
          id: 'presentations-visuals',
          heading: '4. Best AI Tools for Presentations & Visuals',
          subheading: 'Auto-generating slide decks, infographics, and data visualizations',
          paragraphs: [
            'Preparing slide decks used to consume hours of tweaking layouts, font sizes, and color palettes. In 2026, presentation generators create complete slide sequences from a single markdown outline or document.',
            'Gamma App enables students to produce interactive, polished presentation decks in under five minutes with export to PowerPoint and PDF.'
          ]
        },
        {
          id: 'coding-math',
          heading: '5. Best AI Tools for Coding & STEM',
          subheading: 'Debugging code, understanding math equations, and data analysis',
          paragraphs: [
            'Computer science and engineering coursework requires understanding algorithms and diagnosing cryptic compiler errors. Specialized reasoning models explain code step-by-step.',
            'DeepSeek R1 and Claude 3.7 provide outstanding technical reasoning for algorithms, Python data analysis, and mathematical proofs.'
          ]
        },
        {
          id: 'comparison-matrix',
          heading: 'Comparison Matrix: Which AI Tool Fits Your Need?',
          subheading: 'Quick reference for selecting the optimal tool based on academic task',
          paragraphs: [
            'Use this breakdown to decide which tool to open based on your immediate task:'
          ],
          comparisonTable: {
            headers: ['Tool', 'Best Used For', 'Free Tier', 'Key Strength'],
            rows: [
              ['Google NotebookLM', 'Studying from course notes & PDFs', '100% Free', 'Zero hallucination; grounded in your notes with page citations'],
              ['Claude 3.7 Sonnet', 'Academic writing, logic & coding', 'Free limited tier', 'Deep nuanced prose, rigorous reasoning, and interactive Artifacts'],
              ['Google Gemini 2.0', 'Multimodal search & long documents', 'Generous free tier', 'Massive context window and live integration with Google Docs/Drive'],
              ['Gamma App', 'Presentations & seminar slides', 'Free starter credits', 'Converts outlines into professional slide decks in under 60 seconds'],
              ['DeepSeek R1', 'Math problems, algorithms & code', '100% Free open-source', 'Step-by-step chain of thought reasoning comparable to top models'],
              ['Perplexity AI', 'Academic research with live citations', 'Free tier available', 'Real-time web search with clickable sources and DOI links']
            ]
          }
        },
        {
          id: 'academic-integrity',
          heading: 'Academic Integrity & Ethical AI Rules',
          subheading: 'How to use AI safely without violating university honor codes',
          paragraphs: [
            'Universities increasingly employ sophisticated detection heuristics and oral defense protocols. Maintain academic integrity with these core principles:',
            '1. Treat AI as a personal tutor, not a ghostwriter. Ask it to explain, quiz, and critique, but write all final submissions in your own authentic voice.',
            '2. Always check primary sources. AI models can invent persuasive but non-existent journal citations (hallucinations). Verify every reference on Google Scholar, PubMed, or Consensus.',
            '3. Check your faculty guidelines. Many universities require an explicit AI disclosure statement detailing how AI tools were utilized during research.'
          ]
        }
      ],
      conclusion: 'Artificial intelligence is an extraordinary equalizer for students worldwide in 2026. By choosing the right tool for each specific academic task, you can accelerate your learning curve and achieve academic excellence while maintaining ethical integrity.',
      faq: [
        {
          question: 'Are free AI tools sufficient for college students?',
          answer: 'Yes! Free tiers of Google NotebookLM, DeepSeek R1, Google Gemini, and Claude offer sufficient reasoning power and context capacity for over 90% of undergraduate and graduate coursework.'
        },
        {
          question: 'How can I avoid academic plagiarism when using AI tools?',
          answer: 'Use AI as a brainstorming and comprehension partner rather than having it write your paper. Always write final drafts in your own voice and verify citations through academic engines like Perplexity or Consensus.'
        }
      ],
      readingTimeText: '12 min read',
      needToolPrompt: 'Need the tool right now?'
    }
  },

  'how-to-convert-pdf-to-word': {
    en: {
      title: 'How to Convert PDF to Word Easily Without Paid Software (2026 Guide)',
      description: 'Step-by-step tutorial on converting PDF documents to editable Microsoft Word (.docx) files online for free, preserving Arabic and multilingual formatting with maximum privacy.',
      seoTitle: 'How to Convert PDF to Word Online for Free | 2026 Guide',
      seoDescription: 'Learn how to easily convert PDF to editable Word documents online for free. Clean layout preservation and 100% secure in-browser processing.',
      intro: 'Converting PDF documents into editable Word (.docx) format without losing fonts, table structures, or paragraph alignment is a daily necessity for students and professionals. This practical guide demonstrates how to convert PDF files online for free with 100% privacy and zero file uploads.',
      sections: [
        {
          id: 'why-convert',
          heading: 'Why Convert PDF to Word?',
          paragraphs: [
            'While PDF is ideal for sharing and printing, editing text, updating resumes, or reusing academic quotes requires an editable document format like Microsoft Word (.docx).'
          ]
        },
        {
          id: 'step-by-step',
          heading: 'Step-by-Step Conversion on Adawatai',
          paragraphs: [
            'Using Adawatai\'s client-side conversion tools, your files are processed directly inside your browser without uploading to any external servers.'
          ],
          bulletPoints: [
            'Step 1: Open the PDF to Word Converter on Adawatai.',
            'Step 2: Drag and drop your PDF file or click to select from your device.',
            'Step 3: Click Convert and download your editable .docx file instantly.'
          ]
        }
      ],
      conclusion: 'With modern browser technologies, you no longer need expensive desktop software to convert your documents securely.',
      faq: [
        {
          question: 'Is this converter completely free?',
          answer: 'Yes, 100% free with no page limits, no subscriptions, and no email required.'
        },
        {
          question: 'Are my confidential documents secure?',
          answer: 'Yes! All conversions happen locally in your web browser. No files are uploaded to any server.'
        }
      ],
      readingTimeText: '5 min read',
      needToolPrompt: 'Need the PDF to Word tool right now?'
    }
  },

  'best-ai-tools-for-presentations': {
    en: {
      title: 'Best AI Tools to Create Presentations (PowerPoint) in Seconds (2026 Review)',
      description: 'Discover the top generative AI tools for designing stunning PowerPoint presentations and interactive slides automatically from prompts or documents.',
      seoTitle: 'Best AI Presentation Tools in 2026 | Create PowerPoint with AI',
      seoDescription: 'Explore the best AI tools to generate professional PowerPoint and PDF presentations in seconds. Transform prompts and documents into sleek slide decks.',
      intro: 'Creating a 20-slide presentation used to take 4 to 8 hours of tedious formatting, color picking, and layout alignment. Today, generative AI transforms simple prompts or notes into visually engaging decks in less than a minute.',
      sections: [
        {
          id: 'top-ai-presentation-tools',
          heading: 'Leading AI Presentation Tools in 2026',
          paragraphs: [
            'Gamma App leads the category on Adawatai, offering fluid card-based storytelling and one-click export to PPTX and PDF.',
            'Other notable solutions include Tome AI, Canva Magic Design, and Microsoft 365 Copilot.'
          ]
        }
      ],
      conclusion: 'AI presentation tools empower professionals and students to present persuasive ideas with minimum effort.',
      faq: [
        {
          question: 'Can I export slides to Microsoft PowerPoint (PPTX)?',
          answer: 'Yes, platforms like Gamma App allow seamless export to editable PPTX and PDF formats.'
        }
      ],
      readingTimeText: '6 min read',
      needToolPrompt: 'Need the presentation tool right now?'
    }
  },

  'chatgpt-alternatives-2026': {
    en: {
      title: 'Best ChatGPT Alternatives in 2026 (In-Depth Comparison of Top AI Models)',
      description: 'Comprehensive review of the top ChatGPT alternatives in 2026: Claude 3.7 Sonnet, Google Gemini 2.0, DeepSeek R1, and Perplexity for coding, writing, and research.',
      seoTitle: 'Best ChatGPT Alternatives in 2026 | Full Model Comparison',
      seoDescription: 'Looking for the best ChatGPT alternative in 2026? Compare Claude 3.7, Google Gemini 2.0, DeepSeek R1, and Perplexity for coding, reasoning, and research.',
      intro: 'While ChatGPT remains the most recognized brand in conversational AI, 2026 has witnessed unprecedented competition. Competing models now surpass ChatGPT in nuanced writing, mathematics, coding, and real-time research.',
      sections: [
        {
          id: 'claude-review',
          heading: '1. Claude 3.7 Sonnet: The Coding and Writing Champion',
          paragraphs: [
            'Anthropic\'s Claude 3.7 Sonnet combines lightning-fast intuitive responses with extended chain-of-thought reasoning, accompanied by an interactive Artifacts canvas.'
          ]
        },
        {
          id: 'gemini-review',
          heading: '2. Google Gemini 2.0: Multimodal Context Powerhouse',
          paragraphs: [
            'With a 1M+ token context window and native integration with Google Workspace, Gemini 2.0 easily digests full-length books and video files.'
          ]
        },
        {
          id: 'deepseek-review',
          heading: '3. DeepSeek R1: Open-Weight Mathematical Reasoning',
          paragraphs: [
            'DeepSeek R1 provides top-tier mathematical and algorithmic reasoning completely free and open-source.'
          ]
        }
      ],
      conclusion: 'Diversifying across these models gives you unprecedented capability without needing expensive subscriptions.',
      faq: [
        {
          question: 'Which model is best for coding and software development?',
          answer: 'Claude 3.7 Sonnet currently ranks highest for clean, bug-free code generation and architectural refactoring, closely followed by DeepSeek R1.'
        }
      ],
      readingTimeText: '8 min read',
      needToolPrompt: 'Looking for the best AI assistant right now?'
    }
  },

  'how-to-compress-pdf-reduce-file-size': {
    en: {
      title: 'How to Compress PDF and Reduce File Size While Preserving Quality (2026 Guide)',
      description: 'Free, fast methods to compress and shrink PDF documents by up to 80% without losing text clarity or image sharpness, ideal for email and job applications.',
      seoTitle: 'How to Compress PDF Files Online for Free | 2026 Complete Guide',
      seoDescription: 'Learn how to reduce PDF file size online in seconds. Safe client-side compression preserving text clarity for job portals and email attachments.',
      intro: 'Nothing is more frustrating than finishing an important resume or report only to get blocked by an upload limit like "File size exceeds 2MB". With modern browser-based tools, you can reduce PDF file sizes by 70-80% in seconds without compromising visual readability.',
      sections: [
        {
          id: 'why-compress',
          heading: 'Why Are PDF Files So Large?',
          paragraphs: [
            'PDF bloat is rarely caused by text; it usually stems from high-resolution images (300+ DPI), uncompressed embedded font libraries, and obsolete document metadata.'
          ]
        },
        {
          id: 'step-by-step',
          heading: 'How to Compress PDF on Adawatai',
          paragraphs: [
            'Our free Client-Side PDF Compressor optimizes your document locally inside your browser with zero server uploads and zero privacy risk.'
          ],
          bulletPoints: [
            'Step 1: Select or drag your PDF file into the upload zone on Adawatai.',
            'Step 2: Choose standard compression for balanced print quality or strong compression for maximum size reduction.',
            'Step 3: Download your lightweight, optimized PDF file immediately.'
          ]
        }
      ],
      conclusion: 'Shrinking PDF files is simple and safe with Adawatai\'s client-side compression tool.',
      faq: [
        {
          question: 'Does PDF compression reduce text clarity?',
          answer: 'No, text elements in PDFs are vector-based and remain 100% crisp. Compression primarily optimizes embedded images and removes redundant metadata.'
        }
      ],
      readingTimeText: '5 min read',
      needToolPrompt: 'Need to compress a PDF right now?'
    }
  }
};

export const getLocalizedArticle = (
  article: KnowledgeArticle,
  lang: SupportedLanguage
): {
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  sections: {
    id: string;
    heading: string;
    subheading?: string;
    paragraphs: string[];
    bulletPoints?: string[];
  }[];
  conclusion?: string;
  faq: { question: string; answer: string }[];
  readingTimeText: string;
  needToolPrompt: string;
} => {
  if (lang === 'ar' || !ARTICLE_TRANSLATIONS[article.id]?.[lang]) {
    return {
      title: article.title,
      description: article.description,
      seoTitle: article.seoTitle,
      seoDescription: article.seoDescription,
      intro: article.content.intro,
      sections: article.content.sections.map((s) => ({
        id: s.id,
        heading: s.heading,
        subheading: s.subheading,
        paragraphs: s.paragraphs,
        bulletPoints: s.bulletPoints,
        comparisonTable: s.comparisonTable
      })),
      conclusion: article.content.conclusion,
      faq: article.faq,
      readingTimeText: `${article.readingTime} دقائق قراءة`,
      needToolPrompt: 'هل تحتاج الأداة الآن؟'
    };
  }

  const loc = ARTICLE_TRANSLATIONS[article.id]![lang]!;
  return {
    title: loc.title || article.title,
    description: loc.description || article.description,
    seoTitle: loc.seoTitle || article.seoTitle,
    seoDescription: loc.seoDescription || article.seoDescription,
    intro: loc.intro || article.content.intro,
    sections: loc.sections || article.content.sections,
    conclusion: loc.conclusion || article.content.conclusion,
    faq: loc.faq && loc.faq.length > 0 ? loc.faq : article.faq,
    readingTimeText: loc.readingTimeText || `${article.readingTime} min read`,
    needToolPrompt: loc.needToolPrompt || 'Need the tool right now?'
  };
};

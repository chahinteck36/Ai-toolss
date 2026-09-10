import { SupportedLanguage } from '../lib/i18n';
import { KnowledgeArticle } from './types';

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
  }[];
  conclusion?: string;
  faq: { question: string; answer: string }[];
  readingTimeText: string;
  needToolPrompt: string;
}

export const ARTICLE_TRANSLATIONS: Record<string, Partial<Record<SupportedLanguage, LocalizedArticleContent>>> = {
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
            'Generate custom practice exams: Provide your lecture transcripts and request 10 multiple-choice questions with answer rationales.',
            'Multimodal diagram analysis: Upload photos of hand-drawn circuits, equations, or biological diagrams for step-by-step breakdowns.'
          ]
        },
        {
          id: 'writing-summarization',
          heading: '2. Best AI Tools for Writing and Summarization',
          subheading: 'Drafting outlines, synthesizing research, and polishing academic prose',
          paragraphs: [
            'Academic writing requires structured logic, coherent paragraph flow, and adherence to scholarly standards. AI writing companions should never replace your voice; rather, they serve as editorial coaches that help organize outlines, refine sentence variety, and detect inconsistencies.',
            'When dealing with lengthy 50-page articles, specialized summarizers quickly distill core hypotheses, methodologies, and findings without losing crucial nuance.'
          ],
          bulletPoints: [
            'Outlining & Brainstorming: Use AI to structure comprehensive thesis proposals and research papers.',
            'Style & Tone Polishing: Rephrase awkward passages into lucid, objective academic prose.',
            'Grammar & Proofreading: Catch subtle syntax errors, punctuation slips, and inconsistent terminology.'
          ]
        },
        {
          id: 'translation-languages',
          heading: '3. Best AI Tools for Translation and Language Learning',
          subheading: 'Contextual, high-precision translation of scholarly papers and technical terms',
          paragraphs: [
            'Most cutting-edge academic literature is published in English or French. Traditional translation tools often fail when translating specialized jargon into Arabic, producing clumsy or misleading literal translations.',
            'Modern neural translation tools like DeepL Translator and ChatGPT understand domain-specific nuances across medicine, law, engineering, and the humanities, preserving the exact layout of translated PDF and Word files.'
          ]
        },
        {
          id: 'presentation-creation',
          heading: '4. Best AI Tools for Presentation Creation',
          subheading: 'Transforming outlines into stunning visual slide decks in seconds',
          paragraphs: [
            'Students often spend countless hours formatting slide shapes, font pairings, and alignments instead of rehearsing their presentation. Modern AI presentation apps like Gamma App turn notes into engaging visual narratives with full Arabic RTL support and instant PowerPoint export.'
          ]
        },
        {
          id: 'coding-development',
          heading: '5. Best AI Tools for Coding and Tech Projects',
          subheading: 'Intelligent pair programming, debugging, and algorithm analysis',
          paragraphs: [
            'For computer science and engineering students, AI agents have revolutionized software development. Intelligent IDEs like Cursor and GitHub Copilot understand entire codebases, assist with multithreaded debugging, and explain algorithmic time complexities.'
          ]
        },
        {
          id: 'research-organization',
          heading: '6. Best AI Tools for Research & Citation Discovery',
          subheading: 'Verified literature reviews with direct DOI links and consensus metrics',
          paragraphs: [
            'Unlike general chatbots that may fabricate fake citations, dedicated academic search engines like Perplexity AI and Consensus query vetted databases (PubMed, Semantic Scholar), providing direct DOI links and consensus indicators.'
          ]
        },
        {
          id: 'free-student-tools',
          heading: '7. Top 100% Free AI Tools for Students',
          subheading: 'Maximizing academic productivity on a zero-dollar budget',
          paragraphs: [
            'Students do not need expensive subscriptions to succeed. High-tier models like DeepSeek-R1 and V3 are available completely free, GitHub Copilot is free through the GitHub Student Developer Pack, Google NotebookLM is 100% free, and Hugging Face offers thousands of open-source models.'
          ]
        },
        {
          id: 'how-to-choose-tool',
          heading: '8. How to Choose the Right AI Tool for Your Task',
          subheading: 'Decision matrix: pick the right tool based on your specific academic workflow',
          paragraphs: [
            'Success comes from matching each task to the ideal specialized tool rather than relying on one general chatbot for everything.'
          ]
        }
      ],
      conclusion: 'Artificial intelligence in 2026 is an incredible multiplier for academic growth when used thoughtfully. Match each tool to your specific task, verify citations, and uphold academic integrity. Explore the full AI directory on Adawatai to elevate your academic journey.',
      faq: [
        {
          question: 'What is the best AI tool for students in 2026?',
          answer: 'There is no single best tool: for studying and note review, NotebookLM and Google Gemini excel; for verified academic research, Perplexity AI is king; for writing and drafting, Claude and ChatGPT lead; and for presentations, Gamma App is the top choice.'
        },
        {
          question: 'Are there free AI tools for students?',
          answer: 'Yes! NotebookLM is 100% free, DeepSeek provides cutting-edge reasoning at zero cost, Hugging Face hosts open-source tools, and GitHub Copilot is free for students via the GitHub Student Developer Pack.'
        },
        {
          question: 'What is the best AI tool for translating academic papers?',
          answer: 'DeepL Translator is widely regarded as the most accurate tool for academic translation, preserving file formatting and technical terminology.'
        },
        {
          question: 'What is the best AI tool for presentations?',
          answer: 'Gamma App is the premier AI presentation tool for students, turning text notes into beautiful slides with full Arabic RTL support and PowerPoint export.'
        },
        {
          question: 'What are the best AI tools for coding?',
          answer: 'Cursor IDE is the most advanced agentic code editor, alongside GitHub Copilot (free for students) and DeepSeek-R1 for algorithmic logic.'
        },
        {
          question: 'How can I avoid academic plagiarism when using AI tools?',
          answer: 'Use AI as a brainstorming and comprehension partner rather than having it write your paper. Always write final drafts in your own voice and verify citations through academic engines like Perplexity or Consensus.'
        }
      ],
      readingTimeText: '12 min read',
      needToolPrompt: 'Need the tool right now?'
    },
    fr: {
      title: 'Meilleurs outils d\'IA pour étudiants en 2026',
      description: 'Découvrez les meilleurs outils d\'intelligence artificielle pour étudiants en 2026 pour étudier, rédiger, traduire, créer des présentations et programmer.',
      seoTitle: 'Meilleurs outils d\'IA pour étudiants en 2026 | Adawatai',
      seoDescription: 'Découvrez les meilleurs outils d\'intelligence artificielle pour étudiants en 2026 pour étudier, rédiger, traduire et programmer.',
      intro: 'En 2026, l\'intelligence artificielle est devenue un assistant d\'étude incontournable pour chaque étudiant. Ce guide complet présente les meilleurs outils adaptés à chaque besoin académique.',
      sections: [
        {
          id: 'study-comprehension',
          heading: '1. Meilleurs outils d\'IA pour étudier et comprendre les cours',
          paragraphs: [
            'L\'apprentissage actif consiste à comprendre les principes fondamentaux. Des outils comme Google Gemini, Claude et NotebookLM transforment vos notes de cours en séances d\'étude interactives et génèrent des quiz personnalisés.'
          ]
        },
        {
          id: 'writing-summarization',
          heading: '2. Meilleurs outils d\'IA pour la rédaction et la synthèse',
          paragraphs: [
            'La rédaction académique exige rigueur et clarté. Utilisez l\'IA pour structurer vos plans et affiner vos arguments avec ChatGPT et Claude.'
          ]
        },
        {
          id: 'translation-languages',
          heading: '3. Meilleurs outils d\'IA pour la traduction et les langues',
          paragraphs: [
            'DeepL Translator offre la traduction neuronale la plus précise pour les articles scientifiques, en préservant la mise en page des fichiers PDF et Word.'
          ]
        },
        {
          id: 'presentation-creation',
          heading: '4. Meilleurs outils d\'IA pour créer des présentations',
          paragraphs: [
            'Gamma App transforme vos notes et idées en présentations visuelles percutantes avec support complet de la langue arabe et export PowerPoint.'
          ]
        },
        {
          id: 'coding-development',
          heading: '5. Meilleurs outils d\'IA pour la programmation',
          paragraphs: [
            'Cursor IDE et GitHub Copilot (gratuit pour les étudiants) accompagnent les étudiants en informatique dans le développement et le débogage de leurs projets.'
          ]
        },
        {
          id: 'research-organization',
          heading: '6. Meilleurs outils d\'IA pour la recherche académique vérifiée',
          paragraphs: [
            'Perplexity AI et Consensus interrogent directement les bases de données d\'articles évalués par les pairs avec liens DOI vérifiés.'
          ]
        },
        {
          id: 'free-student-tools',
          heading: '7. Meilleurs outils d\'IA 100% gratuits pour étudiants',
          paragraphs: [
            'Profitez des modèles DeepSeek-R1 gratuits, du GitHub Student Developer Pack et de Google NotebookLM sans frais.'
          ]
        },
        {
          id: 'how-to-choose-tool',
          heading: '8. Comment choisir l\'outil d\'IA adapté à vos besoins ?',
          paragraphs: [
            'Choisissez chaque outil en fonction de votre tâche : recherche avec Perplexity, synthèse avec NotebookLM, et diapositives avec Gamma.'
          ]
        }
      ],
      conclusion: 'L\'IA en 2026 offre un levier exceptionnel pour réussir vos études en combinant rigueur académique et outils adaptés.',
      faq: [
        {
          question: 'Quel est le meilleur outil d\'IA pour les étudiants en 2026 ?',
          answer: 'Il n\'y a pas un seul outil universel : NotebookLM pour les cours, Perplexity pour la recherche vérifiée, Claude pour la rédaction, et Gamma pour les présentations.'
        },
        {
          question: 'Existe-t-il des outils d\'IA gratuits pour les étudiants ?',
          answer: 'Oui, notamment NotebookLM, DeepSeek, Hugging Face, et GitHub Copilot gratuit avec une adresse email universitaire.'
        }
      ],
      readingTimeText: '12 min de lecture',
      needToolPrompt: 'Besoin de cet outil maintenant ?'
    }
  },

  'how-to-convert-pdf-to-word-easily': {
    en: {
      title: 'How to Convert PDF to Word Easily Without Paid Software (2026 Practical Guide)',
      description: 'Step-by-step practical guide to converting PDF files into editable Word documents online for free with maximum layout accuracy, font preservation, and 100% privacy.',
      seoTitle: 'How to Convert PDF to Word Easily Online | Free Step-by-Step Guide 2026',
      seoDescription: 'Learn how to convert any PDF to an editable Word document for free in your browser. Fast, secure client-side conversion preserving formatting.',
      intro: 'PDF is the gold standard for sharing finalized documents. But when you need to fix a typo, update a resume, or edit a contract, direct editing is challenging. Fortunately, modern browser technology allows you to convert PDFs into editable DOCX files in seconds, completely free and securely.',
      sections: [
        {
          id: 'common-problems',
          heading: 'Common Issues in PDF to Word Conversions',
          paragraphs: [
            'Many online tools distort fonts, break tables, or compromise user privacy by uploading sensitive files to unknown cloud servers.',
            'Adawatai eliminates these risks by processing files 100% locally inside your browser (Client-Side).'
          ]
        },
        {
          id: 'step-by-step',
          heading: 'How to Convert PDF to Word on Adawatai',
          paragraphs: [
            'Follow three quick steps to convert your document without registration or software installation:'
          ],
          bulletPoints: [
            'Step 1: Open the PDF to Word converter on Adawatai and drop your file into the upload zone.',
            'Step 2: The browser engine instantly parses text, tables, and formatting.',
            'Step 3: Click Download to save your fully editable Word document.'
          ]
        }
      ],
      conclusion: 'Converting PDF to Word is fast, private, and effortless with Adawatai\'s client-side converter.',
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
    },
    fr: {
      title: 'Comment convertir un PDF en Word facilement sans logiciel payant (Guide 2026)',
      description: 'Guide pratique pour convertir gratuitement vos fichiers PDF en documents Word éditables avec une fidélité de mise en page maximale et une confidentialité absolue.',
      seoTitle: 'Comment convertir un PDF en Word facilement | Guide gratuit 2026',
      seoDescription: 'Apprenez à convertir gratuitement un PDF en document Word modifiable directement dans votre navigateur. Traitement local et sécurisé.',
      intro: 'Le format PDF est idéal pour partager des documents fixes, mais le modifier nécessite souvent des logiciels coûteux. Découvrez comment transformer vos PDF en Word modifiables en quelques secondes.',
      sections: [
        {
          id: 'step-by-step',
          heading: 'Étapes pour convertir un PDF en Word sur Adawatai',
          paragraphs: [
            'Glissez votre fichier dans la zone de dépôt de notre outil gratuit et téléchargez instantanément votre document Word.'
          ]
        }
      ],
      conclusion: 'La conversion s\'effectue localement dans votre navigateur pour une confidentialité totale.',
      faq: [
        {
          question: 'Cet outil est-il gratuit ?',
          answer: 'Oui, entièrement gratuit et sans aucune limite d\'utilisation.'
        }
      ],
      readingTimeText: '5 min de lecture',
      needToolPrompt: 'Besoin de convertir un PDF maintenant ?'
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
    },
    fr: {
      title: 'Meilleurs outils d\'IA pour créer des présentations en quelques secondes (2026)',
      description: 'Découvrez les meilleurs outils d\'IA pour générer automatiquement des présentations PowerPoint professionnelles et des diapositives percutantes.',
      seoTitle: 'Meilleurs outils d\'IA pour présentations 2026 | PowerPoint par IA',
      seoDescription: 'Créez des présentations professionnelles en quelques secondes grâce à l\'IA générative. Exportez en PowerPoint et PDF facilement.',
      intro: 'Concevoir une présentation professionnelle ne prend plus des heures. Découvrez les outils d\'IA les plus performants pour concevoir vos diapositives automatiquement.',
      sections: [
        {
          id: 'top-ai-presentation-tools',
          heading: 'Les meilleurs générateurs de diapositives par IA',
          paragraphs: [
            'Gamma App se distingue par sa flexibilité et son design moderne adapté à tous les écrans.'
          ]
        }
      ],
      conclusion: 'Gagnez un temps précieux grâce aux générateurs de présentations par intelligence artificielle.',
      faq: [
        {
          question: 'Est-il possible d\'exporter en format PowerPoint ?',
          answer: 'Oui, la plupart des outils modernes permettent l\'exportation directe vers PPTX et PDF.'
        }
      ],
      readingTimeText: '6 min de lecture',
      needToolPrompt: 'Besoin d\'un outil de présentation maintenant ?'
    }
  },

  'best-chatgpt-alternatives-2026': {
    en: {
      title: 'Best ChatGPT Alternatives in 2026 (Free, Powerful & Accurate LLMs Compared)',
      description: 'In-depth comparison of top ChatGPT alternatives in 2026: Claude 3.7 Sonnet, Google Gemini 2.0, DeepSeek R1, and Perplexity with pros, cons, and recommendations.',
      seoTitle: 'Best ChatGPT Alternatives in 2026 | Top Free AI Chatbots Compared',
      seoDescription: 'Looking for ChatGPT alternatives? Discover Claude 3.7, Gemini 2.0, DeepSeek R1, and Perplexity for coding, deep reasoning, and live research.',
      intro: 'While ChatGPT sparked the generative AI revolution, the tech landscape in 2026 offers extraordinary alternatives. From hybrid reasoning and million-token context windows to open-source models, specialized options excel across coding, analysis, and research.',
      sections: [
        {
          id: 'claude-review',
          heading: '1. Claude 3.7 Sonnet: The Coding and Reasoning Powerhouse',
          paragraphs: [
            'Anthropic\'s Claude 3.7 Sonnet introduces hybrid reasoning, allowing users to switch seamlessly between instant replies and extended deliberate thinking.',
            'Its interactive Artifacts workspace lets you run React apps, games, and documents directly in your browser.'
          ]
        },
        {
          id: 'gemini-review',
          heading: '2. Google Gemini 2.0: Massive Context & Workspace Integration',
          paragraphs: [
            'Gemini features up to a 2-million-token context window capable of ingesting whole codebases, hours of video, or entire textbooks, integrated with Google Docs and Drive.'
          ]
        },
        {
          id: 'deepseek-review',
          heading: '3. DeepSeek R1: The Open-Weight Reasoning Revolution',
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
    },
    fr: {
      title: 'Meilleures alternatives à ChatGPT en 2026 (Comparatif des modèles les plus puissants)',
      description: 'Comparatif complet des meilleures alternatives à ChatGPT en 2026 : Claude 3.7, Gemini 2.0, DeepSeek R1 et Perplexity.',
      seoTitle: 'Meilleures alternatives à ChatGPT en 2026 | Comparatif complet',
      seoDescription: 'Vous cherchez une alternative à ChatGPT ? Découvrez Claude 3.7, Gemini 2.0, DeepSeek R1 et Perplexity pour coder, rédiger et rechercher avec précision.',
      intro: 'En 2026, ChatGPT n\'est plus la seule référence. Des modèles plus performants en programmation, en raisonnement et en recherche documentaire sont désormais disponibles.',
      sections: [
        {
          id: 'claude-review',
          heading: '1. Claude 3.7 Sonnet : Le champion du code et de la réflexion',
          paragraphs: [
            'Claude 3.7 Sonnet d\'Anthropic offre un raisonnement hybride de premier ordre et un espace Artifacts interactif.'
          ]
        }
      ],
      conclusion: 'Chaque modèle possède des atouts distincts selon vos besoins professionnels ou académiques.',
      faq: [
        {
          question: 'Quel est le meilleur modèle pour le développement et le code ?',
          answer: 'Claude 3.7 Sonnet est généralement considéré comme le plus rigoureux et précis pour la programmation.'
        }
      ],
      readingTimeText: '8 min de lecture',
      needToolPrompt: 'Envie de tester ces modèles dès maintenant ?'
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
    },
    fr: {
      title: 'Comment compresser un PDF et réduire sa taille sans perte de qualité (Guide 2026)',
      description: 'Méthodes gratuites et rapides pour réduire le poids de vos fichiers PDF jusqu\'à 80% tout en conservant la netteté des textes et des images.',
      seoTitle: 'Comment compresser un PDF gratuitement en ligne | Guide 2026',
      seoDescription: 'Réduisez la taille de vos fichiers PDF en quelques secondes directement dans votre navigateur. Compression locale, rapide et confidentielle.',
      intro: 'Découvrez comment réduire le poids de vos fichiers PDF pour les envoyer facilement par email ou les soumettre sur des formulaires administratifs sans perte de lisibilité.',
      sections: [
        {
          id: 'step-by-step',
          heading: 'Comment compresser un PDF sur Adawatai',
          paragraphs: [
            'Sélectionnez votre fichier, appliquez la compression et téléchargez instantanément votre document allégé.'
          ]
        }
      ],
      conclusion: 'Compressez vos fichiers en toute sécurité grâce à notre outil fonctionnant directement dans votre navigateur.',
      faq: [
        {
          question: 'La compression réduit-elle la netteté du texte ?',
          answer: 'Non, les polices vectorielles restent parfaitement nettes. L\'optimisation cible principalement les images et les métadonnées.'
        }
      ],
      readingTimeText: '5 min de lecture',
      needToolPrompt: 'Besoin de compresser un PDF maintenant ?'
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
        bulletPoints: s.bulletPoints
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
    needToolPrompt: loc.needToolPrompt || (lang === 'fr' ? 'Besoin de cet outil maintenant ?' : 'Need the tool right now?')
  };
};

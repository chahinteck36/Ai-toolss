import { AiTool } from '../types';

export interface ToolTranslationData {
  taglineEn: string;
  descriptionEn: string;
  pricingDetailsEn?: string;
  prosEn?: string[];
  consEn?: string[];
  useCasesEn?: string[];
  platformsEn?: string[];
}

export const TOOL_TRANSLATIONS: Record<string, ToolTranslationData> = {
  'chatgpt': {
    taglineEn: 'The world-renowned AI conversational assistant by OpenAI featuring GPT-4o, reasoning models o1 & o3-mini',
    descriptionEn: 'The leading generative AI platform by OpenAI, combining ultra-fast GPT-4o with deep reasoning models o1 and o3-mini, complete with Canvas interactive workspace and live cited web search.',
    pricingDetailsEn: 'Free plan with GPT-4o mini, web search and Canvas. Plus subscription ($20/mo) unlocks complete access to o1, o3-mini, and DALL-E image generation.',
    prosEn: [
      'Exceptional multilingual understanding and natural conversation flow',
      'Advanced reasoning models (o1 & o3-mini) for complex STEM and coding problems',
      'Interactive Canvas editor for real-time document editing and live code execution',
      'Built-in ultra-realistic image generation and grounded live web browsing'
    ],
    consEn: [
      'Free tier might introduce temporary rate limits during peak worldwide hours'
    ],
    useCasesEn: [
      'Drafting, rewriting, and translating professional essays, reports, and emails',
      'Full-stack programming assistance, bug diagnosing, and system architecture',
      'Document and research paper summarization with instant key point extraction'
    ],
    platformsEn: ['Web', 'iOS', 'Android', 'macOS', 'Windows']
  },
  'claude': {
    taglineEn: 'The premier hybrid reasoning model worldwide for nuanced coding, logical analysis, and document comprehension',
    descriptionEn: 'Claude 3.7 Sonnet introduces the first hybrid reasoning architecture, enabling seamless toggling between instant responses and extended deep thinking, alongside interactive Artifacts for live React and code execution in the browser.',
    pricingDetailsEn: 'Generous free daily tier. Pro plan ($20/mo) unlocks 5x usage limits, extended reasoning budget, and full access to Claude 3.7 Sonnet.',
    prosEn: [
      'First hybrid reasoning engine with user-controlled thinking budget',
      'Interactive Artifacts environment for previewing React apps, SVGs, and games live',
      'Massive 200,000 token context window capable of ingesting entire codebases and books',
      'Nuanced, objective human-like writing tone without robotic clichés'
    ],
    consEn: [
      'Does not natively generate raster images inside chat interface'
    ],
    useCasesEn: [
      'Synthesizing dense scientific papers, long books, and multi-file codebases',
      'Architectural software design, refactoring complex code, and vulnerability auditing'
    ],
    platformsEn: ['Web', 'iOS', 'Android']
  },
  'gemini': {
    taglineEn: 'Google multimodal powerhouse with 1-2 million token context window, live web grounding, and Workspace integration',
    descriptionEn: 'Google latest multimodal AI model built natively to process text, code, high-resolution imagery, video, and audio simultaneously with ultra-long context and deep Google Workspace connectivity.',
    pricingDetailsEn: 'Free unlimited daily tier with Gemini 2.0 Flash. Advanced tier available via Google One AI Premium ($19.99/mo) with Gemini 2.5 Pro and 2M context.',
    prosEn: [
      'Industry-leading 1M to 2M token context window for analyzing hours of video and huge datasets',
      'Direct native integration with Gmail, Google Docs, Drive, Maps, and YouTube',
      'Ultra-fast multimodal audio and visual processing at near-zero latency',
      'Deep live Google search grounding with clickable source citations'
    ],
    consEn: [
      'Requires occasional manual verification for highly specialized code libraries'
    ],
    useCasesEn: [
      'Real-time web discovery and fact-checked research synthesis',
      'Summarizing hour-long YouTube lectures, podcasts, and giant PDF manuals'
    ],
    platformsEn: ['Web', 'Android', 'iOS']
  },
  'deepseek': {
    taglineEn: 'Open-weight reasoning revolution delivering frontier math, coding, and logical thinking at unmatched efficiency',
    descriptionEn: 'The breakthrough open-source AI model that redefined industry cost-efficiency, matching closed frontier models in mathematics, coding, and logical inference through native reinforcement learning.',
    pricingDetailsEn: 'Completely 100% free web chat interface. Ultra-cheap developer API with pricing up to 95% lower than comparable frontier alternatives.',
    prosEn: [
      'Unrivaled mathematical logic and algorithmic reasoning competing with closed frontier models',
      'Completely free web chat without mandatory subscription barriers',
      'Transparent chain-of-thought display showing internal deduction steps',
      'Open weights available for local deployment via Ollama and vLLM'
    ],
    consEn: [
      'Occasional server busy alerts during peak international traffic hours'
    ],
    useCasesEn: [
      'Solving complex mathematical proofs, physics problems, and algorithmic puzzles',
      'Backend system engineering, algorithmic optimization, and competitive coding'
    ],
    platformsEn: ['Web', 'iOS', 'Android', 'API']
  },
  'midjourney': {
    taglineEn: 'The gold standard in photorealistic, cinematic image generation with an intuitive web workspace',
    descriptionEn: 'The premier creative platform for generating breathtaking concept art, cinematic photography, architectural renderings, and graphic design with unmatched aesthetic coherence and detail control.',
    pricingDetailsEn: 'Subscription plans start at $10/month (Basic Plan), with standard unlimited relaxed generation at $30/month.',
    prosEn: [
      'Supreme aesthetic quality, dynamic lighting, and photorealistic skin textures',
      'Modern web-based generation canvas with inpainting, outpainting, and pan controls',
      'Vast creative styles ranging from editorial photography to anime and oil paintings',
      'Active global creative community with rich prompt inspiration feeds'
    ],
    consEn: [
      'No permanent free tier; requires active paid subscription'
    ],
    useCasesEn: [
      'High-end advertising imagery, concept art, and visual brand identity',
      'Cinematic photography, book covers, and game character design'
    ],
    platformsEn: ['Web', 'Discord']
  },
  'leonardo-ai': {
    taglineEn: 'All-in-one AI creative studio with daily free credits, custom model training, and canvas editor',
    descriptionEn: 'Comprehensive creative suite designed for game developers, artists, and marketers, featuring daily free generation tokens, character consistency tools, and fine-tuned community models.',
    pricingDetailsEn: 'Generous free tier with 150 daily tokens. Paid plans start at $12/month for faster generations and private mode.',
    prosEn: [
      'Free 150 daily tokens renewed every 24 hours',
      'Precision control over character consistency, poses, and custom LoRA models',
      'Interactive AI Canvas for real-time inpainting, background expansion, and vectorization',
      'Motion generation tools to animate static artwork into video clips'
    ],
    consEn: [
      'Advanced features require understanding prompt weights and guidance scales'
    ],
    useCasesEn: [
      'Creating 2D/3D game assets, character sheets, and texture maps',
      'Marketing banners, UI mockups, and consistent brand visuals'
    ],
    platformsEn: ['Web', 'iOS', 'Android']
  },
  'runway-gen3': {
    taglineEn: 'Cinematic video generation with precision camera control, physics fidelity, and 4K upscaling',
    descriptionEn: 'The preferred generative video suite for film directors and ad agencies, capable of producing photorealistic video clips up to 4K resolution with exact motion brushes, camera directing, and Lip Sync audio.',
    pricingDetailsEn: 'Free trial tier with one-time credits. Standard plan starts at $15/month for unlimited generation credits.',
    prosEn: [
      'Next-generation physical simulation of water, smoke, fabric, and human motion',
      'Advanced motion brush and camera trajectory controls (pan, zoom, orbit)',
      'High-definition upscaling and lip sync integration with natural voice tracks',
      'Text-to-video, image-to-video, and video-to-video transformation modes'
    ],
    consEn: [
      'Video generations consume credits quickly on high-resolution settings'
    ],
    useCasesEn: [
      'Commercial advertising production, b-roll creation, and cinematic trailers',
      'Music video visualizations and social media video campaigns'
    ],
    platformsEn: ['Web', 'iOS']
  },
  'cursor-ide': {
    taglineEn: 'The leading AI-native code editor with Composer multi-file editing and autonomous Agent Mode',
    descriptionEn: 'The groundbreaking VS Code fork integrated deeply with frontier AI models (Claude 3.7, GPT-4o), enabling developers to edit dozens of project files simultaneously, run terminal commands, and debug errors autonomously.',
    pricingDetailsEn: 'Free tier includes basic completions and 50 slow premium requests. Pro plan ($20/mo) provides 500 fast requests and unlimited Composer edits.',
    prosEn: [
      'Composer mode edits multiple interrelated project files in a single unified diff',
      'Agent mode autonomously executes terminal scripts, detects errors, and applies patches',
      'Indexing entire repository codebases for accurate semantic context retrieval',
      'Full compatibility with all VS Code extensions, themes, and keybindings'
    ],
    consEn: [
      'Consumes compute credits rapidly on large codebase refactoring sessions'
    ],
    useCasesEn: [
      'Building complete full-stack web and mobile applications from scratch',
      'Refactoring legacy codebases and fixing obscure runtime bugs across files'
    ],
    platformsEn: ['macOS', 'Windows', 'Linux']
  },
  'v0-dev': {
    taglineEn: 'Generate production-ready React components and responsive Tailwind CSS UIs from natural language',
    descriptionEn: 'Innovative developer tool by Vercel that converts plain language descriptions and screenshot references into clean, accessible React, Next.js, and Tailwind CSS code with instant live previews.',
    pricingDetailsEn: 'Free tier with daily generation credits. Premium tier ($20/mo) provides unlimited private generations and project downloads.',
    prosEn: [
      'Generates modular, copy-paste ready React and Tailwind CSS components',
      'Live responsive browser preview with dark mode and interactive toggle states',
      'Seamless one-click export to Next.js or direct import via npx CLI',
      'Accepts image and design mockups as direct inspiration input'
    ],
    consEn: [
      'Focused strictly on frontend UI code rather than complete backend logic'
    ],
    useCasesEn: [
      'Rapidly scaffolding modern SaaS dashboards, landing pages, and components',
      'Converting Figma design screenshots into working production code'
    ],
    platformsEn: ['Web']
  },
  'elevenlabs': {
    taglineEn: 'Industry standard for natural text-to-speech, instant voice cloning, and audio dubbing',
    descriptionEn: 'State-of-the-art voice AI platform delivering remarkably human-like emotional speech synthesis in 29+ languages including Arabic with regional accents, instant voice cloning, and automated video dubbing.',
    pricingDetailsEn: 'Free plan with 10,000 characters per month. Starter plan begins at $5/month with commercial licensing and voice cloning.',
    prosEn: [
      'Hyper-realistic voice synthesis with nuanced emotion, breathing, and pitch dynamics',
      'Accurate pronunciation of Arabic text with multi-dialect support',
      'Instant voice cloning with just 1 minute of sample audio',
      'AI Sound Effects generator for games, podcasts, and cinema'
    ],
    consEn: [
      'Character allocations in free plan deplete quickly for long audiobooks'
    ],
    useCasesEn: [
      'Professional voiceovers for advertisements, audiobooks, and documentaries',
      'Automated multilingual video dubbing with original speaker voice preservation'
    ],
    platformsEn: ['Web', 'API', 'iOS', 'Android']
  },
  'suno-ai': {
    taglineEn: 'Compose complete studio-quality songs and original music with vocals and instruments in any genre',
    descriptionEn: 'Pioneering generative music platform that composes radio-ready songs complete with expressive vocals, lyrics, guitar solos, and orchestral arrangements across pop, rock, jazz, and traditional genres in seconds.',
    pricingDetailsEn: 'Free tier provides 50 daily credits (creates 10 songs daily). Pro plan at $10/month unlocks 2,500 credits and commercial rights.',
    prosEn: [
      'Produces full vocal and instrumental songs with verses, choruses, and bridges',
      'Supports diverse genres from hip-hop to classical and Arabic musical maqams',
      'Allows custom lyric input or AI-assisted lyric generation',
      'Audio inpainting to extend songs, add drops, and tweak specific sections'
    ],
    consEn: [
      'Free tier songs do not include commercial usage rights'
    ],
    useCasesEn: [
      'Creating background music for YouTube, podcasts, and commercial videos',
      'Prototyping musical concepts, catchy hooks, and original soundtracks'
    ],
    platformsEn: ['Web', 'iOS', 'Android']
  },
  'perplexity-ai': {
    taglineEn: 'Grounded AI search engine delivering verified answers, comprehensive research reports, and citations',
    descriptionEn: 'The modern alternative to legacy search engines, delivering direct conversational answers backed by live clickable citations, deep academic filtering, and comprehensive multi-source synthesis.',
    pricingDetailsEn: 'Free unlimited standard search. Pro tier ($20/mo) unlocks 300+ daily Deep Research queries and top models (Claude 3.7, GPT-4o).',
    prosEn: [
      'Every single factual claim is linked directly to authoritative web sources',
      'Deep Research mode autonomously browses dozens of sources to write comprehensive dossiers',
      'Specialized focus modes: Academic, YouTube, Reddit, Computational, and News',
      'Clean ad-free interface focused purely on synthesized information'
    ],
    consEn: [
      'Deep Research reports can take a minute or two to assemble extensive citations'
    ],
    useCasesEn: [
      'Fact-checked investigative research and competitive market analysis',
      'Literature reviews and quick verification of breaking scientific news'
    ],
    platformsEn: ['Web', 'iOS', 'Android', 'macOS']
  },
  'gamma-app': {
    taglineEn: 'Create beautiful presentations, web pages, and documents in seconds with AI',
    descriptionEn: 'Modern presentation and documentation platform that turns simple outlines into polished, responsive slide decks, visual documents, and webpages without tedious manual layout formatting.',
    pricingDetailsEn: 'Free tier with 400 one-time starter credits. Plus plan starts at $10/month for unlimited AI card creation.',
    prosEn: [
      'Generates complete slide decks with cohesive color palettes and smart layouts',
      'Interactive embeds: forms, live charts, Loom videos, and web components',
      'One-click aesthetic restyling and automated tone adjustment',
      'Direct export to PowerPoint (PPTX), PDF, or shareable web links'
    ],
    consEn: [
      'AI formatting sometimes requires slight manual tweaks for dense tables'
    ],
    useCasesEn: [
      'Pitch decks for startups, client presentations, and executive summaries',
      'Interactive training workshops and educational course modules'
    ],
    platformsEn: ['Web']
  },
  'notion-ai': {
    taglineEn: 'Integrated AI writing, organization, and Q&A assistant embedded directly inside your Notion workspace',
    descriptionEn: 'Intelligent workspace companion built into Notion that drafts meeting summaries, extracts action items, edits writing tone, and answers questions by searching your entire internal knowledge database.',
    pricingDetailsEn: 'Add-on subscription for $10 per member per month with unlimited AI generation and database queries.',
    prosEn: [
      'Seamless integration within documents, wikis, and Kanban project boards',
      'Q&A feature searches across all internal Notion pages to surface exact answers',
      'Automated column population in databases (summaries, tags, translation)',
      'Instant action item extraction from unstructured meeting notes'
    ],
    consEn: [
      'Requires an existing Notion workspace to utilize effectively'
    ],
    useCasesEn: [
      'Knowledge management, team wikis, and company operating procedures',
      'Meeting transcript summarization and automated project task tracking'
    ],
    platformsEn: ['Web', 'macOS', 'Windows', 'iOS', 'Android']
  },
  'canva-magic-studio': {
    taglineEn: 'Comprehensive suite of creative AI tools for social media design, presentations, and branding',
    descriptionEn: 'AI-powered graphic design ecosystem inside Canva, offering one-click background removal, Magic Eraser, text-to-image generation, design translation, and automated social media resizing.',
    pricingDetailsEn: 'Free basic plan. Canva Pro ($12.99/mo) unlocks all Magic Studio AI tools and premium asset libraries.',
    prosEn: [
      'Extremely beginner-friendly interface with millions of ready-made templates',
      'Magic Switch converts presentations into blog posts and resizes across social formats',
      'One-click background removal and generative fill photo editing',
      'Full team collaboration and shared brand kit asset management'
    ],
    consEn: [
      'Advanced photorealistic generation is less customizable than dedicated tools like Midjourney'
    ],
    useCasesEn: [
      'Social media graphics, YouTube thumbnails, and marketing banners',
      'Company presentations, infographics, and printable business collateral'
    ],
    platformsEn: ['Web', 'macOS', 'Windows', 'iOS', 'Android']
  },
  'heygen': {
    taglineEn: 'Create professional business videos with realistic digital avatars and voice dubbing',
    descriptionEn: 'Leading enterprise video generation platform that creates studio-quality spokesperson videos with ultra-realistic AI avatars, multi-language lip syncing, and zero camera equipment needed.',
    pricingDetailsEn: 'Free plan with 1 free credit. Paid creator plans start at $29/month with 1080p and 4K exports.',
    prosEn: [
      'Hyper-realistic human avatars with natural head movements and facial expressions',
      'Video translation with automatic voice cloning and flawless lip sync adaptation',
      'Instant custom avatar creation using a brief webcam or smartphone video',
      'Over 300+ realistic voices in 175+ languages and regional accents'
    ],
    consEn: [
      'Rendering high-resolution videos takes several minutes on standard queues'
    ],
    useCasesEn: [
      'Corporate onboarding, product walkthroughs, and customer support videos',
      'Multilingual marketing campaigns and localized video advertisements'
    ],
    platformsEn: ['Web', 'API']
  },
  'github-copilot': {
    taglineEn: 'The world most widely adopted AI coding assistant integrated directly into VS Code and JetBrains',
    descriptionEn: 'Trained on billions of lines of public code, GitHub Copilot acts as an AI pair programmer inside your IDE, offering inline autocomplete suggestions, terminal explanations, and test generation.',
    pricingDetailsEn: 'Individual plan costs $10/month or $100/year. Free for verified students, educators, and popular open-source maintainers.',
    prosEn: [
      'Instant low-latency inline code completions across virtually all programming languages',
      'Interactive Copilot Chat for diagnosing bugs and generating unit test suites',
      'Copilot CLI explains shell commands and terminal error logs',
      'Broad IDE support: VS Code, JetBrains IDEs, Neovim, and Visual Studio'
    ],
    consEn: [
      'Multi-file architectural changes are more limited than native agent editors like Cursor'
    ],
    useCasesEn: [
      'Accelerating daily development by auto-generating boilerplate and utility functions',
      'Writing automated unit tests and documenting API functions'
    ],
    platformsEn: ['VS Code', 'JetBrains', 'Visual Studio', 'Neovim']
  },
  'deepl-translate': {
    taglineEn: 'The most accurate contextual translation engine worldwide with natural phrasing and PDF document support',
    descriptionEn: 'Industry standard neural translation service renowned for capturing subtle linguistic idioms and professional nuance far beyond standard machine translation, supporting full PDF, DOCX, and PPTX file translation.',
    pricingDetailsEn: 'Free web translation up to 1,500 characters per batch. Pro plans start at $8.74/month for unlimited text and file translations.',
    prosEn: [
      'Superior linguistic nuance, accurate idiomatic phrasing, and natural flow',
      'Translates complete PDF, Word, and PowerPoint files while preserving original formatting',
      'Customizable translation glossaries and formal vs. informal tone switching',
      'Desktop apps with global keyboard shortcuts for instant text translation'
    ],
    consEn: [
      'Supports a curated set of major languages rather than exhaustive global coverage'
    ],
    useCasesEn: [
      'Translating legal contracts, business proposals, and executive correspondence',
      'Translating multi-page academic papers and presentations while preserving design'
    ],
    platformsEn: ['Web', 'Windows', 'macOS', 'iOS', 'Android', 'Chrome Extension']
  },
  'jasper-ai': {
    taglineEn: 'Enterprise AI marketing platform for brand-consistent copywriting, campaigns, and SEO articles',
    descriptionEn: 'Marketing-centric generative platform tailored for content teams, offering Brand Voice adherence, automated multi-channel campaign generation, and built-in SEO scoring.',
    pricingDetailsEn: 'Pro plan starts at $59/month with full Brand Voice customization and 3 company knowledge assets.',
    prosEn: [
      'Custom Brand Voice trains the AI to consistently mimic company writing guidelines',
      'Integrated campaigns feature outputs blog posts, social captions, and emails simultaneously',
      'Direct integration with Surfer SEO for keyword optimization and content ranking',
      'Company knowledge library allows uploading company docs for factual marketing'
    ],
    consEn: [
      'Higher subscription price compared to general-purpose chat models'
    ],
    useCasesEn: [
      'Marketing agencies creating high-volume blog articles and social media copy',
      'Enterprise marketing departments enforcing strict brand consistency'
    ],
    platformsEn: ['Web', 'Chrome Extension']
  },
  'quillbot': {
    taglineEn: 'The leading academic paraphrasing tool, grammar checker, and citation generator',
    descriptionEn: 'All-in-one writing and paraphrasing tool trusted by millions of students, researchers, and professionals to rephrase sentences, improve vocabulary, check grammar, and generate bibliography citations.',
    pricingDetailsEn: 'Free plan includes Standard and Fluency paraphrasing modes up to 125 words. Premium plan ($4.17/mo billed annually) unlocks all 8 modes and unlimited words.',
    prosEn: [
      'Multiple specialized paraphrasing modes: Academic, Formal, Simple, Creative, Shorten',
      'Interactive synonym slider to control degree of vocabulary change',
      'Built-in grammar checker, plagiarism scanner, and citation generator (APA, MLA, Chicago)',
      'Browser extension for seamless integration with Google Docs and Microsoft Word'
    ],
    consEn: [
      'Free plan restricts input text length to 125 words per rewrite'
    ],
    useCasesEn: [
      'Paraphrasing research abstracts and scholarly essays to avoid accidental plagiarism',
      'Refining English tone and clarity for non-native academic writers'
    ],
    platformsEn: ['Web', 'Chrome Extension', 'Word Add-in']
  },
  'phind-ai': {
    taglineEn: 'Intelligent search engine engineered specifically for software developers and systems architects',
    descriptionEn: 'Developer-tailored search engine that solves programming queries with technical precision, providing runnable code snippets, detailed architecture explanations, and documentation links.',
    pricingDetailsEn: 'Free unlimited search with standard model. Phind Pro ($20/mo) unlocks Claude 3.7 Sonnet and GPT-4o with larger context.',
    prosEn: [
      'Provides copy-pasteable code solutions with zero fluff or conversational filler',
      'Indexes official documentation, GitHub repositories, and developer release notes',
      'Pair Programmer mode for iterative code development and debugging',
      'VS Code extension for searching solutions directly within the code editor'
    ],
    consEn: [
      'Specialized purely for technical coding; not intended for general lifestyle queries'
    ],
    useCasesEn: [
      'Resolving obscure compiler bugs, stack traces, and library incompatibilities',
      'Learning new programming frameworks and modern API conventions rapidly'
    ],
    platformsEn: ['Web', 'VS Code Extension']
  },
  'descript': {
    taglineEn: 'Edit podcast and video recordings as simply as editing a Word document with automated studio sound',
    descriptionEn: 'Revolutionary video and audio editing workspace where deleting or retyping text in an auto-generated transcript immediately edits the underlying video and audio timeline.',
    pricingDetailsEn: 'Free plan with 1 transcription hour per month and 720p exports. Creator plan starts at $12/month.',
    prosEn: [
      'Edit video and audio directly by editing the transcribed text script',
      'Studio Sound removes background hiss, echo, and room noise with a single click',
      'Automatic filler word removal eliminates "um", "uh", and awkward silences instantly',
      'Overdub technology allows re-recording mistaken words using AI voice synthesis'
    ],
    consEn: [
      'Heavy multitrack 4K video projects require a relatively modern computer'
    ],
    useCasesEn: [
      'Producing podcasts, video interviews, and YouTube video essays',
      'Generating captioned social media video shorts and vertical reels'
    ],
    platformsEn: ['macOS', 'Windows', 'Web']
  },
  'krea-ai': {
    taglineEn: 'Real-time AI generation canvas and creative upscaler that paints while you sketch',
    descriptionEn: 'Cutting-edge creative environment offering real-time AI canvas rendering that responds to mouse brush strokes instantaneously, alongside an ultra-high-definition image and video enhancer.',
    pricingDetailsEn: 'Free tier with daily generation credits. Basic paid plan starts at $10/month for faster rendering.',
    prosEn: [
      'Real-time generation latency renders visual changes instantaneously as you draw',
      'High-end creative upscaler sharpens blurry images and adds crisp realistic details',
      'Supports screen sharing: use Photoshop or Blender as real-time AI input',
      'AI video generation and camera trajectory choreography controls'
    ],
    consEn: [
      'Real-time drawing requires a stable broadband internet connection'
    ],
    useCasesEn: [
      'Rapid concept ideation for industrial designers, illustrators, and architects',
      'Upscaling and restoring low-resolution photos and art to print-ready 4K'
    ],
    platformsEn: ['Web']
  },
  'huggingface': {
    taglineEn: 'The definitive open-source AI platform, hosting over 1 million models, datasets, and ML spaces',
    descriptionEn: 'The "GitHub of Machine Learning", hosting hundreds of thousands of open-source models (LLMs, vision, audio), curated datasets, and interactive browser demos (Spaces) powered by Gradio and Streamlit.',
    pricingDetailsEn: 'Completely free for hosting and downloading open-source models. Pro plan ($9/mo) and pay-per-hour cloud GPU compute.',
    prosEn: [
      'Central global hub for open-weights models (Llama, Mistral, Whisper, Stable Diffusion)',
      'Free interactive demo testing in browser via community Spaces',
      'Industry-standard Transformers and Diffusers Python libraries',
      'Transparent model cards detailing training datasets, benchmarks, and licensing'
    ],
    consEn: [
      'Requires technical developer knowledge to set up local inference and fine-tuning'
    ],
    useCasesEn: [
      'Discovering and deploying open-source machine learning models to production',
      'Accessing curated research datasets and testing community demos'
    ],
    platformsEn: ['Web', 'Python SDK', 'CLI']
  },
  'zotero': {
    taglineEn: 'The #1 free and open-source academic research assistant for managing citations and bibliographies',
    descriptionEn: 'Non-profit academic tool trusted by university professors and graduate students worldwide to collect, organize, annotate, and cite research papers across 10,000+ citation formats.',
    pricingDetailsEn: 'Completely 100% free and open-source with 300MB free cloud sync. Unlimited cloud storage options starting at $20/year.',
    prosEn: [
      '100% non-profit and open-source with zero commercial lock-in or tracking',
      'One-click browser extension saves papers, metadata, and full-text PDFs automatically',
      'Built-in PDF reader with color-coded highlighting and note extraction',
      'Automatic citation insertion in Microsoft Word, Google Docs, and LibreOffice'
    ],
    consEn: [
      'Default 300MB free cloud storage requires upgrade or WebDAV sync for huge PDF libraries'
    ],
    useCasesEn: [
      'Organizing literature reviews for Master and PhD dissertations',
      'Auto-generating formatted bibliographies in APA, Harvard, IEEE, and Chicago styles'
    ],
    platformsEn: ['Windows', 'macOS', 'Linux', 'iOS', 'Android', 'Browser Extension']
  },
  'scispace': {
    taglineEn: 'AI research assistant to decode complex academic papers, equations, and literature reviews',
    descriptionEn: 'Scholarly intelligence platform that allows researchers to highlight complex scientific paragraphs or math equations in any PDF to receive plain-language explanations, citations, and summaries.',
    pricingDetailsEn: 'Free plan with generous daily AI queries and paper searches. Premium plan starts at $12/month for unlimited synthesis.',
    prosEn: [
      'Highlight any dense equation, table, or paragraph to get an instant simplified explanation',
      'AI literature review search summarizes findings across 200M+ research papers',
      'Chat with multiple PDFs simultaneously to cross-reference experimental data',
      'Available in 75+ languages including comprehensive Arabic explanation support'
    ],
    consEn: [
      'Full-paper automated synthesis can occasionally miss nuanced laboratory methodologies'
    ],
    useCasesEn: [
      'Accelerating literature reviews and understanding complex academic papers',
      'Extracting key takeaways, sample sizes, and methodology differences across studies'
    ],
    platformsEn: ['Web', 'Chrome Extension']
  },
  'overleaf': {
    taglineEn: 'The leading collaborative cloud LaTeX editor for writing and publishing scientific papers',
    descriptionEn: 'Standard collaborative authoring platform for mathematicians, physicists, and computer scientists, offering real-time LaTeX editing, journal templates, and direct submission to IEEE, Springer, and arXiv.',
    pricingDetailsEn: 'Free plan with unlimited private projects and 1 collaborator. Student and standard plans start at $15/month for multi-author real-time sync.',
    prosEn: [
      'Real-time collaborative editing with track changes, comments, and version history',
      'Thousands of official journal templates for IEEE, ACM, Springer, Elsevier, and Nature',
      'Instant cloud compilation with split-screen PDF preview; zero local LaTeX setup required',
      'Seamless integration with Zotero, Mendeley, and Git repositories'
    ],
    consEn: [
      'LaTeX compilation timeouts can occur on very large book-length documents in free tier'
    ],
    useCasesEn: [
      'Collaborative writing of scientific papers, journal submissions, and theses',
      'Typesetting mathematical formulas, algorithmic proofs, and conference posters'
    ],
    platformsEn: ['Web']
  },
  'research-rabbit': {
    taglineEn: 'The "Spotify for academic research" visualizing citation networks and discovering linked papers',
    descriptionEn: 'Innovative visual discovery engine that transforms literature searches into interactive citation maps, uncovering co-authorships, seminal pioneer papers, and newly published follow-up studies.',
    pricingDetailsEn: 'Completely 100% free for academic researchers, scholars, and students worldwide.',
    prosEn: [
      'Interactive visual graph maps connections between earlier and later citing papers',
      'Personalized paper recommendations tailored to custom research collections',
      'Direct two-way synchronization with Zotero libraries and collections',
      'Completely free with no hidden paywalls or subscription requirements'
    ],
    consEn: [
      'Graph visualization can become visually dense when mapping collections over 500 papers'
    ],
    useCasesEn: [
      'Exploring literature review citation webs and finding missing seminal research',
      'Staying updated with automatic email alerts on new papers matching your interests'
    ],
    platformsEn: ['Web']
  },
  'geogebra': {
    taglineEn: 'Dynamic mathematical simulation software uniting geometry, algebra, calculus, and 3D graphing',
    descriptionEn: 'World-renowned educational mathematics software connecting geometry, algebra, spreadsheets, graphing, and calculus in an intuitive dynamic package used by millions of teachers and students.',
    pricingDetailsEn: '100% free for non-commercial educational use across all platforms.',
    prosEn: [
      'Dynamic interactive link between algebraic equations and geometric figures',
      'Comprehensive toolset: 2D/3D graphing calculator, CAS, and geometry constructor',
      'Vast library of millions of free interactive classroom simulations and lesson plans',
      'Completely free, open-access, and runs offline on mobile and desktop'
    ],
    consEn: [
      'Complex advanced scripting requires familiarity with GeoGebra syntax'
    ],
    useCasesEn: [
      'Visualizing mathematical proofs, calculus functions, and geometric theorems',
      'Teaching STEM concepts with interactive real-time parameter sliders'
    ],
    platformsEn: ['Web', 'Windows', 'macOS', 'Linux', 'iOS', 'Android']
  },
  'desmos': {
    taglineEn: 'The gold standard online graphing calculator and interactive math classroom platform',
    descriptionEn: 'Beloved web and mobile graphing calculator known for its intuitive equation entry, fluid real-time animation sliders, and engaging interactive classroom activities.',
    pricingDetailsEn: 'Completely 100% free with no advertisements or paid subscriptions.',
    prosEn: [
      'Silky-smooth, instant rendering of implicit curves, polar plots, and inequalities',
      'Interactive sliders bring static formulas to life with fluid animation',
      'Accessible design featuring screen-reader math support and audio trace curves',
      'No account registration required for basic calculations and graph plotting'
    ],
    consEn: [
      'Does not natively render three-dimensional (3D) surfaces like GeoGebra 3D'
    ],
    useCasesEn: [
      'Plotting mathematical curves, statistics regressions, and algebraic functions',
      'High school and university mathematics exam preparation and homework validation'
    ],
    platformsEn: ['Web', 'iOS', 'Android']
  },
  'consensus': {
    taglineEn: 'Evidence-based search engine synthesizing findings from over 200 million peer-reviewed papers',
    descriptionEn: 'Academic search engine powered by AI that extracts, aggregates, and summarizes scientific consensus directly from peer-reviewed research papers without hallucinations.',
    pricingDetailsEn: 'Free plan with unlimited basic searches. Premium plan ($8.99/mo) unlocks unlimited AI Consensus Meters and deep summaries.',
    prosEn: [
      'Consensus Meter visually indicates percentage agreement across scientific studies',
      'Every answer is extracted strictly from peer-reviewed journals (PubMed, Nature, etc.)',
      'Study quality snapshots highlight sample sizes, methodology, and study designs',
      'Zero commercial blog spam; purely grounded scientific literature'
    ],
    consEn: [
      'Works best for empirical scientific, medical, and social science research questions'
    ],
    useCasesEn: [
      'Answering health, nutrition, and psychological questions with evidence-based rigor',
      'Finding authoritative peer-reviewed citations for academic essays and dissertations'
    ],
    platformsEn: ['Web']
  },
  'deepseek-r1': {
    taglineEn: 'The frontier open-source reasoning model rivaling OpenAI o1 in mathematics and code',
    descriptionEn: 'Pioneering open-weight reasoning model developed by DeepSeek using large-scale reinforcement learning, demonstrating peerless capabilities in formal logic, competitive coding, and math.',
    pricingDetailsEn: 'Completely 100% free web chat. Open weights MIT licensed for local execution.',
    prosEn: [
      'Matches closed frontier models in AIME math and code benchmark evaluations',
      'Completely free to use with visible internal reasoning traces',
      'Open-weight accessibility allows running privately offline via Ollama',
      'Extremely economical API pricing for developers and businesses'
    ],
    consEn: [
      'Can occasionally exhibit longer thinking times before delivering responses'
    ],
    useCasesEn: [
      'Solving complex mathematical proofs and university-level engineering problems',
      'Deep algorithmic debugging and competitive programming'
    ],
    platformsEn: ['Web', 'API', 'Ollama']
  },
  'claude-3-7': {
    taglineEn: 'The world first hybrid reasoning model combining instant responses with extended deep thinking',
    descriptionEn: 'The flagship model from Anthropic, Claude 3.7 Sonnet introduces controllable reasoning budget alongside industry-leading software development capabilities and live interactive Artifacts.',
    pricingDetailsEn: 'Free daily access. Pro tier ($20/mo) unlocks high-volume capacity, extended thinking mode, and early features.',
    prosEn: [
      'Controllable reasoning budget allows tuning thinking duration per challenge',
      'World-record benchmark scores on SWE-bench for real-world software engineering',
      'Interactive Artifacts for rendering full web applications in real-time',
      'Massive 200K token context window capable of ingesting whole code repos'
    ],
    consEn: [
      'High reasoning modes require slightly more latency to complete thorough deduction'
    ],
    useCasesEn: [
      'Architecting enterprise codebases, refactoring services, and resolving race conditions',
      'Drafting nuanced technical documentation and complex legal analysis'
    ],
    platformsEn: ['Web', 'API', 'iOS', 'Android']
  },
  'gemini-2-5-pro': {
    taglineEn: 'Google most advanced multimodal model with 2 million context and deep thinking mode',
    descriptionEn: 'Google premier frontier model combining multi-step reasoning with a colossal 2M token context window, capable of analyzing hours of video, audiobooks, and massive codebases in a single prompt.',
    pricingDetailsEn: 'Available via Google AI Studio and Google One AI Premium ($19.99/mo).',
    prosEn: [
      'Colossal 2,000,000 token context window—the largest of any production AI model',
      'Native multimodal processing of video, audio, code, and high-res imagery',
      'Deep integration with Google search ecosystem and cloud infrastructure',
      'Exceptional performance on complex reasoning, translation, and long document QA'
    ],
    consEn: [
      'Advanced Pro models require paid subscription or API billing for heavy usage'
    ],
    useCasesEn: [
      'Analyzing entire corporate documentation repositories and legacy software stacks',
      'Multi-hour video understanding, automatic subtitle generation, and clip extraction'
    ],
    platformsEn: ['Web', 'API', 'Google AI Studio']
  },
  'cursor-ai': {
    taglineEn: 'The #1 AI code editor worldwide for 2026 featuring multi-file Composer and Agent mode',
    descriptionEn: 'Built from the ground up on top of VS Code, Cursor incorporates frontier AI models into every keystroke, allowing developers to refactor whole architectures, fix terminal bugs, and write apps autonomously.',
    pricingDetailsEn: 'Free tier with basic completions and 50 slow requests. Pro tier ($20/mo) includes 500 fast requests and unlimited Composer edits.',
    prosEn: [
      'Composer writes and updates code across dozens of files simultaneously',
      'Autonomous Agent mode tests code, catches compile errors, and applies patches',
      'Indexes local git repository for comprehensive semantic awareness',
      'Instant 1-click import of all VS Code extensions, themes, and personal keybindings'
    ],
    consEn: [
      'Requires downloading and installing the standalone Cursor desktop application'
    ],
    useCasesEn: [
      'Accelerating software development velocity by 3x to 5x across web and mobile',
      'Refactoring monolithic codebases and generating automated integration tests'
    ],
    platformsEn: ['macOS', 'Windows', 'Linux']
  },
  'mistral-lechat': {
    taglineEn: 'The fast, free, privacy-centric European AI assistant with web search and Canvas workspace',
    descriptionEn: 'Developed by Paris-based Mistral AI, Le Chat offers a fast, versatile conversational experience powered by flagship models (Mistral Large 2, Pixtral), with web browsing, document analysis, and ideation canvas.',
    pricingDetailsEn: 'Completely free during beta for conversational use, web search, and document analysis.',
    prosEn: [
      'Free access to Mistral Large without subscription or usage caps',
      'Strong commitment to European data privacy standards and transparency',
      'Built-in Canvas workspace for real-time document drafting and coding',
      'High-speed inference with accurate multi-language understanding'
    ],
    consEn: [
      'Ecosystem integrations are still expanding compared to OpenAI or Google'
    ],
    useCasesEn: [
      'Fast document drafting, content summarization, and multilingual translation',
      'Privacy-conscious everyday AI tasks without enterprise tracking'
    ],
    platformsEn: ['Web']
  },
  'flux-ai': {
    taglineEn: 'State-of-the-art open image generation model delivering crisp typography and anatomical realism',
    descriptionEn: 'Created by the original creators of Stable Diffusion at Black Forest Labs, Flux.1 is the reigning state-of-the-art in open-weight text-to-image generation, famous for rendering legible text and photorealistic hands.',
    pricingDetailsEn: 'Open weights free for non-commercial use (Flux.1 Schnell/Dev). Commercial API and hosted cloud platforms available.',
    prosEn: [
      'Flawlessly renders legible English text, signs, logos, and packaging labels',
      'Superb anatomical accuracy with natural fingers, hands, and facial details',
      'Available in open weights (Schnell, Dev) for local GPU generation via ComfyUI',
      'Deep prompt adherence capturing intricate spatial arrangements and lighting'
    ],
    consEn: [
      'Running the full Dev model locally requires at least 12GB to 16GB of VRAM'
    ],
    useCasesEn: [
      'High-end advertising graphics, product packaging, and editorial typography',
      'Creative concept art, photorealistic portraits, and digital illustrations'
    ],
    platformsEn: ['Web', 'API', 'ComfyUI / Local']
  },
  'notebooklm': {
    taglineEn: 'Google AI research assistant that turns notes into interactive audio podcasts and grounded insights',
    descriptionEn: 'A grounded research notebook by Google powered by Gemini 2.0 that sources its answers strictly from the documents you upload, famous for its viral "Audio Overview" feature generating realistic two-host podcasts.',
    pricingDetailsEn: 'Completely 100% free with a Google account; supports up to 50 sources per notebook.',
    prosEn: [
      'Generates viral, hyper-realistic two-host conversational audio podcast discussions',
      'Zero hallucinations: answers strictly cite paragraphs in your uploaded documents',
      'Supports PDFs, Google Docs, Slides, web URLs, YouTube links, and audio files',
      'Completely free with generous source document limits'
    ],
    consEn: [
      'Only answers questions based on the specific sources uploaded to the active notebook'
    ],
    useCasesEn: [
      'Studying for exams by turning dense lecture notes into engaging audio discussions',
      'Executive briefing: digesting multi-hundred page compliance and financial reports'
    ],
    platformsEn: ['Web']
  },
  'grok-ai': {
    taglineEn: 'The witty, real-time AI assistant by xAI with direct integration into the X platform feed',
    descriptionEn: 'Developed by Elon Musk xAI, Grok 3 offers real-time awareness of global news and breaking trends via live integration with X, featuring DeepSearch reasoning and uncensored conversational modes.',
    pricingDetailsEn: 'Available to X Premium and Premium+ subscribers, with free limited tier accessible on x.ai.',
    prosEn: [
      'Real-time access to breaking global news, public commentary, and live trends on X',
      'DeepSearch reasoning mode for solving challenging scientific and logic questions',
      'Unfiltered, conversational personality with witty and direct answer modes',
      'Flux-powered image generation built into the interface'
    ],
    consEn: [
      'Full features require an active X Premium subscription'
    ],
    useCasesEn: [
      'Tracking breaking global news, market developments, and social trends in real-time',
      'Scientific analysis, mathematics problem solving, and humorous ideation'
    ],
    platformsEn: ['Web', 'iOS', 'Android', 'X App']
  },
  'bolt-new': {
    taglineEn: 'Develop, run, and deploy full-stack web applications entirely in your browser with AI',
    descriptionEn: 'Pioneering in-browser AI development environment powered by WebContainers, allowing developers to prompt complete full-stack Node.js, React, and database apps that run and compile live without local setups.',
    pricingDetailsEn: 'Free daily tokens. Pro subscriptions start at $20/month for higher token allowances.',
    prosEn: [
      'Executes full-stack Node.js applications live in the browser using WebContainers',
      'Installs npm packages, runs backend servers, and executes terminal commands automatically',
      'One-click instant deployment to Netlify or direct export to GitHub repository',
      'Interactive visual preview with instant reload and inspect capabilities'
    ],
    consEn: [
      'Consumes AI tokens quickly during large refactoring rounds'
    ],
    useCasesEn: [
      'Rapidly prototyping and testing functional full-stack MVPs in minutes',
      'Building internal tools, dashboards, and responsive web applications'
    ],
    platformsEn: ['Web']
  },
  'lovable-dev': {
    taglineEn: 'The intelligent software engineer that turns ideas into beautiful, production-ready web apps',
    descriptionEn: 'Full-stack AI developer platform that translates natural language prompts into beautifully designed, fully interactive web applications with clean Supabase database and GitHub integration.',
    pricingDetailsEn: 'Free starter tier with daily credits. Pro plans start at $20/month.',
    prosEn: [
      'Produces visually stunning modern UIs paired with real functional Supabase backends',
      'Seamless two-way synchronization with GitHub repositories for continuous development',
      'Built-in authentication, database tables, and real-time backend functionality',
      'Visual click-to-edit interface allows tweaking components visually'
    ],
    consEn: [
      'Complex custom enterprise architectures require developer review'
    ],
    useCasesEn: [
      'Launching complete startup MVPs and customer-facing web platforms',
      'Building internal business tools and client portals in days instead of months'
    ],
    platformsEn: ['Web']
  },
  'kling-ai': {
    taglineEn: 'The leading AI video generation model capable of producing up to 2-minute high-fidelity clips',
    descriptionEn: 'Breakthrough generative video model developed by Kuaishou, renowned for producing fluid video clips up to 2 minutes long in 1080p with accurate human body physics and dynamic camera motion.',
    pricingDetailsEn: 'Daily free credits for all registered users. Subscription packages start at $10/month.',
    prosEn: [
      'Can generate long video sequences up to 2 minutes with strong temporal consistency',
      'Realistic human motion, physical collision fidelity, and believable facial expressions',
      'Professional camera controls: 3D zoom, horizontal pan, tilts, and tracking shots',
      'Generous daily free credits for experimentation'
    ],
    consEn: [
      'Rendering long 1080p clips can take several minutes during peak queue times'
    ],
    useCasesEn: [
      'Creating cinematic advertising clips, short films, and social video reels',
      'Concept art animation and realistic visual effects production'
    ],
    platformsEn: ['Web', 'iOS', 'Android']
  },
  'luma-dream-machine': {
    taglineEn: 'Fast high-definition 3D video generation with dynamic camera movement and natural lighting',
    descriptionEn: 'High-speed generative video model by Luma AI that turns text and images into realistic 5-second cinematic shots with consistent physics, dynamic lighting, and rapid rendering times.',
    pricingDetailsEn: 'Free tier with 30 generations per month. Standard paid plan starts at $29.99/month for commercial use.',
    prosEn: [
      'Rapid rendering speeds producing complete 5-second clips in under 2 minutes',
      'Maintains consistent character identity, vehicle physics, and natural lighting',
      'Keyframe-to-keyframe mode: interpolates smoothly between starting and ending frames',
      'Camera trajectory controls for dramatic cinematic storytelling'
    ],
    consEn: [
      'Free tier generations include slight motion watermarks'
    ],
    useCasesEn: [
      'Dynamic video transitions, camera fly-throughs, and product reveal teasers',
      'Animating still photographs into vivid living memories'
    ],
    platformsEn: ['Web', 'iOS']
  },
  'udio-ai': {
    taglineEn: 'Produce professional songs and music tracks with authentic vocals and intricate arrangements',
    descriptionEn: 'State-of-the-art music creation platform engineered by former Google DeepMind researchers, capable of generating emotionally rich, broadcast-quality songs with intricate harmonies across all genres.',
    pricingDetailsEn: 'Free tier allows creating up to 100 songs per month. Standard plan starts at $10/month for advanced audio control.',
    prosEn: [
      'Incredible vocal emotion, breath control, and intricate backing harmonies',
      'Precise multi-track stem separation (isolate vocals, drums, bass, instruments)',
      'Advanced audio inpainting: replace or rewrite specific bars and guitar solos',
      'Supports intricate song structures from intro to outro up to 15 minutes long'
    ],
    consEn: [
      'Creating a complete 3-minute song requires sequentially extending sections'
    ],
    useCasesEn: [
      'Producing original soundtracks for films, video games, and audiobooks',
      'Songwriters experimenting with harmonies, melodies, and lyrical arrangements'
    ],
    platformsEn: ['Web']
  },
  'elicit-ai': {
    taglineEn: 'The academic research assistant specializing in systematic literature reviews and data extraction',
    descriptionEn: 'AI research assistant that automates literature reviews by searching 200M+ research papers, extracting key methodologies, sample sizes, and outcomes into structured comparison tables.',
    pricingDetailsEn: 'Free plan with 5,000 one-time credits. Plus tier ($10/mo) provides monthly credit renewals and high-speed extraction.',
    prosEn: [
      'Automatically builds structured comparison tables across dozens of papers simultaneously',
      'Extracts exact quantitative metrics: sample sizes, dosages, and effect sizes',
      'Every synthesized answer is directly linked to an excerpt in the original PDF',
      'Export literature tables directly to CSV, Excel, and reference managers'
    ],
    consEn: [
      'Credit consumption scales with the number of papers analyzed per search'
    ],
    useCasesEn: [
      'Conducting systematic literature reviews and meta-analyses for medical/STEM fields',
      'Quickly finding empirical evidence on specific experimental methodologies'
    ],
    platformsEn: ['Web']
  },
  'recraft-ai': {
    taglineEn: 'Generate professional vector graphics, SVG icons, and 3D illustrations with brand consistency',
    descriptionEn: 'Design-oriented generative canvas built specifically for professional graphic designers, specializing in infinite-resolution SVG vector generation, brand color palettes, and 3D icons.',
    pricingDetailsEn: 'Free plan with daily credits. Commercial Pro plan starts at $20/month for private generations and vector editing.',
    prosEn: [
      'Generates native, cleanly layered SVG vector files that scale infinitely without pixelation',
      'Strict brand color palette enforcement across entire icon and illustration sets',
      'Multiple specialized design styles: 2D vector, 3D icon, pixel art, and flat design',
      'In-canvas vector node editor to tweak shapes, paths, and colors directly'
    ],
    consEn: [
      'Focused on digital illustrations and vector assets rather than photorealistic photography'
    ],
    useCasesEn: [
      'Creating scalable SVG icons, landing page illustrations, and brand assets',
      'Designing cohesive digital visual identities and marketing collateral'
    ],
    platformsEn: ['Web', 'iOS', 'Android']
  },
  'pika-ai': {
    taglineEn: 'Generate and edit dynamic videos with simulated physics effects and sound synchronization',
    descriptionEn: 'Creative video generator featuring playful physics transformations (melt, explode, squish, inflate), lip syncing, sound effect generation, and intuitive camera trajectory controls.',
    pricingDetailsEn: 'Free plan with daily credits. Standard plan starts at $10/month for HD downloads and watermark removal.',
    prosEn: [
      'Pika Effects: instantly apply physics modifications (Melt, Explode, Crush, Inflate)',
      'Built-in sound effect generator synchronizes realistic audio with video action',
      'Interactive region editing (Pikaffect): modify specific objects inside a video',
      'Camera movement controls: pan, tilt, zoom, and dynamic motion speeds'
    ],
    consEn: [
      'Free tier outputs contain a subtle brand watermark in the corner'
    ],
    useCasesEn: [
      'Creating viral social media clips, surreal animations, and memes',
      'Dynamic visual effects for commercials and creative video storytelling'
    ],
    platformsEn: ['Web', 'Discord']
  },
  'otter-ai': {
    taglineEn: 'AI meeting assistant that automatically transcribes, takes notes, and summarizes Zoom & Teams calls',
    descriptionEn: 'Smart meeting companion that automatically joins your Zoom, Microsoft Teams, and Google Meet meetings to record audio, write live real-time transcripts, and generate automated summaries.',
    pricingDetailsEn: 'Free plan includes 300 monthly transcription minutes (30 min per conversation). Pro starts at $10/month.',
    prosEn: [
      'Automatically joins scheduled video calls on Zoom, Teams, and Google Meet',
      'Live transcription with real-time speaker identification and timestamps',
      'Automated meeting summaries highlight key decisions and assign action items',
      'Otter AI Chat allows querying past meeting discussions conversationally'
    ],
    consEn: [
      'Heavy technical jargon or thick overlapping speech may require minor manual review'
    ],
    useCasesEn: [
      'Recording client meetings, board discussions, and team standups hands-free',
      'University students capturing lecture notes with synchronized audio playback'
    ],
    platformsEn: ['Web', 'iOS', 'Android', 'Chrome Extension']
  },
  'whisper-ai': {
    taglineEn: 'The global benchmark for speech-to-text transcription with unmatched multi-dialect accuracy',
    descriptionEn: 'OpenAI groundbreaking open-source automatic speech recognition (ASR) system, trained on 680,000 hours of multilingual audio, delivering world-class accuracy for 99+ languages including diverse Arabic dialects.',
    pricingDetailsEn: 'Open-source models are 100% free to download and run locally. Hosted OpenAI API costs $0.006 per audio minute.',
    prosEn: [
      'Industry-leading transcription accuracy even in noisy environments or low-quality mics',
      'Comprehensive support for Arabic dialects alongside 99+ global languages',
      'Completely free and open-source: run privately offline on Mac/PC via MacWhisper or Whisper.cpp',
      'Direct translation of foreign speech into English subtitles and transcripts'
    ],
    consEn: [
      'Running large models locally in real-time requires a modern GPU or Apple Silicon chip'
    ],
    useCasesEn: [
      'Transcribing confidential audio recordings, legal depositions, and medical notes offline',
      'Generating accurate SRT subtitle files for films, podcasts, and online courses'
    ],
    platformsEn: ['macOS', 'Windows', 'Linux', 'API', 'Python']
  }
};

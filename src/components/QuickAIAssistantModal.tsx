import React, { useState } from 'react';
import { AiTool, SupportedLanguage } from '../types';
import { 
  X, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight,
  ExternalLink, 
  FileText, 
  Image as ImageIcon, 
  Code2, 
  Headphones, 
  Video, 
  Presentation, 
  Search, 
  Languages,
  CheckCircle,
  Compass
} from 'lucide-react';

interface QuickAIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  allTools: AiTool[];
  onSelectTool: (tool: AiTool) => void;
  isDarkMode: boolean;
  lang?: SupportedLanguage;
}

interface TaskOption {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  icon: any;
  categoryMatch: string;
  recommendedIds: string[];
  color: string;
}

const TASKS: TaskOption[] = [
  {
    id: 'content_writing',
    titleAr: 'كتابة المقالات وصياغة المحتوى',
    titleEn: 'Article Writing & Content Creation',
    descAr: 'تأليف مقالات متوافقة مع SEO، صياغة إيميلات، وإعادة الصياغة',
    descEn: 'SEO articles, email copywriting, and content rewriting',
    icon: FileText,
    categoryMatch: 'text_writing',
    recommendedIds: ['chatgpt', 'claude', 'jasper-ai', 'quillbot'],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'image_art',
    titleAr: 'توليد الصور الفنية والواقعية',
    titleEn: 'Realistic & Artistic Image Generation',
    descAr: 'رسم صور سينمائية، خلفيات، وتعديل الصور بدقة عالية',
    descEn: 'Photorealistic imagery, creative concept art, and photo editing',
    icon: ImageIcon,
    categoryMatch: 'image_generation',
    recommendedIds: ['midjourney', 'leonardo-ai', 'krea-ai', 'canva-magic-studio'],
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'coding',
    titleAr: 'كتابة وفحص الأكواد البرمجية',
    titleEn: 'Coding & Debugging Assistant',
    descAr: 'بناء التطبيقات، تصحيح الأخطاء، وإكمال الكود التلقائي',
    descEn: 'Full-stack development, bug fixing, and AI autocomplete',
    icon: Code2,
    categoryMatch: 'coding_dev',
    recommendedIds: ['cursor-ide', 'deepseek', 'github-copilot', 'phind-ai', 'v0-dev'],
    color: 'from-cyan-500 to-blue-700'
  },
  {
    id: 'audio_voice',
    titleAr: 'التعليق الصوتي والموسيقى',
    titleEn: 'Voiceover & AI Music Generation',
    descAr: 'تحويل النص لصوت عربي واقعي، استنساخ الصوت، وتأليف الموسيقى',
    descEn: 'Natural voice cloning, text-to-speech, and original soundtracks',
    icon: Headphones,
    categoryMatch: 'audio_music',
    recommendedIds: ['elevenlabs', 'suno-ai'],
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'video_creation',
    titleAr: 'صناعة ومونتاج الفيديو',
    titleEn: 'Video Generation & AI Editing',
    descAr: 'توليد مقاطع سينمائية، شخصيات ناطقة، ومونتاج عبر النص',
    descEn: 'Cinematic clips, talking digital avatars, and transcript-based editing',
    icon: Video,
    categoryMatch: 'video_generation',
    recommendedIds: ['runway-gen3', 'heygen', 'descript'],
    color: 'from-rose-500 to-red-600'
  },
  {
    id: 'presentations',
    titleAr: 'العروض التقديمية والإنتاجية',
    titleEn: 'Presentations & Workplace Productivity',
    descAr: 'إنشاء شرائح PowerPoint بصرية، ومسودات العمل في ثوانٍ',
    descEn: 'Instant slide decks, summaries, and executive productivity docs',
    icon: Presentation,
    categoryMatch: 'productivity',
    recommendedIds: ['gamma-app', 'notion-ai'],
    color: 'from-violet-500 to-fuchsia-600'
  },
  {
    id: 'research_search',
    titleAr: 'البحث الموثق وتلخيص المصادر',
    titleEn: 'Cited Research & Deep Search',
    descAr: 'إجابات مباشرة مع مراجع موثقة، والبحث اللحظي في الإنترنت',
    descEn: 'Grounded web discovery, academic research, and cited summaries',
    icon: Search,
    categoryMatch: 'research',
    recommendedIds: ['perplexity-ai', 'claude', 'gemini'],
    color: 'from-teal-500 to-emerald-700'
  },
  {
    id: 'translation_arabic',
    titleAr: 'الترجمة الاحترافية ودعم العربية',
    titleEn: 'Contextual Translation & Arabic Support',
    descAr: 'ترجمة السياق بدقة، وترجمة مستندات PDF مع الحفاظ على التنسيق',
    descEn: 'Nuanced multilingual translation and preserved document formatting',
    icon: Languages,
    categoryMatch: 'translation',
    recommendedIds: ['deepl-translate', 'chatgpt'],
    color: 'from-lime-600 to-teal-700'
  }
];

export const QuickAIAssistantModal: React.FC<QuickAIAssistantModalProps> = ({
  isOpen,
  onClose,
  allTools,
  onSelectTool,
  isDarkMode,
  lang = 'ar'
}) => {
  const [selectedTask, setSelectedTask] = useState<TaskOption | null>(null);

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const matchedTools = selectedTask
    ? allTools.filter((t) => selectedTask.recommendedIds.includes(t.id))
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        id="quick-ai-assistant-container"
        className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden z-10 my-8 transition-colors ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-800 text-slate-100' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">
                {isAr ? 'المستكشف الذكي لاختيار الأداة المثالية' : 'Smart AI Tool Matcher'}
              </h3>
              <p className="text-xs text-white/80">
                {isAr ? 'حدد المهمة التي ترغب في إنجازها لنرشح لك أفضل الأدوات المناسبة' : 'Select your goal and we will recommend the top-tier AI tools for the job'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
            aria-label={isAr ? 'إغلاق' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {!selectedTask ? (
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>{isAr ? 'ما هو الهدف أو المهمة التي ترغب في إنجازها؟' : 'What is the objective or task you want to accomplish?'}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TASKS.map((task) => {
                  const Icon = task.icon;
                  return (
                    <button
                      key={task.id}
                      id={`assistant-task-${task.id}`}
                      onClick={() => setSelectedTask(task)}
                      className={`p-4 rounded-2xl border ${isAr ? 'text-right' : 'text-left'} transition-all hover:border-indigo-400 hover:shadow-md flex items-start gap-3 group ${
                        isDarkMode 
                          ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800' 
                          : 'bg-slate-50 border-slate-200 hover:bg-white'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${task.color} text-white flex items-center justify-center shrink-0 shadow-xs`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-sm font-bold text-slate-900 dark:text-white block group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {isAr ? task.titleAr : task.titleEn}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 block line-clamp-2 mt-0.5">
                          {isAr ? task.descAr : task.descEn}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Back to selection */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">{isAr ? 'المهمة المختارة:' : 'Selected Task:'}</span>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {isAr ? selectedTask.titleAr : selectedTask.titleEn}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-xs text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  {isAr ? (
                    <>
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>تغيير المهمة</span>
                    </>
                  ) : (
                    <>
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Change task</span>
                    </>
                  )}
                </button>
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>{isAr ? 'أفضل الأدوات المقترحة لمهمتك:' : 'Top AI Tools Recommended for Your Task:'}</span>
              </h4>

              {/* Matched Tool Cards */}
              <div className="space-y-3">
                {matchedTools.map((tool) => (
                  <div
                    key={tool.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isDarkMode 
                        ? 'bg-slate-800/70 border-slate-700' 
                        : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.gradient} text-white font-bold flex items-center justify-center text-sm shrink-0`}>
                        {tool.nameEn.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                            {isAr ? tool.nameAr : tool.nameEn}
                          </h5>
                          {isAr && <span className="text-xs text-slate-400">({tool.nameEn})</span>}
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                            {isAr ? tool.pricingAr : (tool.pricing || tool.pricingAr)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-md mt-0.5">
                          {isAr ? tool.taglineAr : (tool.taglineEn || tool.taglineAr)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          onSelectTool(tool);
                          onClose();
                        }}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                      >
                        {isAr ? 'عرض التفاصيل' : 'View Details'}
                      </button>

                      <a
                        href={tool.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        title={isAr ? 'الموقع الرسمي' : 'Official Website'}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}

                {matchedTools.length === 0 && (
                  <p className="text-xs text-slate-500 py-4 text-center">
                    {isAr ? 'لم يتم العثور على أدوات محددة لهذه المهمة حالياً.' : 'No specific tools found for this category at the moment.'}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

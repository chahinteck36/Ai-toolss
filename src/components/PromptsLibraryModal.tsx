import React, { useState, useMemo } from 'react';
import { PromptItem, PromptCategoryKey } from '../types';
import { PROMPT_CATEGORIES, INITIAL_PROMPTS } from '../data/promptsData';
import { 
  Sparkles, 
  Search, 
  X, 
  Copy, 
  Check, 
  PenTool, 
  Megaphone, 
  Code, 
  Palette, 
  Briefcase, 
  GraduationCap, 
  CheckCircle, 
  ExternalLink,
  Flame,
  Star,
  SlidersHorizontal,
  Bookmark,
  Share2,
  Terminal,
  Zap,
  Info
} from 'lucide-react';

interface PromptsLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelectedTool?: string;
  isDarkMode?: boolean;
  onSelectPrompt?: (promptText: string) => void;
}

const CATEGORY_ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  PenTool,
  Megaphone,
  Code,
  Palette,
  Briefcase,
  GraduationCap,
  CheckCircle
};

export const PromptsLibraryModal: React.FC<PromptsLibraryModalProps> = ({
  isOpen,
  onClose,
  initialSelectedTool,
  isDarkMode = false,
  onSelectPrompt
}) => {
  const [selectedCategory, setSelectedCategory] = useState<PromptCategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedToolFilter, setSelectedToolFilter] = useState<string>(initialSelectedTool || 'all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedPromptId, setExpandedPromptId] = useState<string | null>(null);
  const [savedPromptIds, setSavedPromptIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ai_directory_saved_prompts');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Extract list of all unique target tools for the filter pills
  const allUniqueTools = useMemo(() => {
    const toolsSet = new Set<string>();
    INITIAL_PROMPTS.forEach(p => {
      p.targetTools.forEach(t => toolsSet.add(t));
    });
    return Array.from(toolsSet);
  }, []);

  // Filter prompts based on search, category, tool, and difficulty
  const filteredPrompts = useMemo(() => {
    return INITIAL_PROMPTS.filter(prompt => {
      // Category match
      if (selectedCategory !== 'all' && prompt.category !== selectedCategory) {
        return false;
      }
      // Target tool match
      if (selectedToolFilter !== 'all' && !prompt.targetTools.includes(selectedToolFilter)) {
        return false;
      }
      // Difficulty match
      if (selectedDifficulty !== 'all' && prompt.difficulty !== selectedDifficulty) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = prompt.titleAr.toLowerCase().includes(query);
        const inPrompt = prompt.promptText.toLowerCase().includes(query);
        const inInstruction = prompt.instructionAr.toLowerCase().includes(query);
        const inTags = prompt.tags.some(t => t.toLowerCase().includes(query));
        const inTools = prompt.targetTools.some(t => t.toLowerCase().includes(query));
        return inTitle || inPrompt || inInstruction || inTags || inTools;
      }
      return true;
    });
  }, [selectedCategory, selectedToolFilter, selectedDifficulty, searchQuery]);

  // Handle Copy prompt text
  const handleCopy = (prompt: PromptItem) => {
    navigator.clipboard.writeText(prompt.promptText);
    setCopiedId(prompt.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2200);

    if (onSelectPrompt) {
      onSelectPrompt(prompt.promptText);
    }
  };

  // Toggle favorite prompt
  const toggleSavePrompt = (id: string) => {
    setSavedPromptIds(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('ai_directory_saved_prompts', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      dir="rtl"
    >
      <div 
        className={`relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl shadow-2xl border overflow-hidden transition-all my-auto ${
          isDarkMode 
            ? 'bg-slate-900/95 border-slate-700/70 text-slate-100' 
            : 'bg-white/95 border-slate-200/90 text-slate-900 shadow-indigo-950/10'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Luxury Top Header Banner */}
        <div className="relative p-5 sm:p-7 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 text-white border-b border-indigo-500/20 overflow-hidden shrink-0">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          {/* Close button */}
          <button
            id="close-prompts-modal-btn"
            onClick={onClose}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-all backdrop-blur-sm border border-white/10 z-10"
            title="إغلاق المكتبة"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-3xl">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-purple-500 to-indigo-500 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Terminal className="w-6 h-6 text-amber-400 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    مكتبة الأوامر والبرومبتات الحصرية
                  </h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    جاهزة للنسخ والاستخدام
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-normal mt-1 leading-relaxed">
                  مجموعة منتقاة ومجربة لأفضل أوامر ونماذج الذكاء الاصطناعي بالعربية والإنجليزية للحصول على أعلى دقة من النماذج.
                </p>
              </div>
            </div>
          </div>

          {/* Search & Quick Filters Bar */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-2.5">
            {/* Search Input */}
            <div className="relative sm:col-span-8">
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن أمر أو فكرة (مثال: سيو، إعلانات، كود، ريلز، ميدجورني)..."
                className="w-full pr-10 pl-10 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 backdrop-blur-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Target Tool Filter */}
            <div className="relative sm:col-span-4">
              <select
                value={selectedToolFilter}
                onChange={(e) => setSelectedToolFilter(e.target.value)}
                className="w-full appearance-none pr-8 pl-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50 cursor-pointer"
              >
                <option value="all">جميع النماذج والأدوات</option>
                {allUniqueTools.map((t) => (
                  <option key={t} value={t}>
                    مخصص لـ: {t}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className={`p-3 border-b overflow-x-auto scrollbar-none shrink-0 ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-2 min-w-max px-1">
            {PROMPT_CATEGORIES.map((cat) => {
              const IconComponent = CATEGORY_ICON_MAP[cat.iconName] || Sparkles;
              const isSelected = selectedCategory === cat.id;
              const count = INITIAL_PROMPTS.filter(p => cat.id === 'all' || p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : isDarkMode
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-2xs'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{cat.nameAr}</span>
                  <span className={`px-1.5 py-0.2 rounded-md text-[11px] ${
                    isSelected 
                      ? 'bg-black/25 text-white' 
                      : 'bg-slate-200/60 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Prompts Cards List Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Header info / count */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>
              عرض <strong className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">{filteredPrompts.length}</strong> أمر وبرومبت
            </span>
            <div className="flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-amber-500" />
              <span>انقر فوق "نسخ الأمر" والصقه مباشرة في الأداة</span>
            </div>
          </div>

          {filteredPrompts.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
              <Search className="w-10 h-10 text-slate-400 mx-auto mb-3 opacity-60" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                لم يتم العثور على أوامر مطابقة
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                جرب تغيير خيارات التصفية أو مسح عبارة البحث للعثور على أوامر أخرى.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedToolFilter('all');
                  setSelectedDifficulty('all');
                }}
                className="mt-4 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                إعادة ضبط خيارات البحث
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPrompts.map((prompt) => {
                const isCopied = copiedId === prompt.id;
                const isSaved = !!savedPromptIds[prompt.id];
                const isExpanded = expandedPromptId === prompt.id;

                return (
                  <div
                    key={prompt.id}
                    className={`group flex flex-col justify-between rounded-2xl p-4 sm:p-5 border transition-all duration-200 ${
                      isDarkMode
                        ? 'bg-slate-800/80 border-slate-700/80 hover:border-indigo-500/50 hover:bg-slate-800'
                        : 'bg-white border-slate-200/90 shadow-2xs hover:shadow-md hover:border-indigo-300'
                    }`}
                  >
                    {/* Card Top: Title & Badges */}
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800">
                              {prompt.categoryAr}
                            </span>
                            {prompt.isPopular && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800">
                                <Flame className="w-3 h-3 text-amber-500" />
                                الأكثر نسخاً
                              </span>
                            )}
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                              prompt.difficulty === 'مبتدئ'
                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                                : prompt.difficulty === 'متوسط'
                                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                                  : 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300'
                            }`}>
                              {prompt.difficulty}
                            </span>
                          </div>

                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                            {prompt.titleAr}
                          </h3>
                        </div>

                        {/* Save bookmark button */}
                        <button
                          onClick={() => toggleSavePrompt(prompt.id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isSaved 
                              ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/50 dark:border-rose-800' 
                              : 'text-slate-400 hover:text-slate-600 border-transparent hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                          title={isSaved ? 'محفوظ في المفضلة' : 'حفظ في المفضلة'}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
                        </button>
                      </div>

                      {/* Instruction text */}
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                        💡 {prompt.instructionAr}
                      </p>

                      {/* Prompt Box */}
                      <div className="relative group/box rounded-xl bg-slate-900 text-slate-100 p-3.5 text-xs font-mono border border-slate-800 mb-3 overflow-hidden">
                        <div className={`whitespace-pre-wrap leading-relaxed ${isExpanded ? '' : 'line-clamp-4'}`}>
                          {prompt.promptText}
                        </div>

                        {/* Read more button if text is long */}
                        {prompt.promptText.length > 200 && (
                          <button
                            onClick={() => setExpandedPromptId(isExpanded ? null : prompt.id)}
                            className="mt-2 text-[11px] font-sans font-bold text-amber-400 hover:text-amber-300 underline block"
                          >
                            {isExpanded ? 'عرض أقل' : 'عرض نص الأمر كاملاً...'}
                          </button>
                        )}
                      </div>

                      {/* Target Tools tags */}
                      <div className="flex items-center gap-1.5 flex-wrap mb-4">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                          متوافق مع:
                        </span>
                        {prompt.targetTools.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-800 dark:bg-slate-700/80 dark:text-slate-200 border border-slate-200 dark:border-slate-600"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Bottom Actions */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                      <div className="text-[11px] text-slate-400 font-medium">
                        {prompt.copyCount ? `تم نسخه +${prompt.copyCount} مرة` : 'أمر معتمد ومجرب'}
                      </div>

                      {/* Primary Copy Button */}
                      <button
                        onClick={() => handleCopy(prompt)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                          isCopied
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>تم النسخ بنجاح!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>نسخ الأمر</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0 ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>يتم تحديث وإضافة أوامر وبرومبتات جديدة أسبوعياً بمجتمع <strong>adawatai.online</strong></span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Star, 
  Heart, 
  Share2, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Check, 
  Globe, 
  Tag, 
  Layers, 
  CreditCard,
  MessageSquare,
  FileText,
  Copy,
  Laptop,
  Terminal,
  Repeat,
  GraduationCap,
  BookOpen
} from 'lucide-react';
import { AiTool, PricingType, Advertisement } from '../types';
import { SponsoredBanner } from './SponsoredBanner';

interface ToolDetailModalProps {
  tool: AiTool | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  userRating: number | undefined;
  userNote: string;
  onToggleFavorite: (id: string) => void;
  onRateTool: (id: string, rating: number) => void;
  onSaveNote: (id: string, note: string) => void;
  onSelectTool: (tool: AiTool) => void;
  onOpenPromptsForTool?: (toolName: string) => void;
  allTools: AiTool[];
  advertisements?: Advertisement[];
  isDarkMode: boolean;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({
  tool,
  isOpen,
  onClose,
  isFavorite,
  userRating,
  userNote,
  onToggleFavorite,
  onRateTool,
  onSaveNote,
  onSelectTool,
  onOpenPromptsForTool,
  allTools,
  advertisements = [],
  isDarkMode
}) => {
  const [noteText, setNoteText] = useState(userNote);
  const [copied, setCopied] = useState(false);
  const [noteSavedToast, setNoteSavedToast] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  useEffect(() => {
    setNoteText(userNote || '');
  }, [userNote, tool]);

  if (!isOpen || !tool) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(tool.websiteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveNote(tool.id, noteText);
    setNoteSavedToast(true);
    setTimeout(() => setNoteSavedToast(false), 2500);
  };

  // Find related tools in the same category
  const relatedTools = allTools
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

  const displayRating = userRating || tool.rating;

  // Find in-article ads
  const inArticleTopAd = advertisements.find((a) => a.isActive && a.placement === 'in_article_top');
  const inArticleBottomAd = advertisements.find((a) => a.isActive && a.placement === 'in_article_bottom');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div 
        id="tool-detail-modal-container"
        className={`relative w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden z-10 my-8 transition-colors ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-800 text-slate-100' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        dir="rtl"
      >
        {/* Modal Header Banner */}
        <div className={`relative p-4 sm:p-8 bg-gradient-to-l ${tool.gradient} text-white`}>
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="absolute top-3 left-3 sm:top-4 sm:left-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors z-20"
            title="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2 sm:mt-0">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white font-black text-xl sm:text-2xl border border-white/20 shadow-lg shrink-0">
                {tool.nameEn.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-3xl font-extrabold">
                    {tool.nameAr}
                  </h2>
                  {tool.isFeatured && (
                    <span className="bg-amber-400/90 text-amber-950 text-xs px-2 py-0.5 rounded-full font-bold">
                      مميز
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-white/80 font-medium">
                  {tool.nameEn}
                </p>
              </div>
            </div>

            {/* Quick Actions in Header */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <button
                id="modal-favorite-btn"
                onClick={() => onToggleFavorite(tool.id)}
                className={`p-2 sm:p-2.5 rounded-xl border backdrop-blur-md transition-all ${
                  isFavorite 
                    ? 'bg-rose-500 text-white border-rose-400 shadow-md' 
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
                title={isFavorite ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? 'fill-white' : ''}`} />
              </button>

              <button
                id="modal-copy-btn"
                onClick={handleCopyLink}
                className="p-2 sm:p-2.5 rounded-xl border bg-white/10 hover:bg-white/20 text-white border-white/20 transition-colors"
                title="نسخ رابط الموقع"
              >
                {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>

              <a
                id="modal-visit-btn"
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs sm:text-sm shadow-md transition-colors"
              >
                <span>زيارة الموقع</span>
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className={`p-3 rounded-2xl border text-center ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-[11px] text-slate-400 block mb-1">التقييم العام</span>
              <div className="flex items-center justify-center gap-1 font-bold text-amber-500 text-base">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{displayRating.toFixed(1)} / 5</span>
              </div>
            </div>

            <div className={`p-3 rounded-2xl border text-center ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-[11px] text-slate-400 block mb-1">نموذج التسعير</span>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block truncate">
                {tool.pricingAr}
              </span>
            </div>

            <div className={`p-3 rounded-2xl border text-center ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-[11px] text-slate-400 block mb-1">دعم اللغة العربية</span>
              <span className={`text-xs font-bold ${tool.supportsArabic ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                {tool.supportsArabic ? '✓ مدعوم بطلاقة' : '— واجهة إنجليزية'}
              </span>
            </div>

            <div className={`p-3 rounded-2xl border text-center ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-[11px] text-slate-400 block mb-1">تاريخ الإضافة</span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                {tool.addedDate}
              </span>
            </div>
          </div>

          {/* Top in-article sponsored ad if active */}
          {inArticleTopAd && (
            <SponsoredBanner ad={inArticleTopAd} isDarkMode={isDarkMode} />
          )}

          {/* Alternatives Badge Section */}
          {tool.alternativeTo && tool.alternativeTo.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-900 dark:text-purple-200">
              <div className="flex items-center gap-2 mb-1.5 font-bold text-xs">
                <Repeat className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>بديل قوي ومباشر لـ:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tool.alternativeTo.map((alt) => (
                  <span key={alt} className="px-2.5 py-0.5 rounded-lg bg-white dark:bg-slate-800 text-xs font-semibold border border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-300 shadow-2xs">
                    {alt}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Academic & Scholar Suite Highlights */}
          {(tool.academicFocus || (tool.academicTags && tool.academicTags.length > 0)) && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200">
              <div className="flex items-center gap-2 mb-1.5 font-bold text-xs">
                <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>حقيبة البحث العلمي والطلبة والأساتذة:</span>
              </div>
              {tool.academicFocus && (
                <p className="text-xs text-emerald-800 dark:text-emerald-300 mb-2 leading-relaxed">
                  {tool.academicFocus}
                </p>
              )}
              {tool.academicTags && tool.academicTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tool.academicTags.map((at) => (
                    <span key={at} className="px-2 py-0.5 rounded-md bg-emerald-100/70 dark:bg-emerald-900/60 text-[11px] font-semibold text-emerald-900 dark:text-emerald-200">
                      #{at}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Description Section */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" />
              <span>نبذة شاملة عن الأداة</span>
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              {tool.descriptionAr}
            </p>
          </div>

          {/* Prompts for this tool spotlight banner */}
          {onOpenPromptsForTool && (
            <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-amber-950/40 via-indigo-950/40 to-slate-900 border-amber-500/30' 
                : 'bg-gradient-to-r from-amber-50/90 via-indigo-50/70 to-purple-50/60 border-amber-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Terminal className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    أوامر وبرومبتات جاهزة لـ {tool.nameAr} ({tool.nameEn})
                  </h5>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    احصل على أفضل صياغات الأوامر باللغة العربية للحصول على أعلى دقة واستجابة فورية من الأداة.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenPromptsForTool(tool.nameEn);
                }}
                className="px-3.5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white shadow-xs transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>تصفح الأوامر المخصصة</span>
              </button>
            </div>
          )}

          {/* Pricing breakdown */}
          {tool.pricingDetailsAr && (
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-indigo-500" />
                <span>تفاصيل الأسعار والاشتراك</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 bg-indigo-50/50 dark:bg-indigo-950/30 p-3.5 rounded-2xl border border-indigo-100 dark:border-indigo-900/50">
                {tool.pricingDetailsAr}
              </p>
            </div>
          )}

          {/* Pros & Cons Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pros */}
            <div className={`p-4 rounded-2xl border ${
              isDarkMode ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-emerald-50/60 border-emerald-100'
            }`}>
              <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>أبرز المميزات ونقاط القوة</span>
              </h4>
              <ul className="space-y-2">
                {tool.pros.map((pro, idx) => (
                  <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-600 font-bold mt-0.5">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className={`p-4 rounded-2xl border ${
              isDarkMode ? 'bg-rose-950/20 border-rose-900/50' : 'bg-rose-50/60 border-rose-100'
            }`}>
              <h4 className="text-sm font-bold text-rose-800 dark:text-rose-300 mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>الملاحظات والمحددات</span>
              </h4>
              <ul className="space-y-2">
                {tool.cons.map((con, idx) => (
                  <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <span className="text-rose-600 font-bold mt-0.5">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Use Cases */}
          {tool.useCases && tool.useCases.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>أفضل حالات واستخدامات الأداة</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tool.useCases.map((uc, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-xl border text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2.5 ${
                      isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200'
                    }`}
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 text-[10px] font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span>{uc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Platforms & Tags */}
          <div className="space-y-3">
            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1.5">
                المنصات المدعومة:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {tool.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  >
                    <Laptop className="w-3 h-3 text-slate-400" />
                    <span>{platform}</span>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1.5">
                الكلمات المفتاحية والتصنيف:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60"
                  >
                    <Tag className="w-3 h-3 opacity-60" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Rating & Personal User Notes Section */}
          <div className={`p-4 rounded-2xl border space-y-3 ${
            isDarkMode ? 'bg-slate-800/70 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>تقييمك الشخصي وملاحظاتك الخاصة</span>
              </h4>
              
              {/* Star Picker */}
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-500 ml-1">حدد تقييمك:</span>
                {[1, 2, 3, 4, 5].map((star) => {
                  const isActive = hoverRating !== null ? hoverRating >= star : (userRating || 0) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => onRateTool(tool.id, star)}
                      className="p-1 hover:scale-125 transition-transform"
                      title={`تقييم ${star} نجوم`}
                    >
                      <Star className={`w-5 h-5 ${isActive ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Note form */}
            <form onSubmit={handleSaveNoteSubmit} className="space-y-2">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="اكتب ملاحظاتك الشخصية حول تجربتك لهذه الأداة (تُحفظ تلقائياً في متصفحك)..."
                rows={2}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {noteSavedToast ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> تم حفظ الملاحظة بنجاح في المتصفح
                    </span>
                  ) : (
                    'يتم حفظ التقييم والملاحظات محلياً في ذاكرة جهازك'
                  )}
                </span>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-2xs"
                >
                  حفظ الملاحظة
                </button>
              </div>
            </form>
          </div>

          {/* Bottom in-article sponsored ad if active */}
          {inArticleBottomAd && (
            <SponsoredBanner ad={inArticleBottomAd} isDarkMode={isDarkMode} />
          )}

          {/* Related Tools Recommendation */}
          {relatedTools.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-500" />
                <span>أدوات بديلة ومشابهة في نفس التصنيف</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedTools.map((relTool) => (
                  <button
                    key={relTool.id}
                    onClick={() => onSelectTool(relTool)}
                    className={`p-3 rounded-xl border text-right transition-all hover:border-indigo-400 hover:shadow-xs flex items-center gap-2.5 ${
                      isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br ${relTool.gradient} shrink-0`}>
                      {relTool.nameEn.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                        {relTool.nameAr}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {relTool.pricingAr}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className={`p-4 sm:p-5 border-t flex items-center justify-between ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
          >
            إغلاق
          </button>

          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/25 transition-all"
          >
            <span>زيارة الرابط الرسمي</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

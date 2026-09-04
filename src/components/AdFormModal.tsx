import React, { useState, useEffect } from 'react';
import { Advertisement } from '../types';
import { 
  X, 
  Save, 
  Megaphone, 
  AlertCircle, 
  Sparkles, 
  ExternalLink, 
  ArrowLeft, 
  Eye, 
  Palette, 
  Layers, 
  Check,
  Zap,
  Globe,
  Sliders
} from 'lucide-react';

interface AdFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ad: Advertisement) => Promise<void>;
  initialAd?: Advertisement | null;
  isDarkMode: boolean;
}

const GRADIENT_PRESETS = [
  { id: 'from-indigo-600 to-violet-600', name: 'نيلي وبنفسجي ملكي', class: 'from-indigo-600 to-violet-600', preview: 'bg-gradient-to-r from-indigo-600 to-violet-600' },
  { id: 'from-purple-600 to-pink-600', name: 'أرجواني ووردي مبهر', class: 'from-purple-600 to-pink-600', preview: 'bg-gradient-to-r from-purple-600 to-pink-600' },
  { id: 'from-teal-600 to-emerald-600', name: 'زمردي وفيروزي منعش', class: 'from-teal-600 to-emerald-600', preview: 'bg-gradient-to-r from-teal-600 to-emerald-600' },
  { id: 'from-amber-500 to-orange-600', name: 'عنبري وذهبي دافئ', class: 'from-amber-500 to-orange-600', preview: 'bg-gradient-to-r from-amber-500 to-orange-600' },
  { id: 'from-blue-600 to-cyan-600', name: 'أزرق تقني ساطع', class: 'from-blue-600 to-cyan-600', preview: 'bg-gradient-to-r from-blue-600 to-cyan-600' },
  { id: 'from-slate-900 via-indigo-950 to-slate-900', name: 'ليلي مظلم فاخر', class: 'from-slate-900 via-indigo-950 to-slate-900', preview: 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900' }
];

const TEMPLATES = [
  {
    name: 'عرض خصم حصري',
    title: 'خصم 50% على الخطة السنوية لفترة محدودة',
    subtitle: 'استفد من أقوى أدوات الذكاء الاصطناعي مع كود الخصم الحصري لرواد الدليل',
    ctaText: 'الحصول على الخصم',
    badgeText: 'عرض خاص %50',
    placement: 'top_banner' as const,
    bgGradient: 'from-purple-600 to-pink-600'
  },
  {
    name: 'شريك وراعي معتمد',
    title: 'منصة البرمجة والأتمتة الذكية للمطورين والشركات',
    subtitle: 'ابنِ تطبيقاتك السحابية واختصر 80% من وقت البرمجة مع بنية تحتية متكاملة',
    ctaText: 'تجربة مجانية',
    badgeText: 'راعي رسمي معتمد',
    placement: 'top_banner' as const,
    bgGradient: 'from-indigo-600 to-violet-600'
  },
  {
    name: 'إطلاق منتج جديد',
    title: 'الجيل الجديد من نماذج الذكاء الاصطناعي متاح الآن',
    subtitle: 'اكتشف قدرات التفكير العميق وتوليد الأكواد والفيديو بجودة 4K فائقة',
    ctaText: 'اكتشف الأداة الآن',
    badgeText: 'إطلاق جديد 2026',
    placement: 'sticky_bottom' as const,
    bgGradient: 'from-teal-600 to-emerald-600'
  }
];

export const AdFormModal: React.FC<AdFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialAd,
  isDarkMode
}) => {
  const [formData, setFormData] = useState<Partial<Advertisement>>({
    title: '',
    subtitle: '',
    ctaText: 'اكتشف المزيد',
    targetUrl: 'https://',
    placement: 'top_banner',
    badgeText: 'إعلان مميز',
    isActive: true,
    bgGradient: 'from-indigo-600 to-violet-600',
    clicks: 0,
    impressions: 0
  });

  const [previewPlacement, setPreviewPlacement] = useState<'current' | 'top_banner' | 'sticky_bottom' | 'grid_sponsored'>('current');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialAd) {
      setFormData({ ...initialAd });
    } else {
      setFormData({
        title: '',
        subtitle: '',
        ctaText: 'ابدأ التجربة مجاناً',
        targetUrl: 'https://',
        placement: 'top_banner',
        badgeText: 'إعلان مميز',
        isActive: true,
        bgGradient: 'from-indigo-600 to-violet-600',
        clicks: 0,
        impressions: 0
      });
    }
    setErrorMsg('');
  }, [initialAd, isOpen]);

  if (!isOpen) return null;

  const handleApplyTemplate = (tpl: typeof TEMPLATES[0]) => {
    setFormData((prev) => ({
      ...prev,
      title: tpl.title,
      subtitle: tpl.subtitle,
      ctaText: tpl.ctaText,
      badgeText: tpl.badgeText,
      placement: tpl.placement,
      bgGradient: tpl.bgGradient
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      setErrorMsg('يرجى كتابة عنوان الإعلان الرئيسي.');
      return;
    }

    let cleanUrl = formData.targetUrl?.trim() || '';
    if (!cleanUrl || cleanUrl === 'https://' || cleanUrl === 'http://') {
      setErrorMsg('يرجى إدخال رابط مستهدف صحيح (URL).');
      return;
    }

    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = `https://${cleanUrl}`;
    }

    const adToSave: Advertisement = {
      id: initialAd?.id || `ad-${Date.now()}`,
      title: formData.title.trim(),
      subtitle: formData.subtitle?.trim() || '',
      ctaText: formData.ctaText?.trim() || 'اكتشف المزيد',
      targetUrl: cleanUrl,
      placement: formData.placement || 'top_banner',
      badgeText: formData.badgeText?.trim() || 'إعلان برعاية',
      isActive: formData.isActive ?? true,
      clicks: initialAd?.clicks || 0,
      impressions: initialAd?.impressions || 0,
      bgGradient: formData.bgGradient || 'from-indigo-600 to-violet-600'
    };

    try {
      setIsSubmitting(true);
      await onSave(adToSave);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'حدث خطأ أثناء حفظ الإعلان.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const effectivePlacement = previewPlacement === 'current' ? (formData.placement || 'top_banner') : previewPlacement;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto" dir="rtl">
      <div className={`relative w-full max-w-3xl my-6 rounded-3xl border ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      } shadow-2xl overflow-hidden flex flex-col max-h-[92vh]`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shadow-xs">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{initialAd ? 'تعديل الإعلان أو الراعي' : 'إنشاء إعلان أو راعي جديد'}</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  بوابة الإدارة المستقلة
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                تحكم بالبانرات الترويجية وعروض الشركاء ومواضع ظهورها في دليل الذكاء الاصطناعي
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Quick Presets / Templates (Only if creating new ad) */}
          {!initialAd && (
            <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  قوالب إعلانية جاهزة للتعبئة السريعة:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TEMPLATES.map((tpl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleApplyTemplate(tpl)}
                    className="px-3 py-1.5 text-xs font-medium rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 border border-slate-200/80 dark:border-slate-700 transition-all shadow-2xs"
                  >
                    + {tpl.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Real-time Interactive Live Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-indigo-500" />
                <span>معاينة حية وتفاعلية للإعلان حسب الموضع المختار:</span>
              </label>
              <div className="flex items-center gap-1 text-[11px] bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
                <button
                  type="button"
                  onClick={() => setPreviewPlacement('current')}
                  className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                    previewPlacement === 'current' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  الموضع المحدد
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewPlacement('top_banner')}
                  className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                    previewPlacement === 'top_banner' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  بانر علوي
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewPlacement('sticky_bottom')}
                  className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                    previewPlacement === 'sticky_bottom' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  شريط عائم
                </button>
              </div>
            </div>

            {/* Live Render Card */}
            <div className={`p-4 rounded-2xl border ${
              isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              {effectivePlacement === 'sticky_bottom' ? (
                <div className={`p-3.5 rounded-2xl border shadow-md flex items-center justify-between gap-3 ${
                  isDarkMode ? 'bg-slate-900 border-indigo-500/30' : 'bg-white border-indigo-200'
                }`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                          {formData.badgeText || 'إعلان مميز'}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {formData.title || 'عنوان الإعلان التجريبي'}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-md">
                        {formData.subtitle || 'وصف مختصر ومحفز للعرض أو الخدمة الترويجية'}
                      </p>
                    </div>
                  </div>
                  <button type="button" className="px-3 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 text-white shrink-0 flex items-center gap-1">
                    <span>{formData.ctaText || 'زيارة العرض'}</span>
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                </div>
              ) : effectivePlacement === 'grid_sponsored' ? (
                <div className={`p-4 rounded-2xl border max-w-sm mx-auto ${
                  isDarkMode ? 'bg-slate-900 border-amber-500/30' : 'bg-white border-amber-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                      {formData.badgeText || 'شريك موثوق'}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">إعلان <ExternalLink className="w-2.5 h-2.5" /></span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {formData.title || 'عنوان الإعلان في الشبكة'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                    {formData.subtitle || 'شرح ترويجي مختصر للخدمة يظهر بين كروت الأدوات الذكية'}
                  </p>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center justify-between">
                    <span>{formData.ctaText || 'زيارة العرض'}</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </div>
                </div>
              ) : (
                /* Top Banner & In-Article Default */
                <div className={`p-4 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-900 border-indigo-500/30' : 'bg-gradient-to-r from-indigo-50 via-purple-50 to-white border-indigo-200'
                }`}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Megaphone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-600 text-white">
                            {formData.badgeText || 'إعلان برعاية'}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                            {formData.title || 'عنوان البانر الرئيسي'}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl">
                          {formData.subtitle || 'تفاصيل العرض الترويجي والخصومات وروابط الرعاة الرسميين'}
                        </p>
                      </div>
                    </div>
                    <button type="button" className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white shrink-0 self-end sm:self-center flex items-center gap-1.5 shadow-sm">
                      <span>{formData.ctaText || 'اكتشف المزيد'}</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Controls */}
          <form id="ad-form-admin" onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                عنوان الإعلان الرئيسي <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="مثال: خصم 50% على اشتراك Midjourney أو منصة Cursor البرمجية"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                النص التوضيحي والمزايا
              </label>
              <textarea
                rows={2}
                value={formData.subtitle || ''}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="اشرح العرض، المزايا، أو كود الخصم باختصار للزوار..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  نص زر الدعوة للإجراء (CTA)
                </label>
                <input
                  type="text"
                  value={formData.ctaText || ''}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  placeholder="مثال: تجربة مجانية، زيارة العرض، اشترك الآن"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  وسام الشارة (Badge)
                </label>
                <input
                  type="text"
                  value={formData.badgeText || ''}
                  onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                  placeholder="مثال: إعلان برعاية، عرض خاص، شريك رسمي"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                الرابط المستهدف ومسار التحويل (Target URL) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="url"
                  required
                  value={formData.targetUrl || ''}
                  onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                  placeholder="https://partner-website.com/?ref=ai_directory"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  dir="ltr"
                />
                <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  موضع الظهور في الموقع
                </label>
                <select
                  value={formData.placement}
                  onChange={(e) => setFormData({ ...formData, placement: e.target.value as any })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden font-medium"
                >
                  <option value="top_banner">🔝 بانر علوي رئيسي (Top Banner)</option>
                  <option value="sticky_bottom">📌 شريط عائم سفلي دائم (Sticky Bottom Bar)</option>
                  <option value="grid_sponsored">🎴 بطاقة مميزة مدمجة بالشبكة (Grid Card)</option>
                  <option value="in_article_top">📑 أعلى صفحة تفاصيل الأداة (In-Article Top)</option>
                  <option value="in_article_bottom">📑 أسفل صفحة تفاصيل الأداة (In-Article Bottom)</option>
                  <option value="footer">🏁 بانر التذييل أسفل الموقع (Footer CTA)</option>
                  <option value="sidebar">📐 الشريط الجانبي (Sidebar)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  حالة تفعيل وعرض الإعلان
                </label>
                <select
                  value={formData.isActive ? 'active' : 'inactive'}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden font-medium"
                >
                  <option value="active">🟢 نشط ومعروض للزوار فوراً (Active)</option>
                  <option value="inactive">⚪ معطل ومخفي مؤقتاً (Paused / Inactive)</option>
                </select>
              </div>
            </div>

            {/* Gradient Theme Picker */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-indigo-500" />
                <span>نمط الألوان والتدرج البصري:</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {GRADIENT_PRESETS.map((preset) => {
                  const isSelected = formData.bgGradient === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, bgGradient: preset.id })}
                      className={`p-2 rounded-xl border flex items-center gap-2 text-right transition-all ${
                        isSelected 
                          ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/40 ring-1 ring-indigo-500' 
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-lg shrink-0 ${preset.preview} flex items-center justify-center text-white shadow-2xs`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200 truncate">
                        {preset.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
          <div className="text-[11px] text-slate-400">
            {initialAd ? `النقرات: ${initialAd.clicks || 0} | الظهور: ${initialAd.impressions || 0}` : 'سيتم حفظ الإعلان ومزامنته سحابياً مع Firebase'}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              form="ad-form-admin"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 transition-all shadow-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'جاري الحفظ...' : initialAd ? 'تحديث الإعلان' : 'حفظ ونشر الإعلان'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};


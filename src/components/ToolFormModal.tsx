import React, { useState, useEffect } from 'react';
import { AiTool, Category, CategoryId, PricingType } from '../types';
import { 
  X, 
  Save, 
  Sparkles, 
  Globe, 
  Star, 
  Tag, 
  CheckCircle2, 
  Layers, 
  DollarSign, 
  Check, 
  AlertCircle 
} from 'lucide-react';

interface ToolFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (toolData: AiTool) => Promise<void>;
  initialTool?: AiTool | null;
  categories: Category[];
  isDarkMode: boolean;
}

export const ToolFormModal: React.FC<ToolFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialTool,
  categories,
  isDarkMode
}) => {
  const [formData, setFormData] = useState<Partial<AiTool>>({
    nameAr: '',
    nameEn: '',
    taglineAr: '',
    descriptionAr: '',
    category: 'text_writing',
    pricing: 'freemium',
    pricingAr: 'خطة مجانية + مدفوع',
    pricingDetailsAr: '',
    websiteUrl: 'https://',
    rating: 4.8,
    reviewsCount: 120,
    tags: [],
    supportsArabic: true,
    isFeatured: false,
    isPopular: false,
    isNew: false,
    platforms: ['Web'],
    pros: [],
    cons: [],
    useCases: [],
    status: 'published'
  });

  const [tagsInput, setTagsInput] = useState('');
  const [prosInput, setProsInput] = useState('');
  const [consInput, setConsInput] = useState('');
  const [useCasesInput, setUseCasesInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialTool) {
      setFormData({ ...initialTool });
      setTagsInput(initialTool.tags?.join(', ') || '');
      setProsInput(initialTool.pros?.join('\n') || '');
      setConsInput(initialTool.cons?.join('\n') || '');
      setUseCasesInput(initialTool.useCases?.join('\n') || '');
    } else {
      setFormData({
        nameAr: '',
        nameEn: '',
        taglineAr: '',
        descriptionAr: '',
        category: 'text_writing',
        pricing: 'freemium',
        pricingAr: 'خطة مجانية + مدفوع',
        pricingDetailsAr: '',
        websiteUrl: 'https://',
        rating: 4.8,
        reviewsCount: 50,
        tags: ['ذكاء_اصطناعي'],
        supportsArabic: true,
        isFeatured: false,
        isPopular: false,
        isNew: true,
        platforms: ['Web'],
        pros: ['واجهة سهلة الاستخدام', 'نتائج دقيقة وسريعة'],
        cons: ['تتطلب اشتراك للوصول للميزات المتقدمة'],
        useCases: ['الاستخدام الشخصي', 'المشاريع الاحترافية'],
        status: 'published'
      });
      setTagsInput('ذكاء_اصطناعي, إنتاجية');
      setProsInput('واجهة سهلة الاستخدام\nنتائج دقيقة وسريعة');
      setConsInput('تتطلب اشتراك للوصول للميزات المتقدمة');
      setUseCasesInput('الاستخدام الشخصي\nالمشاريع الاحترافية');
    }
  }, [initialTool, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.nameAr?.trim() || !formData.nameEn?.trim() || !formData.websiteUrl?.trim()) {
      setErrorMsg('يرجى ملء الحقول الإلزامية: الاسم بالعربية، الاسم بالإنجليزية، ورابط الموقع.');
      return;
    }

    const parsedTags = tagsInput
      .split(/[,،]/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const parsedPros = prosInput
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const parsedCons = consInput
      .split('\n')
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    const parsedUseCases = useCasesInput
      .split('\n')
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    const gradients = [
      'from-indigo-600 to-violet-600',
      'from-cyan-600 to-blue-600',
      'from-emerald-600 to-teal-600',
      'from-amber-600 to-orange-600',
      'from-rose-600 to-pink-600',
      'from-purple-600 to-pink-600'
    ];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

    const toolToSave: AiTool = {
      id: initialTool?.id || `tool-${Date.now()}`,
      nameAr: formData.nameAr?.trim() || '',
      nameEn: formData.nameEn?.trim() || '',
      taglineAr: formData.taglineAr?.trim() || 'أداة ذكاء اصطناعي متطورة',
      descriptionAr: formData.descriptionAr?.trim() || '',
      category: formData.category as CategoryId || 'productivity',
      pricing: formData.pricing as PricingType || 'freemium',
      pricingAr: formData.pricingAr || 'مجاني / مدفوع',
      pricingDetailsAr: formData.pricingDetailsAr || '',
      websiteUrl: formData.websiteUrl?.trim() || '',
      rating: Number(formData.rating) || 4.7,
      reviewsCount: Number(formData.reviewsCount) || 1,
      tags: parsedTags.length > 0 ? parsedTags : ['ذكاء_اصطناعي'],
      supportsArabic: !!formData.supportsArabic,
      isFeatured: !!formData.isFeatured,
      isPopular: !!formData.isPopular,
      isNew: !!formData.isNew,
      platforms: formData.platforms || ['Web'],
      pros: parsedPros,
      cons: parsedCons,
      useCases: parsedUseCases,
      addedDate: initialTool?.addedDate || new Date().toISOString().split('T')[0],
      status: (formData.status as any) || 'published',
      gradient: initialTool?.gradient || randomGradient,
      iconBg: initialTool?.iconBg || 'bg-indigo-500',
      clicksCount: initialTool?.clicksCount || 0
    };

    try {
      setIsSubmitting(true);
      await onSave(toolToSave);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'حدث خطأ أثناء حفظ الأداة في قاعدة البيانات.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-slate-950/70 backdrop-blur-xs" dir="rtl">
      <div className={`relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl border ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      } shadow-2xl overflow-hidden`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {initialTool ? 'تعديل بيانات الأداة في Firestore' : 'إضافة أداة جديدة إلى الدليل (WordPress CMS)'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                تعديل وتحديث البيانات مباشرة في قاعدة البيانات دون لمس الكود
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                الاسم بالعربية <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.nameAr || ''}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                placeholder="مثال: شات جي بي تي"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                الاسم بالإنجليزية <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.nameEn || ''}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                placeholder="e.g. ChatGPT"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
                dir="ltr"
              />
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              الوصف المختصر (Tagline)
            </label>
            <input
              type="text"
              value={formData.taglineAr || ''}
              onChange={(e) => setFormData({ ...formData, taglineAr: e.target.value })}
              placeholder="مثال: النموذج اللغوي الأكثر شهرة للمحادثة والكتابة الذكية"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              الوصف الشامل للأداة
            </label>
            <textarea
              rows={3}
              value={formData.descriptionAr || ''}
              onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
              placeholder="اشرح ما تقدمه الأداة، أبرز قدراتها، ولمن تناسب..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden resize-none"
            />
          </div>

          {/* Category & Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                التصنيف
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as CategoryId })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
              >
                {categories.filter((c) => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nameAr} ({c.nameEn})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                نموذج التسعير
              </label>
              <select
                value={formData.pricing}
                onChange={(e) => {
                  const val = e.target.value as PricingType;
                  let ar = 'خطة مجانية + مدفوع';
                  if (val === 'free') ar = 'مجاني بالكامل';
                  if (val === 'paid') ar = 'مدفوع فقط';
                  if (val === 'free_trial') ar = 'تجربة مجانية';
                  if (val === 'open_source') ar = 'مفتوح المصدر';
                  setFormData({ ...formData, pricing: val, pricingAr: ar });
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
              >
                <option value="freemium">فريميوم (Freemium - مجاني جزئياً)</option>
                <option value="free">مجاني بالكامل (100% Free)</option>
                <option value="paid">مدفوع (Paid)</option>
                <option value="free_trial">تجربة مجانية (Free Trial)</option>
                <option value="open_source">مفتوح المصدر (Open Source)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                حالة النشر (Status)
              </label>
              <select
                value={formData.status || 'published'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
              >
                <option value="published">منشور للجمهور (Published)</option>
                <option value="draft">مسودة داخلية (Draft)</option>
                <option value="pending">بانتظار المراجعة (Pending)</option>
                <option value="archived">مؤرشف (Archived)</option>
              </select>
            </div>
          </div>

          {/* Website URL & Pricing Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                رابط الموقع الرسمي <span className="text-rose-500">*</span>
              </label>
              <input
                type="url"
                required
                value={formData.websiteUrl || ''}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                placeholder="https://example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                تفاصيل الباقات والتسعير
              </label>
              <input
                type="text"
                value={formData.pricingDetailsAr || ''}
                onChange={(e) => setFormData({ ...formData, pricingDetailsAr: e.target.value })}
                placeholder="مثال: تبدأ من $20 شهرياً مع خطة مجانية دائمة"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
              />
            </div>
          </div>

          {/* Tags & Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                الوسوم (مفصولة بفواصل)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="ذكاء_اصطناعي, كتابة, ترجمة, GPT-4"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                التقييم الأولي (1.0 - 5.0)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={formData.rating || 4.8}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.supportsArabic}
                onChange={(e) => setFormData({ ...formData, supportsArabic: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">يدعم العربية</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">أداة مميزة (Featured)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPopular}
                onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">أداة شائعة (Popular)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">أداة جديدة (New)</span>
            </label>
          </div>

          {/* Pros & Cons (Lines) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                أبرز المميزات (كل ميزة في سطر)
              </label>
              <textarea
                rows={3}
                value={prosInput}
                onChange={(e) => setProsInput(e.target.value)}
                placeholder="واجهة استخدام بديهية&#10;دعم تقني سريع"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                السلبيات أو القيود (كل سلبية في سطر)
              </label>
              <textarea
                rows={3}
                value={consInput}
                onChange={(e) => setConsInput(e.target.value)}
                placeholder="حدود الاستخدام في الخطة المجانية"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden resize-none"
              />
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            إلغاء
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="px-6 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 transition-all disabled:opacity-50 shadow-md shadow-indigo-600/20"
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? 'جاري الحفظ في Firestore...' : (initialTool ? 'تحديث ونشر التغييرات' : 'نشر الأداة في الدليل')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Plus, Sparkles, Check, Globe } from 'lucide-react';
import { AiTool, Category, CategoryId, PricingType } from '../types';

interface AddToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onAddTool: (tool: AiTool) => void;
  isDarkMode: boolean;
}

export const AddToolModal: React.FC<AddToolModalProps> = ({
  isOpen,
  onClose,
  categories,
  onAddTool,
  isDarkMode
}) => {
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [category, setCategory] = useState<CategoryId>('text_writing');
  const [pricing, setPricing] = useState<PricingType>('freemium');
  const [taglineAr, setTaglineAr] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [supportsArabic, setSupportsArabic] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr.trim() || !nameEn.trim() || !websiteUrl.trim() || !descriptionAr.trim()) {
      setErrorMsg('يرجى ملء الحقول الأساسية (الاسم بالعربية والإنجليزية، الرابط، والوصف)');
      return;
    }

    // Format URL
    let formattedUrl = websiteUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (tags.length === 0) {
      tags.push('ذكاء اصطناعي', 'جديد');
    }

    const pricingLabels: Record<PricingType, string> = {
      free: 'مجاني 100%',
      freemium: 'مجاني جزئياً (Freemium)',
      open_source: 'مفتوح المصدر',
      free_trial: 'تجربة مجانية',
      paid: 'مدفوع'
    };

    const gradients = [
      'from-blue-600 to-indigo-800',
      'from-purple-600 to-pink-700',
      'from-emerald-600 to-teal-800',
      'from-amber-600 to-rose-700',
      'from-cyan-600 to-blue-800'
    ];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

    const newTool: AiTool = {
      id: 'custom-' + Date.now(),
      nameAr: nameAr.trim(),
      nameEn: nameEn.trim(),
      taglineAr: taglineAr.trim() || nameAr.trim(),
      descriptionAr: descriptionAr.trim(),
      category,
      pricing,
      pricingAr: pricingLabels[pricing],
      websiteUrl: formattedUrl,
      rating: 5.0,
      reviewsCount: 1,
      tags,
      supportsArabic,
      platforms: ['ويب'],
      pros: ['أداة مضافة حديثاً من قبل المستخدم'],
      cons: ['في انتظار المزيد من تقييمات المجتمع'],
      useCases: ['تسهيل المهام وتوفير الوقت'],
      addedDate: new Date().toISOString().split('T')[0],
      customAdded: true,
      gradient: randomGradient,
      iconBg: 'bg-indigo-50 text-indigo-700'
    };

    onAddTool(newTool);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        id="add-tool-modal-container"
        className={`relative w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden z-10 my-8 transition-colors ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-800 text-slate-100' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        dir="rtl"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                اقتراح وإضافة أداة جديدة
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                أضف أي أداة ذكاء اصطناعي للمنصة لتظهر مباشرة في دليلك المحلي
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-600 dark:text-rose-400 font-medium">
              {errorMsg}
            </div>
          )}

          {isSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>تمت إضافة الأداة بنجاح إلى دليلك!</span>
            </div>
          )}

          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                اسم الأداة بالعربية *
              </label>
              <input
                type="text"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                placeholder="مثال: كانفا، كلود، كودكس..."
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                اسم الأداة بالإنجليزية *
              </label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="مثال: Canva, Claude, Cursor..."
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Website URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              رابط الموقع الرسمي للأداة *
            </label>
            <input
              type="text"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Category & Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                التصنيف الأساسي
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryId)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories
                  .filter((c) => c.id !== 'all')
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nameAr}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                نوع التسعير
              </label>
              <select
                value={pricing}
                onChange={(e) => setPricing(e.target.value as PricingType)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="freemium">مجاني جزئياً (Freemium)</option>
                <option value="free">مجاني بالكامل (Free)</option>
                <option value="open_source">مفتوح المصدر (Open Source)</option>
                <option value="free_trial">تجربة مجانية (Free Trial)</option>
                <option value="paid">مدفوع (Paid)</option>
              </select>
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              شعار أو سطر تعريفي موجز
            </label>
            <input
              type="text"
              value={taglineAr}
              onChange={(e) => setTaglineAr(e.target.value)}
              placeholder="مثال: أداة لتوليد الصور الاحترافية بنقرة واحدة"
              className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              الوصف والمميزات *
            </label>
            <textarea
              value={descriptionAr}
              onChange={(e) => setDescriptionAr(e.target.value)}
              placeholder="اشرح ما تقدمه هذه الأداة وكيف تفيد المستخدمين..."
              rows={3}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              الكلمات المفتاحية (مفصولة بفاصلة)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="مثال: صور, رسم, فريميوم, تصميم"
              className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Arabic Support Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="add-arabic-support"
              checked={supportsArabic}
              onChange={(e) => setSupportsArabic(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded-sm focus:ring-indigo-500"
            />
            <label htmlFor="add-arabic-support" className="text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              تدعم الأداة اللغة العربية في الواجهة أو المعالجة
            </label>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>إضافة الأداة للدليل</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

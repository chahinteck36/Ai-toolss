import React, { useState } from 'react';
import { Category, CategoryId, PricingType, ToolSubmission } from '../types';
import { X, Send, Sparkles, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { submitToolProposal } from '../lib/firebase';

interface VisitorSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  isDarkMode: boolean;
  onSuccessNotification?: (msg: string) => void;
}

export const VisitorSubmitModal: React.FC<VisitorSubmitModalProps> = ({
  isOpen,
  onClose,
  categories,
  isDarkMode,
  onSuccessNotification
}) => {
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    taglineAr: '',
    descriptionAr: '',
    category: 'text_writing' as CategoryId,
    pricing: 'freemium' as PricingType,
    websiteUrl: '',
    submittedBy: '',
    submitterEmail: '',
    notes: '',
    supportsArabic: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.nameAr.trim() || !formData.websiteUrl.trim()) {
      setErrorMsg('يرجى كتابة اسم الأداة ورابط موقعها الرسمي.');
      return;
    }

    try {
      setIsSubmitting(true);
      await submitToolProposal({
        nameAr: formData.nameAr.trim(),
        nameEn: formData.nameEn.trim() || formData.nameAr.trim(),
        taglineAr: formData.taglineAr.trim() || 'أداة ذكاء اصطناعي مفيدة',
        descriptionAr: formData.descriptionAr.trim() || formData.taglineAr.trim(),
        category: formData.category,
        pricing: formData.pricing,
        websiteUrl: formData.websiteUrl.trim(),
        submittedBy: formData.submittedBy.trim() || 'زائر مجهول',
        submitterEmail: formData.submitterEmail.trim() || '',
        notes: formData.notes.trim(),
        supportsArabic: formData.supportsArabic,
        tags: ['مقترح_زائر', 'ذكاء_اصطناعي']
      });

      setIsSubmittedSuccess(true);
      if (onSuccessNotification) {
        onSuccessNotification('تم إرسال اقتراحك بنجاح! سيتم مراجعته واعتماده من قِبل إدارة الدليل.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'تعذر إرسال الاقتراح، يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmittedSuccess(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs" dir="rtl">
      <div className={`relative w-full max-w-lg rounded-3xl border ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      } shadow-2xl overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                اقترح أداة ذكاء اصطناعي جديدة
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                شاركنا أدواتك المفضلة وسنقوم بمراجعتها ونشرها في الدليل
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSubmittedSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              شكراً لمساهمتك القيمة! 🎉
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
              تم إرسال اقتراح الأداة بنجاح إلى قاعدة البيانات. ستتم مراجعتها من قِبل المشرفين وقبولها لتظهر في الدليل الرئيسي لجميع المستخدمين.
            </p>
            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            >
              تم، العودة للدليل
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  اسم الأداة (عربي/إنجليزي) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.nameAr}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  placeholder="مثال: ElevenLabs"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  الاسم بالإنجليزي (إن وُجد)
                </label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  placeholder="ElevenLabs"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                رابط الموقع الرسمي للأداة <span className="text-rose-500">*</span>
              </label>
              <input
                type="url"
                required
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                placeholder="https://elevenlabs.io"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
                dir="ltr"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  التصنيف الأنسب
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as CategoryId })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
                >
                  {categories.filter((c) => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nameAr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  نموذج التسعير التقريبي
                </label>
                <select
                  value={formData.pricing}
                  onChange={(e) => setFormData({ ...formData, pricing: e.target.value as PricingType })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
                >
                  <option value="freemium">فريميوم (تجربة مجانية + مدفوع)</option>
                  <option value="free">مجاني بالكامل</option>
                  <option value="paid">مدفوع فقط</option>
                  <option value="free_trial">تجربة مجانية</option>
                  <option value="open_source">مفتوح المصدر</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                نبذة عن الأداة وما تقدمه
              </label>
              <textarea
                rows={2}
                value={formData.descriptionAr}
                onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                placeholder="مثال: أداة متخصصة في استنساخ وتوليد الأصوات الواقعية بالعربية والإنجليزية..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  اسمك (اختياري)
                </label>
                <input
                  type="text"
                  value={formData.submittedBy}
                  onChange={(e) => setFormData({ ...formData, submittedBy: e.target.value })}
                  placeholder="محمد أحمد"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  بريدك الإلكتروني (اختياري للإشعار)
                </label>
                <input
                  type="email"
                  value={formData.submitterEmail}
                  onChange={(e) => setFormData({ ...formData, submitterEmail: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 transition-all shadow-md disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال الاقتراح للمراجعة'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

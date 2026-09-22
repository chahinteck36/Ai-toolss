import React, { useState } from 'react';
import { Category, CategoryId, PricingType, SupportedLanguage } from '../types';
import { X, Send, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitToolProposal } from '../lib/firebase';

interface VisitorSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  isDarkMode: boolean;
  lang?: SupportedLanguage;
  onSuccessNotification?: (msg: string) => void;
}

export const VisitorSubmitModal: React.FC<VisitorSubmitModalProps> = ({
  isOpen,
  onClose,
  categories,
  isDarkMode,
  lang = 'ar',
  onSuccessNotification
}) => {
  const isAr = lang === 'ar';

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
      setErrorMsg(isAr ? 'يرجى كتابة اسم الأداة ورابط موقعها الرسمي.' : 'Please provide the tool name and official website URL.');
      return;
    }

    try {
      setIsSubmitting(true);
      await submitToolProposal({
        nameAr: formData.nameAr.trim(),
        nameEn: formData.nameEn.trim() || formData.nameAr.trim(),
        taglineAr: formData.taglineAr.trim() || (isAr ? 'أداة ذكاء اصطناعي مفيدة' : 'Useful AI Tool'),
        descriptionAr: formData.descriptionAr.trim() || formData.taglineAr.trim(),
        category: formData.category,
        pricing: formData.pricing,
        websiteUrl: formData.websiteUrl.trim(),
        submittedBy: formData.submittedBy.trim() || (isAr ? 'زائر مجهول' : 'Anonymous Visitor'),
        submitterEmail: formData.submitterEmail.trim() || '',
        notes: formData.notes.trim(),
        supportsArabic: formData.supportsArabic,
        tags: [isAr ? 'مقترح_زائر' : 'visitor_submission', 'ai_tools']
      });

      setIsSubmittedSuccess(true);
      if (onSuccessNotification) {
        onSuccessNotification(
          isAr
            ? 'تم إرسال اقتراحك بنجاح! سيتم مراجعته واعتماده من قِبل إدارة الدليل.'
            : 'Your proposal was submitted successfully! Our curators will review it shortly.'
        );
      }
    } catch (err: any) {
      setErrorMsg(err.message || (isAr ? 'تعذر إرسال الاقتراح، يرجى المحاولة مرة أخرى.' : 'Failed to submit proposal, please try again.'));
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs" dir={isAr ? 'rtl' : 'ltr'}>
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
                {isAr ? 'اقترح أداة ذكاء اصطناعي جديدة' : 'Suggest a New AI Tool'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'شاركنا أدواتك المفضلة وسنقوم بمراجعتها ونشرها في الدليل' : 'Submit your favorite tool to be reviewed and published in the directory'}
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={isAr ? 'إغلاق' : 'Close'}
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
              {isAr ? 'شكراً لمساهمتك القيمة! 🎉' : 'Thank You for Contributing! 🎉'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
              {isAr
                ? 'تم إرسال اقتراح الأداة بنجاح إلى قاعدة البيانات. ستتم مراجعتها من قِبل المشرفين وقبولها لتظهر في الدليل الرئيسي لجميع المستخدمين.'
                : 'The proposal was saved successfully. Our team will verify and catalog it for public browsing.'}
            </p>
            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            >
              {isAr ? 'تم، العودة للدليل' : 'Done, Return to Directory'}
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
                  {isAr ? 'اسم الأداة (عربي/إنجليزي)' : 'Tool Name'} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.nameAr}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  placeholder={isAr ? 'مثال: ElevenLabs' : 'e.g. ElevenLabs'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'الاسم بالإنجليزي (إن وُجد)' : 'English Name (Optional)'}
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
                {isAr ? 'رابط الموقع الرسمي للأداة' : 'Official Website URL'} <span className="text-rose-500">*</span>
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
                  {isAr ? 'التصنيف الأنسب' : 'Category'}
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as CategoryId })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
                >
                  {categories.filter((c) => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>
                      {isAr ? c.nameAr : (c.nameEn || c.nameAr)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'نموذج التسعير التقريبي' : 'Pricing Model'}
                </label>
                <select
                  value={formData.pricing}
                  onChange={(e) => setFormData({ ...formData, pricing: e.target.value as PricingType })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
                >
                  <option value="freemium">{isAr ? 'فريميوم (تجربة مجانية + مدفوع)' : 'Freemium (Free tier + Paid)'}</option>
                  <option value="free">{isAr ? 'مجاني بالكامل' : '100% Free'}</option>
                  <option value="paid">{isAr ? 'مدفوع فقط' : 'Paid Only'}</option>
                  <option value="free_trial">{isAr ? 'تجربة مجانية' : 'Free Trial'}</option>
                  <option value="open_source">{isAr ? 'مفتوح المصدر' : 'Open Source'}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'نبذة عن الأداة وما تقدمه' : 'Short Description / Features'}
              </label>
              <textarea
                rows={2}
                value={formData.descriptionAr}
                onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                placeholder={isAr ? 'مثال: أداة متخصصة في استنساخ وتوليد الأصوات الواقعية...' : 'e.g. AI-powered voice cloning and speech generation platform...'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  {isAr ? 'اسمك (اختياري)' : 'Your Name (Optional)'}
                </label>
                <input
                  type="text"
                  value={formData.submittedBy}
                  onChange={(e) => setFormData({ ...formData, submittedBy: e.target.value })}
                  placeholder={isAr ? 'محمد أحمد' : 'Alex'}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  {isAr ? 'بريدك الإلكتروني (اختياري للإشعار)' : 'Your Email (Optional)'}
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
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 transition-all shadow-md disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? (isAr ? 'جاري الإرسال...' : 'Submitting...') : (isAr ? 'إرسال الاقتراح للمراجعة' : 'Submit Proposal')}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

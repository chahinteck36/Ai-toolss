import React, { useState, useEffect } from 'react';
import { Link2, Copy, Check, Sparkles } from 'lucide-react';

interface SlugGeneratorToolProps {
  lang: string;
  isDarkMode: boolean;
}

export const SlugGeneratorTool: React.FC<SlugGeneratorToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [inputTitle, setInputTitle] = useState('أفضل أدوات الذكاء الاصطناعي المجانية لعام 2026');
  const [slug, setSlug] = useState('');
  const [separator, setSeparator] = useState<'-' | '_'>('-');
  const [lowercase, setLowercase] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generateSlug();
  }, [inputTitle, separator, lowercase]);

  const generateSlug = () => {
    if (!inputTitle.trim()) {
      setSlug('');
      return;
    }

    let clean = inputTitle.trim();
    if (lowercase) clean = clean.toLowerCase();

    // Replace punctuation, special symbols, slashes with separator
    clean = clean
      .replace(/[\s\t\n\r_—–―~`!@#$%^&*()+=\[\]{}|\\:;"'<>,.?/؟،؛]+/g, separator)
      .replace(new RegExp(`\\${separator}+`, 'g'), separator)
      .replace(new RegExp(`^\\${separator}|\\${separator}$`, 'g'), '');

    setSlug(clean);
  };

  const copySlug = () => {
    if (!slug) return;
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-6`}>
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
        <Link2 className="w-5 h-5 text-indigo-500" />
        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
          {isAr ? 'مولد الروابط والـ Slugs المتوافقة مع السيو (SEO-Friendly)' : 'URL Slug Generator'}
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            {isAr ? 'أدخل عنوان المقال أو الصفحة:' : 'Enter Article / Page Title:'}
          </label>
          <input
            type="text"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border text-sm font-medium ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {isAr ? 'فاصل الكلمات:' : 'Separator:'}
            </span>
            <button
              type="button"
              onClick={() => setSeparator('-')}
              className={`px-3 py-1 rounded-lg border font-mono font-bold ${
                separator === '-' ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-600' : 'border-slate-300'
              }`}
            >
              - (Hyphen)
            </button>
            <button
              type="button"
              onClick={() => setSeparator('_')}
              className={`px-3 py-1 rounded-lg border font-mono font-bold ${
                separator === '_' ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-600' : 'border-slate-300'
              }`}
            >
              _ (Underscore)
            </button>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 font-semibold">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
              className="rounded text-indigo-600"
            />
            <span>{isAr ? 'تحويل الأحرف الإنجليزية إلى حروف صغيرة' : 'Force Lowercase'}</span>
          </label>
        </div>

        {/* Output */}
        <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-2">
          <span className="text-xs font-bold text-slate-500 block">
            {isAr ? 'رابط الـ Slug الجاهز لمحركات البحث (SEO URL):' : 'Generated Slug:'}
          </span>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm sm:text-base font-mono font-bold text-indigo-600 dark:text-indigo-400 break-all select-all">
              {slug || '...'}
            </span>
            <button
              onClick={copySlug}
              disabled={!slug}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الرابط' : 'Copy')}</span>
            </button>
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 pt-1">
            https://adawatai.online/blog/{slug}
          </div>
        </div>
      </div>
    </div>
  );
};

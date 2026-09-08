import React, { useState } from 'react';
import { ArrowUpDown, Copy, Check, Trash2, Shuffle } from 'lucide-react';

interface TextSorterToolProps {
  lang: string;
  isDarkMode: boolean;
}

export const TextSorterTool: React.FC<TextSorterToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const sortLines = (type: 'az' | 'za' | 'num' | 'lenAsc' | 'lenDesc' | 'reverse' | 'shuffle') => {
    if (!text.trim()) return;
    let lines = text.split('\n');

    if (type === 'az') {
      lines.sort((a, b) => a.localeCompare(b, undefined, { numeric: false }));
    } else if (type === 'za') {
      lines.sort((a, b) => b.localeCompare(a, undefined, { numeric: false }));
    } else if (type === 'num') {
      lines.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    } else if (type === 'lenAsc') {
      lines.sort((a, b) => a.length - b.length);
    } else if (type === 'lenDesc') {
      lines.sort((a, b) => b.length - a.length);
    } else if (type === 'reverse') {
      lines.reverse();
    } else if (type === 'shuffle') {
      lines = lines.sort(() => Math.random() - 0.5);
    }

    setText(lines.join('\n'));
  };

  const copyResult = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-6`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-5 h-5 text-indigo-500" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            {isAr ? 'أداة ترتيب وفرز النصوص والأسطر' : 'Text Sorter & Order Tool'}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setText('')}
            className="text-xs text-rose-500 hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isAr ? 'مسح' : 'Clear'}</span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          placeholder={isAr ? 'الصق الكلمات أو الأسطر هنا للترتيب...' : 'Paste lines or items here to sort...'}
          className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-mono leading-relaxed resize-y ${
            isDarkMode ? 'bg-slate-800/70 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
          }`}
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            type="button"
            onClick={() => sortLines('az')}
            className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
          >
            {isAr ? 'أبجدياً (أ إلى ي / A-Z)' : 'Alphabetical (A to Z)'}
          </button>

          <button
            type="button"
            onClick={() => sortLines('za')}
            className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
          >
            {isAr ? 'عكسي (ي إلى أ / Z-A)' : 'Reverse Alphabetical (Z to A)'}
          </button>

          <button
            type="button"
            onClick={() => sortLines('num')}
            className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
          >
            {isAr ? 'ترتيب رقمي طبيعي (1, 2, 10)' : 'Natural Number Sort'}
          </button>

          <button
            type="button"
            onClick={() => sortLines('lenAsc')}
            className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
          >
            {isAr ? 'حسب الطول (الأقصر أولاً)' : 'Shortest First'}
          </button>

          <button
            type="button"
            onClick={() => sortLines('lenDesc')}
            className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
          >
            {isAr ? 'حسب الطول (الأطول أولاً)' : 'Longest First'}
          </button>

          <button
            type="button"
            onClick={() => sortLines('reverse')}
            className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
          >
            {isAr ? 'قلب ترتيب الأسطر' : 'Reverse Line Order'}
          </button>

          <button
            type="button"
            onClick={() => sortLines('shuffle')}
            className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Shuffle className="w-3.5 h-3.5 text-indigo-500" />
            <span>{isAr ? 'خلط عشوائي' : 'Shuffle Randomly'}</span>
          </button>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={copyResult}
          disabled={!text}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ القائمة المرتبة' : 'Copy Sorted List')}</span>
        </button>
      </div>
    </div>
  );
};

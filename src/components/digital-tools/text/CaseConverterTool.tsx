import React, { useState } from 'react';
import { Type, Copy, Check, Trash2, Download } from 'lucide-react';

interface CaseConverterToolProps {
  lang: string;
  isDarkMode: boolean;
}

export const CaseConverterTool: React.FC<CaseConverterToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const toSentenceCase = (str: string) => {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const toTitleCase = (str: string) => {
    return str.toLowerCase().replace(/\b\w+/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));
  };

  const toCamelCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
  };

  const toSnakeCase = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/[\s\W-]+/g, '_')
      .replace(/^_+|_+$/g, '');
  };

  const toKebabCase = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/[\s\W_]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const copyResult = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_case_text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-6`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-indigo-500" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            {isAr ? 'محول حالة الأحرف الإنجليزية والنصوص' : 'Text Case Converter'}
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
          rows={7}
          placeholder={isAr ? 'الصق النص الإنجليزي هنا لتغيير حالة الأحرف بنقرة واحدة...' : 'Paste your text here to convert case instantly...'}
          className={`w-full p-4 rounded-2xl border text-sm font-mono leading-relaxed resize-y ${
            isDarkMode ? 'bg-slate-800/70 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
          }`}
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { label: 'UPPERCASE', action: () => setText(text.toUpperCase()) },
            { label: 'lowercase', action: () => setText(text.toLowerCase()) },
            { label: 'Title Case', action: () => setText(toTitleCase(text)) },
            { label: 'Sentence case', action: () => setText(toSentenceCase(text)) },
            { label: 'camelCase', action: () => setText(toCamelCase(text)) },
            { label: 'snake_case', action: () => setText(toSnakeCase(text)) },
            { label: 'kebab-case', action: () => setText(toKebabCase(text)) },
            {
              label: isAr ? 'عكس الحالة' : 'iNVERT cASE',
              action: () =>
                setText(
                  text
                    .split('')
                    .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
                    .join('')
                )
            }
          ].map((btn, idx) => (
            <button
              key={idx}
              type="button"
              onClick={btn.action}
              className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:border-indigo-500 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors text-center"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2">
        <button
          onClick={copyResult}
          disabled={!text}
          className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ النص للحافظة' : 'Copy')}</span>
        </button>

        <button
          onClick={downloadTxt}
          disabled={!text}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <Download className="w-4 h-4" />
          <span>{isAr ? 'تحميل كملف .txt' : 'Download .txt'}</span>
        </button>
      </div>
    </div>
  );
};

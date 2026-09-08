import React, { useState } from 'react';
import { Sparkles, Copy, Check, Trash2, Download } from 'lucide-react';

interface TextCleanerToolProps {
  lang: string;
  isDarkMode: boolean;
}

export const TextCleanerTool: React.FC<TextCleanerToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const cleanText = (type: 'extraSpaces' | 'emptyLines' | 'stripHtml' | 'removeEmoji' | 'trimAll') => {
    if (!text) return;
    let result = text;

    if (type === 'extraSpaces') {
      result = result.replace(/[^\S\r\n]+/g, ' ').replace(/^[^\S\r\n]+|[^\S\r\n]+$/gm, '');
    } else if (type === 'emptyLines') {
      result = result.split('\n').filter((l) => l.trim().length > 0).join('\n');
    } else if (type === 'stripHtml') {
      result = result.replace(/<[^>]*>?/gm, '');
    } else if (type === 'removeEmoji') {
      result = result.replace(
        /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/gu,
        ''
      );
    } else if (type === 'trimAll') {
      result = result
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)
        .join('\n');
    }

    setText(result);
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
          <Sparkles className="w-5 h-5 text-indigo-500" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            {isAr ? 'أداة تنظيف النصوص وإزالة المسافات والرموز' : 'Text Cleaner & Sanitizer Tool'}
          </h3>
        </div>

        <button
          onClick={() => setText('')}
          className="text-xs text-rose-500 hover:underline flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{isAr ? 'مسح' : 'Clear'}</span>
        </button>
      </div>

      <div className="space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          placeholder={isAr ? 'الصق النص المراد تنظيفه وإزالة التنسيقات العشوائية منه...' : 'Paste text to clean extra spaces, HTML tags, or emojis...'}
          className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-mono leading-relaxed resize-y ${
            isDarkMode ? 'bg-slate-800/70 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
          }`}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {[
            { labelAr: 'إزالة المسافات المتكررة', labelEn: 'Remove Extra Spaces', id: 'extraSpaces' },
            { labelAr: 'حذف السطور الفارغة', labelEn: 'Remove Empty Lines', id: 'emptyLines' },
            { labelAr: 'إزالة وسوم HTML', labelEn: 'Strip HTML Tags', id: 'stripHtml' },
            { labelAr: 'إزالة الإيموجي والرموز', labelEn: 'Remove Emojis', id: 'removeEmoji' },
            { labelAr: 'تنظيف وتنسيق شامل', labelEn: 'Clean All Lines', id: 'trimAll' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => cleanText(item.id as any)}
              className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors text-center"
            >
              {isAr ? item.labelAr : item.labelEn}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={copyResult}
          disabled={!text}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ النص النظيف' : 'Copy Cleaned Text')}</span>
        </button>
      </div>
    </div>
  );
};

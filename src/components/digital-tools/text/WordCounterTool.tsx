import React, { useState } from 'react';
import { AlignLeft, Copy, Check, Trash2, Clock, Mic, FileText } from 'lucide-react';

interface WordCounterToolProps {
  lang: string;
  isDarkMode: boolean;
}

export const WordCounterTool: React.FC<WordCounterToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  // Compute metrics
  const trimmed = text.trim();
  const wordsArray = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const wordCount = wordsArray.length;
  const charWithSpaces = text.length;
  const charWithoutSpaces = text.replace(/\s+/g, '').length;
  const sentenceCount = trimmed ? (trimmed.match(/[.!?؟]+(\s|$)/g) || []).length || (trimmed.length > 0 ? 1 : 0) : 0;
  const paragraphCount = trimmed ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;
  const readingTimeMin = Math.ceil(wordCount / 200); // 200 wpm
  const speakingTimeMin = Math.ceil(wordCount / 130); // 130 wpm

  // Keyword density
  const wordFrequency: { [key: string]: number } = {};
  wordsArray.forEach((w) => {
    const cleanWord = w.toLowerCase().replace(/[.,!?;:()[\]{}'"`،؟]/g, '');
    if (cleanWord.length > 2) {
      wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1;
    }
  });

  const topKeywords = Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-6`}>
      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {[
          { labelAr: 'الكلمات', labelEn: 'Words', val: wordCount, color: 'text-indigo-600 dark:text-indigo-400' },
          { labelAr: 'الأحرف مع مسافات', labelEn: 'Chars (with space)', val: charWithSpaces, color: 'text-blue-600 dark:text-blue-400' },
          { labelAr: 'الأحرف بدون مسافات', labelEn: 'Chars (no space)', val: charWithoutSpaces, color: 'text-violet-600 dark:text-violet-400' },
          { labelAr: 'الجمل', labelEn: 'Sentences', val: sentenceCount, color: 'text-emerald-600 dark:text-emerald-400' },
          { labelAr: 'الفقرات', labelEn: 'Paragraphs', val: paragraphCount, color: 'text-amber-600 dark:text-amber-400' },
          { labelAr: 'وقت القراءة', labelEn: 'Reading Time', val: `${readingTimeMin} د`, color: 'text-rose-600 dark:text-rose-400' }
        ].map((item, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-2xl border ${
              isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200/80'
            } text-center`}
          >
            <span className={`text-xl font-extrabold ${item.color} block`}>
              {item.val}
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              {isAr ? item.labelAr : item.labelEn}
            </span>
          </div>
        ))}
      </div>

      {/* Editor Box */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {isAr ? 'اكتب أو الصق النص هنا:' : 'Type or Paste Text Here:'}
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setText('')}
              className="text-xs text-rose-500 hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'مسح' : 'Clear'}</span>
            </button>
            <button
              onClick={copyText}
              disabled={!text}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ النص' : 'Copy')}</span>
            </button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={9}
          placeholder={isAr ? 'ابدأ بكتابة مقالك أو الصق النص لحساب الكلمات والأحرف وقراءة الإحصائيات الدقيقة...' : 'Start typing or paste text to analyze words, characters, and reading statistics...'}
          className={`w-full p-4 rounded-2xl border text-sm leading-relaxed resize-y ${
            isDarkMode ? 'bg-slate-800/70 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
          }`}
        />
      </div>

      {/* Keywords Section */}
      {topKeywords.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            {isAr ? 'الكلمات الأكثر تكراراً وكثافة (SEO Keywords):' : 'Top Keywords & Density:'}
          </span>
          <div className="flex flex-wrap gap-2">
            {topKeywords.map(([kw, count]) => {
              const density = ((count / wordCount) * 100).toFixed(1);
              return (
                <div
                  key={kw}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs flex items-center gap-2"
                >
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{kw}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px]">
                    {count}× ({density}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

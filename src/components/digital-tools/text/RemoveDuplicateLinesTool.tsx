import React, { useState } from 'react';
import { ListFilter, Copy, Check, Trash2, Download } from 'lucide-react';

interface RemoveDuplicateLinesToolProps {
  lang: string;
  isDarkMode: boolean;
}

export const RemoveDuplicateLinesTool: React.FC<RemoveDuplicateLinesToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [removedCount, setRemovedCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const processDuplicates = () => {
    if (!inputText) {
      setOutputText('');
      setRemovedCount(0);
      return;
    }

    let lines = inputText.split('\n');
    const originalLength = lines.length;

    if (trimLines) {
      lines = lines.map((l) => l.trim());
    }

    if (removeEmpty) {
      lines = lines.filter((l) => l.length > 0);
    }

    const seen = new Set<string>();
    const uniqueLines: string[] = [];

    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        uniqueLines.push(line);
      }
    }

    setOutputText(uniqueLines.join('\n'));
    setRemovedCount(originalLength - uniqueLines.length);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-6`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <ListFilter className="w-5 h-5 text-indigo-500" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            {isAr ? 'حذف الأسطر المكررة وفلترة القوائم' : 'Remove Duplicate Lines Tool'}
          </h3>
        </div>

        {removedCount > 0 && (
          <span className="px-3 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
            {isAr ? `تم حذف ${removedCount} سطر مكرر` : `Removed ${removedCount} duplicate lines`}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700 dark:text-slate-300">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="rounded text-indigo-600"
          />
          <span>{isAr ? 'حساس لحالة الأحرف (Case Sensitive)' : 'Case Sensitive'}</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={trimLines}
            onChange={(e) => setTrimLines(e.target.checked)}
            className="rounded text-indigo-600"
          />
          <span>{isAr ? 'حذف المسافات الزائدة من أطراف السطور' : 'Trim Leading/Trailing Whitespace'}</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={removeEmpty}
            onChange={(e) => setRemoveEmpty(e.target.checked)}
            className="rounded text-indigo-600"
          />
          <span>{isAr ? 'تجاهل الأسطر الفارغة' : 'Ignore Empty Lines'}</span>
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            {isAr ? 'النص الأصلي (قائمة الأسطر):' : 'Original Text:'}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={10}
            placeholder={isAr ? 'الصق القائمة أو الأسطر هنا...' : 'Paste lines or list here...'}
            className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-mono leading-relaxed resize-y ${
              isDarkMode ? 'bg-slate-800/70 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isAr ? 'النتيجة بعد تصفية التكرارات:' : 'Clean Unique Output:'}
            </label>
            {outputText && (
              <button
                onClick={copyResult}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-indigo-500" />}
                <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ النتيجة' : 'Copy')}</span>
              </button>
            )}
          </div>
          <textarea
            value={outputText}
            readOnly
            rows={10}
            placeholder={isAr ? 'ستظهر القائمة المنقاة والفريدة هنا...' : 'Clean unique list will appear here...'}
            className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-mono leading-relaxed resize-y ${
              isDarkMode ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-slate-100/70 border-slate-200 text-slate-800'
            }`}
          />
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <button
          onClick={processDuplicates}
          className="py-3 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-2"
        >
          <ListFilter className="w-4 h-4" />
          <span>{isAr ? 'تصفية وحذف التكرار الآن' : 'Remove Duplicate Lines Now'}</span>
        </button>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { AlignLeft, Copy, Check, RefreshCw } from 'lucide-react';

interface LoremIpsumGeneratorToolProps {
  lang: string;
  isDarkMode: boolean;
}

const LATIN_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
  'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'ut',
  'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi',
  'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in',
  'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla',
  'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa',
  'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

const ARABIC_WORDS = [
  'هذا', 'نص', 'تجريبي', 'لاختبار', 'التصميم', 'والتنسيق', 'في', 'الموقع', 'الرقمي', 'حيث',
  'يمكن', 'استخدامه', 'كمثال', 'واقعي', 'لتوزيع', 'المحتوى', 'والخطوط', 'العربية', 'الأصيلة', 'دون',
  'الحاجة', 'إلى', 'انتظار', 'النصوص', 'النهائية', 'من', 'العميل', 'أو', 'فريق', 'التحرير',
  'كما', 'يساعد', 'المصممين', 'على', 'معاينة', 'المظهر', 'العام', 'وتناسق', 'الفقرات', 'والألوان',
  'بصورة', 'واضحة', 'ومريحة', 'للعين', 'ومناسبة', 'لكافة', 'الشاشات', 'والأجهزة', 'الذكية'
];

export const LoremIpsumGeneratorTool: React.FC<LoremIpsumGeneratorToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [textType, setTextType] = useState<'ar' | 'latin'>('ar');
  const [unit, setUnit] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [count, setCount] = useState(3);
  const [includeHtml, setIncludeHtml] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generate();
  }, [textType, unit, count, includeHtml]);

  const generate = () => {
    const vocab = textType === 'ar' ? ARABIC_WORDS : LATIN_WORDS;

    const makeSentence = (minWords = 8, maxWords = 16) => {
      const len = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
      const words: string[] = [];
      for (let i = 0; i < len; i++) {
        const randWord = vocab[Math.floor(Math.random() * vocab.length)];
        words.push(i === 0 && textType === 'latin' ? randWord.charAt(0).toUpperCase() + randWord.slice(1) : randWord);
      }
      return words.join(' ') + (textType === 'ar' ? '، وهو أمر مهم للتصميم.' : '.');
    };

    const makeParagraph = () => {
      const sentencesCount = Math.floor(Math.random() * 3) + 3;
      const sentences: string[] = [];
      for (let i = 0; i < sentencesCount; i++) {
        sentences.push(makeSentence());
      }
      return sentences.join(' ');
    };

    let result = '';

    if (unit === 'words') {
      const words: string[] = [];
      for (let i = 0; i < count; i++) {
        words.push(vocab[Math.floor(Math.random() * vocab.length)]);
      }
      result = words.join(' ');
    } else if (unit === 'sentences') {
      const sentences: string[] = [];
      for (let i = 0; i < count; i++) {
        sentences.push(makeSentence());
      }
      result = sentences.join('\n\n');
    } else {
      const paras: string[] = [];
      for (let i = 0; i < count; i++) {
        paras.push(makeParagraph());
      }
      if (includeHtml) {
        result = paras.map((p) => `<p>${p}</p>`).join('\n\n');
      } else {
        result = paras.join('\n\n');
      }
    }

    setGeneratedText(result);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-6`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <AlignLeft className="w-5 h-5 text-indigo-500" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            {isAr ? 'مولد النص التجريبي لوريم إيبسوم العربي واللاتيني' : 'Lorem Ipsum Generator'}
          </h3>
        </div>

        <button
          onClick={generate}
          className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1.5 hover:underline"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{isAr ? 'توليد جديد' : 'Regenerate'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            {isAr ? 'لغة النص:' : 'Language:'}
          </label>
          <select
            value={textType}
            onChange={(e: any) => setTextType(e.target.value)}
            className={`w-full px-3 py-2.5 rounded-xl border text-xs ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          >
            <option value="ar">{isAr ? 'نص عربي شكلي مخصص' : 'Arabic Sample Text'}</option>
            <option value="latin">{isAr ? 'لاتيني قياسي (Lorem Ipsum)' : 'Latin Lorem Ipsum'}</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            {isAr ? 'نوع التوليد:' : 'Unit:'}
          </label>
          <select
            value={unit}
            onChange={(e: any) => setUnit(e.target.value)}
            className={`w-full px-3 py-2.5 rounded-xl border text-xs ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          >
            <option value="paragraphs">{isAr ? 'فقرات كاملة (Paragraphs)' : 'Paragraphs'}</option>
            <option value="sentences">{isAr ? 'جمل (Sentences)' : 'Sentences'}</option>
            <option value="words">{isAr ? 'كلمات (Words)' : 'Words'}</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            {isAr ? `العدد (${count}):` : `Count (${count}):`}
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(30, Number(e.target.value))))}
            className={`w-full px-3 py-2 rounded-xl border text-sm ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          />
        </div>

        {unit === 'paragraphs' && (
          <div className="pb-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={includeHtml}
                onChange={(e) => setIncludeHtml(e.target.checked)}
                className="rounded text-indigo-600"
              />
              <span>{isAr ? 'تضمين وسوم <p>' : 'Wrap in <p> tags'}</span>
            </label>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <textarea
          value={generatedText}
          readOnly
          rows={8}
          className={`w-full p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed font-sans resize-y ${
            isDarkMode ? 'bg-slate-800/70 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
          }`}
        />

        <div className="flex justify-end pt-1">
          <button
            onClick={copyResult}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ النص للحافظة' : 'Copy')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

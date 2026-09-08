import React, { useState } from 'react';
import { FileDropzone } from '../common/FileDropzone';
import { Sparkles, Download, Copy, Check, Globe } from 'lucide-react';

interface FaviconGeneratorToolProps {
  lang: string;
  isDarkMode: boolean;
}

interface FaviconSize {
  size: number;
  label: string;
  dataUrl: string;
}

export const FaviconGeneratorTool: React.FC<FaviconGeneratorToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [file, setFile] = useState<File | null>(null);
  const [favicons, setFavicons] = useState<FaviconSize[]>([]);
  const [copiedHtml, setCopiedHtml] = useState(false);

  const sizes = [
    { size: 16, label: '16x16 (تبويب المتصفح الكلاسيكي)' },
    { size: 32, label: '32x32 (أيقونة شريط المفضلة والمواقع)' },
    { size: 48, label: '48x48 (مواقع سطح المكتب وويندوز)' },
    { size: 180, label: '180x180 (أيقونة شاشة آبل Apple Touch)' },
    { size: 512, label: '512x512 (أيقونة تطبيقات الويب PWA)' }
  ];

  const handleFileSelected = async (files: File[]) => {
    if (files.length === 0) return;
    const selected = files[0];
    setFile(selected);

    try {
      const bitmap = await createImageBitmap(selected);
      const results: FaviconSize[] = [];

      for (const item of sizes) {
        const canvas = document.createElement('canvas');
        canvas.width = item.size;
        canvas.height = item.size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(bitmap, 0, 0, item.size, item.size);
          const dataUrl = canvas.toDataURL('image/png');
          results.push({
            size: item.size,
            label: item.label,
            dataUrl
          });
        }
      }

      setFavicons(results);
    } catch (err) {
      console.error(err);
    }
  };

  const htmlSnippet = `<!-- Adawatai.online Favicon Bundle -->
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`;

  const copyHtml = () => {
    navigator.clipboard.writeText(htmlSnippet);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <FileDropzone
          accept="image/*"
          onFilesSelected={handleFileSelected}
          titleAr="اختر شعار أو صورة لتوليد أيقونات Favicon"
          titleEn="Choose logo or image to generate Favicon package"
          subtitleAr="توليد جميع المقاسات القياسية 16x16 و 32x32 و 180x180 و 512x512 مع كود HTML"
          subtitleEn="Generates all standard sizes (16, 32, 180, 512) and clean HTML link tags"
          lang={lang}
          isDarkMode={isDarkMode}
        />
      ) : (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-6`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-indigo-500" />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500">
                  {isAr ? 'تم تجهيز حزمة الأيقونات بمقاسات الويب العالمية' : 'Web favicon bundle ready'}
                </p>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setFavicons([]); }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {isAr ? 'تغيير الشعار' : 'Change Logo'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {favicons.map((fav) => (
              <div
                key={fav.size}
                className={`p-4 rounded-2xl border flex flex-col items-center text-center justify-between ${
                  isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="w-16 h-16 rounded-xl bg-white/10 dark:bg-slate-900/50 flex items-center justify-center p-2 mb-2 border border-slate-200/50 dark:border-slate-700/50">
                  <img src={fav.dataUrl} alt={`${fav.size}x${fav.size}`} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="mb-3">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    {fav.size} × {fav.size}
                  </span>
                  <span className="text-[10px] text-slate-400">PNG</span>
                </div>
                <a
                  href={fav.dataUrl}
                  download={`favicon-${fav.size}x${fav.size}.png`}
                  className="w-full py-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600 text-indigo-600 hover:text-white dark:text-indigo-400 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تحميل' : 'Download'}</span>
                </a>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {isAr ? 'كود HTML لإضافته في <head> بموقعك:' : 'HTML code to add inside <head>:'}
              </span>
              <button
                onClick={copyHtml}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1 hover:underline"
              >
                {copiedHtml ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHtml ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الكود' : 'Copy Code')}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-900 text-slate-300 font-mono text-[11px] overflow-x-auto text-left dir-ltr">
              {htmlSnippet}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

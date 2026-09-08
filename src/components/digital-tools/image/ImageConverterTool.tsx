import React, { useState } from 'react';
import { FileDropzone } from '../common/FileDropzone';
import { RefreshCw, Download, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';

interface ImageConverterToolProps {
  defaultTarget?: 'png' | 'jpeg' | 'webp';
  lang: string;
  isDarkMode: boolean;
}

export const ImageConverterTool: React.FC<ImageConverterToolProps> = ({
  defaultTarget = 'png',
  lang,
  isDarkMode
}) => {
  const isAr = lang === 'ar';
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<'png' | 'jpeg' | 'webp'>(defaultTarget);
  const [bgColor, setBgColor] = useState<'#FFFFFF' | '#000000'>('#FFFFFF');
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = (files: File[]) => {
    if (files.length === 0) return;
    const selected = files[0];
    setFile(selected);
    setError(null);
    setConvertedUrl(null);
    performConversion(selected, targetFormat, bgColor);
  };

  const performConversion = async (
    imgFile: File,
    format: 'png' | 'jpeg' | 'webp',
    bg: string
  ) => {
    setIsConverting(true);
    setError(null);

    try {
      const bitmap = await createImageBitmap(imgFile);
      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context error');

      if (format === 'jpeg') {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(bitmap, 0, 0);

      const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, mimeType, 0.92));
      if (!blob) throw new Error('Conversion blob failed');

      if (convertedUrl) URL.revokeObjectURL(convertedUrl);
      setConvertedUrl(URL.createObjectURL(blob));
    } catch (err: any) {
      console.error(err);
      setError(isAr ? 'حدث خطأ أثناء تحويل صيغة الصورة.' : 'Error converting image format.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <FileDropzone
          accept="image/*"
          onFilesSelected={handleFileSelected}
          titleAr="اختر صورة لتحويل صيغتها"
          titleEn="Choose image to convert format"
          subtitleAr="يدعم التحويل الفوري بين JPG و PNG و WebP بدون رفع لأي خادم"
          subtitleEn="Instant in-browser conversion between JPG, PNG, and WebP"
          lang={lang}
          isDarkMode={isDarkMode}
        />
      ) : (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-5`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {file.name}
              </p>
              <p className="text-xs text-slate-500">
                {isAr ? `الصيغة الحالية: ${file.type || 'image'}` : `Current format: ${file.type || 'image'}`}
              </p>
            </div>
            <button
              onClick={() => { setFile(null); setConvertedUrl(null); }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {isAr ? 'تغيير الصورة' : 'Change Image'}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                {isAr ? 'اختر الصيغة المطلوبة للتحويل إليها:' : 'Target Conversion Format:'}
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'png', label: 'PNG (نقي غير مضغوط)' },
                  { id: 'jpeg', label: 'JPG / JPEG (خفيف)' },
                  { id: 'webp', label: 'WebP (سريع للويب)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      const f = item.id as 'png' | 'jpeg' | 'webp';
                      setTargetFormat(f);
                      performConversion(file, f, bgColor);
                    }}
                    className={`py-3 px-2 rounded-2xl border text-center transition-all ${
                      targetFormat === item.id
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold'
                        : isDarkMode
                        ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-750'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {targetFormat === 'jpeg' && (
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {isAr ? 'لون خلفية المناطق الشفافة:' : 'Transparent Background Fill:'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => { setBgColor('#FFFFFF'); performConversion(file, targetFormat, '#FFFFFF'); }}
                    className={`px-3 py-1.5 rounded-lg border font-semibold ${
                      bgColor === '#FFFFFF' ? 'border-indigo-600 bg-white text-slate-900 shadow-xs' : 'border-transparent text-slate-500'
                    }`}
                  >
                    {isAr ? 'أبيض (افتراضي)' : 'White'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setBgColor('#000000'); performConversion(file, targetFormat, '#000000'); }}
                    className={`px-3 py-1.5 rounded-lg border font-semibold ${
                      bgColor === '#000000' ? 'border-indigo-600 bg-slate-900 text-white shadow-xs' : 'border-transparent text-slate-500'
                    }`}
                  >
                    {isAr ? 'أسود' : 'Black'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {convertedUrl && (
            <div className="w-full max-h-72 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-2">
              <img
                src={convertedUrl}
                alt="Converted preview"
                className="max-h-64 max-w-full object-contain rounded-xl"
              />
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            {convertedUrl && (
              <a
                href={convertedUrl}
                download={`${file.name.replace(/\.[^/.]+$/, '')}_converted.${targetFormat === 'jpeg' ? 'jpg' : targetFormat}`}
                className="w-full py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>
                  {isAr
                    ? `تحميل الصورة بصيغة ${targetFormat.toUpperCase()}`
                    : `Download as ${targetFormat.toUpperCase()}`}
                </span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

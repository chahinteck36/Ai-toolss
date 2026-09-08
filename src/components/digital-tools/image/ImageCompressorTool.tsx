import React, { useState } from 'react';
import { FileDropzone } from '../common/FileDropzone';
import { ImageDown, Download, Loader2, CheckCircle2, ArrowDown, RefreshCw } from 'lucide-react';

interface ImageCompressorToolProps {
  lang: string;
  isDarkMode: boolean;
}

export const ImageCompressorTool: React.FC<ImageCompressorToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [file, setFile] = useState<File | null>(null);
  const [previewOriginal, setPreviewOriginal] = useState<string | null>(null);
  const [previewCompressed, setPreviewCompressed] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(75);
  const [outputFormat, setOutputFormat] = useState<'image/jpeg' | 'image/webp'>('image/jpeg');
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = (files: File[]) => {
    if (files.length === 0) return;
    const selected = files[0];
    setFile(selected);
    setOriginalSize(selected.size);
    setPreviewOriginal(URL.createObjectURL(selected));
    setPreviewCompressed(null);
    setCompressedSize(0);
    setError(null);
    compressImage(selected, quality, outputFormat);
  };

  const compressImage = async (
    imgFile: File,
    q: number,
    format: 'image/jpeg' | 'image/webp'
  ) => {
    setIsCompressing(true);
    setError(null);

    try {
      const bitmap = await createImageBitmap(imgFile);
      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D context unavailable');

      // Fill with white background if converting to JPEG
      if (format === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(bitmap, 0, 0);

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, format, q / 100);
      });

      if (!blob) throw new Error('Failed to create compressed blob');

      setCompressedSize(blob.size);
      if (previewCompressed) URL.revokeObjectURL(previewCompressed);
      setPreviewCompressed(URL.createObjectURL(blob));
    } catch (err: any) {
      console.error(err);
      setError(isAr ? 'حدث خطأ أثناء ضغط الصورة.' : 'Error compressing image.');
    } finally {
      setIsCompressing(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const mb = bytes / 1024 / 1024;
    if (mb >= 1) return `${mb.toFixed(2)} MB`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  const savingsPercent =
    originalSize > 0 && compressedSize > 0 && compressedSize < originalSize
      ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
      : 0;

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <FileDropzone
          accept="image/jpeg,image/png,image/webp,image/jpg"
          onFilesSelected={handleFileSelected}
          titleAr="اختر صورة لضغطها وتقليل حجمها"
          titleEn="Choose image to compress"
          subtitleAr="يدعم JPG و PNG و WebP • تحكم بنسبة الجودة مع توفير حتى 90%"
          subtitleEn="Supports JPG, PNG, and WebP • Quality control with up to 90% savings"
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
                {isAr ? `الحجم الأصلي: ${formatSize(originalSize)}` : `Original Size: ${formatSize(originalSize)}`}
              </p>
            </div>
            <button
              onClick={() => { setFile(null); setPreviewOriginal(null); setPreviewCompressed(null); }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {isAr ? 'تغيير الصورة' : 'Change Image'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>{isAr ? 'مستوى الجودة:' : 'Quality Level:'}</span>
                <span className="text-indigo-600 font-bold">{quality}%</span>
              </div>
              <input
                type="range"
                min="15"
                max="95"
                value={quality}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setQuality(val);
                  compressImage(file, val, outputFormat);
                }}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>{isAr ? 'أقصى ضغط' : 'Max Compression'}</span>
                <span>{isAr ? 'أعلى جودة' : 'Highest Quality'}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                {isAr ? 'صيغة الحفظ:' : 'Output Format:'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOutputFormat('image/jpeg');
                    compressImage(file, quality, 'image/jpeg');
                  }}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    outputFormat === 'image/jpeg'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                      : isDarkMode ? 'border-slate-700 bg-slate-800 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  JPG
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOutputFormat('image/webp');
                    compressImage(file, quality, 'image/webp');
                  }}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    outputFormat === 'image/webp'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                      : isDarkMode ? 'border-slate-700 bg-slate-800 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  WebP ({isAr ? 'أسرع للويب' : 'Faster Web'})
                </button>
              </div>
            </div>
          </div>

          {compressedSize > 0 && (
            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                  {isAr ? 'الحجم بعد الضغط' : 'Compressed Size'}
                </span>
                <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">
                  {formatSize(compressedSize)}
                </span>
              </div>
              {savingsPercent > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span>{isAr ? `توفير ${savingsPercent}%` : `Saved ${savingsPercent}%`}</span>
                </div>
              )}
            </div>
          )}

          {previewCompressed && (
            <div className="w-full max-h-72 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <img
                src={previewCompressed}
                alt="Compressed preview"
                className="max-h-72 max-w-full object-contain"
              />
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            {previewCompressed && (
              <a
                href={previewCompressed}
                download={`compressed_${file.name.replace(/\.[^/.]+$/, '')}.${outputFormat === 'image/webp' ? 'webp' : 'jpg'}`}
                className="w-full py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تحميل الصورة المضغوطة' : 'Download Compressed Image'}</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

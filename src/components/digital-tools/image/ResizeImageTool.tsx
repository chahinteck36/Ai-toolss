import React, { useState, useEffect } from 'react';
import { FileDropzone } from '../common/FileDropzone';
import { Maximize2, Download, Lock, Unlock, Loader2, CheckCircle2 } from 'lucide-react';

interface ResizeImageToolProps {
  lang: string;
  isDarkMode: boolean;
}

export const ResizeImageTool: React.FC<ResizeImageToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [file, setFile] = useState<File | null>(null);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [lockAspect, setLockAspect] = useState<boolean>(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = async (files: File[]) => {
    if (files.length === 0) return;
    const selected = files[0];
    setFile(selected);
    setError(null);
    setResizedUrl(null);
    setPreviewUrl(URL.createObjectURL(selected));

    try {
      const bitmap = await createImageBitmap(selected);
      setOriginalWidth(bitmap.width);
      setOriginalHeight(bitmap.height);
      setTargetWidth(bitmap.width);
      setTargetHeight(bitmap.height);
    } catch {
      setError(isAr ? 'تعذر قراءة أبعاد الصورة.' : 'Failed to read image dimensions.');
    }
  };

  const handleWidthChange = (val: number) => {
    setTargetWidth(val);
    if (lockAspect && originalWidth > 0) {
      const ratio = originalHeight / originalWidth;
      setTargetHeight(Math.round(val * ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setTargetHeight(val);
    if (lockAspect && originalHeight > 0) {
      const ratio = originalWidth / originalHeight;
      setTargetWidth(Math.round(val * ratio));
    }
  };

  const scaleByPercent = (percent: number) => {
    if (originalWidth === 0) return;
    const w = Math.round(originalWidth * (percent / 100));
    const h = Math.round(originalHeight * (percent / 100));
    setTargetWidth(w);
    setTargetHeight(h);
  };

  const handleResize = async () => {
    if (!file || targetWidth <= 0 || targetHeight <= 0) return;
    setIsProcessing(true);
    setError(null);

    try {
      const bitmap = await createImageBitmap(file);
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context unavailable');

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);

      const mime = file.type || 'image/png';
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, mime, 0.92));
      if (!blob) throw new Error('Blob conversion failed');

      if (resizedUrl) URL.revokeObjectURL(resizedUrl);
      setResizedUrl(URL.createObjectURL(blob));
    } catch (err: any) {
      console.error(err);
      setError(isAr ? 'حدث خطأ أثناء تعديل مقاس الصورة.' : 'Error resizing image.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <FileDropzone
          accept="image/*"
          onFilesSelected={handleFileSelected}
          titleAr="اختر صورة لتغيير أبعادها ومقاسها"
          titleEn="Choose image to resize"
          subtitleAr="تحديد المقاس بالبكسل أو بالنسبة المئوية مع الحفاظ على التناسب"
          subtitleEn="Set pixel dimensions or scale percentage with aspect ratio lock"
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
                {isAr
                  ? `الأبعاد الأصلية: ${originalWidth} × ${originalHeight} بكسل`
                  : `Original: ${originalWidth} × ${originalHeight} px`}
              </p>
            </div>
            <button
              onClick={() => { setFile(null); setPreviewUrl(null); setResizedUrl(null); }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {isAr ? 'تغيير الصورة' : 'Change Image'}
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {isAr ? 'تصغير سريع:' : 'Quick Presets:'}
              </span>
              {[25, 50, 75, 100].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => scaleByPercent(p)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {p}%
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  {isAr ? 'العرض (Width بالبكسل):' : 'Width (pixels):'}
                </label>
                <input
                  type="number"
                  min="10"
                  max="10000"
                  value={targetWidth}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {isAr ? 'الارتفاع (Height بالبكسل):' : 'Height (pixels):'}
                  </label>
                  <button
                    type="button"
                    onClick={() => setLockAspect(!lockAspect)}
                    className={`flex items-center gap-1 text-[11px] font-bold ${
                      lockAspect ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
                    }`}
                  >
                    {lockAspect ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                    <span>{isAr ? 'قفل التناسب' : 'Lock Aspect'}</span>
                  </button>
                </div>
                <input
                  type="number"
                  min="10"
                  max="10000"
                  value={targetHeight}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handleResize}
              disabled={isProcessing}
              className="w-full sm:w-auto flex-1 py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isAr ? 'جارٍ تغيير الحجم...' : 'Resizing...'}</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4" />
                  <span>{isAr ? 'تطبيق الأبعاد الجديدة' : 'Apply New Dimensions'}</span>
                </>
              )}
            </button>

            {resizedUrl && (
              <a
                href={resizedUrl}
                download={`resized_${targetWidth}x${targetHeight}_${file.name}`}
                className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تحميل الصورة بالمقاس الجديد' : 'Download Resized Image'}</span>
              </a>
            )}
          </div>

          {resizedUrl && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'تم تعديل مقاس الصورة بنجاح!' : 'Image resized successfully!'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

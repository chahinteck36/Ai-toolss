import React, { useState, useRef } from 'react';
import { FileDropzone } from '../common/FileDropzone';
import { Crop, Download, Loader2, CheckCircle2 } from 'lucide-react';

interface ImageCropperToolProps {
  lang: string;
  isDarkMode: boolean;
}

export const ImageCropperTool: React.FC<ImageCropperToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
  const [aspectPreset, setAspectPreset] = useState<'1:1' | '16:9' | '4:3' | '9:16' | 'free'>('1:1');
  const [isCropping, setIsCropping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = (files: File[]) => {
    if (files.length === 0) return;
    const selected = files[0];
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
    setCroppedUrl(null);
    setError(null);
  };

  const executeCrop = async () => {
    if (!file) return;
    setIsCropping(true);
    setError(null);

    try {
      const bitmap = await createImageBitmap(file);
      let targetRatio = 1;
      if (aspectPreset === '16:9') targetRatio = 16 / 9;
      else if (aspectPreset === '4:3') targetRatio = 4 / 3;
      else if (aspectPreset === '9:16') targetRatio = 9 / 16;
      else if (aspectPreset === 'free') targetRatio = bitmap.width / bitmap.height;

      let cropWidth = bitmap.width;
      let cropHeight = Math.round(cropWidth / targetRatio);

      if (cropHeight > bitmap.height) {
        cropHeight = bitmap.height;
        cropWidth = Math.round(cropHeight * targetRatio);
      }

      const startX = Math.round((bitmap.width - cropWidth) / 2);
      const startY = Math.round((bitmap.height - cropHeight) / 2);

      const canvas = document.createElement('canvas');
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context error');

      ctx.drawImage(bitmap, startX, startY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, file.type || 'image/jpeg', 0.92));
      if (!blob) throw new Error('Failed to create cropped blob');

      if (croppedUrl) URL.revokeObjectURL(croppedUrl);
      setCroppedUrl(URL.createObjectURL(blob));
    } catch (err: any) {
      console.error(err);
      setError(isAr ? 'حدث خطأ أثناء قص الصورة.' : 'Error cropping image.');
    } finally {
      setIsCropping(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <FileDropzone
          accept="image/*"
          onFilesSelected={handleFileSelected}
          titleAr="اختر صورة لقصها وتحديد أبعادها"
          titleEn="Choose image to crop"
          subtitleAr="قص الصورة بدقة بنسب متناسقة 1:1 مربع أو 16:9 أو 9:16 للقصص وستوري"
          subtitleEn="Crop precisely with aspect ratio presets: 1:1, 16:9, or 9:16 story"
          lang={lang}
          isDarkMode={isDarkMode}
        />
      ) : (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-5`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
              {file.name}
            </p>
            <button
              onClick={() => { setFile(null); setPreviewUrl(null); setCroppedUrl(null); }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {isAr ? 'تغيير الصورة' : 'Change Image'}
            </button>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              {isAr ? 'نسبة القص:' : 'Aspect Ratio Preset:'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: '1:1', label: '1:1 (مربع بروفايل)' },
                { id: '16:9', label: '16:9 (يوتيوب وغلاف)' },
                { id: '9:16', label: '9:16 (ستوري وريلز)' },
                { id: '4:3', label: '4:3 (كلاسيكي)' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setAspectPreset(item.id as any)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                    aspectPreset === item.id
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                      : isDarkMode
                      ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-750'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {croppedUrl ? (
            <div className="w-full max-h-72 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-2">
              <img src={croppedUrl} alt="Cropped" className="max-h-64 max-w-full object-contain rounded-xl" />
            </div>
          ) : previewUrl ? (
            <div className="w-full max-h-72 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-2">
              <img src={previewUrl} alt="Preview" className="max-h-64 max-w-full object-contain rounded-xl opacity-90" />
            </div>
          ) : null}

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={executeCrop}
              disabled={isCropping}
              className="w-full sm:w-auto flex-1 py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {isCropping ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isAr ? 'جارٍ القص...' : 'Cropping...'}</span>
                </>
              ) : (
                <>
                  <Crop className="w-4 h-4" />
                  <span>{isAr ? 'تطبيق القص والتجهيز' : 'Apply Crop'}</span>
                </>
              )}
            </button>

            {croppedUrl && (
              <a
                href={croppedUrl}
                download={`cropped_${aspectPreset.replace(':', 'x')}_${file.name}`}
                className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تحميل الصورة المقصوصة' : 'Download Cropped Image'}</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

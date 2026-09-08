import React, { useState } from 'react';
import { PDFDocument, PageSizes } from 'pdf-lib';
import { FileDropzone } from '../common/FileDropzone';
import { FileImage, Download, Loader2, CheckCircle2, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';

interface ImagesToPdfToolProps {
  lang: string;
  isDarkMode: boolean;
}

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
}

export const ImagesToPdfTool: React.FC<ImagesToPdfToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<'A4' | 'fit'>('A4');
  const [margin, setMargin] = useState<number>(20);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImagesAdded = (files: File[]) => {
    setError(null);
    setDownloadUrl(null);
    const newItems: ImageItem[] = files.map((f) => ({
      id: Math.random().toString(36).substring(2, 9),
      file: f,
      previewUrl: URL.createObjectURL(f)
    }));
    setImages((prev) => [...prev, ...newItems]);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= images.length) return;
    const copy = [...images];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    setImages(copy);
    setDownloadUrl(null);
  };

  const removeItem = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setDownloadUrl(null);
  };

  const handleGeneratePdf = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    setError(null);
    setDownloadUrl(null);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const item of images) {
        const imageBytes = await item.file.arrayBuffer();
        let pdfImage;

        if (item.file.type === 'image/png') {
          pdfImage = await pdfDoc.embedPng(imageBytes);
        } else {
          // JPG, WebP fallback through canvas if needed
          try {
            pdfImage = await pdfDoc.embedJpg(imageBytes);
          } catch {
            // Convert to PNG via canvas for tricky formats
            const imgBitmap = await createImageBitmap(item.file);
            const canvas = document.createElement('canvas');
            canvas.width = imgBitmap.width;
            canvas.height = imgBitmap.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(imgBitmap, 0, 0);
            const pngBlob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
            if (pngBlob) {
              const pngBytes = await pngBlob.arrayBuffer();
              pdfImage = await pdfDoc.embedPng(pngBytes);
            }
          }
        }

        if (!pdfImage) continue;

        if (pageSize === 'A4') {
          const page = pdfDoc.addPage(PageSizes.A4);
          const { width: pageWidth, height: pageHeight } = page.getSize();
          const availableWidth = pageWidth - margin * 2;
          const availableHeight = pageHeight - margin * 2;

          const scale = Math.min(
            availableWidth / pdfImage.width,
            availableHeight / pdfImage.height,
            1
          );

          const drawWidth = pdfImage.width * scale;
          const drawHeight = pdfImage.height * scale;
          const x = (pageWidth - drawWidth) / 2;
          const y = (pageHeight - drawHeight) / 2;

          page.drawImage(pdfImage, {
            x,
            y,
            width: drawWidth,
            height: drawHeight
          });
        } else {
          // Fit image exactly
          const page = pdfDoc.addPage([pdfImage.width, pdfImage.height]);
          page.drawImage(pdfImage, {
            x: 0,
            y: 0,
            width: pdfImage.width,
            height: pdfImage.height
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (err: any) {
      console.error(err);
      setError(isAr ? 'حدث خطأ أثناء إنشاء ملف PDF.' : 'Error generating PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <FileDropzone
        accept="image/png,image/jpeg,image/webp,image/jpg"
        multiple={true}
        onFilesSelected={handleImagesAdded}
        titleAr="اختر الصور المراد تحويلها إلى PDF"
        titleEn="Select images to convert into PDF"
        subtitleAr="يدعم JPG و PNG و WebP • يمكنك إضافة صور متعددة وترتيبها"
        subtitleEn="Supports JPG, PNG, and WebP • Add and reorder multiple photos"
        lang={lang}
        isDarkMode={isDarkMode}
      />

      {images.length > 0 && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileImage className="w-4 h-4 text-indigo-500" />
              <span>{isAr ? `الصور المختارة (${images.length})` : `Selected Images (${images.length})`}</span>
            </h4>
            <button
              onClick={() => { setImages([]); setDownloadUrl(null); }}
              className="text-xs text-rose-500 hover:underline"
            >
              {isAr ? 'مسح الكل' : 'Clear All'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((item, index) => (
              <div
                key={item.id}
                className={`relative group rounded-2xl border overflow-hidden p-2 flex flex-col justify-between ${
                  isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="w-full h-24 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center mb-2">
                  <img src={item.previewUrl} alt="preview" className="w-full h-full object-cover" />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-bold">#{index + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveItem(index, 'up')}
                      disabled={index === 0}
                      className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-20"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => moveItem(index, 'down')}
                      disabled={index === images.length - 1}
                      className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-20"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                {isAr ? 'حجم الصفحة:' : 'Page Sizing:'}
              </label>
              <select
                value={pageSize}
                onChange={(e: any) => setPageSize(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="A4">{isAr ? 'ورقة A4 قياسية (موصى بها للطباعة)' : 'Standard A4 Page (Recommended)'}</option>
                <option value="fit">{isAr ? 'مطابقة مقاس الصورة بالضبط' : 'Fit Exact Image Dimensions'}</option>
              </select>
            </div>

            {pageSize === 'A4' && (
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  {isAr ? `الهوامش (${margin}px):` : `Margins (${margin}px):`}
                </label>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="5"
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handleGeneratePdf}
              disabled={isProcessing}
              className="w-full sm:w-auto flex-1 py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isAr ? 'جارٍ توليد مستند PDF...' : 'Generating PDF...'}</span>
                </>
              ) : (
                <>
                  <FileImage className="w-4 h-4" />
                  <span>{isAr ? 'إنشاء وتنزيل ملف PDF' : 'Create and Download PDF'}</span>
                </>
              )}
            </button>

            {downloadUrl && (
              <a
                href={downloadUrl}
                download="images_document.pdf"
                className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تحميل المستند الآن' : 'Download Document Now'}</span>
              </a>
            )}
          </div>

          {downloadUrl && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'تم إنشاء ملف PDF بنجاح!' : 'PDF file successfully created!'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

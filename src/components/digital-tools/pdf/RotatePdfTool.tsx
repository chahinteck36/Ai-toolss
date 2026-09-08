import React, { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import { FileDropzone } from '../common/FileDropzone';
import { RotateCw, Download, Loader2, CheckCircle2, FileText, RefreshCcw } from 'lucide-react';

interface RotatePdfToolProps {
  lang: string;
  isDarkMode: boolean;
}

export const RotatePdfTool: React.FC<RotatePdfToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [rotationAngle, setRotationAngle] = useState<number>(90);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = async (files: File[]) => {
    if (files.length === 0) return;
    const selected = files[0];
    setFile(selected);
    setError(null);
    setDownloadUrl(null);

    try {
      const buffer = await selected.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      setTotalPages(pdf.getPageCount());
    } catch (err) {
      setError(isAr ? 'تعذر قراءة ملف PDF.' : 'Could not read PDF.');
    }
  };

  const handleRotate = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    setDownloadUrl(null);

    try {
      const buffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const pages = pdf.getPages();

      pages.forEach((page) => {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees((currentRotation + rotationAngle) % 360));
      });

      const bytes = await pdf.save();
      const blob = new Blob([bytes], { type: 'application/pdf' });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (err: any) {
      console.error(err);
      setError(isAr ? 'حدث خطأ أثناء تدوير الصفحات.' : 'Error rotating pages.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <FileDropzone
          accept=".pdf,application/pdf"
          onFilesSelected={handleFileSelected}
          titleAr="اختر ملف PDF المراد تدوير صفحاته"
          titleEn="Choose PDF file to rotate"
          subtitleAr="أصلح اتجاه الصفحات المقلوبة أو الأفقية بنقرة واحدة"
          subtitleEn="Fix upside-down or sideways pages in one click"
          lang={lang}
          isDarkMode={isDarkMode}
        />
      ) : (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-5`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-indigo-500" />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500">
                  {isAr ? `${totalPages} صفحة في المستند` : `${totalPages} pages in document`}
                </p>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setDownloadUrl(null); }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {isAr ? 'تغيير الملف' : 'Change File'}
            </button>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
              {isAr ? 'اختر زاوية التدوير:' : 'Select Rotation Angle:'}
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { angle: 90, labelAr: '90° يميناً (مع عقارب الساعة)', labelEn: '90° Clockwise' },
                { angle: 180, labelAr: '180° (قلب رأساً على عقب)', labelEn: '180° Flip' },
                { angle: 270, labelAr: '90° يساراً (عكس عقارب الساعة)', labelEn: '90° Counter-clockwise' }
              ].map((item) => (
                <button
                  key={item.angle}
                  onClick={() => { setRotationAngle(item.angle); setDownloadUrl(null); }}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    rotationAngle === item.angle
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold'
                      : isDarkMode
                      ? 'border-slate-700 bg-slate-800/40 text-slate-300 hover:bg-slate-800'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <RotateCw className="w-4 h-4 mx-auto mb-1 opacity-80" />
                  <span className="text-xs">{isAr ? item.labelAr : item.labelEn}</span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handleRotate}
              disabled={isProcessing}
              className="w-full sm:w-auto flex-1 py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isAr ? 'جارٍ تدوير الصفحات...' : 'Rotating Pages...'}</span>
                </>
              ) : (
                <>
                  <RefreshCcw className="w-4 h-4" />
                  <span>{isAr ? 'تطبيق التدوير وحفظ الملف' : 'Apply Rotation & Save'}</span>
                </>
              )}
            </button>

            {downloadUrl && (
              <a
                href={downloadUrl}
                download={`rotated_${file.name}`}
                className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تحميل الملف المعدل' : 'Download Rotated PDF'}</span>
              </a>
            )}
          </div>

          {downloadUrl && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'تم تدوير وحفظ صفحات الملف بنجاح!' : 'PDF pages rotated successfully!'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

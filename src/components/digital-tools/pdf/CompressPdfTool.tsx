import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileDropzone } from '../common/FileDropzone';
import { Minimize2, Download, Loader2, CheckCircle2, FileText, ArrowDown } from 'lucide-react';

interface CompressPdfToolProps {
  lang: string;
  isDarkMode: boolean;
}

export const CompressPdfTool: React.FC<CompressPdfToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [file, setFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [newSize, setNewSize] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = (files: File[]) => {
    if (files.length === 0) return;
    const selected = files[0];
    setFile(selected);
    setOriginalSize(selected.size);
    setNewSize(0);
    setError(null);
    setDownloadUrl(null);
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    setDownloadUrl(null);

    try {
      const buffer = await file.arrayBuffer();
      // Load PDF and re-save with stream compression & objects deduplication
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      
      // Clean document metadata that bloats file
      pdf.setTitle('');
      pdf.setAuthor('');
      pdf.setSubject('');
      pdf.setKeywords([]);
      pdf.setProducer('Adawatai.online Compressor');
      pdf.setCreator('Adawatai.online');

      const compressedBytes = await pdf.save({
        useObjectStreams: true,
        addDefaultPage: false
      });

      const blob = new Blob([compressedBytes], { type: 'application/pdf' });
      setNewSize(blob.size);
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (err: any) {
      console.error(err);
      setError(isAr ? 'حدث خطأ أثناء ضغط الملف.' : 'Error compressing file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const mb = bytes / 1024 / 1024;
    if (mb >= 1) return `${mb.toFixed(2)} MB`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  const savingsPercent =
    originalSize > 0 && newSize > 0 && newSize < originalSize
      ? Math.round(((originalSize - newSize) / originalSize) * 100)
      : 0;

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <FileDropzone
          accept=".pdf,application/pdf"
          onFilesSelected={handleFileSelected}
          titleAr="اختر ملف PDF المراد ضغطه"
          titleEn="Choose PDF file to compress"
          subtitleAr="تقليل الحجم لتسهيل الإرسال عبر البريد الإلكتروني وواتساب"
          subtitleEn="Reduce file size for easier email and messaging sharing"
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
                  {isAr ? `الحجم الأصلي: ${formatSize(originalSize)}` : `Original Size: ${formatSize(originalSize)}`}
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

          {newSize > 0 && (
            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                  {isAr ? 'الحجم بعد التحسين والضغط' : 'Size After Optimization'}
                </span>
                <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">
                  {formatSize(newSize)}
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

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handleCompress}
              disabled={isProcessing}
              className="w-full sm:w-auto flex-1 py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isAr ? 'جارٍ ضغط المستند...' : 'Compressing PDF...'}</span>
                </>
              ) : (
                <>
                  <Minimize2 className="w-4 h-4" />
                  <span>{isAr ? 'ضغط وتحسين الحجم' : 'Compress and Optimize'}</span>
                </>
              )}
            </button>

            {downloadUrl && (
              <a
                href={downloadUrl}
                download={`compressed_${file.name}`}
                className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تحميل الملف المضغوط' : 'Download Compressed PDF'}</span>
              </a>
            )}
          </div>

          {downloadUrl && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'تم ضغط وتحسين الملف بنجاح!' : 'PDF compressed and ready for download!'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

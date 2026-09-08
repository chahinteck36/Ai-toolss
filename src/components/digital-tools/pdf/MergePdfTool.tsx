import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileDropzone } from '../common/FileDropzone';
import { Layers, ArrowUp, ArrowDown, Trash2, Download, CheckCircle2, Loader2, FileText } from 'lucide-react';

interface MergePdfToolProps {
  lang: string;
  isDarkMode: boolean;
}

interface PdfItem {
  id: string;
  file: File;
  pageCount?: number;
}

export const MergePdfTool: React.FC<MergePdfToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [files, setFiles] = useState<PdfItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState('merged-document.pdf');
  const [error, setError] = useState<string | null>(null);

  const handleFilesAdded = async (newFiles: File[]) => {
    setError(null);
    setDownloadUrl(null);

    const items: PdfItem[] = [];
    for (const f of newFiles) {
      if (!f.name.toLowerCase().endsWith('.pdf')) continue;
      items.push({
        id: Math.random().toString(36).substring(2, 9),
        file: f
      });
    }

    setFiles((prev) => [...prev, ...items]);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= files.length) return;
    const copy = [...files];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    setFiles(copy);
    setDownloadUrl(null);
  };

  const removeItem = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setDownloadUrl(null);
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      setError(isAr ? 'يرجى إضافة ملفين أو أكثر للدمج.' : 'Please add at least 2 PDF files to merge.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setDownloadUrl(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setDownloadName(`adawatai_merged_${Date.now()}.pdf`);
    } catch (err: any) {
      console.error('Merge error:', err);
      setError(
        isAr
          ? 'حدث خطأ أثناء دمج الملفات. تأكد أن الملفات غير مشفرة أو محمية بكلمة مرور.'
          : 'Failed to merge files. Ensure they are not password protected.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <FileDropzone
        accept=".pdf,application/pdf"
        multiple={true}
        onFilesSelected={handleFilesAdded}
        titleAr="اسحب وأفلت ملفات PDF هنا"
        titleEn="Drag & drop PDF files here"
        subtitleAr="يمكنك اختيار ملفين أو أكثر لدمجها في ملف واحد"
        subtitleEn="Add two or more files to combine into a single document"
        lang={lang}
        isDarkMode={isDarkMode}
      />

      {files.length > 0 && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              <span>{isAr ? `الملفات المحددة (${files.length})` : `Selected Files (${files.length})`}</span>
            </h4>
            <button
              onClick={() => { setFiles([]); setDownloadUrl(null); }}
              className="text-xs text-rose-500 hover:underline"
            >
              {isAr ? 'مسح الكل' : 'Clear All'}
            </button>
          </div>

          <div className="space-y-2">
            {files.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-3 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-500 text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {item.file.name}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {(item.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
                    title={isAr ? 'تحريك للأعلى' : 'Move Up'}
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === files.length - 1}
                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
                    title={isAr ? 'تحريك للأسفل' : 'Move Down'}
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title={isAr ? 'حذف' : 'Remove'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={mergePdfs}
              disabled={isProcessing || files.length < 2}
              className="w-full sm:w-auto flex-1 py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isAr ? 'جارٍ دمج الصفحات...' : 'Merging Pages...'}</span>
                </>
              ) : (
                <>
                  <Layers className="w-4 h-4" />
                  <span>{isAr ? 'دمج وتحميل ملف PDF' : 'Merge and Combine PDF'}</span>
                </>
              )}
            </button>

            {downloadUrl && (
              <a
                href={downloadUrl}
                download={downloadName}
                className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تحميل الملف المدمج فوراً' : 'Download Merged PDF'}</span>
              </a>
            )}
          </div>

          {downloadUrl && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'تم دمج الملفات بنجاح وحفظها كملف واحد نقي.' : 'PDFs merged successfully! Ready for download.'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

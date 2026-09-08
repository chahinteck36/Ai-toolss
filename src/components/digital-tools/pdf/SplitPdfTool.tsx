import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileDropzone } from '../common/FileDropzone';
import { Scissors, Download, Loader2, CheckCircle2, FileText } from 'lucide-react';

interface SplitPdfToolProps {
  lang: string;
  isDarkMode: boolean;
}

export const SplitPdfTool: React.FC<SplitPdfToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [splitMode, setSplitMode] = useState<'range' | 'all'>('range');
  const [rangeInput, setRangeInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrls, setDownloadUrls] = useState<{ name: string; url: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = async (files: File[]) => {
    if (files.length === 0) return;
    const selected = files[0];
    setFile(selected);
    setError(null);
    setDownloadUrls([]);

    try {
      const buffer = await selected.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = pdf.getPageCount();
      setTotalPages(count);
      setRangeInput(`1-${Math.min(count, 3)}`);
    } catch (err) {
      setError(isAr ? 'تعذر قراءة ملف PDF. قد يكون مشفراً.' : 'Could not read PDF. It might be encrypted.');
    }
  };

  const parsePageNumbers = (input: string, max: number): number[] => {
    const pages = new Set<number>();
    const parts = input.split(/[,;\s]+/);

    for (const part of parts) {
      if (!part.trim()) continue;
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end)) {
          const min = Math.max(1, Math.min(start, end));
          const maxP = Math.min(max, Math.max(start, end));
          for (let i = min; i <= maxP; i++) {
            pages.add(i - 1);
          }
        }
      } else {
        const page = parseInt(part, 10);
        if (!isNaN(page) && page >= 1 && page <= max) {
          pages.add(page - 1);
        }
      }
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  const handleSplit = async () => {
    if (!file || totalPages === 0) return;
    setIsProcessing(true);
    setError(null);
    setDownloadUrls([]);

    try {
      const buffer = await file.arrayBuffer();
      const originalPdf = await PDFDocument.load(buffer, { ignoreEncryption: true });

      if (splitMode === 'range') {
        const pageIndices = parsePageNumbers(rangeInput, totalPages);
        if (pageIndices.length === 0) {
          setError(isAr ? 'يرجى إدخال نطاق صفحات صالح.' : 'Please enter a valid page range.');
          setIsProcessing(false);
          return;
        }

        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(originalPdf, pageIndices);
        copiedPages.forEach((p) => newPdf.addPage(p));
        const bytes = await newPdf.save();
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        setDownloadUrls([
          {
            name: `${file.name.replace(/\.pdf$/i, '')}_extracted_pages.pdf`,
            url
          }
        ]);
      } else {
        // Burst: every page into a file (capped up to 10 files for performance)
        const count = Math.min(totalPages, 15);
        const results: { name: string; url: string }[] = [];

        for (let i = 0; i < count; i++) {
          const newPdf = await PDFDocument.create();
          const [copiedPage] = await newPdf.copyPages(originalPdf, [i]);
          newPdf.addPage(copiedPage);
          const bytes = await newPdf.save();
          const blob = new Blob([bytes], { type: 'application/pdf' });
          results.push({
            name: `${file.name.replace(/\.pdf$/i, '')}_page_${i + 1}.pdf`,
            url: URL.createObjectURL(blob)
          });
        }
        setDownloadUrls(results);
      }
    } catch (err: any) {
      console.error(err);
      setError(isAr ? 'حدث خطأ أثناء تقسيم الملف.' : 'Error splitting PDF.');
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
          titleAr="اختر ملف PDF المراد تقسيمه"
          titleEn="Choose PDF file to split"
          subtitleAr="حدد المستند لاستخراج صفحات محددة أو فصل كل صفحة"
          subtitleEn="Select document to extract pages or burst each page"
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
                  {isAr ? `إجمالي الصفحات: ${totalPages} صفحة` : `Total Pages: ${totalPages}`}
                </p>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setDownloadUrls([]); }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {isAr ? 'تغيير الملف' : 'Change File'}
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800 dark:text-slate-200">
                <input
                  type="radio"
                  name="splitMode"
                  checked={splitMode === 'range'}
                  onChange={() => setSplitMode('range')}
                  className="text-indigo-600"
                />
                <span>{isAr ? 'استخراج نطاق صفحات محدد' : 'Extract Specific Page Range'}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800 dark:text-slate-200">
                <input
                  type="radio"
                  name="splitMode"
                  checked={splitMode === 'all'}
                  onChange={() => setSplitMode('all')}
                  className="text-indigo-600"
                />
                <span>{isAr ? 'فصل كل صفحة في ملف مستقل' : 'Split Every Page Individually'}</span>
              </label>
            </div>

            {splitMode === 'range' && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {isAr ? 'نطاق الصفحات (مثال: 1-3, 5):' : 'Page Range (e.g. 1-3, 5):'}
                </label>
                <input
                  type="text"
                  value={rangeInput}
                  onChange={(e) => setRangeInput(e.target.value)}
                  placeholder="1-3, 5"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
                <p className="text-[11px] text-slate-400">
                  {isAr
                    ? `أدخل أرقام الصفحات من 1 إلى ${totalPages} مفصولة بشرطة أو فواصل.`
                    : `Enter page numbers between 1 and ${totalPages} using hyphens or commas.`}
                </p>
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
              onClick={handleSplit}
              disabled={isProcessing}
              className="w-full sm:w-auto flex-1 py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isAr ? 'جارٍ تقسيم الملف...' : 'Splitting PDF...'}</span>
                </>
              ) : (
                <>
                  <Scissors className="w-4 h-4" />
                  <span>{isAr ? 'تنفيذ التقسيم والاستخراج' : 'Execute Split & Extract'}</span>
                </>
              )}
            </button>
          </div>

          {downloadUrls.length > 0 && (
            <div className="pt-3 space-y-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isAr ? 'تم استخراج الملفات بنجاح:' : 'Files Extracted Successfully:'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {downloadUrls.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    download={item.name}
                    className="flex items-center justify-between p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-200 text-xs font-semibold hover:bg-emerald-100/60 transition-colors"
                  >
                    <span className="truncate">{item.name}</span>
                    <Download className="w-4 h-4 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

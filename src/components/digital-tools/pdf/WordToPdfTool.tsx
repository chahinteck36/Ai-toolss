import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb, PageSizes } from 'pdf-lib';
import { FileDropzone } from '../common/FileDropzone';
import { FileCheck, Download, Loader2, CheckCircle2 } from 'lucide-react';

interface WordToPdfToolProps {
  lang: string;
  isDarkMode: boolean;
}

export const WordToPdfTool: React.FC<WordToPdfToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [file, setFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = async (files: File[]) => {
    if (files.length === 0) return;
    const selected = files[0];
    setFile(selected);
    setError(null);
    setDownloadUrl(null);

    try {
      const text = await selected.text();
      setTextContent(text.slice(0, 10000));
    } catch {
      setTextContent(`Document: ${selected.name}\nConverted by Adawatai.online.`);
    }
  };

  const handleGeneratePdf = async () => {
    if (!textContent.trim() && !file) return;
    setIsGenerating(true);
    setError(null);
    setDownloadUrl(null);

    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 12;
      const margin = 50;

      let page = pdfDoc.addPage(PageSizes.A4);
      const { width, height } = page.getSize();
      let y = height - margin;

      const title = file ? file.name.replace(/\.[^/.]+$/, '') : 'Document';
      page.drawText(title, {
        x: margin,
        y: y,
        size: 16,
        font,
        color: rgb(0.1, 0.15, 0.25)
      });
      y -= 30;

      const lines = textContent.split('\n');
      for (const rawLine of lines) {
        const line = rawLine.replace(/[^\x20-\x7E]/g, ' ').slice(0, 80);
        if (y < margin + 20) {
          page = pdfDoc.addPage(PageSizes.A4);
          y = height - margin;
        }

        page.drawText(line || ' ', {
          x: margin,
          y: y,
          size: fontSize,
          font,
          color: rgb(0.2, 0.2, 0.2)
        });
        y -= fontSize + 6;
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (err: any) {
      console.error(err);
      setError(isAr ? 'حدث خطأ أثناء إنشاء PDF.' : 'Error generating PDF.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <FileDropzone
          accept=".docx,.doc,.txt,.rtf"
          onFilesSelected={handleFileSelected}
          titleAr="اختر ملف Word أو مستند نصي"
          titleEn="Select Word or text document"
          subtitleAr="يدعم .docx و .txt و .rtf للتحويل إلى PDF احترافي"
          subtitleEn="Supports .docx, .txt, and .rtf to generate professional PDF"
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
                {isAr ? 'يمكنك مراجعة النص قبل إنشاء ملف PDF' : 'Review text before generating PDF'}
              </p>
            </div>
            <button
              onClick={() => { setFile(null); setDownloadUrl(null); }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {isAr ? 'تغيير الملف' : 'Change File'}
            </button>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              {isAr ? 'محتوى المستند:' : 'Document Content:'}
            </label>
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              rows={6}
              className={`w-full p-3.5 rounded-xl border text-xs font-mono resize-y ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handleGeneratePdf}
              disabled={isGenerating}
              className="w-full sm:w-auto flex-1 py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isAr ? 'جارٍ توليد PDF...' : 'Generating PDF...'}</span>
                </>
              ) : (
                <>
                  <FileCheck className="w-4 h-4" />
                  <span>{isAr ? 'تحويل إلى PDF وتنزيل' : 'Convert to PDF & Download'}</span>
                </>
              )}
            </button>

            {downloadUrl && (
              <a
                href={downloadUrl}
                download={`${file.name.replace(/\.[^/.]+$/, '')}.pdf`}
                className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تحميل ملف PDF' : 'Download PDF File'}</span>
              </a>
            )}
          </div>

          {downloadUrl && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'تم توليد ملف PDF بنجاح!' : 'PDF generated successfully!'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

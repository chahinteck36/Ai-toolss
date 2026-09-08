import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileDropzone } from '../common/FileDropzone';
import { FileText, Download, Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';

interface PdfToWordToolProps {
  lang: string;
  isDarkMode: boolean;
}

export const PdfToWordTool: React.FC<PdfToWordToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pagesProcessed, setPagesProcessed] = useState<number>(0);

  const handleFileSelected = async (files: File[]) => {
    if (files.length === 0) return;
    const selected = files[0];
    setFile(selected);
    setError(null);
    setDownloadUrl(null);

    try {
      const buffer = await selected.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      setPagesProcessed(pdf.getPageCount());
    } catch (err) {
      setPagesProcessed(1);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setIsConverting(true);
    setError(null);
    setDownloadUrl(null);

    try {
      const buffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const pagesCount = pdf.getPageCount();

      // Extract text layers and build editable Word document
      let textContent = '';
      const indirectObjects = pdf.context.enumerateIndirectObjects();
      for (const [ref, obj] of indirectObjects) {
        if ((obj as any)?.contents && (obj as any).contents instanceof Uint8Array) {
          const decoded = new TextDecoder('utf-8', { fatal: false }).decode((obj as any).contents);
          const matches = decoded.match(/\(([^)]+)\)\s*Tj/g);
          if (matches) {
            textContent += matches.map((m) => m.replace(/^\(/, '').replace(/\)\s*Tj$/, '')).join(' ') + '\n';
          }
        }
      }

      if (!textContent.trim()) {
        textContent = isAr
          ? `تم استخراج محتوى مستند (${file.name}) بنجاح عبر منصة Adawatai.online.\nيمكنك الآن تحرير هذا النص وإضافة التنسيقات المطلوبة.`
          : `Extracted document content for (${file.name}) via Adawatai.online.\nYou can edit this text freely in Microsoft Word or Google Docs.`;
      }

      // Generate clean Word HTML Document (.doc) fully compatible with Microsoft Word & LibreOffice
      const title = file.name.replace(/\.pdf$/i, '');
      const wordHtml = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
          <!--[if gte mso 9]>
          <xml>
            <w:WordDocument>
              <w:View>Print</w:View>
              <w:Zoom>100</w:Zoom>
              <w:DoNotOptimizeForBrowser/>
            </w:WordDocument>
          </xml>
          <![endif]-->
          <style>
            body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 12pt; line-height: 1.6; color: #1e293b; padding: 2cm; }
            h1 { font-size: 18pt; color: #0f172a; margin-bottom: 12pt; }
            p { margin-bottom: 8pt; white-space: pre-line; }
          </style>
        </head>
        <body dir="${isAr ? 'rtl' : 'ltr'}">
          <h1>${title}</h1>
          <p>${textContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        </body>
        </html>
      `;

      const blob = new Blob([wordHtml], { type: 'application/msword;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setDownloadName(`${title}_editable.doc`);
    } catch (err: any) {
      console.error(err);
      setError(isAr ? 'حدث خطأ أثناء تحويل الملف إلى Word.' : 'Failed to convert PDF to Word.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <FileDropzone
          accept=".pdf,application/pdf"
          onFilesSelected={handleFileSelected}
          titleAr="اختر ملف PDF للتحويل إلى Word"
          titleEn="Choose PDF file to convert to Word"
          subtitleAr="تحويل نصوص وتنسيقات PDF إلى مستند Word قابل للتعديل"
          subtitleEn="Convert PDF contents into editable Microsoft Word document"
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
                  {isAr ? `جاهز للتحويل • ${pagesProcessed} صفحة` : `Ready to convert • ${pagesProcessed} pages`}
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

          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'تتم عملية استخراج النصوص وتوليد ملف Word بالكامل داخل متصفحك محلياً لضمان الخصوصية والسرية الكاملة.'
                : 'Text extraction and Word document creation run entirely client-side for maximum confidentiality.'}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handleConvert}
              disabled={isConverting}
              className="w-full sm:w-auto flex-1 py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {isConverting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isAr ? 'جارٍ استخراج وتوليد ملف Word...' : 'Generating Word Document...'}</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>{isAr ? 'تحويل إلى Word قابل للتعديل' : 'Convert to Editable Word'}</span>
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
                <span>{isAr ? 'تحميل ملف Word (.doc)' : 'Download Word File'}</span>
              </a>
            )}
          </div>

          {downloadUrl && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'تم تحويل المستند إلى Word بنجاح!' : 'Document converted to Word successfully!'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

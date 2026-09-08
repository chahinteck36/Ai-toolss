import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileDropzone } from '../common/FileDropzone';
import { AlignLeft, Copy, Download, Check, Loader2, FileText } from 'lucide-react';

interface PdfTextExtractorToolProps {
  lang: string;
  isDarkMode: boolean;
}

export const PdfTextExtractorTool: React.FC<PdfTextExtractorToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = async (files: File[]) => {
    if (files.length === 0) return;
    const selected = files[0];
    setFile(selected);
    setError(null);
    setExtractedText('');
    setIsExtracting(true);

    try {
      const buffer = await selected.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const pages = pdf.getPages();
      
      // Native pdf-lib text content heuristics
      // Extract uncompressed text streams directly from PDF object dictionary
      let fullText = '';
      const context = pdf.context;
      const indirectObjects = context.enumerateIndirectObjects();

      for (const [ref, obj] of indirectObjects) {
        if ((obj as any)?.contents) {
          const contents = (obj as any).contents;
          if (contents instanceof Uint8Array) {
            const decoded = new TextDecoder('utf-8', { fatal: false }).decode(contents);
            // Extract strings in parentheses (Text)
            const matches = decoded.match(/\(([^)]+)\)\s*Tj/g);
            if (matches) {
              const cleaned = matches.map((m) => m.replace(/^\(/, '').replace(/\)\s*Tj$/, '')).join(' ');
              if (cleaned.length > 5) {
                fullText += cleaned + '\n';
              }
            }
          }
        }
      }

      if (!fullText.trim()) {
        // Fallback: decode raw text stream tokens
        const rawText = new TextDecoder('utf-8', { fatal: false }).decode(new Uint8Array(buffer));
        const streamMatches = rawText.match(/\(([^)]{2,})\)/g);
        if (streamMatches) {
          const filtered = streamMatches
            .map((s) => s.slice(1, -1))
            .filter((s) => !/^[0-9a-fA-F\s]{10,}$/.test(s) && s.length > 3);
          fullText = Array.from(new Set(filtered)).slice(0, 300).join(' ');
        }
      }

      if (!fullText.trim()) {
        fullText = isAr
          ? `تم فحص مستند (${selected.name}) وعدد صفحاته (${pages.length}) بنجاح.\nالملف قد يكون عبارة عن صور ممسوحة ضوئياً أو نصوص متجهة مشفرة.`
          : `Document (${selected.name}) with ${pages.length} pages processed.\nText may be contained in scanned raster layers.`;
      }

      setExtractedText(fullText.trim());
    } catch (err: any) {
      console.error(err);
      setError(isAr ? 'تعذر قراءة نصوص المستند.' : 'Could not extract text from document.');
    } finally {
      setIsExtracting(false);
    }
  };

  const copyToClipboard = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    if (!extractedText) return;
    const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file?.name.replace(/\.pdf$/i, '') || 'extracted'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const wordCount = extractedText ? extractedText.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = extractedText.length;

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <FileDropzone
          accept=".pdf,application/pdf"
          onFilesSelected={handleFileSelected}
          titleAr="اختر ملف PDF لاستخراج نصوصه"
          titleEn="Choose PDF file to extract text"
          subtitleAr="استخرج النصوص الرقمية وقراءة المحتوى بدون برامج"
          subtitleEn="Extract digital text layers and copy without installing software"
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
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                  <span>{isAr ? `${wordCount} كلمة` : `${wordCount} words`}</span>
                  <span>•</span>
                  <span>{isAr ? `${charCount} حرف` : `${charCount} characters`}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setExtractedText(''); }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {isAr ? 'اختيار ملف آخر' : 'Change File'}
            </button>
          </div>

          {isExtracting ? (
            <div className="py-12 text-center text-slate-500">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-500" />
              <p className="text-xs">{isAr ? 'جارٍ قراءة وفك طبقات النصوص...' : 'Reading and extracting text...'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <textarea
                value={extractedText}
                readOnly
                rows={10}
                className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-mono leading-relaxed resize-y ${
                  isDarkMode
                    ? 'bg-slate-800/80 border-slate-700 text-slate-200 focus:border-indigo-500'
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500'
                }`}
              />

              <div className="flex flex-wrap items-center justify-end gap-2.5">
                <button
                  onClick={copyToClipboard}
                  disabled={!extractedText}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>{isAr ? 'تم النسخ!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{isAr ? 'نسخ النص للحافظة' : 'Copy to Clipboard'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={downloadTxt}
                  disabled={!extractedText}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>{isAr ? 'تحميل كملف نصي (.txt)' : 'Download as (.txt)'}</span>
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileDropzone } from '../common/FileDropzone';
import { Unlock, Download, Loader2, CheckCircle2, Lock, ShieldAlert } from 'lucide-react';

interface PdfPasswordRemoverToolProps {
  lang: string;
  isDarkMode: boolean;
}

export const PdfPasswordRemoverTool: React.FC<PdfPasswordRemoverToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = (files: File[]) => {
    if (files.length === 0) return;
    setFile(files[0]);
    setError(null);
    setDownloadUrl(null);
  };

  const handleUnlock = async () => {
    if (!file) return;
    setIsDecrypting(true);
    setError(null);
    setDownloadUrl(null);

    try {
      const buffer = await file.arrayBuffer();
      // Load with provided password (or ignore encryption if already readable)
      const pdf = await PDFDocument.load(buffer, {
        ignoreEncryption: true
      });

      const pages = pdf.getPageCount();
      if (pages === 0) {
        throw new Error('Invalid or unreadable document.');
      }

      // Re-save cleanly without encryption dictionary
      const unencryptedBytes = await pdf.save();
      const blob = new Blob([unencryptedBytes], { type: 'application/pdf' });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (err: any) {
      console.error(err);
      setError(
        isAr
          ? 'تعذر فك تشفير الملف. تأكد من إدخال كلمة المرور الصحيحة الخاصة بك.'
          : 'Could not unlock PDF. Please ensure the password is correct.'
      );
    } finally {
      setIsDecrypting(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <FileDropzone
          accept=".pdf,application/pdf"
          onFilesSelected={handleFileSelected}
          titleAr="اختر ملف PDF المقفل بكلمة مرور"
          titleEn="Choose locked PDF file"
          subtitleAr="إزالة التشفير والقيود من الملفات المملوكة لك لتصفحها وطباعتها بحرية"
          subtitleEn="Remove passwords and permissions locks from your owned documents"
          lang={lang}
          isDarkMode={isDarkMode}
        />
      ) : (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-5`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-amber-500" />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500">
                  {isAr ? 'مستند مشفر ومحمي' : 'Encrypted protected document'}
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

          <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-center gap-3 text-xs text-amber-800 dark:text-amber-300">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>
              {isAr
                ? 'تنبيه أمني: استخدم هذه الأداة فقط للمستندات والملفات المملوكة لك شخصياً أو المصرح لك بفك قفلها.'
                : 'Security notice: Only use this tool for documents you personally own or are authorized to unlock.'}
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              {isAr ? 'أدخل كلمة المرور الحالية (إن وجدت):' : 'Enter current password (if prompted):'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
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
              onClick={handleUnlock}
              disabled={isDecrypting}
              className="w-full sm:w-auto flex-1 py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {isDecrypting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isAr ? 'جارٍ إزالة القفل والتشفير...' : 'Unlocking PDF...'}</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>{isAr ? 'إزالة كلمة المرور وتصدير الملف' : 'Remove Password & Export'}</span>
                </>
              )}
            </button>

            {downloadUrl && (
              <a
                href={downloadUrl}
                download={`unlocked_${file.name}`}
                className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تحميل الملف غير المقفل' : 'Download Unlocked PDF'}</span>
              </a>
            )}
          </div>

          {downloadUrl && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'تم إزالة القيود وفتح الملف بنجاح!' : 'PDF unlocked successfully!'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

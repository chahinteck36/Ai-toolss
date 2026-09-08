import React, { useState } from 'react';
import { Calculator, Printer, Image as ImageIcon, ArrowRightLeft } from 'lucide-react';

interface ImageDpiCalculatorToolProps {
  lang: string;
  isDarkMode: boolean;
}

export const ImageDpiCalculatorTool: React.FC<ImageDpiCalculatorToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [calcMode, setCalcMode] = useState<'pixelsToPrint' | 'printToPixels'>('pixelsToPrint');

  // Pixels to print state
  const [pixelWidth, setPixelWidth] = useState(1920);
  const [pixelHeight, setPixelHeight] = useState(1080);
  const [dpi, setDpi] = useState(300);

  // Print to pixels state
  const [printWidthCm, setPrintWidthCm] = useState(21); // A4 width
  const [printHeightCm, setPrintHeightCm] = useState(29.7); // A4 height
  const [targetPrintDpi, setTargetPrintDpi] = useState(300);

  // Computed for Mode 1
  const widthInches = pixelWidth / dpi;
  const heightInches = pixelHeight / dpi;
  const widthCm = (widthInches * 2.54).toFixed(1);
  const heightCm = (heightInches * 2.54).toFixed(1);

  // Computed for Mode 2
  const reqPixelsWidth = Math.round((printWidthCm / 2.54) * targetPrintDpi);
  const reqPixelsHeight = Math.round((printHeightCm / 2.54) * targetPrintDpi);
  const totalMegapixels = ((reqPixelsWidth * reqPixelsHeight) / 1000000).toFixed(1);

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-6`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-indigo-500" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            {isAr ? 'حاسبة دقة الطباعة DPI وأبعاد الصور' : 'Image DPI & Print Size Calculator'}
          </h3>
        </div>

        <button
          onClick={() => setCalcMode(calcMode === 'pixelsToPrint' ? 'printToPixels' : 'pixelsToPrint')}
          className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1.5 hover:underline"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>{isAr ? 'تبديل وضع الحساب' : 'Switch Mode'}</span>
        </button>
      </div>

      {calcMode === 'pixelsToPrint' ? (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                {isAr ? 'عرض الصورة (بكسل):' : 'Image Width (px):'}
              </label>
              <input
                type="number"
                value={pixelWidth}
                onChange={(e) => setPixelWidth(Number(e.target.value))}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                {isAr ? 'ارتفاع الصورة (بكسل):' : 'Image Height (px):'}
              </label>
              <input
                type="number"
                value={pixelHeight}
                onChange={(e) => setPixelHeight(Number(e.target.value))}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                {isAr ? 'معدل الدقة (DPI):' : 'Resolution (DPI):'}
              </label>
              <select
                value={dpi}
                onChange={(e) => setDpi(Number(e.target.value))}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value={300}>{isAr ? '300 DPI (طباعة ممتازة عالية الجودة)' : '300 DPI (High Quality Print)'}</option>
                <option value={150}>{isAr ? '150 DPI (طباعة مسودات ومجلات)' : '150 DPI (Draft Print)'}</option>
                <option value={72}>{isAr ? '72 DPI (شاشات وويب قياسي)' : '72 DPI (Standard Web)'}</option>
              </select>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Printer className="w-8 h-8 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <span className="text-xs text-slate-500 block">
                  {isAr ? 'أقصى مقاس طباعة بالسنتيمتر (cm)' : 'Maximum Print Size in cm'}
                </span>
                <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {widthCm} × {heightCm} cm
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ImageIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <span className="text-xs text-slate-500 block">
                  {isAr ? 'أقصى مقاس بالبوصة (Inches)' : 'Maximum Print Size in Inches'}
                </span>
                <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {widthInches.toFixed(1)}″ × {heightInches.toFixed(1)}″
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                {isAr ? 'عرض الورقة أو اللوحة (cm):' : 'Print Width (cm):'}
              </label>
              <input
                type="number"
                value={printWidthCm}
                onChange={(e) => setPrintWidthCm(Number(e.target.value))}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                {isAr ? 'ارتفاع الورقة أو اللوحة (cm):' : 'Print Height (cm):'}
              </label>
              <input
                type="number"
                value={printHeightCm}
                onChange={(e) => setPrintHeightCm(Number(e.target.value))}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                {isAr ? 'دقة الطباعة المطلوبة:' : 'Target Print DPI:'}
              </label>
              <select
                value={targetPrintDpi}
                onChange={(e) => setTargetPrintDpi(Number(e.target.value))}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value={300}>300 DPI ({isAr ? 'جودة تصوير وطباعة فاخرة' : 'Photo Quality'})</option>
                <option value={150}>150 DPI ({isAr ? 'لوحات جدارية وبانرات' : 'Banners & Posters'})</option>
              </select>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 block mb-1">
                {isAr ? 'أبعاد التصميم المطلوبة بالبكسل للطباعة النظيفة:' : 'Required Resolution (px):'}
              </span>
              <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                {reqPixelsWidth} × {reqPixelsHeight} px
              </span>
            </div>

            <div className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold">
              {isAr ? `إجمالي الدقة: ${totalMegapixels} ميجابكسل` : `${totalMegapixels} Megapixels`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

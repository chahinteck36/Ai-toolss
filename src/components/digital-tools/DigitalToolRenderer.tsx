import React, { lazy, Suspense } from 'react';
import { DigitalTool } from '../../types';
import { Loader2 } from 'lucide-react';

// PDF Tools - Lazy Loaded
const MergePdfTool = lazy(() => import('./pdf/MergePdfTool').then(m => ({ default: m.MergePdfTool })));
const SplitPdfTool = lazy(() => import('./pdf/SplitPdfTool').then(m => ({ default: m.SplitPdfTool })));
const RotatePdfTool = lazy(() => import('./pdf/RotatePdfTool').then(m => ({ default: m.RotatePdfTool })));
const CompressPdfTool = lazy(() => import('./pdf/CompressPdfTool').then(m => ({ default: m.CompressPdfTool })));
const ImagesToPdfTool = lazy(() => import('./pdf/ImagesToPdfTool').then(m => ({ default: m.ImagesToPdfTool })));
const PdfTextExtractorTool = lazy(() => import('./pdf/PdfTextExtractorTool').then(m => ({ default: m.PdfTextExtractorTool })));
const PdfToWordTool = lazy(() => import('./pdf/PdfToWordTool').then(m => ({ default: m.PdfToWordTool })));
const WordToPdfTool = lazy(() => import('./pdf/WordToPdfTool').then(m => ({ default: m.WordToPdfTool })));
const PdfPasswordRemoverTool = lazy(() => import('./pdf/PdfPasswordRemoverTool').then(m => ({ default: m.PdfPasswordRemoverTool })));

// Image Tools - Lazy Loaded
const ImageCompressorTool = lazy(() => import('./image/ImageCompressorTool').then(m => ({ default: m.ImageCompressorTool })));
const ResizeImageTool = lazy(() => import('./image/ResizeImageTool').then(m => ({ default: m.ResizeImageTool })));
const ImageConverterTool = lazy(() => import('./image/ImageConverterTool').then(m => ({ default: m.ImageConverterTool })));
const ImageCropperTool = lazy(() => import('./image/ImageCropperTool').then(m => ({ default: m.ImageCropperTool })));
const ImageDpiCalculatorTool = lazy(() => import('./image/ImageDpiCalculatorTool').then(m => ({ default: m.ImageDpiCalculatorTool })));
const FaviconGeneratorTool = lazy(() => import('./image/FaviconGeneratorTool').then(m => ({ default: m.FaviconGeneratorTool })));
const QrCodeGeneratorTool = lazy(() => import('./image/QrCodeGeneratorTool').then(m => ({ default: m.QrCodeGeneratorTool })));

// Text Tools - Lazy Loaded
const WordCounterTool = lazy(() => import('./text/WordCounterTool').then(m => ({ default: m.WordCounterTool })));
const CaseConverterTool = lazy(() => import('./text/CaseConverterTool').then(m => ({ default: m.CaseConverterTool })));
const RemoveDuplicateLinesTool = lazy(() => import('./text/RemoveDuplicateLinesTool').then(m => ({ default: m.RemoveDuplicateLinesTool })));
const TextSorterTool = lazy(() => import('./text/TextSorterTool').then(m => ({ default: m.TextSorterTool })));
const TextCleanerTool = lazy(() => import('./text/TextCleanerTool').then(m => ({ default: m.TextCleanerTool })));
const SlugGeneratorTool = lazy(() => import('./text/SlugGeneratorTool').then(m => ({ default: m.SlugGeneratorTool })));
const LoremIpsumGeneratorTool = lazy(() => import('./text/LoremIpsumGeneratorTool').then(m => ({ default: m.LoremIpsumGeneratorTool })));

interface DigitalToolRendererProps {
  tool: DigitalTool;
  lang: string;
  isDarkMode: boolean;
}

const ToolLoadingFallback: React.FC<{ isDarkMode: boolean; isAr: boolean }> = ({ isDarkMode, isAr }) => (
  <div
    className={`p-8 sm:p-12 rounded-3xl border ${
      isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
    } shadow-xs flex flex-col items-center justify-center min-h-[300px] space-y-4`}
  >
    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs">
      <Loader2 className="w-6 h-6 animate-spin" />
    </div>
    <div className="text-center space-y-1.5">
      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
        {isAr ? 'جارٍ تحميل الأداة وتجهيز بيئة العمل...' : 'Loading tool workspace...'}
      </p>
      <p className="text-xs text-slate-400">
        {isAr ? 'تتم المعالجة محلياً وبشكل آمن داخل متصفحك' : 'Processing locally and securely in your browser'}
      </p>
    </div>
  </div>
);

export const DigitalToolRenderer: React.FC<DigitalToolRendererProps> = ({
  tool,
  lang,
  isDarkMode
}) => {
  const slug = tool.slug;
  const isAr = lang === 'ar';

  const renderToolComponent = () => {
    // PDF
    if (slug === 'merge-pdf') return <MergePdfTool lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'split-pdf' || slug === 'extract-pdf-pages')
      return <SplitPdfTool lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'rotate-pdf') return <RotatePdfTool lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'compress-pdf') return <CompressPdfTool lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'images-to-pdf' || slug === 'pdf-to-images')
      return <ImagesToPdfTool lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'pdf-to-text')
      return <PdfTextExtractorTool lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'pdf-to-word') return <PdfToWordTool lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'word-to-pdf') return <WordToPdfTool lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'unlock-pdf')
      return <PdfPasswordRemoverTool lang={lang} isDarkMode={isDarkMode} />;

    // Image
    if (slug === 'compress-image')
      return <ImageCompressorTool lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'resize-image') return <ResizeImageTool lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'crop-image') return <ImageCropperTool lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'jpg-to-png')
      return <ImageConverterTool defaultTarget="png" lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'png-to-jpg')
      return <ImageConverterTool defaultTarget="jpeg" lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'image-to-webp')
      return <ImageConverterTool defaultTarget="webp" lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'webp-to-jpg')
      return <ImageConverterTool defaultTarget="jpeg" lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'favicon-generator')
      return <FaviconGeneratorTool lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'qr-code-generator')
      return <QrCodeGeneratorTool lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'image-dpi-calculator')
      return <ImageDpiCalculatorTool lang={lang} isDarkMode={isDarkMode} />;

    // Text
    if (slug === 'word-counter' || slug === 'character-counter')
      return <WordCounterTool lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'case-converter')
      return <CaseConverterTool lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'remove-duplicate-lines')
      return <RemoveDuplicateLinesTool lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'text-sorter') return <TextSorterTool lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'text-cleaner')
      return <TextCleanerTool lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'slug-generator')
      return <SlugGeneratorTool lang={lang} isDarkMode={isDarkMode} />;
    if (slug === 'lorem-ipsum-generator')
      return <LoremIpsumGeneratorTool lang={lang} isDarkMode={isDarkMode} />;

    // Default fallback for any remaining text tool
    return <WordCounterTool lang={lang} isDarkMode={isDarkMode} />;
  };

  return (
    <Suspense fallback={<ToolLoadingFallback isDarkMode={isDarkMode} isAr={isAr} />}>
      {renderToolComponent()}
    </Suspense>
  );
};

import React from 'react';
import { DigitalTool } from '../../types';

// PDF Tools
import { MergePdfTool } from './pdf/MergePdfTool';
import { SplitPdfTool } from './pdf/SplitPdfTool';
import { RotatePdfTool } from './pdf/RotatePdfTool';
import { CompressPdfTool } from './pdf/CompressPdfTool';
import { ImagesToPdfTool } from './pdf/ImagesToPdfTool';
import { PdfTextExtractorTool } from './pdf/PdfTextExtractorTool';
import { PdfToWordTool } from './pdf/PdfToWordTool';
import { WordToPdfTool } from './pdf/WordToPdfTool';
import { PdfPasswordRemoverTool } from './pdf/PdfPasswordRemoverTool';

// Image Tools
import { ImageCompressorTool } from './image/ImageCompressorTool';
import { ResizeImageTool } from './image/ResizeImageTool';
import { ImageConverterTool } from './image/ImageConverterTool';
import { ImageCropperTool } from './image/ImageCropperTool';
import { ImageDpiCalculatorTool } from './image/ImageDpiCalculatorTool';
import { FaviconGeneratorTool } from './image/FaviconGeneratorTool';
import { QrCodeGeneratorTool } from './image/QrCodeGeneratorTool';

// Text Tools
import { WordCounterTool } from './text/WordCounterTool';
import { CaseConverterTool } from './text/CaseConverterTool';
import { RemoveDuplicateLinesTool } from './text/RemoveDuplicateLinesTool';
import { TextSorterTool } from './text/TextSorterTool';
import { TextCleanerTool } from './text/TextCleanerTool';
import { SlugGeneratorTool } from './text/SlugGeneratorTool';
import { LoremIpsumGeneratorTool } from './text/LoremIpsumGeneratorTool';

interface DigitalToolRendererProps {
  tool: DigitalTool;
  lang: string;
  isDarkMode: boolean;
}

export const DigitalToolRenderer: React.FC<DigitalToolRendererProps> = ({
  tool,
  lang,
  isDarkMode
}) => {
  const slug = tool.slug;

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

import Fuse, { IFuseOptions } from 'fuse.js';
import { AiTool } from '../types';

/**
 * Normalize Arabic text for superior phonetic & character tolerance
 */
export function normalizeArabicText(text: string): string {
  if (!text) return '';
  return text
    .trim()
    .toLowerCase()
    // Remove Arabic diacritics (tashkeel)
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // Normalize Alefs
    .replace(/[أإآٱ]/g, 'ا')
    // Normalize Taa Marbouta
    .replace(/ة/g, 'ه')
    // Normalize Yaa / Alef Maqsura
    .replace(/[ىي]/g, 'ي')
    // Remove tatweel (kashida)
    .replace(/\u0640/g, '');
}

/**
 * Fuse.js configuration tuned for Arabic + English tech keywords and typo tolerance
 */
const fuseOptions: IFuseOptions<AiTool> = {
  includeScore: true,
  includeMatches: false,
  threshold: 0.38,
  distance: 80,
  minMatchCharLength: 2,
  ignoreLocation: true,
  useExtendedSearch: false,
  keys: [
    { name: 'nameAr', weight: 3.0 },
    { name: 'nameEn', weight: 2.5 },
    { name: 'taglineAr', weight: 1.5 },
    { name: 'tags', weight: 1.4 },
    { name: 'descriptionAr', weight: 1.0 },
    { name: 'pricingAr', weight: 0.8 },
    { name: 'useCases', weight: 0.7 }
  ]
};

export class ToolSearchEngine {
  private fuseInstance: Fuse<AiTool> | null = null;
  private tools: AiTool[] = [];
  // Pre-indexed normalized corpus for sub-millisecond fast substring lookup
  private normalizedIndex: { tool: AiTool; corpus: string }[] = [];

  constructor(tools: AiTool[]) {
    this.updateTools(tools);
  }

  public updateTools(tools: AiTool[]) {
    this.tools = tools;
    this.fuseInstance = new Fuse(tools, fuseOptions);
    
    // Pre-calculate normalized Arabic corpus once per dataset update
    this.normalizedIndex = tools.map((t) => ({
      tool: t,
      corpus: normalizeArabicText(`${t.nameAr} ${t.nameEn} ${t.taglineAr} ${t.descriptionAr} ${t.tags.join(' ')} ${t.useCases?.join(' ') || ''}`)
    }));
  }

  /**
   * Search tools with fuzzy tolerance, exact fallback, and Arabic normalization
   */
  public search(query: string): { results: AiTool[]; bestSuggestion?: string; hasTypoCorrection?: boolean } {
    if (!query || !query.trim()) {
      return { results: this.tools };
    }

    const cleanQuery = query.trim();
    const normalizedQuery = normalizeArabicText(cleanQuery);

    if (!this.fuseInstance) {
      return { results: this.tools };
    }

    // 1. Run Fuse.js search
    const fuseResults = this.fuseInstance.search(cleanQuery);

    // 2. High-speed lookup using pre-computed normalized corpus
    const normalizedMatches: AiTool[] = [];
    for (let i = 0; i < this.normalizedIndex.length; i++) {
      if (this.normalizedIndex[i].corpus.includes(normalizedQuery)) {
        normalizedMatches.push(this.normalizedIndex[i].tool);
      }
    }

    // Combine unique tools by ID efficiently with Set
    const seenIds = new Set<string>();
    const finalResults: AiTool[] = [];
    
    // First priority: High-scoring Fuse results
    for (let i = 0; i < fuseResults.length; i++) {
      const tool = fuseResults[i].item;
      seenIds.add(tool.id);
      finalResults.push(tool);
    }

    // Second priority: Normalized/Substring matches
    for (let i = 0; i < normalizedMatches.length; i++) {
      const tool = normalizedMatches[i];
      if (!seenIds.has(tool.id)) {
        seenIds.add(tool.id);
        finalResults.push(tool);
      }
    }

    // Typo detection / Did you mean
    let bestSuggestion: string | undefined;
    let hasTypoCorrection = false;

    if (fuseResults.length > 0 && fuseResults[0].score && fuseResults[0].score > 0.15) {
      const topMatch = fuseResults[0].item;
      if (topMatch.nameAr.toLowerCase() !== cleanQuery.toLowerCase() && topMatch.nameEn.toLowerCase() !== cleanQuery.toLowerCase()) {
        bestSuggestion = `${topMatch.nameAr} (${topMatch.nameEn})`;
        hasTypoCorrection = true;
      }
    }

    return {
      results: finalResults,
      bestSuggestion,
      hasTypoCorrection
    };
  }
}


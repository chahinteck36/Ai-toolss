import { INITIAL_TOOLS } from '../data/toolsData';
import { DIGITAL_TOOLS } from '../data/digitalToolsRegistry';
import { AiTool, DigitalTool } from '../types';

export interface UnifiedToolCard {
  id: string;
  name: string;
  tagline: string;
  category: string;
  rating?: number;
  url: string;
  isInternalUtility: boolean;
  pricingText?: string;
  iconName?: string;
}

export function resolveToolById(id: string, lang: 'ar' | 'en' | 'fr' = 'ar'): UnifiedToolCard | null {
  if (!id) return null;

  // 1. Check DIGITAL_TOOLS first (client-side utilities like pdf-to-word, compress-pdf, word-counter)
  const digTool = DIGITAL_TOOLS.find((d) => d.id === id || d.slug === id);
  if (digTool) {
    return {
      id: digTool.id,
      name: lang === 'en' ? digTool.nameEn : lang === 'fr' ? (digTool.nameFr || digTool.nameEn) : digTool.nameAr,
      tagline: lang === 'en' ? digTool.taglineEn : digTool.taglineAr,
      category: digTool.category,
      rating: 4.9,
      url: `/tools/${digTool.slug}`,
      isInternalUtility: true,
      pricingText: lang === 'ar' ? 'مجاني 100%' : '100% Free',
      iconName: digTool.icon
    };
  }

  // 2. Check INITIAL_TOOLS (AI directory tools like gamma-app, claude, deepseek, perplexity)
  const aiTool = INITIAL_TOOLS.find((t) => t.id === id);
  if (aiTool) {
    return {
      id: aiTool.id,
      name: lang === 'en' || lang === 'fr' ? aiTool.nameEn : aiTool.nameAr,
      tagline: aiTool.taglineAr,
      category: aiTool.category,
      rating: aiTool.rating,
      url: `/tools/${aiTool.id}`,
      isInternalUtility: false,
      pricingText: aiTool.pricingAr,
      iconName: 'Sparkles'
    };
  }

  return null;
}

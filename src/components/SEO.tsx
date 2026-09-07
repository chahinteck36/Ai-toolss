import React, { useEffect } from 'react';
import { SupportedLanguage } from '../lib/i18n';

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  jsonLd?: Record<string, any> | Record<string, any>[];
  lang?: SupportedLanguage;
  keywords?: string[];
}

const DEFAULT_TITLE = 'أدواتي AI | دليل أدوات الذكاء الاصطناعي الشامل - adawatai.online';
const DEFAULT_DESC = 'المرجع العربي الشامل لاكتشاف وتصنيف ومراجعة أفضل أدوات وتطبيقات الذكاء الاصطناعي في الكتابة، التصميم، البرمجة، والإنتاجية.';
const DEFAULT_CANONICAL = 'https://adawatai.online/';
const DEFAULT_IMAGE = 'https://adawatai.online/logo.svg';
const SITE_NAME = 'أدواتي AI - adawatai.online';

export const SEO: React.FC<SEOProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  canonical = DEFAULT_CANONICAL,
  robots = 'index, follow',
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd,
  lang = 'ar',
  keywords = []
}) => {
  useEffect(() => {
    // 1. Set Document Title
    document.title = title;

    // 2. Set HTML Lang and Dir attributes
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('lang', lang);
    htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Helper to update or create a meta tag
    const setMetaTag = (attribute: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.head.querySelector(`meta[${attribute}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attrValue);
        element.setAttribute('data-managed', 'adawatai-seo');
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to update or create a link tag
    const setLinkTag = (rel: string, href: string, extraAttrs: Record<string, string> = {}) => {
      let selector = `link[rel="${rel}"]`;
      if (extraAttrs.hreflang) {
        selector += `[hreflang="${extraAttrs.hreflang}"]`;
      }
      let element = document.head.querySelector(selector) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        element.setAttribute('data-managed', 'adawatai-seo');
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
      Object.entries(extraAttrs).forEach(([k, v]) => element!.setAttribute(k, v));
    };

    // 3. Update Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', robots);
    if (keywords && keywords.length > 0) {
      setMetaTag('name', 'keywords', keywords.join(', '));
    } else {
      const existingKw = document.head.querySelector('meta[name="keywords"]');
      if (existingKw) existingKw.remove();
    }

    // 4. Update Canonical Link
    setLinkTag('canonical', canonical);

    // 5. Update Open Graph Meta Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonical);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:locale', lang === 'ar' ? 'ar_AR' : lang === 'fr' ? 'fr_FR' : 'en_US');

    // 6. Update Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:url', canonical);
    setMetaTag('name', 'twitter:image', image);

    // 7. Update Multilingual Hreflang Tags (strictly for indexable pages)
    if (!robots.includes('noindex')) {
      const baseCleanUrl = canonical.split('?')[0];
      const queryParams = new URLSearchParams(canonical.includes('?') ? canonical.split('?')[1] : '');
      
      const buildHreflangUrl = (targetLang: SupportedLanguage) => {
        const p = new URLSearchParams(queryParams);
        if (targetLang === 'ar') {
          p.delete('lang'); // default is Arabic
        } else {
          p.set('lang', targetLang);
        }
        const qs = p.toString();
        return qs ? `${baseCleanUrl}?${qs}` : baseCleanUrl;
      };

      const defaultPageUrl = buildHreflangUrl('ar');
      setLinkTag('alternate', defaultPageUrl, { hreflang: 'ar' });
      setLinkTag('alternate', buildHreflangUrl('en'), { hreflang: 'en' });
      setLinkTag('alternate', buildHreflangUrl('fr'), { hreflang: 'fr' });
      // x-default must point to the primary locale version of this exact URL, not the site root
      setLinkTag('alternate', defaultPageUrl, { hreflang: 'x-default' });
    } else {
      // Clean up hreflang tags on noindex pages (like 404)
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    }

    // 8. Inject / Update Structured Data (JSON-LD)
    let jsonLdScript = document.getElementById('dynamic-seo-jsonld') as HTMLScriptElement | null;
    if (jsonLd) {
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.id = 'dynamic-seo-jsonld';
        jsonLdScript.type = 'application/ld+json';
        document.head.appendChild(jsonLdScript);
      }
      jsonLdScript.textContent = JSON.stringify(jsonLd);
    } else if (jsonLdScript) {
      jsonLdScript.remove();
    }
  }, [title, description, canonical, robots, image, type, jsonLd, lang, keywords]);

  return null; // Pure head manipulation component
};

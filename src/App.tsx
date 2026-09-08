import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { CATEGORIES, INITIAL_TOOLS } from './data/toolsData';
import { 
  AiTool, 
  CategoryId, 
  FilterState, 
  ToolSubmission, 
  Advertisement, 
  Member, 
  SiteSettings,
  DigitalTool
} from './types';
import { DIGITAL_TOOLS, getDigitalToolBySlug, digitalToolToAiTool } from './data/digitalToolsRegistry';
import { DigitalToolPage } from './components/digital-tools/DigitalToolPage';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { ToolCard } from './components/ToolCard';
import { ToolDetailModal } from './components/ToolDetailModal';
import { ToolFormModal } from './components/ToolFormModal';
import { AdFormModal } from './components/AdFormModal';
import { VisitorSubmitModal } from './components/VisitorSubmitModal';
import { QuickAIAssistantModal } from './components/QuickAIAssistantModal';
import { PromptsLibraryModal } from './components/PromptsLibraryModal';
import { AdminDashboard } from './components/AdminDashboard';
import { SecretAdminAuthModal } from './components/SecretAdminAuthModal';
import { AboutUsModal } from './components/AboutUsModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { ContactModal } from './components/ContactModal';
import { SponsoredBanner } from './components/SponsoredBanner';
import { StickyBottomAd } from './components/StickyBottomAd';
import { Footer } from './components/Footer';
import { NotFoundPage } from './components/NotFoundPage';
import { KnowledgeHub } from './components/knowledge/KnowledgeHub';
import { ArticleView } from './components/knowledge/ArticleView';
import { getArticleBySlug } from './articles/articleData';
import { getLocalizedArticle } from './articles/articleTranslations';
import { SEO } from './components/SEO';
import { getHomeSEO, getCategorySEO } from './lib/seoHelpers';
import { SupportedLanguage, TRANSLATIONS } from './lib/i18n';
import { 
  fetchToolsFromFirestore, 
  saveToolToFirestore, 
  deleteToolFromFirestore, 
  recordToolClick, 
  seedInitialToolsToFirestore, 
  fetchSubmissions, 
  updateSubmissionStatus, 
  deleteSubmission, 
  fetchAds, 
  saveAd, 
  deleteAd, 
  subscribeToAds,
  subscribeToTools,
  fetchSiteSettings, 
  saveSiteSettings,
  INITIAL_ADS,
  INITIAL_MEMBERS,
  DEFAULT_SETTINGS 
} from './lib/firebase';
import { ToolSearchEngine } from './lib/searchEngine';
import { Sparkles, SearchX, RotateCcw, PlusCircle, CheckCircle2, AlertCircle } from 'lucide-react';

const DIGITAL_AI_TOOLS: AiTool[] = DIGITAL_TOOLS.map(digitalToolToAiTool);
const ALL_BUILTIN_TOOLS: AiTool[] = [...DIGITAL_AI_TOOLS, ...INITIAL_TOOLS];

export default function App() {
  // Core Data States
  const [tools, setTools] = useState<AiTool[]>(() => {
    try {
      const savedCustom = localStorage.getItem('ai_directory_custom_tools');
      if (savedCustom) {
        const parsed = JSON.parse(savedCustom);
        const existingIds = new Set(parsed.map((p: any) => p.id));
        const missingBuiltins = ALL_BUILTIN_TOOLS.filter((b) => !existingIds.has(b.id));
        return [...parsed, ...missingBuiltins];
      }
    } catch (e) {}
    return ALL_BUILTIN_TOOLS;
  });

  const [submissions, setSubmissions] = useState<ToolSubmission[]>([]);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>(() => {
    try {
      const saved = localStorage.getItem('ai_directory_ads');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return INITIAL_ADS;
  });
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [isSyncingFirestore, setIsSyncingFirestore] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState<'admin' | 'editor' | 'member'>('admin');

  // User Local States
  const [favorites, setFavorites] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ai_directory_favorites');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [userRatings, setUserRatings] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('ai_directory_ratings');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [userNotes, setUserNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('ai_directory_notes');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('ai_directory_theme');
      if (saved !== null) {
        return saved === 'dark';
      }
      // If user hasn't explicitly set a preference, detect system preference
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return false;
    } catch (e) {
      return false;
    }
  });

  // Listen to system color scheme changes when user hasn't explicitly saved a preference
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem('ai_directory_theme');
      // Only auto-update if the user hasn't explicitly saved a choice in localStorage
      if (savedTheme === null) {
        setIsDarkMode(e.matches);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    } else if (mediaQuery.addListener) {
      // Compatibility for older browsers
      mediaQuery.addListener(handleSystemThemeChange);
      return () => mediaQuery.removeListener(handleSystemThemeChange);
    }
  }, []);

  // Filter & Search states
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    selectedCategory: 'all',
    selectedPricing: 'all',
    onlyFavorites: false,
    onlyArabicSupport: false,
    sortBy: 'rating'
  });

  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  
  // Modals & Navigation states
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isSecretAuthModalOpen, setIsSecretAuthModalOpen] = useState(false);
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedToolForModal, setSelectedToolForModal] = useState<AiTool | null>(null);
  const [selectedDigitalTool, setSelectedDigitalTool] = useState<DigitalTool | null>(null);
  const [isToolFormOpen, setIsToolFormOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<AiTool | null>(null);
  const [isVisitorSubmitOpen, setIsVisitorSubmitOpen] = useState(false);
  const [isAdFormOpen, setIsAdFormOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [isSmartFinderOpen, setIsSmartFinderOpen] = useState(false);
  const [isPromptsLibraryOpen, setIsPromptsLibraryOpen] = useState(false);
  const [promptsLibraryToolFilter, setPromptsLibraryToolFilter] = useState('all');
  const [isKnowledgeHubOpen, setIsKnowledgeHubOpen] = useState(false);
  const [selectedKnowledgeArticleSlug, setSelectedKnowledgeArticleSlug] = useState<string | null>(null);
  const [globalNotification, setGlobalNotification] = useState<string | null>(null);

  // Language state (ar / en / fr)
  const [lang, setLang] = useState<SupportedLanguage>(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const l = urlParams.get('lang');
      if (l === 'en' || l === 'fr' || l === 'ar') return l;
      const saved = localStorage.getItem('adawatai_lang');
      if (saved === 'en' || saved === 'fr' || saved === 'ar') return saved;
    } catch (e) {}
    return 'ar';
  });

  const [is404, setIs404] = useState(false);

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLang(newLang);
    localStorage.setItem('adawatai_lang', newLang);
    const currentUrl = new URL(window.location.href);
    if (newLang === 'ar') {
      currentUrl.searchParams.delete('lang');
    } else {
      currentUrl.searchParams.set('lang', newLang);
    }
    window.history.pushState(null, '', currentUrl.toString());
  };

  // Sync theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ai_directory_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ai_directory_theme', 'light');
    }
  }, [isDarkMode]);

  // Stable ref for tools to prevent re-attaching or triggering URL listeners on tool updates
  const toolsRef = useRef<AiTool[]>(tools);
  useEffect(() => {
    toolsRef.current = tools;
  }, [tools]);

  // Handler: Open tool details with clean URL push
  const handleOpenToolDetails = useCallback((tool: AiTool) => {
    recordToolClick(tool.id);
    setTools((prev) =>
      prev.map((t) => (t.id === tool.id ? { ...t, clicksCount: (t.clicksCount || 0) + 1 } : t))
    );

    // Check if this tool is a Digital Tool
    const digital = getDigitalToolBySlug(tool.digitalToolSlug || tool.id);
    if (digital) {
      setSelectedDigitalTool(digital);
      setSelectedToolForModal(null);
      setIs404(false);

      try {
        const currentUrl = new URL(window.location.href);
        const targetPath = `/tools/${digital.slug}`;
        if (currentUrl.pathname !== targetPath) {
          currentUrl.pathname = targetPath;
          currentUrl.searchParams.delete('tool');
          const cleanSearch = currentUrl.searchParams.toString();
          const targetUrl = currentUrl.pathname + (cleanSearch ? `?${cleanSearch}` : '') + currentUrl.hash;
          window.history.pushState({ toolId: digital.slug }, '', targetUrl);
        }
      } catch (e) {}
      return;
    }

    setSelectedDigitalTool(null);
    setSelectedToolForModal(tool);
    setIs404(false);

    try {
      const currentUrl = new URL(window.location.href);
      const targetPath = `/tools/${tool.id}`;
      if (currentUrl.pathname !== targetPath) {
        currentUrl.pathname = targetPath;
        currentUrl.searchParams.delete('tool');
        const cleanSearch = currentUrl.searchParams.toString();
        const targetUrl = currentUrl.pathname + (cleanSearch ? `?${cleanSearch}` : '') + currentUrl.hash;
        window.history.pushState({ toolId: tool.id }, '', targetUrl);
      }
    } catch (e) {}
  }, []);

  // Handler: Close tool details with clean URL return
  const handleCloseToolDetails = useCallback(() => {
    setSelectedToolForModal(null);
    setSelectedDigitalTool(null);
    try {
      const currentUrl = new URL(window.location.href);
      if (currentUrl.pathname.startsWith('/tools/')) {
        const returnPath = filterState.selectedCategory !== 'all'
          ? `/category/${filterState.selectedCategory}`
          : '/';
        currentUrl.pathname = returnPath;
        currentUrl.searchParams.delete('tool');
        const cleanSearch = currentUrl.searchParams.toString();
        const targetUrl = currentUrl.pathname + (cleanSearch ? `?${cleanSearch}` : '') + currentUrl.hash;
        window.history.pushState(null, '', targetUrl);
      }
    } catch (e) {}
  }, [filterState.selectedCategory]);

  // Handler: Open Knowledge Center Root (/knowledge)
  const handleOpenKnowledgeCenter = useCallback(() => {
    setIsKnowledgeHubOpen(true);
    setSelectedKnowledgeArticleSlug(null);
    setSelectedToolForModal(null);
    setSelectedDigitalTool(null);
    setIsAboutUsOpen(false);
    setIsPrivacyPolicyOpen(false);
    setIsContactModalOpen(false);
    setIsPromptsLibraryOpen(false);
    setIs404(false);
    try {
      const currentUrl = new URL(window.location.href);
      currentUrl.pathname = '/knowledge';
      const cleanSearch = currentUrl.searchParams.toString();
      const targetUrl = currentUrl.pathname + (cleanSearch ? `?${cleanSearch}` : '');
      window.history.pushState(null, '', targetUrl);
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handler: Select Knowledge Article (/knowledge/:slug)
  const handleSelectKnowledgeArticle = useCallback((slug: string) => {
    setIsKnowledgeHubOpen(true);
    setSelectedKnowledgeArticleSlug(slug);
    setSelectedToolForModal(null);
    setSelectedDigitalTool(null);
    setIs404(false);
    try {
      const currentUrl = new URL(window.location.href);
      currentUrl.pathname = `/knowledge/${slug}`;
      const cleanSearch = currentUrl.searchParams.toString();
      const targetUrl = currentUrl.pathname + (cleanSearch ? `?${cleanSearch}` : '');
      window.history.pushState(null, '', targetUrl);
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handler: Close Knowledge Center and return to homepage
  const handleCloseKnowledgeCenter = useCallback(() => {
    setIsKnowledgeHubOpen(false);
    setSelectedKnowledgeArticleSlug(null);
    try {
      const currentUrl = new URL(window.location.href);
      currentUrl.pathname = '/';
      const cleanSearch = currentUrl.searchParams.toString();
      const targetUrl = '/' + (cleanSearch ? `?${cleanSearch}` : '');
      window.history.pushState(null, '', targetUrl);
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handler: Navigate to tool from internal article link
  const handleNavigateToolFromArticle = useCallback((toolUrl: string) => {
    setIsKnowledgeHubOpen(false);
    setSelectedKnowledgeArticleSlug(null);
    
    // Extract slug
    const cleanUrl = toolUrl.split('?')[0].split('#')[0];
    const parts = cleanUrl.split('/').filter(Boolean);
    const slug = parts[parts.length - 1];

    if (!slug) return;

    // Check if it matches a digital tool
    const digitalFound = getDigitalToolBySlug(slug);
    if (digitalFound) {
      setSelectedDigitalTool(digitalFound);
      setSelectedToolForModal(null);
      setIs404(false);
      try {
        const currentUrl = new URL(window.location.href);
        currentUrl.pathname = `/tools/${digitalFound.slug}`;
        window.history.pushState({ toolId: digitalFound.slug }, '', currentUrl.pathname + currentUrl.search);
      } catch (e) {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Check if it matches an AI tool
    const currentToolsList = toolsRef.current.length > 0 ? toolsRef.current : ALL_BUILTIN_TOOLS;
    const aiToolFound = currentToolsList.find(
      (t) => t.id.toLowerCase() === slug.toLowerCase() ||
             t.nameEn.toLowerCase() === slug.toLowerCase() ||
             (t.digitalToolSlug && t.digitalToolSlug.toLowerCase() === slug.toLowerCase())
    );

    if (aiToolFound) {
      handleOpenToolDetails(aiToolFound);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Fallback: direct browser navigation
    try {
      window.location.href = toolUrl;
    } catch (e) {}
  }, [handleOpenToolDetails]);

  // Check URL parameters / hash on mount & popstate for direct navigation
  useEffect(() => {
    const handleUrlRoutes = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      
      const isAdminRoute = hash.includes('admin') || search.includes('admin');
      if (isAdminRoute) {
        const isAuth = sessionStorage.getItem('ai_directory_admin_auth') === 'true';
        if (isAuth) {
          setIsAdminDashboardOpen(true);
        } else {
          setIsSecretAuthModalOpen(true);
        }
      }

      if (hash.includes('about') || search.includes('about')) {
        setIsAboutUsOpen(true);
      }

      if (hash.includes('privacy') || search.includes('privacy')) {
        setIsPrivacyPolicyOpen(true);
      }

      if (hash.includes('contact') || search.includes('contact')) {
        setIsContactModalOpen(true);
      }

      if (hash.includes('prompts') || hash.includes('prompt') || search.includes('prompts')) {
        setIsPromptsLibraryOpen(true);
      }

      // Check URL search parameters
      const urlParams = new URLSearchParams(window.location.search);
      
      const langParam = urlParams.get('lang');
      if (langParam === 'en' || langParam === 'fr' || langParam === 'ar') {
        setLang(langParam);
      }

      const qParam = urlParams.get('q');
      if (qParam) {
        setFilterState((prev) => ({ ...prev, searchQuery: qParam }));
      }

      const rawPath = window.location.pathname || '/';
      const cleanPath = rawPath
        .replace(/\/index\.html$/i, '')
        .replace(/\/+$/, '') || '/';

      if (cleanPath === '/404' || search.includes('404')) {
        setIs404(true);
        setSelectedToolForModal(null);
        return;
      }

      // Standalone pages
      if (cleanPath === '/knowledge') {
        setIsKnowledgeHubOpen(true);
        setSelectedKnowledgeArticleSlug(null);
        setSelectedToolForModal(null);
        setSelectedDigitalTool(null);
        setIs404(false);
        return;
      }

      const knowledgePathMatch = cleanPath.match(/^\/knowledge\/([^/]+)/i);
      if (knowledgePathMatch) {
        const articleSlug = decodeURIComponent(knowledgePathMatch[1]).toLowerCase();
        const articleFound = getArticleBySlug(articleSlug);
        if (articleFound) {
          setIsKnowledgeHubOpen(true);
          setSelectedKnowledgeArticleSlug(articleFound.slug);
          setSelectedToolForModal(null);
          setSelectedDigitalTool(null);
          setIs404(false);
          return;
        } else {
          setIsKnowledgeHubOpen(false);
          setSelectedKnowledgeArticleSlug(null);
          setIs404(true);
          return;
        }
      }

      // Digital tools direct prefix: /digital-tools/{slug}
      const digToolMatch = cleanPath.match(/^\/digital-tools\/([^/]+)/i);
      if (digToolMatch) {
        const digSlug = decodeURIComponent(digToolMatch[1]);
        const digitalFound = getDigitalToolBySlug(digSlug);
        if (digitalFound) {
          setSelectedDigitalTool(digitalFound);
          setSelectedToolForModal(null);
          setIsKnowledgeHubOpen(false);
          setSelectedKnowledgeArticleSlug(null);
          setIs404(false);
          return;
        }
      }

      if (cleanPath === '/about') {
        setIsAboutUsOpen(true);
        setIsKnowledgeHubOpen(false);
        setSelectedKnowledgeArticleSlug(null);
        setIs404(false);
        return;
      }
      if (cleanPath === '/privacy') {
        setIsPrivacyPolicyOpen(true);
        setIsKnowledgeHubOpen(false);
        setSelectedKnowledgeArticleSlug(null);
        setIs404(false);
        return;
      }
      if (cleanPath === '/contact') {
        setIsContactModalOpen(true);
        setIsKnowledgeHubOpen(false);
        setSelectedKnowledgeArticleSlug(null);
        setIs404(false);
        return;
      }
      if (cleanPath === '/prompts') {
        setIsPromptsLibraryOpen(true);
        setIsKnowledgeHubOpen(false);
        setSelectedKnowledgeArticleSlug(null);
        setIs404(false);
        return;
      }
      if (cleanPath === '/categories') {
        setFilterState((prev) => ({ ...prev, selectedCategory: 'all' }));
        setIsKnowledgeHubOpen(false);
        setSelectedKnowledgeArticleSlug(null);
        setIs404(false);
        return;
      }

      // Check path-based routing: /category/{slug}
      const catPathMatch = cleanPath.match(/^\/category\/([^/]+)/i);
      if (catPathMatch) {
        const catSlug = decodeURIComponent(catPathMatch[1]).toLowerCase();
        const catFound = CATEGORIES.find((c) => c.id.toLowerCase() === catSlug);
        if (catFound) {
          setFilterState((prev) => ({ ...prev, selectedCategory: catFound.id }));
          setSelectedToolForModal(null);
          setIs404(false);
          return;
        } else {
          setIs404(true);
          return;
        }
      } else {
        // Check legacy query parameter: ?category={id}
        const catParam = urlParams.get('category');
        if (catParam) {
          const catFound = CATEGORIES.find((c) => c.id.toLowerCase() === catParam.toLowerCase());
          if (catFound) {
            setFilterState((prev) => ({ ...prev, selectedCategory: catFound.id }));
            setSelectedToolForModal(null);
            setIs404(false);
            return;
          }
        }
      }

      // Check path-based routing: /tools/{slug}
      const toolPathMatch = cleanPath.match(/^\/tools\/([^/]+)/i);
      const toolSlugFromPath = toolPathMatch ? decodeURIComponent(toolPathMatch[1]) : null;

      // Check for direct tool parameter (?tool=id), clean path (/tools/id), or hash (#tool-id)
      const toolParam = urlParams.get('tool') || toolSlugFromPath;
      const currentToolsList = toolsRef.current.length > 0 ? toolsRef.current : ALL_BUILTIN_TOOLS;

      if (toolParam) {
        // 1. Check digital tools registry first
        const digitalFound = getDigitalToolBySlug(toolParam);
        if (digitalFound) {
          setSelectedDigitalTool(digitalFound);
          setSelectedToolForModal(null);
          setIs404(false);
          return;
        }

        // 2. Check general tools list
        const found = currentToolsList.find(
          (t) => t.id.toLowerCase() === toolParam.toLowerCase() ||
                 t.nameEn.toLowerCase() === toolParam.toLowerCase() ||
                 (t.digitalToolSlug && t.digitalToolSlug.toLowerCase() === toolParam.toLowerCase())
        );
        if (found) {
          const digitalFromFound = getDigitalToolBySlug(found.digitalToolSlug || found.id);
          if (digitalFromFound) {
            setSelectedDigitalTool(digitalFromFound);
            setSelectedToolForModal(null);
          } else {
            setSelectedToolForModal(found);
            setSelectedDigitalTool(null);
          }
          setIs404(false);
        } else {
          setSelectedToolForModal(null);
          setSelectedDigitalTool(null);
          setIs404(true);
        }
        return;
      } else if (hash.startsWith('#tool-')) {
        const toolId = hash.replace('#tool-', '');
        const digitalFound = getDigitalToolBySlug(toolId);
        if (digitalFound) {
          setSelectedDigitalTool(digitalFound);
          setSelectedToolForModal(null);
          setIs404(false);
          return;
        }

        const found = currentToolsList.find(
          (t) => t.id.toLowerCase() === toolId.toLowerCase() ||
                 t.nameEn.toLowerCase() === toolId.toLowerCase()
        );
        if (found) {
          setSelectedToolForModal(found);
          setSelectedDigitalTool(null);
          setIs404(false);
        } else {
          setSelectedToolForModal(null);
          setSelectedDigitalTool(null);
          setIs404(true);
        }
        return;
      }

      // Root / home
      if (cleanPath === '/' || cleanPath === '') {
        setSelectedToolForModal(null);
        setSelectedDigitalTool(null);
        setIsKnowledgeHubOpen(false);
        setSelectedKnowledgeArticleSlug(null);
        setIs404(false);
      } else {
        setSelectedToolForModal(null);
        setSelectedDigitalTool(null);
        setIsKnowledgeHubOpen(false);
        setSelectedKnowledgeArticleSlug(null);
        setIs404(true);
      }
    };

    handleUrlRoutes();
    window.addEventListener('hashchange', handleUrlRoutes);
    window.addEventListener('popstate', handleUrlRoutes);
    return () => {
      window.removeEventListener('hashchange', handleUrlRoutes);
      window.removeEventListener('popstate', handleUrlRoutes);
    };
  }, []);

  // Keyboard shortcut listener for Secret Admin Access (Ctrl+Shift+A or Alt+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+A or Cmd+Shift+A or Alt+A
      if (
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
        (e.altKey && (e.key === 'A' || e.key === 'a'))
      ) {
        e.preventDefault();
        setIsSecretAuthModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handler for Successful Secret Authentication
  const handleSecretAuthSuccess = (openInNewTab: boolean) => {
    setIsSecretAuthModalOpen(false);
    sessionStorage.setItem('ai_directory_admin_auth', 'true');

    if (openInNewTab) {
      const standaloneUrl = `${window.location.origin}${window.location.pathname}#admin_portal`;
      window.open(standaloneUrl, '_blank');
      showNotification('جاري فتح لوحة الإدارة المستقلة في تبويب متصفح جديد...');
    } else {
      setIsAdminDashboardOpen(true);
      showNotification('مرحباً بك في لوحة الإدارة والتحكم المستقلة');
    }
  };

  // Show Toast Alert
  const showNotification = useCallback((msg: string) => {
    setGlobalNotification(msg);
    setTimeout(() => setGlobalNotification(null), 4500);
  }, []);

  // Fetch Firestore Data on Mount & Sync
  const loadFirestoreData = useCallback(async () => {
    try {
      setIsSyncingFirestore(true);
      const [firestoreTools, firestoreSubmissions, firestoreAds, settings] = await Promise.all([
        fetchToolsFromFirestore(),
        fetchSubmissions(),
        fetchAds(),
        fetchSiteSettings()
      ]);

      if (firestoreTools.length > 0) {
        const firestoreIds = new Set(firestoreTools.map((t) => t.id));
        const missingBuiltins = ALL_BUILTIN_TOOLS.filter((b) => !firestoreIds.has(b.id));
        setTools([...missingBuiltins, ...firestoreTools]);
      }
      if (firestoreSubmissions.length > 0) {
        setSubmissions(firestoreSubmissions);
      }
      if (firestoreAds.length > 0) {
        setAdvertisements(firestoreAds);
        try {
          localStorage.setItem('ai_directory_ads_synced', 'true');
          localStorage.setItem('ai_directory_ads', JSON.stringify(firestoreAds));
        } catch (e) {}
      }
      if (settings) {
        setSiteSettings(settings);
      }
    } catch (err) {
      console.warn('Could not sync with Firestore, using cached/initial dataset', err);
    } finally {
      setIsSyncingFirestore(false);
    }
  }, []);

  useEffect(() => {
    loadFirestoreData();

    // Set up real-time live synchronization for Ads and Tools across all visitors
    const unsubscribeAds = subscribeToAds((liveAds) => {
      if (liveAds && liveAds.length > 0) {
        setAdvertisements(liveAds);
        try {
          localStorage.setItem('ai_directory_ads_synced', 'true');
          localStorage.setItem('ai_directory_ads', JSON.stringify(liveAds));
        } catch (e) {}
      } else if (liveAds && liveAds.length === 0) {
        const wasSynced = localStorage.getItem('ai_directory_ads_synced');
        if (wasSynced) {
          setAdvertisements([]);
          try {
            localStorage.setItem('ai_directory_ads', JSON.stringify([]));
          } catch (e) {}
        }
      }
    });

    const unsubscribeTools = subscribeToTools((liveTools) => {
      if (liveTools && liveTools.length > 0) {
        const firestoreIds = new Set(liveTools.map((t) => t.id));
        const missingBuiltins = ALL_BUILTIN_TOOLS.filter((b) => !firestoreIds.has(b.id));
        setTools([...missingBuiltins, ...liveTools]);
      }
    });

    return () => {
      unsubscribeAds();
      unsubscribeTools();
    };
  }, [loadFirestoreData]);

  // Fuse.js Search Engine instance
  const searchEngine = useMemo(() => {
    return new ToolSearchEngine(tools);
  }, [tools]);

  // Handler: Toggle Favorite
  const handleToggleFavorite = useCallback((toolId: string) => {
    setFavorites((prev) => {
      const next = { ...prev, [toolId]: !prev[toolId] };
      if (!next[toolId]) {
        delete next[toolId];
      }
      try {
        localStorage.setItem('ai_directory_favorites', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  }, []);

  // Handler: Rate tool
  const handleRateTool = useCallback((toolId: string, rating: number) => {
    setUserRatings((prev) => {
      const next = { ...prev, [toolId]: rating };
      try {
        localStorage.setItem('ai_directory_ratings', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  }, []);

  // Handler: Save user note
  const handleSaveNote = useCallback((toolId: string, note: string) => {
    setUserNotes((prev) => {
      const next = { ...prev, [toolId]: note };
      try {
        localStorage.setItem('ai_directory_notes', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  }, []);

  // Handler: Track click
  const handleToolClick = useCallback((toolId: string) => {
    recordToolClick(toolId);
    setTools((prev) =>
      prev.map((t) => (t.id === toolId ? { ...t, clicksCount: (t.clicksCount || 0) + 1 } : t))
    );
  }, []);

  // Handler: Save Tool (Add or Update in Firestore)
  const handleSaveTool = async (toolToSave: AiTool) => {
    await saveToolToFirestore(toolToSave);
    setTools((prev) => {
      const exists = prev.some((t) => t.id === toolToSave.id);
      if (exists) {
        return prev.map((t) => (t.id === toolToSave.id ? toolToSave : t));
      }
      return [toolToSave, ...prev];
    });
    showNotification(`تم حفظ ونشر أداة "${toolToSave.nameAr}" في قاعدة البيانات بنجاح!`);
  };

  // Handler: Delete Tool
  const handleDeleteTool = async (toolId: string) => {
    await deleteToolFromFirestore(toolId);
    setTools((prev) => prev.filter((t) => t.id !== toolId));
    showNotification('تم حذف الأداة من قاعدة البيانات بنجاح.');
  };

  // Handler: Toggle Tool Featured
  const handleToggleToolFeatured = async (tool: AiTool) => {
    const updated = { ...tool, isFeatured: !tool.isFeatured };
    await saveToolToFirestore(updated);
    setTools((prev) => prev.map((t) => (t.id === tool.id ? updated : t)));
    showNotification(updated.isFeatured ? 'تم تمييز الأداة كأداة مختارة' : 'تم إلغاء تمييز الأداة');
  };

  // Handler: Approve Visitor Submission
  const handleApproveSubmission = async (sub: ToolSubmission) => {
    const newTool: AiTool = {
      id: `tool-${Date.now()}`,
      nameAr: sub.nameAr,
      nameEn: sub.nameEn || sub.nameAr,
      taglineAr: sub.taglineAr || 'أداة ذكاء اصطناعي مفيدة',
      descriptionAr: sub.descriptionAr || sub.taglineAr || '',
      category: sub.category,
      pricing: sub.pricing,
      pricingAr: sub.pricing === 'free' ? 'مجاني بالكامل' : 'فريميوم',
      websiteUrl: sub.websiteUrl,
      rating: 4.8,
      reviewsCount: 1,
      tags: sub.tags || ['مقترح_معتمد', 'ذكاء_اصطناعي'],
      supportsArabic: sub.supportsArabic ?? true,
      platforms: ['Web'],
      pros: ['تم اقتراحها واعتمادها من المجتمع'],
      cons: [],
      useCases: ['الاستخدام العام'],
      addedDate: new Date().toISOString().split('T')[0],
      status: 'published',
      gradient: 'from-indigo-600 to-violet-600',
      iconBg: 'bg-indigo-600',
      clicksCount: 0,
      submitterEmail: sub.submitterEmail,
      submitterName: sub.submittedBy
    };

    await saveToolToFirestore(newTool);
    await updateSubmissionStatus(sub.id, 'approved');

    setTools((prev) => [newTool, ...prev]);
    setSubmissions((prev) =>
      prev.map((s) => (s.id === sub.id ? { ...s, status: 'approved' } : s))
    );
    showNotification(`تم قبول ونشر مقترح "${sub.nameAr}" في الدليل الرئيسي!`);
  };

  // Handler: Reject Visitor Submission
  const handleRejectSubmission = async (subId: string) => {
    await updateSubmissionStatus(subId, 'rejected');
    setSubmissions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: 'rejected' } : s))
    );
    showNotification('تم رفض المقترح.');
  };

  // Handler: Delete Submission
  const handleDeleteSubmission = async (subId: string) => {
    await deleteSubmission(subId);
    setSubmissions((prev) => prev.filter((s) => s.id !== subId));
    showNotification('تم حذف سجل المقترح.');
  };

  // Handler: Save Ad
  const handleSaveAd = async (adToSave: Advertisement) => {
    try {
      await saveAd(adToSave);
    } catch (e) {
      console.warn('Could not save ad to Firestore, saving locally:', e);
    }
    setAdvertisements((prev) => {
      const exists = prev.some((a) => a.id === adToSave.id);
      const updated = exists
        ? prev.map((a) => (a.id === adToSave.id ? adToSave : a))
        : [adToSave, ...prev];
      try {
        localStorage.setItem('ai_directory_ads_synced', 'true');
        localStorage.setItem('ai_directory_ads', JSON.stringify(updated));
      } catch (err) {}
      return updated;
    });
    showNotification('تم حفظ الإعلان بنجاح.');
  };

  // Handler: Delete Ad
  const handleDeleteAd = async (adId: string) => {
    try {
      await deleteAd(adId);
    } catch (e) {
      console.warn('Could not delete ad from Firestore, deleting locally:', e);
    }
    setAdvertisements((prev) => {
      const updated = prev.filter((a) => a.id !== adId);
      try {
        localStorage.setItem('ai_directory_ads_synced', 'true');
        localStorage.setItem('ai_directory_ads', JSON.stringify(updated));
      } catch (err) {}
      return updated;
    });
    showNotification('تم حذف الإعلان بنجاح.');
  };

  // Handler: Toggle Ad Active
  const handleToggleAdStatus = async (ad: Advertisement) => {
    const updated = { ...ad, isActive: !ad.isActive };
    try {
      await saveAd(updated);
    } catch (e) {
      console.warn('Could not update ad status in Firestore, updating locally:', e);
    }
    setAdvertisements((prev) => {
      const list = prev.map((a) => (a.id === ad.id ? updated : a));
      try {
        localStorage.setItem('ai_directory_ads_synced', 'true');
        localStorage.setItem('ai_directory_ads', JSON.stringify(list));
      } catch (err) {}
      return list;
    });
  };

  // Handler: Push all ads to Firestore
  const handlePushAdsToFirestore = async () => {
    for (const ad of advertisements) {
      await saveAd(ad);
    }
    try {
      localStorage.setItem('ai_directory_ads_synced', 'true');
    } catch (e) {}
    showNotification('تمت مزامنة كافة الإعلانات إلى Firestore بنجاح.');
  };

  // Handler: Import Backup JSON
  const handleImportBackup = async (data: { tools?: AiTool[]; ads?: Advertisement[]; submissions?: ToolSubmission[]; settings?: SiteSettings }) => {
    if (data.tools && Array.isArray(data.tools)) {
      setTools(data.tools);
      for (const t of data.tools) {
        try {
          await saveToolToFirestore(t);
        } catch (e) {}
      }
    }
    if (data.ads && Array.isArray(data.ads)) {
      setAdvertisements(data.ads);
      try {
        localStorage.setItem('ai_directory_ads', JSON.stringify(data.ads));
      } catch (e) {}
      for (const a of data.ads) {
        try {
          await saveAd(a);
        } catch (e) {}
      }
    }
    if (data.submissions && Array.isArray(data.submissions)) {
      setSubmissions(data.submissions);
    }
    if (data.settings) {
      setSiteSettings(data.settings);
      try {
        await saveSiteSettings(data.settings);
      } catch (e) {}
    }
    showNotification('تم استيراد ومزامنة النسخة الاحتياطية بنجاح.');
  };

  // Handler: Seed Initial Database
  const handleSeedInitialData = async () => {
    await seedInitialToolsToFirestore();
    await loadFirestoreData();
  };

  // Handler: Update Member Role
  const handleUpdateMemberRole = (memberId: string, newRole: 'admin' | 'editor' | 'member') => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, role: newRole } : m))
    );
    showNotification('تم تحديث صلاحية العضو بنجاح.');
  };

  // Handler: Save Site Settings
  const handleSaveSiteSettings = async (newSettings: SiteSettings) => {
    await saveSiteSettings(newSettings);
    setSiteSettings(newSettings);
    showNotification('تم حفظ إعدادات الدليل.');
  };

  // Handler: Partial filter update
  const handleFilterChange = useCallback((updates: Partial<FilterState>) => {
    setFilterState((prev) => {
      const next = { ...prev, ...updates };
      if (updates.selectedCategory !== undefined) {
        const currentUrl = new URL(window.location.href);
        if (!currentUrl.pathname.startsWith('/tools/')) {
          currentUrl.pathname = updates.selectedCategory === 'all' 
            ? '/' 
            : `/category/${updates.selectedCategory}`;
          currentUrl.searchParams.delete('category');
          const cleanSearch = currentUrl.searchParams.toString();
          const targetUrl = currentUrl.pathname + (cleanSearch ? `?${cleanSearch}` : '') + currentUrl.hash;
          if (window.location.pathname + window.location.search !== currentUrl.pathname + (cleanSearch ? `?${cleanSearch}` : '')) {
            window.history.pushState(null, '', targetUrl);
          }
        }
      }
      return next;
    });
  }, []);

  // Handler: Reset filters
  const handleResetFilters = useCallback(() => {
    setFilterState({
      searchQuery: '',
      selectedCategory: 'all',
      selectedPricing: 'all',
      onlyFavorites: false,
      onlyArabicSupport: false,
      sortBy: 'rating'
    });
    const currentUrl = new URL(window.location.href);
    if (!currentUrl.pathname.startsWith('/tools/')) {
      currentUrl.pathname = '/';
      currentUrl.searchParams.delete('category');
      currentUrl.searchParams.delete('q');
      const cleanSearch = currentUrl.searchParams.toString();
      const targetUrl = '/' + (cleanSearch ? `?${cleanSearch}` : '') + currentUrl.hash;
      window.history.pushState(null, '', targetUrl);
    }
  }, []);

  // Fuse.js search query execution
  const searchResultData = useMemo(() => {
    return searchEngine.search(filterState.searchQuery);
  }, [searchEngine, filterState.searchQuery]);

  // Filter & Sort computation (using Fuse.js results as input)
  const filteredTools = useMemo(() => {
    const candidateList = filterState.searchQuery.trim()
      ? searchResultData.results
      : tools;

    return candidateList.filter((tool) => {
      // 1. Status check (only published for public view)
      if (tool.status && tool.status !== 'published') {
        return false;
      }

      // 2. Category
      if (filterState.selectedCategory !== 'all') {
        if (filterState.selectedCategory === 'ai_alternatives') {
          if (tool.category !== 'ai_alternatives' && !tool.isAlternative) return false;
        } else if (filterState.selectedCategory === 'academic_scholar') {
          if (tool.category !== 'academic_scholar' && !tool.academicFocus) return false;
        } else if (tool.category !== filterState.selectedCategory) {
          return false;
        }
      }

      // 3. Pricing
      if (filterState.selectedPricing !== 'all' && tool.pricing !== filterState.selectedPricing) {
        return false;
      }

      // 4. Favorites Only
      if (filterState.onlyFavorites && !favorites[tool.id]) {
        return false;
      }

      // 5. Arabic Support Only
      if (filterState.onlyArabicSupport && !tool.supportsArabic) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Keep featured tools at top if not searching
      if (!filterState.searchQuery.trim()) {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
      }

      // Sorting
      if (filterState.sortBy === 'rating') {
        const ratingA = userRatings[a.id] || a.rating;
        const ratingB = userRatings[b.id] || b.rating;
        return ratingB - ratingA;
      }
      if (filterState.sortBy === 'popular') {
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || (b.clicksCount || 0) - (a.clicksCount || 0);
      }
      if (filterState.sortBy === 'newest') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.addedDate.localeCompare(a.addedDate);
      }
      if (filterState.sortBy === 'alphabetical') {
        return a.nameAr.localeCompare(b.nameAr, 'ar');
      }
      return 0;
    });
  }, [tools, searchResultData, filterState, favorites, userRatings]);

  // Calculate tool counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    tools.forEach((tool) => {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
      if (tool.isAlternative && tool.category !== 'ai_alternatives') {
        counts['ai_alternatives'] = (counts['ai_alternatives'] || 0) + 1;
      }
      if (tool.academicFocus && tool.category !== 'academic_scholar') {
        counts['academic_scholar'] = (counts['academic_scholar'] || 0) + 1;
      }
    });
    return counts;
  }, [tools]);

  const favoritesCount = Object.keys(favorites).filter((k) => favorites[k]).length;
  const freeToolsCount = tools.filter((t) => t.pricing === 'free' || t.pricing === 'freemium' || t.pricing === 'open_source').length;
  const pendingSubmissionsCount = submissions.filter((s) => s.status === 'pending').length;

  // Active Ads
  const topAd = advertisements.find((a) => a.placement === 'top_banner' && a.isActive);
  const gridAd = advertisements.find((a) => a.placement === 'grid_sponsored' && a.isActive);

  // If Admin Dashboard is open, render the full WordPress-style CMS view with interactive modals
  if (isAdminDashboardOpen) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`} dir="rtl">
        {/* Global Notification Toast */}
        {globalNotification && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-slate-900 text-white border border-indigo-500 shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top duration-200" dir="rtl">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{globalNotification}</span>
          </div>
        )}

        <AdminDashboard
          tools={tools}
          categories={CATEGORIES}
          submissions={submissions}
          advertisements={advertisements}
          members={members}
          settings={siteSettings}
          isDarkMode={isDarkMode}
          onClose={() => setIsAdminDashboardOpen(false)}
          onOpenAddTool={() => {
            setEditingTool(null);
            setIsToolFormOpen(true);
          }}
          onEditTool={(t) => {
            setEditingTool(t);
            setIsToolFormOpen(true);
          }}
          onDeleteTool={handleDeleteTool}
          onToggleToolFeatured={handleToggleToolFeatured}
          onApproveSubmission={handleApproveSubmission}
          onRejectSubmission={handleRejectSubmission}
          onDeleteSubmission={handleDeleteSubmission}
          onOpenAddAd={() => {
            setEditingAd(null);
            setIsAdFormOpen(true);
          }}
          onEditAd={(ad) => {
            setEditingAd(ad);
            setIsAdFormOpen(true);
          }}
          onDeleteAd={handleDeleteAd}
          onToggleAdStatus={handleToggleAdStatus}
          onSeedInitialData={handleSeedInitialData}
          onUpdateMemberRole={handleUpdateMemberRole}
          onSaveSettings={handleSaveSiteSettings}
          isSyncingFirestore={isSyncingFirestore}
          onManualSync={loadFirestoreData}
          onPushAdsToFirestore={handlePushAdsToFirestore}
          onImportBackup={handleImportBackup}
          currentRole={currentUserRole}
          onRoleChange={setCurrentUserRole}
        />

        {/* Admin Tool Create/Edit Modal */}
        <ToolFormModal
          isOpen={isToolFormOpen}
          onClose={() => {
            setIsToolFormOpen(false);
            setEditingTool(null);
          }}
          onSave={handleSaveTool}
          initialTool={editingTool}
          categories={CATEGORIES}
          isDarkMode={isDarkMode}
        />

        {/* Admin Ad Create/Edit Modal */}
        <AdFormModal
          isOpen={isAdFormOpen}
          onClose={() => {
            setIsAdFormOpen(false);
            setEditingAd(null);
          }}
          onSave={handleSaveAd}
          initialAd={editingAd}
          isDarkMode={isDarkMode}
        />

        {/* Prompts and Commands Library Modal */}
        <PromptsLibraryModal
          isOpen={isPromptsLibraryOpen}
          onClose={() => setIsPromptsLibraryOpen(false)}
          initialSelectedTool={promptsLibraryToolFilter}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  // Active Category object for SEO
  const activeCategoryObj = useMemo(() => {
    if (filterState.selectedCategory === 'all') return null;
    return CATEGORIES.find((c) => c.id === filterState.selectedCategory) || null;
  }, [filterState.selectedCategory]);

  // Root SEO: dynamically compute for Category or Home
  const rootSeoData = useMemo(() => {
    if (activeCategoryObj) {
      return getCategorySEO(activeCategoryObj, lang);
    }
    return getHomeSEO(lang, tools.length);
  }, [activeCategoryObj, lang, tools.length]);

  // Selected Knowledge Article resolution
  const selectedKnowledgeArticle = useMemo(() => {
    if (!selectedKnowledgeArticleSlug) return null;
    return getArticleBySlug(selectedKnowledgeArticleSlug) || null;
  }, [selectedKnowledgeArticleSlug]);

  const localizedSelectedArticle = useMemo(() => {
    if (!selectedKnowledgeArticle) return null;
    return getLocalizedArticle(selectedKnowledgeArticle, lang);
  }, [selectedKnowledgeArticle, lang]);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.ar;

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#f4f6f8] text-slate-900'
    }`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Dynamic Root SEO for Home or Active Category */}
      {!selectedToolForModal && !selectedDigitalTool && !isKnowledgeHubOpen && !is404 && (
        <SEO
          title={rootSeoData.title}
          description={rootSeoData.description}
          canonical={rootSeoData.canonical}
          robots={rootSeoData.robots}
          image={rootSeoData.image}
          type="website"
          jsonLd={rootSeoData.jsonLd}
          lang={lang}
          keywords={rootSeoData.keywords}
        />
      )}

      {/* Dynamic SEO for Knowledge Center Hub */}
      {isKnowledgeHubOpen && !selectedKnowledgeArticle && !is404 && (
        <SEO
          title={lang === 'ar' ? 'مركز المعرفة والأدلة الرقمية الشاملة | أدواتي AI' : lang === 'fr' ? 'Centre de connaissances et guides pratiques | Adawatai AI' : 'Knowledge Center & Practical Tech Guides | Adawatai AI'}
          description={t.knowledgeCenterDesc}
          canonical="https://adawatai.online/knowledge"
          robots="index, follow"
          type="website"
          lang={lang}
          keywords={['مركز المعرفة', 'شروحات الذكاء الاصطناعي', 'أدوات مجانية', 'شروحات تقنية', 'knowledge center', 'guides']}
          jsonLd={{
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: t.knowledgeCenter,
            description: t.knowledgeCenterDesc,
            url: 'https://adawatai.online/knowledge'
          }}
        />
      )}

      {/* Dynamic SEO for Knowledge Article */}
      {isKnowledgeHubOpen && selectedKnowledgeArticle && localizedSelectedArticle && !is404 && (
        <SEO
          title={`${localizedSelectedArticle.seoTitle} | adawatai.online`}
          description={localizedSelectedArticle.seoDescription}
          canonical={`https://adawatai.online/knowledge/${selectedKnowledgeArticle.slug}`}
          robots="index, follow"
          type="article"
          keywords={selectedKnowledgeArticle.keywords}
          lang={lang}
          jsonLd={[
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: localizedSelectedArticle.title,
              description: localizedSelectedArticle.description,
              datePublished: selectedKnowledgeArticle.publishedAt,
              dateModified: selectedKnowledgeArticle.updatedAt,
              author: {
                '@type': 'Organization',
                name: selectedKnowledgeArticle.author.name
              },
              publisher: {
                '@type': 'Organization',
                name: 'Adawatai AI',
                url: 'https://adawatai.online',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://adawatai.online/logo.svg'
                }
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://adawatai.online/knowledge/${selectedKnowledgeArticle.slug}`
              }
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: t.backToHome,
                  item: 'https://adawatai.online/'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: t.knowledgeCenter,
                  item: 'https://adawatai.online/knowledge'
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: localizedSelectedArticle.title,
                  item: `https://adawatai.online/knowledge/${selectedKnowledgeArticle.slug}`
                }
              ]
            },
            ...(selectedKnowledgeArticle.faq && selectedKnowledgeArticle.faq.length > 0 ? [{
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: selectedKnowledgeArticle.faq.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.answer
                }
              }))
            }] : [])
          ]}
        />
      )}

      {/* Global Notification Toast */}
      {globalNotification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-slate-900 text-white border border-indigo-500 shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top duration-200" dir="rtl">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{globalNotification}</span>
        </div>
      )}

      {/* Header */}
      <Header
        totalTools={tools.length}
        favoritesCount={favoritesCount}
        freeToolsCount={freeToolsCount}
        categoriesCount={CATEGORIES.length - 1}
        pendingSubmissionsCount={pendingSubmissionsCount}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenAddModal={() => setIsVisitorSubmitOpen(true)}
        onOpenSmartFinder={() => setIsSmartFinderOpen(true)}
        onOpenPromptsLibrary={() => {
          setPromptsLibraryToolFilter('all');
          setIsPromptsLibraryOpen(true);
        }}
        onOpenKnowledgeCenter={handleOpenKnowledgeCenter}
        onOpenAboutUs={() => setIsAboutUsOpen(true)}
        onOpenPrivacyPolicy={() => setIsPrivacyPolicyOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        onlyFavorites={filterState.onlyFavorites}
        onToggleFavoritesOnly={() => handleFilterChange({ onlyFavorites: !filterState.onlyFavorites })}
        isAdmin={currentUserRole === 'admin' || currentUserRole === 'editor'}
        lang={lang}
        onLanguageChange={handleLanguageChange}
      />

      {is404 ? (
        <NotFoundPage
          onBackHome={() => {
            setIs404(false);
            setIsKnowledgeHubOpen(false);
            setSelectedKnowledgeArticleSlug(null);
            setFilterState((prev) => ({ ...prev, selectedCategory: 'all', searchQuery: '' }));
            const currentUrl = new URL(window.location.href);
            currentUrl.pathname = '/';
            currentUrl.searchParams.delete('tool');
            currentUrl.searchParams.delete('category');
            currentUrl.searchParams.delete('q');
            const cleanSearch = currentUrl.searchParams.toString();
            window.history.pushState(null, '', '/' + (cleanSearch ? `?${cleanSearch}` : ''));
          }}
          onSearch={(q) => {
            setIs404(false);
            setIsKnowledgeHubOpen(false);
            setSelectedKnowledgeArticleSlug(null);
            handleFilterChange({ searchQuery: q });
          }}
          onSelectTool={(tool) => {
            setIs404(false);
            setIsKnowledgeHubOpen(false);
            setSelectedKnowledgeArticleSlug(null);
            handleOpenToolDetails(tool);
          }}
          suggestedTools={tools.slice(0, 4)}
          lang={lang}
          isDarkMode={isDarkMode}
        />
      ) : isKnowledgeHubOpen ? (
        selectedKnowledgeArticle ? (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ArticleView
              article={selectedKnowledgeArticle}
              lang={lang}
              isDarkMode={isDarkMode}
              onNavigateHome={handleCloseKnowledgeCenter}
              onNavigateKnowledge={handleOpenKnowledgeCenter}
              onSelectArticle={handleSelectKnowledgeArticle}
              onNavigateTool={handleNavigateToolFromArticle}
            />
          </main>
        ) : (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <KnowledgeHub
              lang={lang}
              isDarkMode={isDarkMode}
              onSelectArticle={handleSelectKnowledgeArticle}
              onNavigateHome={handleCloseKnowledgeCenter}
            />
          </main>
        )
      ) : selectedDigitalTool ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DigitalToolPage
            tool={selectedDigitalTool}
            lang={lang}
            isDarkMode={isDarkMode}
            onSelectTool={(tool) => {
              setSelectedDigitalTool(tool);
              try {
                const currentUrl = new URL(window.location.href);
                currentUrl.pathname = `/tools/${tool.slug}`;
                currentUrl.searchParams.delete('tool');
                window.history.pushState({ toolId: tool.slug }, '', currentUrl.toString());
              } catch (e) {}
            }}
            onBackToHome={handleCloseToolDetails}
          />
        </main>
      ) : (
        <>
          {/* Hero Section with Fuse.js instant fuzzy search */}
          <HeroSection
            searchQuery={filterState.searchQuery}
            onSearchChange={(q) => handleFilterChange({ searchQuery: q })}
            onSelectKeyword={(kw) => {
              if (kw === 'دعم اللغة العربية') {
                handleFilterChange({ onlyArabicSupport: true, searchQuery: '' });
              } else {
                handleFilterChange({ searchQuery: kw });
              }
            }}
            onOpenSmartFinder={() => setIsSmartFinderOpen(true)}
            onOpenPromptsLibrary={() => {
              setPromptsLibraryToolFilter('all');
              setIsPromptsLibraryOpen(true);
            }}
            onSelectCategory={(catId) => handleFilterChange({ selectedCategory: catId, searchQuery: '' })}
            isDarkMode={isDarkMode}
            bestSuggestion={searchResultData.bestSuggestion}
            hasTypoCorrection={searchResultData.hasTypoCorrection}
          />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top Sponsored Ad Banner (if enabled and active) */}
        {siteSettings.showSponsoredAds && topAd && (
          <SponsoredBanner
            ad={topAd}
            isDarkMode={isDarkMode}
          />
        )}

        {/* Filter Controls Bar */}
        <FilterBar
          categories={CATEGORIES}
          filterState={filterState}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalFilteredCount={filteredTools.length}
          totalToolsCount={tools.length}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
          isDarkMode={isDarkMode}
          categoryCounts={categoryCounts}
        />

        {/* Tools Display Grid / List */}
        {filteredTools.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
              : 'space-y-3'
          }>
            {filteredTools.map((tool, index) => {
              // Inject Sponsored Grid Card after 3rd item
              const shouldShowGridAd = index === 2 && siteSettings.showSponsoredAds && gridAd;

              return (
                <React.Fragment key={tool.id}>
                  <ToolCard
                    tool={tool}
                    isFavorite={!!favorites[tool.id]}
                    userRating={userRatings[tool.id]}
                    onToggleFavorite={handleToggleFavorite}
                    onRateTool={handleRateTool}
                    onOpenDetails={(t) => {
                      handleOpenToolDetails(t);
                    }}
                    onTagClick={(tag) => handleFilterChange({ searchQuery: tag })}
                    viewMode={viewMode}
                    isDarkMode={isDarkMode}
                  />

                  {shouldShowGridAd && viewMode === 'grid' && (
                    <SponsoredBanner
                      ad={gridAd}
                      isDarkMode={isDarkMode}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className={`p-12 text-center rounded-3xl border ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          } shadow-sm max-w-lg mx-auto my-12`}>
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-500 flex items-center justify-center mx-auto mb-4">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              لم يتم العثور على أدوات مطابقة
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              جرّب تغيير كلمات البحث، أو إزالة بعض الفلاتر المفعلة، أو اقترح إضافة هذه الأداة إلى المنصة عبر لوحة المقترحات.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <button
                onClick={handleResetFilters}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط الفلاتر</span>
              </button>
              <button
                onClick={() => setIsVisitorSubmitOpen(true)}
                className="w-full sm:w-auto px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>اقترح أداة جديدة</span>
              </button>
            </div>
          </div>
        )}
      </main>
      </>
      )}

      {/* Tool Detail Modal */}
      <ToolDetailModal
        tool={selectedToolForModal}
        isOpen={!!selectedToolForModal}
        onClose={handleCloseToolDetails}
        isFavorite={selectedToolForModal ? !!favorites[selectedToolForModal.id] : false}
        userRating={selectedToolForModal ? userRatings[selectedToolForModal.id] : undefined}
        userNote={selectedToolForModal ? userNotes[selectedToolForModal.id] || '' : ''}
        onToggleFavorite={handleToggleFavorite}
        onRateTool={handleRateTool}
        onSaveNote={handleSaveNote}
        onSelectTool={(tool) => {
          handleOpenToolDetails(tool);
        }}
        onOpenPromptsForTool={(toolName) => {
          setPromptsLibraryToolFilter(toolName);
          setIsPromptsLibraryOpen(true);
        }}
        onSelectCategory={(catId) => {
          handleCloseToolDetails();
          handleFilterChange({ selectedCategory: catId, searchQuery: '' });
          const el = document.getElementById('tools-catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectTag={(tag) => {
          handleCloseToolDetails();
          handleFilterChange({ searchQuery: tag });
          const el = document.getElementById('tools-catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        allTools={tools}
        advertisements={advertisements}
        isDarkMode={isDarkMode}
        lang={lang}
      />

      {/* Prompts and Commands Library Modal (مكتبة الأوامر والبرومبتات) */}
      <PromptsLibraryModal
        isOpen={isPromptsLibraryOpen}
        onClose={() => {
          setIsPromptsLibraryOpen(false);
          if (window.location.hash.includes('prompt')) {
            window.location.hash = '';
          }
        }}
        initialSelectedTool={promptsLibraryToolFilter}
        isDarkMode={isDarkMode}
      />

      {/* Admin Tool Create/Edit Modal */}
      <ToolFormModal
        isOpen={isToolFormOpen}
        onClose={() => {
          setIsToolFormOpen(false);
          setEditingTool(null);
        }}
        onSave={handleSaveTool}
        initialTool={editingTool}
        categories={CATEGORIES}
        isDarkMode={isDarkMode}
      />

      {/* Admin Ad Create/Edit Modal */}
      <AdFormModal
        isOpen={isAdFormOpen}
        onClose={() => {
          setIsAdFormOpen(false);
          setEditingAd(null);
        }}
        onSave={handleSaveAd}
        initialAd={editingAd}
        isDarkMode={isDarkMode}
      />

      {/* Visitor Suggest Tool Modal */}
      <VisitorSubmitModal
        isOpen={isVisitorSubmitOpen}
        onClose={() => setIsVisitorSubmitOpen(false)}
        categories={CATEGORIES}
        isDarkMode={isDarkMode}
        onSuccessNotification={showNotification}
      />

      {/* Quick AI Task Matcher / Assistant Modal */}
      <QuickAIAssistantModal
        isOpen={isSmartFinderOpen}
        onClose={() => setIsSmartFinderOpen(false)}
        allTools={tools}
        onSelectTool={(tool) => {
          setIsSmartFinderOpen(false);
          handleOpenToolDetails(tool);
        }}
        isDarkMode={isDarkMode}
      />

      {/* Secret Admin Authentication Modal */}
      <SecretAdminAuthModal
        isOpen={isSecretAuthModalOpen}
        onClose={() => setIsSecretAuthModalOpen(false)}
        onAuthenticateSuccess={handleSecretAuthSuccess}
        isDarkMode={isDarkMode}
      />

      {/* About Us Modal (adawatai.online) */}
      <AboutUsModal
        isOpen={isAboutUsOpen}
        onClose={() => {
          setIsAboutUsOpen(false);
          if (window.location.hash.includes('about')) {
            window.location.hash = '';
          }
        }}
        isDarkMode={isDarkMode}
        onOpenPrivacyPolicy={() => setIsPrivacyPolicyOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
        onOpenSuggestTool={() => setIsVisitorSubmitOpen(true)}
      />

      {/* Privacy Policy Modal (adawatai.online) */}
      <PrivacyPolicyModal
        isOpen={isPrivacyPolicyOpen}
        onClose={() => {
          setIsPrivacyPolicyOpen(false);
          if (window.location.hash.includes('privacy')) {
            window.location.hash = '';
          }
        }}
        isDarkMode={isDarkMode}
        onOpenAboutUs={() => setIsAboutUsOpen(true)}
      />

      {/* Contact Admin Modal (gmouhamed36@gmail.com / contact@adawatai.online) */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => {
          setIsContactModalOpen(false);
          if (window.location.hash.includes('contact')) {
            window.location.hash = '';
          }
        }}
        isDarkMode={isDarkMode}
      />

      {/* Footer */}
      <Footer
        categories={CATEGORIES}
        onSelectCategory={(catId) => {
          handleFilterChange({ selectedCategory: catId, searchQuery: '' });
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDarkMode={isDarkMode}
        onOpenPromptsLibrary={() => {
          setPromptsLibraryToolFilter('all');
          setIsPromptsLibraryOpen(true);
        }}
        onOpenKnowledgeCenter={handleOpenKnowledgeCenter}
        onOpenAboutUs={() => setIsAboutUsOpen(true)}
        onOpenPrivacyPolicy={() => setIsPrivacyPolicyOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
        onOpenAddModal={() => setIsVisitorSubmitOpen(true)}
        onOpenSecretAdmin={() => setIsSecretAuthModalOpen(true)}
        lang={lang}
        onLanguageChange={handleLanguageChange}
      />
      {/* Sticky Bottom Floating Banner Ad */}
      <StickyBottomAd
        ads={advertisements}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

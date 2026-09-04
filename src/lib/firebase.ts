import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  increment 
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { AiTool, ToolSubmission, Advertisement, Member, SiteSettings } from '../types';
import { INITIAL_TOOLS } from '../data/toolsData';

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);
export const auth = getAuth(app);

// Initial Default Ads
export const INITIAL_ADS: Advertisement[] = [
  {
    id: 'ad-top-1',
    title: '🚀 أطلق مشروعك القادم بالذكاء الاصطناعي مع Vercel v0',
    subtitle: 'ابنِ واجهات وتطبيقات تفاعلية متكاملة باللغة الطبيعية في دقائق.',
    ctaText: 'ابدأ مجاناً الآن',
    targetUrl: 'https://v0.dev',
    placement: 'top_banner',
    badgeText: 'إعلان مميز',
    isActive: true,
    clicks: 142,
    impressions: 1250,
    bgGradient: 'from-violet-600 via-indigo-600 to-purple-700'
  },
  {
    id: 'ad-grid-1',
    title: '🤖 كورس احتراف هندسة الأوامر (Prompt Engineering)',
    subtitle: 'تعلم كيف تستخرج أقصى طاقة من نماذج GPT-4 و Claude و Gemini لسوق العمل العربي.',
    ctaText: 'احصل على خصم 40%',
    targetUrl: 'https://deeplearning.ai',
    placement: 'grid_sponsored',
    badgeText: 'شريك الدليل',
    isActive: true,
    clicks: 89,
    impressions: 840,
    bgGradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'ad-sidebar-1',
    title: '🎓 حقيبة الباحث الأكاديمي والطلبة 2026',
    subtitle: 'أدوات SciSpace و Zotero و Overleaf مع قوالب جاهزة لمذكرات التخرج ورسائل الماجستير.',
    ctaText: 'استكشف الحقيبة',
    targetUrl: 'https://typeset.io',
    placement: 'sidebar',
    badgeText: 'موصى به للجامعيين',
    isActive: true,
    clicks: 64,
    impressions: 530,
    bgGradient: 'from-emerald-600 to-teal-800'
  },
  {
    id: 'ad-sticky-1',
    title: '🔥 جرب نموذج DeepSeek-R1 و Claude 3.7 مجاناً الآن!',
    subtitle: 'اكتشف أقوى بدائل الذكاء الاصطناعي المجانية والمفتوحة المصدر لعام 2026.',
    ctaText: 'استعرض البدائل',
    targetUrl: 'https://chat.deepseek.com',
    placement: 'sticky_bottom',
    badgeText: 'جديد 2026',
    isActive: true,
    clicks: 198,
    impressions: 2140,
    bgGradient: 'from-indigo-900 via-purple-900 to-slate-900'
  },
  {
    id: 'ad-article-top-1',
    title: '⚡ استضافة سحابية فائقة السرعة للمشاريع والمواقع',
    subtitle: 'سيرفرات سريعة تدعم تشغيل نماذج الذكاء الاصطناعي وبوتات التليجرام مع شهادة SSL مجانية.',
    ctaText: 'عرض خاص 50%',
    targetUrl: 'https://cloud.google.com',
    placement: 'in_article_top',
    badgeText: 'استضافة سحابية',
    isActive: true,
    clicks: 45,
    impressions: 410,
    bgGradient: 'from-blue-600 to-cyan-600'
  }
];

// Initial Members
export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'mem-admin-1',
    email: 'admin@aidirectory.ar',
    displayName: 'مدير الدليل الرئيسي (Super Admin)',
    role: 'admin',
    joinedAt: '2026-01-01',
    lastActive: 'الآن',
    status: 'active'
  },
  {
    id: 'mem-editor-1',
    email: 'editor@aidirectory.ar',
    displayName: 'محرر المحتوى والتقييمات',
    role: 'editor',
    joinedAt: '2026-02-15',
    lastActive: 'منذ ساعتين',
    status: 'active'
  },
  {
    id: 'mem-user-1',
    email: 'gmouhamed36@gmail.com',
    displayName: 'محمد (عضو مسجل)',
    role: 'admin',
    joinedAt: '2026-03-01',
    lastActive: 'الآن',
    status: 'active'
  }
];

// Default Settings
export const DEFAULT_SETTINGS: SiteSettings = {
  siteTitle: 'دليل أدوات الذكاء الاصطناعي العربي',
  siteTagline: 'المرجع العربي الأول لاكتشاف أفضل أدوات ونماذج الذكاء الاصطناعي مع المراجعات والتقييمات والتسعير',
  enableVisitorSubmissions: true,
  requireApprovalForSubmissions: true,
  showSponsoredAds: true,
  contactEmail: 'contact@aidirectory.ar',
  maintenanceMode: false
};

// ----------------- FIRESTORE DATA REPOSITORY ----------------- //

// Tools API
export async function fetchToolsFromFirestore(): Promise<AiTool[]> {
  try {
    const colRef = collection(db, 'tools');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      return [];
    }
    const list: AiTool[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      list.push({
        id: docSnap.id,
        ...data
      } as AiTool);
    });
    return list;
  } catch (error) {
    console.warn('Firestore fetch tools failed or offline, fallback', error);
    return [];
  }
}

export async function saveToolToFirestore(tool: AiTool): Promise<string> {
  try {
    const toolId = tool.id || `tool-${Date.now()}`;
    const docRef = doc(db, 'tools', toolId);
    await setDoc(docRef, {
      ...tool,
      id: toolId,
      status: tool.status || 'published',
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return toolId;
  } catch (error) {
    console.error('Failed to save tool in firestore', error);
    throw error;
  }
}

export async function deleteToolFromFirestore(toolId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'tools', toolId));
  } catch (error) {
    console.error('Failed to delete tool from firestore', error);
    throw error;
  }
}

export async function recordToolClick(toolId: string): Promise<void> {
  try {
    const docRef = doc(db, 'tools', toolId);
    await updateDoc(docRef, {
      clicksCount: increment(1)
    });
  } catch (e) {
    // Non-blocking
  }
}

// Quick Initial Seed Tools to Firestore
export async function seedInitialToolsToFirestore(): Promise<number> {
  try {
    let count = 0;
    for (const tool of INITIAL_TOOLS) {
      const docRef = doc(db, 'tools', tool.id);
      await setDoc(docRef, {
        ...tool,
        status: 'published',
        clicksCount: Math.floor(Math.random() * 250) + 50,
        addedDate: tool.addedDate || new Date().toISOString().split('T')[0]
      }, { merge: true });
      count++;
    }
    return count;
  } catch (error) {
    console.error('Failed to seed tools', error);
    throw error;
  }
}

// Submissions API (Visitor suggestions)
export async function submitToolProposal(sub: Omit<ToolSubmission, 'id' | 'status' | 'submittedAt'>): Promise<string> {
  try {
    const colRef = collection(db, 'submissions');
    const newDoc = await addDoc(colRef, {
      ...sub,
      status: 'pending',
      submittedAt: new Date().toISOString()
    });
    return newDoc.id;
  } catch (error) {
    console.error('Failed to submit tool proposal', error);
    throw error;
  }
}

export async function fetchSubmissions(): Promise<ToolSubmission[]> {
  try {
    const colRef = collection(db, 'submissions');
    const snapshot = await getDocs(colRef);
    const list: ToolSubmission[] = [];
    snapshot.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as ToolSubmission);
    });
    return list;
  } catch (error) {
    console.warn('Failed to fetch submissions', error);
    return [];
  }
}

export async function updateSubmissionStatus(subId: string, status: 'approved' | 'rejected'): Promise<void> {
  try {
    const docRef = doc(db, 'submissions', subId);
    await updateDoc(docRef, { status });
  } catch (error) {
    console.error('Failed to update submission status', error);
    throw error;
  }
}

export async function deleteSubmission(subId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'submissions', subId));
  } catch (error) {
    console.error('Failed to delete submission', error);
    throw error;
  }
}

// Ads & Sponsors API
export async function fetchAds(): Promise<Advertisement[]> {
  try {
    const colRef = collection(db, 'advertisements');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      return [];
    }
    const list: Advertisement[] = [];
    snapshot.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as Advertisement);
    });
    return list;
  } catch (error) {
    console.warn('Firestore fetch ads failed or offline', error);
    return [];
  }
}

export async function saveAd(ad: Advertisement): Promise<string> {
  try {
    const adId = ad.id || `ad-${Date.now()}`;
    const docRef = doc(db, 'advertisements', adId);
    await setDoc(docRef, { ...ad, id: adId }, { merge: true });
    return adId;
  } catch (error) {
    console.error('Failed to save ad', error);
    throw error;
  }
}

export async function deleteAd(adId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'advertisements', adId));
  } catch (error) {
    console.error('Failed to delete ad', error);
    throw error;
  }
}

export async function recordAdClick(adId: string): Promise<void> {
  try {
    const docRef = doc(db, 'advertisements', adId);
    await updateDoc(docRef, { clicks: increment(1) });
  } catch (e) {}
}

export async function recordAdImpression(adId: string): Promise<void> {
  try {
    const docRef = doc(db, 'advertisements', adId);
    await updateDoc(docRef, { impressions: increment(1) });
  } catch (e) {}
}

/**
 * Real-time subscription to advertisements collection.
 * Triggers callback immediately and on every live change in Firestore across all users.
 */
export function subscribeToAds(
  onUpdate: (ads: Advertisement[]) => void,
  onError?: (err: any) => void
): () => void {
  try {
    const colRef = collection(db, 'advertisements');
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const list: Advertisement[] = [];
        snapshot.forEach((d) => {
          list.push({ id: d.id, ...d.data() } as Advertisement);
        });
        onUpdate(list);
      },
      (error) => {
        console.warn('Real-time ads listener encountered an error:', error);
        if (onError) onError(error);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn('Failed to subscribe to ads collection:', err);
    return () => {};
  }
}

/**
 * Real-time subscription to tools collection.
 */
export function subscribeToTools(
  onUpdate: (tools: AiTool[]) => void,
  onError?: (err: any) => void
): () => void {
  try {
    const colRef = collection(db, 'tools');
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        if (snapshot.empty) {
          return;
        }
        const list: AiTool[] = [];
        snapshot.forEach((d) => {
          list.push({ id: d.id, ...d.data() } as AiTool);
        });
        onUpdate(list);
      },
      (error) => {
        console.warn('Real-time tools listener encountered an error:', error);
        if (onError) onError(error);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn('Failed to subscribe to tools collection:', err);
    return () => {};
  }
}

// Settings API
export async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const docRef = doc(db, 'settings', 'general');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { ...DEFAULT_SETTINGS, ...snap.data() } as SiteSettings;
    }
    return DEFAULT_SETTINGS;
  } catch (error) {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  try {
    const docRef = doc(db, 'settings', 'general');
    await setDoc(docRef, settings, { merge: true });
  } catch (error) {
    console.error('Failed to save site settings', error);
    throw error;
  }
}

import React, { useState, useRef } from 'react';
import { adminLogout, adminChangePassword } from '../lib/adminApi';
import { 
  AiTool, 
  Category, 
  ToolSubmission, 
  Advertisement, 
  Member, 
  SiteSettings 
} from '../types';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Inbox, 
  Megaphone, 
  Users, 
  Settings, 
  PlusCircle, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  ExternalLink, 
  Database, 
  Sparkles, 
  Star, 
  BarChart3, 
  Eye, 
  MousePointerClick, 
  Layers, 
  RotateCw, 
  Check, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  CloudUpload,
  CloudDownload,
  Download,
  Upload,
  RefreshCw,
  Server,
  Activity,
  AlertTriangle,
  Copy,
  Sliders,
  Globe,
  Percent,
  Zap,
  Maximize2,
  Lock,
  KeyRound
} from 'lucide-react';

interface AdminDashboardProps {
  tools: AiTool[];
  categories: Category[];
  submissions: ToolSubmission[];
  advertisements: Advertisement[];
  members: Member[];
  settings: SiteSettings;
  isDarkMode: boolean;
  onClose: () => void;
  onOpenAddTool: () => void;
  onEditTool: (tool: AiTool) => void;
  onDeleteTool: (toolId: string) => Promise<void>;
  onToggleToolFeatured: (tool: AiTool) => Promise<void>;
  onApproveSubmission: (sub: ToolSubmission) => Promise<void>;
  onRejectSubmission: (subId: string) => Promise<void>;
  onDeleteSubmission: (subId: string) => Promise<void>;
  onOpenAddAd: () => void;
  onEditAd: (ad: Advertisement) => void;
  onDeleteAd: (adId: string) => Promise<void>;
  onToggleAdStatus: (ad: Advertisement) => Promise<void>;
  onSeedInitialData: () => Promise<void>;
  onPushAdsToFirestore?: () => Promise<void>;
  onImportBackup?: (data: any) => Promise<void>;
  onUpdateMemberRole: (memberId: string, newRole: 'admin' | 'editor' | 'member') => void;
  onSaveSettings: (newSettings: SiteSettings) => Promise<void>;
  isSyncingFirestore: boolean;
  onManualSync: () => void;
  currentRole: 'admin' | 'editor' | 'member';
  onRoleChange: (role: 'admin' | 'editor' | 'member') => void;
}

type TabType = 'overview' | 'tools' | 'submissions' | 'ads' | 'members' | 'sync' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  tools,
  categories,
  submissions,
  advertisements,
  members,
  settings,
  isDarkMode,
  onClose,
  onOpenAddTool,
  onEditTool,
  onDeleteTool,
  onToggleToolFeatured,
  onApproveSubmission,
  onRejectSubmission,
  onDeleteSubmission,
  onOpenAddAd,
  onEditAd,
  onDeleteAd,
  onToggleAdStatus,
  onSeedInitialData,
  onPushAdsToFirestore,
  onImportBackup,
  onUpdateMemberRole,
  onSaveSettings,
  isSyncingFirestore,
  onManualSync,
  currentRole,
  onRoleChange
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [toolSearch, setToolSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isSeeding, setIsSeeding] = useState(false);
  const [isSyncingAds, setIsSyncingAds] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>(() => new Date().toLocaleTimeString('ar-EG'));
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Ad Management specific state
  const [adSearch, setAdSearch] = useState('');
  const [adPlacementFilter, setAdPlacementFilter] = useState('all');
  const [adStatusFilter, setAdStatusFilter] = useState('all');
  const [previewingAd, setPreviewingAd] = useState<Advertisement | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(settings);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Admin Password Change state
  const [pwdCurrent, setPwdCurrent] = useState('');
  const [pwdNew, setPwdNew] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdFeedback, setPwdFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwdNew.length < 8) {
      setPwdFeedback({ type: 'error', text: 'كلمة المرور الجديدة يجب ألا تقل عن 8 أحرف.' });
      return;
    }
    if (pwdNew !== pwdConfirm) {
      setPwdFeedback({ type: 'error', text: 'كلمتا المرور غير متطابقتين.' });
      return;
    }
    setPwdLoading(true);
    setPwdFeedback(null);
    const res = await adminChangePassword(pwdCurrent, pwdNew);
    setPwdLoading(false);
    if (res.success) {
      setPwdFeedback({ type: 'success', text: res.message || 'تم تحديث كلمة المرور بنجاح.' });
      setPwdCurrent('');
      setPwdNew('');
      setPwdConfirm('');
    } else {
      setPwdFeedback({ type: 'error', text: res.error || 'فشل في تحديث كلمة المرور.' });
    }
  };

  // In-App Safe Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'primary';
    onConfirm: () => Promise<void> | void;
    isLoading?: boolean;
  }>({
    isOpen: false,
    title: '',
    description: '',
    onConfirm: () => {},
  });

  // Filter tools in CMS table
  const filteredTools = tools.filter((tool) => {
    if (toolSearch.trim()) {
      const q = toolSearch.toLowerCase().trim();
      const match = tool.nameAr.toLowerCase().includes(q) || 
                    tool.nameEn.toLowerCase().includes(q) || 
                    tool.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (selectedCategoryFilter !== 'all' && tool.category !== selectedCategoryFilter) {
      return false;
    }
    if (statusFilter !== 'all') {
      const st = tool.status || 'published';
      if (st !== statusFilter) return false;
    }
    return true;
  });

  // Filter ads in Ads Management tab
  const filteredAds = advertisements.filter((ad) => {
    if (adSearch.trim()) {
      const q = adSearch.toLowerCase().trim();
      const match = ad.title.toLowerCase().includes(q) || 
                    ad.subtitle.toLowerCase().includes(q) || 
                    ad.targetUrl.toLowerCase().includes(q) ||
                    (ad.badgeText && ad.badgeText.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (adPlacementFilter !== 'all' && ad.placement !== adPlacementFilter) {
      return false;
    }
    if (adStatusFilter !== 'all') {
      if (adStatusFilter === 'active' && !ad.isActive) return false;
      if (adStatusFilter === 'inactive' && ad.isActive) return false;
    }
    return true;
  });

  const totalAdImpressions = advertisements.reduce((acc, a) => acc + (a.impressions || 0), 0);
  const totalAdClicks = advertisements.reduce((acc, a) => acc + (a.clicks || 0), 0);
  const overallAdCTR = totalAdImpressions > 0 ? ((totalAdClicks / totalAdImpressions) * 100).toFixed(1) : '0.0';

  const pendingSubmissions = submissions.filter((s) => s.status === 'pending');
  const activeAdsCount = advertisements.filter((a) => a.isActive).length;
  const totalClicks = tools.reduce((sum, t) => sum + (t.clicksCount || 0), 0);
  const totalFeatured = tools.filter((t) => t.isFeatured).length;

  const handleDuplicateAd = (ad: Advertisement) => {
    const duplicated: Advertisement = {
      ...ad,
      id: `ad-${Date.now()}`,
      title: `${ad.title} (نسخة مسودة)`,
      isActive: false,
      clicks: 0,
      impressions: 0
    };
    onEditAd(duplicated);
  };

  const showToast = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  const handleManualSyncClick = async () => {
    try {
      await onManualSync();
      setLastSyncTime(new Date().toLocaleTimeString('ar-EG'));
      showToast('تمت مزامنة وتحديث كافة البيانات من السحاب بنجاح');
    } catch (e: any) {
      showToast('فشل التحديث من السحاب: ' + (e.message || ''));
    }
  };

  const handleSeed = () => {
    setConfirmModal({
      isOpen: true,
      title: 'مزامنة وحقن الأدوات التأسيسية',
      description: 'هل تريد مزامنة وحقن كافة أدوات الدليل التأسيسية (30+ أداة) في قاعدة بيانات Firestore السحابية؟',
      confirmText: 'نعم، ابدأ المزامنة',
      cancelText: 'تراجع',
      variant: 'primary',
      onConfirm: async () => {
        try {
          setIsSeeding(true);
          await onSeedInitialData();
          setLastSyncTime(new Date().toLocaleTimeString('ar-EG'));
          showToast('تمت مزامنة وحفظ الأدوات التأسيسية في Firestore بنجاح!');
        } catch (err: any) {
          showToast('حدث خطأ أثناء التغذية الأولية: ' + (err.message || ''));
        } finally {
          setIsSeeding(false);
        }
      },
    });
  };

  const handleSyncAds = async () => {
    if (!onPushAdsToFirestore) return;
    try {
      setIsSyncingAds(true);
      await onPushAdsToFirestore();
      setLastSyncTime(new Date().toLocaleTimeString('ar-EG'));
      showToast('تمت مزامنة كافة الإعلانات والرعاة إلى Firestore بنجاح');
    } catch (err: any) {
      showToast('حدث خطأ أثناء مزامنة الإعلانات: ' + (err.message || ''));
    } finally {
      setIsSyncingAds(false);
    }
  };

  const handleExportBackup = () => {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      tools,
      advertisements,
      submissions,
      settings: settingsForm
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `adawatai-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('تم تصدير ملف النسخة الاحتياطية بنجاح');
  };

  const handleImportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (!parsed.tools && !parsed.advertisements && !parsed.settings) {
          throw new Error('ملف غير صالح، يجب أن يحتوي على بيانات أدوات أو إعلانات.');
        }

        const countTools = parsed.tools?.length || 0;
        const countAds = parsed.advertisements?.length || 0;

        setConfirmModal({
          isOpen: true,
          title: 'استيراد نسخة احتياطية',
          description: `تم العثور على ${countTools} أداة و ${countAds} إعلان في الملف. هل تريد استيرادها ومزامنتها الآن؟`,
          confirmText: 'نعم، استيراد ومزامنة',
          cancelText: 'إلغاء',
          variant: 'primary',
          onConfirm: async () => {
            if (onImportBackup) {
              await onImportBackup(parsed);
            }
            setLastSyncTime(new Date().toLocaleTimeString('ar-EG'));
            showToast('تم استيراد النسخة الاحتياطية وتحديث السحاب بنجاح');
          },
        });
      } catch (err: any) {
        showToast('خطأ في استيراد الملف: ' + err.message);
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };
    reader.readAsText(file);
  };

  const handleDeleteAdWithConfirm = (ad: Advertisement) => {
    setConfirmModal({
      isOpen: true,
      title: 'تأكيد حذف الإعلان',
      description: `هل أنت متأكد من رغبتك في حذف الإعلان "${ad.title}" بشكل نهائي؟ سيتم إزالته فوراً من قاعدة البيانات السحابية ومواضع العرض.`,
      confirmText: 'نعم، حذف الإعلان',
      cancelText: 'إلغاء',
      variant: 'danger',
      onConfirm: async () => {
        try {
          await onDeleteAd(ad.id);
          showToast(`تم حذف الإعلان "${ad.title}" بنجاح`);
        } catch (err: any) {
          showToast('حدث خطأ أثناء حذف الإعلان: ' + (err?.message || ''));
        }
      },
    });
  };

  const handleDeleteToolWithConfirm = (tool: AiTool) => {
    setConfirmModal({
      isOpen: true,
      title: 'تأكيد حذف الأداة',
      description: `هل أنت متأكد من رغبتك في حذف أداة "${tool.nameAr}" (${tool.nameEn}) نهائياً من قاعدة البيانات ودليل الأدوات؟`,
      confirmText: 'نعم، حذف الأداة',
      cancelText: 'إلغاء',
      variant: 'danger',
      onConfirm: async () => {
        try {
          await onDeleteTool(tool.id);
          showToast(`تم حذف أداة "${tool.nameAr}" بنجاح`);
        } catch (err: any) {
          showToast('حدث خطأ أثناء حذف الأداة: ' + (err?.message || ''));
        }
      },
    });
  };

  const handleDeleteSubmissionWithConfirm = (sub: ToolSubmission) => {
    setConfirmModal({
      isOpen: true,
      title: 'تأكيد حذف مقترح الأداة',
      description: `هل أنت متأكد من حذف طلب إضافة أداة "${sub.nameAr}" المُرسل من الزائر؟`,
      confirmText: 'نعم، حذف المقترح',
      cancelText: 'إلغاء',
      variant: 'danger',
      onConfirm: async () => {
        try {
          await onDeleteSubmission(sub.id);
          showToast('تم حذف سجل المقترح بنجاح');
        } catch (err: any) {
          showToast('حدث خطأ أثناء حذف المقترح: ' + (err?.message || ''));
        }
      },
    });
  };

  const handleToggleAdStatusWithToast = async (ad: Advertisement) => {
    try {
      await onToggleAdStatus(ad);
      showToast(ad.isActive ? `تم تعطيل الإعلان "${ad.title}"` : `تم تفعيل ونشر الإعلان "${ad.title}"`);
    } catch (err: any) {
      showToast('حدث خطأ أثناء تعديل حالة الإعلان');
    }
  };

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSavingSettings(true);
      await onSaveSettings(settingsForm);
      showToast('تم حفظ إعدادات الدليل في Firestore بنجاح');
    } catch (err: any) {
      showToast('فشل حفظ الإعدادات');
    } finally {
      setIsSavingSettings(false);
    }
  };

  return (
    <div className={`min-h-screen ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`} dir="rtl">
      
      {/* WordPress-Style Admin Top Navigation Bar */}
      <header className={`sticky top-0 z-40 border-b ${
        isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-slate-900 border-slate-800 text-white'
      } px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-md`}>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/dashboard') || window.location.pathname.startsWith('/control')) {
                window.history.pushState(null, '', '/');
              }
              window.location.hash = '';
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-bold transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة للدليل الرئيسي</span>
          </button>

          <div className="flex items-center gap-2 border-r border-slate-700 pr-3">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold tracking-tight text-slate-200">
              لوحة الإدارة المستقلة (Admin Portal)
            </span>
            <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-800">
              جلسة سرية آمنة
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>متصل بـ Firebase Firestore</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Sync Button */}
          <button
            onClick={onManualSync}
            disabled={isSyncingFirestore}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            title="تحديث البيانات من السيرفر"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isSyncingFirestore ? 'animate-spin text-indigo-400' : ''}`} />
            <span>تحديث السحاب</span>
          </button>

          {/* Role switcher for testing */}
          <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-300 hidden sm:inline">الصلاحية:</span>
            <select
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value as any)}
              className="bg-transparent text-white font-bold outline-hidden text-xs cursor-pointer"
            >
              <option value="admin" className="bg-slate-800 text-white">مدير عام (Admin)</option>
              <option value="editor" className="bg-slate-800 text-white">محرر (Editor)</option>
              <option value="member" className="bg-slate-800 text-white">عضو مسجل (Member)</option>
            </select>
          </div>

          {/* Open Main Site Preview in New Tab */}
          <button
            onClick={() => window.open(window.location.origin + window.location.pathname, '_blank')}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            title="فتح واجهة الموقع للزوار في نافذة / تبويب جديد"
          >
            <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
            <span>معاينة الموقع للزوار</span>
          </button>

          {/* Logout / Lock Button */}
          <button
            onClick={async () => {
              try {
                await adminLogout();
              } catch (e) {}
              if (window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/dashboard') || window.location.pathname.startsWith('/control')) {
                window.history.pushState(null, '', '/');
              }
              window.location.hash = '';
              onClose();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-md bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700 transition-colors"
            title="تسجيل الخروج الآمن وإبطال الجلسة"
          >
            <XCircle className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">تسجيل الخروج</span>
          </button>
        </div>
      </header>

      {/* Toast Alert */}
      {feedbackMessage && (
        <div className="fixed bottom-6 left-6 z-50 p-4 rounded-2xl bg-slate-900 border border-indigo-500 text-white shadow-2xl flex items-center gap-3 text-xs animate-in slide-in-from-bottom duration-200" dir="rtl">
          <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-semibold">{feedbackMessage}</span>
        </div>
      )}

      {/* Main Admin Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0 space-y-1.5">
          <div className={`p-4 rounded-2xl border ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          } shadow-xs space-y-1`}>
            
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>لوحة المؤشرات العامة</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('tools')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'tools'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderKanban className="w-4 h-4" />
                <span>إدارة الأدوات (Tools CMS)</span>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {tools.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('submissions')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'submissions'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4" />
                <span>مقترحات الزوار</span>
              </div>
              {pendingSubmissions.length > 0 ? (
                <span className="px-2 py-0.5 rounded-md text-[10px] bg-amber-500 text-white font-bold animate-pulse">
                  {pendingSubmissions.length} جديد
                </span>
              ) : (
                <span className="text-[10px] text-slate-400">0</span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('ads')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'ads'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Megaphone className="w-4 h-4" />
                <span>إدارة الإعلانات والرعاة</span>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {advertisements.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('members')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'members'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>الأعضاء والمشرفين</span>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {members.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('sync')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'sync'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <RefreshCw className={`w-4 h-4 ${isSyncingFirestore ? 'animate-spin text-amber-300' : ''}`} />
                <span>مركز المزامنة والسحاب</span>
              </div>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'settings'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4" />
                <span>إعدادات الدليل</span>
              </div>
            </button>
          </div>

          {/* Seed / Populate Database helper card */}
          <div className={`p-4 rounded-2xl border ${
            isDarkMode ? 'bg-indigo-950/30 border-indigo-500/20' : 'bg-indigo-50/70 border-indigo-200/70'
          } space-y-2.5`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                <Database className="w-4 h-4" />
                <span>المزامنة السريعة</span>
              </div>
              <span className="text-[10px] text-slate-500">{lastSyncTime}</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              تحكم كامل ومباشر في مزامنة البيانات سحابياً أو تنزيل نسخة احتياطية.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleManualSyncClick}
                disabled={isSyncingFirestore}
                className="py-1.5 px-2 text-[11px] font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center gap-1 transition-colors disabled:opacity-50"
              >
                <RotateCw className={`w-3 h-3 ${isSyncingFirestore ? 'animate-spin' : ''}`} />
                <span>تحديث</span>
              </button>
              <button
                onClick={() => setActiveTab('sync')}
                className="py-1.5 px-2 text-[11px] font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-1 transition-colors"
              >
                <Server className="w-3 h-3" />
                <span>لوحة السحاب</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Panel Content */}
        <main className="flex-1 space-y-6">

          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`p-5 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                } shadow-xs`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">إجمالي الأدوات</span>
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <FolderKanban className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">
                    {tools.length}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{totalFeatured} أداة مميزة</span>
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                } shadow-xs`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">مقترحات بانتظار المراجعة</span>
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                      <Inbox className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">
                    {pendingSubmissions.length}
                  </div>
                  <div className="text-[11px] text-amber-600 font-semibold mt-1">
                    من زوار ورواد الموقع
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                } shadow-xs`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">إجمالي النقرات والزيارات</span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <MousePointerClick className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">
                    {totalClicks}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    نقرة نحو المواقع الرسمية
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                } shadow-xs`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">الإعلانات النشطة</span>
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                      <Megaphone className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">
                    {activeAdsCount}
                  </div>
                  <div className="text-[11px] text-purple-600 font-semibold mt-1">
                    بانرات ورعاة الدليل
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Submissions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Pending Submissions Quick Card */}
                <div className={`p-5 rounded-3xl border ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                } shadow-xs space-y-4`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Inbox className="w-4 h-4 text-amber-500" />
                      <span>أحدث مقترحات الزوار المعلقة</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('submissions')}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      عرض الكل ({submissions.length})
                    </button>
                  </div>

                  {pendingSubmissions.length > 0 ? (
                    <div className="space-y-3">
                      {pendingSubmissions.slice(0, 3).map((sub) => (
                        <div
                          key={sub.id}
                          className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-3"
                        >
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                              {sub.nameAr} {sub.nameEn && `(${sub.nameEn})`}
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                              {sub.descriptionAr || sub.websiteUrl}
                            </p>
                            <span className="text-[10px] text-slate-400">
                              بواسطة: {sub.submittedBy}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => onApproveSubmission(sub)}
                              className="px-2.5 py-1.5 text-[11px] font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 transition-colors"
                              title="موافقة ونشر في الدليل"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>قبول</span>
                            </button>
                            <button
                              onClick={() => onRejectSubmission(sub.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                              title="رفض المقترح"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-xs text-slate-400">
                      لا توجد مقترحات معلقة حالياً
                    </div>
                  )}
                </div>

                {/* Top Clicked Tools */}
                <div className={`p-5 rounded-3xl border ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                } shadow-xs space-y-4`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-indigo-500" />
                      <span>الأدوات الأكثر تفاعلاً وزيارة</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('tools')}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      إدارة الأدوات
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {tools
                      .slice()
                      .sort((a, b) => (b.clicksCount || 0) - (a.clicksCount || 0))
                      .slice(0, 4)
                      .map((tool, idx) => (
                        <div
                          key={tool.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/40"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center">
                              #{idx + 1}
                            </span>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                                {tool.nameAr} ({tool.nameEn})
                              </h4>
                              <span className="text-[10px] text-slate-400">
                                {tool.pricingAr}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                            <span>{tool.clicksCount || 0} نقرة</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 2. TOOLS MANAGEMENT TAB */}
          {activeTab === 'tools' && (
            <div className={`p-6 rounded-3xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            } shadow-xs space-y-5`}>
              
              {/* Header with Search & Add Tool button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    إدارة أدوات الذكاء الاصطناعي ({tools.length})
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    تعديل، حذف، إضافة، وتمييز الأدوات في قاعدة بيانات Firestore مباشرة
                  </p>
                </div>

                <button
                  onClick={onOpenAddTool}
                  className="px-4 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>إضافة أداة جديدة</span>
                </button>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={toolSearch}
                    onChange={(e) => setToolSearch(e.target.value)}
                    placeholder="ابحث بالاسم العربي أو الإنجليزي..."
                    className="w-full pr-9 pl-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>

                <div>
                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  >
                    <option value="all">كافة التصنيفات ({categories.length - 1})</option>
                    {categories.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameAr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  >
                    <option value="all">كافة الحالات</option>
                    <option value="published">منشور للجمهور</option>
                    <option value="draft">مسودة داخلية</option>
                    <option value="pending">بانتظار المراجعة</option>
                  </select>
                </div>
              </div>

              {/* Tools Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      <th className="p-3">الأداة</th>
                      <th className="p-3">التصنيف</th>
                      <th className="p-3">التسعير</th>
                      <th className="p-3">التقييم</th>
                      <th className="p-3">النقرات</th>
                      <th className="p-3">الحالة</th>
                      <th className="p-3 text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredTools.map((tool) => (
                      <tr key={tool.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
                              {tool.nameEn.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <span>{tool.nameAr}</span>
                                <span className="text-slate-400 font-normal">({tool.nameEn})</span>
                                {tool.isFeatured && (
                                  <span className="px-1.5 py-0.5 rounded-sm text-[9px] bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold">
                                    مميز
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400 line-clamp-1">
                                {tool.taglineAr}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="p-3 text-slate-600 dark:text-slate-300">
                          {categories.find((c) => c.id === tool.category)?.nameAr || tool.category}
                        </td>

                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {tool.pricingAr}
                          </span>
                        </td>

                        <td className="p-3">
                          <div className="flex items-center gap-1 text-amber-500 font-bold">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{tool.rating}</span>
                          </div>
                        </td>

                        <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">
                          {tool.clicksCount || 0}
                        </td>

                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            (tool.status || 'published') === 'published'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          }`}>
                            {(tool.status || 'published') === 'published' ? 'منشور' : 'مسودة'}
                          </span>
                        </td>

                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => onToggleToolFeatured(tool)}
                              className={`p-1.5 rounded-lg transition-colors ${
                                tool.isFeatured
                                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                                  : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                              }`}
                              title={tool.isFeatured ? 'إلغاء التمييز' : 'تمييز كأداة مختارة'}
                            >
                              <Star className={`w-4 h-4 ${tool.isFeatured ? 'fill-current' : ''}`} />
                            </button>

                            <button
                              onClick={() => onEditTool(tool)}
                              className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-lg transition-colors"
                              title="تعديل بيانات الأداة"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <a
                              href={tool.websiteUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                              title="زيارة الموقع الرسمي"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>

                            <button
                              onClick={() => handleDeleteToolWithConfirm(tool)}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                              title="حذف الأداة"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. VISITOR SUBMISSIONS TAB */}
          {activeTab === 'submissions' && (
            <div className={`p-6 rounded-3xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            } shadow-xs space-y-5`}>
              
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  مقترحات الأدوات من الزوار ({submissions.length})
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  مراجعة الأدوات المقترحة من زوار الدليل والموافقة على إدراجها في قاعدة بيانات Firestore فوراً
                </p>
              </div>

              {submissions.length > 0 ? (
                <div className="space-y-3">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        sub.status === 'pending'
                          ? isDarkMode
                            ? 'bg-slate-800/80 border-amber-500/30'
                            : 'bg-amber-50/40 border-amber-200/80'
                          : isDarkMode
                          ? 'bg-slate-900 border-slate-800'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                              {sub.nameAr} {sub.nameEn && `(${sub.nameEn})`}
                            </h4>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              sub.status === 'pending'
                                ? 'bg-amber-500 text-white'
                                : sub.status === 'approved'
                                ? 'bg-emerald-500 text-white'
                                : 'bg-rose-500 text-white'
                            }`}>
                              {sub.status === 'pending' ? 'معلق للمراجعة' : sub.status === 'approved' ? 'تم القبول' : 'مرفوض'}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">
                            {sub.descriptionAr || sub.taglineAr}
                          </p>

                          <div className="flex items-center gap-4 text-[11px] text-slate-400 flex-wrap">
                            <span>الرابط: <a href={sub.websiteUrl} target="_blank" rel="noreferrer" className="text-indigo-500 underline">{sub.websiteUrl}</a></span>
                            <span>المقترح: {sub.submittedBy} {sub.submitterEmail && `(${sub.submitterEmail})`}</span>
                            <span>التصنيف: {categories.find((c) => c.id === sub.category)?.nameAr || sub.category}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          {sub.status === 'pending' && (
                            <>
                              <button
                                onClick={() => onApproveSubmission(sub)}
                                className="px-3.5 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-colors shadow-xs"
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span>قبول ونشر في الدليل</span>
                              </button>

                              <button
                                onClick={() => onRejectSubmission(sub.id)}
                                className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-colors"
                              >
                                رفض
                              </button>
                            </>
                          )}

                          <button
                            onClick={() => handleDeleteSubmissionWithConfirm(sub)}
                            className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
                            title="حذف السجل"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-xs text-slate-400">
                  لم يتم إرسال أي مقترحات من الزوار حتى الآن
                </div>
              )}
            </div>
          )}

          {/* 4. ADS & SPONSORS TAB */}
          {activeTab === 'ads' && (
            <div className="space-y-6">
              
              {/* Ad KPIs Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`p-4 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
                } shadow-xs space-y-1`}>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>إجمالي الإعلانات</span>
                    <Megaphone className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {advertisements.length} <span className="text-xs font-normal text-slate-400">حملة</span>
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    {activeAdsCount} نشط ومعروض حالياً
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
                } shadow-xs space-y-1`}>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>مرات الظهور (Impressions)</span>
                    <Eye className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {totalAdImpressions.toLocaleString('ar-EG')}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    عبر كافة مواضع الدليل
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
                } shadow-xs space-y-1`}>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>إجمالي النقرات (Clicks)</span>
                    <MousePointerClick className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {totalAdClicks.toLocaleString('ar-EG')}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    زيارات محولة للرعاة
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
                } shadow-xs space-y-1`}>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>معدل النقر (CTR)</span>
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {overallAdCTR}%
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    أداء تفاعل ممتاز
                  </div>
                </div>
              </div>

              {/* Main Ads Management Container */}
              <div className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              } shadow-xs space-y-5`}>
                
                {/* Header & Main Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>إدارة البانرات الترويجية وعروض الرعاة</span>
                      <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                        {filteredAds.length} من {advertisements.length}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      تعديل وإنشاء وإدارة جميع الحملات الإعلانية ومواضع ظهورها حصریاً عبر هذه البوابة
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {onPushAdsToFirestore && (
                      <button
                        onClick={handleSyncAds}
                        disabled={isSyncingAds}
                        className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-xs disabled:opacity-50"
                        title="مزامنة وحفظ جميع الإعلانات في Firebase Firestore"
                      >
                        <RotateCw className={`w-3.5 h-3.5 ${isSyncingAds ? 'animate-spin text-indigo-500' : ''}`} />
                        <span>{isSyncingAds ? 'جاري المزامنة...' : 'مزامنة السحاب'}</span>
                      </button>
                    )}

                    <button
                      onClick={onOpenAddAd}
                      className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>إضافة إعلان أو راعي جديد</span>
                    </button>
                  </div>
                </div>

                {/* Filters and Search Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-6 relative">
                    <input
                      type="text"
                      value={adSearch}
                      onChange={(e) => setAdSearch(e.target.value)}
                      placeholder="بحث في الإعلانات حسب العنوان، الوصف، أو الرابط..."
                      className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-hidden"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>

                  <div className="sm:col-span-3">
                    <select
                      value={adPlacementFilter}
                      onChange={(e) => setAdPlacementFilter(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-hidden font-medium"
                    >
                      <option value="all">📍 جميع مواضع الظهور</option>
                      <option value="top_banner">🔝 بانر علوي رئيسي</option>
                      <option value="sticky_bottom">📌 شريط عائم سفلي</option>
                      <option value="grid_sponsored">🎴 بطاقة ضمن الشبكة</option>
                      <option value="in_article_top">📑 أعلى تفاصيل الأداة</option>
                      <option value="in_article_bottom">📑 أسفل تفاصيل الأداة</option>
                      <option value="footer">🏁 بانر التذييل</option>
                      <option value="sidebar">📐 الشريط الجانبي</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <select
                      value={adStatusFilter}
                      onChange={(e) => setAdStatusFilter(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-hidden font-medium"
                    >
                      <option value="all">⚡ جميع الحالات</option>
                      <option value="active">🟢 النشطة والمعروضة فقط</option>
                      <option value="inactive">⚪ المعطلة والمخفية فقط</option>
                    </select>
                  </div>
                </div>

                {/* Interactive Placement Simulator Modal/Box (if an ad is selected for live preview) */}
                {previewingAd && (
                  <div className="p-4.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                          معاينة حية للإعلان: "{previewingAd.title}" (الموضع: {
                            previewingAd.placement === 'top_banner' ? 'بانر علوي رئيسي' :
                            previewingAd.placement === 'sticky_bottom' ? 'شريط عائم سفلي' :
                            previewingAd.placement === 'grid_sponsored' ? 'بطاقة مدمجة بالشبكة' :
                            previewingAd.placement === 'in_article_top' ? 'أعلى تفاصيل الأداة' :
                            previewingAd.placement === 'in_article_bottom' ? 'أسفل تفاصيل الأداة' :
                            previewingAd.placement === 'footer' ? 'بانر التذييل' : 'الشريط الجانبي'
                          })
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEditAd(previewingAd)}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                        >
                          تعديل الإعلان
                        </button>
                        <button
                          onClick={() => setPreviewingAd(null)}
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Rendered Mockup Container */}
                    <div className={`p-4 rounded-2xl border ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}>
                      {previewingAd.placement === 'sticky_bottom' ? (
                        <div className={`p-3.5 rounded-2xl border shadow-md flex items-center justify-between gap-3 ${
                          isDarkMode ? 'bg-slate-900 border-indigo-500/30' : 'bg-white border-indigo-200'
                        }`}>
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0">
                              <Sparkles className="w-4 h-4 text-amber-300" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                                  {previewingAd.badgeText || 'إعلان مميز'}
                                </span>
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                  {previewingAd.title}
                                </h4>
                              </div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-md">
                                {previewingAd.subtitle}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => window.open(previewingAd.targetUrl, '_blank')}
                            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 text-white shrink-0 flex items-center gap-1"
                          >
                            <span>{previewingAd.ctaText || 'زيارة العرض'}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      ) : previewingAd.placement === 'grid_sponsored' ? (
                        <div className={`p-4 rounded-2xl border max-w-sm mx-auto ${
                          isDarkMode ? 'bg-slate-900 border-amber-500/30' : 'bg-white border-amber-200'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                              {previewingAd.badgeText || 'شريك موثوق'}
                            </span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">إعلان <ExternalLink className="w-2.5 h-2.5" /></span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                            {previewingAd.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                            {previewingAd.subtitle}
                          </p>
                          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center justify-between">
                            <span>{previewingAd.ctaText || 'زيارة العرض'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      ) : (
                        <div className={`p-4 rounded-2xl border ${
                          isDarkMode ? 'bg-slate-900 border-indigo-500/30' : 'bg-gradient-to-r from-indigo-50 via-purple-50 to-white border-indigo-200'
                        }`}>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                                <Megaphone className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-600 text-white">
                                    {previewingAd.badgeText || 'إعلان برعاية'}
                                  </span>
                                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                                    {previewingAd.title}
                                  </h4>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl">
                                  {previewingAd.subtitle}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => window.open(previewingAd.targetUrl, '_blank')}
                              className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white shrink-0 self-end sm:self-center flex items-center gap-1.5 shadow-sm"
                            >
                              <span>{previewingAd.ctaText || 'اكتشف المزيد'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Ads Cards Grid */}
                {filteredAds.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredAds.map((ad) => {
                      const adCTR = (ad.impressions && ad.impressions > 0)
                        ? (((ad.clicks || 0) / ad.impressions) * 100).toFixed(1)
                        : '0.0';

                      return (
                        <div
                          key={ad.id}
                          className={`p-5 rounded-2xl border ${
                            isDarkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'
                          } space-y-3.5 transition-all hover:border-indigo-500/50 hover:shadow-xs flex flex-col justify-between`}
                        >
                          <div className="space-y-2.5">
                            {/* Placement Badge & Active Switch */}
                            <div className="flex items-center justify-between">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
                                {ad.placement === 'top_banner'
                                  ? '🔝 بانر علوي رئيسي'
                                  : ad.placement === 'grid_sponsored'
                                  ? '🎴 بطاقة ضمن الشبكة'
                                  : ad.placement === 'sidebar'
                                  ? '📐 الشريط الجانبي'
                                  : ad.placement === 'in_article_top'
                                  ? '📑 أعلى تفاصيل الأداة'
                                  : ad.placement === 'in_article_bottom'
                                  ? '📑 أسفل تفاصيل الأداة'
                                  : ad.placement === 'sticky_bottom'
                                  ? '📌 شريط عائم سفلي'
                                  : '🏁 بانر التذييل'}
                              </span>

                              <button
                                onClick={() => handleToggleAdStatusWithToast(ad)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                                  ad.isActive
                                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500 hover:bg-slate-300'
                                }`}
                                title="انقر للتبديل بين التفعيل والتعطيل"
                              >
                                {ad.isActive ? '● نشط ومعروض' : '○ معطل مؤقتاً'}
                              </button>
                            </div>

                            {/* Ad Title & Subtitle */}
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {ad.badgeText && (
                                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                    {ad.badgeText}
                                  </span>
                                )}
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                  {ad.title}
                                </h4>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                                {ad.subtitle || 'لا يوجد نص توضيحي'}
                              </p>
                            </div>

                            {/* Target URL Preview */}
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 truncate" dir="ltr">
                              <Globe className="w-3 h-3 shrink-0 text-slate-400" />
                              <span className="truncate">{ad.targetUrl}</span>
                            </div>
                          </div>

                          {/* Stats & Actions Footer */}
                          <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 space-y-2.5">
                            <div className="flex items-center justify-between text-xs text-slate-500">
                              <div className="flex items-center gap-3">
                                <span>النقرات: <strong className="text-slate-900 dark:text-white font-bold">{ad.clicks || 0}</strong></span>
                                <span>الظهور: <strong className="text-slate-900 dark:text-white font-bold">{ad.impressions || 0}</strong></span>
                                <span>CTR: <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{adCTR}%</strong></span>
                              </div>

                              <button
                                onClick={() => setPreviewingAd(previewingAd?.id === ad.id ? null : ad)}
                                className={`text-[11px] font-bold px-2 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                                  previewingAd?.id === ad.id
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100'
                                }`}
                              >
                                <Eye className="w-3 h-3" />
                                <span>معاينة</span>
                              </button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between gap-1.5 pt-1">
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => window.open(ad.targetUrl, '_blank', 'noopener,noreferrer')}
                                  className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-slate-200/70 dark:bg-slate-700/70 text-slate-700 dark:text-slate-200 hover:bg-slate-300 transition-colors flex items-center gap-1"
                                  title="فتح الرابط المستهدف في تبويب جديد"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  <span>فحص الرابط</span>
                                </button>

                                <button
                                  onClick={() => handleDuplicateAd(ad)}
                                  className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-slate-200/70 dark:bg-slate-700/70 text-slate-700 dark:text-slate-200 hover:bg-slate-300 transition-colors flex items-center gap-1"
                                  title="إنشاء نسخة مكررة من هذا الإعلان لتعديلها"
                                >
                                  <Copy className="w-3 h-3" />
                                  <span>نسخ كمسودة</span>
                                </button>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => onEditAd(ad)}
                                  className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 rounded-lg transition-colors"
                                  title="تعديل بيانات الإعلان"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteAdWithConfirm(ad)}
                                  className="p-1.5 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
                                  title="حذف الإعلان نهائياً"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className={`p-12 text-center rounded-2xl border border-dashed ${
                    isDarkMode ? 'border-slate-800' : 'border-slate-200'
                  } space-y-3`}>
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
                      <Megaphone className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {adSearch || adPlacementFilter !== 'all' || adStatusFilter !== 'all'
                        ? 'لم يتم العثور على إعلانات تطابق معايير الفرز الحالية'
                        : 'لا توجد أي إعلانات مسجلة في النظام'}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      {adSearch || adPlacementFilter !== 'all' || adStatusFilter !== 'all'
                        ? 'جرب مسح شريط البحث أو اختيار موضع مختلف لعرض الإعلانات الأخرى.'
                        : 'يمكنك إنشاء بنرات وعروض للشركاء والرعاة لزيادة أرباح وعوائد المنصة.'}
                    </p>
                    <div className="flex items-center justify-center gap-2 pt-2">
                      {(adSearch || adPlacementFilter !== 'all' || adStatusFilter !== 'all') && (
                        <button
                          onClick={() => {
                            setAdSearch('');
                            setAdPlacementFilter('all');
                            setAdStatusFilter('all');
                          }}
                          className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 transition-colors"
                        >
                          إعادة ضبط الفلاتر
                        </button>
                      )}
                      <button
                        onClick={onOpenAddAd}
                        className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white inline-flex items-center gap-2 transition-all shadow-xs"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>إضافة إعلان جديد الآن</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Placement Guide Reference Box */}
                <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    دليل مواضع ظهور الإعلانات في الدليل:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                      <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">🔝 بانر علوي رئيسي:</strong>
                      يظهر أعلى الصفحة الرئيسية تحت البحث لجذب أقصى نسبة تفاعل.
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                      <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">📌 شريط عائم سفلي:</strong>
                      شريط ثابت أسفل شاشات الجوال وسطح المكتب مع زر تحويل فوري.
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                      <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">🎴 بطاقة ضمن الشبكة:</strong>
                      تظهر كبطاقة مدمجة طبيعياً بين كروت الأدوات الذكية.
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                      <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">📑 أعلى/أسفل تفاصيل الأداة:</strong>
                      يستهدف الزوار المهتمين بعمق أثناء قراءة شروحات الأدوات.
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                      <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">🏁 بانر التذييل:</strong>
                      دعوة نهائية مميزة للإجراء تظهر أسفل محتوى الدليل.
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                      <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">📐 الشريط الجانبي:</strong>
                      مخصص للعروض طويلة الأجل في القوائم الجانبية.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 5. MEMBERS TAB */}
          {activeTab === 'members' && (
            <div className={`p-6 rounded-3xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            } shadow-xs space-y-5`}>
              
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  إدارة الأعضاء والصلاحيات (WordPress Users & Roles)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  إدارة المشرفين، المحررين، والأعضاء المسجلين في المنصة
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      <th className="p-3">المستخدم</th>
                      <th className="p-3">البريد الإلكتروني</th>
                      <th className="p-3">الدور / الصلاحية</th>
                      <th className="p-3">تاريخ الانضمام</th>
                      <th className="p-3">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {members.map((member) => (
                      <tr key={member.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                        <td className="p-3 font-bold text-slate-900 dark:text-white">
                          {member.displayName}
                        </td>
                        <td className="p-3 text-slate-600 dark:text-slate-300 font-mono text-[11px]" dir="ltr">
                          {member.email}
                        </td>
                        <td className="p-3">
                          <select
                            value={member.role}
                            onChange={(e) => onUpdateMemberRole(member.id, e.target.value as any)}
                            className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400"
                          >
                            <option value="admin">مدير (Admin)</option>
                            <option value="editor">محرر (Editor)</option>
                            <option value="member">عضو (Member)</option>
                          </select>
                        </td>
                        <td className="p-3 text-slate-500">
                          {member.joinedAt}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
                            نشط
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. SYNC & DATABASE CENTER TAB (مركز المزامنة وقاعدة البيانات) */}
          {activeTab === 'sync' && (
            <div className={`p-6 rounded-3xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            } shadow-xs space-y-6`}>
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      مركز التحكم في المزامنة والسحاب (Cloud Sync & DB Center)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    إدارة شاملة للمزامنة مع Firebase Firestore، التغذية التأسيسية، وتصدير/استيراد النسخ الاحتياطية
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleManualSyncClick}
                    disabled={isSyncingFirestore}
                    className="px-4 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
                  >
                    <RotateCw className={`w-4 h-4 ${isSyncingFirestore ? 'animate-spin' : ''}`} />
                    <span>{isSyncingFirestore ? 'جاري المزامنة...' : 'مزامنة وتحديث فوري الآن'}</span>
                  </button>
                </div>
              </div>

              {/* Status Overview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`p-4 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500 font-medium">حالة الاتصال السحابي</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <Server className="w-4 h-4" />
                    <span>متصل بـ Firestore</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">آخر فحص: {lastSyncTime}</p>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500 font-medium">الأدوات المتزامنة</span>
                    <FolderKanban className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div className="text-xl font-black text-slate-900 dark:text-white">
                    {tools.length} <span className="text-xs font-normal text-slate-400">أداة مسجلة</span>
                  </div>
                  <p className="text-[10px] text-emerald-500 mt-1">جاهزة ومتاحة للزوار</p>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500 font-medium">الإعلانات والرعاة</span>
                    <Megaphone className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-xl font-black text-slate-900 dark:text-white">
                    {advertisements.length} <span className="text-xs font-normal text-slate-400">بانر ({activeAdsCount} نشط)</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">تحديث دوري للنقرات</p>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500 font-medium">مقترحات المجتمع</span>
                    <Inbox className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="text-xl font-black text-slate-900 dark:text-white">
                    {submissions.length} <span className="text-xs font-normal text-slate-400">مقترح ({pendingSubmissions.length} معلق)</span>
                  </div>
                  <p className="text-[10px] text-indigo-400 mt-1">مزامنة سحابية مستمرة</p>
                </div>
              </div>

              {/* Main Actions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* 1. Cloud Database Operations */}
                <div className={`p-5 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200'
                } space-y-4`}>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                    <CloudUpload className="w-4 h-4 text-indigo-500" />
                    <span>عمليات المزامنة السحابية المباشرة</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    تحكم في تدفق البيانات بين المتصفح وسيرفرات Google Cloud Firestore لضمان استمرارية الوصول والتحديث.
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <button
                      onClick={handleSeed}
                      disabled={isSeeding}
                      className="w-full p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-between text-xs font-bold transition-all shadow-xs disabled:opacity-50"
                    >
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        <span>تغذية وحقن جميع الأدوات في Firestore (Seed All)</span>
                      </div>
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md">
                        {isSeeding ? 'جاري الحقن...' : '30+ أداة'}
                      </span>
                    </button>

                    {onPushAdsToFirestore && (
                      <button
                        onClick={handleSyncAds}
                        disabled={isSyncingAds}
                        className="w-full p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-between text-xs font-semibold transition-all disabled:opacity-50"
                      >
                        <div className="flex items-center gap-2">
                          <Megaphone className="w-4 h-4 text-amber-400" />
                          <span>مزامنة كافة الإعلانات والرعاة إلى السحاب</span>
                        </div>
                        <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded-md">
                          {advertisements.length} إعلان
                        </span>
                      </button>
                    )}

                    <button
                      onClick={handleManualSyncClick}
                      disabled={isSyncingFirestore}
                      className="w-full p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-between text-xs font-semibold transition-all disabled:opacity-50"
                    >
                      <div className="flex items-center gap-2">
                        <CloudDownload className="w-4 h-4 text-emerald-400" />
                        <span>سحب وتحديث كافة البيانات من السحاب</span>
                      </div>
                      <RotateCw className={`w-3.5 h-3.5 ${isSyncingFirestore ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* 2. Backup & Restore (تصدير واستيراد) */}
                <div className={`p-5 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200'
                } space-y-4`}>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                    <Download className="w-4 h-4 text-purple-500" />
                    <span>إدارة النسخ الاحتياطي (Backup & Restore)</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    قم بتنزيل نسخة كاملة من بيانات المنصة بملف JSON للحفظ الخارجي، أو استعادة نسخة سابقة في أي وقت.
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <button
                      onClick={handleExportBackup}
                      className="w-full p-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-between text-xs font-bold transition-all shadow-xs"
                    >
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>تصدير نسخة احتياطية كاملة (Export JSON Backup)</span>
                      </div>
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md">.json</span>
                    </button>

                    <div className="relative">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept=".json"
                        onChange={handleImportFileChange}
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-between text-xs font-semibold transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <Upload className="w-4 h-4 text-cyan-400" />
                          <span>استيراد واستعادة نسخة احتياطية (Import JSON)</span>
                        </div>
                        <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded-md">رفع ملف</span>
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-[11px] flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>النسخ الاحتياطي يشمل الأدوات، الإعلانات، المقترحات، وإعدادات المنصة.</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 7. SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className={`p-6 rounded-3xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            } shadow-xs space-y-5`}>
              
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  إعدادات الدليل العامة (Site Settings)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  تعديل عنوان الدليل، الشعار، سياسات قبول المقترحات، وحفظها سحابياً في Firestore
                </p>
              </div>

              <form onSubmit={handleSettingsSubmit} className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    اسم المنصة / الدليل
                  </label>
                  <input
                    type="text"
                    value={settingsForm.siteTitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, siteTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    الوصف التعريفي (Tagline)
                  </label>
                  <textarea
                    rows={2}
                    value={settingsForm.siteTagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, siteTagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-hidden focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 space-y-3">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.enableVisitorSubmissions}
                      onChange={(e) => setSettingsForm({ ...settingsForm, enableVisitorSubmissions: e.target.checked })}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      السماح للزوار باقتراح أدوات ذكاء اصطناعي جديدة
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.requireApprovalForSubmissions}
                      onChange={(e) => setSettingsForm({ ...settingsForm, requireApprovalForSubmissions: e.target.checked })}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      اشتراط موافقة الإدارة قبل نشر اقتراحات الزوار
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.showSponsoredAds}
                      onChange={(e) => setSettingsForm({ ...settingsForm, showSponsoredAds: e.target.checked })}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      تفعيل ظهور البانرات الترويجية وبطاقات الرعاة في الدليل
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSavingSettings}
                  className="px-6 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  <Settings className="w-4 h-4" />
                  <span>{isSavingSettings ? 'جاري الحفظ...' : 'حفظ الإعدادات في Firestore'}</span>
                </button>
              </form>

              {/* Password & Security Section */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 max-w-2xl">
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-indigo-500" />
                    <span>أمان حساب الإدارة وتغيير كلمة المرور</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    تحديث كلمة مرور الدخول الإدارية المحمية بتشفير خادمي متقدم (Scrypt)
                  </p>
                </div>

                {pwdFeedback && (
                  <div className={`mb-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
                    pwdFeedback.type === 'success'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                  }`}>
                    {pwdFeedback.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
                    <span>{pwdFeedback.text}</span>
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      كلمة المرور الحالية
                    </label>
                    <input
                      type="password"
                      required
                      dir="ltr"
                      value={pwdCurrent}
                      onChange={(e) => setPwdCurrent(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        كلمة المرور الجديدة (8 أحرف على الأقل)
                      </label>
                      <input
                        type="password"
                        required
                        dir="ltr"
                        value={pwdNew}
                        onChange={(e) => setPwdNew(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        تأكيد كلمة المرور الجديدة
                      </label>
                      <input
                        type="password"
                        required
                        dir="ltr"
                        value={pwdConfirm}
                        onChange={(e) => setPwdConfirm(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={pwdLoading}
                    className="mt-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>{pwdLoading ? 'جاري التحديث...' : 'تحديث كلمة المرور'}</span>
                  </button>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* In-App Confirmation Modal Dialog */}
      {confirmModal.isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs"
          dir="rtl"
        >
          <div 
            className={`w-full max-w-md rounded-3xl shadow-2xl p-6 border transition-all ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-800 text-white' 
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3.5 rounded-2xl shrink-0 ${
                confirmModal.variant === 'danger'
                  ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                  : confirmModal.variant === 'warning'
                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                  : 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20'
              }`}>
                {confirmModal.variant === 'danger' ? (
                  <Trash2 className="w-6 h-6" />
                ) : confirmModal.variant === 'warning' ? (
                  <AlertTriangle className="w-6 h-6" />
                ) : (
                  <Database className="w-6 h-6" />
                )}
              </div>

              <div className="flex-1 space-y-1.5 pt-0.5">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {confirmModal.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {confirmModal.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                disabled={confirmModal.isLoading}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {confirmModal.cancelText || 'إلغاء'}
              </button>

              <button
                type="button"
                onClick={async () => {
                  setConfirmModal((prev) => ({ ...prev, isLoading: true }));
                  try {
                    await confirmModal.onConfirm();
                  } finally {
                    setConfirmModal((prev) => ({ ...prev, isOpen: false, isLoading: false }));
                  }
                }}
                disabled={confirmModal.isLoading}
                className={`px-5 py-2 text-xs font-bold rounded-xl text-white transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50 ${
                  confirmModal.variant === 'danger'
                    ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/25'
                    : confirmModal.variant === 'warning'
                    ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/25'
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/25'
                }`}
              >
                {confirmModal.isLoading && <RotateCw className="w-3.5 h-3.5 animate-spin" />}
                <span>{confirmModal.confirmText || 'تأكيد'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

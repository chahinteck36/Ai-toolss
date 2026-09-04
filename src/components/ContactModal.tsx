import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Send, 
  Check, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  MessageSquare, 
  Globe, 
  User, 
  HelpCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const targetEmail = 'gmouhamed36@gmail.com';
  const domainEmail = 'contact@adawatai.online';

  const handleCopyEmail = (addressToCopy: string) => {
    navigator.clipboard.writeText(addressToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendViaMailto = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(subject.trim() || `رسالة من زائر عبر دليل أدواتي AI - ${name || 'زائر'}`);
    const mailBody = encodeURIComponent(
      `الاسم: ${name || 'غير محدد'}\nالبريد الإلكتروني للرد: ${email || 'غير محدد'}\nالموقع: adawatai.online\n\nنص الرسالة:\n${message}\n\n--- أرسلت عبر نموذج الاتصال المباشر`
    );

    const mailtoUrl = `mailto:${targetEmail}?cc=${domainEmail}&subject=${mailSubject}&body=${mailBody}`;
    window.open(mailtoUrl, '_blank');
    setSubmitted(true);
  };

  const openInGmailWeb = () => {
    const mailSubject = encodeURIComponent(subject.trim() || `استفسار عبر دليل أدواتي AI - adawatai.online`);
    const mailBody = encodeURIComponent(
      `الاسم: ${name || 'زائر الموقع'}\nالبريد الإلكتروني: ${email || ''}\n\nالرسالة:\n${message || ''}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&cc=${domainEmail}&su=${mailSubject}&body=${mailBody}`;
    window.open(gmailUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" dir="rtl">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
        <div 
          className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all animate-in zoom-in-95 duration-200 ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 text-white shadow-indigo-950/40' 
              : 'bg-white border-slate-200 text-slate-900 shadow-slate-300/50'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute left-4 top-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-4 mb-6 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 shrink-0">
              <Mail className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-1">
                <Globe className="w-3 h-3" />
                <span>دعم مباشر: adawatai.online</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                تواصل مع إدارة الموقع
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                تسعدنا استفساراتكم واقتراحاتكم للشراكات وتطوير الدليل
              </p>
            </div>
          </div>

          {/* Direct Email Cards */}
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Domain Email */}
            <div className={`p-3.5 rounded-2xl border flex flex-col justify-between ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">البريد الرسمي للموقع</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-mono">Domain</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white truncate">
                  contact@adawatai.online
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyEmail(domainEmail)}
                  className="p-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 transition-colors shrink-0"
                  title="نسخ الإيميل"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Direct Connected Gmail */}
            <div className={`p-3.5 rounded-2xl border flex flex-col justify-between ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-indigo-50/40 border-indigo-100'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>بريد الاستقبال المباشر (Gmail)</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono">Connected</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white truncate">
                  gmouhamed36@gmail.com
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyEmail(targetEmail)}
                  className="p-1.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 transition-colors shrink-0"
                  title="نسخ الإيميل"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <button
              type="button"
              onClick={openInGmailWeb}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-500/20 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>إرسال مباشرة عبر تطبيق Gmail</span>
            </button>

            <a
              href={`mailto:${targetEmail}?cc=${domainEmail}&subject=استفسار من موقع أدواتي AI`}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20 transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>فتح تطبيق البريد الافتراضي</span>
            </a>
          </div>

          {/* Direct Message Form */}
          <form onSubmit={handleSendViaMailto} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  اسمك الكريم
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="محمد أحمد"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  بريدك الإلكتروني للرد
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                موضوع الرسالة
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="اقتراح أداة جديدة / استفسار / إعلان ورعاية..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                نص الرسالة أو الاستفسار *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب رسالتك أو استفسارك هنا بكل وضوح..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
              />
            </div>

            {submitted && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>تم تجهيز وإرسال رسالتك مباشرة إلى بريد الإدارة (gmouhamed36@gmail.com). سيتم الرد عليك في أقرب وقت.</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>الرد عادة خلال 24 ساعة</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md shadow-indigo-500/25 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>إرسال الرسالة للإدارة</span>
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

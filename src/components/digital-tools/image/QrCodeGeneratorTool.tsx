import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Copy, Check, Sparkles } from 'lucide-react';

interface QrCodeGeneratorToolProps {
  lang: string;
  isDarkMode: boolean;
}

export const QrCodeGeneratorTool: React.FC<QrCodeGeneratorToolProps> = ({ lang, isDarkMode }) => {
  const isAr = lang === 'ar';
  const [content, setContent] = useState('https://adawatai.online');
  const [qrType, setQrType] = useState<'url' | 'text' | 'wifi' | 'phone'>('url');
  const [darkColor, setDarkColor] = useState('#0f172a');
  const [lightColor, setLightColor] = useState('#ffffff');
  const [size, setSize] = useState(320);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // WiFi helper state
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPass, setWifiPass] = useState('');
  const [wifiType, setWifiType] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');

  // Phone helper
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    generateQr();
  }, [content, qrType, darkColor, lightColor, size, wifiSsid, wifiPass, wifiType, phoneNumber]);

  const generateQr = async () => {
    let payload = content;

    if (qrType === 'wifi') {
      payload = `WIFI:T:${wifiType};S:${wifiSsid};P:${wifiPass};;`;
    } else if (qrType === 'phone') {
      payload = `tel:${phoneNumber.trim()}`;
    }

    if (!payload.trim()) return;

    try {
      const url = await QRCode.toDataURL(payload, {
        width: size,
        margin: 2,
        color: {
          dark: darkColor,
          light: lightColor
        },
        errorCorrectionLevel: 'H'
      });
      setQrDataUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  const copyImage = async () => {
    if (!qrDataUrl) return;
    try {
      const res = await fetch(qrDataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-6`}>
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'url', labelAr: 'رابط موقع (URL)', labelEn: 'Website URL' },
          { id: 'text', labelAr: 'نص عادي', labelEn: 'Plain Text' },
          { id: 'wifi', labelAr: 'شبكة Wi-Fi', labelEn: 'Wi-Fi Network' },
          { id: 'phone', labelAr: 'رقم هاتف', labelEn: 'Phone Call' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setQrType(t.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              qrType === t.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-750' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isAr ? t.labelAr : t.labelEn}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-4">
          {qrType === 'url' && (
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                {isAr ? 'أدخل رابط الموقع (URL):' : 'Enter Website URL:'}
              </label>
              <input
                type="url"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="https://example.com"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
          )}

          {qrType === 'text' && (
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                {isAr ? 'أدخل النص المطلوب تشفيره:' : 'Enter Text Content:'}
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                placeholder="اكتب هنا أي نص..."
                className={`w-full p-3.5 rounded-xl border text-sm ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
          )}

          {qrType === 'wifi' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  {isAr ? 'اسم الشبكة (SSID):' : 'Network Name (SSID):'}
                </label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  placeholder="MyHomeWiFi"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  {isAr ? 'كلمة المرور:' : 'Password:'}
                </label>
                <input
                  type="password"
                  value={wifiPass}
                  onChange={(e) => setWifiPass(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>
          )}

          {qrType === 'phone' && (
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                {isAr ? 'رقم الهاتف مع رمز الدولة:' : 'Phone Number with Country Code:'}
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+966500000000"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                {isAr ? 'لون النقاط:' : 'QR Dots Color:'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={darkColor}
                  onChange={(e) => setDarkColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
                />
                <span className="text-xs font-mono text-slate-500">{darkColor}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                {isAr ? 'لون الخلفية:' : 'Background Color:'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={lightColor}
                  onChange={(e) => setLightColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
                />
                <span className="text-xs font-mono text-slate-500">{lightColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
          {qrDataUrl && (
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-4">
              <img
                src={qrDataUrl}
                alt="Generated QR Code"
                className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
              />
            </div>
          )}

          <div className="flex items-center gap-2 w-full">
            <button
              onClick={copyImage}
              className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>{isAr ? 'تم النسخ!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{isAr ? 'نسخ الباركود' : 'Copy'}</span>
                </>
              )}
            </button>

            {qrDataUrl && (
              <a
                href={qrDataUrl}
                download="adawatai_qrcode.png"
                className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تحميل PNG' : 'Download PNG'}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

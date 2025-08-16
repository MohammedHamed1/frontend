import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// بيانات الفروع الأساسية من الصفحة الرئيسية
const branches = [
  {
    id: 1,
    name: 'مغاسل أناقة الموتر الاوتوماتيكيه للسيارات',
    address: 'طريق الملك فهد الفرعي، العارض، الرياض 13334، المملكة العربية السعودية',
    phone: '+966568801020',
    hours: 'مفتوح على مدار الساعة',
    directions: 'https://maps.google.com/?q=24.900000,46.600000',
  },
  {
    id: 2,
    name: 'مغاسل رجل الفقاعات للسيارات',
    address: 'Prince Faisal bin Bandar Road, النرجس، الرياض 12211، المملكة العربية السعودية',
    phone: '+966507762505',
    hours: 'مفتوح على مدار الساعة',
    directions: 'https://maps.google.com/?q=24.850000,46.700000',
  },
  {
    id: 3,
    name: 'مغسلة القوه الذكيه للسيارات',
    address: 'القنا، النرجس، السهام &, الرياض المملكة العربية السعودية',
    phone: '+966547321924',
    hours: 'مفتوح على مدار الساعة',
    directions: 'https://maps.google.com/?q=24.800000,46.650000',
  },
  {
    id: 4,
    name: 'مغسلة اللمسة الناعمة الاوتوماتيكية',
    address: 'طريق الملك فهد، الصحافة، الرياض, المملكة العربية السعودية',
    phone: '+966541222253',
    hours: 'مفتوح على مدار الساعة',
    directions: 'https://maps.google.com/?q=24.774265,46.738586',
  },
];

function generateBarcode() {
  return 'PAYPASS-' + Math.floor(Math.random() * 1000000);
}

export default function WashingPlaceDetails() {
  const [barcode, setBarcode] = useState('');
  const [pkg, setPkg] = useState(null);
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setBarcode(generateBarcode());
    const stored = localStorage.getItem('selectedPackage');
    if (stored) setPkg(JSON.parse(stored));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f9fdfa] py-8">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-6 mt-6">
        <div className="flex flex-col items-center mb-6">
          <div className="text-green-600 text-3xl mb-2">🎉</div>
          <h2 className="font-bold text-2xl mb-1 text-green-700">تم الطلب بنجاح!</h2>
          <div className="text-gray-500 mb-4 text-center">يمكنك الآن استخدام الباركود في أي فرع من فروعنا</div>
        </div>
        {/* الباركود */}
        <div className="bg-green-500 rounded-xl p-6 flex flex-col items-center mb-6">
          <div className="text-5xl text-white mb-2">▣ ▣<br/>▣ ▣</div>
          <div className="text-white text-lg font-bold mb-2">باركود الباقة</div>
          <div className="bg-white rounded px-4 py-2 font-mono text-green-700 text-lg mb-2">{barcode}</div>
          <button className="bg-green-700 text-white rounded px-4 py-1 text-sm font-bold mb-2" onClick={() => {navigator.clipboard.writeText(barcode)}}>نسخ الباركود</button>
        </div>
        {/* تفاصيل الباقة */}
        {pkg && (
          <div className="bg-green-50 rounded-xl p-4 mb-4">
            <div className="font-bold mb-1">{pkg.name}</div>
            <div className="text-xs text-gray-500 mb-1">نوع السيارة: {pkg.type}</div>
            <div className="text-xs text-gray-500 mb-1">عدد الغسلات: {pkg.washes}</div>
            <div className="text-xs text-gray-400 line-through mb-1">{pkg.original} ريال</div>
            <div className="text-green-600 text-xs font-bold">{pkg.final} ريال</div>
          </div>
        )}
        {/* الفروع */}
        <div className="mb-4">
          <div className="font-bold mb-2">اختر الفرع لاستخدام الباركود:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {branches.map(branch => (
              <div key={branch.id} className="border rounded-lg p-3 bg-gray-50 cursor-pointer hover:bg-green-100 transition" onClick={() => window.open(branch.directions, '_blank')}>
                <div className="font-bold text-green-700 mb-1">{branch.name}</div>
                <div className="text-xs text-gray-600 mb-1">{branch.address}</div>
                <div className="text-xs text-gray-500 mb-1">ساعات العمل: {branch.hours}</div>
                <div className="text-xs text-gray-500">هاتف: <span dir="ltr">{branch.phone}</span></div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-6 items-center">
          <button className="bg-gray-200 rounded px-4 py-2 font-bold" onClick={() => navigate('/')}>العودة للرئيسية</button>
          <div className="relative">
            <button
              className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2 font-bold"
              onClick={async () => {
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: 'باركود الباقة',
                      text: `باركود الباقة: ${barcode}`,
                      url: window.location.href
                    });
                  } catch (e) {}
                } else {
                  setShowShare(v => !v);
                }
              }}
            >
              مشاركة الباركود
            </button>
            {showShare && (
              <div className="absolute bottom-12 left-0 bg-white border rounded-lg shadow-lg p-3 flex flex-col gap-2 z-50 min-w-[180px]">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white rounded px-2 py-1 text-xs font-bold text-right"
                  onClick={() => { window.open(`https://wa.me/?text=باركود الباقة: ${barcode}`, '_blank'); setShowShare(false); }}
                >
                  واتساب
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded px-2 py-1 text-xs font-bold text-right"
                  onClick={() => { window.open(`https://t.me/share/url?url=&text=باركود الباقة: ${barcode}`, '_blank'); setShowShare(false); }}
                >
                  تيليجرام
                </button>
                <button
                  className="bg-sky-500 hover:bg-sky-600 text-white rounded px-2 py-1 text-xs font-bold text-right"
                  onClick={() => { window.open(`https://twitter.com/intent/tweet?text=باركود الباقة: ${barcode}`, '_blank'); setShowShare(false); }}
                >
                  تويتر
                </button>
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-black rounded px-2 py-1 text-xs font-bold text-right"
                  onClick={() => { window.open(`https://www.snapchat.com/scan?attachmentUrl=باركود الباقة: ${barcode}`, '_blank'); setShowShare(false); }}
                >
                  سناب شات
                </button>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
} 
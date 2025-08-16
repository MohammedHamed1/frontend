import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const paymentMethods = [
  {
    id: 'applepay',
    label: 'Apple Pay',
    desc: 'دفع آمن وسريع',
    icon: '',
    color: 'bg-black',
    text: 'text-white',
  },
  {
    id: 'credit',
    label: 'بطاقة ائتمان',
    desc: 'أي بطاقة ائتمان',
    icon: '💳',
    color: 'bg-purple-700',
    text: 'text-white',
  },
];

// أسماء الباقات بالعربية
const packageNames = {
  basic: 'الباقة الأساسية',
  advanced: 'الباقة المتقدمة',
  premium: 'الباقة الشاملة',
  vip: 'باقة VIP'
};

// ألوان الباقات
const packageColors = {
  basic: 'teal',
  advanced: 'green',
  premium: 'orange',
  vip: 'purple'
};

export default function Checkout() {
  const [selected, setSelected] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // التمرير إلى أعلى الصفحة عند تحميل المكون
    window.scrollTo(0, 0);
    
    // قراءة بيانات الباقة المختارة من localStorage
    const packageData = localStorage.getItem('selectedPackage');
    if (packageData) {
      setSelectedPackage(JSON.parse(packageData));
    } else {
      // إذا لم تكن هناك باقة مختارة، العودة إلى الصفحة الرئيسية
      navigate('/');
    }
  }, [navigate]);

  const handleNext = () => {
    if (selected) {
      navigate('/barcode');
    }
  };

  if (!selectedPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fdfa]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  const packageColor = packageColors[selectedPackage.type];

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fdfa] overflow-y-auto">
      <div className="flex-1 flex justify-center pb-32 pt-24">
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
          {/* طرق الدفع */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex-1 max-w-md">
            <h2 className="font-bold text-xl mb-6 flex items-center gap-2">طريقة الدفع <span className="text-green-600 text-lg">🟩</span></h2>
            <div className="space-y-4 mb-6">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelected(method.id)}
                  className={`w-full flex items-center justify-between border rounded-xl px-4 py-3 transition text-right focus:outline-none ${selected === method.id ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'}`}
                >
                  <div>
                    <div className="font-bold text-base flex items-center gap-2">
                      {method.label}
                      <span className={`inline-block ml-2 text-xl ${method.color} ${method.text} rounded-full w-8 h-8 flex items-center justify-center`}>{method.icon}</span>
                  </div>
                    <div className="text-xs text-gray-500 mt-1">{method.desc}</div>
                  </div>
                  {selected === method.id && <span className="text-green-500 text-2xl font-bold">✓</span>}
                </button>
              ))}
            </div>
                  <button
              className={`w-full py-3 rounded-xl font-bold text-gray-500 ${selected ? 'bg-green-500 text-white hover:bg-green-600 cursor-pointer' : 'bg-gray-100 cursor-not-allowed'}`}
              disabled={!selected}
              onClick={handleNext}
            >
              اختر طريقة الدفع
                  </button>
            <div className="mt-4 p-3 rounded-lg bg-green-50 text-green-700 text-xs flex items-center gap-2">
              <span>دفع آمن ومشفر</span>
              <span className="ml-2">🔒</span>
              <span className="text-gray-500">جميع المعاملات محمية بأحدث تقنيات التشفير</span>
            </div>
              </div>
          {/* ملخص الباقة */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex-1 max-w-md">
            <h2 className="font-bold text-xl mb-6 flex items-center gap-2">ملخص الباقة <span className="text-green-600 text-lg">🛡️</span></h2>
            
            <div className={`bg-${packageColor}-50 rounded-xl p-4 mb-4 border border-${packageColor}-200`}>
              <div className="font-bold mb-1">{packageNames[selectedPackage.type]}</div>
              <div className={`text-${packageColor}-700 text-2xl font-bold mb-1`}>{selectedPackage.price} ريال</div>
              <div className="text-xs text-gray-500 mb-1">{selectedPackage.carTypeLabel}</div>
              <div className="text-xs text-gray-500 mb-1">{selectedPackage.washes} غسلة</div>
              <div className="text-xs text-gray-400 line-through mb-1">{selectedPackage.originalPrice} ريال</div>
              <div className={`text-${packageColor}-600 text-xs font-bold`}>-{selectedPackage.savings} ريال</div>
            </div>

            <div>
              <div className="font-bold mb-2">المميزات:</div>
              <ul className="text-sm text-gray-700 space-y-1 text-right">
                {selectedPackage.type === 'basic' && (
                  <>
                    <li>✔️ {selectedPackage.paidWashes} غسلات باستخدام صابون إيطالي فاخر عالي الجودة</li>
                    <li>✔️ غسيل بطبقتين من الصابون لضمان نظافة عميقة ولمعان يدوم</li>
                    <li>✔️ غسلة إضافية مجانية ليصبح إجمالي الغسلات {selectedPackage.washes}</li>
                    <li>✔️ إجمالي التوفير: {selectedPackage.savings} ريال سعودي</li>
                    <li>✔️ صالحة لمدة شهر واحد من تاريخ الشراء</li>
                  </>
                )}
                {selectedPackage.type === 'advanced' && (
                  <>
                    <li>✔️ {selectedPackage.paidWashes} غسلات باستخدام صابون إيطالي فاخر يمنح سيارتك العناية التي تستحقها</li>
                    <li>✔️ غسيل بطبقتين من الصابون لضمان نظافة عميقة ولمعان يدوم</li>
                    <li>✔️ غسلتان مجانيتان ليصبح إجمالي الغسلات {selectedPackage.washes}</li>
                    <li>✔️ إجمالي التوفير: {selectedPackage.savings} ريال سعودي</li>
                    <li>✔️ صالحة لمدة شهر واحد من تاريخ الشراء</li>
                  </>
                )}
                {selectedPackage.type === 'premium' && (
                  <>
                    <li>✔️ {selectedPackage.paidWashes} غسلة باستخدام صابون إيطالي فاخر يوفر عناية فائقة بسيارتك</li>
                    <li>✔️ غسيل بطبقتين من الصابون لضمان إزالة الأوساخ بفعالية وحماية طويلة الأمد</li>
                    <li>✔️ {selectedPackage.freeWashes} غسلات مجانية ليصبح إجمالي الغسلات {selectedPackage.washes}</li>
                    <li>✔️ إجمالي التوفير: {selectedPackage.savings} ريال سعودي</li>
                    <li>✔️ صالحة لمدة شهر واحد من تاريخ الشراء</li>
                  </>
                )}
                {selectedPackage.type === 'vip' && (
                  <>
                    <li>✔️ غسلة واحدة باستخدام صابون إيطالي فاخر عالي الجودة</li>
                    <li>✔️ غسيل بطبقتين من الصابون لضمان نظافة عميقة ولمعان يدوم</li>
                    <li>✔️ خدمة الفالية والموقف مجانًا</li>
                    <li>✔️ تنظيف داخلي شامل</li>
                    <li>✔️ تلميع احترافي</li>
                    <li>✔️ خدمة VIP معاملة خاصة</li>
                    <li>✔️ أولوية في الطابور</li>
                    <li>✔️ إجمالي التوفير: {selectedPackage.savings} ريال سعودي</li>
                    <li>✔️ صالحة لمدة يوم واحد من تاريخ الشراء</li>
                  </>
                )}
              </ul>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
} 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Star, Gift, Clock, Search, Car, AlertCircle, Crown } from 'lucide-react';
import saudiImage from '../assets/saudi.png';

const PackagesSection = () => {
  const [selectedCarType, setSelectedCarType] = useState('');
  const navigate = useNavigate();

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // أسعار الباقات حسب نوع السيارة
  const packagePrices = {
    'small': {
      basic: { price: 150, originalPrice: 235, savings: 85, washes: 5, paidWashes: 4, freeWashes: 1 },
      advanced: { price: 280, originalPrice: 420, savings: 140, washes: 10, paidWashes: 8, freeWashes: 2 },
      premium: { price: 490, originalPrice: 770, savings: 280, washes: 18, paidWashes: 14, freeWashes: 4 },
      vip: { price: 150, originalPrice: 235, savings: 85, washes: 1, paidWashes: 1, freeWashes: 0 }
    },
    'medium': {
      basic: { price: 180, originalPrice: 270, savings: 90, washes: 5, paidWashes: 4, freeWashes: 1 },
      advanced: { price: 320, originalPrice: 480, savings: 160, washes: 10, paidWashes: 8, freeWashes: 2 },
      premium: { price: 530, originalPrice: 830, savings: 300, washes: 18, paidWashes: 14, freeWashes: 4 },
      vip: { price: 150, originalPrice: 235, savings: 85, washes: 1, paidWashes: 1, freeWashes: 0 }
    },
    'large': {
      basic: { price: 220, originalPrice: 330, savings: 110, washes: 5, paidWashes: 4, freeWashes: 1 },
      advanced: { price: 360, originalPrice: 540, savings: 180, washes: 10, paidWashes: 8, freeWashes: 2 },
      premium: { price: 570, originalPrice: 890, savings: 320, washes: 18, paidWashes: 14, freeWashes: 4 },
      vip: { price: 150, originalPrice: 235, savings: 85, washes: 1, paidWashes: 1, freeWashes: 0 }
    }
  };

  const carTypes = [
    { value: 'small', label: 'سيارة صغيرة', icon: '🚗' },
    { value: 'medium', label: 'سيارة متوسطة', icon: '🚙' },
    { value: 'large', label: 'سيارة كبيرة', icon: '🚐' }
  ];

  const getCurrentPrices = () => {
    if (!selectedCarType) return packagePrices.small;
    return packagePrices[selectedCarType];
  };

  const currentPrices = getCurrentPrices();

  // دالة للانتقال إلى صفحة الشراء مع بيانات الباقة
  const handleCheckout = (packageType) => {
    if (!selectedCarType) {
      alert('يرجى اختيار نوع السيارة أولاً');
      return;
    }

    const packageData = {
      type: packageType,
      carType: selectedCarType,
      carTypeLabel: carTypes.find(car => car.value === selectedCarType)?.label,
      price: currentPrices[packageType].price,
      originalPrice: currentPrices[packageType].originalPrice,
      savings: currentPrices[packageType].savings,
      washes: currentPrices[packageType].washes,
      paidWashes: currentPrices[packageType].paidWashes,
      freeWashes: currentPrices[packageType].freeWashes
    };

    // حفظ بيانات الباقة في localStorage للوصول إليها في صفحة الحجز
    localStorage.setItem('selectedPackage', JSON.stringify(packageData));
    
    // الانتقال إلى صفحة تفاصيل الباقة
    navigate('/package-details');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
            عروض حصرية
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent">
            باقاتنا المميزة
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            اختر الباقة المناسبة لك واستمتع بخصومات حصرية عند الشراء من التطبيق
          </p>
        </div>

        {/* بطاقة أحمد المساعد */}
        <div className="bg-gradient-to-br from-white via-green-50 to-emerald-50 rounded-3xl shadow-2xl p-12 mb-16 max-w-5xl mx-auto border border-green-100 hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
          {/* خلفية زخرفية */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-400/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            {/* شخصية أحمد */}
            <div className="flex-shrink-0 order-first md:order-first">
              <div className="relative group">
                {/* تأثير التوهج */}
                <div className="absolute -inset-3 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-3xl blur opacity-40 group-hover:opacity-60 transition-all duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-green-300 to-emerald-400 rounded-3xl blur opacity-20"></div>
                
                {/* الصورة */}
                <div className="relative bg-white rounded-3xl p-2 shadow-xl">
                  <img 
                    src={saudiImage} 
                    alt="شخصية سعودية" 
                    className="w-32 h-32 object-cover rounded-2xl shadow-lg transform hover:scale-110 transition-all duration-300 group-hover:rotate-1"
                  />
                </div>
                
                {/* تأثيرات إضافية */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse opacity-60 delay-300"></div>
              </div>
            </div>

            {/* النص */}
            <div className="flex-1 text-center md:text-right">
              {/* شارة المساعد */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white px-6 py-3 rounded-full text-base font-bold mb-6 shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                مساعد ذكي
                <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
              </div>
              
              {/* العنوان */}
              <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-gray-800 via-green-700 to-emerald-600 bg-clip-text text-transparent leading-tight">
                مرحباً! أنا أحمد
              </h3>
              
              {/* الوصف */}
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto md:mx-0 mb-8">
                سأساعدك في اختيار الباقة المناسبة لسيارتك بكل سهولة ووضوح
              </p>
              
              {/* مميزات سريعة */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-green-700 border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  خدمة 24/7
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-green-700 border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  نصائح مجانية
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-green-700 border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  دعم فوري
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* الباقات */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {/* الباقة الأساسية */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">الباقة الأساسية</h3>
              <div className="text-3xl font-bold text-teal-600 mb-1">{currentPrices.basic.price} ريال</div>
              <div className="text-lg text-gray-400 line-through mb-4">{currentPrices.basic.originalPrice} ريال</div>
              
              {/* اختيار نوع السيارة داخل البطاقة */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">اختر نوع سيارتك:</label>
                <select 
                  value={selectedCarType} 
                  onChange={(e) => setSelectedCarType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm text-gray-600"
                >
                  <option value="">-- اختر نوع السيارة</option>
                  {carTypes.map((carType) => (
                    <option key={carType.value} value={carType.value}>
                      {carType.icon} {carType.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="bg-teal-50 rounded-lg p-3 mb-4">
              <div className="text-sm text-teal-700 font-semibold">
                توفير {currentPrices.basic.savings} ريال
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-600 text-lg font-semibold">{currentPrices.basic.washes} غسلة</p>
            </div>

            {/* مميزات الباقة الأساسية */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 text-right">الوصف:</h4>
              <p className="text-gray-600 text-sm mb-4 text-right">
                الخيار المثالي لمن يبحث عن نظافة أساسية مع توفير إضافي!
              </p>
              
              <h4 className="text-sm font-semibold text-gray-700 mb-3 text-right">ما ستحصل عليه:</h4>
              <ul className="space-y-2 text-sm text-gray-600 text-right">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{currentPrices.basic.paidWashes} غسلات باستخدام صابون إيطالي فاخر عالي الجودة</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>غسيل بطبقتين من الصابون لضمان نظافة عميقة ولمعان يدوم</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>غسلة إضافية مجانية، ليصبح إجمالي الغسلات: {currentPrices.basic.washes}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>إجمالي التوفير: {currentPrices.basic.savings} ريال سعودي</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => handleCheckout('basic')}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              احجز الآن
            </button>
          </div>

          {/* الباقة المتقدمة */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-green-500 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                <Star className="w-4 h-4" />
                الأكثر طلباً
              </div>
            </div>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">الباقة المتقدمة</h3>
              <div className="text-3xl font-bold text-green-600 mb-1">{currentPrices.advanced.price} ريال</div>
              <div className="text-lg text-gray-400 line-through mb-4">{currentPrices.advanced.originalPrice} ريال</div>
              
              {/* اختيار نوع السيارة داخل البطاقة */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">اختر نوع سيارتك:</label>
                <select 
                  value={selectedCarType} 
                  onChange={(e) => setSelectedCarType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm text-gray-600"
                >
                  <option value="">-- اختر نوع السيارة</option>
                  {carTypes.map((carType) => (
                    <option key={carType.value} value={carType.value}>
                      {carType.icon} {carType.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-3 mb-4">
              <div className="text-sm text-green-700 font-semibold">
                توفير {currentPrices.advanced.savings} ريال
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-600 text-lg font-semibold">{currentPrices.advanced.washes} غسلة</p>
            </div>

            {/* مميزات الباقة المتقدمة */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 text-right">الوصف:</h4>
              <p className="text-gray-600 text-sm mb-4 text-right">
                الخيار العملي للنظافة المثالية بسعر تنافسي
              </p>
              
              <h4 className="text-sm font-semibold text-gray-700 mb-3 text-right">ما ستحصل عليه:</h4>
              <ul className="space-y-2 text-sm text-gray-600 text-right">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{currentPrices.advanced.paidWashes} غسلات باستخدام صابون إيطالي فاخر يمنح سيارتك العناية التي تستحقها</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>غسيل بطبقتين من الصابون لضمان نظافة عميقة ولمعان يدوم</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>غسلتان مجانيتان، ليصبح إجمالي الغسلات: {currentPrices.advanced.washes}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>إجمالي التوفير: {currentPrices.advanced.savings} ريال سعودي</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => handleCheckout('advanced')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              احجز الآن
            </button>
          </div>

          {/* الباقة المميزة */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">الباقة الشاملة</h3>
              <div className="text-3xl font-bold text-orange-600 mb-1">{currentPrices.premium.price} ريال</div>
              <div className="text-lg text-gray-400 line-through mb-4">{currentPrices.premium.originalPrice} ريال</div>
              
              {/* اختيار نوع السيارة داخل البطاقة */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">اختر نوع سيارتك:</label>
                <select 
                  value={selectedCarType} 
                  onChange={(e) => setSelectedCarType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-gray-600"
                >
                  <option value="">-- اختر نوع السيارة</option>
                  {carTypes.map((carType) => (
                    <option key={carType.value} value={carType.value}>
                      {carType.icon} {carType.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-3 mb-4">
              <div className="text-sm text-orange-700 font-semibold">
                توفير {currentPrices.premium.savings} ريال
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-600 text-lg font-semibold">{currentPrices.premium.washes} غسلة</p>
            </div>

            {/* مميزات الباقة الشاملة */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 text-right">الوصف:</h4>
              <p className="text-gray-600 text-sm mb-4 text-right">
                الخيار الأمثل لمن يريد العناية القصوى بسياراته مع أكبر قدر من التوفير
              </p>
              
              <h4 className="text-sm font-semibold text-gray-700 mb-3 text-right">ما ستحصل عليه:</h4>
              <ul className="space-y-2 text-sm text-gray-600 text-right">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{currentPrices.premium.paidWashes} غسلة باستخدام صابون إيطالي فاخر يوفر عناية فائقة بسيارتك</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>غسيل بطبقتين من الصابون لضمان إزالة الأوساخ بفعالية وحماية طويلة الأمد</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{currentPrices.premium.freeWashes} غسلات مجانية، ليصبح إجمالي الغسلات: {currentPrices.premium.washes}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>إجمالي التوفير: {currentPrices.premium.savings} ريال سعودي</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => handleCheckout('premium')}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              احجز الآن
            </button>
          </div>

          {/* باقة VIP */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-purple-500 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                <Crown className="w-4 h-4" />
                VIP
              </div>
            </div>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">باقة VIP</h3>
              <div className="text-3xl font-bold text-purple-600 mb-1">{currentPrices.vip.price} ريال</div>
              <div className="text-lg text-gray-400 line-through mb-4">{currentPrices.vip.originalPrice} ريال</div>
              
              {/* اختيار نوع السيارة داخل البطاقة */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">اختر نوع سيارتك:</label>
                <select 
                  value={selectedCarType} 
                  onChange={(e) => setSelectedCarType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-gray-600"
                >
                  <option value="">-- اختر نوع السيارة</option>
                  {carTypes.map((carType) => (
                    <option key={carType.value} value={carType.value}>
                      {carType.icon} {carType.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 mb-4 border border-purple-200">
              <div className="text-sm text-purple-700 font-semibold">
                توفير {currentPrices.vip.savings} ريال
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-600 text-lg font-semibold">{currentPrices.vip.washes} غسلة</p>
            </div>

            {/* مميزات باقة VIP */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 text-right">الوصف:</h4>
              <p className="text-gray-600 text-sm mb-4 text-right">
                الخيار المثالي لمن يبحث عن نظافة أساسية مع توفير إضافي!
              </p>
              
              <h4 className="text-sm font-semibold text-gray-700 mb-3 text-right">ما ستحصل عليه:</h4>
              <ul className="space-y-2 text-sm text-gray-600 text-right">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>غسلة واحدة باستخدام صابون إيطالي فاخر عالي الجودة</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>غسيل بطبقتين من الصابون لضمان نظافة عميقة ولمعان يدوم</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>خدمة الفالية والموقف مجانًا</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>تنظيف داخلي شامل</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>تلميع احترافي</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>خدمة VIP معاملة خاصة</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>أولوية في الطابور</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>إجمالي التوفير: {currentPrices.vip.savings} ريال سعودي</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => handleCheckout('vip')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              احجز الآن
            </button>
          </div>
        </div>

        {/* قسم التنبيه - مدة الصلاحية */}
        <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
            <h3 className="text-xl font-bold text-gray-800">تنبيه مهم</h3>
          </div>
          <div className="text-center">
            <p className="text-gray-700 text-lg font-semibold">
              جميع الباقات صالحة لمدة شهر واحد من تاريخ الشراء
            </p>
            <p className="text-gray-600 mt-2">
              يرجى استخدام جميع الغسلات خلال فترة الصلاحية
            </p>
            <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-700 font-semibold">
                ⚠️ باقة VIP صالحة لمدة يوم واحد فقط من تاريخ الشراء
              </p>
            </div>
          </div>
        </div>

        {/* نص إضافي */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-6">
            جميع الباقات تشمل ضمان الجودة وخدمة عملاء 24/7
          </p>
          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
            احصل على خصم إضافي من التطبيق
          </button>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection; 
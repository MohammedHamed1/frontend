import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { Sparkles, Star, Gift, Clock, Search, Car, AlertCircle, Crown } from 'lucide-react';
import saudiImage from '../assets/saudi.png';
import PageHeader from '../components/common/PageHeader';

const Packages = () => {
  const [selectedCarType, setSelectedCarType] = useState('');
  const navigate = useNavigate();

  // استخدام hook مخصص للتمرير التلقائي


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
    <>
      <div className="header-spacer"></div>
      <PageHeader 
        title="باقاتنا المميزة"
        subtitle="اختر الباقة المناسبة لك واستمتع بخصومات حصرية عند الشراء من التطبيق"
                  breadcrumbs={['الرئيسية', 'الباقات']}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 py-16">
      
          {/* قسم الترحيب والإحصائيات السريعة */}
          <div className="mb-16">
            {/* بطاقة الترحيب */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-8 text-white text-center mb-12 shadow-2xl">
              <div className="max-w-4xl mx-auto">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-bold mb-6">
                  🎉 عروض حصرية لفترة محدودة
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  مرحباً بك في عالم الباقات المميزة
            </h1>
                <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                  اختر الباقة المناسبة لسيارتك واستمتع بخصومات حصرية تصل إلى 40% مع خدمة متميزة وضمان الجودة
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-green-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                    🚗 احجز الآن
                  </button>
                  <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105">
                    📱 تحميل التطبيق
                  </button>
                </div>
              </div>
            </div>

            {/* الإحصائيات السريعة */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
                <div className="text-gray-600 text-sm">عميل راضي</div>
                <div className="text-yellow-500 text-xs mt-1">⭐⭐⭐⭐⭐</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-3xl font-bold text-green-600 mb-2">100K+</div>
                <div className="text-gray-600 text-sm">غسلة مكتملة</div>
                <div className="text-blue-500 text-xs mt-1">🚗✨</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-3xl font-bold text-green-600 mb-2">25+</div>
                <div className="text-gray-600 text-sm">فرع في المملكة</div>
                <div className="text-purple-500 text-xs mt-1">📍🇸🇦</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-3xl font-bold text-green-600 mb-2">4.9</div>
                <div className="text-gray-600 text-sm">تقييم متوسط</div>
                <div className="text-orange-500 text-xs mt-1">🏆</div>
          </div>
        </div>

            {/* مميزات سريعة */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">خدمة سريعة</h3>
                </div>
                <p className="text-gray-600 text-sm">غسيل سريع في 1.5 ساعة مع ضمان الجودة والكفاءة</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">ضمان الجودة</h3>
                </div>
                <p className="text-gray-600 text-sm">ضمان شامل على جميع الخدمات مع إعادة الغسيل مجاناً</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 0h-1v-4h-1" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">تطبيق ذكي</h3>
                </div>
                <p className="text-gray-600 text-sm">تطبيق متطور لحجز الطلبات ومتابعة الخدمات بسهولة</p>
              </div>
            </div>
          </div>

          {/* بطاقة أحمد المساعد */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-12 mb-16 max-w-5xl mx-auto border border-gray-100 hover:shadow-3xl transition-all duration-500">
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* شخصية أحمد */}
              <div className="flex-shrink-0 order-first md:order-first">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-3xl blur opacity-30"></div>
                  <img 
                    src={saudiImage} 
                    alt="شخصية سعودية" 
                    className="relative w-28 h-28 object-cover rounded-3xl shadow-lg transform hover:scale-110 transition-all duration-300"
                  />
                </div>
              </div>

              {/* النص */}
              <div className="flex-1 text-center md:text-right">
                <div className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full text-base font-bold mb-6 shadow-lg">
                  مساعد ذكي
                </div>
                <h3 className="text-4xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent">
                  مرحباً! أنا أحمد
                </h3>
                <p className="text-gray-600 text-xl leading-relaxed max-w-lg mx-auto md:mx-0">
                  سأساعدك في اختيار الباقة المناسبة لسيارتك بكل سهولة ووضوح
                </p>
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

          {/* قسم المميزات الإضافية */}
          <div className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">مميزات حصرية</h3>
              <p className="text-gray-600 text-lg">استمتع بمميزات إضافية مع باقاتنا المميزة</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* مميزة 1 */}
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">خدمة سريعة</h4>
                <p className="text-gray-600 text-sm">غسيل سريع في 1.5 ساعة مع ضمان الجودة</p>
              </div>

              {/* مميزة 2 */}
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">ضمان الجودة</h4>
                <p className="text-gray-600 text-sm">ضمان شامل على جميع الخدمات مع إعادة الغسيل مجانًا</p>
              </div>

              {/* مميزة 3 */}
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 0h-1v-4h-1" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">تطبيق ذكي</h4>
                <p className="text-gray-600 text-sm">تطبيق متطور لحجز الطلبات ومتابعة الخدمات</p>
              </div>

              {/* مميزة 4 */}
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">خدمة عملاء</h4>
                <p className="text-gray-600 text-sm">فريق خدمة عملاء متواجد لمساعدتك في أي وقت</p>
              </div>
            </div>
          </div>

          {/* قسم الأسئلة الشائعة */}
          <div className="mt-16 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">الأسئلة الشائعة</h3>
              <p className="text-gray-600 text-lg">إجابات على أكثر الأسئلة شيوعاً حول باقاتنا</p>
        </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* سؤال 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">؟</span>
                  كيف يمكنني استخدام الباقة؟
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  بعد شراء الباقة، ستتلقى باركود فوري يمكنك استخدامه في أي فرع من فروعنا. فقط اعرض الباركود عند الوصول وسيتم خصم غسلة واحدة من رصيدك.
                </p>
              </div>

              {/* سؤال 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">؟</span>
                  هل يمكنني مشاركة الباقة مع الآخرين؟
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  نعم، يمكنك مشاركة الباركود مع أفراد عائلتك أو أصدقائك. الباقة صالحة لأي سيارة من نفس النوع المختار عند الشراء.
                </p>
              </div>

              {/* سؤال 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">؟</span>
                  ماذا لو لم أستخدم جميع الغسلات؟
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  الباقات صالحة لمدة شهر واحد من تاريخ الشراء. إذا لم تستخدم جميع الغسلات خلال هذه الفترة، فلن يتم استرداد المبلغ المتبقي.
                </p>
              </div>

              {/* سؤال 4 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">؟</span>
                  هل يمكنني تغيير نوع السيارة؟
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  لا يمكن تغيير نوع السيارة بعد الشراء. لذلك يرجى التأكد من اختيار النوع الصحيح قبل إتمام عملية الشراء.
                </p>
              </div>
            </div>
          </div>

          {/* قسم الإحصائيات */}
          <div className="mt-16 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">أرقام تتحدث عن نفسها</h3>
              <p className="text-gray-600 text-lg">إنجازاتنا في خدمة عملائنا الكرام</p>
        </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {/* إحصائية 1 */}
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
                <div className="text-gray-600 text-sm">عميل راضي</div>
              </div>

              {/* إحصائية 2 */}
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">100K+</div>
                <div className="text-gray-600 text-sm">غسلة مكتملة</div>
              </div>

              {/* إحصائية 3 */}
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">25+</div>
                <div className="text-gray-600 text-sm">فرع في المملكة</div>
              </div>

              {/* إحصائية 4 */}
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">4.9</div>
                <div className="text-gray-600 text-sm">تقييم متوسط</div>
              </div>
            </div>
          </div>

          {/* قسم الدعوة للعمل */}
          <div className="mt-16 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-8 text-center text-white">
            <h3 className="text-3xl font-bold mb-4 text-white">جرب خدماتنا اليوم</h3>
            <p className="text-green-100 text-lg mb-6">
              احصل على خصم 20% على أول طلب لك عند التسجيل في التطبيق
          </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            احجز الآن
              </button>
              <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105">
                تحميل التطبيق
              </button>
            </div>
          </div>
        </div>
    </div>
    </>
  );
};

export default Packages; 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Star, Gift, Clock, Search, Car, AlertCircle, Crown, CheckCircle, Zap, Shield, Award } from 'lucide-react';
import saudiImage from '../assets/saudi.png';
import PageHeader from './common/PageHeader';
import UnifiedButton from './common/UnifiedButton';
import UnifiedIcon from './common/UnifiedIcon';

const EnhancedPackagesSection = () => {
  const [selectedCarType, setSelectedCarType] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
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

    // إذا كانت باقة VIP، انتقل إلى المسار الخاص بها
    if (packageType === 'vip') {
      navigate('/vip-package-details');
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
      
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden" dir="rtl">
        {/* خلفية زخرفية */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-300/30 to-transparent rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-green-400/20 to-transparent rounded-full translate-x-48 translate-y-48"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* بطاقة أحمد المساعد */}
          <div className={`bg-gradient-to-br from-white via-green-50 to-emerald-50 rounded-3xl shadow-2xl p-12 mb-16 max-w-5xl mx-auto border border-green-100 hover:shadow-3xl transition-all duration-500 relative overflow-hidden transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {/* خلفية زخرفية */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-400/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              {/* شخصية أحمد */}
              <div className="flex-shrink-0 order-first md:order-first">
                {/* الصورة */}
                <div className="bg-white rounded-xl p-3 shadow-xl border-2 border-green-300 hover:border-green-400 transition-all duration-300">
                  <img 
                    src={saudiImage} 
                    alt="شخصية سعودية" 
                    className="w-24 h-24 object-cover rounded-lg"
                    style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
                    onError={(e) => {
                      console.log('خطأ في تحميل الصورة:', e.target.src);
                      e.target.style.display = 'none';
                    }}
                  />
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
                    خدمة متميزة
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

          {/* اختيار نوع السيارة */}
          <div className={`text-center mb-12 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">اختر نوع سيارتك</h3>
            
            {/* مربع البحث */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" style={{ fill: 'white' }} />
                <select 
                  value={selectedCarType} 
                  onChange={(e) => setSelectedCarType(e.target.value)}
                  className="w-full px-12 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg text-gray-700 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <option value="">🔍 ابحث عن نوع سيارتك...</option>
                  {carTypes.map((carType) => (
                    <option key={carType.value} value={carType.value}>
                      {carType.icon} {carType.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* أزرار الاختيار السريع */}
            <div className="flex flex-wrap justify-center gap-4">
              {carTypes.map((carType) => (
                <button
                  key={carType.value}
                  onClick={() => setSelectedCarType(carType.value)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCarType === carType.value
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-300 hover:shadow-md'
                  }`}
                >
                  <span className="text-2xl">{carType.icon}</span>
                  <span>{carType.label}</span>
                  {selectedCarType === carType.value && (
                    <CheckCircle className="w-5 h-5" style={{ fill: 'white' }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* الباقات */}
          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {/* الباقة الأساسية */}
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 flex flex-col h-full border border-gray-100 relative overflow-hidden">
              {/* خلفية زخرفية */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-all duration-500"></div>
              
              <div className="text-center mb-6 relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Car className="w-10 h-10 text-white" style={{ fill: 'white' }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">الباقة الأساسية</h3>
                
                {/* مربع البحث داخل البطاقة */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">اختر نوع سيارتك:</label>
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" style={{ fill: 'white' }} />
                    <select 
                      value={selectedCarType} 
                      onChange={(e) => setSelectedCarType(e.target.value)}
                      className="w-full px-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm text-gray-600 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <option value="">🚗 اختر السيارة</option>
                      {carTypes.map((carType) => (
                        <option key={carType.value} value={carType.value}>
                          {carType.icon} {carType.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* السعر */}
                <div className="mb-4">
                  <div className="text-4xl font-bold text-green-600 mb-2">{currentPrices.basic.price} ريال</div>
                  <div className="text-lg text-gray-400 line-through">{currentPrices.basic.originalPrice} ريال</div>
                </div>
                
                {/* التوفير */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 inline-block">
                  توفير {currentPrices.basic.savings} ريال
                </div>
                
                {/* عدد الغسلات */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-800 mb-2">{currentPrices.basic.washes}</div>
                  <p className="text-gray-600 font-semibold">غسلة</p>
                </div>
              </div>
              
              {/* مميزات الباقة */}
              <div className="mb-8 flex-grow">
                <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">المميزات:</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>{currentPrices.basic.paidWashes} غسلات بصابون إيطالي فاخر</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>غسيل بطبقتين لضمان نظافة عميقة</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>{currentPrices.basic.freeWashes} غسلة مجانية</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>ضمان الجودة</span>
                  </li>
                </ul>
              </div>

              <UnifiedButton 
                variant="gradient"
                size="large"
                onClick={() => handleCheckout('basic')}
                className="w-full mt-auto"
              >
                احجز الآن
              </UnifiedButton>
            </div>

            {/* الباقة المتقدمة */}
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 flex flex-col h-full border border-gray-100 relative overflow-hidden">
              {/* خلفية زخرفية */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-all duration-500"></div>
              
              {/* شارة الأكثر طلباً */}
              <div className="absolute top-4 right-4 z-20">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-xl">
                  <Star className="w-3 h-3" style={{ fill: 'white' }} />
                  الأكثر طلباً
                </div>
              </div>
              
              <div className="text-center mb-6 relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Zap className="w-10 h-10 text-white" style={{ fill: 'white' }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">الباقة المتقدمة</h3>
                
                {/* مربع البحث داخل البطاقة */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">اختر نوع سيارتك:</label>
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" style={{ fill: 'white' }} />
                    <select 
                      value={selectedCarType} 
                      onChange={(e) => setSelectedCarType(e.target.value)}
                      className="w-full px-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm text-gray-600 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <option value="">🚗 اختر السيارة</option>
                      {carTypes.map((carType) => (
                        <option key={carType.value} value={carType.value}>
                          {carType.icon} {carType.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* السعر */}
                <div className="mb-4">
                  <div className="text-4xl font-bold text-green-600 mb-2">{currentPrices.advanced.price} ريال</div>
                  <div className="text-lg text-gray-400 line-through">{currentPrices.advanced.originalPrice} ريال</div>
                </div>
                
                {/* التوفير */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 inline-block">
                  توفير {currentPrices.advanced.savings} ريال
                </div>
                
                {/* عدد الغسلات */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-800 mb-2">{currentPrices.advanced.washes}</div>
                  <p className="text-gray-600 font-semibold">غسلة</p>
                </div>
              </div>
              
              {/* مميزات الباقة */}
              <div className="mb-8 flex-grow">
                <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">المميزات:</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>{currentPrices.advanced.paidWashes} غسلات بصابون إيطالي فاخر</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>غسيل بطبقتين لضمان نظافة عميقة</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>تلميع احترافي</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>{currentPrices.advanced.freeWashes} غسلة مجانية</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>ضمان الجودة</span>
                  </li>
                </ul>
              </div>

              <UnifiedButton 
                variant="gradient"
                size="large"
                onClick={() => handleCheckout('advanced')}
                className="w-full mt-auto"
              >
                احجز الآن
              </UnifiedButton>
            </div>

            {/* الباقة المميزة */}
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 flex flex-col h-full border border-gray-100 relative overflow-hidden">
              {/* خلفية زخرفية */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-all duration-500"></div>
              
              <div className="text-center mb-6 relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Award className="w-10 h-10 text-white" style={{ fill: 'white' }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">الباقة المميزة</h3>
                
                {/* مربع البحث داخل البطاقة */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">اختر نوع سيارتك:</label>
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" style={{ fill: 'white' }} />
                    <select 
                      value={selectedCarType} 
                      onChange={(e) => setSelectedCarType(e.target.value)}
                      className="w-full px-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm text-gray-600 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <option value="">🚗 اختر السيارة</option>
                      {carTypes.map((carType) => (
                        <option key={carType.value} value={carType.value}>
                          {carType.icon} {carType.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* السعر */}
                <div className="mb-4">
                  <div className="text-4xl font-bold text-green-600 mb-2">{currentPrices.premium.price} ريال</div>
                  <div className="text-lg text-gray-400 line-through">{currentPrices.premium.originalPrice} ريال</div>
                </div>
                
                {/* التوفير */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 inline-block">
                  توفير {currentPrices.premium.savings} ريال
                </div>
                
                {/* عدد الغسلات */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-800 mb-2">{currentPrices.premium.washes}</div>
                  <p className="text-gray-600 font-semibold">غسلة</p>
                </div>
              </div>
              
              {/* مميزات الباقة */}
              <div className="mb-8 flex-grow">
                <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">المميزات:</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>{currentPrices.premium.paidWashes} غسلات بصابون إيطالي فاخر</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>غسيل بطبقتين لضمان نظافة عميقة</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>تلميع احترافي</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>شمع حماية</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>{currentPrices.premium.freeWashes} غسلة مجانية</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>ضمان الجودة</span>
                  </li>
                </ul>
              </div>

              <UnifiedButton 
                variant="gradient"
                size="large"
                onClick={() => handleCheckout('premium')}
                className="w-full mt-auto"
              >
                احجز الآن
              </UnifiedButton>
            </div>

            {/* باقة VIP */}
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 flex flex-col h-full border border-gray-100 relative overflow-hidden">
              {/* خلفية زخرفية */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-all duration-500"></div>
              
              {/* شارة للفنادق فقط */}
              <div className="absolute top-4 right-4 z-20">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-xl">
                  <Crown className="w-3 h-3" style={{ fill: 'white' }} />
                  للفنادق فقط
                </div>
              </div>
              
              <div className="text-center mb-6 relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Crown className="w-10 h-10 text-white" style={{ fill: 'white' }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">باقة VIP</h3>
                
                {/* مربع البحث داخل البطاقة */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">اختر نوع سيارتك:</label>
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" style={{ fill: 'white' }} />
                    <select 
                      value={selectedCarType} 
                      onChange={(e) => setSelectedCarType(e.target.value)}
                      className="w-full px-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm text-gray-600 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <option value="">🚗 اختر السيارة</option>
                      {carTypes.map((carType) => (
                        <option key={carType.value} value={carType.value}>
                          {carType.icon} {carType.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* السعر */}
                <div className="mb-4">
                  <div className="text-4xl font-bold text-green-600 mb-2">{currentPrices.vip.price} ريال</div>
                  <div className="text-lg text-gray-400 line-through">{currentPrices.vip.originalPrice} ريال</div>
                </div>
                
                {/* التوفير */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 inline-block">
                  توفير {currentPrices.vip.savings} ريال
                </div>
                
                {/* عدد الغسلات */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-800 mb-2">{currentPrices.vip.washes}</div>
                  <p className="text-gray-600 font-semibold">غسلة VIP</p>
                </div>
              </div>
              
              {/* مميزات الباقة */}
              <div className="mb-8 flex-grow">
                <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">المميزات:</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>غسيل شامل شامل</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>تلميع احترافي</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>شمع حماية</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>خدمة VIP متميزة</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>صالح في الفنادق المحددة فقط</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>خدمة متميزة</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                    <span>ضمان الجودة</span>
                  </li>
                </ul>
              </div>

              <UnifiedButton 
                variant="gradient"
                size="large"
                onClick={() => handleCheckout('vip')}
                className="w-full mt-auto"
              >
                احجز الآن
              </UnifiedButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnhancedPackagesSection; 
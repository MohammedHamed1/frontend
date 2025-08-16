import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Star, Gift, Clock, Search, Car, AlertCircle, Crown, CheckCircle, Zap, Shield, Award, Loader2 } from 'lucide-react';
import saudiImage from '../assets/saudi.png';
import PageHeader from '../components/common/PageHeader';
import UnifiedButton from '../components/common/UnifiedButton';
import UnifiedIcon from '../components/common/UnifiedIcon';
import { packageAPI } from '../api';

const Packages = () => {
  const [selectedCarType, setSelectedCarType] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await packageAPI.getAll();
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setError('حدث خطأ في تحميل الباقات. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const carTypes = [
    { value: 'small', label: 'سيارة صغيرة', icon: '🚗' },
    { value: 'medium', label: 'سيارة متوسطة', icon: '🚙' },
    { value: 'large', label: 'سيارة كبيرة', icon: '🚐' }
  ];

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

    const selectedPackage = packages.find(pkg => pkg.type === packageType);
    if (!selectedPackage) {
      alert('الباقة غير متوفرة');
      return;
    }

    const packageData = {
      id: selectedPackage.id,
      type: packageType,
      carType: selectedCarType,
      carTypeLabel: carTypes.find(car => car.value === selectedCarType)?.label,
      price: selectedPackage.price,
      originalPrice: selectedPackage.originalPrice,
      savings: selectedPackage.originalPrice - selectedPackage.price,
      washes: selectedPackage.washes,
      name: selectedPackage.name,
      description: selectedPackage.description,
      features: selectedPackage.features
    };

    // حفظ بيانات الباقة في localStorage للوصول إليها في صفحة الحجز
    localStorage.setItem('selectedPackage', JSON.stringify(packageData));
    
    // الانتقال إلى صفحة تفاصيل الباقة
    navigate('/package-details');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل الباقات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <UnifiedButton onClick={fetchPackages} variant="primary">
            إعادة المحاولة
          </UnifiedButton>
        </div>
      </div>
    );
  }

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
                <div className="relative group">
                  {/* تأثير التوهج */}
                  <div className="absolute -inset-3 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-3xl blur opacity-40 group-hover:opacity-60 transition-all duration-500"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-300 to-emerald-400 rounded-3xl blur opacity-20"></div>
                  
                  {/* الصورة */}
                  <div className="relative bg-white rounded-2xl p-2 shadow-lg border-2 border-green-200">
                    <img 
                      src={saudiImage} 
                      alt="شخصية سعودية" 
                      className="w-24 h-24 object-cover rounded-xl"
                      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
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
            {packages.map((pkg) => (
              <div key={pkg.id} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 flex flex-col h-full border border-gray-100 relative overflow-hidden">
                {/* خلفية زخرفية */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-all duration-500"></div>
                
                {/* شارة الأكثر طلباً */}
                {pkg.type === 'advanced' && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-xl">
                      <Star className="w-3 h-3" style={{ fill: 'white' }} />
                      الأكثر طلباً
                    </div>
                  </div>
                )}

                {/* شارة للفنادق فقط */}
                {pkg.type === 'vip' && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-xl">
                      <Crown className="w-3 h-3" style={{ fill: 'white' }} />
                      للفنادق فقط
                    </div>
                  </div>
                )}

                <div className="text-center mb-6 relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    {pkg.icon && <UnifiedIcon icon={pkg.icon} className="w-10 h-10 text-white" />}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{pkg.name}</h3>
                  
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
                    <div className="text-4xl font-bold text-green-600 mb-2">{pkg.price} ريال</div>
                    <div className="text-lg text-gray-400 line-through">{pkg.originalPrice} ريال</div>
                  </div>
                  
                  {/* التوفير */}
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 inline-block">
                    توفير {pkg.savings} ريال
                  </div>
                  
                  {/* عدد الغسلات */}
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-800 mb-2">{pkg.washes}</div>
                    <p className="text-gray-600 font-semibold">غسلة</p>
                  </div>
                </div>
                
                {/* مميزات الباقة */}
                <div className="mb-8 flex-grow">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">المميزات:</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <UnifiedButton 
                  variant="gradient"
                  size="large"
                  onClick={() => handleCheckout(pkg.type)}
                  className="w-full mt-auto"
                >
                  احجز الآن
                </UnifiedButton>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Packages; 
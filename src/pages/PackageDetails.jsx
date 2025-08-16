import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaMapMarkerAlt, FaStar, FaPhone, FaDirections, FaCheckCircle, FaArrowRight, FaClock, FaUsers, FaShieldAlt, FaLeaf, FaUser, FaEnvelope, FaCrown, FaGift, FaGem } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import UnifiedButton from '../components/common/UnifiedButton';
import UnifiedIcon from '../components/common/UnifiedIcon';
import { PACKAGE_TYPES, CAR_TYPES, isVIPPackage, requiresHotelSelection } from '../utils/qrSystem';

const PackageDetails = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedCarType, setSelectedCarType] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    
    // قراءة بيانات الباقة من localStorage
    const packageData = localStorage.getItem('selectedPackage');
    if (packageData) {
      const parsedData = JSON.parse(packageData);
      setSelectedPackage(parsedData);
      setSelectedCarType(parsedData.carType);
    } else {
      navigate('/packages');
    }
  }, [navigate]);

  // أنواع السيارات
  const carTypes = [
    { value: 'small', label: 'سيارة صغيرة', icon: FaCar, description: 'سيدان، هاتشباك' },
    { value: 'medium', label: 'سيارة متوسطة', icon: FaCar, description: 'SUV، كروس أوفر' },
    { value: 'large', label: 'سيارة كبيرة', icon: FaCar, description: 'فان، بيك أب' }
  ];

  const getPackageDetails = () => {
    if (!selectedPackage) return null;

    const packages = {
      basic: {
        name: 'الباقة الأساسية',
        washes: 5, // 4 مدفوع + 1 مجاني
        price: 150,
        originalPrice: 235, // 4 × 58.75 = 235
        savings: 85,
        features: ['4 غسلات بالصابون الإيطالي الفاخر', 'غسيل بطبقتين من الصابون', 'غسلة إضافية مجانية', 'معطر داخلي مجاني'],
        color: 'from-green-500 to-green-600',
        gradient: 'from-green-50 to-green-100',
        icon: FaCar,
        description: 'الخيار المثالي لمن يبحث عن نظافة أساسية مع توفير إضافي!',
        badge: 'الأكثر طلباً',
        validity: 'شهر واحد'
      },
      advanced: {
        name: 'الباقة المتقدمة',
        washes: 10, // 8 مدفوع + 2 مجاني
        price: 280,
        originalPrice: 420, // 8 × 52.5 = 420
        savings: 140,
        features: ['8 غسلات بالصابون الإيطالي الفاخر', 'غسيل بطبقتين من الصابون', 'غسلتان مجانيتان', 'معطر داخلي فاخر'],
        color: 'from-green-500 to-emerald-600',
        gradient: 'from-green-50 to-emerald-100',
        icon: FaShieldAlt,
        description: 'الخيار العملي للنظافة المثالية بسعر تنافسي',
        badge: 'الأفضل قيمة',
        validity: 'شهر واحد'
      },
      premium: {
        name: 'الباقة الشاملة',
        washes: 18, // 14 مدفوع + 4 مجاني
        price: 490,
        originalPrice: 770, // 14 × 55 = 770
        savings: 280,
        features: ['14 غسلة بالصابون الإيطالي الفاخر', 'غسيل بطبقتين من الصابون', '4 غسلات مجانية', 'معطر داخلي فاخر'],
        color: 'from-emerald-500 to-green-600',
        gradient: 'from-emerald-50 to-green-100',
        icon: FaStar,
        description: 'الخيار الأمثل لمن يريد العناية القصوى بسيارته مع أكبر قدر من التوفير',
        badge: 'الأكثر شمولية',
        validity: 'شهر واحد'
      },
      vip: {
        name: 'الباقة VIP',
        washes: 1,
        price: 150,
        originalPrice: 235,
        savings: 85,
        features: ['غسيل شامل شامل', 'تلميع احترافي', 'شمع حماية', 'خدمة VIP متميزة'],
        color: 'from-green-500 to-emerald-600',
        gradient: 'from-green-50 to-emerald-100',
        icon: FaCrown,
        description: 'باقة VIP للفنادق وكبار الشخصيات - غسلة واحدة مع المواقف والفاليه',
        badge: 'VIP حصري',
        validity: 'شهر واحد'
      }
    };

    return packages[selectedPackage.type];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProceedToCheckout = () => {
    if (!selectedCarType) {
      alert('يرجى اختيار نوع السيارة');
      return;
    }

    if (!customerInfo.name || !customerInfo.phone) {
      alert('يرجى إدخال اسم العميل ورقم الهاتف');
      return;
    }

    // التحقق من كون الباقة VIP
    if (isVIPPackage(selectedPackage.type)) {
      // إذا كانت باقة VIP، انتقل إلى صفحة VIP المخصصة
      navigate('/vip-package-details');
      return;
    }

    // منع التكرار - التحقق من عدم وجود بيانات سابقة
    const existingCheckout = localStorage.getItem('checkoutData');
    if (existingCheckout) {
      const shouldReplace = window.confirm('يوجد طلب سابق. هل تريد استبداله بالطلب الجديد؟');
      if (!shouldReplace) {
        return;
      }
    }

    // حفظ البيانات المختارة باستخدام النظام المركزي
    const checkoutData = {
      ...selectedPackage,
      carType: selectedCarType,
      carTypeLabel: carTypes.find(car => car.value === selectedCarType)?.label,
      customer: customerInfo
    };

    // حفظ في localStorage بالشكل المتوافق مع النظام المركزي
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    localStorage.setItem('packageDetails', JSON.stringify({
      type: selectedPackage.type,
      name: selectedPackage.name || PACKAGE_TYPES[selectedPackage.type]?.name,
      washes: selectedPackage.washes,
      price: selectedPackage.price,
      originalPrice: selectedPackage.originalPrice,
      savings: selectedPackage.savings,
      validity: PACKAGE_TYPES[selectedPackage.type]?.validity || 30,
      isVIP: isVIPPackage(selectedPackage.type)
    }));
    localStorage.setItem('orderDetails', JSON.stringify({
      carType: selectedCarType,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      customerEmail: customerInfo.email
    }));
    
    // مسح أي بيانات سابقة
    localStorage.removeItem('qrCodeData');
    localStorage.removeItem('scannedQRData');
    
    navigate('/checkout');
  };

  const packageDetails = getPackageDetails();

  if (!selectedPackage || !packageDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  // التحقق من كون الباقة VIP
  const isVIP = isVIPPackage(selectedPackage.type);

  return (
    <>
      <Helmet>
        <title>تفاصيل الباقة - {packageDetails.name} | شركة غسيل السيارات</title>
        <meta name="description" content={`تفاصيل ${packageDetails.name} مع ${packageDetails.washes} غسلة بسعر ${packageDetails.price} ريال. احصل على توفير ${packageDetails.savings} ريال مع خدمات شاملة للسيارات`} />
        <meta name="keywords" content="غسيل سيارات, باقات غسيل, غسيل خارجي, غسيل داخلي, تلميع سيارات, معطر سيارات" />
        <meta property="og:title" content={`تفاصيل الباقة - ${packageDetails.name}`} />
        <meta property="og:description" content={`تفاصيل ${packageDetails.name} مع ${packageDetails.washes} غسلة بسعر ${packageDetails.price} ريال`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/package-details" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`تفاصيل الباقة - ${packageDetails.name}`} />
        <meta name="twitter:description" content={`تفاصيل ${packageDetails.name} مع ${packageDetails.washes} غسلة`} />
        <link rel="canonical" href="/package-details" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": packageDetails.name,
            "description": packageDetails.description,
            "provider": {
              "@type": "Organization",
              "name": "شركة غسيل السيارات"
            },
            "offers": {
              "@type": "Offer",
              "price": packageDetails.price,
              "priceCurrency": "SAR",
              "availability": "https://schema.org/InStock"
            }
          })}
        </script>
      </Helmet>

      <PageHeader 
        title="تفاصيل الباقة"
        subtitle={`${packageDetails.name} - ${packageDetails.washes} غسلة`}
        background={isVIP ? "bg-gradient-to-r from-yellow-500 to-yellow-600" : "bg-gradient-to-r from-green-500 to-emerald-600"}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* تنبيه VIP */}
          {isVIP && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-2xl p-6">
                <div className="flex items-center justify-center mb-3">
                  <FaCrown className="w-6 h-6 text-yellow-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-800">باقة VIP حصرية</h3>
                </div>
                <p className="text-gray-600 text-center mb-4">
                  هذه الباقة متاحة حصرياً في فنادقنا المميزة. ستتمكن من اختيار الفندق في الخطوة التالية.
                </p>
                <div className="text-center">
                  <button
                    onClick={() => navigate('/vip-package-details')}
                    className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300"
                  >
                    <FaCrown className="w-4 h-4 inline mr-2" />
                    الانتقال لصفحة VIP
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid lg:grid-cols-2 gap-12">
            {/* تفاصيل الباقة */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className={`bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 relative overflow-hidden ${isVIP ? 'border-yellow-200' : ''}`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-100 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="text-center mb-8 relative z-10">
                  <div className="mx-auto mb-6">
                    <div className={`w-24 h-24 bg-gradient-to-r ${packageDetails.color} text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg`}>
                      <packageDetails.icon className="w-12 h-12" />
                    </div>
                  </div>
                  
                  {/* شارة VIP */}
                  {isVIP && (
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                      <FaCrown className="w-4 h-4" />
                      VIP حصري
                      <FaCrown className="w-4 h-4" />
                    </div>
                  )}
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border border-green-200">
                    <div className="text-6xl font-bold text-green-700 mb-2">{selectedPackage.price} ريال</div>
                    <div className="text-xl text-gray-500 line-through mb-3">{selectedPackage.originalPrice} ريال</div>
                    <div className="inline-block">
                      <span className="bg-green-600 text-white px-4 py-2 rounded-full text-lg font-bold">
                      توفير {selectedPackage.savings} ريال
                      </span>
                    </div>
                  </div>
                </div>

                {/* المميزات */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">مميزات الباقة</h3>
                  {packageDetails.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                        <FaCheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* معلومات إضافية */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{packageDetails.washes}</div>
                      <div className="text-sm text-gray-600">
                        {isVIP ? 'غسلة VIP' : 'عدد الغسلات'}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{packageDetails.validity}</div>
                      <div className="text-sm text-gray-600">صلاحية الباقة</div>
                    </div>
                  </div>
                  
                  {/* تنبيه خاص بـ VIP */}
                  {isVIP && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                      <div className="flex items-center">
                        <FaCrown className="w-4 h-4 text-yellow-600 mr-2" />
                        <span className="text-yellow-800 text-sm font-medium">
                          صالح في الفنادق المحددة فقط
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* نموذج الحجز */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  {isVIP ? 'معلومات VIP' : 'معلومات الحجز'}
                </h2>

                {/* اختيار نوع السيارة */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-3">نوع السيارة</label>
                  <div className="grid grid-cols-1 gap-3">
                    {carTypes.map((car) => (
                      <div
                        key={car.value}
                        onClick={() => setSelectedCarType(car.value)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          selectedCarType === car.value
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <car.icon className={`w-6 h-6 ${selectedCarType === car.value ? 'text-green-600' : 'text-gray-400'}`} />
                          <div>
                            <div className="font-semibold text-gray-800">{car.label}</div>
                            <div className="text-sm text-gray-600">{car.description}</div>
                          </div>
                          {selectedCarType === car.value && (
                            <FaCheckCircle className="w-5 h-5 text-green-600 mr-auto" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* معلومات العميل */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">اسم العميل *</label>
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="أدخل اسمك الكامل"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">رقم الهاتف *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="+966501234567"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                {/* ملخص الطلب */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">ملخص الطلب</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">الباقة:</span>
                      <span className="font-semibold">{packageDetails.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">عدد الغسلات:</span>
                      <span className="font-semibold">{packageDetails.washes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">نوع السيارة:</span>
                      <span className="font-semibold">
                        {selectedCarType ? carTypes.find(car => car.value === selectedCarType)?.label : 'لم يتم الاختيار'}
                      </span>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>الإجمالي:</span>
                      <span className="text-green-600">{selectedPackage.price} ريال</span>
                    </div>
                  </div>
                </div>

                {/* زر المتابعة */}
                <UnifiedButton
                  onClick={handleProceedToCheckout}
                  className={`w-full py-4 text-lg font-bold text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                    isVIP 
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                  }`}
                  disabled={!selectedCarType || !customerInfo.name || !customerInfo.phone}
                >
                  <FaArrowRight className="w-5 h-5 ml-2" />
                  {isVIP ? 'متابعة VIP' : 'متابعة الدفع'}
                </UnifiedButton>

                <p className="text-center text-gray-500 text-sm mt-4">
                  * الحقول المطلوبة
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageDetails; 
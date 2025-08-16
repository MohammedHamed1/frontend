import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaApple, FaLock, FaShieldAlt, FaCheckCircle, FaArrowLeft, FaMapMarkerAlt, FaCar, FaStar, FaPhone, FaClock, FaUser } from 'react-icons/fa';
import PageHeader from './common/PageHeader';

const Checkout = () => {
  const [checkoutData, setCheckoutData] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // قراءة بيانات الدفع من localStorage
    const data = localStorage.getItem('checkoutData');
    if (data) {
      setCheckoutData(JSON.parse(data));
    } else {
      navigate('/packages');
    }
  }, [navigate]);

  const paymentMethods = [
    {
      id: 'credit',
      name: 'بطاقة ائتمان',
      icon: FaCreditCard,
      description: 'فيزا، ماستركارد، مدى',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      id: 'apple',
      name: 'Apple Pay',
      icon: FaApple,
      description: 'دفع سريع وآمن',
      color: 'from-gray-800 to-gray-900',
      bgColor: 'from-gray-50 to-gray-100'
    }
  ];

  const getPackageDetails = () => {
    if (!checkoutData) return null;

    const packages = {
      basic: {
        name: 'الباقة الأساسية',
        washes: 5,
        price: 150,
        originalPrice: 200,
        savings: 50,
        color: 'from-blue-500 to-blue-600'
      },
      advanced: {
        name: 'الباقة المتقدمة',
        washes: 8,
        price: 250,
        originalPrice: 320,
        savings: 70,
        color: 'from-green-500 to-green-600'
      },
      premium: {
        name: 'الباقة المميزة',
        washes: 12,
        price: 350,
        originalPrice: 450,
        savings: 100,
        color: 'from-purple-500 to-purple-600'
      },
      vip: {
        name: 'الباقة VIP',
        washes: 1,
        price: 150,
        originalPrice: 235,
        savings: 85,
        color: 'from-orange-500 to-orange-600'
      }
    };

    return packages[checkoutData.type];
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // محاكاة عملية الدفع
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/payment-success');
    }, 2000);
  };

  const packageDetails = getPackageDetails();

  if (!checkoutData || !packageDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>إتمام الطلب - {packageDetails.name} | شركة غسيل السيارات</title>
        <meta name="description" content={`إتمام طلب ${packageDetails.name} مع ${packageDetails.washes} غسلة بسعر ${packageDetails.price} ريال. دفع آمن ومضمون`} />
        <meta name="keywords" content="دفع آمن, بطاقة ائتمان, Apple Pay, غسيل سيارات, باقات غسيل" />
        <meta property="og:title" content={`إتمام الطلب - ${packageDetails.name}`} />
        <meta property="og:description" content={`إتمام طلب ${packageDetails.name} مع ${packageDetails.washes} غسلة`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/checkout" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`إتمام الطلب - ${packageDetails.name}`} />
        <meta name="twitter:description" content={`إتمام طلب ${packageDetails.name} مع ${packageDetails.washes} غسلة`} />
        <link rel="canonical" href="/checkout" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CheckoutPage",
            "name": `إتمام الطلب - ${packageDetails.name}`,
            "description": `إتمام طلب ${packageDetails.name} مع ${packageDetails.washes} غسلة`,
            "provider": {
              "@type": "Organization",
              "name": "شركة غسيل السيارات"
            },
            "offers": {
              "@type": "Offer",
              "price": packageDetails.price,
              "priceCurrency": "SAR"
            }
          })}
        </script>
      </Helmet>

      <div className="header-spacer"></div>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <PageHeader 
          title="إتمام الطلب"
          subtitle="اختر طريقة الدفع وأكمل طلبك"
          breadcrumbs={['الرئيسية', 'الباقات', 'تفاصيل الباقة', 'إتمام الطلب']}
        />

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* تفاصيل الطلب */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  ملخص الطلب
            </h2>
            
                {/* تفاصيل الباقة */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{packageDetails.name}</h3>
                    <div className={`w-12 h-12 bg-gradient-to-r ${packageDetails.color} text-white rounded-2xl flex items-center justify-center`}>
                      <FaCar className="w-6 h-6" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">{packageDetails.washes}</div>
                      <div className="text-gray-600">غسلة</div>
                </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{packageDetails.price} ريال</div>
                      <div className="text-gray-400 line-through text-sm">{packageDetails.originalPrice} ريال</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-center font-bold">
                    توفير {packageDetails.savings} ريال
                  </div>
                </div>

                {/* تفاصيل العميل */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaUser className="text-green-500" />
                    بيانات العميل
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800">الاسم:</span>
                      <span className="text-gray-600">{checkoutData.customer?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800">الهاتف:</span>
                      <span className="text-gray-600">{checkoutData.customer?.phone}</span>
                    </div>
                    {checkoutData.customer?.email && (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">البريد الإلكتروني:</span>
                        <span className="text-gray-600">{checkoutData.customer.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* تفاصيل السيارة */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaCar className="text-blue-500" />
                    نوع السيارة
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {checkoutData.carType === 'small' && '🚗'}
                      {checkoutData.carType === 'medium' && '🚙'}
                      {checkoutData.carType === 'large' && '🚛'}
                      {checkoutData.carType === 'luxury' && '🏎️'}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">
                        {checkoutData.carType === 'small' && 'سيارة صغيرة'}
                        {checkoutData.carType === 'medium' && 'سيارة متوسطة'}
                        {checkoutData.carType === 'large' && 'سيارة كبيرة'}
                        {checkoutData.carType === 'luxury' && 'سيارة فاخرة'}
                  </div>
                      <div className="text-sm text-gray-600">
                        {checkoutData.carType === 'small' && 'سيارة صغيرة'}
                        {checkoutData.carType === 'medium' && 'SUV، كروس أوفر'}
                        {checkoutData.carType === 'large' && 'شاحنة، فان'}
                        {checkoutData.carType === 'luxury' && 'سيارات رياضية، فاخرة'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* تفاصيل الفرع */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    الفرع المختار
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <FaStar className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold">{checkoutData.branch.rating}</span>
                        <span className="text-gray-500 text-sm">({checkoutData.branch.customers} عميل)</span>
                      </div>
                      <div className="text-green-600 font-bold text-sm">{checkoutData.branch.distance}</div>
                    </div>
                    
                    <h4 className="font-bold text-gray-800">{checkoutData.branch.name}</h4>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaMapMarkerAlt className="w-4 h-4 text-red-500" />
                      <span className="text-sm">{checkoutData.branch.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaPhone className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{checkoutData.branch.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaClock className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">{checkoutData.branch.workingHours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* طرق الدفع */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* طرق الدفع */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                  <FaLock className="text-green-500" />
                  طريقة الدفع
                </h2>
                
                <div className="space-y-4 mb-8">
                  {paymentMethods.map((method) => (
                    <button 
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-right transform hover:scale-[1.02] ${
                        selectedPaymentMethod === method.id
                          ? `border-green-500 bg-gradient-to-r ${method.bgColor} shadow-lg ring-2 ring-green-200`
                          : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${method.color} text-white rounded-2xl flex items-center justify-center`}>
                            <method.icon className="w-6 h-6" />
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-800 text-lg">{method.name}</div>
                            <div className="text-gray-600">{method.description}</div>
                          </div>
                        </div>
                        {selectedPaymentMethod === method.id && (
                          <FaCheckCircle className="w-6 h-6 text-green-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* معلومات الأمان */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <FaShieldAlt className="w-6 h-6 text-green-600" />
                    <h3 className="font-bold text-green-800">دفع آمن ومضمون</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      تشفير SSL لحماية بياناتك
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      لا نخزن بيانات البطاقة
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      ضمان استرداد الأموال
                    </li>
                  </ul>
                </div>
            </div>
            
              {/* ملخص السعر */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">ملخص السعر</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">سعر الباقة:</span>
                    <span className="font-bold">{packageDetails.originalPrice} ريال</span>
                  </div>
                  <div className="flex justify-between items-center text-green-600">
                    <span>التوفير:</span>
                    <span className="font-bold">-{packageDetails.savings} ريال</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">السعر النهائي:</span>
                      <span className="text-2xl font-bold text-green-600">{packageDetails.price} ريال</span>
                    </div>
            </div>
          </div>
          
                {/* زر الدفع */}
                <motion.button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                  whileHover={!isProcessing ? { scale: 1.05 } : {}}
                  whileTap={!isProcessing ? { scale: 0.95 } : {}}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>جاري معالجة الدفع...</span>
                    </>
                  ) : (
                    <>
                      <FaLock className="w-5 h-5" />
                      <span>إتمام الدفع</span>
                    </>
                  )}
                </motion.button>

                {/* زر العودة */}
                <button
                  onClick={() => navigate('/package-details')}
                  className="w-full mt-4 py-3 px-6 rounded-2xl border-2 border-gray-300 text-gray-600 font-bold transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <FaArrowLeft className="w-4 h-4" />
                  العودة للخلف
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout; 
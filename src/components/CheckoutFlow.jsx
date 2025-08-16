import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaQrcode, FaCheckCircle, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const CheckoutFlow = ({ selectedPackage, selectedCarType, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [qrCode, setQrCode] = useState(null);

  // حساب السعر
  const packagePrices = {
    'small': {
      basic: { price: 150, originalPrice: 235, savings: 85, washes: 5 },
      advanced: { price: 280, originalPrice: 420, savings: 140, washes: 10 },
      premium: { price: 490, originalPrice: 770, savings: 280, washes: 18 }
    },
    'medium': {
      basic: { price: 180, originalPrice: 270, savings: 90, washes: 5 },
      advanced: { price: 320, originalPrice: 480, savings: 160, washes: 10 },
      premium: { price: 530, originalPrice: 830, savings: 300, washes: 18 }
    },
    'large': {
      basic: { price: 220, originalPrice: 330, savings: 110, washes: 5 },
      advanced: { price: 360, originalPrice: 540, savings: 180, washes: 10 },
      premium: { price: 570, originalPrice: 890, savings: 320, washes: 18 }
    }
  };

  const currentPrice = packagePrices[selectedCarType]?.[selectedPackage] || { price: 0, washes: 0 };

  // محاكاة عملية الدفع
  const handlePayment = async () => {
    setLoading(true);
    
    // محاكاة تأخير الدفع
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // إنشاء بيانات الطلب
    const order = {
      id: 'ORD-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
      package: selectedPackage,
      carType: selectedCarType,
      price: currentPrice.price,
      washes: currentPrice.washes,
      date: new Date().toISOString(),
      status: 'paid'
    };
    
    setOrderData(order);
    setCurrentStep(3);
    setLoading(false);
  };

  // إنشاء QR Code
  const generateQRCode = async () => {
    setLoading(true);
    
    // محاكاة إنشاء QR
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const qrData = {
      operationId: 'QR-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
      customerName: 'عميل تجريبي',
      packageName: selectedPackage === 'basic' ? 'الباقة الأساسية' : 
                   selectedPackage === 'advanced' ? 'الباقة المتقدمة' : 'الباقة المميزة',
      packageType: selectedPackage,
      remainingWashes: currentPrice.washes,
      totalWashes: currentPrice.washes,
      startDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString(),
      packageStatus: 'active',
      usageHistory: []
    };
    
    // حفظ QR في localStorage
    localStorage.setItem('qrCodeData', JSON.stringify(qrData));
    
    setQrCode(qrData);
    setCurrentStep(4);
    setLoading(false);
  };

  const steps = [
    { id: 1, title: 'تأكيد الطلب', icon: FaCheckCircle },
    { id: 2, title: 'الدفع', icon: FaCreditCard },
    { id: 3, title: 'معالجة الطلب', icon: FaCheckCircle },
    { id: 4, title: 'QR Code', icon: FaQrcode }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* شريط التقدم */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : 'bg-gray-100 border-gray-300 text-gray-500'
                }`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <span className={`ml-3 text-sm font-medium ${
                  currentStep >= step.id ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* محتوى الخطوات */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                تأكيد طلبك
              </h2>
              
              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">
                  تفاصيل الطلب
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">نوع الباقة:</span>
                    <span className="font-medium">
                      {selectedPackage === 'basic' ? 'الباقة الأساسية' : 
                       selectedPackage === 'advanced' ? 'الباقة المتقدمة' : 'الباقة المميزة'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">نوع السيارة:</span>
                    <span className="font-medium">
                      {selectedCarType === 'small' ? 'سيارة صغيرة' : 
                       selectedCarType === 'medium' ? 'سيارة متوسطة' : 'سيارة كبيرة'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">عدد الغسلات:</span>
                    <span className="font-medium">{currentPrice.washes} غسلة</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-green-600">
                    <span>السعر الإجمالي:</span>
                    <span>{currentPrice.price} ريال</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={onBack}
                  className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <FaArrowLeft className="ml-2" />
                  رجوع
                </button>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  متابعة الدفع
                  <FaArrowRight className="mr-2" />
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                إتمام الدفع
              </h2>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">
                  محاكاة الدفع التجريبي
                </h3>
                <p className="text-blue-700 mb-4">
                  هذا نظام تجريبي. في النظام الفعلي سيتم ربط نظام دفع حقيقي.
                </p>
                <div className="bg-white rounded p-4 border border-blue-200">
                  <div className="flex justify-between mb-2">
                    <span>المبلغ:</span>
                    <span className="font-bold">{currentPrice.price} ريال</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    سيتم خصم المبلغ من حسابك
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <FaArrowLeft className="ml-2" />
                  رجوع
                </button>
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      جاري الدفع...
                    </>
                  ) : (
                    <>
                      إتمام الدفع
                      <FaArrowRight className="mr-2" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                معالجة الطلب
              </h2>
              
              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <div className="text-center">
                  <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    تم الدفع بنجاح!
                  </h3>
                  <p className="text-green-700 mb-4">
                    رقم الطلب: {orderData?.id}
                  </p>
                  <div className="bg-white rounded p-4 border border-green-200">
                    <div className="text-sm text-gray-600 mb-2">تفاصيل الطلب:</div>
                    <div className="space-y-1 text-sm">
                      <div>الباقة: {orderData?.package}</div>
                      <div>نوع السيارة: {orderData?.carType}</div>
                      <div>عدد الغسلات: {orderData?.washes}</div>
                      <div className="font-bold">السعر: {orderData?.price} ريال</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={generateQRCode}
                  disabled={loading}
                  className="flex items-center justify-center mx-auto px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      جاري إنشاء QR Code...
                    </>
                  ) : (
                    <>
                      إنشاء QR Code
                      <FaQrcode className="mr-2" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                QR Code الخاص بك
              </h2>
              
              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <div className="text-center">
                  <div className="bg-white rounded-lg p-8 border-2 border-green-300 mb-6">
                    <div className="text-6xl mb-4">📱</div>
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      QR Code جاهز!
                    </div>
                    <div className="text-sm text-gray-600">
                      رقم العملية: {qrCode?.operationId}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded p-4 border border-green-200 mb-4">
                    <h4 className="font-semibold text-green-800 mb-2">تفاصيل QR Code:</h4>
                    <div className="space-y-1 text-sm">
                      <div>اسم العميل: {qrCode?.customerName}</div>
                      <div>الباقة: {qrCode?.packageName}</div>
                      <div>الغسلات المتبقية: {qrCode?.remainingWashes}</div>
                      <div>تاريخ الانتهاء: {new Date(qrCode?.expiryDate).toLocaleDateString('ar-SA')}</div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">تعليمات الاستخدام:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1 text-right">
                      <li>• احفظ QR Code في هاتفك</li>
                      <li>• اذهب لأقرب فرع من فروعنا</li>
                      <li>• اعرض QR Code للموظف</li>
                      <li>• سيتم خصم غسلة واحدة تلقائياً</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4 space-x-reverse">
                <button
                  onClick={() => onComplete && onComplete(qrCode)}
                  className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  تم، شكراً لك
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  طباعة QR Code
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CheckoutFlow; 
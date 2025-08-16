import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  Lock,
  User,
  Phone,
  Mail,
  Car,
  Package,
  Calendar,
  MapPin,
  Apple,
  Eye,
  EyeOff,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { generateQRCode } from '../utils/qrSystem';
import UnifiedButton from '../components/common/UnifiedButton';
import { orderAPI, paymentAPI, qrAPI } from '../api';

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // بيانات البطاقة
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  
  // حالة التحقق من البطاقة
  const [cardValidation, setCardValidation] = useState({
    number: false,
    name: false,
    expiry: false,
    cvv: false
  });

  useEffect(() => {
    setIsVisible(true);
    loadCheckoutData();
  }, []);

  const loadCheckoutData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // قراءة البيانات من localStorage
      const storedCheckout = localStorage.getItem('checkoutData');
      const storedPackage = localStorage.getItem('packageDetails');
      const storedOrder = localStorage.getItem('orderDetails');
      
      if (storedCheckout) {
        setCheckoutData(JSON.parse(storedCheckout));
      }
      
      if (storedPackage) {
        setPackageDetails(JSON.parse(storedPackage));
      }
      
      if (storedOrder) {
        setOrderDetails(JSON.parse(storedOrder));
      }
    } catch (error) {
      console.error('Error loading checkout data:', error);
      setError('حدث خطأ في تحميل بيانات الطلب');
    } finally {
      setLoading(false);
    }
  };

  // تحديد نوع البطاقة
  const getCardType = (number) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'visa';
    if (cleanNumber.startsWith('5')) return 'mastercard';
    if (cleanNumber.startsWith('6')) return 'mada';
    return 'unknown';
  };

  // التحقق من صحة رقم البطاقة
  const validateCardNumber = (number) => {
    const cleanNumber = number.replace(/\s/g, '');
    return cleanNumber.length >= 13 && cleanNumber.length <= 19;
  };

  // التحقق من صحة تاريخ الانتهاء
  const validateExpiry = (expiry) => {
    if (!expiry || expiry.length !== 5) return false;
    
    const [month, year] = expiry.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expMonth = parseInt(month);
    const expYear = parseInt(year);
    
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    if (expMonth < 1 || expMonth > 12) return false;
    
    return true;
  };

  // التحقق من صحة CVV
  const validateCVV = (cvv) => {
    return cvv.length >= 3 && cvv.length <= 4 && /^\d+$/.test(cvv);
  };

  // تنسيق رقم البطاقة
  const formatCardNumber = (value) => {
    const cleanValue = value.replace(/\s/g, '');
    const groups = cleanValue.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleanValue;
  };

  // تنسيق تاريخ الانتهاء
  const formatExpiry = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length >= 2) {
      return cleanValue.slice(0, 2) + '/' + cleanValue.slice(2, 4);
    }
    return cleanValue;
  };

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;
    
    switch (field) {
      case 'number':
        formattedValue = formatCardNumber(value);
        setCardValidation(prev => ({
          ...prev,
          number: validateCardNumber(value)
        }));
        break;
      case 'name':
        setCardValidation(prev => ({
          ...prev,
          name: value.trim().length >= 3
        }));
        break;
      case 'expiry':
        formattedValue = formatExpiry(value);
        setCardValidation(prev => ({
          ...prev,
          expiry: validateExpiry(formattedValue)
        }));
        break;
      case 'cvv':
        setCardValidation(prev => ({
          ...prev,
          cvv: validateCVV(value)
        }));
        break;
      default:
        break;
    }
    
    setCardData(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const paymentMethods = [
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      icon: Apple,
      description: 'الدفع السريع عبر Apple Pay',
      color: 'from-black to-gray-800'
    },
    {
      id: 'card',
      name: 'بطاقة ائتمان',
      icon: CreditCard,
      description: 'فيزا، ماستركارد، مدى',
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const handlePaymentMethodSelect = (methodId) => {
    setSelectedPaymentMethod(methodId);
    setShowCardForm(methodId === 'card');
  };

  const isFormValid = () => {
    if (selectedPaymentMethod === 'card') {
      return Object.values(cardValidation).every(valid => valid);
    }
    return true;
  };

  const handlePayment = async () => {
    if (!checkoutData || !packageDetails || !orderDetails) {
      alert('بيانات الطلب غير مكتملة');
      return;
    }

    if (selectedPaymentMethod === 'card' && !isFormValid()) {
      alert('يرجى التأكد من صحة بيانات البطاقة');
      return;
    }

    setIsProcessing(true);

    try {
      // إنشاء الطلب
      const orderResponse = await orderAPI.create({
        packageId: packageDetails.id,
        customerId: orderDetails.customerId,
        branchId: orderDetails.branchId,
        totalAmount: packageDetails.price,
        carType: packageDetails.carType
      });

      // إنشاء الدفع
      const paymentResponse = await paymentAPI.create({
        orderId: orderResponse.data.id,
        amount: packageDetails.price,
        paymentMethod: selectedPaymentMethod,
        cardType: selectedPaymentMethod === 'card' ? getCardType(cardData.number) : null
      });

      // إنشاء QR Code
      const qrResponse = await qrAPI.generate(orderResponse.data.id);

      // حفظ بيانات الطلب النهائية
      const finalOrderData = {
        orderId: orderResponse.data.id,
        paymentId: paymentResponse.data.id,
        package: packageDetails,
        customer: orderDetails,
        paymentMethod: selectedPaymentMethod,
        cardType: selectedPaymentMethod === 'card' ? getCardType(cardData.number) : null,
        totalAmount: packageDetails.price,
        orderDate: new Date().toISOString(),
        status: 'completed',
        qrCode: qrResponse.data
      };

      localStorage.setItem('orderDetails', JSON.stringify(finalOrderData));
      localStorage.setItem('qrCodeData', JSON.stringify(qrResponse.data));

      // الانتقال إلى صفحة نجاح الدفع
      navigate('/payment-success', {
        state: {
          orderId: orderResponse.data.id,
          paymentId: paymentResponse.data.id,
          qrCode: qrResponse.data
        }
      });
    } catch (error) {
      console.error('Payment error:', error);
      alert('حدث خطأ أثناء معالجة الدفع: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل بيانات الطلب...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <UnifiedButton onClick={loadCheckoutData} variant="primary">
            إعادة المحاولة
          </UnifiedButton>
        </div>
      </div>
    );
  }

  if (!checkoutData || !packageDetails || !orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">بيانات الطلب غير متوفرة</p>
          <UnifiedButton onClick={() => navigate('/packages')} variant="primary" className="mt-4">
            العودة للباقات
          </UnifiedButton>
        </div>
      </div>
    );
  }

  const cardType = getCardType(cardData.number);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">إتمام الطلب</h1>
          <p className="text-gray-600">أدخل بيانات الدفع لإتمام عملية الشراء</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* تفاصيل الطلب */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Package className="w-5 h-5 text-green-600 mr-2" />
                تفاصيل الطلب
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Package className="w-4 h-4 text-green-600 mr-2" />
                    <span className="font-medium">{packageDetails.name}</span>
                  </div>
                  <span className="text-green-600 font-bold">{packageDetails.washes} غسلة</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Car className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="font-medium">نوع السيارة</span>
                  </div>
                  <span className="text-blue-600">{orderDetails.carType}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-purple-600 mr-2" />
                    <span className="font-medium">العميل</span>
                  </div>
                  <span className="text-purple-600">{orderDetails.customerName}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-orange-600 mr-2" />
                    <span className="font-medium">الهاتف</span>
                  </div>
                  <span className="text-orange-600">{orderDetails.customerPhone}</span>
                </div>
              </div>
            </div>

            {/* ملخص السعر */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">ملخص السعر</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">سعر الباقة:</span>
                  <span className="font-medium">{packageDetails.price} ريال</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">التوفير:</span>
                  <span className="text-green-600 font-medium">{packageDetails.savings} ريال</span>
                </div>
                
                <hr className="my-3" />
                
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>المجموع:</span>
                  <span>{packageDetails.price} ريال</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* طرق الدفع */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* العنوان الرئيسي */}
              <div className="payment-header mb-6">
                <div className="payment-header-icon">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="payment-header-text">طرق الدفع الآمنة</h2>
              </div>

              {/* اختيار طريقة الدفع */}
              <div className="space-y-4 mb-6">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => handlePaymentMethodSelect(method.id)}
                    className={`payment-option-card ${selectedPaymentMethod === method.id ? 'selected' : ''}`}
                  >
                    {/* علامة الاختيار */}
                    {selectedPaymentMethod === method.id && (
                      <div className="payment-option-check">
                        <svg className="payment-option-check-icon" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    
                    <div className="payment-option-content">
                      <div className={`payment-option-icon ${method.id === 'apple-pay' ? 'apple-pay-icon-container' : 'credit-card-icon-container'}`}>
                        {method.id === 'apple-pay' ? (
                          <img src="/src/assets/apple-pay.png" alt="Apple Pay" className="apple-pay-icon" />
                        ) : (
                          <svg className="credit-card-icon" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                          </svg>
                        )}
                      </div>
                      <div className="payment-option-text">
                        <h3 className="payment-option-title">{method.name}</h3>
                        <p className="payment-option-description">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* أيقونات البطاقات المقبولة */}
              {selectedPaymentMethod === 'card' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="card-icons-section"
                >
                  <div className="card-icons-header">
                    <h4 className="card-icons-title">البطاقات المقبولة</h4>
                    <p className="card-icons-subtitle">نقبل جميع البطاقات الرئيسية</p>
                  </div>
                  <div className="card-icons-grid">
                    <div className="card-icon-item">
                      <img src="/src/assets/Visa.png" alt="Visa" className="card-icon-image" />
                      <span className="card-icon-label">Visa</span>
                    </div>
                    <div className="card-icon-item">
                      <img src="/src/assets/mastercard.png" alt="Mastercard" className="card-icon-image" />
                      <span className="card-icon-label">Mastercard</span>
                    </div>
                    <div className="card-icon-item">
                      <img src="/src/assets/Mada.png" alt="Mada" className="card-icon-image" />
                      <span className="card-icon-label">مدى</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* فورم البطاقة */}
              {showCardForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  {/* نوع البطاقة */}
                  {cardType !== 'unknown' && (
                    <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                      <img 
                        src={`/src/assets/${cardType}.png`} 
                        alt={cardType}
                        className="h-8 w-auto"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <span className="mr-2 font-medium text-gray-700">
                        {cardType === 'visa' ? 'Visa' : 
                         cardType === 'mastercard' ? 'MasterCard' : 
                         cardType === 'mada' ? 'مدى' : 'بطاقة ائتمان'}
                      </span>
                    </div>
                  )}

                  {/* رقم البطاقة */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رقم البطاقة
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardData.number}
                        onChange={(e) => handleCardInputChange('number', e.target.value)}
                        placeholder="0000 0000 0000 0000"
                        maxLength="19"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          cardValidation.number ? 'border-green-500' : 
                          cardData.number ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {cardValidation.number && (
                        <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </div>

                  {/* اسم حامل البطاقة */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم حامل البطاقة
                    </label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => handleCardInputChange('name', e.target.value)}
                      placeholder="الاسم كما يظهر على البطاقة"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        cardValidation.name ? 'border-green-500' : 
                        cardData.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
              </div>

                  {/* تاريخ الانتهاء و CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        تاريخ الانتهاء
                      </label>
                      <input
                        type="text"
                        value={cardData.expiry}
                        onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                        placeholder="MM/YY"
                        maxLength="5"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          cardValidation.expiry ? 'border-green-500' : 
                          cardData.expiry ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رمز الأمان CVV
                      </label>
                      <div className="relative">
                        <input
                          type={showCVV ? "text" : "password"}
                          value={cardData.cvv}
                          onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                          placeholder="123"
                          maxLength="4"
                          className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                            cardValidation.cvv ? 'border-green-500' : 
                            cardData.cvv ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCVV(!showCVV)}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showCVV ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                </div>
              </div>
                </motion.div>
              )}

              {/* زر الدفع */}
              <div className="mt-6">
              <UnifiedButton
                  variant="gradient"
                  size="large"
                onClick={handlePayment}
                  disabled={!isFormValid() || isProcessing}
                  className="w-full"
              >
                {isProcessing ? (
                    <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    جاري المعالجة...
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                      <Lock className="w-4 h-4 mr-2" />
                      إتمام الدفع الآمن
                      <ArrowRight className="w-4 h-4 mr-2" />
                    </div>
                )}
              </UnifiedButton>
              </div>

              {/* رسالة الأمان */}
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-1" />
                  جميع المعاملات مشفرة ومؤمنة
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 
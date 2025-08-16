import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Package,
  QrCode,
  Car,
  Star,
  Clock,
  MapPin,
  Settings,
  LogOut,
  Edit,
  Download,
  Share2,
  Crown,
  Award,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Header from '../components/Header';
import Footer from '../components/footer/Footer';
import { useAuth } from '../AuthContext';
import { userAPI, packageAPI } from '../api';

const Profile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const { user, logout } = useAuth();
  const [userPackages, setUserPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (user) {
        // جلب باقات المستخدم
        const packagesResponse = await packageAPI.getUserPackages();
        setUserPackages(packagesResponse.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('حدث خطأ في تحميل بيانات المستخدم');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code-canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'paypass-qr-code.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PayPass QR Code',
          text: 'استخدم هذا QR Code للوصول إلى خدمات غسيل السيارات',
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ الرابط إلى الحافظة');
    }
  };

  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: <User className="w-5 h-5" /> },
    { id: 'package', label: 'الباقة', icon: <Package className="w-5 h-5" /> },
    { id: 'qr', label: 'QR Code', icon: <QrCode className="w-5 h-5" /> }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchUserData}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">يرجى تسجيل الدخول لعرض الملف الشخصي</p>
          <button 
            onClick={() => window.location.href = '/signin'}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  // Demo package data
  const packageData = {
    name: 'الباقة المميزة',
    type: 'premium',
    price: 299,
    originalPrice: 399,
    savings: 100,
    washes: 20,
    remainingWashes: 15,
    expiryDate: '2024-12-31',
    features: [
      'غسيل خارجي شامل',
      'غسيل داخلي شامل',
      'تلميع احترافي',
      'تعطير عالي الجودة',
      'خدمة سريعة 15 دقيقة',
      'ضمان الجودة'
    ],
    qrCode: 'PAYPASS-USER-12345-PREMIUM-2024',
    status: 'active'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Header />
              <div className="container mx-auto px-4 py-8 pt-40">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
            <User className="w-4 h-4" />
            الملف الشخصي
            <User className="w-4 h-4" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">مرحباً بك، {user.fullName}</h1>
          <p className="text-gray-600 text-lg">إدارة حسابك وباقاتك</p>
        </motion.div>

        {/* Guest Mode Notice */}
        {/* isGuest && ( */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-2xl mb-8 flex items-center gap-3"
          >
            <Award className="w-6 h-6" />
            <div>
              <p className="font-semibold">وضع الضيف</p>
              <p className="text-sm">أنت تستعرض الموقع كضيف. <a href="/signup" className="text-yellow-700 underline font-semibold">إنشاء حساب</a> للحصول على تجربة كاملة.</p>
            </div>
          </motion.div>
        {/* ) */}

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* User Info Card */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <User className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{user.fullName}</h3>
                  <p className="text-gray-600">عضو {user.isActive ? 'نشط' : 'غير نشط'}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Mail className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                      <p className="font-semibold text-gray-900">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">رقم الهاتف</p>
                      <p className="font-semibold text-gray-900">{user.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">تاريخ الانضمام</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(user.createdAt).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* {!isGuest && ( */}
                  <div className="mt-8 space-y-3">
                    <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                      <Edit className="w-5 h-5" />
                      تعديل الملف الشخصي
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full border-2 border-red-500 text-red-600 font-bold py-3 px-6 rounded-xl hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-5 h-5" />
                      تسجيل الخروج
                    </button>
                  </div>
                {/* ) */}
              </div>

              {/* Stats Card */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">إحصائيات الحساب</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">الباقات المشتراة</p>
                        <p className="text-2xl font-bold text-gray-900">{userPackages.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl flex items-center justify-center">
                        <Car className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">الغسلات المنجزة</p>
                        <p className="text-2xl font-bold text-gray-900">47</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl flex items-center justify-center">
                        <Star className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">التقييمات</p>
                        <p className="text-2xl font-bold text-gray-900">4.8</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl flex items-center justify-center">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">النقاط المكتسبة</p>
                        <p className="text-2xl font-bold text-gray-900">1,250</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Package Tab */}
          {activeTab === 'package' && (
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-4 shadow-lg">
                  <Crown className="w-4 h-4" />
                  الباقة المميزة
                  <Crown className="w-4 h-4" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{packageData.name}</h2>
                <p className="text-gray-600">باقة شاملة لجميع احتياجات غسيل سيارتك</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Package Details */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">تفاصيل الباقة</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">السعر الأصلي:</span>
                        <span className="text-gray-400 line-through">{packageData.originalPrice} ريال</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">السعر بعد الخصم:</span>
                        <span className="text-2xl font-bold text-green-600">{packageData.price} ريال</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">التوفير:</span>
                        <span className="text-green-600 font-semibold">{packageData.savings} ريال</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">حالة الباقة</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">الغسلات المتبقية:</span>
                        <span className="text-2xl font-bold text-blue-600">{packageData.remainingWashes}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">تاريخ الانتهاء:</span>
                        <span className="font-semibold text-gray-900">
                          {new Date(packageData.expiryDate).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">الحالة:</span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          نشط
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Package Features */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">مميزات الباقة</h3>
                    
                    <div className="space-y-3">
                      {packageData.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">استخدام الباقة</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700">اذهب إلى أقرب فرع</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <QrCode className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700">امسح QR Code الخاص بك</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Car className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700">استمتع بالخدمة</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <Package className="w-5 h-5" />
                  شراء باقة جديدة
                </button>
                <button className="flex-1 border-2 border-green-500 text-green-600 font-bold py-4 px-6 rounded-xl hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2">
                  <Settings className="w-5 h-5" />
                  إدارة الباقات
                </button>
              </div>
            </div>
          )}

          {/* QR Code Tab */}
          {activeTab === 'qr' && (
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-4 shadow-lg">
                  <QrCode className="w-4 h-4" />
                  QR Code الخاص بك
                  <QrCode className="w-4 h-4" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">استخدم QR Code</h2>
                <p className="text-gray-600">امسح هذا الكود في أي فرع لاستخدام باقاتك</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* QR Code Display */}
                <div className="text-center">
                  <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 inline-block">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl mb-6">
                      <h3 className="font-bold text-lg">PayPass</h3>
                      <p className="text-sm opacity-90">الباقة المميزة</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-2xl border-2 border-gray-200 mb-4">
                      <QRCodeSVG
                        id="qr-code-canvas"
                        value={packageData.qrCode}
                        size={200}
                        level="H"
                        includeMargin={true}
                        className="mx-auto"
                      />
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-2">كود المستخدم</p>
                      <p className="font-mono text-lg font-bold text-gray-900 bg-gray-100 px-4 py-2 rounded-xl">
                        {packageData.qrCode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">كيفية الاستخدام</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">اذهب إلى أقرب فرع</p>
                          <p className="text-gray-600">اختر الفرع المناسب لك من قائمة فروعنا</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">امسح QR Code</p>
                          <p className="text-gray-600">عرض الكود للجهاز الماسح في الفرع</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">استمتع بالخدمة</p>
                          <p className="text-gray-600">سيتم خصم غسلة واحدة من باقاتك</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">معلومات مهمة</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">صالح حتى: {new Date(packageData.expiryDate).toLocaleDateString('ar-SA')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">الغسلات المتبقية: {packageData.remainingWashes}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">الباقة: {packageData.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={downloadQRCode}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  تحميل QR Code
                </button>
                <button 
                  onClick={shareQRCode}
                  className="flex-1 border-2 border-green-500 text-green-600 font-bold py-4 px-6 rounded-xl hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  مشاركة QR Code
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile; 
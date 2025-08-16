import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  QrCode, 
  CheckCircle, 
  Clock, 
  MapPin, 
  User, 
  Star, 
  Package, 
  Car,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Download,
  Share2,
  Copy,
  Heart,
  ThumbsUp,
  MessageCircle,
  Gift,
  CreditCard,
  Filter,
  Search,
  BarChart,
  TrendingUp,
  History,
  Award,
  Zap,
  Loader2
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  getPackageStatus, 
  getUsageHistory, 
  downloadQRCode, 
  copyQRData, 
  shareQRCode 
} from '../utils/qrSystem';
import UnifiedButton from '../components/common/UnifiedButton';
import { orderAPI, qrAPI } from '../api';

const Tracking = () => {
  const navigate = useNavigate();
  const { operationId } = useParams();
  const [qrData, setQrData] = useState(null);
  const [usageHistory, setUsageHistory] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    fetchTrackingData();
  }, [operationId]);

  const fetchTrackingData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // جلب طلبات المستخدم
      const ordersResponse = await orderAPI.getUserOrders();
      const orders = ordersResponse.data;
      
      // البحث عن الطلب المحدد
      const currentOrder = orders.find(order => order.id === operationId || order.operationId === operationId);
      
      if (currentOrder) {
        // جلب QR code للطلب
        const qrResponse = await qrAPI.getStatus(currentOrder.id);
        const qrData = qrResponse.data;
        setQrData(qrData);
        
        // جلب سجل الاستخدام
        loadUsageHistory(qrData);
      } else {
        setError('الطلب غير موجود');
      }
    } catch (error) {
      console.error('Error fetching tracking data:', error);
      setError('حدث خطأ في تحميل بيانات التتبع');
    } finally {
      setLoading(false);
    }
  };

  const loadUsageHistory = async (qrData) => {
    try {
      // جلب سجل الاستخدام من API
      const historyResponse = await orderAPI.getUsageHistory(qrData.operationId);
      setUsageHistory(historyResponse.data);
    } catch (error) {
      console.error('Error loading usage history:', error);
      // استخدام بيانات تجريبية في حالة الخطأ
      const demoHistory = [
        {
          id: 1,
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          branchName: 'مغسلة النقاء المطلق',
          branchAddress: 'طريق الملك فهد، العليا، الرياض',
          action: 'wash_completed',
          washNumber: 1,
          rating: 5,
          tip: 20,
          comment: 'خدمة ممتازة وسريعة'
        },
        {
          id: 2,
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          branchName: 'مغسلة اللمسة الناعمة',
          branchAddress: 'طريق الملك عبدالله، الملز، الرياض',
          action: 'wash_completed',
          washNumber: 2,
          rating: 4,
          tip: 15,
          comment: 'جودة جيدة'
        }
      ];
      setUsageHistory(demoHistory);
    }
  };

  const filteredHistory = usageHistory.filter(record => {
    const matchesSearch = record.branchName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'with-tip' && record.tip > 0) ||
                         (filterType === 'with-rating' && record.rating > 0);
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600';
      case 'expired': return 'text-red-600';
      case 'completed': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'expired': return 'منتهي الصلاحية';
      case 'completed': return 'مكتمل';
      default: return 'غير معروف';
    }
  };

  const getActionText = (action) => {
    switch (action) {
      case 'wash_completed': return 'تم الغسيل';
      case 'wash_started': return 'بدء الغسيل';
      case 'wash_cancelled': return 'إلغاء الغسيل';
      default: return 'إجراء غير معروف';
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'wash_completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'wash_started': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'wash_cancelled': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'wash_completed': return 'bg-green-100 text-green-800';
      case 'wash_started': return 'bg-blue-100 text-blue-800';
      case 'wash_cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل بيانات التتبع...</p>
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
          <UnifiedButton onClick={fetchTrackingData} variant="primary">
            إعادة المحاولة
          </UnifiedButton>
        </div>
      </div>
    );
  }

  if (!qrData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="text-center">
          <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">بيانات التتبع غير متوفرة</p>
          <UnifiedButton onClick={() => navigate('/packages')} variant="primary">
            العودة للباقات
          </UnifiedButton>
        </div>
      </div>
    );
  }

  const packageStatus = getPackageStatus ? getPackageStatus(qrData) : { status: 'active' };
  const totalWashes = qrData.totalWashes || 0;
  const usedWashes = totalWashes - qrData.remainingWashes;
  const usagePercentage = totalWashes > 0 ? (usedWashes / totalWashes) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">تتبع الاستخدام</h1>
          <p className="text-xl text-gray-600">مراقبة استخدام باقة الغسيل الخاصة بك</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* QR Code & Package Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            className="lg:col-span-1"
            >
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <QrCode className="w-6 h-6 text-green-600 mr-2" />
                QR Code
              </h2>

                <div className="text-center mb-6">
                <div className="bg-gray-100 rounded-xl p-4 inline-block">
                  <QRCodeSVG
                    value={JSON.stringify(qrData)}
                    size={150}
                    level="H"
                    includeMargin={true}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">حالة الباقة:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(packageStatus.status)}`}>
                    {getStatusText(packageStatus.status)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">الغسلات المتبقية:</span>
                  <span className="font-bold text-green-600 text-xl">{qrData.remainingWashes}</span>
                  </div>
                  
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">الغسلات المستخدمة:</span>
                  <span className="font-bold text-blue-600">{usedWashes}</span>
                  </div>
                  
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">تاريخ الانتهاء:</span>
                  <span className="font-semibold">{new Date(qrData.expiryDate).toLocaleDateString('ar-SA')}</span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <UnifiedButton
                  variant="outline"
                  size="medium"
                  onClick={() => {
                    try {
                      downloadQRCode(qrData);
                    } catch (error) {
                      alert('حدث خطأ أثناء التحميل');
                    }
                  }}
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  تحميل QR
                </UnifiedButton>
                
                <UnifiedButton
                  variant="outline"
                  size="medium"
                  onClick={async () => {
                    try {
                      await copyQRData(qrData);
                    } catch (error) {
                      alert('حدث خطأ أثناء النسخ');
                    }
                  }}
                  className="w-full"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  نسخ البيانات
                </UnifiedButton>
                
                <UnifiedButton
                  variant="outline"
                  size="medium"
                  onClick={() => {
                    try {
                      shareQRCode(qrData);
                    } catch (error) {
                      alert('حدث خطأ أثناء المشاركة');
                    }
                  }}
                  className="w-full"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  مشاركة QR
                </UnifiedButton>
              </div>
                    </div>

            {/* Usage Statistics */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <BarChart className="w-5 h-5 text-blue-600 mr-2" />
                إحصائيات الاستخدام
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">نسبة الاستخدام</span>
                    <span className="text-sm font-bold text-gray-900">{usagePercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${usagePercentage}%` }}
                    ></div>
                    </div>
                  </div>
                  
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{qrData.remainingWashes}</div>
                    <div className="text-sm text-green-700">متبقي</div>
                        </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{usedWashes}</div>
                    <div className="text-sm text-blue-700">مستخدم</div>
                          </div>
                        </div>

                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-lg font-bold text-yellow-600">
                    {usageHistory.filter(r => r.rating > 0).length}
                      </div>
                  <div className="text-sm text-yellow-700">تقييمات</div>
                    </div>
                  
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">
                    {usageHistory.filter(r => r.tip > 0).length}
                  </div>
                  <div className="text-sm text-purple-700">بقشيش</div>
                </div>
              </div>
            </div>
          </motion.div>

              {/* Usage History */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <History className="w-6 h-6 text-blue-600 mr-2" />
                  سجل الاستخدام
                </h2>
                
                <div className="flex items-center gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="ابحث في السجل..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                  {/* Filter */}
                        <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                    <option value="all">جميع السجلات</option>
                    <option value="with-tip">مع بقشيش</option>
                    <option value="with-rating">مع تقييم</option>
                        </select>
                      </div>
                    </div>

              {filteredHistory.length === 0 ? (
                <div className="text-center py-12">
                  <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-600 mb-2">لا توجد سجلات</h3>
                  <p className="text-gray-500">لم يتم العثور على سجلات تطابق معايير البحث</p>
                    </div>
              ) : (
                <div className="space-y-4">
                  {filteredHistory.map((record, index) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="border-2 border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 space-x-reverse">
                          <div className={`p-2 rounded-lg ${getActionColor(record.action)} bg-opacity-10`}>
                            {getActionIcon(record.action)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-bold text-gray-800">{record.branchName}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(record.action)}`}>
                                {getActionText(record.action)}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-2">{record.branchAddress}</p>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>الغسلة رقم {record.washNumber}</span>
                              <span>{new Date(record.date).toLocaleDateString('ar-SA')}</span>
                              <span>{new Date(record.date).toLocaleTimeString('ar-SA')}</span>
                            </div>
                            
                            {record.comment && (
                              <p className="text-gray-700 mt-2 text-sm italic">"{record.comment}"</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {record.rating > 0 && (
                            <div className="flex items-center gap-1 text-yellow-500">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="text-sm font-medium">{record.rating}</span>
                      </div>
                          )}
                          
                          {record.tip > 0 && (
                            <div className="flex items-center gap-1 text-purple-500">
                              <Gift className="w-4 h-4" />
                              <span className="text-sm font-medium">{record.tip} ريال</span>
                      </div>
                    )}
                  </div>
                      </div>
                    </motion.div>
                  ))}
                  </div>
                )}
              </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">إجراءات سريعة</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <UnifiedButton
                  variant="outline"
                  size="medium"
                  onClick={() => navigate('/branches')}
                  className="w-full"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  اختيار فرع جديد
                </UnifiedButton>
                
                <UnifiedButton
                  variant="outline"
                  size="medium"
                  onClick={() => navigate('/packages')}
                  className="w-full"
                >
                  <Package className="w-4 h-4 mr-2" />
                  شراء باقة جديدة
                </UnifiedButton>
                
                <UnifiedButton
                  variant="outline"
                  size="medium"
                  onClick={() => navigate('/')}
                  className="w-full"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  العودة للرئيسية
                </UnifiedButton>
              </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
  );
};

export default Tracking; 
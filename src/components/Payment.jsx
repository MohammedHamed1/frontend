import React, { useState, useEffect } from 'react';
import { CreditCard, Apple, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPayment, setAuthToken } from '../api';
import '../App.css';

const Payment = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // التمرير إلى أعلى الصفحة عند تحميل المكون
    window.scrollTo(0, 0);
    
    const pkg = localStorage.getItem('selectedPackage');
    if (pkg) setSelectedPackage(JSON.parse(pkg));
    const token = localStorage.getItem('token');
    setAuthToken(token);
  }, []);

  const paymentMethods = [
    { id: 'apple-pay', name: 'Apple Pay', icon: <Apple className="h-6 w-6" />, color: 'bg-black', ring: 'ring-black' },
    { id: 'mada', name: 'مدى', icon: <CreditCard className="h-6 w-6" />, color: 'bg-green-600', ring: 'ring-green-600' },
    { id: 'credit-card', name: 'بطاقة ائتمان', icon: <CreditCard className="h-6 w-6" />, color: 'bg-blue-600', ring: 'ring-blue-600' }
  ];

  const handlePay = async () => {
    if (!paymentMethod) {
      setError('يرجى اختيار طريقة الدفع');
      return;
    }
    if (!selectedPackage) {
      setError('لا توجد باقة محددة. الرجاء العودة واختيار باقة.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await createPayment({
        packageId: selectedPackage._id || selectedPackage.id,
        paymentMethod
      });
      setPaid(true);
    } catch {
      setError('فشل الدفع. يرجى المحاولة لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedPackage) {
    return <div className="text-center py-20">لا توجد باقة محددة. الرجاء العودة واختيار باقة.</div>;
  }

  if (paid) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center bg-white rounded-2xl p-10 shadow-xl border border-green-100">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">تم الدفع بنجاح!</h2>
            <p className="text-gray-600 mb-6">شكراً لاستخدامك PayPass. تم استلام دفعتك بنجاح.</p>
            <button className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg shadow hover:shadow-xl transition-all duration-300" onClick={() => navigate('/')}>العودة للصفحة الرئيسية</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl p-10 shadow-xl border border-green-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">الدفع</h2>
          {error && <div className="mb-4 text-red-600 font-bold animate-pulse">{error}</div>}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium text-gray-700">المبلغ المستحق</span>
              <span className="text-2xl font-bold text-green-600">{selectedPackage.basePrice} ريال</span>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-green-700 text-center font-bold mt-2">
              سيتم خصم المبلغ عند إتمام الدفع
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">اختر طريقة الدفع</h3>
            <div className="flex flex-col gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  className={`flex items-center gap-4 px-6 py-4 rounded-xl border-2 transition-all duration-200 font-medium text-lg shadow-sm focus:outline-none focus:ring-2 ${
                    paymentMethod === method.id
                      ? `${method.color} text-white border-2 border-green-700 ring-2 ${method.ring} scale-105 shadow-lg`
                      : 'border-gray-200 bg-white text-gray-700 hover:border-green-600'
                  }`}
                  style={paymentMethod === method.id ? { boxShadow: '0 0 0 4px #bbf7d0' } : {}}
                  onClick={() => setPaymentMethod(method.id)}
                  disabled={loading}
                >
                  <span className={`p-2 rounded-full ${method.color} text-white`}>{method.icon}</span>
                  {method.name}
                  {paymentMethod === method.id && <span className="ml-auto text-xs font-bold">(محدد)</span>}
                </button>
              ))}
            </div>
          </div>
          <button
            className={`w-full px-8 py-4 rounded-xl font-bold text-lg shadow hover:shadow-xl transition-all duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
            onClick={handlePay}
            disabled={loading}
          >
            {loading ? 'جاري معالجة الدفع...' : 'إتمام الدفع'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Payment; 
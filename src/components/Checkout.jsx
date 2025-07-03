import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Apple, 
  MapPin, 
  Clock, 
  Star, 
  QrCode, 
  Share2, 
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  Car,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getWashingPlaces } from '../api';

const Checkout = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedCarType, setSelectedCarType] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [branches, setBranches] = useState([]);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const carTypes = [
    { id: 'small', name: 'سيارة صغيرة', icon: '🚗', multiplier: 1.0, examples: 'تويوتا كورولا، هوندا سيفيك' },
    { id: 'medium', name: 'سيارة متوسطة', icon: '🚙', multiplier: 1.3, examples: 'تويوتا كامري، هوندا أكورد' },
    { id: 'large', name: 'سيارة كبيرة', icon: '🚌', multiplier: 1.6, examples: 'تويوتا لاند كروزر، نيسان باترول' },
    { id: 'suv', name: 'سيارة SUV', icon: '🚙', multiplier: 1.4, examples: 'تويوتا راف4، هوندا CR-V' },
    { id: 'luxury', name: 'سيارة فاخرة', icon: '🏎️', multiplier: 2.0, examples: 'مرسيدس، بي إم دبليو' }
  ];

  useEffect(() => {
    const pkg = localStorage.getItem('selectedPackage');
    if (pkg) setSelectedPackage(JSON.parse(pkg));
    getWashingPlaces().then(res => setBranches(res.data));
  }, []);

  // أنواع الدفع
  const paymentMethods = [
    { id: 'apple-pay', name: 'Apple Pay', icon: <Apple className="h-6 w-6" />, color: 'bg-black', ring: 'ring-black' },
    { id: 'mada', name: 'مدى', icon: <CreditCard className="h-6 w-6" />, color: 'bg-green-600', ring: 'ring-green-600' },
    { id: 'credit-card', name: 'بطاقة ائتمان', icon: <CreditCard className="h-6 w-6" />, color: 'bg-blue-600', ring: 'ring-blue-600' }
  ];

  // حساب السعر النهائي
  const calculateFinalPrice = () => {
    const carType = carTypes.find(car => car.id === selectedCarType);
    return carType ? Math.round(selectedPackage.basePrice * carType.multiplier) : selectedPackage.basePrice;
  };

  const handlePayment = () => {
    if (!selectedCarType || !selectedBranch || !paymentMethod) {
      alert('يرجى إكمال جميع الخطوات');
      return;
    }
    setOrderCompleted(true);
  };

  if (!selectedPackage) {
    return <div className="text-center py-20">لا توجد باقة محددة. الرجاء العودة واختيار باقة.</div>;
  }

  if (orderCompleted) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100">
              <div className="mb-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">تم الطلب بنجاح! 🎉</h2>
                <p className="text-gray-600">يمكنك الآن استخدام الباركود في أي فرع من فروعنا</p>
              </div>

              {/* QR Code */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <QrCode className="h-32 w-32 mx-auto mb-4 text-primary-600" />
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">باركود الباقة</p>
                  <p className="font-mono text-lg font-bold text-gray-900">PAYPASS-{selectedPackage.id}-{Date.now()}</p>
                </div>
              </div>

              {/* Package Details */}
              <div className="bg-primary-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">تفاصيل الباقة</h3>
                <div className="grid grid-cols-2 gap-4 text-right">
                  <div>
                    <p className="text-gray-600">الباقة:</p>
                    <p className="font-bold">{selectedPackage.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">نوع السيارة:</p>
                    <p className="font-bold">{carTypes.find(c => c.id === selectedCarType)?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">عدد الغسلات:</p>
                    <p className="font-bold">{selectedPackage.washes} غسلة</p>
                  </div>
                  <div>
                    <p className="text-gray-600">السعر:</p>
                    <p className="font-bold text-primary-600">{calculateFinalPrice()} ريال</p>
                  </div>
                </div>
              </div>

              {/* Branch Info */}
              <div className="bg-green-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">الفرع المختار</h3>
                <div className="flex items-center justify-center space-x-3">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span className="font-bold">{branches.find(b => b._id === selectedBranch)?.name}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-primary-700 transition-colors">
                  مشاركة الباركود
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-bold hover:bg-gray-200 transition-colors" onClick={() => navigate('/')}>العودة للرئيسية</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Stepper UI
  const steps = [
    { id: 1, label: 'نوع السيارة' },
    { id: 2, label: 'اختيار الفرع' },
    { id: 3, label: 'طريقة الدفع' },
    { id: 4, label: 'مراجعة الطلب' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Stepper */}
          <div className="flex justify-center mb-12">
            {steps.map((s, idx) => (
              <div key={s.id} className="flex items-center">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg border-2 ${step === s.id ? 'bg-green-600 text-white border-green-600 scale-110 shadow-lg' : step > s.id ? 'bg-green-200 text-green-700 border-green-400' : 'bg-gray-200 text-gray-400 border-gray-200'}`}>{s.id}</div>
                {idx < steps.length - 1 && <ChevronRight className="mx-2 text-gray-400" />}
              </div>
            ))}
          </div>

          {/* Step 1: Car Type */}
          {step === 1 && (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8 animate-fade-in-up">
              <h3 className="text-xl font-bold text-gray-900 mb-6">اختر نوع السيارة</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {carTypes.map(car => (
                  <button
                    key={car.id}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 font-medium text-lg shadow-sm transition-all duration-200 ${selectedCarType === car.id ? 'bg-green-600 text-white border-green-600 scale-105 shadow-lg' : 'border-gray-200 bg-white text-gray-700 hover:border-green-600'}`}
                    onClick={() => setSelectedCarType(car.id)}
                  >
                    <span>{car.icon}</span> {car.name}
                  </button>
                ))}
              </div>
              <button className="bg-primary px-8 py-3 rounded-xl text-white font-bold mt-4" disabled={!selectedCarType} onClick={() => setStep(2)}>التالي</button>
            </div>
          )}

          {/* Step 2: Branch */}
          {step === 2 && (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8 animate-fade-in-up">
              <h3 className="text-xl font-bold text-gray-900 mb-6">اختر الفرع</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {branches.map(branch => (
                  <button
                    key={branch._id || branch.id}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 font-medium text-lg shadow-sm transition-all duration-200 ${selectedBranch === branch._id ? 'bg-green-600 text-white border-green-600 scale-105 shadow-lg' : 'border-gray-200 bg-white text-gray-700 hover:border-green-600'}`}
                    onClick={() => setSelectedBranch(branch._id)}
                  >
                    <MapPin className="h-5 w-5" /> {branch.name}
                  </button>
                ))}
              </div>
              <button className="bg-primary px-8 py-3 rounded-xl text-white font-bold mt-4 mr-2" disabled={!selectedBranch} onClick={() => setStep(3)}>التالي</button>
              <button className="bg-gray-200 px-8 py-3 rounded-xl text-gray-700 font-bold mt-4" onClick={() => setStep(1)}>السابق</button>
            </div>
          )}

          {/* Step 3: Payment Method */}
          {step === 3 && (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8 animate-fade-in-up">
              <h3 className="text-xl font-bold text-gray-900 mb-6">اختر طريقة الدفع</h3>
              <div className="flex flex-col gap-4 mb-6">
                {paymentMethods.map(method => (
                  <button
                    key={method.id}
                    className={`flex items-center gap-4 px-6 py-4 rounded-xl border-2 transition-all duration-200 font-medium text-lg shadow-sm focus:outline-none focus:ring-2 ${paymentMethod === method.id ? method.color + ' text-white border-green-700 ring-2 ' + method.ring + ' scale-105 shadow-lg' : 'border-gray-200 bg-white text-gray-700 hover:border-green-600'}`}
                    style={paymentMethod === method.id ? { boxShadow: '0 0 0 4px #bbf7d0' } : {}}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <span className={`p-2 rounded-full ${method.color} text-white`}>{method.icon}</span>
                    {method.name}
                    {paymentMethod === method.id && <span className="ml-auto text-xs font-bold">(محدد)</span>}
                  </button>
                ))}
              </div>
              <button className="bg-primary px-8 py-3 rounded-xl text-white font-bold mt-4 mr-2" disabled={!paymentMethod} onClick={() => setStep(4)}>التالي</button>
              <button className="bg-gray-200 px-8 py-3 rounded-xl text-gray-700 font-bold mt-4" onClick={() => setStep(2)}>السابق</button>
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {step === 4 && (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 animate-fade-in-up">
              <h3 className="text-xl font-bold text-gray-900 mb-6">مراجعة الطلب</h3>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-green-50 rounded-xl p-6">
                  <h4 className="font-bold text-primary mb-2">الباقة المختارة</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <Car className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">{selectedPackage.name}</span>
                  </div>
                  <div className="text-gray-700 mb-1">عدد الغسلات: {selectedPackage.washes}</div>
                  <div className="text-gray-700 mb-1">السعر الأساسي: {selectedPackage.basePrice} ريال</div>
                </div>
                <div className="bg-green-50 rounded-xl p-6">
                  <h4 className="font-bold text-primary mb-2">الملخص</h4>
                  <div className="mb-1">نوع السيارة: <span className="font-bold">{carTypes.find(c => c.id === selectedCarType)?.name}</span></div>
                  <div className="mb-1">الفرع: <span className="font-bold">{branches.find(b => b._id === selectedBranch)?.name}</span></div>
                  <div className="mb-1">طريقة الدفع: <span className="font-bold">{paymentMethods.find(m => m.id === paymentMethod)?.name}</span></div>
                  <div className="mb-1">السعر النهائي: <span className="font-bold text-primary">{calculateFinalPrice()} ريال</span></div>
                </div>
              </div>
              <button className="bg-primary px-8 py-3 rounded-xl text-white font-bold mt-4 mr-2" onClick={handlePayment}>تأكيد الطلب</button>
              <button className="bg-gray-200 px-8 py-3 rounded-xl text-gray-700 font-bold mt-4" onClick={() => setStep(3)}>السابق</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Checkout; 
import React, { useEffect, useState } from 'react';
import { Check, Star, Car, Sparkles, Crown, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getPackages } from '../api';

const Packages = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);

  const carTypes = [
    { id: 'small', name: 'سيارة صغيرة', icon: '🚗', multiplier: 1.0, examples: 'تويوتا كورولا، هوندا سيفيك' },
    { id: 'medium', name: 'سيارة متوسطة', icon: '🚙', multiplier: 1.3, examples: 'تويوتا كامري، هوندا أكورد' },
    { id: 'large', name: 'سيارة كبيرة', icon: '🚌', multiplier: 1.6, examples: 'تويوتا لاند كروزر، نيسان باترول' },
    { id: 'suv', name: 'سيارة SUV', icon: '🚙', multiplier: 1.4, examples: 'تويوتا راف4، هوندا CR-V' },
    { id: 'luxury', name: 'سيارة فاخرة', icon: '🏎️', multiplier: 2.0, examples: 'مرسيدس، بي إم دبليو' }
  ];

  useEffect(() => {
    getPackages().then(res => setPackages(res.data));
  }, []);

  const SaudiCharacter = ({ className = "" }) => (
    <div className={`${className} relative`}>
      <svg width="120" height="120" viewBox="0 0 120 120" className="animate-float">
        <circle cx="60" cy="45" r="25" fill="#fbbf24" stroke="#92400e" strokeWidth="2"/>
        <rect x="35" y="70" width="50" height="40" fill="#1e40af" rx="5"/>
        <ellipse cx="60" cy="40" rx="30" ry="15" fill="#dc2626"/>
        <ellipse cx="60" cy="35" rx="25" ry="10" fill="#dc2626"/>
        <rect x="45" y="30" width="30" height="8" fill="#92400e" rx="4"/>
        <circle cx="55" cy="42" r="2" fill="#1f2937"/>
        <circle cx="65" cy="42" r="2" fill="#1f2937"/>
        <path d="M 55 50 Q 60 55 65 50" stroke="#1f2937" strokeWidth="2" fill="none"/>
        <rect x="25" y="75" width="8" height="25" fill="#1e40af" rx="4"/>
        <rect x="87" y="75" width="8" height="25" fill="#1e40af" rx="4"/>
        <circle cx="29" cy="105" r="5" fill="#fbbf24"/>
        <circle cx="91" cy="105" r="5" fill="#fbbf24"/>
      </svg>
    </div>
  );

  const handlePackageSelect = (pkg) => {
    localStorage.setItem('selectedPackage', JSON.stringify(pkg));
    navigate('/checkout');
  };

  return (
    <section id="packages" className="py-24 bg-gradient-to-br from-gray-50 to-green-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            باقاتنا المميزة
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            اختر الباقة المناسبة لك واستمتع بخصومات حصرية عند الشراء من التطبيق
          </p>
        </div>

        {/* Saudi Character Guide */}
        <div className="text-center mb-16 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="bg-white rounded-2xl p-10 shadow-xl border border-green-100 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-6 mb-8">
              <SaudiCharacter />
              <div className="text-right">
                <h3 className="text-3xl font-bold text-gray-900 mb-3">مرحباً! أنا أحمد</h3>
                <p className="text-gray-600 text-lg">سأساعدك في اختيار الباقة المناسبة لسيارتك</p>
              </div>
            </div>
            <div className="grid md:grid-cols-5 gap-6">
              {carTypes.map((carType) => (
                <div key={carType.id} className="flex items-center space-x-4 p-5 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{carType.icon}</span>
                  <div>
                    <div className="font-bold text-gray-900 text-base">{carType.name}</div>
                    <div className="text-sm text-gray-600">مضاعف {carType.multiplier}x</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={pkg._id || pkg.id}
              className={`relative  rounded-2xl p-10 border-2 transition-all duration-300 cursor-pointer interactive-card border-gray-200 hover:border-primary-300 hover:shadow-xl animate-fade-in-up`}
              style={{animationDelay: `${0.3 + index * 0.1}s`}}
            >
              {pkg.popular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-black px-8 py-3 rounded-full text-base font-medium flex items-center shadow-lg">
                    <Star className="h-5 w-5 ml-2" />
                    الأكثر طلباً
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`bg-gradient-to-r from-primary-500 to-primary-600 text-black p-5 rounded-full w-fit mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Car className="h-10 w-10" />
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {pkg.name}
                </h3>
                
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {pkg.basePrice} ريال
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    {pkg.originalPrice} ريال
                  </span>
                </div>
                
                <div className="text-base text-primary-600 font-medium bg-primary-50 px-4 py-2 rounded-full mb-6">
                  توفير {pkg.savings} ريال
                </div>

                <div className="text-xl font-bold text-gray-700 mb-4">
                  {pkg.washes} غسلة
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {pkg.features && pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full bg-green-600 text-white py-4 px-8 rounded-xl font-bold hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg mt-6"
                onClick={() => handlePackageSelect(pkg)}
              >
                اشترك الآن
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">معلومات مهمة</h3>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="text-right">
                <h4 className="text-xl font-bold text-gray-900 mb-4">🎁 دعوة الأصدقاء</h4>
                <p className="text-gray-600 text-lg">احصل على غسلة مجانية عند دعوة صديقك عبر Instagram أو Snapchat أو WhatsApp</p>
              </div>
              <div className="text-right">
                <h4 className="text-xl font-bold text-gray-900 mb-4">⭐ تقييم الخدمة</h4>
                <p className="text-gray-600 text-lg">احصل على إشعار بعد 30 دقيقة من تسليم الغسلة لتقييم الخدمة</p>
              </div>
              <div className="text-right">
                <h4 className="text-xl font-bold text-gray-900 mb-4">📍 أقرب المغاسل</h4>
                <p className="text-gray-600 text-lg">اختر أقرب مغسلة لك مع عرض ساعات العمل والمسافة</p>
              </div>
              <div className="text-right">
                <h4 className="text-xl font-bold text-gray-900 mb-4">📱 الباركود</h4>
                <p className="text-gray-600 text-lg">احصل على باركود فوري بعد الشراء لاستخدامه في المغسلة</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages; 
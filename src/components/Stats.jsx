import React, { useEffect } from 'react';
import { Users, Car, Star, MapPin, TrendingUp, Award, Clock } from 'lucide-react';

const Stats = () => {
  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    {
      icon: <MapPin className="h-8 w-8" />, // أخضر
      number: "+50",
      label: "فرع",
      description: "في جميع أنحاء المملكة",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Star className="h-8 w-8" />, // أصفر
      number: "4.9",
      label: "تقييم متوسط",
      description: "من 5 نجوم",
      color: "from-yellow-400 to-yellow-500"
    },
    {
      icon: <Car className="h-8 w-8" />, // أزرق
      number: "+100,000",
      label: "سيارة مغسولة",
      description: "سيارات تم غسلها",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Users className="h-8 w-8" />, // أزرق
      number: "+50,000",
      label: "عميل راضي",
      description: "عملاء يثقون بنا",
      color: "from-blue-500 to-blue-600"
    }
  ];

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #12c08b 0%, #08896a 100%)"
      }}
      className="w-full min-h-[650px] flex flex-col justify-center items-center py-24"
    >
      <div className="w-full flex flex-col items-center">
        <div className="text-center mb-14 animate-fade-in-up">
          <h2
            className="text-4xl lg:text-5xl font-extrabold text-white mb-3 text-center"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.18)' }}
          >
            أرقام تتحدث عن نفسها
          </h2>
          <p className="text-lg lg:text-xl text-white font-medium text-center max-w-3xl mx-auto" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.13)' }}>
            نجاحنا يتحدث عن نفسه من خلال الأرقام والإنجازات التي حققناها
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-center items-start mb-12 w-full max-w-5xl">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white rounded-2xl p-8 border border-gray-100 flex flex-col items-center min-w-[210px] min-h-[180px] shadow-2xl transition-transform duration-300"
            >
              <div className={`bg-gradient-to-r ${stat.color} text-white p-4 rounded-full w-fit mx-auto mb-4`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-1">
                {stat.label}
              </div>
              <div className="text-gray-500 text-sm">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center w-full">
          <div className="rounded-2xl p-8 max-w-3xl w-full bg-white shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              لماذا يختار عملاؤنا PayPass؟
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-xl bg-white border border-gray-100 flex flex-col items-center justify-center min-h-[170px] shadow-none">
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-5 rounded-full w-fit mx-auto mb-4">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  سهولة الاستخدام
                </h4>
                <p className="text-gray-600 text-base leading-relaxed">
                  تطبيق سهل الاستخدام مع واجهة بسيطة وواضحة
                </p>
              </div>
              <div className="text-center p-8 rounded-xl bg-white border border-gray-100 flex flex-col items-center justify-center min-h-[170px] shadow-none">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 rounded-full w-fit mx-auto mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  جودة عالية
                </h4>
                <p className="text-gray-600 text-base leading-relaxed">
                  استخدام أحدث التقنيات والمنتجات عالية الجودة
                </p>
              </div>
              <div className="text-center p-8 rounded-xl bg-white border border-gray-100 flex flex-col items-center justify-center min-h-[170px] shadow-none">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 rounded-full w-fit mx-auto mb-4">
                  <Clock className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  سرعة في الأداء
                </h4>
                <p className="text-gray-600 text-base leading-relaxed">
                  غسيل سريع في 15 دقيقة مع ضمان الجودة
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats; 
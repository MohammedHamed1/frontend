import React from 'react';
import { Users, Car, Star, MapPin, TrendingUp, Award, Clock } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      number: "50,000+",
      label: "عميل راضي",
      description: "عملاء يثقون بنا",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Car className="h-8 w-8" />,
      number: "100,000+",
      label: "سيارة مغسولة",
      description: "سيارات تم غسلها",
      color: "from-primary-500 to-primary-600"
    },
    {
      icon: <Star className="h-8 w-8" />,
      number: "4.9",
      label: "تقييم متوسط",
      description: "من 5 نجوم",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      number: "50+",
      label: "فرع",
      description: "في جميع أنحاء المملكة",
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            أرقام تتحدث عن نفسها
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            نجاحنا يتحدث عن نفسه من خلال الأرقام والإنجازات التي حققناها
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 interactive-card animate-fade-in-up"
              style={{animationDelay: `${0.2 + index * 0.1}s`}}
            >
              <div className={`bg-gradient-to-r ${stat.color} text-white p-4 rounded-full w-fit mx-auto mb-6 shadow-lg`}>
                {stat.icon}
              </div>
              
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              
              <div className="text-xl font-semibold text-gray-700 mb-2">
                {stat.label}
              </div>
              
              <div className="text-gray-500">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl border border-green-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              لماذا يختار عملاؤنا PayPass؟
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl hover:bg-green-50 transition-colors">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full w-fit mx-auto mb-4 shadow-lg">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  سرعة في الأداء
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  غسيل سريع في 15 دقيقة مع ضمان الجودة
                </p>
              </div>
              
              <div className="text-center p-6 rounded-xl hover:bg-green-50 transition-colors">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 rounded-full w-fit mx-auto mb-4 shadow-lg">
                  <Award className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  جودة عالية
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  استخدام أحدث التقنيات والمنتجات عالية الجودة
                </p>
              </div>
              
              <div className="text-center p-6 rounded-xl hover:bg-green-50 transition-colors">
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full w-fit mx-auto mb-4 shadow-lg">
                  <Clock className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  سهولة الاستخدام
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  تطبيق سهل الاستخدام مع واجهة بسيطة وواضحة
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
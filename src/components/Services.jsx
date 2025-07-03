import React from 'react';
import { Car, Sparkles, Clock, Shield, Zap, Users, CheckCircle } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Car className="h-10 w-10 text-white stroke-green-500" />,
      title: "غسيل خارجي شامل",
      description: "غسيل شامل للسيارة من الخارج مع تجفيف احترافي",
      features: ["غسيل بالصابون", "تجفيف بالمناشف", "تلميع الزجاج"],
      cardBg: "bg-primary-50",
      iconBg: "bg-gradient-to-r from-primary-500 to-primary-600"
    },
    {
      icon: <Sparkles className="h-10 w-10 text-white stroke-green-500" />,
      title: "غسيل داخلي وخارجي",
      description: "غسيل شامل للسيارة من الداخل والخارج مع تنظيف المحرك",
      features: ["غسيل داخلي", "تنظيف المحرك", "تلميع الدواخل"],
      cardBg: "bg-primary-50",
      iconBg: "bg-gradient-to-r from-primary-500 to-primary-600"
    },
    {
      icon: <Clock className="h-10 w-10 text-white stroke-green-500" />,
      title: "خدمة سريعة",
      description: "غسيل سريع في 15 دقيقة مع ضمان الجودة",
      features: ["غسيل سريع", "تجفيف فوري", "خدمة 24/7"],
      cardBg: "bg-primary-50",
      iconBg: "bg-gradient-to-r from-primary-500 to-primary-600"
    },
    {
      icon: <Shield className="h-10 w-10 text-white stroke-green-500" />,
      title: "ضمان الجودة",
      description: "ضمان شامل على جميع الخدمات مع إعادة الغسيل مجاناً",
      features: ["ضمان 24 ساعة", "إعادة مجانية", "خدمة عملاء"],
      cardBg: "bg-primary-50",
      iconBg: "bg-gradient-to-r from-primary-500 to-primary-600"
    },
    {
      icon: <Zap className="h-10 w-10 text-white stroke-green-500" />,
      title: "تطبيق ذكي",
      description: "تطبيق متطور لشراء الباقات ومراقبة الغسلات",
      features: ["شراء إلكتروني", "تتبع الغسلات", "إشعارات فورية"],
      cardBg: "bg-primary-50",
      iconBg: "bg-gradient-to-r from-primary-500 to-primary-600"
    },
    {
      icon: <Users className="h-10 w-10 text-white stroke-green-500" />,
      title: "خدمة عملاء متميزة",
      description: "فريق خدمة عملاء محترف لمساعدتك في أي وقت",
      features: ["دعم 24/7", "حلول سريعة", "تجربة متميزة"],
      cardBg: "bg-primary-50",
      iconBg: "bg-gradient-to-r from-primary-500 to-primary-600"
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-white to-green-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            خدماتنا المتميزة
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نقدم مجموعة شاملة من خدمات غسيل السيارات بأحدث التقنيات وأفضل الجودة
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-primary-50 border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 interactive-card animate-fade-in-up group`}
              style={{animationDelay: `${0.2 + index * 0.1}s`}}
            >
              <div className={`bg-gradient-to-r from-primary-500 to-primary-600 p-5 rounded-xl w-fit mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                {service.description}
              </p>
              
              <ul className="space-y-4">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-base text-gray-600 p-3 rounded-xl hover:bg-green-50 transition-colors group/item">
                    <CheckCircle className="h-5 w-5 text-primary-500 ml-4 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 animate-fade-in-up" s tyle={{animationDelay: '0.8s'}}>
          <button className="px-10 py-5 bg-black hover:from-primary-600 hover:to-primary-700 text-white rounded-xl text-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group">
            <span className="group-hover:scale-105 transition-transform duration-200">احجز خدمتك الآن</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services; 
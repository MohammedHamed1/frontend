import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaShieldAlt, FaClock, FaStar, FaCheckCircle } from 'react-icons/fa';

const Services = () => {
  const navigate = useNavigate();
  
  const handleBookNow = () => {
    navigate('/packages');
  };
  
  const services = [
    {
      icon: <FaCar className="text-green-500" />,
      title: 'غسيل خارجي',
      description: 'غسيل شامل للخارج مع تجفيف وتلميع',
      features: ['غسيل الهيكل', 'تنظيف العجلات', 'غسيل الزجاج', 'تجفيف وتلميع']
    },
    {
      icon: <FaShieldAlt className="text-green-500" />,
      title: 'غسيل داخلي',
      description: 'تنظيف شامل للداخل والأسطح',
      features: ['تنظيف المقاعد', 'غسيل الأرضية', 'تنظيف اللوحة', 'تعطير داخلي']
    },
    {
      icon: <FaStar className="text-green-500" />,
      title: 'غسيل شامل',
      description: 'غسيل خارجي وداخلي مع خدمات إضافية',
      features: ['غسيل خارجي كامل', 'غسيل داخلي شامل', 'تلميع احترافي', 'تعطير فاخر']
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">خدماتنا المميزة</h2>
          <p className="text-xl text-gray-600">نقدم مجموعة شاملة من خدمات غسيل السيارات بأعلى جودة</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{service.title}</h3>
              <p className="text-gray-600 mb-6 text-center">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <FaCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button 
            onClick={handleBookNow}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg"
          >
            احجز خدمتك الآن
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services; 
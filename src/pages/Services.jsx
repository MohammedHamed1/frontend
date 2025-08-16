import React, { useEffect, useState } from 'react';

import { FaBolt, FaCar, FaShieldAlt, FaClock, FaStar, FaUsers, FaMapMarkerAlt, FaCheckCircle, FaTools, FaLeaf, FaAward, FaPhone, FaEnvelope, FaWhatsapp, FaRocket, FaGem, FaMagic } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const Services = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);


  
  // تأخير قصير لبدء التأثيرات الحركية
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // بدء تأثيرات العناصر عند التمرير
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setAnimateElements(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleItemClick = (itemName) => {
    setClickedItem(itemName);
    // إعادة تعيين العنصر المحدد بعد ثانية
    setTimeout(() => setClickedItem(null), 1000);
  };

  return (
    <>
      <div className="header-spacer"></div>
      
      {/* Page Header مع تأثيرات حركية */}
      <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      <PageHeader 
        title="خدماتنا المميزة"
        subtitle="مجموعة شاملة من خدمات غسيل السيارات عالية الجودة بأحدث التقنيات"
        breadcrumbs={['الرئيسية', 'الخدمات']}
      />
      </div>
      
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50" dir="rtl">
        <div className="max-w-6xl mx-auto px-6 py-12">

          {/* خدماتنا المميزة */}
          <div className="space-y-8">
            
            {/* لماذا تختارنا؟ */}
            <section className={`w-full py-12 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-xl shadow-lg relative overflow-hidden transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              {/* خلفية متحركة */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-20 w-16 h-16 bg-white rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
              </div>
              
              <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                  <div 
                    className="inline-flex items-center mb-4 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                    onClick={() => handleItemClick('لماذا تختارنا')}
                    onMouseEnter={() => setHoveredItem('why-choose-us')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <FaMagic className={`text-yellow-300 text-2xl mr-3 transition-all duration-300 ${
                      hoveredItem === 'why-choose-us' ? 'animate-spin scale-110' : 'animate-spin'
                    }`} style={{animationDuration: '3s'}} />
                    <h2 className={`text-4xl font-bold text-white transition-all duration-300 ${
                      hoveredItem === 'why-choose-us' ? 'scale-105 text-yellow-100' : ''
                    }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                      لماذا تختارنا؟
                    </h2>
                    <FaMagic className={`text-yellow-300 text-2xl ml-3 transition-all duration-300 ${
                      hoveredItem === 'why-choose-us' ? 'animate-spin scale-110' : 'animate-spin'
                    }`} style={{animationDuration: '3s', animationDirection: 'reverse'}} />
                  </div>
                  <p className="text-white opacity-90 text-lg">نقدم أفضل خدمات غسيل السيارات بأحدث التقنيات</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className={`text-center bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-green-50 hover:border-green-300 hover:scale-105 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer active:scale-95 group ${animateElements ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '0.2s'}}>
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                      <FaShieldAlt className="text-white text-2xl group-hover:rotate-12 transition-transform duration-300" />
          </div>
                    <h3 className="text-2xl font-bold mb-4 text-[#00916E] group-hover:text-green-600 transition-colors duration-300" style={{fontFamily: 'Cairo, sans-serif'}}>جودة عالية</h3>
                    <p className="text-gray-700 text-sm leading-relaxed font-bold mb-4 text-right group-hover:text-gray-800 transition-colors duration-300" style={{fontFamily: 'Cairo, sans-serif'}}>
                      نستخدم أفضل المواد الإيطالية وأحدث التقنيات لضمان جودة عالية في كل خدمة نقدمها.
                    </p>
                    <ul className="text-gray-700 text-right font-bold space-y-2">
                      <li className="flex items-center justify-end p-2 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm group-hover:bg-green-100 transition-colors duration-300">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg group-hover:scale-110 transition-transform duration-300" />
                        مواد إيطالية عالية الجودة
                      </li>
                      <li className="flex items-center justify-end p-2 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm group-hover:bg-green-100 transition-colors duration-300">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg group-hover:scale-110 transition-transform duration-300" />
                        تقنيات حديثة ومتطورة
                      </li>
                      <li className="flex items-center justify-end p-2 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm group-hover:bg-green-100 transition-colors duration-300">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg group-hover:scale-110 transition-transform duration-300" />
                        فريق مدرب ومحترف
                      </li>
                    </ul>
                  </div>
                  
                  <div className={`text-center bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-green-50 hover:border-green-300 hover:scale-105 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer active:scale-95 group ${animateElements ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '0.4s'}}>
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                      <FaClock className="text-white text-2xl group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-[#00916E] group-hover:text-green-600 transition-colors duration-300" style={{fontFamily: 'Cairo, sans-serif'}}>سرعة في الأداء</h3>
                    <p className="text-gray-700 text-sm leading-relaxed font-bold mb-4 text-right group-hover:text-gray-800 transition-colors duration-300" style={{fontFamily: 'Cairo, sans-serif'}}>
                      نحرص على تقديم خدمة سريعة وفعالة في أقل وقت ممكن دون المساس بالجودة.
                    </p>
                    <ul className="text-gray-700 text-right font-bold space-y-2">
                      <li className="flex items-center justify-end p-2 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm group-hover:bg-green-100 transition-colors duration-300">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg group-hover:scale-110 transition-transform duration-300" />
                        غسيل سريع خلال 15 دقيقة
                      </li>
                      <li className="flex items-center justify-end p-2 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm group-hover:bg-green-100 transition-colors duration-300">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg group-hover:scale-110 transition-transform duration-300" />
                        خدمة 24/7 متاحة
                      </li>
                      <li className="flex items-center justify-end p-2 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm group-hover:bg-green-100 transition-colors duration-300">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg group-hover:scale-110 transition-transform duration-300" />
                        حجز فوري وسهل
                      </li>
                    </ul>
            </div>
                  
                  <div className={`text-center bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-green-50 hover:border-green-300 hover:scale-105 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer active:scale-95 group ${animateElements ? 'animate-fade-in-up' : ''}`} style={{animationDelay: '0.6s'}}>
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                      <FaStar className="text-white text-2xl group-hover:rotate-12 transition-transform duration-300" />
            </div>
                    <h3 className="text-2xl font-bold mb-4 text-[#00916E] group-hover:text-green-600 transition-colors duration-300" style={{fontFamily: 'Cairo, sans-serif'}}>رضا العملاء</h3>
                    <p className="text-gray-700 text-sm leading-relaxed font-bold mb-4 text-right group-hover:text-gray-800 transition-colors duration-300" style={{fontFamily: 'Cairo, sans-serif'}}>
                      نحرص على رضا العملاء ورضاهم التام. أكثر من 50,000 عميل راضي يثقون بنا.
                    </p>
                    <ul className="text-gray-700 text-right font-bold space-y-2">
                      <li className="flex items-center justify-end p-2 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm group-hover:bg-green-100 transition-colors duration-300">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg group-hover:scale-110 transition-transform duration-300" />
                        99% رضا العملاء
                      </li>
                      <li className="flex items-center justify-end p-2 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm group-hover:bg-green-100 transition-colors duration-300">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg group-hover:scale-110 transition-transform duration-300" />
                        ضمان الجودة
                      </li>
                      <li className="flex items-center justify-end p-2 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm group-hover:bg-green-100 transition-colors duration-300">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg group-hover:scale-110 transition-transform duration-300" />
                        خدمة عملاء متميزة
                      </li>
                    </ul>
            </div>
          </div>
        </div>
      </section>

            {/* احجز خدمتك الآن */}
            <section className={`w-full py-12 bg-gradient-to-br from-[#00916E] via-[#16c47a] to-[#00916E] rounded-xl shadow-xl relative overflow-hidden transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              {/* خلفية مزخرفة متحركة */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
                <div className="absolute top-1/4 right-0 w-24 h-24 bg-white rounded-full translate-x-12 animate-bounce" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-0 left-1/3 w-20 h-20 bg-white rounded-full -translate-y-10 animate-ping" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-yellow-300 rounded-full animate-spin" style={{animationDuration: '4s'}}></div>
              </div>
              
              <div className="max-w-5xl mx-auto px-6 text-center text-white relative z-10">
                <div 
                  className="mb-8 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                  onClick={() => handleItemClick('احجز خدمتك الآن')}
                  onMouseEnter={() => setHoveredItem('book-now')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <h2 className={`text-4xl font-bold mb-4 text-white transition-all duration-300 ${
                    hoveredItem === 'book-now' ? 'scale-105 text-yellow-100' : ''
                  }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                    احجز خدمتك الآن
                  </h2>
                  <p className={`text-xl text-white opacity-90 font-medium transition-all duration-300 ${
                    hoveredItem === 'book-now' ? 'opacity-100 scale-105' : ''
                  }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                    خدمة غسيل سيارات احترافية بأسعار تنافسية
                  </p>
                </div>

                {/* البطاقة الرئيسية */}
                <div className="bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-2xl border-2 border-white shadow-2xl mb-8 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center shadow-lg">
                      <FaCar className="text-white text-2xl" />
                    </div>
                  </div>
                  
                  <p className="text-lg mb-6 leading-relaxed font-bold text-gray-800 text-center" style={{fontFamily: 'Cairo, sans-serif'}}>
                    احجز خدمة غسيل سيارتك بسهولة وسرعة من خلال تطبيقنا أو موقعنا الإلكتروني. 
                    خدمة متاحة 24/7 مع ضمان الجودة والسرعة.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-center text-base font-bold text-gray-700">
                    <div className="flex items-center justify-center p-3 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
                      <FaCheckCircle className="mr-3 text-[#00916E] text-xl" />
                      حجز فوري وسهل عبر التطبيق
                    </div>
                    <div className="flex items-center justify-center p-3 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
                      <FaCheckCircle className="mr-3 text-[#00916E] text-xl" />
                      خدمة متاحة على مدار الساعة
                    </div>
                    <div className="flex items-center justify-center p-3 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
                      <FaCheckCircle className="mr-3 text-[#00916E] text-xl" />
                      ضمان الجودة والسرعة
                    </div>
                    <div className="flex items-center justify-center p-3 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
                      <FaCheckCircle className="mr-3 text-[#00916E] text-xl" />
                      أسعار تنافسية وشفافة
                    </div>
                  </div>
                </div>

                {/* طرق التواصل */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6 text-white" style={{fontFamily: 'Cairo, sans-serif'}}>
                    تواصل معنا الآن
                  </h3>
                  <div className="flex flex-wrap gap-6 justify-center">
                    <div className="group bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:bg-opacity-100 hover:bg-green-50 hover:border-green-300 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer transform active:scale-95">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform">
                        <FaPhone className="text-white text-xl" />
                      </div>
                      <p className="text-[#00916E] font-bold text-base group-hover:text-green-600 transition-colors">اتصل بنا</p>
                      <p className="text-gray-600 text-sm mt-1">خدمة العملاء</p>
                    </div>
                    
                    <div className="group bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:bg-opacity-100 hover:bg-green-50 hover:border-green-300 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer transform active:scale-95">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform">
                        <FaWhatsapp className="text-white text-xl" />
                      </div>
                      <p className="text-[#00916E] font-bold text-base group-hover:text-green-600 transition-colors">واتساب</p>
                      <p className="text-gray-600 text-sm mt-1">حجز سريع</p>
                    </div>
                    
                    <div className="group bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:bg-opacity-100 hover:bg-green-50 hover:border-green-300 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer transform active:scale-95">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform">
                        <FaEnvelope className="text-white text-xl" />
                      </div>
                      <p className="text-[#00916E] font-bold text-base group-hover:text-green-600 transition-colors">بريد إلكتروني</p>
                      <p className="text-gray-600 text-sm mt-1">استفسارات</p>
                    </div>
                  </div>
                </div>

                {/* زر الحجز الرئيسي */}
                <div className="relative">
                  <button 
                    className="bg-gradient-to-r from-white to-green-50 text-[#00916E] px-12 py-4 rounded-2xl font-bold text-lg hover:from-green-50 hover:to-white hover:text-green-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer transform active:scale-95 shadow-lg border-2 border-white glow-effect pulse-glow" 
                    style={{fontFamily: 'Cairo, sans-serif'}}
                    onClick={() => handleItemClick('زر الحجز الرئيسي')}
                    onMouseEnter={() => setHoveredItem('main-booking-button')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <span className="flex items-center justify-center">
                      <FaRocket className={`mr-3 text-xl transition-all duration-300 ${
                        hoveredItem === 'main-booking-button' ? 'animate-bounce scale-110' : 'animate-bounce'
                      }`} style={{animationDuration: '2s'}} />
                      احجز خدمتك الآن
                      <FaGem className={`ml-3 text-xl transition-all duration-300 ${
                        hoveredItem === 'main-booking-button' ? 'animate-pulse scale-110' : 'animate-pulse'
                      }`} style={{animationDuration: '1.5s'}} />
                    </span>
                  </button>
                  <div className="mt-4 text-white opacity-80 text-sm animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                    <p className="flex items-center justify-center space-x-4 space-x-reverse">
                      <span className="flex items-center">
                        <span className="text-green-300 mr-1">✅</span>
                        حجز فوري
                      </span>
                      <span className="flex items-center">
                        <span className="text-yellow-300 mr-1">⚡</span>
                        خدمة سريعة
                      </span>
                      <span className="flex items-center">
                        <span className="text-green-300 mr-1">💰</span>
                        أسعار تنافسية
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* كيف نعمل؟ */}
            <section className="w-full py-12 bg-[#00916E] rounded-xl shadow-lg">
              <div className="max-w-5xl mx-auto px-6 text-center text-white">
                <h2 
                  className="text-4xl font-bold mb-12 text-white cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 hover:text-yellow-100" 
                  style={{fontFamily: 'Cairo, sans-serif'}}
                  onClick={() => handleItemClick('كيف نعمل')}
                  onMouseEnter={() => setHoveredItem('how-we-work')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  كيف نعمل؟
                </h2>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-green-50 hover:border-green-300 hover:scale-102 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer active:scale-98">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-[#00916E]" style={{fontFamily: 'Cairo, sans-serif'}}>احجز موعدك</h3>
                    <p className="text-gray-700 text-sm leading-relaxed font-bold text-center" style={{fontFamily: 'Cairo, sans-serif'}}>
                      اختر الوقت المناسب لك واحجز موعدك بسهولة من خلال تطبيقنا أو موقعنا الإلكتروني
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-green-50 hover:border-green-300 hover:scale-102 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer active:scale-98">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                      <span className="text-white font-bold text-xl">2</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-[#00916E]" style={{fontFamily: 'Cairo, sans-serif'}}>أحضر سيارتك</h3>
                    <p className="text-gray-700 text-sm leading-relaxed font-bold text-center" style={{fontFamily: 'Cairo, sans-serif'}}>
                      أحضر سيارتك إلى أقرب فرع من فروعنا المنتشرة في جميع أنحاء المملكة
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-green-50 hover:border-green-300 hover:scale-102 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer active:scale-98">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                      <span className="text-white font-bold text-xl">3</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-[#00916E]" style={{fontFamily: 'Cairo, sans-serif'}}>نغسل سيارتك</h3>
                    <p className="text-gray-700 text-sm leading-relaxed font-bold text-center" style={{fontFamily: 'Cairo, sans-serif'}}>
                      فريقنا المحترف يغسل سيارتك بأحدث التقنيات وأفضل المواد لضمان النتيجة المثالية
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-green-50 hover:border-green-300 hover:scale-102 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer active:scale-98">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                      <span className="text-white font-bold text-xl">4</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-[#00916E]" style={{fontFamily: 'Cairo, sans-serif'}}>استلم سيارتك</h3>
                    <p className="text-gray-700 text-sm leading-relaxed font-bold text-center" style={{fontFamily: 'Cairo, sans-serif'}}>
                      استلم سيارتك نظيفة ولامعة في أقل من 15 دقيقة مع ضمان الجودة والرضا التام
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* أنواع السيارات */}
            <section className="w-full py-12 bg-gradient-to-b from-[#00916E] to-[#16c47a] rounded-xl shadow-lg">
              <div className="max-w-5xl mx-auto px-6 text-center text-white">
                <h2 
                  className="text-4xl font-bold mb-12 text-white cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 hover:text-yellow-100" 
                  style={{fontFamily: 'Cairo, sans-serif'}}
                  onClick={() => handleItemClick('أنواع السيارات')}
                  onMouseEnter={() => setHoveredItem('car-types')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  أنواع السيارات
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-green-50 hover:border-green-300 hover:scale-102 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer active:scale-98">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                      <FaCar className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-[#00916E]" style={{fontFamily: 'Cairo, sans-serif'}}>سيارات صغيرة</h3>
                    <p className="text-gray-700 text-sm leading-relaxed font-bold mb-4 text-center" style={{fontFamily: 'Cairo, sans-serif'}}>
                      مناسبة للسيارات الصغيرة والمتوسطة مثل السيدان والهاتشباك. خدمة سريعة وفعالة.
                    </p>
                    <ul className="text-gray-700 text-right font-bold space-y-2">
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        سيارات سيدان
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        سيارات هاتشباك
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        سيارات كوبيه
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        سيارات عائلية صغيرة
                      </li>
                    </ul>
                    <div className="mt-6">
                      <span 
                        className="bg-[#00916E] text-white px-4 py-2 rounded-lg font-bold text-base hover:bg-green-600 hover:scale-105 transition-all duration-300 cursor-pointer transform active:scale-95"
                        onClick={() => handleItemClick('سعر السيارات الصغيرة')}
                        onMouseEnter={() => setHoveredItem('small-car-price')}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        150 ريال
                      </span>
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-green-50 hover:border-green-300 hover:scale-102 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer active:scale-98">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                      <FaCar className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-[#00916E]" style={{fontFamily: 'Cairo, sans-serif'}}>سيارات متوسطة</h3>
                    <p className="text-gray-700 text-sm leading-relaxed font-bold mb-4 text-center" style={{fontFamily: 'Cairo, sans-serif'}}>
                      مناسبة للسيارات المتوسطة والـ SUV الصغيرة. خدمة شاملة ومتخصصة بأعلى جودة.
                    </p>
                    <ul className="text-gray-700 text-right font-bold space-y-2">
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        سيارات SUV صغيرة
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        سيارات كروس أوفر
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        سيارات عائلية متوسطة
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        سيارات فان صغيرة
                      </li>
                    </ul>
                    <div className="mt-6">
                      <span 
                        className="bg-[#00916E] text-white px-4 py-2 rounded-lg font-bold text-base hover:bg-green-600 hover:scale-105 transition-all duration-300 cursor-pointer transform active:scale-95"
                        onClick={() => handleItemClick('سعر السيارات المتوسطة')}
                        onMouseEnter={() => setHoveredItem('medium-car-price')}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        180 ريال
                      </span>
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-green-50 hover:border-green-300 hover:scale-102 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer active:scale-98">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                      <FaCar className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-[#00916E]" style={{fontFamily: 'Cairo, sans-serif'}}>سيارات كبيرة</h3>
                    <p className="text-gray-700 text-sm leading-relaxed font-bold mb-4 text-center" style={{fontFamily: 'Cairo, sans-serif'}}>
                      مناسبة للسيارات الكبيرة والـ SUV الكبيرة والشاحنات. خدمة شاملة ومتخصصة.
                    </p>
                    <ul className="text-gray-700 text-right font-bold space-y-2">
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        سيارات SUV كبيرة
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        شاحنات صغيرة
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        سيارات فان كبيرة
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        سيارات عائلية كبيرة
                      </li>
                    </ul>
                    <div className="mt-6">
                      <span 
                        className="bg-[#00916E] text-white px-4 py-2 rounded-lg font-bold text-base hover:bg-green-600 hover:scale-105 transition-all duration-300 cursor-pointer transform active:scale-95"
                        onClick={() => handleItemClick('سعر السيارات الكبيرة')}
                        onMouseEnter={() => setHoveredItem('large-car-price')}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        220 ريال
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <div 
                    className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 inline-block cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 hover:bg-yellow-100 hover:border-yellow-400"
                    onClick={() => handleItemClick('تنبيه الأسعار')}
                    onMouseEnter={() => setHoveredItem('price-warning')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <p className={`text-yellow-800 font-bold text-base transition-all duration-300 ${
                      hoveredItem === 'price-warning' ? 'text-yellow-900 scale-105' : ''
                    }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                      ⚠️ تنبيه: الأسعار تختلف حسب نوع الباقة المختارة (أساسية، متقدمة، شاملة)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* خدماتنا */}
            <section className="w-full py-12 bg-gradient-to-b from-[#00916E] to-[#16c47a] rounded-xl shadow-lg">
              <div className="max-w-5xl mx-auto px-6 text-center text-white">
                <h2 
                  className="text-4xl font-bold mb-12 text-white cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 hover:text-yellow-100" 
                  style={{fontFamily: 'Cairo, sans-serif'}}
                  onClick={() => handleItemClick('خدماتنا')}
                  onMouseEnter={() => setHoveredItem('our-services')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  خدماتنا
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-green-50 hover:border-green-300 hover:scale-102 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer active:scale-98">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                      <FaTools className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-[#00916E]" style={{fontFamily: 'Cairo, sans-serif'}}>غسيل خارجي</h3>
                    <p className="text-sm mb-4 leading-relaxed text-gray-700 font-bold text-center" style={{fontFamily: 'Cairo, sans-serif'}}>
                      غسيل شامل للخارج مع تجفيف وتلميع. يشمل غسيل الهيكل والعجلات والزجاج.
                    </p>
                    <ul className="text-gray-700 text-right font-bold space-y-2">
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        غسيل الهيكل بالكامل
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        تنظيف العجلات والإطارات
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        غسيل الزجاج الأمامي والخلفي
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        تجفيف وتلميع خارجي
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-green-50 hover:border-green-300 hover:scale-102 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer active:scale-98">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                      <FaLeaf className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-[#00916E]" style={{fontFamily: 'Cairo, sans-serif'}}>غسيل داخلي</h3>
                    <p className="text-sm mb-4 leading-relaxed text-gray-700 font-bold text-center" style={{fontFamily: 'Cairo, sans-serif'}}>
                      تنظيف شامل للداخل والأسطح. يشمل المقاعد والأرضية واللوحة الأمامية.
                    </p>
                    <ul className="text-gray-700 text-right font-bold space-y-2">
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        تنظيف المقاعد والكفرات
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        غسيل الأرضية والسجاد
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        تنظيف اللوحة الأمامية
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        تعطير داخلي
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-green-50 hover:border-green-300 hover:scale-102 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer active:scale-98">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                      <FaAward className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-[#00916E]" style={{fontFamily: 'Cairo, sans-serif'}}>غسيل شامل</h3>
                    <p className="text-sm mb-4 leading-relaxed text-gray-700 font-bold text-center" style={{fontFamily: 'Cairo, sans-serif'}}>
                      غسيل خارجي وداخلي شامل مع خدمات إضافية. الخدمة الأكثر شمولية.
                    </p>
                    <ul className="text-gray-700 text-right font-bold space-y-2">
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        غسيل خارجي كامل
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        غسيل داخلي شامل
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        تلميع خارجي احترافي
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        تعطير داخلي فاخر
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-green-50 hover:border-green-300 hover:scale-102 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer active:scale-98">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                      <FaStar className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-[#00916E]" style={{fontFamily: 'Cairo, sans-serif'}}>تلميع خاص</h3>
                    <p className="text-sm mb-4 leading-relaxed text-gray-700 font-bold text-center" style={{fontFamily: 'Cairo, sans-serif'}}>
                      تلميع احترافي للسيارات الفاخرة مع مواد إيطالية عالية الجودة.
                    </p>
                    <ul className="text-gray-700 text-right font-bold space-y-2">
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        تلميع احترافي
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        مواد إيطالية فاخرة
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        حماية للطلاء
                      </li>
                      <li className="flex items-center justify-end p-1 bg-green-50 rounded-md border-r-3 border-[#00916E] text-sm">
                        <FaCheckCircle className="ml-2 text-[#00916E] text-lg" />
                        لمعان طويل الأمد
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* إحصائياتنا */}
            <section className="w-full py-10 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="max-w-5xl mx-auto px-6">
                <h2 
                  className="text-3xl font-bold text-center mb-10 text-[#00916E] hover:text-green-600 transition-colors duration-300 cursor-pointer transform hover:scale-105 active:scale-95" 
                  style={{fontFamily: 'Cairo, sans-serif'}}
                  onClick={() => handleItemClick('إحصائياتنا')}
                  onMouseEnter={() => setHoveredItem('statistics')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  إحصائياتنا
                </h2>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300 active:scale-95">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:shadow-green-200 group-active:shadow-inner group-active:shadow-green-300 transition-all duration-300 group-hover:scale-110 group-active:scale-95">
                      <FaMapMarkerAlt className="text-white text-2xl group-hover:text-green-100 group-active:text-green-50 transition-colors duration-300" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-[#00916E] group-hover:text-green-600 group-active:text-green-700 transition-colors duration-300">+50</h3>
                    <p className="text-base text-black font-bold group-hover:text-gray-700 group-active:text-gray-800 transition-colors duration-300" style={{fontFamily: 'Cairo, sans-serif'}}>فرع في المملكة</p>
                  </div>
                  <div className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300 active:scale-95">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:shadow-green-200 group-active:shadow-inner group-active:shadow-green-300 transition-all duration-300 group-hover:scale-110 group-active:scale-95">
                      <FaClock className="text-white text-2xl group-hover:text-green-100 group-active:text-green-50 transition-colors duration-300" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-[#00916E] group-hover:text-green-600 group-active:text-green-700 transition-colors duration-300">15</h3>
                    <p className="text-base text-black font-bold group-hover:text-gray-700 group-active:text-gray-800 transition-colors duration-300" style={{fontFamily: 'Cairo, sans-serif'}}>دقيقة متوسط الوقت</p>
                  </div>
                  <div className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300 active:scale-95">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:shadow-green-200 group-active:shadow-inner group-active:shadow-green-300 transition-all duration-300 group-hover:scale-110 group-active:scale-95">
                      <FaStar className="text-white text-2xl group-hover:text-green-100 group-active:text-green-50 transition-colors duration-300" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-[#00916E] group-hover:text-green-600 group-active:text-green-700 transition-colors duration-300">99%</h3>
                    <p className="text-base text-black font-bold group-hover:text-gray-700 group-active:text-gray-800 transition-colors duration-300" style={{fontFamily: 'Cairo, sans-serif'}}>رضا العملاء</p>
                  </div>
                  <div className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300 active:scale-95">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:shadow-green-200 group-active:shadow-inner group-active:shadow-green-300 transition-all duration-300 group-hover:scale-110 group-active:scale-95">
                      <FaUsers className="text-white text-2xl group-hover:text-green-100 group-active:text-green-50 transition-colors duration-300" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-[#00916E] group-hover:text-green-600 group-active:text-green-700 transition-colors duration-300">+50K</h3>
                    <p className="text-base text-black font-bold group-hover:text-gray-700 group-active:text-gray-800 transition-colors duration-300" style={{fontFamily: 'Cairo, sans-serif'}}>عميل راضي</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

// إضافة CSS مخصص للتأثيرات الحركية
const styles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-in-left {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slide-in-right {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scale-in {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes bounce-in {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }

  .animate-slide-in-left {
    animation: slide-in-left 0.8s ease-out forwards;
  }

  .animate-slide-in-right {
    animation: slide-in-right 0.8s ease-out forwards;
  }

  .animate-scale-in {
    animation: scale-in 0.6s ease-out forwards;
  }

  .animate-bounce-in {
    animation: bounce-in 0.8s ease-out forwards;
  }

  .hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 145, 110, 0.15);
  }

  .glow-effect {
    position: relative;
    overflow: hidden;
  }

  .glow-effect::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  .glow-effect:hover::before {
    left: 100%;
  }

  .pulse-glow {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(0, 145, 110, 0.7);
    }
    50% {
      box-shadow: 0 0 0 10px rgba(0, 145, 110, 0);
    }
  }
`;

// إضافة الـ CSS إلى الـ head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Services; 
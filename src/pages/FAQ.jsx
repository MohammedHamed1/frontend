import React, { useState, useEffect } from 'react';

import { FaQuestionCircle, FaChevronDown, FaChevronUp, FaSearch, FaStar, FaClock, FaShieldAlt, FaUsers, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const FAQ = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // استخدام hook مخصص للتمرير التلقائي

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

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

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
    handleItemClick(`FAQ ${index + 1}`);
  };

  const faqData = [
    {
      question: "ما هي الخدمات التي تقدمونها؟",
      answer: "نقدم مجموعة شاملة من خدمات غسيل السيارات تشمل: غسيل خارجي، غسيل داخلي، غسيل شامل، تلميع احترافي، تنظيف المحرك، وتلميع الإطارات. جميع الخدمات تتم بأحدث التقنيات وأفضل المواد الإيطالية."
    },
    {
      question: "كم تستغرق عملية الغسيل؟",
      answer: "تختلف مدة الغسيل حسب نوع الخدمة المختارة: الغسيل السريع (15 دقيقة)، الغسيل العادي (30 دقيقة)، الغسيل الشامل (45 دقيقة)، والتلميع الاحترافي (60 دقيقة)."
    },
    {
      question: "هل تقدمون خدمة التوصيل؟",
      answer: "نعم، نقدم خدمة التوصيل للمنازل والشركات في جميع أنحاء المملكة. يمكنك حجز موعد وسنأتي إليك في المكان المحدد مع جميع المعدات اللازمة."
    },
    {
      question: "ما هي أسعار الخدمات؟",
      answer: "تختلف الأسعار حسب نوع السيارة والخدمة المختارة. السيارات الصغيرة تبدأ من 150 ريال، المتوسطة من 180 ريال، والكبيرة من 220 ريال. يمكنك الاطلاع على جميع الأسعار في صفحة الباقات."
    },
    {
      question: "هل تقدمون ضمان على الخدمات؟",
      answer: "نعم، نقدم ضمان شامل لمدة 24 ساعة على جميع الخدمات. إذا لم تكن راضياً عن النتيجة، سنعيد الغسيل مجاناً أو نعيد المبلغ المدفوع."
    },
    {
      question: "كيف يمكنني حجز موعد؟",
      answer: "يمكنك الحجز من خلال تطبيقنا الذكي، موقعنا الإلكتروني، أو الاتصال بنا مباشرة على الرقم +966 56 890 9183. الحجز متاح 24/7."
    },
    {
      question: "هل تقدمون خدمات للشركات؟",
      answer: "نعم، نقدم خدمات خاصة للشركات والمركبات التجارية. نقدم عروض خاصة للأساطيل الكبيرة وخدمة مخصصة لاحتياجات الشركات."
    },
    {
      question: "ما هي المواد المستخدمة في الغسيل؟",
      answer: "نستخدم مواد إيطالية عالية الجودة وخالية من المواد الكيميائية الضارة. جميع المواد آمنة على طلاء السيارة والجلود الداخلية."
    },
    {
      question: "هل تقدمون خدمات في العطل الرسمية؟",
      answer: "نعم، معظم فروعنا تعمل في العطل الرسمية. يمكنك التحقق من ساعات العمل في الفرع القريب منك أو الاتصال بنا للتأكد."
    },
    {
      question: "كيف يمكنني تقديم شكوى أو اقتراح؟",
      answer: "يمكنك التواصل معنا من خلال صفحة الشكاوى والاقتراحات، أو الاتصال بنا مباشرة، أو إرسال بريد إلكتروني إلى support@paypasss.com. نرد على جميع الرسائل خلال 24 ساعة."
    }
  ];

  const filteredFaqs = faqData.filter(faq =>
    faq.question.includes(searchTerm) || faq.answer.includes(searchTerm)
  );

  return (
    <>
      <div className="header-spacer"></div>
      
      {/* Page Header مع تأثيرات حركية */}
      <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <PageHeader 
          title="الأسئلة الشائعة"
          subtitle="إجابات على أكثر الأسئلة شيوعاً حول خدماتنا"
          breadcrumbs={['الرئيسية', 'الأسئلة الشائعة']}
        />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50" dir="rtl">
        <div className="max-w-6xl mx-auto px-6 py-12">

          {/* قسم البحث */}
          <div className={`mb-12 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="text-center mb-8">
                <h2 
                  className={`text-3xl font-bold mb-4 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'search-title' ? 'text-green-600' : 'text-gray-800'
                  }`}
                  onClick={() => handleItemClick('البحث في الأسئلة الشائعة')}
                  onMouseEnter={() => setHoveredItem('search-title')}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                >
                  ابحث في الأسئلة الشائعة
                </h2>
                <p className="text-white" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>ابحث عن إجابة لسؤالك بسرعة وسهولة</p>
              </div>
              
              <div className="relative max-w-2xl mx-auto">
                <div className={`relative transition-all duration-300 ${
                  hoveredItem === 'search-input' ? 'scale-105' : ''
                }`}>
                  <input
                    type="text"
                    placeholder="اكتب سؤالك هنا..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 pr-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-300 transition-all duration-300 text-lg"
                    onMouseEnter={() => setHoveredItem('search-input')}
                    onMouseLeave={() => setHoveredItem(null)}
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" style={{color: '#22c55e'}} />
                </div>
              </div>
            </div>
          </div>

          {/* الأسئلة الشائعة */}
          <div className={`space-y-6 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            {filteredFaqs.map((faq, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-green-300 transition-all duration-300 cursor-pointer transform hover:scale-102 active:scale-98 ${
                  animateElements ? 'animate-fade-in-up' : ''
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => toggleFaq(index)}
                onMouseEnter={() => setHoveredItem(`faq-${index}`)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 bg-green-500 rounded-full flex items-center justify-center transition-all duration-300 ${
                        hoveredItem === `faq-${index}` ? 'scale-110 bg-green-600' : ''
                      }`}>
                        <FaQuestionCircle className="text-white text-lg" />
                      </div>
                      <h3 className={`text-xl font-bold transition-all duration-300 ${
                        hoveredItem === `faq-${index}` ? 'text-green-600 scale-105' : 'text-gray-800'
                      }`} style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`transition-all duration-300 ${
                      hoveredItem === `faq-${index}` ? 'scale-110' : ''
                    }`}>
                      {openFaq === index ? (
                        <FaChevronUp className="text-green-500 text-xl" />
                      ) : (
                        <FaChevronDown className="text-gray-400 text-xl" />
                      )}
                    </div>
                  </div>
                  
                  {openFaq === index && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-white leading-relaxed text-lg" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* قسم إضافي للمساعدة */}
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl p-8 text-center">
            <h2 
              className={`text-3xl font-bold mb-6 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 text-gray-700 ${
                hoveredItem === 'help-title' ? 'text-emerald-500' : ''
              }`}
              onClick={() => handleItemClick('هل تحتاج مساعدة إضافية؟')}
              onMouseEnter={() => setHoveredItem('help-title')}
              onMouseLeave={() => setHoveredItem(null)}
              style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
            >
              هل تحتاج مساعدة إضافية؟
            </h2>
            <p className="text-xl mb-8 opacity-90 text-gray-700" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>فريق خدمة العملاء متاح لمساعدتك 24/7</p>
            <div className="grid md:grid-cols-3 gap-6">
              <div 
                className={`bg-white p-6 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 border border-gray-100 hover:border-emerald-200 ${
                  hoveredItem === 'phone-help' ? 'bg-emerald-50' : ''
                }`}
                onClick={() => handleItemClick('اتصل بنا للمساعدة')}
                onMouseEnter={() => setHoveredItem('phone-help')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaPhone className="text-3xl mx-auto mb-4 text-emerald-500" />
                <h3 className="text-xl font-bold mb-2 text-gray-700">اتصل بنا</h3>
                <p className="opacity-90 text-gray-700" dir="ltr">+966 56 890 9183</p>
              </div>
              <div 
                className={`bg-white p-6 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 border border-gray-100 hover:border-emerald-200 ${
                  hoveredItem === 'email-help' ? 'bg-emerald-50' : ''
                }`}
                onClick={() => handleItemClick('راسلنا للمساعدة')}
                onMouseEnter={() => setHoveredItem('email-help')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaEnvelope className="text-3xl mx-auto mb-4 text-emerald-500" />
                <h3 className="text-xl font-bold mb-2 text-gray-700">راسلنا</h3>
                <p className="opacity-90 text-gray-700">support@paypasss.com</p>
              </div>
              <div 
                className={`bg-white p-6 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 border border-gray-100 hover:border-emerald-200 ${
                  hoveredItem === 'whatsapp-help' ? 'bg-emerald-50' : ''
                }`}
                onClick={() => handleItemClick('واتساب للمساعدة')}
                onMouseEnter={() => setHoveredItem('whatsapp-help')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaWhatsapp className="text-3xl mx-auto mb-4 text-emerald-500" />
                <h3 className="text-xl font-bold mb-2 text-gray-700">واتساب</h3>
                <p className="opacity-90 text-gray-700">رد فوري على الرسائل</p>
              </div>
            </div>
          </div>

          {/* إحصائيات */}
          <div className="mt-16 transition-all duration-1000 transform">
            <div className="grid md:grid-cols-4 gap-6">
              <div 
                className={`text-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 border border-gray-100 hover:border-emerald-200 ${
                  hoveredItem === 'stats-1' ? 'shadow-xl shadow-emerald-200' : ''
                }`}
                onClick={() => handleItemClick('إحصائيات العملاء')}
                onMouseEnter={() => setHoveredItem('stats-1')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaUsers className="text-4xl mx-auto mb-4 text-emerald-500 transition-all duration-300" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">+50K</h3>
                <p className="text-gray-700">عميل راضي</p>
              </div>
              <div 
                className={`text-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 border border-gray-100 hover:border-emerald-200 ${
                  hoveredItem === 'stats-2' ? 'shadow-xl shadow-emerald-200' : ''
                }`}
                onClick={() => handleItemClick('إحصائيات الخدمات')}
                onMouseEnter={() => setHoveredItem('stats-2')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaStar className="text-4xl mx-auto mb-4 text-emerald-500 transition-all duration-300" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">99%</h3>
                <p className="text-gray-700">رضا العملاء</p>
              </div>
              <div 
                className={`text-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 border border-gray-100 hover:border-emerald-200 ${
                  hoveredItem === 'stats-3' ? 'shadow-xl shadow-emerald-200' : ''
                }`}
                onClick={() => handleItemClick('إحصائيات الوقت')}
                onMouseEnter={() => setHoveredItem('stats-3')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaClock className="text-4xl mx-auto mb-4 text-emerald-500 transition-all duration-300" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">15</h3>
                <p className="text-gray-700">دقيقة متوسط الوقت</p>
              </div>
              <div 
                className={`text-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 border border-gray-100 hover:border-emerald-200 ${
                  hoveredItem === 'stats-4' ? 'shadow-xl shadow-emerald-200' : ''
                }`}
                onClick={() => handleItemClick('إحصائيات الضمان')}
                onMouseEnter={() => setHoveredItem('stats-4')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaShieldAlt className="text-4xl mx-auto mb-4 text-emerald-500 transition-all duration-300" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">24</h3>
                <p className="text-gray-700">ساعة ضمان</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ; 
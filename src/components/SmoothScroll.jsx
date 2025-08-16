import React, { useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const SmoothScroll = ({ sections = [] }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const sections = document.querySelectorAll('[data-section]');
      
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
          // إضافة تأثير الظهور للمحتوى
          const elements = section.querySelectorAll('.fade-in-element');
          elements.forEach((el, elIndex) => {
            setTimeout(() => {
              el.classList.add('fade-in-visible');
            }, elIndex * 200);
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // تشغيل مرة واحدة عند التحميل
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* أزرار التنقل السريع */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 space-y-2">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative bg-white/80 backdrop-blur-sm border border-[#F8F9FA] rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            title={section.title}
          >
            <div className="w-2 h-2 bg-[#2E7D32] rounded-full group-hover:bg-[#000000] transition-colors duration-300"></div>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-[#000000] text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {section.title}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-[#000000] border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>
          </button>
        ))}
      </div>

      {/* زر العودة لأعلى */}
      <button
        onClick={scrollToTop}
        className="fixed left-6 bottom-6 z-50 bg-[#2E7D32] hover:bg-[#000000] text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        title="العودة لأعلى"
      >
        <ChevronUp className="h-6 w-6 group-hover:animate-bounce" />
      </button>

      {/* مؤشر التقدم */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#F8F9FA] z-50">
        <div 
          ref={scrollRef}
          className="h-full bg-gradient-to-r from-[#2E7D32] to-[#000000] transition-all duration-300"
          style={{ width: '0%' }}
        ></div>
      </div>
    </>
  );
};

export default SmoothScroll; 
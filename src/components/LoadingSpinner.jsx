import React, { useState, useEffect } from 'react';
import { FaCar, FaSmog } from 'react-icons/fa';

const LoadingSpinner = ({ isLoading = false, message = "جاري التحميل..." }) => {
  const [smokeParticles, setSmokeParticles] = useState([]);

  useEffect(() => {
    if (isLoading) {
      // إنشاء جزيئات البخار
      const interval = setInterval(() => {
        setSmokeParticles(prev => {
          const newParticle = {
            id: Date.now(),
            x: Math.random() * 20 - 10, // موقع عشوائي حول السيارة
            y: -20,
            opacity: 1,
            scale: Math.random() * 0.5 + 0.5
          };
          
          // إزالة الجزيئات القديمة
          const updated = [...prev, newParticle].filter(particle => 
            particle.opacity > 0 && particle.y > -100
          );
          
          // تحديث مواقع الجزيئات
          return updated.map(particle => ({
            ...particle,
            y: particle.y - 2,
            opacity: particle.opacity - 0.02,
            scale: particle.scale + 0.01
          }));
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      setSmokeParticles([]);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 text-center relative overflow-hidden">
        {/* السيارة المتحركة */}
        <div className="relative mb-8">
          {/* جزيئات البخار */}
          {smokeParticles.map(particle => (
            <div
              key={particle.id}
              className="absolute text-gray-400 pointer-events-none"
              style={{
                left: `calc(50% + ${particle.x}px)`,
                top: `calc(50% + ${particle.y}px)`,
                opacity: particle.opacity,
                transform: `scale(${particle.scale})`,
                transition: 'all 0.1s ease-out'
              }}
            >
              <FaSmog className="text-2xl" />
            </div>
          ))}
          
          {/* السيارة */}
          <div className="relative">
            <div className="animate-bounce">
              <FaCar className="text-6xl mx-auto text-emerald-500 mb-2" />
            </div>
            
            {/* عجلات السيارة المتحركة */}
            <div className="flex justify-center gap-8 mt-2">
              <div className="w-3 h-3 bg-gray-800 rounded-full animate-spin"></div>
              <div className="w-3 h-3 bg-gray-800 rounded-full animate-spin" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>
        </div>

        {/* رسالة التحميل */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
            {message}
          </h3>
          <p className="text-gray-600" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
            يرجى الانتظار قليلاً...
          </p>
        </div>

        {/* شريط التقدم المتحرك */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full animate-pulse" 
            style={{
              width: '60%',
              animation: 'loading 2s ease-in-out infinite'
            }}
          >
          </div>
        </div>

        {/* النقاط المتحركة */}
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>

        {/* تأثيرات إضافية */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 
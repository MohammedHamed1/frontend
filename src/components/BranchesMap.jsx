import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';

const BranchesMap = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden">
      {/* خلفية زخرفية */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-green-200/20 to-transparent rounded-full translate-x-48 translate-y-48"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* خريطة جوجل */}
        <div className={`bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">خريطة فروع الرياض</h3>
            <p className="text-gray-600">استكشف مواقع فروعنا على الخريطة</p>
          </div>
          <div className="h-96 w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.5!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sen!2ssa!4v1234567890"
              width="100%" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="PayPass Branches Map"
            />
          </div>
        </div>

        {/* دعوة للعمل */}
        <div className={`text-center mt-12 sm:mt-16 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              لا تجد فرعاً قريباً؟
            </h3>
            <p className="text-gray-600 mb-6">
              نحن نعمل على فتح فروع جديدة في جميع أنحاء المملكة. ابق على اطلاع بآخر التحديثات!
            </p>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              <Award className="w-5 h-5 ml-2" />
              اشترك في النشرة الإخبارية
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchesMap; 
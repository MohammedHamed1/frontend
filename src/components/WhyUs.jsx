import React from 'react';
import { Users, Clock, Shield, Award } from 'lucide-react';

const features = [
  {
    icon: <Users className="w-8 h-8 text-white" />, // فريق محترف
    title: 'فريق محترف',
    desc: 'فريق مدرب ومحترف يضمن لك أفضل النتائج.',
    color: 'bg-purple-500'
  },
  {
    icon: <Clock className="w-8 h-8 text-white" />, // سرعة في الأداء
    title: 'سرعة في الأداء',
    desc: 'نحن الأسرع دائماً دون المساس بالجودة.',
    color: 'bg-green-400'
  },
  {
    icon: <Shield className="w-8 h-8 text-white" />, // حماية شاملة
    title: 'حماية شاملة',
    desc: 'نحمي سيارتك من الأضرار الخارجية.',
    color: 'bg-blue-400'
  },
  {
    icon: <Award className="w-8 h-8 text-white" />, // جودة إيطالية
    title: 'جودة إيطالية',
    desc: 'نستخدم أفضل المواد الإيطالية لضمان أعلى جودة.',
    color: 'bg-yellow-400'
  },
];

const WhyUs = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-900">لماذا تختارنا؟</h2>
      <p className="text-gray-500 text-center mb-10">نتميز بجودة عالية وخدمة مستمرة تجعلنا الخيار الأفضل لك</p>
      <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 max-w-4xl mx-auto">
        {features.map((f, i) => (
          <div key={i} className="flex-1 bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center border border-gray-100">
            <div className={`mb-4 rounded-xl p-3 ${f.color} shadow-lg flex items-center justify-center`}>
              {f.icon}
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs; 
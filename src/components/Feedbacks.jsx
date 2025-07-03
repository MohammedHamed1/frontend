import React, { useEffect, useState } from 'react';
import { getFeedbacks } from '../api';

const demoFeedbacks = [
  {
    userName: 'محمد العتيبي',
    comment: 'خدمة ممتازة وسريعة، أنصح الجميع بالتجربة!',
    rating: 5,
  },
  {
    userName: 'سارة الزهراني',
    comment: 'الموظفون محترفون والمكان نظيف جداً.',
    rating: 4,
  },
  {
    userName: 'خالد الدوسري',
    comment: 'تجربة رائعة وسأعود مرة أخرى بالتأكيد.',
    rating: 5,
  },
  {
    userName: 'نورة المطيري',
    comment: 'الخدمة جيدة لكن الانتظار كان طويلاً قليلاً.',
    rating: 3,
  },
  {
    userName: 'عبدالله الشهري',
    comment: 'أفضل مغسلة سيارات جربتها في الرياض!',
    rating: 5,
  },
  {
    userName: 'ريم الحربي',
    comment: 'الأسعار مناسبة والجودة عالية.',
    rating: 4,
  },
];

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    getFeedbacks()
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setFeedbacks(res.data);
        } else {
          setFeedbacks(demoFeedbacks);
        }
      })
      .catch(() => setFeedbacks(demoFeedbacks));
  }, []);

  return (
    <section id="feedbacks" className="py-20 bg-gradient-to-br from-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">آراء العملاء</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">استمع إلى تجارب وآراء عملائنا حول خدماتنا</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {feedbacks.map((fb, idx) => (
            <div key={fb._id || idx} className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="mb-4">
                <span className="text-lg font-bold text-primary-600">{fb.userName || 'عميل'}</span>
              </div>
              <div className="text-gray-700 mb-2">{fb.comment}</div>
              <div className="text-yellow-500 font-bold">{Array(fb.rating).fill('★').join('')}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feedbacks; 
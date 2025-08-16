import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaPaperclip } from 'react-icons/fa';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكن إضافة منطق إرسال الرسالة
    alert('تم إرسال الرسالة بنجاح!');
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
            اتصل بنا
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
            نحن هنا لمساعدتك! اتصل بنا أو راسلنا وسنرد عليك في أقرب وقت ممكن
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* العمود الأيسر - معلومات التواصل */}
          <div className="space-y-6">
            {/* اتصل بنا */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <FaPhone className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  اتصل بنا
                </h3>
              </div>
              <p className="text-gray-700 text-lg" dir="ltr" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                +966 56 890 9183
              </p>
            </div>

            {/* راسلنا */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <FaEnvelope className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  راسلنا
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  support@paypasss.com
                </p>
                <p className="text-gray-700" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  sales@paypasss.com
                </p>
              </div>
            </div>

            {/* العنوان */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  العنوان
                </h3>
              </div>
              <p className="text-gray-700" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                الرياض، المملكة العربية السعودية<br />
                شارع الملك فهد
              </p>
            </div>

            {/* ساعات العمل */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <FaClock className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  ساعات العمل
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  الأحد - الخميس: 8:00 ص - 6:00 م
                </p>
                <p className="text-gray-700" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  الجمعة - السبت: 9:00 ص - 5:00 م
                </p>
              </div>
            </div>

            {/* زر اتصل بنا الآن */}
            <div className="bg-gradient-to-b from-emerald-600 to-emerald-500 rounded-2xl p-8 text-center text-white shadow-lg">
              <FaPhone className="text-4xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                اتصل بنا الآن
              </h3>
              <p className="text-lg mb-6 opacity-90" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                خدمة العملاء متاحة 24/7
              </p>
              <div className="bg-white bg-opacity-20 rounded-xl p-4 inline-flex items-center gap-3">
                <FaPhone className="text-gray-600" />
                <span className="text-gray-600 font-bold" dir="ltr" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  +966 56 890 9183
                </span>
              </div>
            </div>
          </div>

          {/* العمود الأيمن - نموذج التواصل */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <FaPaperPlane className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                أرسل لنا رسالة
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="أدخل اسمك الكامل"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="أدخل بريدك الإلكتروني"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                    الموضوع
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="أدخل الموضوع"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="أدخل رقم هاتفك"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  الرسالة
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="اكتب رسالتك هنا..."
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-none"
                    style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                  />
                  <FaPaperclip className="absolute bottom-4 left-4 text-gray-400" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-b from-emerald-600 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
              >
                <FaPaperPlane />
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 
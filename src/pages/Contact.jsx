import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [activeTab, setActiveTab] = useState('general');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  // استخدام hook مخصص للتمرير التلقائي


  const contactInfo = [
    {
      icon: FaPhone,
      title: 'الهاتف',
      value: '+966 11 123 4567',
      subtitle: 'من الأحد إلى الخميس',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FaEnvelope,
      title: 'البريد الإلكتروني',
      value: 'info@paypasss.com',
      subtitle: 'رد خلال 24 ساعة',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'العنوان',
      value: 'الرياض، المملكة العربية السعودية',
      subtitle: 'برج المملكة، الطابق 15',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: FaClock,
      title: 'ساعات العمل',
      value: 'الأحد - الخميس',
      subtitle: '8:00 ص - 6:00 م',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const departments = [
    {
      id: 'general',
      title: 'الاستفسارات العامة',
      description: 'للاستفسارات العامة والمعلومات الأساسية',
      email: 'info@paypasss.com',
      phone: '+966 11 123 4567'
    },
    {
      id: 'sales',
      title: 'المبيعات',
      description: 'للاستفسارات حول المنتجات والخدمات',
      email: 'sales@paypasss.com',
      phone: '+966 11 123 4568'
    },
    {
      id: 'support',
      title: 'الدعم الفني',
      description: 'للمساعدة التقنية والدعم الفني',
      email: 'support@paypasss.com',
      phone: '+966 11 123 4569'
    },
    {
      id: 'partnership',
      title: 'الشراكات',
      description: 'للاستفسارات حول الشراكات والتعاون',
      email: 'partnership@paypasss.com',
      phone: '+966 11 123 4570'
    }
  ];

  const socialMedia = [
    { icon: FaWhatsapp, name: 'WhatsApp', url: '#', color: 'from-green-500 to-green-600' },
    { icon: FaLinkedin, name: 'LinkedIn', url: '#', color: 'from-blue-600 to-blue-700' },
    { icon: FaTwitter, name: 'Twitter', url: '#', color: 'from-blue-400 to-blue-500' },
    { icon: FaFacebook, name: 'Facebook', url: '#', color: 'from-blue-600 to-blue-700' },
    { icon: FaInstagram, name: 'Instagram', url: '#', color: 'from-pink-500 to-purple-600' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكن إضافة منطق إرسال النموذج
    alert('تم إرسال الرسالة بنجاح!');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleItemClick = (itemName) => {
    setClickedItem(itemName);
    // إعادة تعيين العنصر المحدد بعد ثانية
    setTimeout(() => setClickedItem(null), 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <div className="header-spacer"></div>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <PageHeader 
          title="اتصل بنا"
          subtitle="نحن هنا لمساعدتك في كل ما تحتاجه"
          breadcrumbs={['الرئيسية', 'اتصل بنا']}
        />

        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 
                className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'contact-title' ? 'text-blue-600' : ''
                }`}
                onClick={() => handleItemClick('عنوان التواصل')}
                onMouseEnter={() => setHoveredItem('contact-title')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                نحن هنا
                <span className="text-blue-600"> لمساعدتك</span>
              </h1>
              <p 
                className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'contact-description' ? 'text-gray-800' : ''
                }`}
                onClick={() => handleItemClick('وصف التواصل')}
                onMouseEnter={() => setHoveredItem('contact-description')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                فريقنا متاح دائماً للإجابة على استفساراتك وتقديم الدعم الذي تحتاجه. 
                لا تتردد في التواصل معنا بأي طريقة تفضلها.
              </p>
            </motion.div>

            {/* Contact Info Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
            {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 text-center ${
                    hoveredItem === `contact-info-${index}` ? 'shadow-xl' : ''
                  }`}
                  onClick={() => handleItemClick(`معلومات ${info.title}`)}
                  onMouseEnter={() => setHoveredItem(`contact-info-${index}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                    hoveredItem === `contact-info-${index}` ? 'scale-110' : ''
                  }`}>
                    <info.icon className={`text-white text-2xl transition-all duration-300 ${
                      hoveredItem === `contact-info-${index}` ? 'scale-110' : ''
                    }`} />
                </div>
                  <h3 className={`text-xl font-bold text-gray-900 mb-2 transition-all duration-300 ${
                    hoveredItem === `contact-info-${index}` ? 'text-blue-600' : ''
                  }`}>
                    {info.title}
                  </h3>
                  <p className="text-lg text-gray-700 mb-1" dir="ltr">
                    {info.value}
                  </p>
                  <p className="text-sm text-gray-500">
                    {info.subtitle}
                  </p>
                </motion.div>
              ))}
            </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white rounded-3xl shadow-xl p-8"
              >
                <h2 
                  className={`text-2xl font-bold mb-6 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'form-title' ? 'text-green-600' : 'text-gray-900'
                  }`}
                  onClick={() => handleItemClick('نموذج التواصل')}
                  onMouseEnter={() => setHoveredItem('form-title')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className="bg-green-500 text-white px-4 py-2 rounded-lg">أرسل لنا رسالة</span>
                </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        الاسم الكامل
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                          hoveredItem === 'name-input' ? 'border-green-400' : ''
                        }`}
                        onMouseEnter={() => setHoveredItem('name-input')}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={() => handleItemClick('حقل الاسم')}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                          hoveredItem === 'email-input' ? 'border-green-400' : ''
                        }`}
                        onMouseEnter={() => setHoveredItem('email-input')}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={() => handleItemClick('حقل البريد الإلكتروني')}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                          hoveredItem === 'phone-input' ? 'border-green-400' : ''
                        }`}
                        onMouseEnter={() => setHoveredItem('phone-input')}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={() => handleItemClick('حقل الهاتف')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        الشركة
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                          hoveredItem === 'company-input' ? 'border-green-400' : ''
                        }`}
                        onMouseEnter={() => setHoveredItem('company-input')}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={() => handleItemClick('حقل الشركة')}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      الموضوع
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                        hoveredItem === 'subject-input' ? 'border-green-400' : ''
                      }`}
                      onMouseEnter={() => setHoveredItem('subject-input')}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => handleItemClick('حقل الموضوع')}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      الرسالة
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="6"
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none ${
                        hoveredItem === 'message-input' ? 'border-green-400' : ''
                      }`}
                      onMouseEnter={() => setHoveredItem('message-input')}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => handleItemClick('حقل الرسالة')}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    onMouseEnter={() => setHoveredItem('submit-button')}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => handleItemClick('إرسال الرسالة')}
                    className={`w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
                      hoveredItem === 'submit-button' ? 'bg-green-700 scale-105' : ''
                    }`}
                  >
                    إرسال الرسالة
                  </button>
                </form>
              </motion.div>

              {/* Department Tabs */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white rounded-3xl shadow-xl p-8"
              >
                <h2 
                  className={`text-2xl font-bold mb-6 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'departments-title' ? 'text-green-600' : 'text-gray-900'
                  }`}
                  onClick={() => handleItemClick('الأقسام')}
                  onMouseEnter={() => setHoveredItem('departments-title')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className="bg-green-500 text-white px-4 py-2 rounded-lg">تواصل مع القسم المناسب</span>
                </h2>
                
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div
                      key={dept.id}
                      className={`p-4 rounded-xl border-2 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                        activeTab === dept.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      } ${
                        hoveredItem === `dept-${dept.id}` ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => {
                        setActiveTab(dept.id);
                        handleItemClick(`قسم ${dept.title}`);
                      }}
                      onMouseEnter={() => setHoveredItem(`dept-${dept.id}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <h3 className={`font-bold text-lg mb-2 transition-all duration-300 ${
                        hoveredItem === `dept-${dept.id}` ? 'text-blue-600' : ''
                      }`}>
                        {dept.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {dept.description}
                      </p>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <FaEnvelope className="text-blue-500" />
                          {dept.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <FaPhone className="text-green-500" />
                          {dept.phone}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Media */}
                <div className="mt-8">
                  <h3 
                    className={`text-lg font-bold text-gray-900 mb-4 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                      hoveredItem === 'social-title' ? 'text-blue-600' : ''
                    }`}
                    onClick={() => handleItemClick('وسائل التواصل الاجتماعي')}
                    onMouseEnter={() => setHoveredItem('social-title')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    تابعنا على وسائل التواصل الاجتماعي
                  </h3>
                  <div className="flex gap-4">
                    {socialMedia.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-gradient-to-r ${social.color} text-white rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer transform hover:scale-110 active:scale-95 ${
                          hoveredItem === `social-${index}` ? 'scale-110' : ''
                        }`}
                        onClick={() => handleItemClick(`وسيلة ${social.name}`)}
                        onMouseEnter={() => setHoveredItem(`social-${index}`)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <social.icon className="text-xl" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span 
                  className={`bg-green-500 text-white px-6 py-3 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    clickedItem === 'موقعنا' ? 'animate-pulse bg-green-600 shadow-lg' : ''
                  }`}
                  onClick={() => handleItemClick('موقعنا')}
                  onMouseEnter={() => setHoveredItem('location-title')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  موقعنا
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                يمكنك زيارتنا في مقرنا الرئيسي في الرياض
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <div className="h-96 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-center">
                  <FaMapMarkerAlt className="text-6xl text-blue-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    مقرنا الرئيسي
                  </h3>
                  <p className="text-gray-600 mb-4">
                    برج المملكة، الطابق 15<br />
                    شارع الملك فهد<br />
                    الرياض، المملكة العربية السعودية
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 hover:shadow-lg transition-all duration-300"
                  >
                    احصل على الاتجاهات
                  </motion.button>
                </div>
              </div>
            </motion.div>
                </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 
                className={`text-3xl md:text-4xl font-bold text-white mb-6 bg-green-500 px-8 py-4 rounded-xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  clickedItem === 'الأسئلة الشائعة' ? 'animate-pulse bg-green-600 shadow-xl' : ''
                }`}
                onClick={() => handleItemClick('الأسئلة الشائعة')}
                onMouseEnter={() => setHoveredItem('faq-title')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                الأسئلة الشائعة
              </h2>
              <p className="text-xl text-gray-600">
                إجابات على أكثر الأسئلة شيوعاً
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  question: 'كيف يمكنني التواصل مع الدعم الفني؟',
                  answer: 'يمكنك التواصل مع الدعم الفني عبر البريد الإلكتروني support@paypasss.com أو الهاتف +966 11 123 4569 من الأحد إلى الخميس من 8 صباحاً إلى 6 مساءً.'
                },
                {
                  question: 'ما هي ساعات العمل؟',
                  answer: 'نعم، نقدم خدماتنا في جميع دول مجلس التعاون الخليجي وبعض الدول العربية. يمكنك التواصل معنا لمعرفة المزيد عن التغطية في منطقتك.'
                },
                {
                  question: 'هل تقدمون خدمات خارج المملكة؟',
                  answer: 'نعم، نقدم خدماتنا في جميع دول مجلس التعاون الخليجي وبعض الدول العربية. يمكنك التواصل معنا لمعرفة المزيد عن التغطية في منطقتك.'
                },
                {
                  question: 'كيف يمكنني طلب عرض سعر؟',
                  answer: 'يمكنك طلب عرض سعر عبر ملء النموذج أعلاه أو التواصل مع فريق المبيعات مباشرة على sales@paypasss.com أو +966 11 123 4568.'
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 text-right flex items-center justify-between hover:bg-gray-50 transition-all duration-300"
                  >
                    <h3 className="text-lg font-bold text-gray-900 flex-1">
                      {faq.question}
                    </h3>
                    <div className={`ml-4 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                      ▼
                    </div>
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact; 
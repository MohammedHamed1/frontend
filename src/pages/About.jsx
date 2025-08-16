import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { FaRocket, FaUsers, FaGlobe, FaAward, FaHeart, FaLightbulb, FaShieldAlt, FaChartLine } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const About = () => {
  const [activeYear, setActiveYear] = useState(2024);
  const [counter, setCounter] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);

  const stats = [
    { number: 500, suffix: '+', label: 'عميل راضٍ', icon: FaUsers },
    { number: 50, suffix: '+', label: 'مشروع ناجح', icon: FaRocket },
    { number: 10, suffix: '+', label: 'سنوات خبرة', icon: FaAward },
    { number: 24, suffix: '/7', label: 'دعم فني', icon: FaHeart }
  ];

  const timeline = [
    {
      year: 2014,
      title: 'بداية الرحلة',
      description: 'تأسيس الشركة مع رؤية واضحة لتحويل الخدمات المالية'
    },
    {
      year: 2016,
      title: 'إطلاق أول منتج',
      description: 'إطلاق نظام الدفع الإلكتروني الأول في السوق السعودي'
    },
    {
      year: 2018,
      title: 'التوسع الإقليمي',
      description: 'بدء العمليات في دول مجلس التعاون الخليجي'
    },
    {
      year: 2020,
      title: 'التحول الرقمي',
      description: 'إطلاق منصة شاملة للخدمات المالية الرقمية'
    },
    {
      year: 2022,
      title: 'الذكاء الاصطناعي',
      description: 'دمج تقنيات الذكاء الاصطناعي في حلولنا'
    },
    {
      year: 2024,
      title: 'الريادة العالمية',
      description: 'تصبح الشركة رائدة في مجال التكنولوجيا المالية'
    }
  ];

  const values = [
    {
      icon: FaHeart,
      title: 'الاهتمام بالعملاء',
      description: 'نضع عملاءنا في قلب كل قرار نتخذه'
    },
    {
      icon: FaLightbulb,
      title: 'الابتكار المستمر',
      description: 'نبحث دائماً عن طرق جديدة لحل التحديات'
    },
    {
      icon: FaShieldAlt,
      title: 'الأمان والموثوقية',
      description: 'نضمن أمان بيانات عملائنا وحماية أصولهم'
    },
    {
      icon: FaUsers,
      title: 'العمل الجماعي',
      description: 'نؤمن بقوة العمل الجماعي والتعاون'
    },
    {
      icon: FaChartLine,
      title: 'التميز في الأداء',
      description: 'نسعى دائماً للتميز في كل ما نقوم به'
    },
    {
      icon: FaGlobe,
      title: 'التأثير الإيجابي',
      description: 'نساهم في بناء مستقبل رقمي أفضل'
    }
  ];

  const team = [
    {
      name: 'أحمد محمد',
      position: 'الرئيس التنفيذي',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      description: 'خبرة 15 عاماً في مجال التكنولوجيا المالية'
    },
    {
      name: 'سارة أحمد',
      position: 'مدير التطوير',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      description: 'متخصصة في تطوير التطبيقات المتقدمة'
    },
    {
      name: 'محمد علي',
      position: 'مدير الأمن السيبراني',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      description: 'خبير في حماية البيانات والأنظمة'
    },
    {
      name: 'فاطمة حسن',
      position: 'مدير التسويق',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      description: 'متخصصة في استراتيجيات التسويق الرقمي'
    }
  ];

  // استخدام hook مخصص للتمرير التلقائي

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => {
        if (prev < 100) {
          return prev + 1;
        }
        return prev;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

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
          title="من نحن"
          subtitle="نحن شركة رائدة في مجال التكنولوجيا المالية"
          breadcrumbs={['الرئيسية', 'من نحن']}
        />

        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 
                  className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'main-title' ? 'text-green-600' : ''
                  }`}
                  onClick={() => handleItemClick('العنوان الرئيسي')}
                  onMouseEnter={() => setHoveredItem('main-title')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  نحن نقود
                  <span className="text-green-600"> المستقبل الرقمي</span>
                </h1>
                <p 
                  className={`text-xl text-gray-600 mb-8 leading-relaxed cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'main-description' ? 'text-gray-800' : ''
                  }`}
                  onClick={() => handleItemClick('الوصف الرئيسي')}
                  onMouseEnter={() => setHoveredItem('main-description')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  منذ عام 2014، كنا في طليعة الثورة الرقمية في المملكة العربية السعودية. 
                  نقدم حلول تقنية متطورة تساعد الشركات على النمو والابتكار في العصر الرقمي.
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer transform active:scale-95"
                    onClick={() => handleItemClick('زر تعرف على فريقنا')}
                    onMouseEnter={() => setHoveredItem('team-button')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    تعرف على فريقنا
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 cursor-pointer transform active:scale-95"
                    onClick={() => handleItemClick('زر شاهد رحلتنا')}
                    onMouseEnter={() => setHoveredItem('journey-button')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    شاهد رحلتنا
                  </motion.button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div 
                  className={`bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-8 text-white cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'achievements-card' ? 'shadow-2xl' : ''
                  }`}
                  onClick={() => handleItemClick('بطاقة الإنجازات')}
                  onMouseEnter={() => setHoveredItem('achievements-card')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="text-center">
                    <h3 
                      className={`text-2xl font-bold mb-4 transition-all duration-300 ${
                        hoveredItem === 'achievements-card' ? 'scale-105' : ''
                      }`}
                    >
                      إنجازاتنا
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      {stats.map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={`text-center cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                            hoveredItem === `stat-${index}` ? 'scale-110' : ''
                          }`}
                          onClick={() => handleItemClick(`إحصائيات ${stat.label}`)}
                          onMouseEnter={() => setHoveredItem(`stat-${index}`)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <stat.icon className={`text-3xl mx-auto mb-2 transition-all duration-300 ${
                            hoveredItem === `stat-${index}` ? 'scale-110' : ''
                          }`} />
                          <div className={`text-3xl font-bold transition-all duration-300 ${
                            hoveredItem === `stat-${index}` ? 'scale-110' : ''
                          }`}>{stat.number}{stat.suffix}</div>
                          <div className="text-sm opacity-90">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 
                className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                                      hoveredItem === 'vision-title' ? 'text-green-600' : ''
                }`}
                onClick={() => handleItemClick('عنوان الرؤية والرسالة')}
                onMouseEnter={() => setHoveredItem('vision-title')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                رؤيتنا ورسالتنا
              </h2>
              <p 
                className={`text-xl text-gray-600 max-w-3xl mx-auto cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'vision-description' ? 'text-gray-800' : ''
                }`}
                onClick={() => handleItemClick('وصف الرؤية والرسالة')}
                onMouseEnter={() => setHoveredItem('vision-description')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                نسعى لبناء مستقبل رقمي أفضل للجميع من خلال الابتكار والتكنولوجيا المتطورة
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`bg-white rounded-3xl p-8 shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'vision-card' ? 'shadow-xl' : ''
                }`}
                onClick={() => handleItemClick('بطاقة الرؤية')}
                onMouseEnter={() => setHoveredItem('vision-card')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className={`w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                  hoveredItem === 'vision-card' ? 'scale-110' : ''
                }`}>
                  <FaRocket className={`text-white text-2xl transition-all duration-300 ${
                    hoveredItem === 'vision-card' ? 'scale-110' : ''
                  }`} />
                </div>
                <h3 
                  className={`text-2xl font-bold text-gray-900 mb-4 transition-all duration-300 ${
                    hoveredItem === 'vision-card' ? 'text-green-600' : ''
                  }`}
                >
                  رؤيتنا
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  أن نكون الشريك التقني الموثوق للشركات في رحلتها نحو التحول الرقمي،
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                  <FaHeart className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">رسالتنا</h3>
                <p className="text-gray-600 leading-relaxed">
                  تقديم حلول تقنية مبتكرة وآمنة تساعد الشركات على النمو والنجاح، 
                  مع التركيز على تجربة المستخدم والجودة العالية.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                رحلتنا عبر الزمن
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                شاهد كيف تطورنا من شركة ناشئة إلى رائدة في مجال التكنولوجيا المالية
              </p>
            </motion.div>

            <div className="relative">
                              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 to-green-600"></div>
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className={`bg-white rounded-2xl p-6 shadow-lg ${
                        activeYear === item.year ? 'ring-4 ring-green-500' : ''
                      }`}>
                        <div className="text-2xl font-bold text-green-600 mb-2">{item.year}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                قيمنا الأساسية
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                هذه القيم هي التي تقودنا في كل خطوة نخطوها نحو المستقبل
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                    <value.icon className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                فريق القيادة
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                تعرف على القادة الذين يقودون رحلتنا نحو النجاح والابتكار
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-green-600 font-semibold mb-3">
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-12 text-white"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                انضم إلى فريقنا
              </h2>
              <p className="text-xl mb-8 opacity-90">
                نحن نبحث دائماً عن المواهب المتميزة لانضمامها إلى فريقنا المبتكر
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  تصفح الوظائف الشاغرة
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-all duration-300"
                >
                  تواصل معنا
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About; 
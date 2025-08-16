import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, FaLightbulb, FaShieldAlt, FaGlobe, FaStar, FaAward, 
  FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaRocket, FaHeart, FaCheckCircle, FaArrowRight, FaHandshake
} from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const Team = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);

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

  const teamMembers = [
    {
      id: 1,
      name: 'أحمد محمد',
      position: 'الرئيس التنفيذي',
      department: 'الإدارة العليا',
      experience: '15+ سنة',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      bio: 'خبرة واسعة في إدارة الشركات التقنية وتطوير الاستراتيجيات',
      skills: ['القيادة الاستراتيجية', 'إدارة الأعمال', 'التطوير المؤسسي'],
      email: 'ahmed@paypasss.com',
      phone: '+966 50 123 4567',
      linkedin: '#',
      twitter: '#'
    },
    {
      id: 2,
      name: 'سارة أحمد',
      position: 'مدير التطوير التقني',
      department: 'التكنولوجيا',
      experience: '12+ سنة',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop',
      bio: 'متخصصة في تطوير البرمجيات وإدارة المشاريع التقنية',
      skills: ['تطوير البرمجيات', 'إدارة المشاريع', 'الهندسة المعمارية'],
      email: 'sara@paypasss.com',
      phone: '+966 50 234 5678',
      linkedin: '#',
      twitter: '#'
    },
    {
      id: 3,
      name: 'محمد علي',
      position: 'مدير التسويق الرقمي',
      department: 'التسويق',
      experience: '10+ سنة',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      bio: 'خبير في التسويق الرقمي وتطوير العلامات التجارية',
      skills: ['التسويق الرقمي', 'إدارة العلامات التجارية', 'تحليل البيانات'],
      email: 'mohammed@paypasss.com',
      phone: '+966 50 345 6789',
      linkedin: '#',
      twitter: '#'
    },
    {
      id: 4,
      name: 'فاطمة حسن',
      position: 'مدير خدمة العملاء',
      department: 'خدمة العملاء',
      experience: '8+ سنة',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      bio: 'متخصصة في تحسين تجربة العملاء ورضاهم',
      skills: ['خدمة العملاء', 'إدارة العلاقات', 'حل المشاكل'],
      email: 'fatima@paypasss.com',
      phone: '+966 50 456 7890',
      linkedin: '#',
      twitter: '#'
    },
    {
      id: 5,
      name: 'خالد عبدالله',
      position: 'مدير المبيعات',
      department: 'المبيعات',
      experience: '11+ سنة',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      bio: 'خبير في استراتيجيات المبيعات وتطوير الأعمال',
      skills: ['المبيعات الاستراتيجية', 'تطوير الأعمال', 'إدارة الفرق'],
      email: 'khalid@paypasss.com',
      phone: '+966 50 567 8901',
      linkedin: '#',
      twitter: '#'
    },
    {
      id: 6,
      name: 'نورا محمد',
      position: 'مدير الموارد البشرية',
      department: 'الموارد البشرية',
      experience: '9+ سنة',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
      bio: 'متخصصة في تطوير الموارد البشرية وإدارة المواهب',
      skills: ['إدارة المواهب', 'التطوير التنظيمي', 'الاستقطاب'],
      email: 'nora@paypasss.com',
      phone: '+966 50 678 9012',
      linkedin: '#',
      twitter: '#'
    }
  ];

  const departments = [
    {
      name: 'الإدارة العليا',
      count: 3,
      color: 'from-green-500 to-green-600',
      icon: FaRocket
    },
    {
      name: 'التكنولوجيا',
      count: 25,
      color: 'from-green-500 to-green-600',
      icon: FaLightbulb
    },
    {
      name: 'التسويق',
      count: 12,
      color: 'from-green-500 to-green-600',
      icon: FaStar
    },
    {
      name: 'المبيعات',
      count: 18,
      color: 'from-green-500 to-green-600',
      icon: FaHandshake
    },
    {
      name: 'خدمة العملاء',
      count: 15,
      color: 'from-green-500 to-green-600',
      icon: FaHeart
    },
    {
      name: 'الموارد البشرية',
      count: 8,
      color: 'from-green-500 to-green-600',
      icon: FaUsers
    }
  ];

  const values = [
    {
      icon: FaHeart,
      title: 'الاهتمام بالموظفين',
      description: 'نضع رفاهية موظفينا في المقام الأول ونوفر لهم بيئة عمل مثالية'
    },
    {
      icon: FaLightbulb,
      title: 'الابتكار المستمر',
      description: 'نشجع الأفكار الجديدة والإبداع في جميع جوانب العمل'
    },
    {
      icon: FaShieldAlt,
      title: 'الأمان والموثوقية',
      description: 'نوفر بيئة عمل آمنة ومستقرة لجميع أعضاء الفريق'
    },
    {
      icon: FaGlobe,
      title: 'التنوع والشمول',
      description: 'نحترم التنوع ونشجع الشمول في جميع مستويات المنظمة'
    }
  ];

  return (
    <>
      <div className="header-spacer"></div>
      
      <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <PageHeader 
          title="فريقنا المتميز"
          subtitle="تعرف على الفريق المحترف الذي يقود نجاح شركتنا"
          breadcrumbs={['الرئيسية', 'الفريق']}
        />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50" dir="rtl">
        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* قسم الترحيب */}
          <section className={`w-full py-16 bg-white rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-20 w-16 h-16 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-500 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
            </div>
            
            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
              <div 
                className="mb-8 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('فريقنا المتميز')}
                onMouseEnter={() => setHoveredItem('team-title')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <h1 className={`text-5xl font-bold mb-6 text-gray-800 transition-all duration-300 ${
                  hoveredItem === 'team-title' ? 'scale-105 text-green-600' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  فريقنا المتميز
                </h1>
                <p className={`text-xl text-gray-800 font-medium transition-all duration-300 ${
                  hoveredItem === 'team-title' ? 'scale-105' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  فريق محترف ومتخصص يضع نجاح عملائنا في المقام الأول
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className={`bg-gray-50 p-6 rounded-2xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'stats-1' ? 'bg-green-100 scale-105' : ''
                } ${clickedItem === 'إحصائيات الفريق' ? 'bg-green-200 shadow-green-300' : ''}`}
                onClick={() => handleItemClick('إحصائيات الفريق')}
                onMouseEnter={() => setHoveredItem('stats-1')}
                onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaUsers className="text-4xl mx-auto mb-4 text-green-600" />
                  <h3 className="text-2xl font-bold mb-2 text-gray-800" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>+80</h3>
                  <p className="text-gray-800" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>موظف محترف</p>
                </div>
                <div className={`bg-gray-50 p-6 rounded-2xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'stats-2' ? 'bg-green-100 scale-105' : ''
                } ${clickedItem === 'خبرة الفريق' ? 'bg-green-200 shadow-green-300' : ''}`}
                onClick={() => handleItemClick('خبرة الفريق')}
                onMouseEnter={() => setHoveredItem('stats-2')}
                onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaAward className="text-4xl mx-auto mb-4 text-green-600" />
                  <h3 className="text-2xl font-bold mb-2 text-gray-800" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>15+</h3>
                  <p className="text-gray-800" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>سنة خبرة</p>
                </div>
                <div className={`bg-gray-50 p-6 rounded-2xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'stats-3' ? 'bg-green-100 scale-105' : ''
                } ${clickedItem === 'تقييم العملاء' ? 'bg-green-200 shadow-green-300' : ''}`}
                onClick={() => handleItemClick('تقييم العملاء')}
                onMouseEnter={() => setHoveredItem('stats-3')}
                onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaStar className="text-4xl mx-auto mb-4 text-green-600" />
                  <h3 className="text-2xl font-bold mb-2 text-gray-800" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>4.9</h3>
                  <p className="text-gray-800" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>تقييم العملاء</p>
                </div>
              </div>
            </div>
          </section>

          {/* قيمنا */}
          <section className={`mt-16 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="text-center mb-12">
              <h2 
                className="text-4xl font-bold mb-6 text-green-600 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('قيمنا')}
                onMouseEnter={() => setHoveredItem('values-title')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
              >
                قيمنا الأساسية
              </h2>
              <p className="text-xl text-gray-800 max-w-3xl mx-auto" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                القيم التي تجعل فريقنا متميزاً وتساعدنا على تحقيق التميز في كل ما نقدمه
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
                    hoveredItem === `value-${index}` ? 'shadow-green-200' : ''
                  } ${clickedItem === `قيمة ${value.title}` ? 'bg-green-50 shadow-green-300' : ''}`}
                  onClick={() => handleItemClick(`قيمة ${value.title}`)}
                  onMouseEnter={() => setHoveredItem(`value-${index}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${
                    hoveredItem === `value-${index}` ? 'scale-110' : ''
                  }`}>
                    <value.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-green-600 text-center" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                    {value.title}
                  </h3>
                  <p className="text-gray-800 text-center leading-relaxed" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* الأقسام */}
          <section className={`mt-16 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="text-center mb-12">
              <h2 
                className="text-4xl font-bold mb-6 text-green-600 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('أقسامنا')}
                onMouseEnter={() => setHoveredItem('departments-title')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
              >
                أقسامنا
              </h2>
              <p className="text-xl text-gray-800 max-w-3xl mx-auto" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                فريق متخصص في كل قسم لضمان تقديم أفضل الخدمات لعملائنا
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((dept, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
                    hoveredItem === `dept-${index}` ? 'shadow-green-200' : ''
                  } ${clickedItem === `قسم ${dept.name}` ? 'bg-green-50 shadow-green-300' : ''}`}
                  onClick={() => handleItemClick(`قسم ${dept.name}`)}
                  onMouseEnter={() => setHoveredItem(`dept-${index}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${dept.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${
                    hoveredItem === `dept-${index}` ? 'scale-110' : ''
                  }`}>
                    <dept.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 text-center" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                    {dept.name}
                  </h3>
                  <p className="text-3xl font-bold text-green-600 text-center mb-4" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                    {dept.count}
                  </p>
                  <p className="text-gray-800 text-center" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                    موظف محترف
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* أعضاء الفريق */}
          <section className={`mt-16 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="text-center mb-12">
              <h2 
                className="text-4xl font-bold mb-6 text-green-600 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('أعضاء الفريق')}
                onMouseEnter={() => setHoveredItem('members-title')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
              >
                أعضاء الفريق
              </h2>
              <p className="text-xl text-gray-800 max-w-3xl mx-auto" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                تعرف على القادة المحترفين الذين يقودون نجاح شركتنا
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
                    hoveredItem === `member-${member.id}` ? 'shadow-green-200' : ''
                  } ${clickedItem === `عضو الفريق ${member.name}` ? 'shadow-green-300' : ''}`}
                  onClick={() => handleItemClick(`عضو الفريق ${member.name}`)}
                  onMouseEnter={() => setHoveredItem(`member-${member.id}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {member.department}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-green-600" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                      {member.name}
                    </h3>
                    <p className="text-lg font-bold mb-2 text-gray-800" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                      {member.position}
                    </p>
                    <p className="text-sm text-gray-800 mb-4" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                      {member.experience} خبرة
                    </p>
                    
                    <p className="text-gray-800 mb-4 leading-relaxed" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                      {member.bio}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-800 mb-2" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>المهارات:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold"
                            style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-4 space-x-reverse">
                      <a
                        href={`mailto:${member.email}`}
                        className="text-green-600 hover:text-green-700 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaEnvelope className="text-xl" />
                      </a>
                      <a
                        href={`tel:${member.phone}`}
                        className="text-green-600 hover:text-green-700 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaPhone className="text-xl" />
                      </a>
                      <a
                        href={member.linkedin}
                        className="text-green-600 hover:text-green-700 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaLinkedin className="text-xl" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* دعوة للانضمام */}
          <section className={`mt-16 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-12 text-center text-white">
              <h2 
                className="text-4xl font-bold mb-6 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('انضم إلى فريقنا')}
                onMouseEnter={() => setHoveredItem('join-title')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{fontFamily: 'Cairo, sans-serif', color: 'white', fontWeight: 'bold'}}
              >
                انضم إلى فريقنا
              </h2>
              <p className="text-xl mb-8 opacity-90" style={{fontFamily: 'Cairo, sans-serif', color: 'white', fontWeight: 'bold'}}>
                نبحث عن مواهب متميزة لانضمامها إلى فريقنا المحترف
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="bg-green-400 p-6 rounded-2xl">
                  <FaRocket className="text-3xl mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-bold mb-2 text-white" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>فرص نمو</h3>
                  <p className="text-white" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>تطوير مهني مستمر</p>
                </div>
                <div className="bg-green-400 p-6 rounded-2xl">
                  <FaHeart className="text-3xl mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-bold mb-2 text-white" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>بيئة عمل</h3>
                  <p className="text-white" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>بيئة داعمة ومحفزة</p>
                </div>
                <div className="bg-green-400 p-6 rounded-2xl">
                  <FaAward className="text-3xl mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-bold mb-2 text-white" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>مزايا تنافسية</h3>
                  <p className="text-white" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>رواتب ومزايا مميزة</p>
                </div>
              </div>
              
              <button 
                className={`bg-white text-green-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 cursor-pointer transform active:scale-95 ${
                  clickedItem === 'تصفح الوظائف المتاحة' ? 'bg-green-50 shadow-green-300' : ''
                }`}
                style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                onClick={() => handleItemClick('تصفح الوظائف المتاحة')}
                onMouseEnter={() => setHoveredItem('jobs-button')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className="flex items-center justify-center">
                  تصفح الوظائف المتاحة
                  <FaArrowRight className="mr-3 text-xl" />
                </span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Team; 
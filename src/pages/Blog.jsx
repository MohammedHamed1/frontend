import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaUser, FaEye, FaHeart, FaShare, FaSearch, FaFilter, FaArrowRight } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set());

  const categories = [
    { id: 'all', name: 'جميع المقالات' },
    { id: 'technology', name: 'التكنولوجيا' },
    { id: 'finance', name: 'الخدمات المالية' },
    { id: 'security', name: 'الأمان السيبراني' },
    { id: 'innovation', name: 'الابتكار' },
    { id: 'business', name: 'الأعمال' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'مستقبل الدفع الإلكتروني في المملكة العربية السعودية',
      excerpt: 'تستكشف هذه المقالة التطورات المستقبلية في مجال الدفع الإلكتروني وكيف ستشكل مستقبل التجارة في المملكة.',
      content: 'مع التطور السريع في التكنولوجيا والتحول الرقمي، يشهد مجال الدفع الإلكتروني تطورات مذهلة في المملكة العربية السعودية. من المحافظ الإلكترونية إلى العملات الرقمية، نحن نشهد ثورة في طريقة تعاملنا مع المال.',
      author: 'أحمد محمد',
      date: '2024-01-15',
      category: 'finance',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
      readTime: '5 دقائق',
      views: 1250,
      likes: 89,
      featured: true
    },
    {
      id: 2,
      title: 'أحدث تقنيات الأمان السيبراني لعام 2024',
      excerpt: 'تعرف على أحدث التقنيات والحلول لحماية البيانات والأنظمة من التهديدات السيبرانية.',
      content: 'مع تزايد التهديدات السيبرانية، أصبح الأمان الرقمي أولوية قصوى للشركات والأفراد. نستعرض في هذه المقالة أحدث التقنيات والحلول لحماية البيانات والأنظمة.',
      author: 'سارة أحمد',
      date: '2024-01-12',
      category: 'security',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop',
      readTime: '7 دقائق',
      views: 980,
      likes: 67,
      featured: false
    },
    {
      id: 3,
      title: 'كيف تختار أفضل حلول التكنولوجيا لعملك',
      excerpt: 'دليل شامل لاختيار الحلول التقنية المناسبة لاحتياجات عملك وأهدافه.',
      content: 'اختيار الحلول التقنية المناسبة لعملك يمكن أن يكون قراراً صعباً. في هذه المقالة، نقدم دليلاً شاملاً لمساعدتك في اتخاذ القرار الصحيح.',
      author: 'محمد علي',
      date: '2024-01-10',
      category: 'business',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      readTime: '6 دقائق',
      views: 756,
      likes: 45,
      featured: false
    },
    {
      id: 4,
      title: 'الذكاء الاصطناعي في الخدمات المالية',
      excerpt: 'كيف يغير الذكاء الاصطناعي وجه الخدمات المالية ويحسن تجربة العملاء.',
      content: 'الذكاء الاصطناعي يحدث ثورة في مجال الخدمات المالية. من الروبوتات المالية إلى التحليل المتقدم، نستكشف كيف يغير هذا التكنولوجيا وجه القطاع المالي.',
      author: 'فاطمة حسن',
      date: '2024-01-08',
      category: 'technology',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
      readTime: '8 دقائق',
      views: 1120,
      likes: 78,
      featured: true
    },
    {
      id: 5,
      title: 'استراتيجيات النمو الرقمي للشركات الصغيرة',
      excerpt: 'نصائح واستراتيجيات عملية لمساعدة الشركات الصغيرة على النمو في العصر الرقمي.',
      content: 'النمو الرقمي أصبح ضرورة للشركات الصغيرة في العصر الحديث. نقدم استراتيجيات عملية ونصائح مفيدة لمساعدتك على تحقيق النمو المستدام.',
      author: 'خالد عبدالله',
      date: '2024-01-05',
      category: 'business',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
      readTime: '4 دقائق',
      views: 634,
      likes: 34,
      featured: false
    },
    {
      id: 6,
      title: 'مستقبل العمل عن بعد والتكنولوجيا',
      excerpt: 'كيف تشكل التكنولوجيا مستقبل العمل عن بعد وتغير طبيعة الوظائف.',
      content: 'العمل عن بعد أصبح واقعاً جديداً في عالم الأعمال. نستكشف كيف تشكل التكنولوجيا هذا التحول وتغير طبيعة الوظائف والشركات.',
      author: 'نورا محمد',
      date: '2024-01-03',
      category: 'innovation',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
      readTime: '5 دقائق',
      views: 892,
      likes: 56,
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
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
          title="المدونة"
          subtitle="أحدث الأخبار والمقالات في عالم التكنولوجيا والخدمات المالية"
          breadcrumbs={['الرئيسية', 'المدونة']}
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
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                مدونة
                <span className="text-blue-600"> PayPasss</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                اكتشف أحدث الأخبار والمقالات في عالم التكنولوجيا والخدمات المالية، 
                واحصل على رؤى قيمة لمساعدتك على النمو والابتكار
              </p>
            </motion.div>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="ابحث في المقالات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={activeCategory}
                      onChange={(e) => setActiveCategory(e.target.value)}
                      className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Posts */}
            {filteredPosts.filter(post => post.featured).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-16"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  المقالات المميزة
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {filteredPosts.filter(post => post.featured).map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                        {post.featured && (
                          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            مميز
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <FaCalendar className="text-blue-500" />
                            {new Date(post.date).toLocaleDateString('ar-SA')}
                          </div>
                          <div className="flex items-center gap-1">
                            <FaUser className="text-blue-500" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <FaEye className="text-blue-500" />
                            {post.views}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-300">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{post.readTime}</span>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => handleLike(post.id)}
                              className={`flex items-center gap-1 text-sm ${
                                likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-500'
                              } hover:text-red-500 transition-colors duration-300`}
                            >
                              <FaHeart className={likedPosts.has(post.id) ? 'fill-current' : ''} />
                              {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                            </button>
                            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-500 transition-colors duration-300">
                              <FaShare />
                              مشاركة
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* All Posts */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                جميع المقالات
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      {post.featured && (
                        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          مميز
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <FaCalendar className="text-blue-500" />
                          {new Date(post.date).toLocaleDateString('ar-SA')}
                        </div>
                        <div className="flex items-center gap-1">
                          <FaUser className="text-blue-500" />
                          {post.author}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{post.readTime}</span>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center gap-1 text-sm ${
                              likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-500'
                            } hover:text-red-500 transition-colors duration-300`}
                          >
                            <FaHeart className={likedPosts.has(post.id) ? 'fill-current' : ''} />
                            {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                          </button>
                          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-500 transition-colors duration-300">
                            <FaShare />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center"
            >
              <h3 className="text-2xl font-bold mb-4">
                اشترك في النشرة الإخبارية
              </h3>
              <p className="text-lg mb-6 opacity-90">
                احصل على أحدث المقالات والأخبار مباشرة في بريدك الإلكتروني
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  اشتراك
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog; 
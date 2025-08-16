const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://elhadad3593:NIqGTCLDJJFOFbtf@cluster0.3vqlnfg.mongodb.net/paypass?retryWrites=true&w=majority';

async function addRealPackages() {
  try {
    console.log('🔗 الاتصال بقاعدة البيانات...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ تم الاتصال بنجاح!');

    const db = mongoose.connection;

    // مسح الباقات الموجودة
    console.log('🧹 مسح الباقات الموجودة...');
    const packagesCollection = db.db.collection('packages');
    await packagesCollection.deleteMany({});
    console.log('✅ تم مسح الباقات الموجودة');

    // إنشاء الباقات الحقيقية
    console.log('\n📦 إنشاء الباقات الحقيقية...');

    const packages = [
      {
        name: 'الباقة الأساسية',
        description: 'الخيار المثالي لمن يبحث عن نظافة أساسية مع توفير إضافي!',
        basePrice: 150,
        originalPrice: 235,
        features: [
          '4 غسلات باستخدام صابون إيطالي فاخر عالي الجودة',
          'غسيل بطبقتين من الصابون لضمان نظافة عميقة ولمعان يدوم',
          'غسلة إضافية مجانية، ليصبح إجمالي الغسلات: 5',
          'إجمالي التوفير: 85 ريال سعودي',
          'متاحة في جميع المغاسل'
        ],
        popular: false,
        washes: 5,
        savings: 85,
        duration: 30,
        size: 'small',
        status: 'active',
        availableIn: 'all', // متاحة في جميع المغاسل
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'الباقة المتقدمة',
        description: 'الخيار العملي للنظافة المثالية بسعر تنافسي.',
        basePrice: 280,
        originalPrice: 420,
        features: [
          '8 غسلات باستخدام صابون إيطالي فاخر يمنح سيارتك العناية التي تستحقها',
          'غسيل بطبقتين من الصابون لضمان نظافة عميقة ولمعان يدوم',
          'غسلتان مجانيتان، ليصبح إجمالي الغسلات: 10',
          'إجمالي التوفير: 140 ريال سعودي',
          'متاحة في جميع المغاسل'
        ],
        popular: true,
        washes: 10,
        savings: 140,
        duration: 30,
        size: 'medium',
        status: 'active',
        availableIn: 'all', // متاحة في جميع المغاسل
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'الباقة الشاملة',
        description: 'الخيار الأمثل لمن يريد العناية القصوى بسياراته مع أكبر قدر من التوفير.',
        basePrice: 490,
        originalPrice: 770,
        features: [
          '14 غسلة باستخدام صابون إيطالي فاخر يوفر عناية فائقة بسيارتك',
          'غسيل بطبقتين من الصابون لضمان إزالة الأوساخ بفعالية وحماية طويلة الأمد',
          '4 غسلات مجانية، ليصبح إجمالي الغسلات: 18',
          'إجمالي التوفير: 280 ريال سعودي',
          'متاحة في جميع المغاسل'
        ],
        popular: false,
        washes: 18,
        savings: 280,
        duration: 30,
        size: 'large',
        status: 'active',
        availableIn: 'all', // متاحة في جميع المغاسل
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'الباقة VIP',
        description: 'الباقة المميزة للعملاء الأوفياء مع أفضل الخدمات والامتيازات.',
        basePrice: 150,
        originalPrice: 200,
        features: [
          'غسلة واحدة باستخدام أفضل أنواع الصابون الإيطالي الفاخر',
          'غسيل بثلاث طبقات من الصابون لضمان نظافة استثنائية',
          'خدمة VIP مع أولوية في الطوابير',
          'إجمالي التوفير: 50 ريال سعودي',
          'متاحة فقط في الفنادق'
        ],
        popular: false,
        washes: 1,
        savings: 50,
        duration: 7,
        size: 'large',
        status: 'active',
        availableIn: 'hotels', // متاحة فقط في الفنادق
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await packagesCollection.insertMany(packages);
    console.log('✅ تم إنشاء الباقات الحقيقية!');

    console.log('\n📦 === الباقات الحقيقية المضافة ===');
    console.log('='.repeat(50));

    packages.forEach((pkg, index) => {
      console.log(`${index + 1}. ${pkg.name}`);
      console.log(`   السعر: ${pkg.basePrice} ريال سعودي`);
      console.log(`   السعر الأصلي: ${pkg.originalPrice} ريال سعودي`);
      console.log(`   عدد الغسلات: ${pkg.washes}`);
      console.log(`   التوفير: ${pkg.savings} ريال سعودي`);
      console.log(`   المدة: ${pkg.duration} يوم`);
      console.log(`   متاحة في: ${pkg.availableIn === 'all' ? 'جميع المغاسل' : 'الفنادق فقط'}`);
      console.log('');
    });

    console.log('🎉 تم إضافة الباقات الحقيقية بنجاح!');

  } catch (error) {
    console.error('❌ خطأ في إضافة الباقات:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 تم قطع الاتصال');
  }
}

addRealPackages(); 
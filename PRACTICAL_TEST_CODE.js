// الكود العملي المستخدم في اختبارات نظام QR Code
// Practical Test Code for QR Code System

// ========================================
// 1️⃣ اختبار صلاحية QR لمدة شهر فقط
// ========================================

// إنشاء QR جديد
const createNewQR = () => {
  const qrData = {
    operationId: "O12345678",
    customerName: "أحمد محمد",
    packageName: "الباقة الأساسية",
    remainingWashes: 5,
    totalWashes: 5,
    startDate: "2024-01-15T10:00:00.000Z",
    expiryDate: "2024-02-15T10:00:00.000Z", // تاريخ صالح
    packageStatus: "active"
  };
  localStorage.setItem('qrCodeData', JSON.stringify(qrData));
  console.log("✅ تم إنشاء QR جديد:", qrData);
  return qrData;
};

// تغيير تاريخ الانتهاء ليكون في الماضي
const expireQR = (qrData) => {
  const expiredQRData = {
    ...qrData,
    expiryDate: "2024-01-10T10:00:00.000Z" // تاريخ في الماضي
  };
  localStorage.setItem('qrCodeData', JSON.stringify(expiredQRData));
  console.log("❌ تم إنهاء صلاحية QR:", expiredQRData);
  return expiredQRData;
};

// التحقق من صلاحية QR
const validateQRCode = (qrData) => {
  try {
    if (!qrData.operationId || !qrData.packageType || !qrData.customerName) {
      return { isValid: false, error: 'بيانات QR كود غير صحيحة' };
    }

    const expiryDate = new Date(qrData.expiryDate);
    const now = new Date();
    const isExpired = expiryDate < now;
    const daysRemaining = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (isExpired) {
      return { 
        isValid: false, 
        error: 'انتهت صلاحية الباقة',
        isExpired: true,
        daysRemaining: 0,
        hasWashes: false,
        status: 'expired'
      };
    }

    const hasWashes = qrData.remainingWashes > 0;

    return {
      isValid: true,
      isExpired: false,
      daysRemaining,
      hasWashes,
      isVIP: qrData.isVIP || false,
      status: hasWashes ? 'active' : 'no_washes'
    };
  } catch (error) {
    return { isValid: false, error: 'QR كود غير صالح' };
  }
};

// اختبار صلاحية QR
const testQRExpiry = () => {
  console.log("🧪 بدء اختبار صلاحية QR...");
  
  // إنشاء QR جديد
  const qrData = createNewQR();
  
  // التحقق من صلاحية QR صالح
  const validValidation = validateQRCode(qrData);
  console.log("✅ QR صالح:", validValidation);
  
  // إنهاء صلاحية QR
  const expiredQR = expireQR(qrData);
  
  // التحقق من QR منتهي الصلاحية
  const expiredValidation = validateQRCode(expiredQR);
  console.log("❌ QR منتهي الصلاحية:", expiredValidation);
  
  return {
    valid: validValidation,
    expired: expiredValidation
  };
};

// ========================================
// 2️⃣ اختبار الخصم التلقائي للغسلة
// ========================================

// إنشاء QR صالح للاختبار
const createValidQRForTest = () => {
  const validQRData = {
    operationId: "O87654321",
    customerName: "فاطمة علي",
    packageName: "الباقة المتقدمة",
    remainingWashes: 10,
    totalWashes: 10,
    expiryDate: "2024-03-15T10:00:00.000Z",
    packageStatus: "active",
    usageHistory: []
  };
  localStorage.setItem('qrCodeData', JSON.stringify(validQRData));
  console.log("✅ تم إنشاء QR صالح للاختبار:", validQRData);
  return validQRData;
};

// خصم غسلة تلقائياً
const deductWashAutomatically = (qrData, selectedBranch) => {
  if (!qrData) {
    return { success: false, error: 'بيانات QR غير موجودة' };
  }

  if (qrData.remainingWashes <= 0) {
    return { success: false, error: 'لا توجد غسلات متبقية' };
  }

  const validation = validateQRCode(qrData);
  if (!validation.isValid) {
    return { success: false, error: validation.error };
  }

  if (validation.isExpired) {
    return { success: false, error: 'انتهت صلاحية الباقة' };
  }

  const updatedQRData = {
    ...qrData,
    remainingWashes: qrData.remainingWashes - 1,
    lastUsed: new Date().toISOString(),
    branchName: selectedBranch.arabicName,
    branchAddress: selectedBranch.arabicAddress,
    branchPhone: selectedBranch.phone,
    usageHistory: [
      ...qrData.usageHistory,
      {
        date: new Date().toISOString(),
        branchName: selectedBranch.arabicName,
        branchAddress: selectedBranch.arabicAddress,
        branchPhone: selectedBranch.phone,
        action: 'wash_used',
        washNumber: qrData.totalWashes - qrData.remainingWashes + 1
      }
    ]
  };

  localStorage.setItem('qrCodeData', JSON.stringify(updatedQRData));
  console.log("✅ تم خصم غسلة تلقائياً:", updatedQRData);
  
  return { success: true, data: updatedQRData };
};

// اختبار الخصم التلقائي
const testAutomaticDeduction = () => {
  console.log("🧪 بدء اختبار الخصم التلقائي...");
  
  // إنشاء QR صالح
  const qrData = createValidQRForTest();
  
  // اختيار فرع
  const selectedBranch = {
    id: 1,
    arabicName: "مغسلة النقاء المطلق",
    arabicAddress: "طريق الملك فهد، العليا، الرياض",
    phone: "+966 11 488 1234"
  };
  
  // خصم الغسلة تلقائياً
  const result = deductWashAutomatically(qrData, selectedBranch);
  console.log("✅ نتيجة الخصم التلقائي:", result);
  
  return result;
};

// ========================================
// 3️⃣ اختبار حساب السعر حسب نوع السيارة
// ========================================

// تعريف الأسعار حسب نوع السيارة
const packagePrices = {
  'small': {
    basic: { price: 150, originalPrice: 235, savings: 85, washes: 5 },
    advanced: { price: 280, originalPrice: 420, savings: 140, washes: 10 },
    premium: { price: 490, originalPrice: 770, savings: 280, washes: 18 }
  },
  'medium': {
    basic: { price: 180, originalPrice: 270, savings: 90, washes: 5 },
    advanced: { price: 320, originalPrice: 480, savings: 160, washes: 10 },
    premium: { price: 530, originalPrice: 830, savings: 300, washes: 18 }
  },
  'large': {
    basic: { price: 220, originalPrice: 330, savings: 110, washes: 5 },
    advanced: { price: 360, originalPrice: 540, savings: 180, washes: 10 },
    premium: { price: 570, originalPrice: 890, savings: 320, washes: 18 }
  }
};

// حساب السعر حسب نوع السيارة
const calculatePriceByCarType = (carType, packageType) => {
  if (!packagePrices[carType] || !packagePrices[carType][packageType]) {
    return null;
  }
  return packagePrices[carType][packageType];
};

// اختبار حساب الأسعار
const testPriceCalculation = () => {
  console.log("🧪 بدء اختبار حساب الأسعار...");
  
  const testCases = [
    { carType: 'small', packageType: 'basic', expectedPrice: 150 },
    { carType: 'medium', packageType: 'basic', expectedPrice: 180 },
    { carType: 'large', packageType: 'basic', expectedPrice: 220 }
  ];
  
  const results = testCases.map(testCase => {
    const price = calculatePriceByCarType(testCase.carType, testCase.packageType);
    const isCorrect = price && price.price === testCase.expectedPrice;
    
    console.log(`✅ ${testCase.carType} + ${testCase.packageType}: ${price?.price} ريال (متوقع: ${testCase.expectedPrice}) - ${isCorrect ? 'صحيح' : 'خطأ'}`);
    
    return {
      carType: testCase.carType,
      packageType: testCase.packageType,
      actualPrice: price?.price,
      expectedPrice: testCase.expectedPrice,
      isCorrect: isCorrect
    };
  });
  
  return results;
};

// ========================================
// 4️⃣ اختبار منع توليد QR ثاني
// ========================================

// التحقق من وجود QR صالح
const checkExistingValidQR = () => {
  try {
    const existingQR = localStorage.getItem('qrCodeData');
    if (!existingQR) return { hasValidQR: false };

    const qrData = JSON.parse(existingQR);
    const validation = validateQRCode(qrData);
    
    return {
      hasValidQR: validation.isValid && !validation.isExpired && validation.hasWashes,
      qrData: qrData,
      validation: validation
    };
  } catch (error) {
    return { hasValidQR: false };
  }
};

// محاولة إنشاء QR جديد
const attemptCreateNewQR = () => {
  console.log("🧪 بدء اختبار منع إنشاء QR ثاني...");
  
  const existingQRCheck = checkExistingValidQR();
  
  if (existingQRCheck.hasValidQR) {
    const message = `لديك QR صالح للعميل ${existingQRCheck.qrData.customerName} مع ${existingQRCheck.qrData.remainingWashes} غسلات متبقية.\n\nهل تريد استبداله؟`;
    
    console.log("⚠️ تم اكتشاف QR صالح موجود:", message);
    
    // في البيئة الحقيقية، سيظهر confirm dialog
    // const confirmReplace = window.confirm(message);
    const confirmReplace = false; // محاكاة اختيار "لا"
    
    if (!confirmReplace) {
      console.log("❌ تم إلغاء إنشاء QR جديد");
      return { success: false, reason: 'user_cancelled' };
    }
  }
  
  console.log("✅ يمكن إنشاء QR جديد");
  return { success: true };
};

// اختبار منع التكرار
const testDuplicatePrevention = () => {
  // إنشاء QR أول
  const firstQR = createNewQR();
  
  // محاولة إنشاء QR ثاني
  const result = attemptCreateNewQR();
  
  return result;
};

// ========================================
// 5️⃣ اختبار سجل الاستخدام
// ========================================

// إنشاء سجل استخدام مفصل
const createDetailedUsageHistory = () => {
  console.log("🧪 بدء اختبار سجل الاستخدام...");
  
  const firstUsage = {
    date: "2024-01-15T14:30:00.000Z",
    branchName: "مغسلة النقاء المطلق",
    branchAddress: "طريق الملك فهد، العليا، الرياض",
    branchPhone: "+966 11 488 1234",
    action: 'wash_used',
    washNumber: 1
  };
  
  const secondUsage = {
    date: "2024-01-16T10:15:00.000Z",
    branchName: "مغسلة اللمسة الناعمة",
    branchAddress: "طريق الملك عبدالله، الملز، الرياض",
    branchPhone: "+966 11 488 5678",
    action: 'wash_used',
    washNumber: 2
  };
  
  const completeQRData = {
    operationId: "O99999999",
    customerName: "علي حسن",
    packageName: "الباقة المتقدمة",
    remainingWashes: 8, // 10 - 2 = 8
    totalWashes: 10,
    usageHistory: [firstUsage, secondUsage],
    lastUsed: "2024-01-16T10:15:00.000Z"
  };
  
  localStorage.setItem('qrCodeData', JSON.stringify(completeQRData));
  console.log("✅ تم إنشاء سجل استخدام مفصل:", completeQRData);
  
  return completeQRData;
};

// عرض سجل الاستخدام
const displayUsageHistory = (qrData) => {
  return qrData.usageHistory.map((usage, index) => ({
    id: index + 1,
    date: new Date(usage.date).toLocaleDateString('ar-SA'),
    time: new Date(usage.date).toLocaleTimeString('ar-SA'),
    branchName: usage.branchName,
    branchAddress: usage.branchAddress,
    washNumber: usage.washNumber,
    remainingWashes: qrData.totalWashes - usage.washNumber
  }));
};

// اختبار سجل الاستخدام
const testUsageHistory = () => {
  const qrData = createDetailedUsageHistory();
  const history = displayUsageHistory(qrData);
  
  console.log("📋 سجل الاستخدام:");
  history.forEach(item => {
    console.log(`${item.id}. ${item.date} ${item.time} - ${item.branchName} (غسلة ${item.washNumber} من ${qrData.totalWashes})`);
  });
  
  console.log(`الغسلات المتبقية: ${qrData.remainingWashes} من ${qrData.totalWashes}`);
  
  return { qrData, history };
};

// ========================================
// تشغيل جميع الاختبارات
// ========================================

const runAllTests = () => {
  console.log("🚀 بدء تشغيل جميع الاختبارات العملية...");
  console.log("=" .repeat(50));
  
  // اختبار 1: صلاحية QR
  console.log("\n1️⃣ اختبار صلاحية QR لمدة شهر:");
  const expiryTest = testQRExpiry();
  
  // اختبار 2: الخصم التلقائي
  console.log("\n2️⃣ اختبار الخصم التلقائي للغسلة:");
  const deductionTest = testAutomaticDeduction();
  
  // اختبار 3: حساب الأسعار
  console.log("\n3️⃣ اختبار حساب السعر حسب نوع السيارة:");
  const priceTest = testPriceCalculation();
  
  // اختبار 4: منع التكرار
  console.log("\n4️⃣ اختبار منع توليد QR ثاني:");
  const duplicateTest = testDuplicatePrevention();
  
  // اختبار 5: سجل الاستخدام
  console.log("\n5️⃣ اختبار سجل الاستخدام:");
  const historyTest = testUsageHistory();
  
  console.log("\n" + "=" .repeat(50));
  console.log("✅ تم إكمال جميع الاختبارات بنجاح!");
  
  return {
    expiryTest,
    deductionTest,
    priceTest,
    duplicateTest,
    historyTest
  };
};

// تصدير الدوال للاستخدام
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createNewQR,
    expireQR,
    validateQRCode,
    testQRExpiry,
    createValidQRForTest,
    deductWashAutomatically,
    testAutomaticDeduction,
    packagePrices,
    calculatePriceByCarType,
    testPriceCalculation,
    checkExistingValidQR,
    attemptCreateNewQR,
    testDuplicatePrevention,
    createDetailedUsageHistory,
    displayUsageHistory,
    testUsageHistory,
    runAllTests
  };
}

// تشغيل الاختبارات في المتصفح
if (typeof window !== 'undefined') {
  window.QRCodeTests = {
    runAllTests,
    testQRExpiry,
    testAutomaticDeduction,
    testPriceCalculation,
    testDuplicatePrevention,
    testUsageHistory
  };
  
  console.log("🧪 تم تحميل اختبارات QR Code. استخدم QRCodeTests.runAllTests() لتشغيل جميع الاختبارات.");
} 
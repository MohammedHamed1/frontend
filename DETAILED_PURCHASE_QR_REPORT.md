# 📋 تقرير تفصيلي: عملية شراء الباقة وإنشاء QR Code

## 🎯 نظرة عامة على العملية

هذا التقرير يوضح بالتفصيل الكامل عملية شراء العميل للباقة من البداية حتى انتهاء صلاحية QR Code، مع شرح كل خطوة والوظائف التقنية المرتبطة بها.

---

## 🛒 المرحلة الأولى: اختيار الباقة

### 1.1 عرض الباقات المتاحة

#### المكون المسؤول: `PackagesSection.jsx`

```javascript
// عرض الباقات مع الأسعار حسب حجم السيارة
const packages = [
  {
    id: 'basic',
    name: 'الباقة الأساسية',
    description: 'الخيار المثالي لمن يبحث عن نظافة أساسية مع توفير إضافي!',
    features: [
      '4 غسلات باستخدام صابون إيطالي فاخر عالي الجودة',
      'غسيل بطبقتين من الصابون لضمان نظافة عميقة ولمعان يدوم',
      'غسلة إضافية مجانية، ليصبح إجمالي الغسلات: 5',
      'إجمالي التوفير: 85 ريال سعودي',
      'متاحة في جميع المغاسل'
    ],
    popular: false,
    duration: 30, // أيام
    availableIn: 'all'
  },
  // ... باقي الباقات
];
```

#### الأسعار حسب حجم السيارة:
```javascript
const packagePrices = {
  'small': {
    basic: { price: 150, originalPrice: 235, savings: 85, washes: 5 },
    advanced: { price: 280, originalPrice: 420, savings: 140, washes: 10 },
    comprehensive: { price: 490, originalPrice: 770, savings: 280, washes: 18 },
    vip: { price: 150, originalPrice: 200, savings: 50, washes: 1 }
  },
  'medium': {
    basic: { price: 200, originalPrice: 300, savings: 100, washes: 5 },
    advanced: { price: 370, originalPrice: 555, savings: 185, washes: 10 },
    comprehensive: { price: 650, originalPrice: 975, savings: 325, washes: 18 },
    vip: { price: 150, originalPrice: 200, savings: 50, washes: 1 } // ثابت
  },
  'large': {
    basic: { price: 250, originalPrice: 375, savings: 125, washes: 5 },
    advanced: { price: 470, originalPrice: 705, savings: 235, washes: 10 },
    comprehensive: { price: 820, originalPrice: 1230, savings: 410, washes: 18 },
    vip: { price: 150, originalPrice: 200, savings: 50, washes: 1 } // ثابت
  }
};
```

### 1.2 اختيار حجم السيارة

#### المكون المسؤول: `CarSizeSelector.jsx`

```javascript
const carSizes = [
  {
    id: 'small',
    name: 'سيارة صغيرة',
    description: 'سيدان، هاتشباك',
    examples: ['تويوتا ياريس', 'هوندا سيفيك', 'نيسان سنترا', 'هيونداي أكسنت'],
    basePrice: 30,
    multiplier: 1.0,
    icon: '🚗'
  },
  {
    id: 'medium',
    name: 'سيارة متوسطة',
    description: 'SUV، كروس أوفر',
    examples: ['تويوتا كامري', 'هوندا أكورد', 'نيسان ألتيما', 'هيونداي سوناتا'],
    basePrice: 40,
    multiplier: 1.33,
    icon: '🚙'
  },
  {
    id: 'large',
    name: 'سيارة كبيرة',
    description: 'فان، بيك أب',
    examples: ['تويوتا لاند كروزر', 'نيسان باترول', 'شيفروليه تاهو', 'فورد إكسبيديشن'],
    basePrice: 50,
    multiplier: 1.67,
    icon: '🚐'
  }
];
```

### 1.3 حساب السعر النهائي

#### الوظيفة المسؤولة: `calculateFinalPrice()`

```javascript
const calculateFinalPrice = (packageType, carSize) => {
  const basePrice = packagePrices[carSize][packageType].price;
  const originalPrice = packagePrices[carSize][packageType].originalPrice;
  const savings = packagePrices[carSize][packageType].savings;
  const washes = packagePrices[carSize][packageType].washes;
  
  return {
    finalPrice: basePrice,
    originalPrice: originalPrice,
    savings: savings,
    washes: washes,
    pricePerWash: Math.round(basePrice / washes)
  };
};
```

---

## 💳 المرحلة الثانية: عملية الدفع

### 2.1 اختيار طريقة الدفع

#### المكون المسؤول: `PaymentMethods.jsx`

```javascript
const paymentMethods = [
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    icon: '🍎',
    description: 'دفع سريع وآمن عبر Apple Pay',
    available: true
  },
  {
    id: 'credit-card',
    name: 'البطاقة الائتمانية',
    icon: '💳',
    description: 'فيزا، ماستركارد، أمريكان إكسبريس',
    available: true
  },
  {
    id: 'mada',
    name: 'مدى',
    icon: '🏦',
    description: 'بطاقة مدى السعودية',
    available: true
  },
  {
    id: 'stc-pay',
    name: 'STC Pay',
    icon: '📱',
    description: 'محفظة STC الإلكترونية',
    available: true
  }
];
```

### 2.2 معالجة الدفع

#### المكون المسؤول: `Payment.jsx`

```javascript
const processPayment = async (paymentData) => {
  try {
    // 1. التحقق من صحة بيانات الدفع
    const validation = validatePaymentData(paymentData);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    // 2. إنشاء طلب الدفع في قاعدة البيانات
    const paymentResponse = await paymentAPI.create({
      amount: paymentData.amount,
      currency: 'SAR',
      method: paymentData.method,
      packageId: paymentData.packageId,
      carSize: paymentData.carSize,
      userId: paymentData.userId,
      status: 'pending'
    });

    // 3. معالجة الدفع مع البوابة المالية
    const gatewayResponse = await processWithGateway(paymentData);
    
    // 4. تحديث حالة الدفع
    await paymentAPI.update(paymentResponse.id, {
      status: gatewayResponse.success ? 'completed' : 'failed',
      transactionId: gatewayResponse.transactionId,
      gatewayResponse: gatewayResponse
    });

    return {
      success: gatewayResponse.success,
      paymentId: paymentResponse.id,
      transactionId: gatewayResponse.transactionId
    };

  } catch (error) {
    console.error('خطأ في معالجة الدفع:', error);
    throw error;
  }
};
```

### 2.3 إنشاء الطلب

#### المكون المسؤول: `CheckoutFlow.jsx`

```javascript
const createOrder = async (orderData) => {
  try {
    // 1. إنشاء الطلب
    const orderResponse = await orderAPI.create({
      userId: orderData.userId,
      packageId: orderData.packageId,
      carSize: orderData.carSize,
      paymentId: orderData.paymentId,
      totalAmount: orderData.totalAmount,
      washes: orderData.washes,
      status: 'confirmed',
      startDate: new Date(),
      expiryDate: calculateExpiryDate(orderData.duration)
    });

    // 2. إنشاء رمز QR
    const qrCode = await generateQRCode(orderResponse);

    // 3. إرسال إشعار تأكيد
    await sendConfirmationNotification(orderData.userId, orderResponse);

    return {
      orderId: orderResponse.id,
      qrCode: qrCode,
      success: true
    };

  } catch (error) {
    console.error('خطأ في إنشاء الطلب:', error);
    throw error;
  }
};
```

---

## 🔍 المرحلة الثالثة: إنشاء QR Code

### 3.1 بنية بيانات QR Code

#### المكون المسؤول: `AdvancedQRSystem.jsx`

```javascript
const generateQRData = (orderData) => {
  const now = new Date();
  const expiryDate = new Date(now.getTime() + (orderData.duration * 24 * 60 * 60 * 1000));
  
  const qrDataObject = {
    // معلومات العميل
    operationId: `O${Math.random().toString().substr(2, 8)}`,
    customerId: orderData.userId,
    customerName: orderData.customerName,
    customerPhone: orderData.customerPhone,
    
    // معلومات الباقة
    packageType: orderData.packageType,
    packageName: orderData.packageName,
    packageId: orderData.packageId,
    
    // معلومات السيارة
    carType: orderData.carType,
    carSize: orderData.carSize,
    
    // معلومات الغسلات
    remainingWashes: orderData.washes,
    totalWashes: orderData.washes,
    usedWashes: 0,
    
    // معلومات السعر
    price: orderData.price,
    originalPrice: orderData.originalPrice,
    savings: orderData.savings,
    
    // معلومات الفرع
    branchName: orderData.branchName || 'أي فرع',
    branchId: orderData.branchId || 'ALL',
    
    // معلومات التواريخ
    startDate: now.toISOString(),
    expiryDate: expiryDate.toISOString(),
    purchaseDate: now.toISOString(),
    
    // حالة الباقة
    packageStatus: 'active',
    lastUsed: null,
    
    // سجل الاستخدام
    usageHistory: [],
    
    // معلومات إضافية
    availableIn: orderData.availableIn, // 'all' أو 'hotels'
    features: orderData.features,
    
    // معلومات الأمان
    securityHash: generateSecurityHash(orderData),
    version: '1.0'
  };

  return qrDataObject;
};
```

### 3.2 إنشاء رمز QR

#### الوظيفة المسؤولة: `generateQRCode()`

```javascript
const generateQRCode = async (orderData) => {
  try {
    // 1. إنشاء بيانات QR
    const qrData = generateQRData(orderData);
    
    // 2. تشفير البيانات
    const encryptedData = encryptQRData(qrData);
    
    // 3. إنشاء رمز QR
    const qrCodeString = JSON.stringify(encryptedData);
    
    // 4. حفظ في قاعدة البيانات
    await qrAPI.create({
      orderId: orderData.orderId,
      qrData: qrData,
      encryptedData: encryptedData,
      status: 'active',
      createdAt: new Date()
    });

    // 5. إرسال إشعار إنشاء QR
    await sendQRCreatedNotification(orderData.userId, qrData);

    return {
      qrCode: qrCodeString,
      qrData: qrData,
      downloadUrl: generateDownloadURL(qrCodeString),
      shareUrl: generateShareURL(qrCodeString)
    };

  } catch (error) {
    console.error('خطأ في إنشاء رمز QR:', error);
    throw error;
  }
};
```

### 3.3 تشفير بيانات QR

#### الوظيفة المسؤولة: `encryptQRData()`

```javascript
const encryptQRData = (data) => {
  const secretKey = process.env.QR_ENCRYPTION_KEY;
  const algorithm = 'aes-256-cbc';
  
  // إنشاء vector عشوائي
  const iv = crypto.randomBytes(16);
  
  // إنشاء cipher
  const cipher = crypto.createCipher(algorithm, secretKey);
  
  // تشفير البيانات
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return {
    encrypted: encrypted,
    iv: iv.toString('hex'),
    algorithm: algorithm,
    timestamp: new Date().toISOString()
  };
};
```

---

## 📱 المرحلة الرابعة: عرض QR Code

### 4.1 واجهة عرض QR Code

#### المكون المسؤول: `QRCodeDisplay.jsx`

```javascript
const QRCodeDisplay = ({ qrData }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const downloadQR = async () => {
    setIsDownloading(true);
    try {
      const canvas = document.querySelector('#qr-canvas');
      const link = document.createElement('a');
      link.download = `paypass-qr-${qrData.operationId}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('خطأ في تحميل QR:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const shareQR = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'باقة PayPass',
          text: `باقة ${qrData.packageName} - ${qrData.remainingWashes} غسلات متبقية`,
          url: qrData.shareUrl
        });
      } else {
        await navigator.clipboard.writeText(qrData.shareUrl);
        alert('تم نسخ الرابط!');
      }
    } catch (error) {
      console.error('خطأ في مشاركة QR:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="qr-code-display">
      {/* عرض رمز QR */}
      <div className="qr-code-container">
        <QRCodeSVG
          value={JSON.stringify(qrData)}
          size={300}
          level="H"
          includeMargin={true}
        />
      </div>

      {/* معلومات الباقة */}
      <div className="package-info">
        <h3>{qrData.packageName}</h3>
        <p>الغسلات المتبقية: {qrData.remainingWashes}/{qrData.totalWashes}</p>
        <p>تاريخ الانتهاء: {formatDate(qrData.expiryDate)}</p>
        <p>متاح في: {qrData.availableIn === 'all' ? 'جميع المغاسل' : 'الفنادق فقط'}</p>
      </div>

      {/* أزرار التحكم */}
      <div className="qr-actions">
        <button onClick={downloadQR} disabled={isDownloading}>
          {isDownloading ? 'جاري التحميل...' : 'تحميل QR'}
        </button>
        <button onClick={shareQR} disabled={isSharing}>
          {isSharing ? 'جاري المشاركة...' : 'مشاركة'}
        </button>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
        </button>
      </div>

      {/* التفاصيل الكاملة */}
      {showDetails && (
        <div className="qr-details">
          <h4>تفاصيل الباقة</h4>
          <ul>
            <li>رقم العملية: {qrData.operationId}</li>
            <li>اسم العميل: {qrData.customerName}</li>
            <li>نوع السيارة: {qrData.carType}</li>
            <li>حجم السيارة: {qrData.carSize}</li>
            <li>السعر: {qrData.price} ريال</li>
            <li>التوفير: {qrData.savings} ريال</li>
            <li>تاريخ الشراء: {formatDate(qrData.purchaseDate)}</li>
            <li>تاريخ الانتهاء: {formatDate(qrData.expiryDate)}</li>
          </ul>
        </div>
      )}
    </div>
  );
};
```

---

## 🔍 المرحلة الخامسة: استخدام QR Code

### 5.1 مسح QR Code

#### المكون المسؤول: `QRCodeScanner.jsx`

```javascript
const QRCodeScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);

  const startScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
        setError(null);
      }
    } catch (err) {
      setError('لا يمكن الوصول للكاميرا');
      console.error('Camera error:', err);
    }
  };

  const processQRCode = (qrText) => {
    try {
      // 1. فك تشفير البيانات
      const decryptedData = decryptQRData(qrText);
      
      // 2. التحقق من صحة البيانات
      const validation = validateQRCode(decryptedData);
      
      if (!validation.isValid) {
        setError(validation.error);
        return;
      }

      // 3. التحقق من الصلاحية
      const expiryCheck = checkExpiry(decryptedData);
      if (expiryCheck.isExpired) {
        setError('الباقة منتهية الصلاحية');
        return;
      }

      // 4. التحقق من الغسلات المتبقية
      if (decryptedData.remainingWashes <= 0) {
        setError('لا توجد غسلات متبقية');
        return;
      }

      setScannedData(decryptedData);
      stopScanner();

    } catch (error) {
      setError('رمز QR غير صحيح');
      console.error('QR processing error:', error);
    }
  };

  return (
    <div className="qr-scanner">
      <video ref={videoRef} autoPlay playsInline />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {scannedData && (
        <div className="scanned-data">
          <h3>تم مسح الباقة بنجاح!</h3>
          <p>الباقة: {scannedData.packageName}</p>
          <p>الغسلات المتبقية: {scannedData.remainingWashes}</p>
          <p>تاريخ الانتهاء: {formatDate(scannedData.expiryDate)}</p>
          <button onClick={() => useWash(scannedData)}>
            استخدام غسلة
          </button>
        </div>
      )}
    </div>
  );
};
```

### 5.2 التحقق من صحة QR Code

#### الوظيفة المسؤولة: `validateQRCode()`

```javascript
const validateQRCode = (qrData) => {
  // 1. التحقق من وجود البيانات المطلوبة
  const requiredFields = [
    'operationId', 'customerId', 'packageId', 
    'remainingWashes', 'expiryDate', 'securityHash'
  ];
  
  for (const field of requiredFields) {
    if (!qrData[field]) {
      return {
        isValid: false,
        error: `حقل ${field} مفقود`
      };
    }
  }

  // 2. التحقق من صحة hash الأمان
  const calculatedHash = generateSecurityHash(qrData);
  if (calculatedHash !== qrData.securityHash) {
    return {
      isValid: false,
      error: 'رمز QR تم تعديله'
    };
  }

  // 3. التحقق من تاريخ الانتهاء
  const now = new Date();
  const expiryDate = new Date(qrData.expiryDate);
  
  if (now > expiryDate) {
    return {
      isValid: false,
      error: 'الباقة منتهية الصلاحية',
      isExpired: true
    };
  }

  // 4. التحقق من عدد الغسلات
  if (qrData.remainingWashes <= 0) {
    return {
      isValid: false,
      error: 'لا توجد غسلات متبقية',
      noWashesLeft: true
    };
  }

  // 5. التحقق من حالة الباقة
  if (qrData.packageStatus !== 'active') {
    return {
      isValid: false,
      error: 'الباقة غير نشطة'
    };
  }

  return {
    isValid: true,
    daysRemaining: Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24)),
    washesRemaining: qrData.remainingWashes
  };
};
```

### 5.3 استخدام الغسلة

#### الوظيفة المسؤولة: `useWash()`

```javascript
const useWash = async (qrData) => {
  try {
    // 1. التحقق من صحة البيانات مرة أخرى
    const validation = validateQRCode(qrData);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    // 2. تحديث عدد الغسلات المتبقية
    const updatedQRData = {
      ...qrData,
      remainingWashes: qrData.remainingWashes - 1,
      lastUsed: new Date().toISOString(),
      usageHistory: [
        ...qrData.usageHistory,
        {
          date: new Date().toISOString(),
          branchId: getCurrentBranchId(),
          branchName: getCurrentBranchName(),
          washNumber: qrData.totalWashes - qrData.remainingWashes + 1
        }
      ]
    };

    // 3. حفظ التحديث في قاعدة البيانات
    await qrAPI.update(qrData.operationId, updatedQRData);

    // 4. إنشاء سجل الاستخدام
    await createUsageRecord({
      operationId: qrData.operationId,
      customerId: qrData.customerId,
      packageId: qrData.packageId,
      branchId: getCurrentBranchId(),
      washNumber: qrData.totalWashes - qrData.remainingWashes + 1,
      usedAt: new Date()
    });

    // 5. إرسال إشعار الاستخدام
    await sendUsageNotification(qrData.customerId, updatedQRData);

    // 6. التحقق من انتهاء الباقة
    if (updatedQRData.remainingWashes === 0) {
      await markPackageAsCompleted(qrData.operationId);
      await sendPackageCompletedNotification(qrData.customerId, qrData);
    }

    return {
      success: true,
      remainingWashes: updatedQRData.remainingWashes,
      message: 'تم استخدام الغسلة بنجاح!'
    };

  } catch (error) {
    console.error('خطأ في استخدام الغسلة:', error);
    throw error;
  }
};
```

---

## ⏰ المرحلة السادسة: إدارة الصلاحية

### 6.1 حساب الأيام المتبقية

#### الوظيفة المسؤولة: `calculateDaysRemaining()`

```javascript
const calculateDaysRemaining = (expiryDate) => {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return {
    daysRemaining: diffDays,
    isExpired: diffDays <= 0,
    isLowDays: diffDays <= 7 && diffDays > 0,
    hoursRemaining: Math.ceil(diffTime / (1000 * 60 * 60)),
    minutesRemaining: Math.ceil(diffTime / (1000 * 60))
  };
};
```

### 6.2 إشعارات الصلاحية

#### الوظيفة المسؤولة: `sendExpiryNotifications()`

```javascript
const sendExpiryNotifications = async (qrData) => {
  const expiryInfo = calculateDaysRemaining(qrData.expiryDate);
  
  // إشعار عند انتهاء الصلاحية
  if (expiryInfo.isExpired) {
    await sendNotification(qrData.customerId, {
      type: 'expiry',
      title: 'انتهت صلاحية الباقة',
      message: `انتهت صلاحية باقة ${qrData.packageName}`,
      data: {
        operationId: qrData.operationId,
        packageName: qrData.packageName,
        remainingWashes: qrData.remainingWashes
      }
    });
  }
  
  // إشعار قبل انتهاء الصلاحية بـ 7 أيام
  else if (expiryInfo.isLowDays) {
    await sendNotification(qrData.customerId, {
      type: 'expiry_warning',
      title: 'تنبيه انتهاء الصلاحية',
      message: `تبقى ${expiryInfo.daysRemaining} أيام على انتهاء صلاحية باقة ${qrData.packageName}`,
      data: {
        operationId: qrData.operationId,
        packageName: qrData.packageName,
        daysRemaining: expiryInfo.daysRemaining,
        remainingWashes: qrData.remainingWashes
      }
    });
  }
  
  // إشعار قبل انتهاء الصلاحية بـ 3 أيام
  else if (expiryInfo.daysRemaining <= 3) {
    await sendNotification(qrData.customerId, {
      type: 'expiry_urgent',
      title: 'تنبيه عاجل',
      message: `تبقى ${expiryInfo.daysRemaining} أيام فقط على انتهاء صلاحية باقة ${qrData.packageName}`,
      data: {
        operationId: qrData.operationId,
        packageName: qrData.packageName,
        daysRemaining: expiryInfo.daysRemaining,
        remainingWashes: qrData.remainingWashes
      }
    });
  }
};
```

### 6.3 تمديد الصلاحية

#### الوظيفة المسؤولة: `extendExpiry()`

```javascript
const extendExpiry = async (operationId, extensionDays) => {
  try {
    // 1. جلب بيانات QR
    const qrData = await qrAPI.getByOperationId(operationId);
    
    if (!qrData) {
      throw new Error('QR Code غير موجود');
    }

    // 2. حساب التاريخ الجديد
    const currentExpiry = new Date(qrData.expiryDate);
    const newExpiry = new Date(currentExpiry.getTime() + (extensionDays * 24 * 60 * 60 * 1000));
    
    // 3. تحديث تاريخ الانتهاء
    const updatedQRData = {
      ...qrData,
      expiryDate: newExpiry.toISOString(),
      extensionHistory: [
        ...qrData.extensionHistory,
        {
          date: new Date().toISOString(),
          extensionDays: extensionDays,
          oldExpiry: qrData.expiryDate,
          newExpiry: newExpiry.toISOString()
        }
      ]
    };

    // 4. حفظ التحديث
    await qrAPI.update(operationId, updatedQRData);

    // 5. إرسال إشعار التمديد
    await sendNotification(qrData.customerId, {
      type: 'extension',
      title: 'تم تمديد صلاحية الباقة',
      message: `تم تمديد صلاحية باقة ${qrData.packageName} لمدة ${extensionDays} أيام`,
      data: {
        operationId: operationId,
        packageName: qrData.packageName,
        newExpiry: newExpiry.toISOString(),
        extensionDays: extensionDays
      }
    });

    return {
      success: true,
      newExpiry: newExpiry.toISOString(),
      daysRemaining: calculateDaysRemaining(newExpiry.toISOString()).daysRemaining
    };

  } catch (error) {
    console.error('خطأ في تمديد الصلاحية:', error);
    throw error;
  }
};
```

---

## 📊 المرحلة السابعة: التقارير والإحصائيات

### 7.1 تقرير استخدام الباقة

#### الوظيفة المسؤولة: `generateUsageReport()`

```javascript
const generateUsageReport = async (operationId) => {
  try {
    // 1. جلب بيانات QR
    const qrData = await qrAPI.getByOperationId(operationId);
    
    // 2. جلب سجل الاستخدام
    const usageHistory = await getUsageHistory(operationId);
    
    // 3. حساب الإحصائيات
    const stats = {
      totalWashes: qrData.totalWashes,
      usedWashes: qrData.totalWashes - qrData.remainingWashes,
      remainingWashes: qrData.remainingWashes,
      usagePercentage: ((qrData.totalWashes - qrData.remainingWashes) / qrData.totalWashes) * 100,
      averageWashesPerDay: calculateAverageWashesPerDay(usageHistory),
      mostUsedBranch: findMostUsedBranch(usageHistory),
      lastUsed: qrData.lastUsed,
      daysSincePurchase: calculateDaysSince(qrData.purchaseDate),
      daysUntilExpiry: calculateDaysRemaining(qrData.expiryDate).daysRemaining
    };

    // 4. إنشاء التقرير
    const report = {
      operationId: operationId,
      packageName: qrData.packageName,
      customerName: qrData.customerName,
      purchaseDate: qrData.purchaseDate,
      expiryDate: qrData.expiryDate,
      stats: stats,
      usageHistory: usageHistory,
      branches: getBranchesUsed(usageHistory),
      recommendations: generateRecommendations(stats)
    };

    return report;

  } catch (error) {
    console.error('خطأ في إنشاء تقرير الاستخدام:', error);
    throw error;
  }
};
```

### 7.2 إحصائيات الباقة

#### الوظيفة المسؤولة: `getPackageStats()`

```javascript
const getPackageStats = async (packageId) => {
  try {
    // 1. جلب جميع QR codes للباقة
    const qrCodes = await qrAPI.getByPackageId(packageId);
    
    // 2. حساب الإحصائيات
    const stats = {
      totalSold: qrCodes.length,
      activePackages: qrCodes.filter(qr => qr.packageStatus === 'active').length,
      expiredPackages: qrCodes.filter(qr => {
        const expiryInfo = calculateDaysRemaining(qr.expiryDate);
        return expiryInfo.isExpired;
      }).length,
      totalRevenue: qrCodes.reduce((sum, qr) => sum + qr.price, 0),
      averageUsage: calculateAverageUsage(qrCodes),
      popularBranches: getPopularBranches(qrCodes),
      customerSatisfaction: calculateCustomerSatisfaction(qrCodes)
    };

    // 3. تحليل الاتجاهات
    const trends = {
      dailySales: getDailySales(qrCodes),
      weeklyUsage: getWeeklyUsage(qrCodes),
      monthlyRevenue: getMonthlyRevenue(qrCodes),
      customerRetention: calculateCustomerRetention(qrCodes)
    };

    return {
      packageId: packageId,
      stats: stats,
      trends: trends,
      generatedAt: new Date().toISOString()
    };

  } catch (error) {
    console.error('خطأ في جلب إحصائيات الباقة:', error);
    throw error;
  }
};
```

---

## 🔒 المرحلة الثامنة: الأمان والحماية

### 8.1 حماية QR Code

#### الوظيفة المسؤولة: `protectQRCode()`

```javascript
const protectQRCode = (qrData) => {
  // 1. إنشاء hash أمان
  const securityHash = generateSecurityHash(qrData);
  
  // 2. إضافة timestamp
  const timestamp = new Date().toISOString();
  
  // 3. إضافة signature
  const signature = generateSignature(qrData, timestamp);
  
  // 4. تشفير البيانات الحساسة
  const sensitiveData = {
    customerId: qrData.customerId,
    customerPhone: qrData.customerPhone,
    securityHash: securityHash
  };
  
  const encryptedSensitiveData = encryptSensitiveData(sensitiveData);
  
  return {
    ...qrData,
    securityHash: securityHash,
    timestamp: timestamp,
    signature: signature,
    encryptedSensitiveData: encryptedSensitiveData,
    version: '1.0'
  };
};
```

### 8.2 منع التزوير

#### الوظيفة المسؤولة: `preventForgery()`

```javascript
const preventForgery = (qrData) => {
  // 1. التحقق من صحة التوقيع
  const isValidSignature = verifySignature(qrData);
  if (!isValidSignature) {
    throw new Error('QR Code مزور');
  }

  // 2. التحقق من timestamp
  const timestampAge = Date.now() - new Date(qrData.timestamp).getTime();
  const maxAge = 24 * 60 * 60 * 1000; // 24 ساعة
  
  if (timestampAge > maxAge) {
    throw new Error('QR Code قديم');
  }

  // 3. التحقق من hash الأمان
  const calculatedHash = generateSecurityHash(qrData);
  if (calculatedHash !== qrData.securityHash) {
    throw new Error('QR Code تم تعديله');
  }

  // 4. التحقق من قاعدة البيانات
  const dbRecord = await qrAPI.getByOperationId(qrData.operationId);
  if (!dbRecord || dbRecord.securityHash !== qrData.securityHash) {
    throw new Error('QR Code غير موجود في قاعدة البيانات');
  }

  return true;
};
```

---

## 📱 المرحلة التاسعة: واجهة المستخدم

### 9.1 عرض حالة الباقة

#### المكون المسؤول: `PackageStatus.jsx`

```javascript
const PackageStatus = ({ qrData }) => {
  const expiryInfo = calculateDaysRemaining(qrData.expiryDate);
  const usagePercentage = ((qrData.totalWashes - qrData.remainingWashes) / qrData.totalWashes) * 100;

  return (
    <div className="package-status">
      {/* شريط التقدم */}
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${usagePercentage}%` }}
        />
        <span className="progress-text">
          {qrData.remainingWashes}/{qrData.totalWashes} غسلات
        </span>
      </div>

      {/* معلومات الصلاحية */}
      <div className="expiry-info">
        {expiryInfo.isExpired ? (
          <div className="expired-warning">
            <span>⚠️ انتهت الصلاحية</span>
          </div>
        ) : expiryInfo.isLowDays ? (
          <div className="low-days-warning">
            <span>⏰ تبقى {expiryInfo.daysRemaining} أيام</span>
          </div>
        ) : (
          <div className="valid-status">
            <span>✅ صالح لمدة {expiryInfo.daysRemaining} أيام</span>
          </div>
        )}
      </div>

      {/* معلومات إضافية */}
      <div className="additional-info">
        <p>الباقة: {qrData.packageName}</p>
        <p>نوع السيارة: {qrData.carType}</p>
        <p>متاح في: {qrData.availableIn === 'all' ? 'جميع المغاسل' : 'الفنادق فقط'}</p>
        <p>آخر استخدام: {qrData.lastUsed ? formatDate(qrData.lastUsed) : 'لم يتم الاستخدام بعد'}</p>
      </div>

      {/* أزرار الإجراءات */}
      <div className="action-buttons">
        <button onClick={() => navigate('/qr-scanner')}>
          مسح QR Code
        </button>
        <button onClick={() => navigate('/branches')}>
          عرض المغاسل
        </button>
        <button onClick={() => showUsageHistory(qrData.operationId)}>
          سجل الاستخدام
        </button>
      </div>
    </div>
  );
};
```

### 9.2 سجل الاستخدام

#### المكون المسؤول: `UsageHistory.jsx`

```javascript
const UsageHistory = ({ operationId }) => {
  const [usageHistory, setUsageHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsageHistory();
  }, [operationId]);

  const loadUsageHistory = async () => {
    try {
      setLoading(true);
      const history = await getUsageHistory(operationId);
      setUsageHistory(history);
    } catch (error) {
      console.error('خطأ في تحميل سجل الاستخدام:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="usage-history">
      <h3>سجل استخدام الباقة</h3>
      
      {usageHistory.length === 0 ? (
        <p>لم يتم استخدام الباقة بعد</p>
      ) : (
        <div className="history-list">
          {usageHistory.map((usage, index) => (
            <div key={index} className="history-item">
              <div className="usage-info">
                <span className="wash-number">الغسلة #{usage.washNumber}</span>
                <span className="branch-name">{usage.branchName}</span>
                <span className="usage-date">{formatDate(usage.date)}</span>
              </div>
              <div className="usage-time">
                {formatTime(usage.date)}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="history-summary">
        <p>إجمالي الغسلات المستخدمة: {usageHistory.length}</p>
        <p>المغاسل المستخدمة: {new Set(usageHistory.map(u => u.branchName)).size}</p>
        {usageHistory.length > 0 && (
          <p>آخر استخدام: {formatDate(usageHistory[usageHistory.length - 1].date)}</p>
        )}
      </div>
    </div>
  );
};
```

---

## 🎯 الخلاصة

هذا التقرير التفصيلي يوضح العملية الكاملة لشراء الباقة وإنشاء QR Code من البداية حتى النهاية:

### النقاط الرئيسية:

1. **اختيار الباقة**: عرض الباقات مع الأسعار حسب حجم السيارة
2. **عملية الدفع**: معالجة آمنة للدفع مع التحقق
3. **إنشاء QR Code**: تشفير البيانات وإنشاء رمز فريد
4. **عرض QR Code**: واجهة سهلة الاستخدام مع خيارات التحميل والمشاركة
5. **استخدام QR Code**: مسح آمن مع التحقق من الصلاحية
6. **إدارة الصلاحية**: تتبع الأيام المتبقية والإشعارات
7. **التقارير**: إحصائيات مفصلة عن الاستخدام
8. **الأمان**: حماية شاملة من التزوير والتعديل
9. **واجهة المستخدم**: عرض واضح لحالة الباقة وسجل الاستخدام

### المميزات التقنية:

- **تشفير البيانات**: حماية معلومات العميل
- **التحقق من الصحة**: منع الاستخدام غير المصرح به
- **التتبع المباشر**: سجل مفصل لجميع العمليات
- **الإشعارات الذكية**: تنبيهات في الوقت المناسب
- **التقارير التفصيلية**: إحصائيات شاملة للاستخدام

النظام مصمم ليكون آمناً وموثوقاً وسهل الاستخدام، مع توفير تجربة ممتازة للعملاء. 
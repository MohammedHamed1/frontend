import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Camera, FileText, Car, Sparkles, Crown, MapPin, Phone, Navigation, Clock, Star, AlertCircle, CheckCircle, Wifi, CreditCard, User, Settings } from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'مرحباً! أنا أحمد، المساعد الشخصي لـ PayPass. كيف يمكنني مساعدتك اليوم؟ 😊\n\nيمكنني مساعدتك في:\n📍 العثور على أقرب فرع\n🚗 معرفة الباقات والأسعار حسب نوع السيارة\n📱 حل مشاكل التطبيق\n💳 مساعدة في الدفع\n⏰ معرفة أوقات العمل\n💰 حساب السعر حسب حجم السيارة',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [conversationContext, setConversationContext] = useState('general');
  const [selectedCar, setSelectedCar] = useState(null);
  const messagesEndRef = useRef(null);

  // قاعدة بيانات السيارات مع الأسعار
  const carDatabase = {
    // سيارات صغيرة
    small: {
      name: "سيارات صغيرة",
      examples: ["تويوتا ياريس", "هيونداي أكسنت", "نيسان سنترا", "هوندا سيفيك", "مازدا 3"],
      basePrice: 25,
      packages: {
        basic: { price: 25, name: "الباقة الأساسية", features: ["غسيل خارجي شامل", "تجفيف احترافي", "صالح لمدة شهر"] },
        premium: { price: 45, name: "الباقة المميزة", features: ["غسيل داخلي وخارجي", "تنظيف المحرك", "صالح لمدة شهرين"] },
        gold: { price: 80, name: "الباقة الذهبية", features: ["تلميع شامل", "معطر فاخر", "خدمة VIP", "صالح لمدة 3 أشهر"] }
      }
    },
    // سيارات متوسطة
    medium: {
      name: "سيارات متوسطة",
      examples: ["تويوتا كامري", "هيونداي سوناتا", "نيسان ألتيما", "هوندا أكورد", "فورد فيوجن"],
      basePrice: 35,
      packages: {
        basic: { price: 35, name: "الباقة الأساسية", features: ["غسيل خارجي شامل", "تجفيف احترافي", "صالح لمدة شهر"] },
        premium: { price: 60, name: "الباقة المميزة", features: ["غسيل داخلي وخارجي", "تنظيف المحرك", "صالح لمدة شهرين"] },
        gold: { price: 110, name: "الباقة الذهبية", features: ["تلميع شامل", "معطر فاخر", "خدمة VIP", "صالح لمدة 3 أشهر"] }
      }
    },
    // سيارات كبيرة
    large: {
      name: "سيارات كبيرة",
      examples: ["تويوتا أفالون", "هيونداي أزيرا", "نيسان ماكسيما", "هوندا إنسايت", "فورد تاوروس"],
      basePrice: 45,
      packages: {
        basic: { price: 45, name: "الباقة الأساسية", features: ["غسيل خارجي شامل", "تجفيف احترافي", "صالح لمدة شهر"] },
        premium: { price: 75, name: "الباقة المميزة", features: ["غسيل داخلي وخارجي", "تنظيف المحرك", "صالح لمدة شهرين"] },
        gold: { price: 140, name: "الباقة الذهبية", features: ["تلميع شامل", "معطر فاخر", "خدمة VIP", "صالح لمدة 3 أشهر"] }
      }
    },
    // سيارات رياضية
    sports: {
      name: "سيارات رياضية",
      examples: ["بورش 911", "فيراري", "لامبورغيني", "أستون مارتن", "مكلارين"],
      basePrice: 60,
      packages: {
        basic: { price: 60, name: "الباقة الأساسية", features: ["غسيل خارجي شامل", "تجفيف احترافي", "صالح لمدة شهر"] },
        premium: { price: 100, name: "الباقة المميزة", features: ["غسيل داخلي وخارجي", "تنظيف المحرك", "صالح لمدة شهرين"] },
        gold: { price: 180, name: "الباقة الذهبية", features: ["تلميع شامل", "معطر فاخر", "خدمة VIP", "صالح لمدة 3 أشهر"] }
      }
    },
    // سيارات فاخرة
    luxury: {
      name: "سيارات فاخرة",
      examples: ["مرسيدس S-Class", "بي إم دبليو 7 Series", "أودي A8", "لكزس LS", "رولز رويس"],
      basePrice: 80,
      packages: {
        basic: { price: 80, name: "الباقة الأساسية", features: ["غسيل خارجي شامل", "تجفيف احترافي", "صالح لمدة شهر"] },
        premium: { price: 130, name: "الباقة المميزة", features: ["غسيل داخلي وخارجي", "تنظيف المحرك", "صالح لمدة شهرين"] },
        gold: { price: 220, name: "الباقة الذهبية", features: ["تلميع شامل", "معطر فاخر", "خدمة VIP", "صالح لمدة 3 أشهر"] }
      }
    },
    // دفع رباعي
    suv: {
      name: "سيارات دفع رباعي",
      examples: ["تويوتا لاند كروزر", "نيسان باترول", "هيونداي سانتافي", "فورد إكسبلورر", "شيفروليه تاهو"],
      basePrice: 55,
      packages: {
        basic: { price: 55, name: "الباقة الأساسية", features: ["غسيل خارجي شامل", "تجفيف احترافي", "صالح لمدة شهر"] },
        premium: { price: 90, name: "الباقة المميزة", features: ["غسيل داخلي وخارجي", "تنظيف المحرك", "صالح لمدة شهرين"] },
        gold: { price: 160, name: "الباقة الذهبية", features: ["تلميع شامل", "معطر فاخر", "خدمة VIP", "صالح لمدة 3 أشهر"] }
      }
    },
    // شاحنات
    truck: {
      name: "شاحنات",
      examples: ["فورد F-150", "شيفروليه سيلفيرادو", "دودج رام", "تويوتا تندرا", "نيسان تيتان"],
      basePrice: 70,
      packages: {
        basic: { price: 70, name: "الباقة الأساسية", features: ["غسيل خارجي شامل", "تجفيف احترافي", "صالح لمدة شهر"] },
        premium: { price: 115, name: "الباقة المميزة", features: ["غسيل داخلي وخارجي", "تنظيف المحرك", "صالح لمدة شهرين"] },
        gold: { price: 200, name: "الباقة الذهبية", features: ["تلميع شامل", "معطر فاخر", "خدمة VIP", "صالح لمدة 3 أشهر"] }
      }
    }
  };

  // دالة للتعرف على نوع السيارة من النص
  const identifyCarType = (text) => {
    const lowerText = text.toLowerCase();
    
    // سيارات صغيرة
    if (lowerText.includes('ياريس') || lowerText.includes('أكسنت') || lowerText.includes('سنترا') || 
        lowerText.includes('سيفيك') || lowerText.includes('مازدا 3') || lowerText.includes('صغيرة')) {
      return 'small';
    }
    
    // سيارات متوسطة
    if (lowerText.includes('كامري') || lowerText.includes('سوناتا') || lowerText.includes('ألتيما') || 
        lowerText.includes('أكورد') || lowerText.includes('فيوجن') || lowerText.includes('متوسطة')) {
      return 'medium';
    }
    
    // سيارات كبيرة
    if (lowerText.includes('أفالون') || lowerText.includes('أزيرا') || lowerText.includes('ماكسيما') || 
        lowerText.includes('إنسايت') || lowerText.includes('تاوروس') || lowerText.includes('كبيرة')) {
      return 'large';
    }
    
    // سيارات رياضية
    if (lowerText.includes('بورش') || lowerText.includes('فيراري') || lowerText.includes('لامبورغيني') || 
        lowerText.includes('أستون مارتن') || lowerText.includes('مكلارين') || lowerText.includes('رياضية')) {
      return 'sports';
    }
    
    // سيارات فاخرة
    if (lowerText.includes('مرسيدس') || lowerText.includes('بي إم دبليو') || lowerText.includes('أودي') || 
        lowerText.includes('لكزس') || lowerText.includes('رولز رويس') || lowerText.includes('فاخرة')) {
      return 'luxury';
    }
    
    // دفع رباعي
    if (lowerText.includes('لاند كروزر') || lowerText.includes('باترول') || lowerText.includes('سانتافي') || 
        lowerText.includes('إكسبلورر') || lowerText.includes('تاهو') || lowerText.includes('دفع رباعي') || 
        lowerText.includes('suv') || lowerText.includes('جيب')) {
      return 'suv';
    }
    
    // شاحنات
    if (lowerText.includes('فورد f') || lowerText.includes('سيلفيرادو') || lowerText.includes('رام') || 
        lowerText.includes('تندرا') || lowerText.includes('تيتان') || lowerText.includes('شاحنة')) {
      return 'truck';
    }
    
    return null;
  };

  // دالة لحساب السعر حسب نوع السيارة والباقة
  const calculatePrice = (carType, packageType = 'basic') => {
    if (!carType || !carDatabase[carType]) return null;
    
    const car = carDatabase[carType];
    const packageInfo = car.packages[packageType];
    
    return {
      carType: carType,
      carName: car.name,
      packageType: packageType,
      packageName: packageInfo.name,
      price: packageInfo.price,
      features: packageInfo.features
    };
  };

  // دالة لعرض جميع الأسعار
  const showAllPrices = (carType) => {
    if (!carType || !carDatabase[carType]) return null;
    
    const car = carDatabase[carType];
    let response = `🚗 أسعار ${car.name}:\n\n`;
    
    Object.entries(car.packages).forEach(([key, pkg]) => {
      response += `${pkg.name}: ${pkg.price} ريال\n`;
      pkg.features.forEach(feature => {
        response += `   • ${feature}\n`;
      });
      response += '\n';
    });
    
    return response;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Saudi character SVG component
  const SaudiCharacter = ({ className = "", isTyping = false }) => (
    <div className={`${className} relative`}>
      <svg width="60" height="60" viewBox="0 0 60 60" className={`${isTyping ? 'animate-bounce-slow' : 'animate-float'}`}>
        {/* Head */}
        <circle cx="30" cy="22" r="12" fill="#fbbf24" stroke="#92400e" strokeWidth="1"/>
        
        {/* Thobe */}
        <rect x="17" y="35" width="26" height="20" fill="#1e40af" rx="2"/>
        
        {/* Shemagh */}
        <ellipse cx="30" cy="20" rx="15" ry="7" fill="#dc2626"/>
        <ellipse cx="30" cy="17" rx="12" ry="5" fill="#dc2626"/>
        
        {/* Agal */}
        <rect x="22" y="15" width="16" height="4" fill="#92400e" rx="2"/>
        
        {/* Face */}
        <circle cx="27" cy="21" r="1" fill="#1f2937"/>
        <circle cx="33" cy="21" r="1" fill="#1f2937"/>
        <path d="M 27 25 Q 30 28 33 25" stroke="#1f2937" strokeWidth="1" fill="none"/>
        
        {/* Arms */}
        <rect x="12" y="37" width="4" height="12" fill="#1e40af" rx="2"/>
        <rect x="44" y="37" width="4" height="12" fill="#1e40af" rx="2"/>
        
        {/* Hands */}
        <circle cx="14" cy="52" r="2" fill="#fbbf24"/>
        <circle cx="46" cy="52" r="2" fill="#fbbf24"/>
        
        {/* Typing animation dots */}
        {isTyping && (
          <>
            <circle cx="25" cy="55" r="2" fill="#10b981" className="animate-pulse">
              <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
            </circle>
            <circle cx="30" cy="55" r="2" fill="#10b981" className="animate-pulse">
              <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" begin="0.2s"/>
            </circle>
            <circle cx="35" cy="55" r="2" fill="#10b981" className="animate-pulse">
              <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" begin="0.4s"/>
            </circle>
          </>
        )}
      </svg>
    </div>
  );

  // Branches data with coordinates
  const branches = [
    {
      id: 1,
      name: "فرع الرياض - النخيل",
      address: "شارع الملك فهد، حي النخيل",
      phone: "011-123-4567",
      hours: "24/7",
      rating: 4.8,
      coordinates: { lat: 24.7136, lng: 46.6753 },
      services: ["غسيل خارجي", "غسيل داخلي", "تلميع"],
      distance: null
    },
    {
      id: 2,
      name: "فرع الرياض - العليا",
      address: "شارع العليا العام، حي العليا",
      phone: "011-123-4568",
      hours: "6:00 ص - 12:00 م",
      rating: 4.6,
      coordinates: { lat: 24.7749, lng: 46.6694 },
      services: ["غسيل خارجي", "غسيل داخلي"],
      distance: null
    },
    {
      id: 3,
      name: "فرع جدة - الكورنيش",
      address: "شارع الكورنيش، حي الكورنيش",
      phone: "012-123-4567",
      hours: "24/7",
      rating: 4.7,
      coordinates: { lat: 21.4858, lng: 39.1925 },
      services: ["غسيل خارجي", "غسيل داخلي", "تلميع"],
      distance: null
    }
  ];

  const quickReplies = [
    { text: "أين أقرب فرع؟", icon: <MapPin className="h-4 w-4" />, action: 'find_nearest' },
    { text: "أريد معرفة الباقات", icon: <Crown className="h-4 w-4" />, action: 'packages' },
    { text: "أسعار السيارات الصغيرة", icon: <Car className="h-4 w-4" />, action: 'car_small' },
    { text: "أسعار الدفع الرباعي", icon: <Car className="h-4 w-4" />, action: 'car_suv' },
    { text: "مشكلة في التطبيق", icon: <AlertCircle className="h-4 w-4" />, action: 'app_issue' },
    { text: "مشكلة في الدفع", icon: <CreditCard className="h-4 w-4" />, action: 'payment_issue' },
    { text: "أوقات العمل", icon: <Clock className="h-4 w-4" />, action: 'working_hours' },
    { text: "اتصل بنا", icon: <Phone className="h-4 w-4" />, action: 'contact' }
  ];

  // Calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          return location;
        },
        (error) => {
          console.error('Error getting location:', error);
          return null;
        }
      );
    }
    return null;
  };

  // Find nearest branch
  const findNearestBranch = (location) => {
    if (!location) return null;
    
    const branchesWithDistance = branches.map(branch => ({
      ...branch,
      distance: calculateDistance(
        location.lat, location.lng,
        branch.coordinates.lat, branch.coordinates.lng
      )
    }));
    
    return branchesWithDistance.sort((a, b) => a.distance - b.distance)[0];
  };

  const handleQuickReply = (reply) => {
    setInputMessage(reply.text);
    handleSendMessage(reply.text, reply.action);
  };

  const handleSendMessage = async (message = inputMessage, action = null) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response based on action or message content
    setTimeout(() => {
      let response = '';
      let context = conversationContext;

      // التعرف على نوع السيارة من الرسالة
      const carType = identifyCarType(message);
      if (carType) {
        setSelectedCar(carType);
      }

      if (action === 'find_nearest' || message.includes('أقرب') || message.includes('فرع')) {
        context = 'location';
        const location = getUserLocation();
        if (location) {
          const nearestBranch = findNearestBranch(location);
          if (nearestBranch) {
            setSelectedBranch(nearestBranch);
            response = `📍 وجدت أقرب فرع لك!\n\n🏢 ${nearestBranch.name}\n📍 ${nearestBranch.address}\n📞 ${nearestBranch.phone}\n⏰ ${nearestBranch.hours}\n⭐ ${nearestBranch.rating}/5\n🚗 المسافة: ${nearestBranch.distance.toFixed(1)} كم\n\nهل تريد:\n🗺️ فتح الخريطة\n📞 الاتصال بالفرع\n🚗 الحصول على الاتجاهات`;
          } else {
            response = "عذراً، لم أتمكن من العثور على أقرب فرع. هل يمكنك تحديد موقعك أو المدينة التي أنت فيها؟";
          }
        } else {
          response = "لم أتمكن من تحديد موقعك. هل يمكنك:\n1️⃣ السماح بالوصول للموقع\n2️⃣ أو إخباري في أي مدينة أنت؟";
        }
      } else if (action === 'packages' || message.includes('باقة') || message.includes('سعر') || message.includes('أسعار')) {
        context = 'packages';
        
        if (carType) {
          // إذا تم تحديد نوع السيارة، اعرض الأسعار الخاصة بها
          const priceInfo = showAllPrices(carType);
          response = priceInfo + "\n💡 يمكنك أيضاً سؤالي عن سيارات أخرى مثل:\n• تويوتا ياريس (سيارات صغيرة)\n• تويوتا كامري (سيارات متوسطة)\n• تويوتا لاند كروزر (دفع رباعي)\n• مرسيدس (سيارات فاخرة)";
        } else {
          // عرض جميع أنواع السيارات والأسعار
          response = "🚗 لدينا أسعار مختلفة حسب نوع وحجم السيارة:\n\n";
          Object.entries(carDatabase).forEach(([key, car]) => {
            response += `📋 ${car.name}:\n`;
            response += `   • الباقة الأساسية: ${car.packages.basic.price} ريال\n`;
            response += `   • الباقة المميزة: ${car.packages.premium.price} ريال\n`;
            response += `   • الباقة الذهبية: ${car.packages.gold.price} ريال\n\n`;
          });
          response += "💡 أخبرني نوع سيارتك لأعرض لك الأسعار التفصيلية!\n\nمثال: \"أريد أسعار تويوتا ياريس\" أو \"كم سعر غسيل لاند كروزر\"";
        }
      } else if (carType && (message.includes('سعر') || message.includes('كم') || message.includes('تكلفة'))) {
        // إذا تم تحديد نوع السيارة وسؤال عن السعر
        context = 'car_pricing';
        const priceInfo = showAllPrices(carType);
        response = priceInfo + "\n💡 هل تريد:\n• معرفة أسعار سيارات أخرى\n• الحجز الآن\n• معرفة أقرب فرع";
      } else if (message.includes('سيارة') && !carType) {
        // إذا سأل عن السيارة ولم يتم تحديد النوع
        context = 'car_selection';
        response = "🚗 أخبرني نوع سيارتك لأعرض لك الأسعار المناسبة:\n\n";
        Object.entries(carDatabase).forEach(([key, car]) => {
          response += `• ${car.name} (مثل: ${car.examples.slice(0, 2).join(', ')})\n`;
        });
        response += "\n💡 مثال: \"أريد أسعار تويوتا ياريس\" أو \"كم سعر غسيل لاند كروزر\"";
      } else if (action === 'car_small' || (message.includes('صغيرة') && message.includes('سيارة'))) {
        context = 'car_pricing';
        const priceInfo = showAllPrices('small');
        response = priceInfo + "\n💡 أمثلة على السيارات الصغيرة:\n• تويوتا ياريس\n• هيونداي أكسنت\n• نيسان سنترا\n• هوندا سيفيك\n\nهل تريد معرفة أسعار سيارات أخرى؟";
      } else if (action === 'car_suv' || (message.includes('دفع رباعي') || message.includes('suv'))) {
        context = 'car_pricing';
        const priceInfo = showAllPrices('suv');
        response = priceInfo + "\n💡 أمثلة على سيارات الدفع الرباعي:\n• تويوتا لاند كروزر\n• نيسان باترول\n• هيونداي سانتافي\n• فورد إكسبلورر\n\nهل تريد معرفة أسعار سيارات أخرى؟";
      } else if (action === 'app_issue' || message.includes('تطبيق') || message.includes('مشكلة')) {
        context = 'app_support';
        response = "🔧 دعني أساعدك في حل مشكلة التطبيق:\n\n❓ ما هي المشكلة تحديداً؟\n\n🔍 المشاكل الشائعة:\n• التطبيق لا يفتح\n• مشكلة في تسجيل الدخول\n• مشكلة في شراء الباقات\n• مشكلة في مسح QR Code\n• التطبيق بطيء\n\nأخبرني بالتفصيل وسأساعدك في الحل!";
      } else if (action === 'payment_issue' || message.includes('دفع') || message.includes('بطاقة')) {
        context = 'payment_support';
        response = "💳 سأساعدك في حل مشاكل الدفع:\n\n❓ ما هي المشكلة؟\n\n🔍 المشاكل الشائعة:\n• البطاقة مرفوضة\n• مشكلة في إتمام الدفع\n• رسوم إضافية\n• استرداد المال\n• تغيير طريقة الدفع\n\nأخبرني بالتفصيل وسأوجهك للحل!";
      } else if (action === 'working_hours' || message.includes('وقت') || message.includes('ساعة')) {
        context = 'hours';
        response = "⏰ أوقات عمل فروعنا:\n\n🌅 الفروع العادية:\nالأحد - الخميس: 6:00 ص - 12:00 م\nالجمعة - السبت: 9:00 ص - 5:00 م\n\n🌙 الفروع المفتوحة 24/7:\n• فرع الرياض - النخيل\n• فرع الرياض - السليمانية\n• فرع جدة - الكورنيش\n• فرع الدمام - الكورنيش\n\nهل تريد معرفة فرع معين؟";
      } else if (action === 'contact' || message.includes('اتصل') || message.includes('تواصل')) {
        context = 'contact';
        response = "📞 يمكنك التواصل معنا عبر:\n\n📱 الهاتف: 920000000\n📧 البريد: info@paypass.sa\n💬 واتساب: 966500000000\n\n⏰ خدمة العملاء متاحة:\n24/7 للفروع المفتوحة\nالأحد - الخميس: 8:00 ص - 6:00 م\n\nهل تريد:\n📞 الاتصال الآن\n📧 إرسال بريد إلكتروني\n💬 فتح محادثة واتساب";
      } else {
        // Default response with context awareness
        if (context === 'location' && selectedBranch) {
          response = "هل تريد مساعدة أخرى بخصوص الفرع أم يمكنني مساعدتك في شيء آخر؟";
        } else if (context === 'packages' || context === 'car_pricing') {
          response = "هل تريد معرفة المزيد عن الباقات أم مساعدة في الحجز؟";
        } else if (context === 'car_selection') {
          response = "أخبرني نوع سيارتك لأعرض لك الأسعار المناسبة!";
        } else if (context === 'app_support') {
          response = "هل تم حل المشكلة أم تحتاج مساعدة إضافية؟";
        } else {
          response = "شكراً لسؤالك! يمكنني مساعدتك في:\n\n📍 العثور على أقرب فرع\n🚗 معرفة الباقات والأسعار حسب نوع السيارة\n📱 حل مشاكل التطبيق\n💳 مساعدة في الدفع\n⏰ معرفة أوقات العمل\n📞 التواصل مع خدمة العملاء\n💰 حساب السعر حسب حجم السيارة\n\nما الذي تريد معرفته؟";
        }
      }

      const aiResponse = {
        id: Date.now() + 1,
        type: 'assistant',
        content: response,
        timestamp: new Date(),
        context: context
      };

      setMessages(prev => [...prev, aiResponse]);
      setConversationContext(context);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = () => {
    const imageMessage = {
      id: Date.now(),
      type: 'user',
      content: 'صورة السيارة',
      image: 'https://via.placeholder.com/200x150/10b981/ffffff?text=صورة+السيارة',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, imageMessage]);
  };

  const handleBranchAction = (action) => {
    if (!selectedBranch) return;

    let response = '';
    switch (action) {
      case 'map':
        window.open(`https://www.google.com/maps?q=${selectedBranch.coordinates.lat},${selectedBranch.coordinates.lng}`, '_blank');
        response = `🗺️ تم فتح الخريطة لفرع ${selectedBranch.name}`;
        break;
      case 'call':
        window.open(`tel:${selectedBranch.phone}`, '_blank');
        response = `📞 تم الاتصال بفرع ${selectedBranch.name}`;
        break;
      case 'directions':
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedBranch.coordinates.lat},${selectedBranch.coordinates.lng}`, '_blank');
        response = `🚗 تم فتح الاتجاهات لفرع ${selectedBranch.name}`;
        break;
      default:
        return;
    }

    const aiResponse = {
      id: Date.now() + 1,
      type: 'assistant',
      content: response,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiResponse]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 animate-bounce-slow"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SaudiCharacter />
                <div>
                  <h3 className="font-bold">أحمد - المساعد الشخصي</h3>
                  <p className="text-sm opacity-90">متصل الآن</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-primary-500 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-900 rounded-bl-md'
                    }`}
                  >
                    {message.image && (
                      <img src={message.image} alt="صورة" className="w-full h-32 object-cover rounded-lg mb-2" />
                    )}
                    <p className="whitespace-pre-line">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-primary-100' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 rounded-2xl rounded-bl-md px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <SaudiCharacter isTyping={true} />
                      <span className="text-sm">يكتب...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Branch Actions */}
            {selectedBranch && (
              <div className="px-4 pb-2">
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleBranchAction('map')}
                    className="flex items-center justify-center space-x-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>الخريطة</span>
                  </button>
                  <button
                    onClick={() => handleBranchAction('call')}
                    className="flex items-center justify-center space-x-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span>اتصال</span>
                  </button>
                  <button
                    onClick={() => handleBranchAction('directions')}
                    className="flex items-center justify-center space-x-1 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors"
                  >
                    <Navigation className="h-4 w-4" />
                    <span>اتجاهات</span>
                  </button>
                </div>
              </div>
            )}

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <div className="grid grid-cols-2 gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="flex items-center justify-center space-x-2 px-3 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors"
                    >
                      {reply.icon}
                      <span>{reply.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleImageUpload}
                  className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                >
                  <Camera className="h-5 w-5" />
                </button>
                <div className="flex-1 relative">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="اكتب رسالتك هنا..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    rows="1"
                  />
                </div>
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim()}
                  className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant; 
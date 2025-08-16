import React, { useState, useEffect } from 'react';
import { CheckCircle, Star, Download, Phone, ArrowRight, Sparkles } from 'lucide-react';
import logo from '../assets/logo.png';
import googlePlay from '../assets/google-play-badge.png';
import appStore from '../assets/app-store-badge.png';

const features = [
  'شراء الباقات بسهولة',
  'مسح QR Code سريع',
  'تتبع الغسلات المتبقية',
];

const heroTypewriter = [
  'مرحباً بك في PayPass',
  'غسيل سيارتك أصبح أسهل',
  'جرب الخدمة الذكية الآن',
  'وفر وقتك وكن مطمئناً',
  'جودة وراحة في كل غسلة'
];

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [typedHero, setTypedHero] = useState('');
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const welcomeTexts = [
    'مرحباً بك في PayPass',
    'أفضل خدمة غسيل سيارات',
    'تجربة استثنائية تنتظرك'
  ];

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    // تغيير الميزات كل 3 ثوان
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect for hero main title
  useEffect(() => {
    const current = heroTypewriter[currentHeroIndex];
    let charIndex = 0;
    setTypedHero('');
    const typeInterval = setInterval(() => {
      if (charIndex <= current.length) {
        setTypedHero(current.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentHeroIndex((prev) => (prev + 1) % heroTypewriter.length);
        }, 2000);
      }
    }, 90);
    return () => clearInterval(typeInterval);
  }, [currentHeroIndex]);

  // تأثير الكتابة للنص الترحيبي (الثانوي)
  useEffect(() => {
    if (isVisible) {
      const currentText = welcomeTexts[currentTextIndex];
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex <= currentText.length) {
          setTypedText(currentText.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setCurrentTextIndex((prev) => (prev + 1) % welcomeTexts.length);
            setTypedText('');
          }, 2000);
        }
      }, 100);
      return () => clearInterval(typeInterval);
    }
  }, [isVisible, currentTextIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-green-50 to-white">
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-20 min-h-[70vh]">
          {/* النص والعنوان */}
          <div className={`flex-1 flex flex-col items-center lg:items-start justify-center px-4 lg:px-0 order-2 lg:order-1 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-4">
              {/* نص ترحيبي متحرك */}
              <div className="mb-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="h-8 flex items-center justify-center lg:justify-start">
                  <span className="text-lg text-green-600 font-medium">
                    {typedText}
                    <span className="animate-pulse">|</span>
                  </span>
                </div>
              </div>

              <div className="mb-6 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <span className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 active:scale-95 cursor-pointer">
                  <Sparkles className="inline w-5 h-5 mr-2 animate-spin group-hover:text-yellow-300 transition-colors duration-300" />
                  الحل الأفضل لغسيل السيارات
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-extrabold text-right mb-6 leading-tight animate-fade-in-up transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 hover:text-green-600" style={{animationDelay: '0.4s'}}>
                <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent animate-pulse">{typedHero}<span className="animate-pulse">|</span></span>
              </h1>
              
              <p className="text-gray-600 text-lg mb-8 text-right animate-fade-in-up transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 hover:text-green-600 font-bold" style={{animationDelay: '0.6s'}}>
                نظام PayPass الذكي يوفر لك تجربة غسيل سيارات متطورة وسهلة. اشترِ باقتك، امسح الكود، واستمتع بخدمة استثنائية.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full lg:w-auto animate-fade-in-up" style={{animationDelay: '0.8s'}}>
              <a href="/packages" className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-xl px-8 py-4 shadow-lg transition-all duration-300 text-lg text-center transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 hover:rotate-1">
                <span>احجز خدمتك الآن</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="tel:" className="group bg-white border-2 border-green-600 text-green-700 font-bold rounded-xl px-8 py-4 shadow-lg transition-all duration-300 text-lg text-center flex items-center justify-center gap-2 hover:bg-green-50 transform hover:scale-105 hover:rotate-1">
                <Phone className="w-5 h-5 animate-pulse" />
                <span>اتصل بنا</span>
              </a>
            </div>
            
            <div className="flex gap-8 mt-4 w-full lg:w-auto justify-center lg:justify-start animate-fade-in-up" style={{animationDelay: '1s'}}>
              <div className="text-center group hover:scale-110 active:scale-95 transition-transform duration-300 cursor-pointer" onClick={() => setCurrentFeature(0)}>
                <div className="text-3xl font-bold text-gray-800 group-hover:text-green-600 group-active:text-green-700 transition-colors">+50</div>
                <div className="text-gray-500 text-sm font-bold group-hover:text-green-600 transition-colors">فرع في المملكة</div>
              </div>
              <div className="text-center group hover:scale-110 active:scale-95 transition-transform duration-300 cursor-pointer" onClick={() => setCurrentFeature(1)}>
                <div className="text-3xl font-bold text-gray-800 group-hover:text-green-600 group-active:text-green-700 transition-colors">+10K</div>
                <div className="text-gray-500 text-sm font-bold group-hover:text-green-600 transition-colors">عميل راضي</div>
              </div>
              <div className="text-center group hover:scale-110 active:scale-95 transition-transform duration-300 cursor-pointer" onClick={() => setCurrentFeature(2)}>
                <div className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-1 group-hover:text-green-600 group-active:text-green-700 transition-colors">
                  4.9 <Star className="w-5 h-5 text-yellow-400 animate-pulse group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-gray-500 text-sm font-bold group-hover:text-green-600 transition-colors">تقييم</div>
              </div>
            </div>
          </div>

          {/* البطاقة الخضراء المائلة */}
          <div className={`flex-1 flex justify-center items-center order-1 lg:order-2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{animationDelay: '0.3s'}}>
            <div className="relative group">
              <div className="relative bg-white rounded-3xl shadow-2xl p-0 transform transition-all duration-500 hover:scale-105 hover:rotate-2 hover:shadow-3xl" style={{ width: 410, minHeight: 520 }}>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl m-8 p-8 flex flex-col items-center relative overflow-hidden" style={{ minHeight: 340 }}>
                  {/* أيقونة التطبيق */}
                  <div className="flex items-center justify-center mb-3 relative z-10">
                    <div className="relative group/logo">
                      <img src={logo} alt="شعار التطبيق" className="w-16 h-16 object-contain drop-shadow-lg brightness-0 invert animate-bounce group-hover/logo:scale-110 transition-transform duration-300" style={{animationDelay: '0.5s'}} />
                    </div>
                  </div>
                  <div className="text-white text-2xl font-bold mb-1 relative z-10">تطبيق PayPass</div>
                  <div className="text-green-100 text-sm mb-4 relative z-10">متوفر على Android و iOS</div>
                  <div className="flex gap-2 mb-2 relative z-10">
                    <a href="https://play.google.com/store/apps" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform duration-300 hover:rotate-2">
                      <img src={googlePlay} alt="Google Play" className="h-12 drop-shadow-lg" />
                    </a>
                    <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform duration-300 hover:rotate-2">
                      <img src={appStore} alt="App Store" className="h-12 drop-shadow-lg" />
                    </a>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4 mt-4 mb-8 px-10">
                  {features.map((feature, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center gap-3 text-gray-700 text-lg transition-all duration-500 hover:scale-105 hover:translate-x-2 ${
                        idx === currentFeature ? 'text-green-600 scale-105' : 'text-gray-600'
                      }`}
                    >
                      <CheckCircle className={`w-6 h-6 transition-all duration-500 ${
                        idx === currentFeature ? 'text-green-500 scale-110 animate-pulse' : 'text-green-400'
                      }`} />
                      <span className={idx === currentFeature ? 'font-semibold' : ''}>{feature}</span>
              </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 
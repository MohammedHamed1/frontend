import React from 'react';
import { Car, Download, Phone, Star, CheckCircle, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="py-24 bg-gradient-to-br from-green-100 to-green-400 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-10 animate-fade-in-up">
            <div className="space-y-8">
              <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-100 to-green-100 text-primary-800 rounded-full text-base font-medium shadow-lg">
                <Sparkles className="h-5 w-5 ml-3 text-primary-600" />
                <Car className="h-5 w-5 ml-2" />
                الحل الأمثل لغسيل السيارات
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                كل شيء أصبح
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-green-600 block animate-pulse-slow">
                  أسهل وأنظف
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                نظام PayPass الذكي يوفر لك تجربة غسيل سيارات متطورة وسهلة. 
                اشتر باقتك، امسح الكود، واستمتع بخدمة استثنائية.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="bg-primary px-8 py-4 rounded-xl text-white font-bold shadow-lg hover:bg-green-700 transition-all duration-300 mt-8">
                <Download className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                <span>تحميل التطبيق مجاناً</span>
              </button>
              <button className="px-10 py-6 border-2 border-primary-200 hover:border-primary-300 hover:bg-primary-50 rounded-xl text-lg flex items-center justify-center space-x-3 transition-all duration-300 font-medium text-primary-700 group">
                <Phone className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                <span>اتصل بنا الآن</span>
              </button>
            </div>

            <div className="flex items-center space-x-12 pt-10">
              <div className="text-center group">
                <div className="text-4xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">50+</div>
                <div className="text-gray-600 text-lg">فرع</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">10K+</div>
                <div className="text-gray-600 text-lg">عميل راضي</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">4.9</div>
                <div className="text-gray-600 text-lg flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 ml-2" />
                  تقييم
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - App Mockup */}
          <div className="relative animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="bg-white rounded-3xl shadow-2xl p-10 transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-105 border border-green-100">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 text-center text-white shadow-lg">
                <Car className="h-20 w-20 mx-auto mb-6 animate-float" />
                <h3 className="text-3xl font-bold mb-3">تطبيق PayPass</h3>
                <p className="text-primary-100 text-lg">متوفر على iOS و Android</p>
              </div>
              
              <div className="mt-8 space-y-6">
                <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-green-50 transition-colors group">
                  <CheckCircle className="h-6 w-6 text-primary-500 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium text-lg">شراء الباقات بسهولة</span>
                </div>
                <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-green-50 transition-colors group">
                  <CheckCircle className="h-6 w-6 text-primary-500 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium text-lg">مسح QR Code سريع</span>
                </div>
                <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-green-50 transition-colors group">
                  <CheckCircle className="h-6 w-6 text-primary-500 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium text-lg">تتبع الغسلات المتبقية</span>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary-400 rounded-full animate-bounce-slow"></div>
            <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-green-400 rounded-full animate-bounce-slow" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 
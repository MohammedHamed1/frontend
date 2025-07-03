import React from 'react';
import { Car, Phone, Mail, MapPin, Download, Facebook, Twitter, Instagram, Linkedin, MessageCircle, Star, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      "غسيل خارجي شامل",
      "غسيل داخلي",
      "تلميع السيارات",
      "تنظيف المحرك",
      "خدمة VIP",
      "معطر داخلي"
    ],
    packages: [
      "الباقة الأساسية",
      "الباقة المتقدمة", 
      "الباقة الشاملة",
      "باقات الشركات",
      "باقات الجملة",
      "باقات الاشتراك الشهري"
    ],
    company: [
      "من نحن",
      "فريق العمل",
      "الوظائف الشاغرة",
      "الأخبار والتحديثات",
      "الشركاء",
      "الشهادات والجوائز"
    ],
    support: [
      "مركز المساعدة",
      "الدعم الفني",
      "الشكاوى والاقتراحات",
      "الأسئلة الشائعة",
      "تواصل معنا",
      "دليل الاستخدام"
    ]
  };

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#", color: "hover:bg-blue-600", name: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", color: "hover:bg-blue-400", name: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", color: "hover:bg-pink-600", name: "Instagram" },
    { icon: <MessageCircle className="h-5 w-5" />, href: "#", color: "hover:bg-green-600", name: "WhatsApp" },
    { icon: <Star className="h-5 w-5" />, href: "#", color: "hover:bg-yellow-500", name: "Snapchat" },
    { icon: <Youtube className="h-5 w-5" />, href: "#", color: "hover:bg-red-600", name: "YouTube" }
  ];

  const contactInfo = [
    { icon: <Phone className="h-5 w-5" />, text: "920000000", href: "tel:920000000" },
    { icon: <Mail className="h-5 w-5" />, text: "info@paypass.sa", href: "mailto:info@paypass.sa" },
    { icon: <MapPin className="h-5 w-5" />, text: "الرياض، المملكة العربية السعودية", href: "#" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 animate-fade-in-up">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-3 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                <Car className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">PayPass</span>
                <div className="text-sm text-primary-400 font-medium">غسيل السيارات الذكي</div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              نظام PayPass الذكي يوفر لك تجربة غسيل سيارات متطورة وسهلة. 
              اشتر باقتك، امسح الكود، واستمتع بخدمة استثنائية مع ضمان الجودة.
            </p>
            
            <div className="space-y-3 mb-6">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-all duration-200 group"
                >
                  <div className="text-primary-400 group-hover:text-primary-300 transition-colors">
                    {contact.icon}
                  </div>
                  <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                    {contact.text}
                  </span>
                </a>
              ))}
            </div>

            {/* Social Media */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 bg-gray-700 text-gray-300 rounded-lg flex items-center justify-center transition-all duration-300 ${social.color} hover:text-white hover:scale-110 transform`}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h3 className="text-lg font-bold mb-6 text-primary-300 flex items-center">
              <span className="w-2 h-2 bg-primary-500 rounded-full ml-2"></span>
              الخدمات
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((service, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-primary-400 transition-all duration-300 font-medium hover:translate-x-1 transform block py-1"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h3 className="text-lg font-bold mb-6 text-primary-300 flex items-center">
              <span className="w-2 h-2 bg-primary-500 rounded-full ml-2"></span>
              الباقات
            </h3>
            <ul className="space-y-3">
              {footerLinks.packages.map((pkg, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-primary-400 transition-all duration-300 font-medium hover:translate-x-1 transform block py-1"
                  >
                    {pkg}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Support */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h3 className="text-lg font-bold mb-6 text-primary-300 flex items-center">
              <span className="w-2 h-2 bg-primary-500 rounded-full ml-2"></span>
              الشركة والدعم
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-primary-400 transition-all duration-300 font-medium hover:translate-x-1 transform block py-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            
            <h3 className="text-lg font-bold mb-6 mt-8 text-primary-300 flex items-center">
              <span className="w-2 h-2 bg-primary-500 rounded-full ml-2"></span>
              الدعم
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-primary-400 transition-all duration-300 font-medium hover:translate-x-1 transform block py-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Download App Section */}
        <div className="border-t border-gray-700 mt-12 pt-8 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-primary-300">
              حمل تطبيق PayPass الآن
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              استمتع بخدماتنا المميزة من خلال تطبيقنا الذكي. احصل على خصومات حصرية 
              وتتبع غسلاتك بسهولة مع نظام الباركود المتطور.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-medium flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Download className="h-5 w-5" />
                <span>تحميل للـ Android</span>
              </button>
              <button className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-medium flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Download className="h-5 w-5" />
                <span>تحميل للـ iOS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 pt-8 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              © {currentYear} PayPass. جميع الحقوق محفوظة.
            </div>
            
            <div className="flex flex-wrap gap-6">
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium">
                شروط الاستخدام
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium">
                خريطة الموقع
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors font-medium">
                الشروط والأحكام
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
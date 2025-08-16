import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Instagram, Twitter, Facebook, Star, Clock, Shield, Award,
  Download, Globe, MessageCircle, HelpCircle, FileText, Users, Briefcase, Trophy,
  Play, Apple, ExternalLink, ChevronRight, ArrowRight, Camera, Youtube
} from 'lucide-react';
import googlePlayBadge from '../assets/google-play-badge.png';
import appStoreBadge from '../assets/app-store-badge.png';
import logo from '../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <footer className="bg-slate-900 text-white" dir="rtl">
      {/* القسم الرئيسي */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* الجانب الأيمن - العلامة التجارية ومعلومات التواصل */}
          <div className="space-y-6 flex flex-col justify-center h-full">
            {/* العلامة التجارية */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                  <img src={logo} alt="PayPass Logo" className="w-8 h-8 object-contain" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Phone className="w-3 h-3 text-green-600" />
                </div>
              </div>
              <div>
                <h2 className="text-white font-bold text-2xl" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>PayPass</h2>
                <p className="text-green-400 font-semibold text-base" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  غسيل السيارات الذكي
                </p>
              </div>
            </div>
            
            {/* وصف الشركة */}
            <div className="mb-6">
              <p className="text-gray-300 text-sm leading-relaxed" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                تجربة غسيل السيارات الذكية مع PayPass. سهولة الاستخدام، خدمات متقدمة، وضمان الجودة.
              </p>
            </div>

            {/* معلومات التواصل */}
            <div className="space-y-2">
              <a href="tel:+966568909183" className="flex items-center gap-2 px-2 py-1 bg-slate-800 rounded-md border border-slate-700 min-w-0 max-w-xs w-auto hover:bg-slate-700 transition-colors">
                <div className="w-5 h-5 bg-green-500 rounded-md flex items-center justify-center">
                  <Phone className="w-3 h-3 text-white" />
                </div>
                <span className="text-white text-xs font-bold truncate w-full" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}} dir="ltr">+966 56 890 9183</span>
              </a>
              <a href="mailto:info@paypasss.com" className="flex items-center gap-2 px-2 py-1 bg-slate-800 rounded-md border border-slate-700 min-w-0 max-w-xs w-auto hover:bg-slate-700 transition-colors">
                <div className="w-5 h-5 bg-green-500 rounded-md flex items-center justify-center">
                  <Mail className="w-3 h-3 text-white" />
                </div>
                <span className="text-white text-xs font-bold truncate w-full" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}} dir="ltr">info@paypasss.com</span>
              </a>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2 py-1 bg-slate-800 rounded-md border border-slate-700 min-w-0 max-w-xs w-auto hover:bg-slate-700 transition-colors">
                <div className="w-5 h-5 bg-green-500 rounded-md flex items-center justify-center">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                <span className="text-white text-xs font-bold truncate w-full" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>الرياض، المملكة العربية السعودية</span>
              </a>
              </div>

            {/* الروابط الاجتماعية */}
            <div className="flex gap-2 mt-2">
              {[
                { icon: Facebook, color: 'text-blue-500', url: 'https://facebook.com' },
                { icon: Twitter, color: 'text-blue-400', url: 'https://twitter.com' },
                { icon: Instagram, color: 'text-pink-500', url: 'https://instagram.com' },
                { icon: Star, color: 'text-yellow-400', url: '#' },
                { icon: Camera, color: 'text-yellow-300', url: '#' },
                { icon: Youtube, color: 'text-red-500', url: 'https://youtube.com' }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-all duration-300 hover:scale-110"
                >
                  <social.icon className={`w-4 h-4 ${social.color}`} />
                </a>
              ))}
            </div>
          </div>

          {/* الجانب الأيسر - أعمدة التنقل والمعلومات */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 md:gap-0 lg:gap-0 relative">
            {/* فاصل رأسي بين الأعمدة */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/4 w-px bg-slate-800" style={{zIndex:1}}></div>
            <div className="hidden md:block absolute top-0 bottom-0 left-2/4 w-px bg-slate-800" style={{zIndex:1}}></div>
            <div className="hidden md:block absolute top-0 bottom-0 left-3/4 w-px bg-slate-800" style={{zIndex:1}}></div>
            {/* الأعمدة */}
            {[
              {
                title: 'الشركة والدعم',
                links: [
                  { label: 'من نحن', to: '/about' },
                  { label: 'فريق العمل', to: '/team' },
                  { label: 'الوظائف الشاغرة', to: '/careers' },
                  { label: 'الأخبار والتحديثات', to: '/news' },
                  { label: 'الشركاء', to: '/partners' },
                  { label: 'الشهادات والجوائز', to: '/certificates' },
                ]
              },
              {
                title: 'الباقات',
                links: [
                  { label: 'الباقة الأساسية', to: '/packages' },
                  { label: 'الباقة المتقدمة', to: '/packages' },
                  { label: 'الباقة الشاملة', to: '/packages' },
                ]
              },
              {
                title: 'الخدمات',
                links: [
                  { label: 'غسيل خارجي شامل', to: '/services' },
                  { label: 'غسيل داخلي وخارجي', to: '/services' },
                  { label: 'تلميع احترافي', to: '/services' },
                ]
              },
              {
                title: 'الدعم',
                links: [
                  { label: 'مركز المساعدة', to: '/help-center' },
                  { label: 'الدعم الفني', to: '/technical-support' },
                  { label: 'الشكاوى والاقتراحات', to: '/complaints' },
                  { label: 'الأسئلة الشائعة', to: '/faq' },
                  { label: 'تواصل معنا', to: '/contact' },
                  { label: 'دليل الاستخدام', to: '/user-guide' },
                ]
              }
            ].map((col, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start px-2 py-2">
                <h3 className="text-green-400 font-bold text-base mb-3 mt-2 flex items-center gap-2 tracking-wide border-b-2 border-green-500 pb-1 w-full text-center md:text-right" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  {col.title}
              </h3>
                <div className="flex flex-col gap-1 w-full">
                  {col.links.map((item, i) => (
                    <Link
                      key={i}
                      to={item.to}
                      className="block text-gray-300 hover:text-green-400 transition-colors text-xs md:text-sm py-1 px-1 rounded-md hover:bg-slate-800 focus:bg-slate-800 focus:text-green-400 outline-none"
                      style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold', transition: 'all 0.2s'}}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
              </div>
            </div>
          </div>

      {/* قسم التطبيقات وحقوق النشر */}
      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* قسم التطبيقات */}
          <div className="text-center mb-6">
            <h3 className="text-green-400 font-bold text-xl mb-3" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
              حمل تطبيق PayPass الآن
              </h3>
            <p className="text-gray-300 text-sm mb-4 max-w-2xl mx-auto" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
              استمتع بخصومات حصرية وتتبع غسيل سيارتك بسهولة
            </p>
            <div className="flex justify-center gap-3">
              <a href="#" className="block hover:scale-105 transition-transform duration-300">
                <img src={appStoreBadge} alt="App Store" className="h-10 w-auto" />
              </a>
              <a href="#" className="block hover:scale-105 transition-transform duration-300">
                <img src={googlePlayBadge} alt="Google Play" className="h-10 w-auto" />
              </a>
            </div>
          </div>

          {/* حقوق النشر والروابط */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
            <div className="text-gray-400 text-xs" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
              © {currentYear} PayPass. جميع الحقوق محفوظة.
            </div>
            
            <div className="flex gap-4 text-gray-400 text-xs flex-wrap justify-center">
              {[
                { name: 'سياسة الخصوصية', to: '/privacy' },
                { name: 'شروط الاستخدام', to: '/terms' },
                { name: 'الشروط والأحكام', to: '/terms' },
                { name: 'خريطة الموقع', to: '/sitemap' }
              ].map((link, index) => (
                <Link 
                  key={index}
                  to={link.to} 
                  className="hover:text-green-400 transition-colors" 
                  style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
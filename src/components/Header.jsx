import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Phone, Mail, Star, Shield, ChevronDown, ChevronUp, User, LogIn
} from 'lucide-react';
import logo from '../assets/logo.png';
import googlePlayBadge from '../assets/google-play-badge.png';
import appStoreBadge from '../assets/app-store-badge.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-green-200' 
        : 'bg-white/90 backdrop-blur-sm shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* الشعار */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <img src={logo} alt="PayPass Logo" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">PayPass</h1>
              <p className="text-xs text-green-600 font-medium">غسيل السيارات الذكي</p>
            </div>
          </Link>

          {/* القائمة الرئيسية - للدسكتوب */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              to="/" 
              className={`relative font-semibold text-base transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-green-600' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              الرئيسية
              {isActive('/') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 rounded-full"></div>
              )}
            </Link>
            
            <Link 
              to="/packages" 
              className={`relative font-semibold text-base transition-colors duration-200 ${
                isActive('/packages') 
                  ? 'text-green-600' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              الباقات
              {isActive('/packages') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 rounded-full"></div>
              )}
            </Link>
            
            <Link 
              to="/services" 
              className={`relative font-semibold text-base transition-colors duration-200 ${
                isActive('/services') 
                  ? 'text-green-600' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              الخدمات
              {isActive('/services') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 rounded-full"></div>
              )}
            </Link>
            
            <Link 
              to="/about" 
              className={`relative font-semibold text-base transition-colors duration-200 ${
                isActive('/about') 
                  ? 'text-green-600' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              من نحن
              {isActive('/about') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 rounded-full"></div>
              )}
            </Link>
            
            <Link 
              to="/contact" 
              className={`relative font-semibold text-base transition-colors duration-200 ${
                isActive('/contact') 
                  ? 'text-green-600' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              اتصل بنا
              {isActive('/contact') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 rounded-full"></div>
              )}
            </Link>
          </nav>

          {/* الأزرار - للدسكتوب */}
          <div className="hidden lg:flex items-center gap-4">
            {/* أيقونات التطبيقات */}
            {/* تم حذف أيقونات جوجل بلاي وأبل ستور */}
            
            {/* أزرار تسجيل الدخول وإنشاء الحساب */}
                  <Link 
              to="/login" 
              className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors font-semibold"
            >
              <LogIn className="w-4 h-4" />
              <span>تسجيل الدخول</span>
                  </Link>
            
                  <Link 
                    to="/signup" 
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              إنشاء الحساب
                  </Link>
            </div>

          {/* زر القائمة - للموبايل */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-green-600" />
            ) : (
              <Menu className="w-6 h-6 text-green-600" />
            )}
          </button>
        </div>

        {/* القائمة المنسدلة - للموبايل */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-green-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              
              {/* أيقونات التطبيقات */}
              {/* تم حذف أيقونات جوجل بلاي وأبل ستور من القائمة المنسدلة */}

              {/* القائمة الرئيسية */}
              <nav className="space-y-2">
                <Link 
                  to="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${
                    isActive('/') 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-green-50'
                  }`}
                >
                  الرئيسية
                </Link>
                
                <Link 
                  to="/packages" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${
                    isActive('/packages') 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-green-50'
                  }`}
                >
                  الباقات
                </Link>
                
                <Link 
                  to="/services" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${
                    isActive('/services') 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-green-50'
                  }`}
                >
                  الخدمات
                </Link>
                
                <Link 
                  to="/about" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${
                    isActive('/about') 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-green-50'
                  }`}
                >
                  من نحن
                </Link>
                
                <Link 
                  to="/contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${
                    isActive('/contact') 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-green-50'
                  }`}
                >
                  اتصل بنا
                </Link>
              </nav>

              {/* أزرار تسجيل الدخول وإنشاء الحساب */}
              <div className="space-y-3 pt-4 border-t border-green-200">
                      <Link 
                  to="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full bg-white border-2 border-green-600 text-green-600 font-bold text-center px-6 py-3 rounded-xl hover:bg-green-50 transition-colors"
                >
                  تسجيل الدخول
                      </Link>
                
                      <Link 
                  to="/signup" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-center px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  إنشاء الحساب
                      </Link>
              </div>

              {/* معلومات إضافية */}
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-green-200">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold text-gray-700">4.9</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-gray-700">خدمة موثقة</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 
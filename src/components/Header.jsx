import React, { useState, useEffect } from 'react';
import { Car, Menu, X, User, Sparkles, Shield, Zap, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../useAuth';
import logo from '../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleItemClick = (itemName) => {
    // تأثير النقر على العنصر
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md ${
      isScrolled 
        ? 'bg-white/95 shadow-2xl border-b border-green-100' 
        : 'bg-white/90'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* شعار PayPass مع اللوجو */}
          <div 
            className="flex items-center gap-4 group cursor-pointer transform hover:scale-105 transition-all duration-300 active:scale-95"
            onClick={() => handleItemClick('Logo')}
            onMouseEnter={() => setHoveredItem('logo')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="relative">
              <img 
                src={logo} 
                alt="PayPass Logo" 
                className={`h-12 w-12 md:h-16 md:w-16 object-contain transition-all duration-300 ${
                  hoveredItem === 'logo' ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
                }`} 
              />
              <div className={`absolute inset-0 bg-green-500 rounded-full transition-all duration-300 ${
                hoveredItem === 'logo' ? 'opacity-30 scale-110' : 'opacity-0 scale-100'
              }`}></div>
            </div>
            <div>
              <span className={`text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent transition-all duration-300 ${
                hoveredItem === 'logo' ? 'from-green-700 to-green-900 scale-105' : ''
              }`}>
                PayPass
              </span>
              <div className="flex items-center gap-2 mt-1">
                <Sparkles className={`h-3 w-3 md:h-4 md:w-4 text-green-600 transition-all duration-300 ${
                  hoveredItem === 'logo' ? 'animate-spin scale-110' : 'animate-pulse'
                }`} />
                <span className={`text-xs md:text-sm text-green-600 font-semibold transition-all duration-300 ${
                  hoveredItem === 'logo' ? 'text-green-700 scale-105' : ''
                }`}>غسيل السيارات الذكي</span>
                <Shield className={`h-3 w-3 md:h-4 md:w-4 text-green-600 transition-all duration-300 ${
                  hoveredItem === 'logo' ? 'scale-110 rotate-12' : 'rotate-0'
                }`} />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4">
            <Link 
              to="/" 
              className="relative text-gray-700 hover:text-green-600 transition-all duration-300 font-semibold text-sm md:text-base py-3 px-4 rounded-xl hover:bg-green-50 group transform hover:scale-105 active:scale-95 cursor-pointer"
              onClick={() => handleItemClick('الرئيسية')}
              onMouseEnter={() => setHoveredItem('home')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>الرئيسية</span>
                <div className={`w-2 h-2 bg-green-500 rounded-full transition-all duration-300 ${
                  hoveredItem === 'home' ? 'scale-150 animate-pulse' : 'scale-100'
                }`}></div>
              </span>
              <div className={`absolute inset-0 bg-green-100 rounded-xl transition-all duration-300 ${
                hoveredItem === 'home' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}></div>
            </Link>
            
            <Link 
              to="/services" 
              className="relative text-gray-700 hover:text-green-600 transition-all duration-300 font-semibold text-sm md:text-base py-3 px-4 rounded-xl hover:bg-green-50 group transform hover:scale-105 active:scale-95 cursor-pointer"
              onClick={() => handleItemClick('الخدمات')}
              onMouseEnter={() => setHoveredItem('services')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>الخدمات</span>
                <div className={`w-2 h-2 bg-green-500 rounded-full transition-all duration-300 ${
                  hoveredItem === 'services' ? 'scale-150 animate-pulse' : 'scale-100'
                }`}></div>
              </span>
              <div className={`absolute inset-0 bg-green-100 rounded-xl transition-all duration-300 ${
                hoveredItem === 'services' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}></div>
            </Link>
            
            <Link 
              to="/packages" 
              className="relative text-gray-700 hover:text-green-600 transition-all duration-300 font-semibold text-sm md:text-base py-3 px-4 rounded-xl hover:bg-green-50 group transform hover:scale-105 active:scale-95 cursor-pointer"
              onClick={() => handleItemClick('الباقات')}
              onMouseEnter={() => setHoveredItem('packages')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>الباقات</span>
                <div className={`w-2 h-2 bg-green-500 rounded-full transition-all duration-300 ${
                  hoveredItem === 'packages' ? 'scale-150 animate-pulse' : 'scale-100'
                }`}></div>
              </span>
              <div className={`absolute inset-0 bg-green-100 rounded-xl transition-all duration-300 ${
                hoveredItem === 'packages' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}></div>
            </Link>
            
            <Link 
              to="/about-us" 
              className="relative text-gray-700 hover:text-green-600 transition-all duration-300 font-semibold text-sm md:text-base py-3 px-4 rounded-xl hover:bg-green-50 group transform hover:scale-105 active:scale-95 cursor-pointer"
              onClick={() => handleItemClick('من نحن')}
              onMouseEnter={() => setHoveredItem('about')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>من نحن</span>
                <div className={`w-2 h-2 bg-green-500 rounded-full transition-all duration-300 ${
                  hoveredItem === 'about' ? 'scale-150 animate-pulse' : 'scale-100'
                }`}></div>
              </span>
              <div className={`absolute inset-0 bg-green-100 rounded-xl transition-all duration-300 ${
                hoveredItem === 'about' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}></div>
            </Link>
            
            <Link 
              to="/contact" 
              className="relative text-gray-700 hover:text-green-600 transition-all duration-300 font-semibold text-sm md:text-base py-3 px-4 rounded-xl hover:bg-green-50 group transform hover:scale-105 active:scale-95 cursor-pointer"
              onClick={() => handleItemClick('اتصل بنا')}
              onMouseEnter={() => setHoveredItem('contact')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>اتصل بنا</span>
                <div className={`w-2 h-2 bg-green-500 rounded-full transition-all duration-300 ${
                  hoveredItem === 'contact' ? 'scale-150 animate-pulse' : 'scale-100'
                }`}></div>
              </span>
              <div className={`absolute inset-0 bg-green-100 rounded-xl transition-all duration-300 ${
                hoveredItem === 'contact' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}></div>
            </Link>
            
            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {isAuth ? (
                <>
                  <Link 
                    to="/profile" 
                    className="btn btn-primary flex items-center gap-2 text-sm transform hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    onClick={() => handleItemClick('الملف الشخصي')}
                    onMouseEnter={() => setHoveredItem('profile')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <User className={`h-4 w-4 transition-all duration-300 ${
                      hoveredItem === 'profile' ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
                    }`} />
                    <span className="hidden md:inline">الملف الشخصي</span>
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); handleItemClick('تسجيل الخروج'); }} 
                    className="btn bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 text-sm transform hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredItem('logout')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <span className="hidden md:inline">تسجيل الخروج</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/signup" 
                    className="btn bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 text-sm transform hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    onClick={() => handleItemClick('إنشاء حساب')}
                    onMouseEnter={() => setHoveredItem('signup')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Zap className={`h-4 w-4 transition-all duration-300 ${
                      hoveredItem === 'signup' ? 'scale-110 animate-pulse' : 'scale-100'
                    }`} />
                    <span className="hidden md:inline">إنشاء حساب</span>
                  </Link>
                  <Link 
                    to="/login" 
                    className="btn btn-primary flex items-center gap-2 text-sm transform hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    onClick={() => handleItemClick('تسجيل الدخول')}
                    onMouseEnter={() => setHoveredItem('login')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <User className={`h-4 w-4 transition-all duration-300 ${
                      hoveredItem === 'login' ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
                    }`} />
                    <span className="hidden md:inline">تسجيل الدخول</span>
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => { toggleMenu(); handleItemClick('Menu'); }}
            className="lg:hidden p-3 rounded-2xl bg-green-50 hover:bg-green-100 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
            onMouseEnter={() => setHoveredItem('menu')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 text-primary transition-all duration-300 ${
                hoveredItem === 'menu' ? 'scale-110 rotate-90' : 'scale-100 rotate-0'
              }`} />
            ) : (
              <Menu className={`h-6 w-6 text-primary transition-all duration-300 ${
                hoveredItem === 'menu' ? 'scale-110' : 'scale-100'
              }`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mb-4 animate-slide-down">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
              <nav className="flex flex-col p-6">
                <Link 
                  to="/" 
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-green-50 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer" 
                  onClick={() => { closeMenu(); handleItemClick('الرئيسية'); }}
                >
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-lg font-semibold text-gray-700">الرئيسية</span>
                </Link>
                <Link 
                  to="/services" 
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-green-50 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer" 
                  onClick={() => { closeMenu(); handleItemClick('الخدمات'); }}
                >
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-lg font-semibold text-gray-700">الخدمات</span>
                </Link>
                <Link 
                  to="/packages" 
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-green-50 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer" 
                  onClick={() => { closeMenu(); handleItemClick('الباقات'); }}
                >
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-lg font-semibold text-gray-700">الباقات</span>
                </Link>
                <Link 
                  to="/about-us" 
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-green-50 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer" 
                  onClick={() => { closeMenu(); handleItemClick('من نحن'); }}
                >
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-lg font-semibold text-gray-700">من نحن</span>
                </Link>
                <Link 
                  to="/contact" 
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-green-50 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer" 
                  onClick={() => { closeMenu(); handleItemClick('اتصل بنا'); }}
                >
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-lg font-semibold text-gray-700">اتصل بنا</span>
                </Link>
                {/* Mobile Auth Buttons */}
                <div className="pt-4 border-t border-gray-200">
                  {isAuth ? (
                    <>
                      <Link 
                        to="/profile" 
                        className="btn btn-primary flex items-center gap-3 mb-3 w-full justify-center transform hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer" 
                        onClick={() => { closeMenu(); handleItemClick('الملف الشخصي'); }}
                      >
                        <User className="h-5 w-5" />
                        <span>الملف الشخصي</span>
                      </Link>
                      <button 
                        onClick={() => { handleLogout(); closeMenu(); handleItemClick('تسجيل الخروج'); }} 
                        className="btn bg-red-600 hover:bg-red-700 text-white w-full justify-center transform hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                      >
                        <span>تسجيل الخروج</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login" 
                        className="btn btn-primary flex items-center gap-3 mb-3 w-full justify-center transform hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer" 
                        onClick={() => { closeMenu(); handleItemClick('تسجيل الدخول'); }}
                      >
                        <User className="h-5 w-5" />
                        <span>تسجيل الدخول</span>
                      </Link>
                      <Link 
                        to="/signup" 
                        className="btn bg-blue-600 hover:bg-blue-700 text-white w-full justify-center transform hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer" 
                        onClick={() => { closeMenu(); handleItemClick('إنشاء حساب'); }}
                      >
                        <Zap className="h-5 w-5" />
                        <span>إنشاء حساب</span>
                      </Link>
                    </>
                  )}
                </div>
                {/* Mobile Contact */}
                <div className="pt-4 border-t border-gray-200">
                  <a 
                    href="tel:+966568091983" 
                    className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 hover:bg-green-100 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
                    onClick={() => handleItemClick('اتصال')}
                  >
                    <Phone className="h-5 w-5 text-green-600 animate-pulse" />
                    <span className="text-green-700 font-semibold" dir="ltr">+966 56 890 9183</span>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 
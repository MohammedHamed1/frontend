import React, { useState, useEffect } from 'react';
import { Car, Menu, X, Download, Phone, User, ShoppingCart, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-green-100' 
        : 'bg-white shadow-md'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4 animate-fade-in-up">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-3 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
              <Car className="h-7 w-7 text-black" />
            </div>
            <div className="mr-2">
              <span className="text-2xl font-bold text-gray-900">PayPass</span>
              <div className="text-sm text-primary-600 font-medium mt-1">غسيل السيارات الذكي</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-12">
            <a href="#home" className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium relative group py-3 px-2" onClick={closeMenu}>الرئيسية</a>
            <a href="#services" className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium relative group py-3 px-2" onClick={closeMenu}>الخدمات</a>
            <a href="#packages" className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium relative group py-3 px-2" onClick={closeMenu}>الباقات</a>
            <a href="#branches" className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium relative group py-3 px-2" onClick={closeMenu}>الفروع</a>
            <a href="#contact" className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium relative group py-3 px-2" onClick={closeMenu}>اتصل بنا</a>
            <Link to="/login" className="text-green-700 hover:text-white bg-green-100 hover:bg-green-600 px-6 py-3 rounded-xl font-bold transition-all duration-300 ml-4 flex items-center gap-2"><User className="h-5 w-5" />تسجيل الدخول</Link>
          </nav>

    

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-3 hover:bg-gray-100 rounded-xl transition-colors" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? (
              <X className="h-7 w-7 text-primary-600" />
            ) : (
              <Menu className="h-7 w-7 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 border-t border-gray-200 animate-fade-in-up bg-white rounded-2xl shadow-xl">
            <nav className="flex flex-col space-y-3 mt-6 px-6">
              <a href="#home" className="text-gray-700 hover:text-primary-600 transition-colors font-medium py-4 px-6 rounded-xl hover:bg-primary-50 flex items-center gap-4 group" onClick={closeMenu}><span className="w-3 h-3 bg-primary-500 rounded-full group-hover:scale-125 transition-transform duration-200"></span><span className="text-lg">الرئيسية</span></a>
              <a href="#services" className="text-gray-700 hover:text-primary-600 transition-colors font-medium py-4 px-6 rounded-xl hover:bg-primary-50 flex items-center gap-4 group" onClick={closeMenu}><span className="w-3 h-3 bg-primary-500 rounded-full group-hover:scale-125 transition-transform duration-200"></span><span className="text-lg">الخدمات</span></a>
              <a href="#packages" className="text-gray-700 hover:text-primary-600 transition-colors font-medium py-4 px-6 rounded-xl hover:bg-primary-50 flex items-center gap-4 group" onClick={closeMenu}><span className="w-3 h-3 bg-primary-500 rounded-full group-hover:scale-125 transition-transform duration-200"></span><span className="text-lg">الباقات</span></a>
              <a href="#branches" className="text-gray-700 hover:text-primary-600 transition-colors font-medium py-4 px-6 rounded-xl hover:bg-primary-50 flex items-center gap-4 group" onClick={closeMenu}><span className="w-3 h-3 bg-primary-500 rounded-full group-hover:scale-125 transition-transform duration-200"></span><span className="text-lg">الفروع</span></a>
              <a href="#contact" className="text-gray-700 hover:text-primary-600 transition-colors font-medium py-4 px-6 rounded-xl hover:bg-primary-50 flex items-center gap-4 group" onClick={closeMenu}><span className="w-3 h-3 bg-primary-500 rounded-full group-hover:scale-125 transition-transform duration-200"></span><span className="text-lg">اتصل بنا</span></a>
              </nav>
         
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 
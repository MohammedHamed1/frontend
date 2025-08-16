import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Context Providers
import { AuthProvider } from './AuthContext';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomNav from './components/common/MobileBottomNav';

// Main Page Components
import Hero from './components/Hero';
import EnhancedPackagesSection from './components/EnhancedPackagesSection';
import ContactSection from './components/ContactSection';
import Stats from './components/Stats';
import BranchesComponent from './components/Branches';
import SingleBranch from './components/SingleBranch';
import Feedbacks from './components/Feedbacks';
import BranchesHeader from './components/BranchesHeader';
import BranchesMap from './components/BranchesMap';

// Utility Components
import { LoadingProvider } from './components/LoadingManager';
import PageTransitionLoader from './components/PageTransitionLoader';
import ModalManager from './components/ModalManager';
import AIAssistant from './components/AIAssistant';

// Page Components
import About from './pages/About';
import Services from './pages/Services';
import Packages from './pages/Packages';
import PackageDetails from './pages/PackageDetails';
import BranchesPage from './pages/Branches';
import WashProcess from './pages/WashProcess';
import VIPPackageDetails from './pages/VIPPackageDetails';
import VIPHotels from './pages/VIPHotels';
import Checkout from './pages/Checkout';
import VIPCheckout from './pages/VIPCheckout';
import PaymentSuccess from './pages/PaymentSuccess';
import VIPPaymentSuccess from './pages/VIPPaymentSuccess';
import VIPBranchSelection from './pages/VIPBranchSelection';
import BranchSelection from './pages/BranchSelection';
import WashingTracking from './pages/WashingTracking';
import WashingCompleted from './pages/WashingCompleted';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Support from './pages/Support';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Partners from './pages/Partners';
import Team from './pages/Team';
import Blog from './pages/Blog';
import News from './pages/News';
import Careers from './pages/Careers';
import Jobs from './pages/Jobs';
import AboutUs from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Sitemap from './pages/Sitemap';
import HelpCenter from './pages/HelpCenter';
import TechnicalSupport from './pages/TechnicalSupport';
import UserGuide from './pages/UserGuide';
import Guide from './pages/Guide';
import Complaints from './pages/Complaints';
import Certificates from './pages/Certificates';
import Loading from './pages/Loading';

// QR System Components
import AdvancedQRSystem from './components/AdvancedQRSystem';
import QRCodeScanner from './components/QRCodeScanner';
import QRDashboard from './pages/QRDashboard';
import TipSystem from './pages/TipSystem';
import Tracking from './pages/Tracking';

// QR System Utils
import { initializeQRSystem } from './utils/qrSystem';

// Import CSS
import './index.css';
import './green-theme.css';
import './mobile-optimizations.css';
import './components/common/styles.css';

// Loading Provider Component - Using imported LoadingProvider

function ProtectedRoute({ children }) {
  const isAuth = !!localStorage.getItem('isLoggedIn');
  return isAuth ? children : <Navigate to="/signin" replace />;
}

// مكون الصفحة الرئيسية الكاملة
function MainPage() {
  return (
    <>
      <Hero />
      <EnhancedPackagesSection />
      <div className="py-16 bg-gradient-to-br from-gray-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <button 
            className="bg-green-500 hover:bg-green-600 text-white font-bold text-xl px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={() => {
              // يمكن إضافة وظيفة الزر هنا
              console.log('تم النقر على زر شارك تجربتك');
            }}
          >
            شارك تجربتك واكسب
          </button>
        </div>
      </div>
      <Stats />
      <BranchesComponent />
      <Feedbacks />
      <BranchesHeader />
      <SingleBranch />
      <BranchesMap />
      <ContactSection />
    </>
  );
}

function App() {
  // تهيئة نظام QR عند تحميل التطبيق
  React.useEffect(() => {
    const initResult = initializeQRSystem();
    console.log('تم تهيئة نظام QR:', initResult);
  }, []);

  return (
    <AuthProvider>
      <LoadingProvider>
        <Router>
          <PageTransitionLoader>
            <div className="App">
              <ModalManager />
              <Header />
              <Routes>
                {/* Loading Route */}
                <Route path="/loading" element={<Loading />} />
                
                {/* Main Routes */}
                <Route path="/" element={<MainPage />} />
                
                {/* Package Routes */}
                <Route path="/packages" element={<Packages />} />
                <Route path="/package-details" element={<PackageDetails />} />
                <Route path="/vip-package-details" element={<VIPPackageDetails />} />
                <Route path="/vip-hotels" element={<VIPHotels />} />
                
                {/* Checkout Routes */}
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/vip-checkout" element={<VIPCheckout />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/vip-payment-success" element={<VIPPaymentSuccess />} />
                
                {/* Washing Process Routes */}
                <Route path="/branches" element={<BranchesPage />} />
                <Route path="/branch-selection" element={<BranchSelection />} />
                <Route path="/vip-branch-selection" element={<VIPBranchSelection />} />
                <Route path="/wash-process" element={<WashProcess />} />
                <Route path="/washing-tracking" element={<WashingTracking />} />
                <Route path="/washing-completed" element={<WashingCompleted />} />
                
                {/* Information Routes */}
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/support" element={<Support />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/technical-support" element={<TechnicalSupport />} />
                
                {/* User Routes */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                
                {/* Additional Routes */}
                <Route path="/partners" element={<Partners />} />
                <Route path="/team" element={<Team />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/news" element={<News />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/user-guide" element={<UserGuide />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="/complaints" element={<Complaints />} />
                <Route path="/certificates" element={<Certificates />} />
                
                {/* QR System Routes */}
                <Route path="/advanced-qr" element={<AdvancedQRSystem />} />
                <Route path="/qr-scanner" element={<QRCodeScanner />} />
                <Route path="/qr-dashboard" element={<QRDashboard />} />
                <Route path="/tip-system" element={<TipSystem />} />
                <Route path="/tracking/:operationId" element={<Tracking />} />
                

              </Routes>
              <Footer />
              <MobileBottomNav />
              <AIAssistant />
            </div>
          </PageTransitionLoader>
        </Router>
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;

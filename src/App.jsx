import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { LoadingProvider } from './components/LoadingManager';

// استيراد المكونات الأصلية
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import PackagesSection from './components/PackagesSection';
import Stats from './components/Stats';
import Branches from './components/Branches';
import Feedbacks from './components/Feedbacks';
import GoogleMap from './components/GoogleMap';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import PageTransitionLoader from './components/PageTransitionLoader';

// استيراد الصفحات
import ServicesPage from './pages/Services';
import Packages from './pages/Packages';
import Contact from './pages/Contact';
import About from './pages/About';
import Team from './pages/Team';
import Careers from './pages/Careers';
import News from './pages/News';
import Partners from './pages/Partners';
import FAQ from './pages/FAQ';
import HelpCenter from './pages/HelpCenter';
import TechnicalSupport from './pages/TechnicalSupport';
import Complaints from './pages/Complaints';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Support from './pages/Support';
import Guide from './pages/Guide';
import Jobs from './pages/Jobs';
import Blog from './pages/Blog';
import Certificates from './pages/Certificates';
import Awards from './components/Awards';
import Sitemap from './pages/Sitemap';


// استيراد مكونات إضافية
import Login from './components/Login';
import Signup from './components/Signup';
import Checkout from './components/Checkout';
import Payment from './components/Payment';
import UserProfile from './components/UserProfile';
import OrderHistory from './components/OrderHistory';
import PackageDetails from './components/PackageDetails';
import WashingPlaceDetails from './components/WashingPlaceDetails';
import ModalManager from './components/ModalManager';
import AIAssistant from './components/AIAssistant';

// استيراد الأنماط
import './App.css';
import './components/common/styles.css';

function ProtectedRoute({ children }) {
  const isAuth = !!localStorage.getItem('token');
  return isAuth ? children : <Navigate to="/login" replace />;
}

// مكون الصفحة الرئيسية الكاملة
function MainPage() {
  return (
    <>
      <Hero />
      <Services />
      <PackagesSection />
      <Stats />
      <Branches />
      <Feedbacks />
      <GoogleMap />
      <ContactSection />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <Router>
          <PageTransitionLoader>
            <div className="App">
              <ModalManager />
              <Header />
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/package/:id" element={<PackageDetails />} />
                <Route path="/package-details" element={<PackageDetails />} />
                <Route path="/washing-place/:id" element={<WashingPlaceDetails />} />
                <Route path="/barcode" element={<WashingPlaceDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/news" element={<News />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/technical-support" element={<TechnicalSupport />} />
                <Route path="/complaints" element={<Complaints />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/support" element={<Support />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="/user-guide" element={<Guide />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/awards" element={<Awards />} />
                <Route path="/sitemap" element={<Sitemap />} />
              </Routes>
              <Footer />
              <AIAssistant />
            </div>
          </PageTransitionLoader>
        </Router>
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;

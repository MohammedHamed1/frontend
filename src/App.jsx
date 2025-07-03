import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Packages from './components/Packages'
import Branches from './components/Branches'
import Contact from './components/Contact'
import Checkout from './components/Checkout'
import Payment from './components/Payment'
import Login from './components/Login'
import Signup from './components/Signup'
import Feedbacks from './components/Feedbacks'
import UserProfile from './components/UserProfile'
import OrderHistory from './components/OrderHistory'
import './App.css'

function MainPage() {
  return (
    <>
      <Hero />
      <Services />
      <Packages />
      <Branches />
      <Feedbacks />
      <Contact />
    </>
  )
}

function ProtectedRoute({ children }) {
  const isAuth = !!localStorage.getItem('token');
  return isAuth ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/orders" element={<OrderHistory />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

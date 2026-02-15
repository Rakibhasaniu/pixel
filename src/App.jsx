import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { initPixel, trackPageView } from './utils/pixel';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import './App.css';

// Component to track page views on route changes
function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    // Track PageView event whenever the route changes
    trackPageView();
  }, [location]);

  return null;
}

function App() {
  useEffect(() => {
    // Initialize Facebook Pixel when the app loads
    initPixel();
  }, []);

  return (
    <Router>
      <CartProvider>
        <PageViewTracker />
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;

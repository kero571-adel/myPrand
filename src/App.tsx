import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './lib/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import TerminalPage from './pages/TerminalPage';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div
          className="min-h-screen bg-[#050a05] text-[#c8d8c8]"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/collections/:id" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/terminal" element={<TerminalPage />} />
            <Route path="/archive" element={<CollectionsPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

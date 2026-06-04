import { LazyMotion, domAnimation } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CartProvider } from "./lib/CartContext";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./lib/AuthContext";
import Loader from "./components/Loader";

const CollectionsPage = lazy(() => import("./pages/CollectionsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const OrdersPage = lazy(() => import("./pages/ordersPage"));
const TerminalPage = lazy(() => import("./pages/TerminalPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ContactPage = lazy(() => import("./pages/Contact"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
// Loading Fallback Component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050a05]">
      <Loader />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <LazyMotion features={domAnimation}>
            <div
              className="min-h-screen bg-[#050a05] text-[#c8d8c8]"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              <Navbar />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />

                  <Route path="/collections" element={<CollectionsPage />} />

                  <Route
                    path="/collections/:id"
                    element={<ProductDetailPage />}
                  />

                  <Route path="/checkout" element={<CheckoutPage />} />

                  <Route path="/orders" element={<OrdersPage />} />

                  <Route path="/terminal" element={<TerminalPage />} />

                  <Route path="/login" element={<AuthPage />} />

                  <Route path="/contact" element={<ContactPage />} />

                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </div>
          </LazyMotion>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

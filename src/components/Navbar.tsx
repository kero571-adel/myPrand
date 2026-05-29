import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, LogOut } from "lucide-react";
import { useCart } from "../lib/CartContext";
import { useAuth } from "../lib/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "COLLECTIONS", path: "/collections" },
  { label: "ORDERS", path: "/orders" },
  { label: "TERMINAL", path: "/terminal" },
  { label: "CONTACT US", path: "/contact" },
];

function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 10 }}
          onClick={(e) => e.stopPropagation()}
          className="border border-[#1a2e1a] bg-[#080d08] p-4 sm:p-6 max-w-sm w-full rounded-sm shadow-[0_0_30px_rgba(0,255,0,0.1)]"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <LogOut size={16} className="text-[#ff5f57]" />
            <h3 className="text-[#00FF00] text-sm font-bold">{title}</h3>
          </div>
          
          <p className="text-[#5a7a5a] text-xs whitespace-pre-line mb-6">
            {message}
          </p>
          
          <div className="flex gap-3 justify-end">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-xs border border-[#1a2e1a] text-[#5a7a5a] hover:text-white hover:border-[#5a7a5a] transition-colors"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              CANCEL
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-xs bg-[#ff5f57]/20 border border-[#ff5f57] text-[#ff5f57] hover:bg-[#ff5f57]/30 transition-colors"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              CONFIRM_LOGOUT
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Navbar() {
  const location = useLocation();
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // 🔽 حالة الـ dialog
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  // 🔽 دالة معالجة تسجيل الخروج مع التأكيد
  const handleLogout = async () => {
    await logout();
    navigate("/");
    setShowLogoutConfirm(false);
  };

  const handleAuthClick = () => {
    if (user) {
      // 🔐 بدلاً من logout مباشر، اعرض رسالة التأكيد
      setShowLogoutConfirm(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a2e1a] bg-[#050a05]/90 backdrop-blur-sm">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-1 font-bold text-lg tracking-widest"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              <span className="text-[#00FF00] text-xl">&gt;</span>
              <span
                className="text-[#00FF00] text-base sm:text-lg"
                style={{ textShadow: "0 0 10px rgba(0,255,0,0.8)" }}
              >
                DCTOH
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-xs tracking-widest transition-all duration-200 pb-0.5 ${
                    isActive(link.path)
                      ? "text-[#00FF00] border-b border-[#00FF00]"
                      : "text-[#8aaa8a] hover:text-[#00FF00]"
                  }`}
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              {/* Auth Button */}
              <button
                onClick={handleAuthClick}
                className="hidden md:flex items-center gap-1.5 text-xs tracking-widest border border-[#1a2e1a] px-3 py-1.5 text-[#5a7a5a] hover:border-[#00FF00] hover:text-[#00FF00] transition-all duration-200"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                {user ? (
                  <>
                    <span className="text-[#00FF00]">■</span> LOGOUT_()
                  </>
                ) : (
                  <>
                    <span className="text-[#00FF00]">▶</span> LOGIN_()
                  </>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={handleCartClick}
                className="relative text-[#5a7a5a] hover:text-[#00FF00] transition-colors"
              >
                <ShoppingCart size={18} />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#00FF00] text-[#050a05] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="md:hidden text-[#5a7a5a] hover:text-[#00FF00] transition-colors"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#1a2e1a] bg-[#050a05]">
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`text-xs tracking-widest py-2 border-b border-[#0f1a0f] transition-colors ${
                    isActive(link.path)
                      ? "text-[#00FF00]"
                      : "text-[#8aaa8a] hover:text-[#00FF00]"
                  }`}
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={(e) => {
                  handleCartClick(e);
                  setMenuOpen(false);
                }}
                className="text-xs tracking-widest py-2 text-[#8aaa8a] hover:text-[#00FF00] text-left"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                CART [{count}]
              </button>

              {/* Mobile Auth Button */}
              <button
                onClick={() => {
                  handleAuthClick();
                  setMenuOpen(false);
                }}
                className="text-xs tracking-widest py-2 border-t border-[#1a2e1a] text-left transition-colors flex items-center gap-2"
                style={{
                  fontFamily: "'Fira Code', monospace",
                  color: user ? "#ff5f57" : "#00FF00",
                }}
              >
                <span>{user ? "■" : "▶"}</span>
                {user ? "LOGOUT_()" : "LOGIN_()"}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 🔽 Confirmation Dialog for Logout */}
      <ConfirmDialog
        open={showLogoutConfirm}
        title="⚠️ CONFIRM_LOGOUT"
        message="Are you sure you want to end your session?"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </>
  );
}
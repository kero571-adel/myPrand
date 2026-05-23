import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../lib/CartContext";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "COLLECTIONS", path: "/collections" },
  { label: "ORDERS", path: "/orders" },
  { label: "TERMINAL", path: "/terminal" },
];

export default function Navbar() {
  const location = useLocation();
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
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
              STYL_
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
            <Link
              to="/checkout"
              className="relative text-[#5a7a5a] hover:text-[#00FF00] transition-colors"
            >
              <ShoppingCart size={18} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#00FF00] text-[#050a05] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <button
              className="md:hidden text-[#5a7a5a] hover:text-[#00FF00] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
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
            <Link
              to="/checkout"
              onClick={() => setMenuOpen(false)}
              className="text-xs tracking-widest py-2 text-[#8aaa8a] hover:text-[#00FF00]"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              CART [{count}]
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

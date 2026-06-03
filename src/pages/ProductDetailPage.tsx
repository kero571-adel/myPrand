import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Zap,
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import CodeBlock from "../components/CodeBlock";
import Footer from "../components/Footer";
import { getProductById } from "../lib/products";
import { useCart } from "../lib/CartContext";
import { useAuth } from "../lib/AuthContext";
import { Helmet } from "react-helmet-async";

// local selection: { size -> quantity }
type SizeSelection = Record<string, number>;

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = getProductById(id ?? "");
  const { user } = useAuth();
  const [activeImage, setActiveImage] = useState(0);
  const [selection, setSelection] = useState<SizeSelection>({});
  const [justAdded, setJustAdded] = useState(false);

  if (!product) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-[#050a05]"
        style={{ fontFamily: "'Fira Code', monospace" }}
      >
        <div className="text-center text-[#00FF00]">
          <div className="text-6xl mb-4">404</div>
          <div className="text-sm text-[#5a7a5a]">
            // Asset not found in registry
          </div>
          <button
            onClick={() => navigate("/collections")}
            className="text-white mt-6 neon-btn-outline px-6 py-2 text-xs border border-[#00FF00]"
          >
            cd ../collections
          </button>
        </div>
      </div>
    );
  }

  const specLines = Object.entries(product.specs).map(([key, value]) => ({
    key,
    value,
  }));

  const totalUnits = Object.values(selection).reduce((s, q) => s + q, 0);
  const totalPrice = Object.entries(selection).reduce(
    (s, [, q]) => s + product.price * q,
    0
  );

  // ── Local size controls (no cart interaction) ────────────────
  const increment = (size: string) => {
    setSelection((prev) => {
      const current = prev[size] ?? 0;
      if (current >= 10) return prev;
      return { ...prev, [size]: current + 1 };
    });
  };

  const decrement = (size: string) => {
    setSelection((prev) => {
      const current = prev[size] ?? 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[size];
        return next;
      }
      return { ...prev, [size]: current - 1 };
    });
  };

  // ── Add all selected sizes to cart at once ───────────────────
  const handleAddToCart = () => {
    if (totalUnits === 0) return;
    Object.entries(selection).forEach(([size, qty]) => {
      addItem(product, size, qty);
    });
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setSelection({});
    }, 2000);
  };
  // ── Buy now: add to cart then go to checkout ─────────────────
  const handleBuyNow = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (totalUnits === 0) {
      addItem(product, "M", 1);
    } else {
      Object.entries(selection).forEach(([size, qty]) => {
        addItem(product, size, qty);
      });
      setSelection({});
    }
    navigate("/checkout");
  };
  const productUrl = `https://dctoh.vercel.app/collections/${product.id}`;
  return (
    <>
      <Helmet>
        <title>{product.name} | DCTOH</title>

        <meta name="description" content={product.longDescription} />

        <meta
          name="keywords"
          content={`${product.name}, developer clothing, programmer fashion, cyberpunk streetwear`}
        />

        <link rel="canonical" href={productUrl} />

        <meta property="og:title" content={`${product.name} | DCTOH`} />

        <meta property="og:description" content={product.longDescription} />

        <meta property="og:image" content={product.images[0]} />

        <meta property="og:url" content={productUrl} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#050a05] grid-bg">
        <main className="flex-1 pt-14">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Breadcrumb */}
            <button
              onClick={() => navigate("/collections")}
              className="flex items-center gap-2 text-white hover:text-[#00FF00] text-xs mb-6 transition-colors"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              <ArrowLeft size={14} />
              cd ../collections
            </button>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* LEFT: Image Panel */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2 xl:w-5/12"
              >
                <div
                  className="border border-[#1a2e1a] bg-[#080d08] rounded-sm overflow-hidden"
                  style={{ boxShadow: "0 0 20px rgba(0,255,0,0.08)" }}
                >
                  <div className="flex items-center justify-between px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 border-b border-[#1a2e1a] bg-[#0a0f0a] flex-wrap gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex gap-1 sm:gap-1.5">
                        <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#febc2e]" />
                        <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#28c840]" />
                      </div>
                      <span className="text-[#5a7a5a] text-[8px] sm:text-[10px] md:text-xs whitespace-nowrap">
                        VIEW_PORT.exe
                      </span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                      <span className="text-[#3a5a3a] text-[7px] sm:text-[10px] md:text-xs whitespace-nowrap truncate">
                        ID: {product.assetId.replace(".exe", "")}
                      </span>
                      <span className="text-[#00FF00] text-[7px] sm:text-[10px] md:text-xs whitespace-nowrap flex-shrink-0">
                        ■ ACTIVE
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute top-2 left-2 z-10 text-[9px] text-[#00FF00] bg-[#050a05]/80 px-1.5 py-0.5 border border-[#1a3a1a]">
                      [CAM_01_ACTIVE]
                    </div>
                    <div className="absolute top-2 right-2 z-10 text-[9px] text-[#00FF00] bg-[#050a05]/80 px-1.5 py-0.5 border border-[#1a3a1a]">
                      RES: 4K_NATIVE
                    </div>
                    <div className="aspect-[4/5] overflow-hidden bg-[#080d08] relative">
                      <img
                        src={product.images[activeImage]}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none opacity-15"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
                        }}
                      />
                    </div>
                    <div className="absolute bottom-2 right-2 text-[9px] text-[#00FF00]">
                      ⊙
                    </div>
                  </div>

                  <div className="flex gap-2 p-3 border-t border-[#1a2e1a] bg-[#0a0f0a]">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`w-14 h-14 sm:w-16 sm:h-16 border overflow-hidden flex-shrink-0 transition-all ${
                          activeImage === i
                            ? "border-[#00FF00]"
                            : "border-[#1a2e1a] opacity-50 hover:opacity-80"
                        }`}
                      >
                        <img
                          src={img}
                          loading="lazy"
                          alt={`view ${i}`}
                          className="w-full h-full object-cover grayscale"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* RIGHT: Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-full lg:w-1/2 xl:w-7/12 flex flex-col gap-5"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                {/* Title */}
                <div>
                  <h1
                    className="text-md md:text-2xl lg:text-3xl  font-bold text-white leading-tight mb-2 break-words"
                    style={{ textShadow: "0 0 20px rgba(255,255,255,0.1)" }}
                  >
                    {product.name}
                  </h1>
                  <div className="text-[#00FF00] text-[10px] sm:text-xs md:text-sm tracking-widest overflow-hidden">
                    &gt; STYL_SYS {product.version}
                  </div>
                </div>

                {/* Price & Status */}
                <div className="flex items-center gap-4 flex-wrap">
                  <span
                    className="text-3xl font-bold text-white"
                    style={{ textShadow: "0 0 10px rgba(255,255,255,0.2)" }}
                  >
                    {product.price}.00
                  </span>
                  <span
                    className={`text-xs px-3 py-1 border ${
                      product.status === "IN_STOCK"
                        ? "border-[#00FF00]/50 text-[#00FF00] bg-[#00FF00]/10"
                        : "border-[#ff6b00]/50 text-[#ff6b00] bg-[#ff6b00]/10"
                    }`}
                  >
                    STATUS: {product.status}
                  </span>
                </div>

                {/* Specs */}
                <CodeBlock
                  title="COMPONENT_SPECS.json"
                  filename="specs.json"
                  showDots={false}
                  lines={specLines}
                />

                {/* ── Size selector (local state only — not cart) ── */}
                <div>
                  <div className="text-[#5a7a5a] text-xs mb-3 tracking-wider">
                    VAR SIZES[]
                    {totalUnits > 0 && (
                      <span className="text-[#3a5a3a] ml-3">
                        // {totalUnits} unit{totalUnits !== 1 ? "s" : ""}{" "}
                        selected — {totalPrice}.00
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => {
                      const qty = selection[size] ?? 0;
                      const active = qty > 0;

                      return (
                        <div
                          key={size}
                          className={`flex items-center border transition-all duration-150 ${
                            active
                              ? "border-[#00FF00] bg-[#0a1a0a]"
                              : "border-[#1a2e1a] bg-[#080d08]"
                          }`}
                        >
                          {/* decrement / remove */}
                          <AnimatePresence>
                            {active && (
                              <motion.button
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 28, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                onClick={() => decrement(size)}
                                className="h-10 flex items-center justify-center text-[#5a7a5a] hover:text-red-400 transition-colors border-r border-[#1a2e1a] overflow-hidden flex-shrink-0"
                              >
                                {qty === 1 ? (
                                  <Trash2 size={10} />
                                ) : (
                                  <Minus size={10} />
                                )}
                              </motion.button>
                            )}
                          </AnimatePresence>

                          {/* size label — click to add 1 */}
                          <button
                            onClick={() => increment(size)}
                            className={`w-10 h-10 text-xs font-bold transition-colors flex-shrink-0 ${
                              active
                                ? "text-[#00FF00]"
                                : "text-[#5a7a5a] hover:text-[#00FF00]"
                            }`}
                          >
                            {size}
                          </button>

                          {/* qty display + increment */}
                          <AnimatePresence>
                            {active && (
                              <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 56, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="flex items-center overflow-hidden flex-shrink-0"
                              >
                                <span className="w-6 text-center text-[#00FF00] text-[10px] font-bold border-l border-[#1a2e1a]">
                                  {qty}
                                </span>
                                <button
                                  onClick={() => increment(size)}
                                  disabled={qty >= 10}
                                  className="w-7 h-10 flex items-center justify-center text-[#5a7a5a] hover:text-[#00FF00] hover:bg-[#0a2a0a] transition-colors border-l border-[#1a2e1a] disabled:opacity-30"
                                >
                                  <Plus size={10} />
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-2 text-[10px] text-[#2a4a2a]">
                    // select a size and quantity, then press addToCart
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={totalUnits === 0}
                    className={`w-full flex items-center justify-center gap-2 sm:gap-3 rounded-sm transition-all ${
                      totalUnits === 0
                        ? "opacity-30 cursor-not-allowed neon-btn"
                        : justAdded
                        ? "bg-[#00cc00] text-[#050a05]"
                        : "neon-btn"
                    }`}
                    style={{
                      padding: "clamp(12px, 2.5vw, 16px)",
                      fontSize: "clamp(11px, 1.5vw, 14px)",
                      fontWeight: "bold",
                      letterSpacing: "0.1em",
                    }}
                  >
                    <ShoppingCart size={16} />
                    <span className="truncate">
                      {justAdded
                        ? `${totalUnits} UNIT${
                            totalUnits !== 1 ? "S" : ""
                          } ADDED ✓`
                        : totalUnits === 0
                        ? `addToCart(${product.shortName})`
                        : `addToCart(${
                            product.shortName
                          }) — ${totalUnits} unit${
                            totalUnits !== 1 ? "s" : ""
                          }`}
                    </span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBuyNow}
                    disabled={totalUnits === 0 || justAdded === true}
                    className={`w-full py-3.5 text-sm font-bold tracking-widest flex items-center justify-center gap-3 rounded-sm neon-btn-outline border border-[#00FF00] ${
                      totalUnits === 0 || justAdded === true
                        ? "opacity-30 cursor-not-allowed neon-btn"
                        : justAdded
                        ? "bg-[#00cc00] text-[#050a05]"
                        : "neon-btn"
                    }`}
                  >
                    <Zap size={16} />
                    executeOrder()
                  </motion.button>
                </div>

                {/* Description */}
                <div className="border border-[#1a2e1a] bg-[#080d08] p-4 text-xs text-[#5a7a5a] leading-relaxed">
                  <div className="text-[#3a5a3a] mb-2">// DESCRIPTION</div>
                  {product.longDescription}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 text-[10px]">
                  {[
                    "CYBERPUNK",
                    "STREETWEAR",
                    "DEVELOPER",
                    product.category.toUpperCase(),
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 border border-[#1a2e1a] text-[#3a5a3a] hover:text-[#00FF00] hover:border-[#00FF00]/30 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
          {/* Mobile checkout CTA */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[#1a2e1a] bg-[#050a05]/95 backdrop-blur-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-[#00FF00] text-[10px] tracking-wider"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                &gt; STATUS: COMPILED
              </span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full neon-btn py-3 rounded-sm text-xs font-bold tracking-widest"
            >
              EXEC_CHECKOUT()
            </button>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

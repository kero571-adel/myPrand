import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Zap, ArrowLeft, Plus, Minus, Trash2 } from "lucide-react";
import CodeBlock from "../components/CodeBlock";
import Footer from "../components/Footer";
import { getProductById } from "../lib/products";
import { useCart } from "../lib/CartContext";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, removeItem, updateQuantity, items } = useCart();
  const product = getProductById(id ?? "");

  const [activeImage, setActiveImage] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-[#050a05]"
        style={{ fontFamily: "'Fira Code', monospace" }}
      >
        <div className="text-center text-[#00FF00]">
          <div className="text-6xl mb-4">404</div>
          <div className="text-sm text-[#5a7a5a]">// Asset not found in registry</div>
          <button
            onClick={() => navigate("/collections")}
            className="mt-6 neon-btn-outline px-6 py-2 text-xs border border-[#00FF00]"
          >
            cd ../collections
          </button>
        </div>
      </div>
    );
  }

  const specLines = Object.entries(product.specs).map(([key, value]) => ({ key, value }));

  // all cart entries for THIS product across all sizes
  const cartEntriesForProduct = items.filter((i) => i.id === product.id);

  // helper: get qty in cart for a specific size
  const qtyInCart = (size: string) =>
    cartEntriesForProduct.find((i) => i.size === size)?.quantity ?? 0;

  // total units + total price for this product across all sizes
  const totalUnits = cartEntriesForProduct.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = cartEntriesForProduct.reduce((s, i) => s + i.price * i.quantity, 0);

  // per-size controls
  const handleIncrement = (size: string) => {
    const current = qtyInCart(size);
    if (current === 0) {
      addItem(product, size, 1);
    } else if (current < 10) {
      updateQuantity(product.id, size, current + 1);
    }
  };

  const handleDecrement = (size: string) => {
    const current = qtyInCart(size);
    if (current > 0) {
      updateQuantity(product.id, size, current - 1); // removes at 0
    }
  };

  const handleBuyNow = () => {
    // if nothing selected yet, add size M qty 1 as default
    if (totalUnits === 0) addItem(product, "M", 1);
    navigate("/checkout");
  };

  const handleAddToCart = () => {
    if (totalUnits === 0) return;
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050a05] grid-bg">
      <main className="flex-1 pt-14">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

          {/* Breadcrumb */}
          <button
            onClick={() => navigate("/collections")}
            className="flex items-center gap-2 text-[#3a5a3a] hover:text-[#00FF00] text-xs mb-6 transition-colors"
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
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#1a2e1a] bg-[#0a0f0a]">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="text-[#5a7a5a] text-[10px]">VIEW_PORT.exe</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#3a5a3a] text-[10px]">
                      ID: {product.assetId.replace(".exe", "")}
                    </span>
                    <span className="text-[#00FF00] text-[10px]">■ ACTIVE</span>
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
                  <div className="absolute bottom-2 left-2 text-[9px] text-[#00FF00] leading-tight">
                    X: 38.6°<br />Y: 12.0°
                  </div>
                  <div className="absolute bottom-2 right-2 text-[9px] text-[#00FF00]">⊙</div>
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
                      <img src={img} alt={`view ${i}`} className="w-full h-full object-cover grayscale" />
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
                  className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-2"
                  style={{ textShadow: "0 0 20px rgba(255,255,255,0.1)" }}
                >
                  {product.name}
                </h1>
                <div className="text-[#00FF00] text-xs tracking-widest">
                  &gt; STYL_SYS {product.version}
                </div>
              </div>

              {/* Price & Status */}
              <div className="flex items-center gap-4 flex-wrap">
                <span
                  className="text-3xl font-bold text-white"
                  style={{ textShadow: "0 0 10px rgba(255,255,255,0.2)" }}
                >
                  ${product.price}.00
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

              {/* ── Size selector — each size is independent ── */}
              <div>
                <div className="text-[#5a7a5a] text-xs mb-3 tracking-wider">
                  VAR SIZES[]
                  {totalUnits > 0 && (
                    <span className="text-[#3a5a3a] ml-3">
                      // {totalUnits} unit{totalUnits !== 1 ? "s" : ""} selected — ${totalPrice}.00
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const qty = qtyInCart(size);
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
                              onClick={() => handleDecrement(size)}
                              className="h-10 flex items-center justify-center text-[#5a7a5a] hover:text-red-400 transition-colors border-r border-[#1a2e1a] overflow-hidden flex-shrink-0"
                            >
                              {qty === 1 ? <Trash2 size={10} /> : <Minus size={10} />}
                            </motion.button>
                          )}
                        </AnimatePresence>

                        {/* size label */}
                        <button
                          onClick={() => handleIncrement(size)}
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
                                onClick={() => handleIncrement(size)}
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
                  // tap a size to add it — use +/- to adjust quantity per size
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={totalUnits === 0}
                  className={`w-full py-4 text-sm font-bold tracking-widest flex items-center justify-center gap-3 rounded-sm transition-all ${
                    totalUnits === 0
                      ? "opacity-30 cursor-not-allowed neon-btn"
                      : justAdded
                      ? "bg-[#00cc00] text-[#050a05]"
                      : "neon-btn"
                  }`}
                >
                  <ShoppingCart size={18} />
                  {justAdded
                    ? `${totalUnits} UNIT${totalUnits !== 1 ? "S" : ""} IN CART ✓`
                    : totalUnits === 0
                    ? `addToCart(${product.shortName})`
                    : `addToCart(${product.shortName}) — ${totalUnits} unit${totalUnits !== 1 ? "s" : ""}`}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  className="w-full py-3.5 text-sm font-bold tracking-widest flex items-center justify-center gap-3 rounded-sm neon-btn-outline border border-[#00FF00]"
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
                {["CYBERPUNK", "STREETWEAR", "DEVELOPER", product.category.toUpperCase()].map((tag) => (
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
      </main>
      <Footer />
    </div>
  );
}
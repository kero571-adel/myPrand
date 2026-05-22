import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap, ArrowLeft } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import Footer from '../components/Footer';
import { getProductById } from '../lib/products';
import { useCart } from '../lib/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = getProductById(id ?? '');

  const [selectedSize, setSelectedSize] = useState('M');
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

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
            onClick={() => navigate('/collections')}
            className="mt-6 neon-btn-outline px-6 py-2 text-xs border border-[#00FF00]"
          >
            cd ../collections
          </button>
        </div>
      </div>
    );
  }

  const specLines = Object.entries(product.specs).map(([key, value]) => ({ key, value }));

  const handleAddToCart = () => {
    addItem(product, selectedSize, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050a05] grid-bg">
      <main className="flex-1 pt-14">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <button
            onClick={() => navigate('/collections')}
            className="flex items-center gap-2 text-[#3a5a3a] hover:text-[#00FF00] text-xs mb-6 transition-colors"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            <ArrowLeft size={14} />
            cd ../collections
          </button>

          {/* Main layout */}
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
                style={{ boxShadow: '0 0 20px rgba(0,255,0,0.08)' }}
              >
                {/* Viewport Header */}
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
                      ID: {product.assetId.replace('.exe', '')}
                    </span>
                    <span className="text-[#00FF00] text-[10px]">■ ACTIVE</span>
                  </div>
                </div>

                {/* Main image area */}
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
                    {/* Scanlines */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-15"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
                      }}
                    />
                  </div>

                  <div className="absolute bottom-2 left-2 text-[9px] text-[#00FF00] leading-tight">
                    X: 38.6°
                    <br />
                    Y: 12.0°
                  </div>
                  <div className="absolute bottom-2 right-2 text-[9px] text-[#00FF00]">⊙</div>
                </div>

                {/* Thumbnail strip */}
                <div className="flex gap-2 p-3 border-t border-[#1a2e1a] bg-[#0a0f0a]">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-14 h-14 sm:w-16 sm:h-16 border overflow-hidden flex-shrink-0 transition-all ${
                        activeImage === i
                          ? 'border-[#00FF00]'
                          : 'border-[#1a2e1a] opacity-50 hover:opacity-80'
                      }`}
                    >
                      <img
                        src={img}
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
                  className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-2"
                  style={{ textShadow: '0 0 20px rgba(255,255,255,0.1)' }}
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
                  style={{ textShadow: '0 0 10px rgba(255,255,255,0.2)' }}
                >
                  {product.price}.00
                </span>
                <span
                  className={`text-xs px-3 py-1 border ${
                    product.status === 'IN_STOCK'
                      ? 'border-[#00FF00]/50 text-[#00FF00] bg-[#00FF00]/10'
                      : 'border-[#ff6b00]/50 text-[#ff6b00] bg-[#ff6b00]/10'
                  }`}
                >
                  STATUS: {product.status}
                </span>
              </div>

              {/* Specs Code Block */}
              <CodeBlock
                title="COMPONENT_SPECS.json"
                filename="specs.json"
                showDots={false}
                lines={specLines}
              />

              {/* Size Selector */}
              <div>
                <div className="text-[#5a7a5a] text-xs mb-3 tracking-wider">VAR SIZE =</div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 text-xs font-bold border transition-all duration-150 ${
                        selectedSize === size
                          ? 'bg-[#00FF00] text-[#050a05] border-[#00FF00]'
                          : 'border-[#1a2e1a] text-[#5a7a5a] hover:border-[#00FF00]/50 hover:text-[#00FF00] bg-[#080d08]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className={`w-full py-4 text-sm font-bold tracking-widest flex items-center justify-center gap-3 rounded-sm transition-all ${
                    added ? 'bg-[#00cc00] text-[#050a05]' : 'neon-btn'
                  }`}
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  <ShoppingCart size={18} />
                  {added ? 'ADDED_TO_CART ✓' : `addToCart(${product.shortName})`}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    addItem(product, selectedSize, 1);
                    navigate('/checkout');
                  }}
                  className="w-full py-3.5 text-sm font-bold tracking-widest flex items-center justify-center gap-3 rounded-sm neon-btn-outline border border-[#00FF00]"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  <Zap size={16} />
                  executeOrder()
                </motion.button>
              </div>

              {/* Long Description */}
              <div className="border border-[#1a2e1a] bg-[#080d08] p-4 text-xs text-[#5a7a5a] leading-relaxed">
                <div className="text-[#3a5a3a] mb-2">// DESCRIPTION</div>
                {product.longDescription}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 text-[10px]">
                {['CYBERPUNK', 'STREETWEAR', 'DEVELOPER', product.category.toUpperCase()].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 border border-[#1a2e1a] text-[#3a5a3a] hover:text-[#00FF00] hover:border-[#00FF00]/30 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

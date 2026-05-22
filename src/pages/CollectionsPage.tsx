import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SidebarFilters from '../components/SidebarFilters';
import Footer from '../components/Footer';
import { getProductsByCategory } from '../lib/products';

const sortOptions = ['RELEVANCE', 'PRICE_ASC', 'PRICE_DESC', 'NEWEST'];

export default function CollectionsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('RELEVANCE');
  const [sortOpen, setSortOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = getProductsByCategory(activeFilter);
    if (sortBy === 'PRICE_ASC') list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'PRICE_DESC') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [activeFilter, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#050a05] grid-bg">
      <main className="flex-1 pt-14">
        {/* Page Header */}
        <div className="border-b border-[#1a2e1a] px-4 sm:px-6 lg:px-8 py-6 bg-[#050a05]">
          <div className="max-w-screen-xl mx-auto">
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              <span className="text-[#5a7a5a]">const </span>
              <span className="text-white">DROP_01</span>
              <span className="text-[#5a7a5a]"> = []</span>
            </h1>
            <div className="flex items-center justify-between mt-2 flex-wrap gap-3">
              <p
                className="text-[#5a7a5a] text-xs sm:text-sm"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                <span className="text-[#3a5a3a]">// </span>
                {filtered.length} compiled assets found in directory.
              </p>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 border border-[#1a2e1a] bg-[#080d08] px-3 py-1.5 text-[10px] text-[#5a7a5a] hover:text-[#00FF00] hover:border-[#00FF00]/40 transition-all"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  <SlidersHorizontal size={12} />
                  SORT BY: {sortBy}
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 w-44 border border-[#1a2e1a] bg-[#080d08] z-20">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortBy(opt);
                          setSortOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-[10px] border-b last:border-b-0 border-[#1a2e1a] transition-colors ${
                          sortBy === opt
                            ? 'text-[#00FF00] bg-[#0a1a0a]'
                            : 'text-[#5a7a5a] hover:text-[#00FF00] hover:bg-[#0a0f0a]'
                        }`}
                        style={{ fontFamily: "'Fira Code', monospace" }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile filter toggle */}
        <div className="md:hidden px-4 py-3 border-b border-[#1a2e1a]">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 text-[#5a7a5a] hover:text-[#00FF00] text-xs transition-colors"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            <SlidersHorizontal size={14} />
            {sidebarOpen ? 'CLOSE_FILTERS()' : 'OPEN_FILTERS()'}
          </button>
        </div>

        {/* Body */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
              <SidebarFilters
                active={activeFilter}
                onChange={(cat) => {
                  setActiveFilter(cat);
                  setSidebarOpen(false);
                }}
                totalCount={filtered.length}
              />
            </div>

            {/* Product Grid */}
            <div className="flex-1 min-w-0">
              {filtered.length === 0 ? (
                <div
                  className="text-center py-20 text-[#3a5a3a]"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  <div className="text-4xl mb-4">∅</div>
                  <div className="text-sm">// No assets found in this directory</div>
                  <div className="text-xs mt-2 text-[#2a3a2a]">ERROR: EMPTY_RESULT_SET</div>
                </div>
              ) : (
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map((product, i) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.07 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
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
            onClick={() => (window.location.href = '/checkout')}
            className="w-full neon-btn py-3 rounded-sm text-xs font-bold tracking-widest"
          >
            EXEC_CHECKOUT()
          </button>
        </div>
      </main>
      <div className="pb-20 md:pb-0">
        <Footer />
      </div>
    </div>
  );
}

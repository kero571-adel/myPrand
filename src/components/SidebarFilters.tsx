import { categories } from '../lib/products';

interface SidebarFiltersProps {
  active: string;
  onChange: (cat: string) => void;
  totalCount: number;
}

export default function SidebarFilters({ active, onChange }: SidebarFiltersProps) {
  return (
    <aside
      className="w-full md:w-48 lg:w-52 flex-shrink-0"
      style={{ fontFamily: "'Fira Code', monospace" }}
    >
      {/* Directory Header */}
      <div className="border border-[#1a2e1a] bg-[#080d08] mb-0.5">
        <div className="px-3 py-2 border-b border-[#1a2e1a] bg-[#0a0f0a]">
          <span className="text-[#5a7a5a] text-[10px] tracking-wider">// DIRECTORY</span>
        </div>
        <div className="px-3 py-2">
          <span className="text-[#00FF00] text-xs font-bold">/DROP_01/ASSETS</span>
        </div>
      </div>

      {/* Filter List */}
      <div className="border border-[#1a2e1a] bg-[#080d08]">
        {categories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={`w-full flex items-center gap-2 px-3 py-2.5 text-left text-xs transition-all duration-150 border-b last:border-b-0 border-[#1a2e1a] ${
                isActive
                  ? 'bg-[#00FF00] text-[#050a05] font-bold'
                  : 'text-[#5a7a5a] hover:text-[#00FF00] hover:bg-[#0a0f0a]'
              }`}
            >
              <span className={`text-[10px] flex-shrink-0 ${isActive ? 'text-[#050a05]' : 'text-[#3a5a3a]'}`}>
                {isActive ? '■' : '□'}
              </span>
              <span className="truncate">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom status */}
      <div className="mt-4 border border-[#1a2e1a] bg-[#080d08] p-3 hidden md:block">
        <div className="text-[#00FF00] text-[10px] tracking-wider mb-2">
          &gt; STATUS: <span className="font-bold">COMPILED</span>
        </div>
        <button
          onClick={() => (window.location.href = '/checkout')}
          className="w-full neon-btn text-[10px] py-2 rounded-sm font-bold tracking-widest"
        >
          EXEC_CHECKOUT()
        </button>
      </div>
    </aside>
  );
}

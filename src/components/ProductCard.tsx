import { useNavigate } from "react-router-dom";
//import { useCart } from "../lib/CartContext";

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  status: string;
  assetId: string;
  [key: string]: any;
}

const statusColors: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  IN_STOCK: {
    bg: "bg-[#00FF00]/10",
    text: "text-[#00FF00]",
    border: "border-[#00FF00]/40",
  },
  LOW_MEM: {
    bg: "bg-[#ff6b00]/10",
    text: "text-[#ff6b00]",
    border: "border-[#ff6b00]/40",
  },
  OUT_OF_STOCK: {
    bg: "bg-red-900/20",
    text: "text-red-400",
    border: "border-red-700/40",
  },
};

const dotColors = ["bg-[#ff5f57]", "bg-[#febc2e]", "bg-[#28c840]"];

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const status = statusColors[product.status] || statusColors.IN_STOCK;

  return (
    <div
      className="product-card bg-[#080d08] border border-[#1a2e1a] rounded-sm overflow-hidden cursor-pointer group"
      onClick={() => navigate(`/collections/${product.slug}`)}
      style={{ fontFamily: "'Fira Code', monospace" }}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 border-b border-[#1a2e1a] bg-[#0a0f0a]">
        <div className="flex gap-1">
          {dotColors.map((c, i) => (
            <span
              key={i}
              className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${c}`}
            />
          ))}
        </div>
        <span className="text-[8px] sm:text-[10px] text-[#3a5a3a] tracking-wider truncate ml-2">
          {product.assetId}
        </span>
      </div>

      {/* Image */}
      <div className="relative overflow-hidden bg-[#0a0f0a] aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />
        {/* Status badge */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
          <span
            className={`text-[9px] tracking-widest px-2 py-0.5 border ${status.border} ${status.bg} ${status.text}`}
          >
            [{product.status}]
          </span>
        </div>
        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
          }}
        />
      </div>

      {/* Card Body */}
      <div className="p-3 space-y-2">
        <h3 className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-wide group-hover:text-[#00FF00] transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[#5a7a5a] text-[11px] leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-1 gap-2 flex-wrap">
          <div>
            <span className="text-[#5a7a5a] text-[10px]">const price =</span>
            <span
              className="text-[#00FF00] font-bold ml-1"
              style={{ fontSize: "clamp(10px, 2vw, 14px)" }}
            >
              {product.price} EGB
            </span>
          </div>
          <button
            onClick={() => navigate(`/collections/${product.slug}`)}
            className="neon-btn font-bold tracking-widest flex-shrink-0 whitespace-nowrap rounded-sm"
            style={{
              fontSize: "clamp(9px, 1.8vw, 13px)",
              padding: "clamp(4px, 0.8vw, 6px) clamp(6px, 1.5vw, 12px)",
            }}
          >
            Show_Details()
          </button>
        </div>
      </div>
    </div>
  );
}

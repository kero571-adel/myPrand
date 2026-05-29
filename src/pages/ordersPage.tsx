import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Package, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import {
  subscribeToUserOrders,
  type Order,
  type OrderStatus,
  STATUS_META,
} from "../lib/orders";
import { useAuth } from "../lib/AuthContext";

const TIMELINE_STEPS: OrderStatus[] = ["ORDER_PLACED", "SHIPPED", "DELIVERED"];

function StatusBadge({ status }: { status: OrderStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold tracking-wider border whitespace-nowrap"
      style={{
        color: meta.color,
        background: meta.bg,
        borderColor: meta.border,
        fontFamily: "'Fira Code', monospace",
      }}
    >
      <span>{meta.icon}</span>
      {meta.label.toUpperCase()}
    </span>
  );
}

function StatusTimeline({ order }: { order: Order }) {
  const isCancelled = order.status === "CANCELLED";

  if (isCancelled) {
    return (
      <div
        className="flex flex-wrap items-center gap-2 text-xs mt-3 pt-3 border-t border-[#1a2e1a]"
        style={{ fontFamily: "'Fira Code', monospace" }}
      >
        <span
          className="text-[10px] px-2 py-0.5 border"
          style={{
            color: STATUS_META.CANCELLED.color,
            borderColor: STATUS_META.CANCELLED.border,
            background: STATUS_META.CANCELLED.bg,
          }}
        >
          ✕ ORDER_CANCELLED
        </span>
        <span className="text-[#3a5a3a] text-[10px]">
          {formatDate(
            order.statusHistory.find((h) => h.status === "CANCELLED")
              ?.timestamp ?? order.placedAt
          )}
        </span>
      </div>
    );
  }

  const activeIdx = TIMELINE_STEPS.indexOf(order.status);

  return (
    <div className="mt-3 pt-3 border-t border-[#1a2e1a]">
      <div className="flex items-start">
        {TIMELINE_STEPS.map((step, idx) => {
          const reached = idx <= activeIdx;
          const meta = STATUS_META[step];
          const histEntry = order.statusHistory.find((h) => h.status === step);
          const isLast = idx === TIMELINE_STEPS.length - 1;

          return (
            <div key={step} className="flex items-start flex-1 last:flex-none">
              {/* Node */}
              <div className="flex flex-col items-center gap-1 min-w-0">
                <div
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center text-[9px] sm:text-[10px] font-bold flex-shrink-0 transition-all"
                  style={{
                    borderColor: reached ? meta.color : "#1a2e1a",
                    background: reached ? meta.bg : "#080d08",
                    color: reached ? meta.color : "#2a4a2a",
                    boxShadow: reached ? `0 0 8px ${meta.color}40` : "none",
                  }}
                >
                  {reached ? meta.icon : "○"}
                </div>
                <span
                  className="text-[8px] sm:text-[9px] text-center leading-tight"
                  style={{
                    color: reached ? meta.color : "#2a4a2a",
                    fontFamily: "'Fira Code', monospace",
                    wordBreak: "break-word",
                    maxWidth: "3.5rem",
                  }}
                >
                  {meta.label}
                </span>
                {histEntry && (
                  <span
                    className="text-[7px] sm:text-[8px] text-[#3a5a3a] text-center"
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      maxWidth: "3.5rem",
                    }}
                  >
                    {formatDate(histEntry.timestamp)}
                  </span>
                )}
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className="flex-1 h-0.5 mx-1 mt-2.5 sm:mt-3 transition-all"
                  style={{
                    background:
                      idx < activeIdx
                        ? TIMELINE_STEPS[idx + 1] === "DELIVERED"
                          ? STATUS_META.DELIVERED.color
                          : STATUS_META.SHIPPED.color
                        : "#1a2e1a",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-EG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const meta = STATUS_META[order.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-[#1a2e1a] bg-[#080d08]"
      style={{ borderLeftColor: meta.border, borderLeftWidth: 2 }}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between gap-2 px-3 sm:px-4 py-3 bg-[#0a0f0a] hover:bg-[#0d150d] transition-colors text-left"
      >
        {/* Left: ID + date stacked */}
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <span
            className="text-[#00FF00] text-[11px] sm:text-xs font-bold tracking-wider truncate"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {order.orderId}
          </span>
          <span
            className="text-[#3a5a3a] text-[10px]"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {formatDate(order.placedAt)}
          </span>
        </div>
        {/* Right: badge + chevron */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <StatusBadge status={order.status} />
          <span className="text-[#3a5a3a]">
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </span>
        </div>
      </button>

      {/* Quick summary */}
      <div
        className="px-3 sm:px-4 py-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#5a7a5a] border-t border-[#0f180f]"
        style={{ fontFamily: "'Fira Code', monospace" }}
      >
        <span>
          {order.items.length} item{order.items.length !== 1 ? "s" : ""}
        </span>
        <span className="text-[#00FF00] font-bold">{order.grandTotal} EGP</span>
        <span className="text-[#3a5a3a] truncate max-w-full">
          📍 {order.customer.city}, {order.customer.govLabel}
        </span>
      </div>

      {/* Expandable details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div
              className="px-3 sm:px-4 pb-4 space-y-4"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              {/* Timeline */}
              <StatusTimeline order={order} />

              {/* Items */}
              <div className="border border-[#1a2e1a] bg-[#0a0f0a]">
                <div className="px-3 py-1.5 border-b border-[#1a2e1a]">
                  <span className="text-[10px] text-[#3a5a3a]">// ITEMS</span>
                </div>
                <div className="p-3 space-y-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-9 h-11 sm:w-10 sm:h-12 object-cover grayscale border border-[#1a2e1a] flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-white truncate">{item.name}</div>
                        <div className="text-[#5a7a5a] text-[10px]">
                          SIZE: {item.size} × {item.quantity}
                        </div>
                      </div>
                      <span className="text-[#00FF00] font-bold flex-shrink-0">
                        {item.price * item.quantity} EGP
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="border border-[#1a2e1a] bg-[#0a0f0a] p-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-[#5a7a5a]">
                  <span>Subtotal</span>
                  <span>{order.subtotal} EGP</span>
                </div>
                <div className="flex justify-between text-[#5a7a5a]">
                  <span className="truncate mr-2">
                    Shipping to {order.customer.govLabel}
                  </span>
                  <span className="flex-shrink-0">{order.shipping} EGP</span>
                </div>
                <div className="border-t border-[#1a2e1a] pt-1.5 flex justify-between font-bold text-sm">
                  <span className="text-white">GRAND_TOTAL</span>
                  <span className="text-[#00FF00]">{order.grandTotal} EGP</span>
                </div>
              </div>

              {/* Delivery info */}
              <div className="border border-[#1a2e1a] bg-[#0a0f0a] p-3 space-y-1 text-xs text-[#5a7a5a]">
                <div className="text-[#3a5a3a] mb-1">// DELIVERY_INFO</div>
                {[
                  ["Name", order.customer.name],
                  ["Phone", order.customer.phone],
                  [
                    "Address",
                    `${order.customer.city}, ${order.customer.address}`,
                  ],
                  ["Governorate", order.customer.govLabel],
                  ...(order.customer.email
                    ? [["Email", order.customer.email]]
                    : []),
                  ["Est. Delivery", `${order.deliveryDays} business days`],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-2 sm:gap-3">
                    <span className="text-[#3a5a3a] w-20 sm:w-24 flex-shrink-0">
                      {k}:
                    </span>
                    <span className="text-[#00FF00] break-all">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Scrollable filter tabs with fade indicator
function FilterTabs({
  filters,
  filter,
  orders,
  onSelect,
}: {
  filters: { value: OrderStatus | "ALL"; label: string }[];
  filter: OrderStatus | "ALL";
  orders: Order[];
  onSelect: (v: OrderStatus | "ALL") => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showFade, setShowFade] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () =>
      setShowFade(
        el.scrollWidth > el.clientWidth &&
          el.scrollLeft < el.scrollWidth - el.clientWidth - 2
      );
    check();
    el.addEventListener("scroll", check);
    window.addEventListener("resize", check);
    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <div className="relative mb-5 border border-[#1a2e1a] bg-[#080d08]">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {filters.map((f) => {
          const count =
            f.value === "ALL"
              ? orders.length
              : orders.filter((o) => o.status === f.value).length;
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              onClick={() => onSelect(f.value)}
              className={`flex-shrink-0 px-3 sm:px-5 py-2.5 text-[10px] tracking-wider border-r last:border-r-0 border-[#1a2e1a] transition-all
                ${
                  active
                    ? "text-[#00FF00] bg-[#0a1a0a] border-b-2 border-b-[#00FF00]"
                    : "text-[#3a5a3a] hover:text-[#5a7a5a]"
                }`}
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              {f.label}
              {count > 0 && (
                <span
                  className={`ml-1.5 px-1 text-[9px] rounded-sm ${
                    active
                      ? "bg-[#00FF00]/20 text-[#00FF00]"
                      : "bg-[#1a2e1a] text-[#3a5a3a]"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {/* Right fade hint when overflowing */}
      {showFade && (
        <div
          className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none"
          style={{
            background: "linear-gradient(to right, transparent, #080d08)",
          }}
        />
      )}
    </div>
  );
}

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<OrderStatus | "ALL">("ALL");
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const filtered =
    filter === "ALL" ? orders : orders.filter((o) => o.status === filter);

  const FILTERS: { value: OrderStatus | "ALL"; label: string }[] = [
    { value: "ALL", label: "ALL" },
    { value: "ORDER_PLACED", label: "PLACED" },
    { value: "SHIPPED", label: "SHIPPED" },
    { value: "DELIVERED", label: "DELIVERED" },
    { value: "CANCELLED", label: "CANCELLED" },
  ];
  useEffect(() => {
    // 🔐 حماية الصفحة: لو مش مسجل دخول → حول لـ login
    if (user === undefined) return; // انتظر لحد ما الـ auth يخلص load
    if (!user) {
      navigate("/login", { replace: true, state: { from: "/orders" } });
    }
  }, [user, navigate]);
  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    const unsub = subscribeToUserOrders(user.uid, (orders) => {
      setOrders(orders);
      setIsLoading(false); // ✅ انتهى التحميل
    });
    return () => {
      unsub();
      setIsLoading(false);
    };
  }, [user]);
  return (
    <div className="min-h-screen flex flex-col bg-[#050a05] grid-bg">
      <main className="flex-1 pt-14">
        <div className="max-w-screen-xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Back */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[#3a5a3a] hover:text-[#00FF00] text-xs mb-6 transition-colors"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            <ArrowLeft size={14} />
            cd ../home
          </button>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            <h1
              className="font-bold text-[#00FF00] mb-1"
              style={{
                textShadow: "0 0 20px rgba(0,255,0,0.5)",
                fontSize: "clamp(20px, 5vw, 32px)",
              }}
            >
              ORDER_HISTORY
            </h1>
            <p
              className="text-[#5a7a5a]"
              style={{ fontSize: "clamp(9px, 1.5vw, 12px)" }}
            >
              // {orders.length} order{orders.length !== 1 ? "s" : ""} found in
              registry
            </p>
          </motion.div>

          {/* Filter tabs */}
          <FilterTabs
            filters={FILTERS}
            filter={filter}
            orders={orders}
            onSelect={setFilter}
          />

          {/* Orders list */}
          {/* 🔽 استبدل جزء عرض الـ Orders بهذا */}
          {isLoading ? (
            <Loader fullScreen={false} />
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border border-[#1a2e1a] bg-[#080d08] p-10 text-center"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              <Package size={36} className="text-[#1a2e1a] mx-auto mb-3" />
              <div className="text-[#3a5a3a] text-sm mb-1">
                // No orders found
              </div>
              <div className="text-[#2a3a2a] text-xs mb-5">
                {filter === "ALL"
                  ? "You haven't placed any orders yet."
                  : `No orders with status: ${filter}`}
              </div>
              {filter === "ALL" && (
                <button
                  onClick={() => navigate("/collections")}
                  className="neon-btn px-6 py-2 text-xs"
                >
                  BROWSE_COLLECTIONS()
                </button>
              )}
            </motion.div>
          ) : (
            <div className="space-y-3">
              {filtered.map((order) => (
                <OrderCard key={order.orderId} order={order} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

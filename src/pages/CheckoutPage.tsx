import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Trash2, Lock, MapPin, Clock, Plus, Minus } from "lucide-react";
import Footer from "../components/Footer";
import { useCart } from "../lib/CartContext";
import { addOrder, generateOrderId, type Order } from "../lib/orders";

const GOVERNORATES: Record<
  string,
  { label: string; shipping: number; days: string }
> = {
  cairo: { label: "Cairo", shipping: 50, days: "1-2" },
  giza: { label: "Giza", shipping: 50, days: "1-2" },
  alexandria: { label: "Alexandria", shipping: 60, days: "2-3" },
  qalyubia: { label: "Qalyubia", shipping: 55, days: "1-2" },
  sharqia: { label: "Sharqia", shipping: 65, days: "2-3" },
  dakahlia: { label: "Dakahlia", shipping: 65, days: "2-3" },
  gharbia: { label: "Gharbia", shipping: 65, days: "2-3" },
  monufia: { label: "Monufia", shipping: 65, days: "2-3" },
  beheira: { label: "Beheira", shipping: 65, days: "2-3" },
  kafr_el_sheikh: { label: "Kafr El-Sheikh", shipping: 70, days: "2-3" },
  damietta: { label: "Damietta", shipping: 70, days: "2-3" },
  port_said: { label: "Port Said", shipping: 70, days: "2-3" },
  ismailia: { label: "Ismailia", shipping: 65, days: "2-3" },
  suez: { label: "Suez", shipping: 65, days: "2-3" },
  north_sinai: { label: "North Sinai", shipping: 80, days: "3-5" },
  south_sinai: { label: "South Sinai", shipping: 80, days: "3-5" },
  fayoum: { label: "Fayoum", shipping: 70, days: "2-3" },
  beni_suef: { label: "Beni Suef", shipping: 70, days: "2-3" },
  minya: { label: "Minya", shipping: 75, days: "3-4" },
  asyut: { label: "Asyut", shipping: 75, days: "3-4" },
  sohag: { label: "Sohag", shipping: 75, days: "3-4" },
  qena: { label: "Qena", shipping: 80, days: "3-5" },
  luxor: { label: "Luxor", shipping: 80, days: "3-5" },
  aswan: { label: "Aswan", shipping: 80, days: "3-5" },
  red_sea: { label: "Red Sea", shipping: 85, days: "4-6" },
  matruh: { label: "Matruh", shipping: 85, days: "4-6" },
  new_valley: { label: "New Valley", shipping: 90, days: "4-6" },
};

const LS_KEY = "styl_checkout_info";

interface FormState {
  name: string;
  phone: string;
  governorate: string;
  city: string;
  address: string;
  email: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  phone: "",
  governorate: "",
  city: "",
  address: "",
  email: "",
};

function TInput({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  required = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div style={{ fontFamily: "'Fira Code', monospace" }}>
      <label className="block text-[10px] text-[#5a7a5a] mb-1 tracking-wider">
        {label}
        {required && <span className="text-[#00FF00] ml-1">*</span>}
      </label>
      <div className="flex items-center border border-[#1a2e1a] bg-[#0a0f0a] focus-within:border-[#00FF00] focus-within:shadow-[0_0_8px_rgba(0,255,0,0.2)] transition-all">
        <span className="px-2 text-[#00FF00] text-sm">&gt;</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent py-3 pr-3 text-[#00FF00] text-xs outline-none placeholder-[#1a3a1a] min-w-0"
          style={{ fontFamily: "'Fira Code', monospace" }}
        />
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      return saved ? { ...EMPTY_FORM, ...JSON.parse(saved) } : EMPTY_FORM;
    } catch {
      return EMPTY_FORM;
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(form));
  }, [form]);

  const set = (field: keyof FormState) => (v: string) =>
    setForm((f) => ({ ...f, [field]: v }));

  const govInfo = GOVERNORATES[form.governorate];
  const shipping = govInfo?.shipping ?? 0;
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const step2Valid =
    form.name.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.governorate !== "" &&
    form.city.trim() !== "" &&
    form.address.trim() !== "";

  const handleSubmit = () => {
    if (!step2Valid || !govInfo) return;

    const now = new Date().toISOString();
    const order: Order = {
      orderId: generateOrderId(),
      placedAt: now,
      status: 'ORDER_PLACED',
      statusHistory: [{ status: 'ORDER_PLACED', timestamp: now }],
      customer: {
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        governorate: form.governorate,
        govLabel: govInfo.label,
        city: form.city,
        address: form.address,
      },
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        size: i.size,
        quantity: i.quantity,
        price: i.price,
        image: i.image,
      })),
      subtotal,
      shipping: govInfo.shipping,
      grandTotal: subtotal + govInfo.shipping,
      deliveryDays: govInfo.days,
    };

    addOrder(order);
    setSubmitted(true);
    clearCart();
  };

  // ── Success screen ───────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-[#050a05] grid-bg">
        <main className="flex-1 flex items-center justify-center pt-14 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center w-full max-w-md px-4"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            <div
              className="text-6xl sm:text-7xl font-bold text-[#00FF00] mb-4"
              style={{ textShadow: "0 0 30px rgba(0,255,0,0.8)" }}
            >
              ✓
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              ORDER_CONFIRMED
            </h2>
            <p className="text-[#5a7a5a] text-xs sm:text-sm mb-2">
              // Order received successfully.
            </p>
            <p className="text-[#00FF00] text-xs mb-8">
              &gt; Estimated delivery: {govInfo?.days ?? "2-5"} business days.
            </p>
            <div className="border border-[#1a2e1a] bg-[#080d08] p-4 text-left text-xs text-[#5a7a5a] mb-6">
              <div className="text-[#3a5a3a] mb-2">// ORDER_LOG</div>
              <div className="space-y-1">
                <div>
                  <span className="text-[#00FF00]">[OK]</span> Name: {form.name}
                </div>
                <div>
                  <span className="text-[#00FF00]">[OK]</span> Phone:{" "}
                  {form.phone}
                </div>
                <div className="break-words">
                  <span className="text-[#00FF00]">[OK]</span> Address:{" "}
                  {form.city}, {form.address}
                </div>
                <div>
                  <span className="text-[#00FF00]">[OK]</span> Governorate:{" "}
                  {govInfo?.label}
                </div>
                {form.email && (
                  <div className="break-words">
                    <span className="text-[#00FF00]">[OK]</span> Confirmation →{" "}
                    {form.email}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => (window.location.href = "/")}
              className="neon-btn px-6 sm:px-8 py-3 text-sm font-bold tracking-widest rounded-sm w-full sm:w-auto"
            >
              RETURN_HOME()
            </button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  const STEPS = [
    { id: 1 as const, label: "01_CART" },
    { id: 2 as const, label: "02_DETAILS" },
    { id: 3 as const, label: "03_CONFIRM" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#050a05] grid-bg">
      <main className="flex-1 pt-14">
        <div className="max-w-screen-xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            <h1
              className="font-bold text-[#00FF00] mb-1"
              style={{
                textShadow: "0 0 20px rgba(0,255,0,0.5)",
                fontSize: "clamp(20px, 5vw, 32px)",
              }}
            >
              CHECKOUT_PIPELINE
            </h1>
            <p
              className="text-[#5a7a5a]"
              style={{ fontSize: "clamp(9px, 1.5vw, 12px)" }}
            >
              STATUS: IN_PROGRESS // STEP_{step}_OF_3
            </p>
          </motion.div>

          {/* Steps bar */}
          <div className="flex mb-5 sm:mb-6 border border-[#1a2e1a] bg-[#080d08] overflow-hidden">
            {STEPS.map((s) => (
              <button
                key={s.id}
                disabled={s.id > step}
                onClick={() => s.id < step && setStep(s.id)}
                className={`flex-1 px-1 sm:px-4 py-2.5 sm:py-3 tracking-wider border-r last:border-r-0 border-[#1a2e1a] transition-all
                ${
                  step === s.id
                    ? "text-[#00FF00] bg-[#0a1a0a] border-b-2 border-b-[#00FF00]"
                    : step > s.id
                    ? "text-[#3a5a3a] cursor-pointer hover:text-[#5a7a5a]"
                    : "text-[#2a3a2a] cursor-not-allowed"
                }`}
                style={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: "clamp(7px, 2vw, 10px)",
                }}
              >
                {step > s.id && <span className="text-[#00FF00] mr-0.5 sm:mr-1">✓</span>}
                {s.label}
              </button>
            ))}
          </div>

          {/* ── STEP 1: Cart review ── */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="border border-[#1a2e1a] bg-[#080d08]">
                <div className="px-3 sm:px-4 py-2 border-b border-[#1a2e1a] bg-[#0a0f0a]">
                  <span
                    className="text-[10px] text-[#5a7a5a]"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    STAGING_AREA.log — {items.length} ARTIFACT
                    {items.length !== 1 ? "S" : ""}
                  </span>
                </div>

                {items.length === 0 ? (
                  <div
                    className="p-8 sm:p-10 text-center text-[#3a5a3a]"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    <div className="text-4xl mb-3">∅</div>
                    <div className="text-sm">// Cart is empty</div>
                    <button
                      onClick={() => (window.location.href = "/collections")}
                      className="mt-4 neon-btn px-6 py-2 text-xs"
                    >
                      BROWSE_COLLECTIONS()
                    </button>
                  </div>
                ) : (
                  <div className="p-3 sm:p-4 space-y-3">
                    {items.map((item, i) => (
                      <div
                        key={`${item.id}-${item.size}`}
                        className="flex gap-2 sm:gap-3 border border-[#1a2e1a] bg-[#0a0f0a] p-2 sm:p-3 items-center"
                      >
                        {/* Row number — hidden on very small screens */}
                        <div
                          className="hidden xs:block text-[#3a5a3a] text-[10px] w-4 flex-shrink-0"
                          style={{ fontFamily: "'Fira Code', monospace" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </div>

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-14 sm:w-14 sm:h-16 object-cover grayscale border border-[#1a2e1a] flex-shrink-0"
                        />

                        <div
                          className="flex-1 min-w-0"
                          style={{ fontFamily: "'Fira Code', monospace" }}
                        >
                          <div className="text-white text-xs font-bold truncate">
                            {item.name}
                          </div>
                          <div className="text-[#5a7a5a] text-[10px]">
                            SIZE: {item.size}
                          </div>
                          <div className="text-[#00FF00] text-xs mt-1 font-bold">
                            ${item.price * item.quantity}
                            {item.quantity > 1 && (
                              <span className="text-[#3a5a3a] font-normal ml-1 hidden sm:inline">
                                (${item.price} × {item.quantity})
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center border border-[#1a2e1a] flex-shrink-0">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.quantity - 1)
                            }
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[#5a7a5a] hover:text-[#00FF00] hover:bg-[#0a1a0a] active:bg-[#0a1a0a] transition-all border-r border-[#1a2e1a]"
                          >
                            <Minus size={10} />
                          </button>
                          <span
                            className="w-7 sm:w-8 text-center text-[#00FF00] text-xs"
                            style={{ fontFamily: "'Fira Code', monospace" }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.quantity + 1)
                            }
                            disabled={item.quantity >= 10}
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[#5a7a5a] hover:text-[#00FF00] hover:bg-[#0a1a0a] active:bg-[#0a1a0a] transition-all border-l border-[#1a2e1a] disabled:opacity-30"
                          >
                            <Plus size={10} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id, item.size)}
                          className="text-[#3a5a3a] hover:text-red-400 active:text-red-400 transition-colors flex-shrink-0 p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}

                    <div
                      className="border-t border-[#1a2e1a] pt-3 flex justify-between items-center"
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                      <span className="text-[#5a7a5a] text-xs">SUBTOTAL</span>
                      <span className="text-white font-bold">${subtotal}</span>
                    </div>
                    <div
                      className="text-[10px] text-[#3a5a3a]"
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                      // Shipping cost will be calculated based on governorate
                      in the next step.
                    </div>
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => setStep(2)}
                        className="neon-btn w-full sm:w-auto px-8 py-3 text-sm font-bold tracking-widest rounded-sm"
                        style={{ fontFamily: "'Fira Code', monospace" }}
                      >
                        NEXT_STEP →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Delivery details ── */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {/* Form */}
              <div className="lg:col-span-2 border border-[#1a2e1a] bg-[#080d08]">
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 border-b border-[#1a2e1a] bg-[#0a0f0a]">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#28c840]" />
                  <span
                    className="text-[10px] text-[#5a7a5a] ml-2"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    DELIVERY_CONFIG.yml
                  </span>
                </div>
                <div className="p-4 sm:p-5 space-y-4">
                  <div
                    className="text-[#5a7a5a] text-xs mb-2"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    &gt; ENTER DELIVERY COORDINATES — Fields marked * are required.
                  </div>

                  <TInput
                    label="var.fullName"
                    placeholder="Full name"
                    value={form.name}
                    onChange={set("name")}
                    required
                  />

                  <TInput
                    label="var.phoneNumber"
                    placeholder="01xxxxxxxxx"
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    required
                  />

                  {/* Governorate */}
                  <div style={{ fontFamily: "'Fira Code', monospace" }}>
                    <label className="block text-[10px] text-[#5a7a5a] mb-1 tracking-wider">
                      var.governorate <span className="text-[#00FF00]">*</span>
                    </label>
                    <div className="flex items-center border border-[#1a2e1a] bg-[#0a0f0a] focus-within:border-[#00FF00] transition-all">
                      <span className="px-2 text-[#00FF00]">
                        <MapPin size={12} />
                      </span>
                      <select
                        value={form.governorate}
                        onChange={(e) => set("governorate")(e.target.value)}
                        className="flex-1 bg-transparent py-3 pr-3 text-[#00FF00] text-xs outline-none min-w-0"
                        style={{ fontFamily: "'Fira Code', monospace" }}
                      >
                        <option value="" className="bg-[#080d08]">
                          -- Select governorate --
                        </option>
                        {Object.entries(GOVERNORATES).map(([key, g]) => (
                          <option key={key} value={key} className="bg-[#080d08]">
                            {g.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {govInfo && (
                      <div className="mt-1 flex flex-wrap items-center gap-2 sm:gap-3 text-[10px]">
                        <span className="text-[#00FF00]">
                          SHIPPING: +{govInfo.shipping} EGP
                        </span>
                        <span className="text-[#3a5a3a] flex items-center gap-1">
                          <Clock size={10} /> {govInfo.days} business days
                        </span>
                      </div>
                    )}
                  </div>

                  <TInput
                    label="var.city"
                    placeholder="City / District"
                    value={form.city}
                    onChange={set("city")}
                    required
                  />

                  <TInput
                    label="var.streetAddress"
                    placeholder="Street, building no., floor..."
                    value={form.address}
                    onChange={set("address")}
                    required
                  />

                  <TInput
                    label="var.email"
                    placeholder="user@domain.com (optional)"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                  />

                  <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2">
                    <button
                      onClick={() => setStep(1)}
                      className="border border-[#1a2e1a] px-6 py-2.5 text-xs text-[#5a7a5a] hover:text-white hover:border-[#5a7a5a] active:text-white transition-all order-2 sm:order-1"
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                      ← BACK
                    </button>
                    <button
                      onClick={() => step2Valid && setStep(3)}
                      disabled={!step2Valid}
                      className={`neon-btn px-8 py-2.5 text-sm font-bold tracking-widest rounded-sm transition-opacity order-1 sm:order-2
                        ${!step2Valid ? "opacity-40 cursor-not-allowed" : ""}`}
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                      REVIEW_ORDER →
                    </button>
                  </div>
                </div>
              </div>

              {/* Order summary sidebar — shown below form on mobile */}
              <div
                className="border border-[#1a2e1a] bg-[#080d08] h-fit lg:sticky lg:top-20"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                <div className="px-4 py-2 border-b border-[#1a2e1a] bg-[#0a0f0a]">
                  <span className="text-[10px] text-[#5a7a5a]">
                    ORDER_SUMMARY.log
                  </span>
                </div>
                <div className="p-4 space-y-2 text-xs">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="flex justify-between text-[#5a7a5a]"
                    >
                      <span className="truncate mr-2">
                        {item.name} ×{item.quantity}
                      </span>
                      <span className="flex-shrink-0">${item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t border-[#1a2e1a] pt-2 flex justify-between text-[#5a7a5a]">
                    <span>SUBTOTAL</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[#5a7a5a]">
                    <span>SHIPPING</span>
                    <span>{govInfo ? `${govInfo.shipping} EGP` : "—"}</span>
                  </div>
                  <div className="border-t border-[#1a2e1a] pt-2 flex justify-between font-bold">
                    <span className="text-white">TOTAL</span>
                    <span className="text-[#00FF00] text-right">
                      ${subtotal} + {govInfo?.shipping ?? "?"} EGP
                    </span>
                  </div>
                  {govInfo && (
                    <div className="flex items-center gap-1 text-[10px] text-[#3a5a3a] pt-1">
                      <Clock size={10} /> Delivery in {govInfo.days} business days
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Confirm ── */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="border border-[#1a2e1a] bg-[#080d08] w-full max-w-2xl mx-auto">
                <div className="px-3 sm:px-4 py-2 border-b border-[#1a2e1a] bg-[#0a0f0a]">
                  <span
                    className="text-[10px] text-[#5a7a5a]"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    CONFIRM_DEPLOY.yml
                  </span>
                </div>
                <div
                  className="p-4 sm:p-6 space-y-4"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  <div className="text-[#5a7a5a] text-xs">
                    // REVIEW_BEFORE_DEPLOY
                  </div>

                  {/* Delivery info */}
                  <div className="border border-[#1a2e1a] bg-[#0a0f0a] p-3 sm:p-4 space-y-1 text-xs">
                    {(
                      [
                        ["Name", form.name],
                        ["Phone", form.phone],
                        ["Governorate", govInfo?.label ?? "—"],
                        ["City", form.city],
                        ["Address", form.address],
                        ...(form.email ? [["Email", form.email]] : []),
                      ] as [string, string][]
                    ).map(([k, v]) => (
                      <div key={k} className="flex gap-2 sm:gap-3">
                        <span className="text-[#3a5a3a] w-20 sm:w-24 flex-shrink-0">
                          {k}:
                        </span>
                        <span className="text-[#00FF00] break-all">{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Items */}
                  <div className="border border-[#1a2e1a] bg-[#0a0f0a] p-3 sm:p-4 space-y-2 text-xs">
                    {items.map((item) => (
                      <div
                        key={`${item.id}-${item.size}`}
                        className="flex justify-between text-[#5a7a5a] gap-2"
                      >
                        <span className="truncate">
                          {item.name} — {item.size} ×{item.quantity}
                        </span>
                        <span className="flex-shrink-0">${item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="border-t border-[#1a2e1a] pt-2 flex justify-between text-[#5a7a5a]">
                      <span>Subtotal</span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-[#5a7a5a]">
                      <span>Shipping to {govInfo?.label}</span>
                      <span>{govInfo?.shipping} EGP</span>
                    </div>
                    <div className="border-t border-[#1a2e1a] pt-2 flex justify-between font-bold text-sm">
                      <span className="text-white">GRAND_TOTAL</span>
                      <span className="text-[#00FF00] text-right">
                        {subtotal + (govInfo?.shipping ?? 0)} EGP
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#3a5a3a]">
                      <Clock size={10} /> Delivery in {govInfo?.days} business days — Cash on Delivery
                    </div>
                  </div>

                  <div className="text-[10px] text-[#3a5a3a] flex items-center gap-1">
                    <Lock size={10} /> Payment on delivery — Cash on Delivery (COD)
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2">
                    <button
                      onClick={() => setStep(2)}
                      className="border border-[#1a2e1a] px-6 py-2.5 text-xs text-[#5a7a5a] hover:text-white transition-all order-2 sm:order-1"
                    >
                      ← EDIT
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleSubmit}
                      className="neon-btn px-8 py-3 text-sm font-bold tracking-widest rounded-sm flex items-center justify-center gap-2 order-1 sm:order-2"
                    >
                      <Zap size={16} /> CONFIRM_ORDER
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
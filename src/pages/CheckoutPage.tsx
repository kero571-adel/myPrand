import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Trash2, Lock } from 'lucide-react';
import Footer from '../components/Footer';
import { useCart } from '../lib/CartContext';

const STEPS = [
  { id: 1, label: '01_STAGING' },
  { id: 2, label: '02_BUILD (ADDRESS)' },
  { id: 3, label: '03_TEST (PAYMENT)' },
  { id: 4, label: '04_↗' },
];

interface InputProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  span?: number;
}

function TerminalInput({ label, placeholder, type = 'text', value, onChange, span = 1 }: InputProps) {
  return (
    <div
      className={span === 2 ? 'col-span-2' : 'col-span-2 sm:col-span-1'}
      style={{ fontFamily: "'Fira Code', monospace" }}
    >
      <label className="block text-[10px] text-[#5a7a5a] mb-1 tracking-wider">{label}</label>
      <div className="flex items-center border border-[#1a2e1a] bg-[#0a0f0a] focus-within:border-[#00FF00] focus-within:shadow-[0_0_8px_rgba(0,255,0,0.25)] transition-all">
        <span className="px-2 text-[#00FF00] text-sm flex-shrink-0">&gt;</span>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent py-2.5 pr-3 text-[#00FF00] text-xs outline-none placeholder-[#1a3a1a]"
          style={{ fontFamily: "'Fira Code', monospace" }}
        />
      </div>
    </div>
  );
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  card: string;
  expiry: string;
  cvv: string;
}

const demoItems = [
  {
    id: 'module-jacket-v2',
    name: 'MODULE_JACKET_V2',
    size: 'L',
    quantity: 1,
    price: 320,
    priceHex: '0x00F8',
    image: '/images/module_jacket.jpg',
  },
  {
    id: 'ghost-in-shell-tee',
    name: 'NEURAL_TEE',
    size: 'M',
    quantity: 1,
    price: 69,
    priceHex: '0x0045',
    image: '/images/ghost_tee.jpg',
  },
];

export default function CheckoutPage() {
  const { items, removeItem, total } = useCart();
  const [step, setStep] = useState(2);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    card: '',
    expiry: '',
    cvv: '',
  });

  const displayItems = items.length > 0 ? items : demoItems;
  const displayTotal = items.length > 0 ? total : 389;
  const shipping = 26;
  const displayTotalHex =
    '0x' + (displayTotal + shipping).toString(16).padStart(4, '0').toUpperCase();

  const update =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-[#050a05] grid-bg">
        <main className="flex-1 flex items-center justify-center pt-14 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            <div
              className="text-7xl font-bold text-[#00FF00] mb-4"
              style={{ textShadow: '0 0 30px rgba(0,255,0,0.8)' }}
            >
              ✓
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">BUILD_SUCCESS</h2>
            <p className="text-[#5a7a5a] text-sm mb-2">// Deployment pipeline executed.</p>
            <p className="text-[#00FF00] text-xs mb-8">
              &gt; Your artifacts are queued for shipment.
            </p>
            <div className="border border-[#1a2e1a] bg-[#080d08] p-4 text-left text-xs text-[#5a7a5a] mb-6">
              <div className="text-[#3a5a3a] mb-2">// DEPLOYMENT_LOG</div>
              <div className="space-y-1">
                <div>
                  <span className="text-[#00FF00]">[OK]</span> Payment processed
                </div>
                <div>
                  <span className="text-[#00FF00]">[OK]</span> Order confirmed
                </div>
                <div>
                  <span className="text-[#00FF00]">[OK]</span> Shipping queued
                </div>
                <div>
                  <span className="text-[#00FF00]">[OK]</span> Confirmation sent to{' '}
                  {form.email || 'user@domain.com'}
                </div>
              </div>
            </div>
            <button
              onClick={() => (window.location.href = '/')}
              className="neon-btn px-8 py-3 text-sm font-bold tracking-widest rounded-sm"
            >
              RETURN_HOME()
            </button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#050a05] grid-bg">
      <main className="flex-1 pt-14">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00FF00] mb-2"
              style={{ textShadow: '0 0 20px rgba(0,255,0,0.5)' }}
            >
              DEPLOYMENT PIPELINE
            </h1>
            <p className="text-[#5a7a5a] text-xs tracking-wider">
              STATUS: IN_PROGRESS // AWAITING_INPUT
            </p>
          </motion.div>

          {/* Pipeline Steps */}
          <div className="mb-6 overflow-x-auto">
            <div className="flex items-center min-w-max border border-[#1a2e1a] bg-[#080d08]">
              {STEPS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStep(s.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-[10px] tracking-wider transition-all border-r last:border-r-0 border-[#1a2e1a] ${
                    step === s.id
                      ? 'text-[#00FF00] bg-[#0a1a0a] border-b-2 border-b-[#00FF00]'
                      : step > s.id
                      ? 'text-[#3a5a3a]'
                      : 'text-[#2a3a2a] cursor-default'
                  }`}
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  {step > s.id && <span className="text-[#00FF00]">✓</span>}
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Grid */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT: Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-1 min-w-0"
            >
              <div className="border border-[#1a2e1a] bg-[#080d08] overflow-hidden">
                {/* Form header */}
                <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1a2e1a] bg-[#0a0f0a]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <span
                    className="text-[10px] text-[#5a7a5a] ml-2"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    BUILD_CONFIG.yml
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="p-5 sm:p-6">
                  <div
                    className="text-[#5a7a5a] text-xs mb-6"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    &gt; ENTER DESTINATION COORDINATES FOR ARTIFACT DEPLOYMENT.
                  </div>

                  {/* Address Fields */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                    <TerminalInput
                      label="var.firstName"
                      placeholder="_ "
                      value={form.firstName}
                      onChange={update('firstName')}
                    />
                    <TerminalInput
                      label="var.lastName"
                      placeholder="_ "
                      value={form.lastName}
                      onChange={update('lastName')}
                    />
                    <TerminalInput
                      label="var.emailAddress"
                      placeholder="user@domain.com"
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      span={2}
                    />
                    <TerminalInput
                      label="var.shippingAddress"
                      placeholder="123 Main St"
                      value={form.address}
                      onChange={update('address')}
                      span={2}
                    />
                    <TerminalInput
                      label="var.city"
                      placeholder="_ "
                      value={form.city}
                      onChange={update('city')}
                    />
                    <div className="col-span-2 sm:col-span-1 grid grid-cols-2 gap-3">
                      <TerminalInput
                        label="var.state"
                        placeholder="_ "
                        value={form.state}
                        onChange={update('state')}
                      />
                      <TerminalInput
                        label="var.zip"
                        placeholder="_ "
                        value={form.zip}
                        onChange={update('zip')}
                      />
                    </div>
                  </div>

                  {/* Payment */}
                  <div
                    className="border-t border-[#1a2e1a] pt-5 mb-6"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    <div className="text-[#5a7a5a] text-[10px] tracking-wider mb-4 flex items-center gap-2">
                      <Lock size={12} className="text-[#00FF00]" />
                      // PAYMENT_MODULE — ENCRYPTED_CHANNEL
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <TerminalInput
                        label="var.cardNumber"
                        placeholder="0000 0000 0000 0000"
                        value={form.card}
                        onChange={update('card')}
                        span={2}
                      />
                      <TerminalInput
                        label="var.expiry"
                        placeholder="MM/YY"
                        value={form.expiry}
                        onChange={update('expiry')}
                      />
                      <TerminalInput
                        label="var.cvv"
                        placeholder="___"
                        type="password"
                        value={form.cvv}
                        onChange={update('cvv')}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex justify-end">
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.97 }}
                      className="neon-btn px-8 py-3.5 text-sm font-bold tracking-widest rounded-sm flex items-center gap-2"
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                      <Zap size={16} />
                      EXECUTE_BUILD
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* RIGHT: Staging Area */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-80 xl:w-96 flex-shrink-0"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              <div className="border border-[#1a2e1a] bg-[#080d08] overflow-hidden">
                <div className="px-4 py-2 border-b border-[#1a2e1a] bg-[#0a0f0a]">
                  <span className="text-[10px] text-[#5a7a5a] tracking-wider">
                    STAGING_AREA.log
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="text-white font-bold text-sm tracking-widest mb-1">
                    STAGING_AREA
                  </h3>
                  <p className="text-[#3a5a3a] text-[10px] mb-4">
                    {displayItems.length} ARTIFACT
                    {displayItems.length !== 1 ? 'S' : ''} PENDING DEPLOYMENT
                  </p>

                  {/* Item List */}
                  <div className="space-y-3 mb-4">
                    {displayItems.map((item, i) => (
                      <div
                        key={`${item.id}-${item.size}`}
                        className="flex gap-3 border border-[#1a2e1a] bg-[#0a0f0a] p-2"
                      >
                        <div className="text-[#3a5a3a] text-[10px] w-4 flex-shrink-0 pt-0.5">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <div className="w-12 h-14 overflow-hidden bg-[#080d08] flex-shrink-0 border border-[#1a2e1a]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover grayscale"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-[10px] font-bold truncate">
                            {item.name}
                          </div>
                          <div className="text-[#5a7a5a] text-[9px]">
                            SIZE: {item.size} | VAR:{' '}
                            {item.size === 'L'
                              ? 'OBSIDIAN'
                              : item.size === 'M'
                              ? 'GLITCH'
                              : 'STATIC'}
                          </div>
                          <div className="text-[#00FF00] text-[10px] mt-1 font-bold">
                            {'priceHex' in item
                              ? (item as { priceHex: string }).priceHex
                              : '0x' + item.price.toString(16).padStart(4, '0').toUpperCase()}
                          </div>
                        </div>
                        {items.length > 0 && (
                          <button
                            onClick={() => removeItem(item.id, item.size)}
                            className="text-[#3a5a3a] hover:text-red-400 transition-colors flex-shrink-0 self-start"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="border-t border-[#1a2e1a] pt-3 space-y-2">
                    <div className="flex justify-between text-xs text-[#5a7a5a]">
                      <span>&gt; SUB_ROUTINE</span>
                      <span className="text-[#8aaa8a]">
                        0x{displayTotal.toString(16).padStart(4, '0').toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-[#5a7a5a]">
                      <span>&gt; DATA_TRANSFER_FEE</span>
                      <span className="text-[#8aaa8a]">0x001A</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold border-t border-[#1a2e1a] pt-2 mt-2">
                      <span className="text-white">&gt; TOTAL_ALLOCATION</span>
                      <span
                        className="text-[#00FF00]"
                        style={{ textShadow: '0 0 10px rgba(0,255,0,0.5)' }}
                      >
                        {displayTotalHex}
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px] text-[#3a5a3a]">
                      <span />
                      <span>${displayTotal + shipping} USD</span>
                    </div>
                  </div>

                  {/* Security note */}
                  <div className="mt-4 border-t border-[#1a2e1a] pt-3 flex items-start gap-2 text-[9px] text-[#2a4a2a]">
                    <Lock size={10} className="text-[#3a5a3a] flex-shrink-0 mt-0.5" />
                    CONNECTION SECURED VIA STYL_CRYPT_V2
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

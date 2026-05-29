import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

export default function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // هنا بتقدر تضيف logic للإرسال
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | DCTOH</title>

        <meta
          name="description"
          content="Contact DCTOH developer streetwear brand for support, collaborations, and questions."
        />

        <link rel="canonical" href="https://dctoh.vercel.app/contact" />
      </Helmet>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Hero BG */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/images/hero_bg.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 z-0 bg-[#050a05]/75" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,255,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Vertical rain lines */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(0,255,0,0.3) 0px, transparent 1px, transparent 38px, rgba(0,255,0,0.3) 39px)",
            backgroundSize: "40px 100%",
          }}
        />

        {/* Main content */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-20 pt-28">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
              style={{
                fontFamily: "'Fira Code', monospace",
                textShadow: "0 0 30px rgba(0,255,0,0.2)",
              }}
            >
              CONTACT<span className="text-[#00FF00]">_US()</span>
            </h1>
            <p
              className="text-[#8aaa8a] text-sm tracking-widest"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              Get In Touch With Our Team
            </p>
          </motion.div>

          {/* Contact Container */}
          <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {[
                {
                  icon: Mail,
                  label: "EMAIL",
                  value: "hello@dctoh.dev",
                  color: "#00FF00",
                },
                {
                  icon: Phone,
                  label: "PHONE",
                  value: "+1 (555) 123-4567",
                  color: "#00FF00",
                },
                {
                  icon: MapPin,
                  label: "LOCATION",
                  value: "Developer Universe, Tech City",
                  color: "#00FF00",
                },
              ].map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <motion.div
                    key={contact.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div
                      className="flex-shrink-0 mt-1"
                      style={{ color: contact.color }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <p
                        className="text-[#8aaa8a] text-xs tracking-widest mb-1"
                        style={{ fontFamily: "'Fira Code', monospace" }}
                      >
                        {contact.label}
                      </p>
                      <p
                        className="text-[#00FF00] text-sm"
                        style={{ fontFamily: "'Fira Code', monospace" }}
                      >
                        {contact.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-[#1a3a1a] bg-[#050a05]/85 backdrop-blur-sm rounded-sm p-6 sm:p-8"
              style={{
                boxShadow:
                  "0 0 40px rgba(0,255,0,0.12), 0 0 80px rgba(0,255,0,0.06)",
              }}
            >
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4 p-4 border border-[#00FF00] bg-[#00FF00]/10 rounded-sm"
                >
                  <p
                    className="text-[#00FF00] text-sm text-center"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    ✓ MESSAGE_SENT_SUCCESSFULLY()
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                  <label
                    className="block text-[#8aaa8a] text-xs tracking-widest mb-2"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    NAME_()
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-[#0a0f0a] border border-[#1a2e1a] text-[#00FF00] focus:border-[#00FF00] focus:outline-none transition-colors rounded-sm"
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: "14px",
                    }}
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label
                    className="block text-[#8aaa8a] text-xs tracking-widest mb-2"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    EMAIL_()
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-[#0a0f0a] border border-[#1a2e1a] text-[#00FF00] focus:border-[#00FF00] focus:outline-none transition-colors rounded-sm"
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: "14px",
                    }}
                    placeholder="your@email.com"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label
                    className="block text-[#8aaa8a] text-xs tracking-widest mb-2"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    MESSAGE_()
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-[#0a0f0a] border border-[#1a2e1a] text-[#00FF00] focus:border-[#00FF00] focus:outline-none transition-colors rounded-sm resize-none"
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: "14px",
                    }}
                    placeholder="Your message here..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full neon-btn px-6 py-3 rounded-sm text-sm font-bold tracking-widest flex items-center justify-center gap-2 mt-6"
                >
                  <Send size={16} />
                  SEND_MESSAGE()
                </motion.button>
              </form>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </>
  );
}

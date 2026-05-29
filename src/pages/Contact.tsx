import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

    try {
      setLoading(true);

      await emailjs.send(
        "service_d63fms6",
        "template_d5tkxh4",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          phone: formData.phone,
          to_email: "kerolesadel297@gmail.com",
        },
        "2BPzhNkrbgfk4N8i_"
      );

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
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

        <div className="absolute inset-0 z-0 bg-[#050a05]/75" />

        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-20 pt-28">
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

          <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: "EMAIL",
                  value: "kerolesadel297@gmail.com",
                  link: "https://wa.me/201272442140?text=Hello%20DCTOH",
                },
                {
                  icon: Phone,
                  label: "PHONE",
                  value: "01272442140",
                  link: "https://wa.me/201272442140",
                },
                {
                  icon: MapPin,
                  label: "LOCATION",
                  value: "Egypt",
                },
              ].map((contact, index) => {
                const Icon = contact.icon;

                return (
                  <motion.div
                    key={contact.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + index * 0.1,
                    }}
                    className="flex items-start gap-4"
                  >
                    <div className="text-[#00FF00] mt-1">
                      <Icon size={20} />
                    </div>

                    <div>
                      <p
                        className="text-[#8aaa8a] text-xs tracking-widest mb-1"
                        style={{
                          fontFamily: "'Fira Code', monospace",
                        }}
                      >
                        {contact.label}
                      </p>

                      {contact.link ? (
                        <a
                          href={contact.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00FF00] text-sm hover:underline transition-all"
                          style={{
                            fontFamily: "'Fira Code', monospace",
                          }}
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <p
                          className="text-[#00FF00] text-sm"
                          style={{
                            fontFamily: "'Fira Code', monospace",
                          }}
                        >
                          {contact.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
              
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-[#1a3a1a] bg-[#050a05]/85 backdrop-blur-sm rounded-sm p-6 sm:p-8"
            >
              {submitted && (
                <div className="mb-4 p-4 border border-[#00FF00] bg-[#00FF00]/10 rounded-sm">
                  <p
                    className="text-[#00FF00] text-sm text-center"
                    style={{
                      fontFamily: "'Fira Code', monospace",
                    }}
                  >
                    ✓ MESSAGE_SENT_SUCCESSFULLY()
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[#8aaa8a] text-xs tracking-widest mb-2">
                    NAME_()
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-[#0a0f0a] border border-[#1a2e1a] text-[#00FF00] focus:border-[#00FF00] focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-[#8aaa8a] text-xs tracking-widest mb-2">
                    PHONE_()
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-[#0a0f0a] border border-[#1a2e1a] text-[#00FF00] focus:border-[#00FF00] focus:outline-none"
                    placeholder="01234567890"
                  />
                </div>
                <div>
                  <label className="block text-[#8aaa8a] text-xs tracking-widest mb-2">
                    EMAIL_()
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-[#0a0f0a] border border-[#1a2e1a] text-[#00FF00] focus:border-[#00FF00] focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-[#8aaa8a] text-xs tracking-widest mb-2">
                    MESSAGE_()
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-[#0a0f0a] border border-[#1a2e1a] text-[#00FF00] focus:border-[#00FF00] focus:outline-none resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full neon-btn px-6 py-3 rounded-sm text-sm font-bold tracking-widest flex items-center justify-center gap-2 mt-6"
                >
                  <Send size={16} />

                  {loading ? "SENDING..." : "SEND_MESSAGE()"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </main>

        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </>
  );
}

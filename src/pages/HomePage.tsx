import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Footer from "../components/Footer";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Hero BG */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/images/hero_bg.jpg)",
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
        {/* Hero Terminal Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl"
        >
          <div
            className="border border-[#1a3a1a] bg-[#050a05]/85 backdrop-blur-sm rounded-sm overflow-hidden"
            style={{
              boxShadow:
                "0 0 40px rgba(0,255,0,0.12), 0 0 80px rgba(0,255,0,0.06)",
            }}
          >
            {/* Top bar */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1a2e1a] bg-[#0a0f0a]/80">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>

            {/* Hero Text */}
            <div className="px-6 sm:px-10 py-10 sm:py-14 text-center">
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                style={{
                  fontFamily: "'Fira Code', monospace",
                  textShadow: "0 0 30px rgba(0,255,0,0.2)",
                }}
              >
                Welcome To The{" "}
                <span
                  className="text-[#00FF00]"
                  style={{
                    textShadow:
                      "0 0 20px rgba(0,255,0,0.8), 0 0 40px rgba(0,255,0,0.4)",
                  }}
                >
                  Developer
                </span>{" "}
                Universe
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-[#8aaa8a] text-sm sm:text-base tracking-widest"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                Wear The Code. Build Your Identity.
              </motion.p>
            </div>
          </div>

          {/* Terminal input line */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="mt-6 mx-auto w-full max-w-sm sm:max-w-md px-4"
          >
            <div
              className="flex items-center gap-2 border border-[#00FF00] bg-[#050a05]/90 backdrop-blur-sm rounded-sm cursor-pointer hover:bg-[#0a0f0a] transition-colors"
              style={{
                padding: "clamp(10px, 2vw, 12px)",
                boxShadow: "0 0 15px rgba(0,255,0,0.25)",
                fontFamily: "'Fira Code', monospace",
              }}
              onClick={() => navigate("/collections")}
            >
              <span
                className="text-[#00FF00] font-bold flex-shrink-0"
                style={{ fontSize: "clamp(12px, 2vw, 16px)" }}
              >
                &gt;
              </span>
              <span
                className="text-[#00FF00] flex-1 min-w-0"
                style={{ fontSize: "clamp(10px, 1.5vw, 14px)" }}
              >
                import &#123; drip &#125; from &quot;./collection&quot;
              </span>
              <span
                className="inline-block bg-[#00FF00] cursor-blink flex-shrink-0"
                style={{
                  width: "clamp(2px, 0.5vw, 3px)",
                  height: "clamp(12px, 2vw, 16px)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() => navigate("/collections")}
            className="neon-btn px-8 py-3 rounded-sm text-sm font-bold tracking-widest flex items-center gap-2"
          >
            <ChevronRight size={16} />
            ENTER_COLLECTION()
          </button>
          <button
            onClick={() => navigate("/terminal")}
            className="neon-btn-outline px-8 py-3 rounded-sm text-sm font-bold tracking-widest border border-[#00FF00]"
          >
            OPEN_TERMINAL()
          </button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16"
        >
          {[
            { label: "ASSETS_COMPILED", value: "12" },
            { label: "DROPS_DEPLOYED", value: "01" },
            { label: "DEVS_ONLINE", value: "4.2K" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              <div
                className="text-2xl sm:text-3xl font-bold text-[#00FF00]"
                style={{ textShadow: "0 0 15px rgba(0,255,0,0.6)" }}
              >
                {stat.value}
              </div>
              <div className="text-[#3a5a3a] text-[10px] tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

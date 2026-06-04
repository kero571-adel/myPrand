import { useNavigate } from "react-router-dom";
import { m } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";

export default function HomePage() {
  const navigate = useNavigate();
  const [devsOnline, setDevsOnline] = useState(4.2);
  useEffect(() => {
    const interval = setInterval(() => {
      setDevsOnline((prev) => {
        const change = (Math.random() - 0.5) * 0.8;
        const newValue = Math.max(3.5, Math.min(5.8, prev + change));
        return parseFloat(newValue.toFixed(1));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Helmet>
        <title>DCTOH | Programmer Streetwear Brand</title>

        <meta
          name="description"
          content="Cyberpunk streetwear brand for programmer and programmers. Premium clothing inspired by coding culture, techwear, and developer lifestyle."
        />

        <meta
          name="keywords"
          content="developer clothing, programmer fashion, coding clothes, cyberpunk streetwear, techwear brand, developer hoodie"
        />

        <link rel="canonical" href="https://dctoh.vercel.app/" />

        <meta property="og:title" content="DCTOH | Developer Streetwear" />

        <meta
          property="og:description"
          content="Wear the code. Build your identity."
        />

        <meta
          property="og:image"
          content="https://dctoh.vercel.app/images/og-cover.png"
        />

        <meta property="og:url" content="https://dctoh.vercel.app/" />

        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
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
        <main className="text-center relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-20 pt-28">
          <div className="mb-6 w-full px-4">
            <div
              className="flex items-center justify-center gap-2 border border-[#00FF00]/40 bg-[#00FF00]/10 px-3 sm:px-4 py-2 rounded-sm flex-wrap"
              style={{
                boxShadow: "0 0 20px rgba(0,255,0,0.15)",
                fontFamily: "'Fira Code', monospace",
              }}
            >
              <span className="text-[#00FF00] flex-shrink-0">●</span>

              <span className="text-[#00FF00] text-[10px] sm:text-xs md:text-sm font-bold tracking-wider flex-shrink-0">
                SYSTEM_ALERT:
              </span>

              <span className="text-white text-[10px] sm:text-xs md:text-sm tracking-wide">
                30% OFF SHIPPING FOR A LIMITED TIME
              </span>
            </div>
          </div>
          {/* Hero Terminal Box */}
          <m.div
             initial={{ y: 30 }}
             animate={{ y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
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
                <h1
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
                    Programmer
                  </span>{" "}
                  Universe
                </h1>

                <p
                  className="text-[#8aaa8a] text-sm sm:text-base tracking-widest"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  Wear The Code. Build Your Identity.
                </p>
              </div>
            </div>

            {/* Terminal input line */}
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
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
              </div>
            </m.div>
          </m.div>

          {/* CTA Buttons */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
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
          </m.div>

          {/* Stats Row */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16"
          >
            {[
              { label: "ASSETS_COMPILED", value: "12" },
              { label: "DROPS_DEPLOYED", value: "01" },
              { label: "DEVS_ONLINE", value: devsOnline.toString() },
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
                <div className="text-[#6a9a6a] text-[10px] tracking-widest mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </m.div>
        </main>

        {/* Footer */}
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </>
  );
}

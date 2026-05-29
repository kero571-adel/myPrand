import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Footer from "../components/Footer";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* BG */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/images/hero_bg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      />
      <div className="absolute inset-0 z-0 bg-[#050a05]/75" />
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1
            className="text-7xl sm:text-8xl font-bold text-[#ff5f57] mb-4"
            style={{
              fontFamily: "'Fira Code', monospace",
              textShadow: "0 0 30px rgba(255, 95, 87, 0.3)",
            }}
          >
            404
          </h1>

          <h2
            className="text-2xl sm:text-4xl font-bold text-white mb-4"
            style={{
              fontFamily: "'Fira Code', monospace",
              textShadow: "0 0 20px rgba(0, 255, 0, 0.2)",
            }}
          >
            PAGE_NOT_FOUND()
          </h2>

          <p
            className="text-[#8aaa8a] text-sm sm:text-base tracking-widest mb-8 max-w-md"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            The resource you're looking for doesn't exist in our universe.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="neon-btn px-8 py-3 rounded-sm text-sm font-bold tracking-widest flex items-center gap-2 mx-auto"
          >
            <ChevronRight size={16} />
            RETURN_HOME()
          </motion.button>
        </motion.div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
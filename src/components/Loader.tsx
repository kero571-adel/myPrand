// src/components/Loader.tsx
import { motion } from "framer-motion";

export default function Loader({ fullScreen = false }: { fullScreen?: boolean }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050a05]">
        <div className="text-center" style={{ fontFamily: "'Fira Code', monospace" }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-2 border-[#1a2e1a] border-t-[#00FF00] rounded-full mx-auto mb-4"
          />
          <p className="text-[#00FF00] text-xs tracking-widest">LOADING_...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8" style={{ fontFamily: "'Fira Code', monospace" }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-[#1a2e1a] border-t-[#00FF00] rounded-full"
      />
      <span className="text-[#00FF00] text-[10px] ml-3 tracking-widest">LOADING_...</span>
    </div>
  );
}
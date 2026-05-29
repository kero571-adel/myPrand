import { useEffect, useState } from "react";

export default function ComingSoonPage() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050a05] text-[#c8d8c8]">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-8 animate-pulse">
          Welcome to the Developers is World
        </h1>
        <h1 className="text-2xl md:text-4xl font-bold mb-8 animate-pulse">
          2026/5/31
        </h1>
        <p className="text-3xl md:text-4xl font-semibold text-[#7fb47f] animate-bounce">
          Soon{dots}
        </p>
      </div>
    </div>
  );
}

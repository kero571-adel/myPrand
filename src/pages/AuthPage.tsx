import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { Helmet } from "react-helmet-async";
export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, signup, loginWithGoogle } = useAuth();
  const handleSubmit = async () => {
    if (!email || !password) return;
    setError("");
    setLoading(true);
    try {
      if (mode === "login") await login(email, password);
      else await signup(email, password);
      navigate("/");
    } catch (e: any) {
      const msg: Record<string, string> = {
        "auth/invalid-credential": "Wrong email or password.",
        "auth/email-already-in-use": "Email already registered.",
        "auth/weak-password": "Password must be at least 6 characters.",
        "auth/invalid-email": "Invalid email address.",
      };
      setError(msg[e.code] ?? "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | DCTOH</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div
        className="min-h-screen bg-[#050a05] grid-bg flex flex-col items-center justify-center px-3 sm:px-4 py-6"
        style={{ fontFamily: "'Fira Code', monospace" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm border border-[#1a2e1a] bg-[#080d08]"
        >
          {/* Header */}
          <div className="px-4 sm:px-6 pt-6 sm:pt-8 pb-3 sm:pb-4 border-b border-[#1a2e1a]">
            <h1
              className="text-[#00FF00] font-bold"
              style={{
                textShadow: "0 0 20px rgba(0,255,0,0.5)",
                fontSize: "clamp(20px, 5vw, 24px)",
              }}
            >
              {mode === "login" ? "LOGIN_()" : "REGISTER_()"}
            </h1>
            <p
              className="text-[#3a5a3a] mt-1"
              style={{ fontSize: "clamp(9px, 1.2vw, 11px)" }}
            >
              {mode === "login"
                ? "// authenticate to access your orders"
                : "// create a new account"}
            </p>
          </div>

          {/* Form */}
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            {/* Email */}
            <div>
              <label
                className="block text-[#5a7a5a] mb-1 tracking-wider"
                style={{ fontSize: "clamp(8px, 1vw, 10px)" }}
              >
                var.email <span className="text-[#00FF00]">*</span>
              </label>
              <div className="flex items-center border border-[#1a2e1a] bg-[#0a0f0a] focus-within:border-[#00FF00] focus-within:shadow-[0_0_8px_rgba(0,255,0,0.2)] transition-all">
                <span
                  className="px-2 text-[#00FF00] flex-shrink-0"
                  style={{ fontSize: "clamp(11px, 1.5vw, 14px)" }}
                >
                  &gt;
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@domain.com"
                  className="flex-1 bg-transparent py-2 sm:py-3 pr-3 text-[#00FF00] outline-none placeholder-[#1a3a1a] min-w-0"
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    fontSize: "clamp(10px, 1.2vw, 12px)",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-[#5a7a5a] mb-1 tracking-wider"
                style={{ fontSize: "clamp(8px, 1vw, 10px)" }}
              >
                var.password <span className="text-[#00FF00]">*</span>
              </label>
              <div className="flex items-center border border-[#1a2e1a] bg-[#0a0f0a] focus-within:border-[#00FF00] focus-within:shadow-[0_0_8px_rgba(0,255,0,0.2)] transition-all">
                <span
                  className="px-2 text-[#00FF00] flex-shrink-0"
                  style={{ fontSize: "clamp(11px, 1.5vw, 14px)" }}
                >
                  &gt;
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="flex-1 bg-transparent py-2 sm:py-3 pr-3 text-[#00FF00] outline-none placeholder-[#1a3a1a] min-w-0"
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    fontSize: "clamp(10px, 1.2vw, 12px)",
                  }}
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="border border-[rgba(255,95,87,0.3)] bg-[rgba(255,95,87,0.08)] px-3 py-2 text-[#ff5f57]"
                style={{ fontSize: "clamp(9px, 1vw, 11px)" }}
              >
                ✕ {error}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading || !email || !password}
              className="neon-btn w-full font-bold tracking-widest disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                padding: "clamp(10px, 2.5vw, 12px)",
                fontSize: "clamp(11px, 1.5vw, 14px)",
              }}
            >
              {loading
                ? "PROCESSING..."
                : mode === "login"
                ? "LOGIN →"
                : "CREATE_ACCOUNT →"}
            </button>

            {/* Toggle */}
            <div
              className="text-center text-[#3a5a3a] pt-1"
              style={{ fontSize: "clamp(9px, 1vw, 11px)" }}
            >
              {mode === "login" ? (
                <>
                  No account?{" "}
                  <button
                    onClick={() => {
                      setMode("signup");
                      setError("");
                    }}
                    className="text-[#00FF00] hover:underline"
                  >
                    REGISTER_()
                  </button>
                </>
              ) : (
                <>
                  Have an account?{" "}
                  <button
                    onClick={() => {
                      setMode("login");
                      setError("");
                    }}
                    className="text-[#00FF00] hover:underline"
                  >
                    LOGIN_()
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        <div className="relative my-3 sm:my-4 w-full max-w-sm px-3 sm:px-0">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#1a2e1a]" />
          </div>
          <div className="relative text-center">
            <span
              className="bg-[#050a05] px-2 text-[#3a5a3a]"
              style={{ fontSize: "clamp(8px, 1vw, 10px)" }}
            >
              // OR
            </span>
          </div>
        </div>

        <button
          onClick={async () => {
            setError("");
            setLoading(true);
            try {
              await loginWithGoogle();
              navigate("/");
            } catch (e: any) {
              setError("Google sign-in failed. Try again.");
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading}
          className="w-full max-w-sm px-3 sm:px-4 font-bold tracking-widest border border-[#1a2e1a] text-[#5a7a5a] hover:border-[#00FF00] hover:text-[#00FF00] transition-all disabled:opacity-40"
          style={{
            padding: "clamp(10px, 2.5vw, 12px)",
            fontSize: "clamp(11px, 1.5vw, 14px)",
          }}
        >
          G → CONTINUE_WITH_GOOGLE
        </button>
      </div>
    </>
  );
}

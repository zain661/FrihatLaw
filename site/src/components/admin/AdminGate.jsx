import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Client-side gate only — no real backend auth. Fine for an internal soft
// launch, but swap for real authentication before this holds sensitive data.
const ADMIN_PASSWORD = "Frihat@2026";
const AUTH_KEY = "frihat_admin_auth";

function isUnlocked() {
  return sessionStorage.getItem(AUTH_KEY) === "1";
}

function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (value === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C3B28] to-[#132B1C] flex items-center justify-center px-5 py-16">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm rounded-3xl bg-paper border border-gold/20 shadow-[0_35px_80px_-25px_rgba(0,0,0,0.5)] p-8 text-center"
      >
        <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green/10 text-2xl">🔒</span>
        <h1 className="font-head text-xl font-bold text-ink mb-2">لوحة نشر المقالات</h1>
        <p className="text-sm text-ink-muted mb-6">مخصصة لفريق فريحات جروب الداخلي. أدخل كلمة المرور للمتابعة.</p>
        <input
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="كلمة المرور"
          autoFocus
          className={`w-full rounded-xl border px-4 py-3.5 text-center text-ink outline-none transition-colors mb-2 ${
            error ? "border-red-400 bg-red-50" : "border-green/20 focus:border-gold"
          }`}
        />
        {error && <p className="text-xs text-red-500 mb-3">كلمة المرور غير صحيحة، حاول مرة أخرى.</p>}
        <button
          type="submit"
          className="mt-3 w-full rounded-xl bg-green-deep py-3.5 font-head font-bold text-cream hover:bg-green transition-colors"
        >
          دخول
        </button>
        <Link to="/blog" className="mt-5 inline-block text-xs text-ink-muted hover:text-green transition-colors">
          ← العودة إلى المدونة
        </Link>
      </motion.form>
    </div>
  );
}

export default function AdminGate({ children }) {
  const [unlocked, setUnlocked] = useState(isUnlocked);
  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  return children;
}

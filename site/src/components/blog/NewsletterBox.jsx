import { useState } from "react";

const KEY = "frihat_newsletter_subscribers";

export default function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("يرجى إدخال بريد إلكتروني صحيح.");
      return;
    }
    setError("");
    const list = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (!list.includes(email)) {
      list.push(email);
      localStorage.setItem(KEY, JSON.stringify(list));
    }
    setDone(true);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C3B28] to-[#132B1C] p-7 text-cream shadow-[0_25px_55px_-25px_rgba(15,43,34,0.5)]">
      <div className="pointer-events-none absolute -top-16 -left-10 h-52 w-52 rounded-full bg-gold-light/15 blur-[80px]" />
      <span className="material-symbols-outlined relative mb-3 inline-flex text-2xl text-gold-light">mail</span>
      <h3 className="relative font-head text-lg font-bold mb-2">انضم لنشرتنا القانونية والتطويرية</h3>
      <p className="relative text-sm text-cream/70 leading-relaxed mb-5">
        رؤى قانونية وتحديثات موارد بشرية تصلك أولًا بأول، دون إزعاج.
      </p>
      {done ? (
        <p className="relative rounded-xl bg-cream/10 px-4 py-3 text-sm font-semibold text-gold-light">
          ✓ تم تسجيل اهتمامك بنجاح، شكرًا لانضمامك.
        </p>
      ) : (
        <form onSubmit={submit} className="relative space-y-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="بريدك الإلكتروني"
              className="min-w-0 flex-1 rounded-full border border-cream/20 bg-cream/5 px-4 py-3 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-gold-light transition-colors"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-gold-light px-5 py-3 text-sm font-bold text-green-deep hover:bg-gold-pale transition-colors cursor-pointer"
            >
              اشتراك
            </button>
          </div>
          {error && <p className="text-xs font-semibold text-red-300">{error}</p>}
        </form>
      )}
    </div>
  );
}

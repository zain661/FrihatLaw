import { useState } from "react";
import { subscribeToNewsletter } from "../../lib/articles";

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export default function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setError("يرجى إدخال بريد إلكتروني صحيح.");
      return;
    }

    setStatus("loading");
    setError("");
    try {
      await subscribeToNewsletter(email);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message || "تعذّر إتمام الاشتراك، حاول مرة أخرى.");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C3B28] to-[#132B1C] p-7 text-cream shadow-[0_25px_55px_-25px_rgba(15,43,34,0.5)]">
      <div className="pointer-events-none absolute -top-16 -left-10 h-52 w-52 rounded-full bg-gold-light/15 blur-[80px]" />
      <span className="material-symbols-outlined relative mb-3 inline-flex text-2xl text-gold-light">mail</span>
      <h3 className="relative font-head text-lg font-bold mb-2">انضم لنشرتنا القانونية والتطويرية</h3>
      <p className="relative text-sm text-cream/70 leading-relaxed mb-5">
        رؤى قانونية وتحديثات موارد بشرية تصلك أولًا بأول، دون إزعاج.
      </p>

      {status === "success" ? (
        <p className="relative rounded-xl bg-cream/10 px-4 py-3 text-sm font-semibold text-gold-light">
          شكراً لاشتراكك! 🎉
        </p>
      ) : (
        <form onSubmit={submit} className="relative space-y-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="بريدك الإلكتروني"
              disabled={status === "loading"}
              className="min-w-0 flex-1 rounded-full border border-cream/20 bg-cream/5 px-4 py-3 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-gold-light transition-colors disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 rounded-full bg-gold-light px-5 py-3 text-sm font-bold text-green-deep hover:bg-gold-pale transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "جاري الاشتراك..." : "اشتراك"}
            </button>
          </div>
          {status === "error" && error && <p className="text-xs font-semibold text-red-300">{error}</p>}
        </form>
      )}
    </div>
  );
}

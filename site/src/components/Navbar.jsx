import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { nav } from "../data/shared";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const currentUrl = location.pathname + location.hash;
  const forceDark = location.pathname === "/frihat-ip" || location.pathname.startsWith("/team");
  const dark = scrolled || forceDark;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-4 md:px-8 pt-4 md:pt-5">
      <div
        className={`mx-auto max-w-[1320px] flex items-center justify-between gap-6 rounded-full transition-all duration-500 ${
          scrolled
            ? "bg-paper/85 backdrop-blur-xl shadow-[0_10px_40px_rgba(15,43,34,0.14)] border border-green/10 px-3 py-2"
            : "bg-transparent px-2 py-3"
        }`}
      >
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <span className="h-11 w-11 rounded-full bg-paper flex items-center justify-center overflow-hidden shadow-sm shrink-0">
            <img src="/brand/logo-group.png" alt="فريحات جروب" className="h-9 w-9 object-contain" />
          </span>
          <span className="flex flex-col leading-tight font-head">
            <strong className={`text-base font-extrabold transition-colors ${dark ? "text-green-deep" : "text-cream"}`}>
              فريحات
            </strong>
            <em className={`not-italic text-[0.62rem] tracking-[0.3em] font-bold transition-colors ${dark ? "text-[#354D40]" : "text-gold-light"}`}>
              GROUP
            </em>
          </span>
        </Link>

        <nav
          className={`hidden lg:flex items-center gap-7 text-base font-semibold transition-colors ${
            dark ? "text-[#354D40]/80" : "text-cream/90"
          }`}
        >
          {nav.slice(1).map((item) => {
            const active = item.to.includes("#") ? currentUrl === item.to : location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative w-fit py-1 transition-colors after:absolute after:-bottom-0.5 after:right-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
                  dark
                    ? active
                      ? "text-[#D4AF37] font-bold border-b-2 border-[#D4AF37] after:w-0"
                      : "text-[#354D40] opacity-80 hover:opacity-100 after:w-0"
                    : active
                      ? "text-gold-light font-bold after:w-full"
                      : "text-cream/90 hover:text-gold-light after:w-0 hover:after:w-full"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/#contact"
          className="hidden md:inline-flex items-center rounded-full bg-[#D4AF37] px-6 py-2.5 text-sm font-bold text-green-deep shadow-[0_8px_24px_rgba(212,175,55,0.4)] hover:bg-[#c19d2e] transition-colors font-head"
        >
          تواصل معنا
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="القائمة"
        >
          <span className={`w-6 h-0.5 rounded-full transition-colors ${dark ? "bg-green-deep" : "bg-cream"}`} />
          <span className={`w-6 h-0.5 rounded-full transition-colors ${dark ? "bg-green-deep" : "bg-cream"}`} />
          <span className={`w-6 h-0.5 rounded-full transition-colors ${dark ? "bg-green-deep" : "bg-cream"}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="lg:hidden mx-auto max-w-[1320px] mt-3 rounded-3xl bg-paper/95 backdrop-blur-xl border border-green/10 shadow-xl p-3 flex flex-col"
          >
            {nav.slice(1).map((item) => {
              const active = item.to.includes("#") ? currentUrl === item.to : location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3.5 rounded-2xl font-semibold transition-colors ${
                    active ? "text-green bg-green/8" : "text-ink hover:bg-green/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-2xl bg-[#D4AF37] px-4 py-3.5 font-head font-bold text-green-deep hover:bg-[#c19d2e] transition-colors"
            >
              تواصل معنا
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

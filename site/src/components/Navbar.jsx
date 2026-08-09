import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { nav } from "../data/shared";
import { navEn } from "../data/shared.en";
import { useLanguage } from "../lib/LanguageContext";

const COMPANY_PATHS = ["/frihat-legal", "/frihat-ip", "/kayan-nhr"];

function ChevronDown({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function LanguageToggle({ dark }) {
  const { lang, toggle } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggle}
      className={`flex items-center justify-center rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
        dark
          ? "border-[#354D40]/25 text-[#354D40]/80 hover:border-[#D4AF37] hover:text-[#D4AF37]"
          : "border-cream/30 text-cream/90 hover:border-gold-light hover:text-gold-light"
      }`}
      aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
    >
      {lang === "ar" ? "EN" : "AR"}
    </button>
  );
}

function CompaniesDropdown({ dark, active, currentUrl, companyItems, label }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => () => closeTimer.current && clearTimeout(closeTimer.current), []);

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`relative flex w-fit items-center gap-1.5 py-1 transition-colors after:absolute after:-bottom-0.5 after:start-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
          dark
            ? active
              ? "text-[#D4AF37] font-bold border-b-2 border-[#D4AF37] after:w-0"
              : "text-[#354D40] opacity-80 hover:opacity-100 after:w-0"
            : active
              ? "text-gold-light font-bold after:w-full"
              : "text-cream/90 hover:text-gold-light after:w-0 hover:after:w-full"
        }`}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute start-0 top-full z-[110] mt-3 w-72 rounded-xl border border-white/10 bg-black/80 p-2 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            {companyItems.map((item) => {
              const isActive = currentUrl === item.to || currentUrl.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive ? "bg-white/10 text-[#D4AF37]" : "text-cream/90 hover:bg-white/10 hover:text-[#D4AF37]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileCompaniesAccordion({ currentUrl, onNavigate, companyItems, label }) {
  const [open, setOpen] = useState(false);
  const isActive = companyItems.some((item) => currentUrl === item.to || currentUrl.startsWith(item.to));

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex w-full items-center justify-between px-4 py-3.5 rounded-2xl font-semibold transition-colors ${
          isActive ? "text-green bg-green/8" : "text-ink hover:bg-green/5"
        }`}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden ps-3"
          >
            {companyItems.map((item) => {
              const active = currentUrl === item.to || currentUrl.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onNavigate}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    active ? "text-green bg-green/8" : "text-ink/80 hover:bg-green/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { lang } = useLanguage();
  const currentUrl = location.pathname + location.hash;
  const forceDark = location.pathname === "/frihat-ip" || location.pathname.startsWith("/team");
  const dark = scrolled || forceDark;

  const activeNav = lang === "en" ? navEn : nav;
  const companiesLabel = lang === "en" ? "Group Companies" : "شركات المجموعة";
  const contactLabel = lang === "en" ? "Contact Us" : "تواصل معنا";
  const menuLabel = lang === "en" ? "Menu" : "القائمة";

  const companyItems = activeNav.filter((item) => COMPANY_PATHS.includes(item.to));
  const companiesActive = COMPANY_PATHS.some((p) => location.pathname === p || location.pathname.startsWith(p));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const mainItems = activeNav.slice(1).filter((item) => !COMPANY_PATHS.includes(item.to));
  const aboutItem = mainItems.find((item) => item.to === "/#about");
  const restItems = mainItems.filter((item) => item.to !== "/#about");

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
              {lang === "en" ? "Frihat" : "فريحات"}
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
          {aboutItem && (
            <Link
              to={aboutItem.to}
              className={`relative w-fit py-1 transition-colors after:absolute after:-bottom-0.5 after:start-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
                dark
                  ? currentUrl === aboutItem.to
                    ? "text-[#D4AF37] font-bold border-b-2 border-[#D4AF37] after:w-0"
                    : "text-[#354D40] opacity-80 hover:opacity-100 after:w-0"
                  : currentUrl === aboutItem.to
                    ? "text-gold-light font-bold after:w-full"
                    : "text-cream/90 hover:text-gold-light after:w-0 hover:after:w-full"
              }`}
            >
              {aboutItem.label}
            </Link>
          )}

          <CompaniesDropdown dark={dark} active={companiesActive} currentUrl={location.pathname} companyItems={companyItems} label={companiesLabel} />

          {restItems.map((item) => {
            const active = item.to.includes("#") ? currentUrl === item.to : location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative w-fit py-1 transition-colors after:absolute after:-bottom-0.5 after:start-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
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

        <div className="hidden lg:flex items-center gap-3">
          <LanguageToggle dark={dark} />
          <Link
            to="/#contact"
            className="inline-flex items-center rounded-full bg-[#D4AF37] px-6 py-2.5 text-sm font-bold text-green-deep shadow-[0_8px_24px_rgba(212,175,55,0.4)] hover:bg-[#c19d2e] transition-colors font-head"
          >
            {contactLabel}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle dark={dark} />
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1.5"
            aria-label={menuLabel}
          >
            <span className={`w-6 h-0.5 rounded-full transition-colors ${dark ? "bg-green-deep" : "bg-cream"}`} />
            <span className={`w-6 h-0.5 rounded-full transition-colors ${dark ? "bg-green-deep" : "bg-cream"}`} />
            <span className={`w-6 h-0.5 rounded-full transition-colors ${dark ? "bg-green-deep" : "bg-cream"}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="lg:hidden mx-auto max-w-[1320px] mt-3 rounded-3xl bg-paper/95 backdrop-blur-xl border border-green/10 shadow-xl p-3 flex flex-col"
          >
            {aboutItem && (
              <Link
                to={aboutItem.to}
                onClick={() => setOpen(false)}
                className={`px-4 py-3.5 rounded-2xl font-semibold transition-colors ${
                  currentUrl === aboutItem.to ? "text-green bg-green/8" : "text-ink hover:bg-green/5"
                }`}
              >
                {aboutItem.label}
              </Link>
            )}

            <MobileCompaniesAccordion
              currentUrl={location.pathname}
              onNavigate={() => setOpen(false)}
              companyItems={companyItems}
              label={companiesLabel}
            />

            {restItems.map((item) => {
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
              {contactLabel}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

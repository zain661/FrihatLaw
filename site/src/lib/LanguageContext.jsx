import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);
const STORAGE_KEY = "frihat_lang";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "ar";
    return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "ar";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const toggle = () => setLang((l) => (l === "ar" ? "en" : "ar"));

  return <LanguageContext.Provider value={{ lang, setLang, toggle }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

// Pick the matching localized object: useT(lang, arData, enData) -> arData or enData.
export function pick(lang, ar, en) {
  return lang === "en" ? en : ar;
}

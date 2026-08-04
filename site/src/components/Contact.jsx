import { motion } from "framer-motion";
import { contactCta } from "../data/home";
import { contactCtaEn } from "../data/home.en";
import { contact } from "../data/shared";
import { contactEn } from "../data/shared.en";
import { useLanguage } from "../lib/LanguageContext";

const COPY = {
  ar: { tag: "ابدأ اليوم", ctaPrimary: "حجز استشارة", ctaSecondary: "واتساب", address: "العنوان", phone: "الهاتف", email: "البريد الإلكتروني" },
  en: { tag: "Get Started Today", ctaPrimary: "Book a Consultation", ctaSecondary: "WhatsApp", address: "Address", phone: "Phone", email: "Email" },
};

export default function Contact() {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const cta = lang === "en" ? contactCtaEn : contactCta;
  const activeContact = lang === "en" ? contactEn : contact;
  const numAlign = lang === "en" ? "text-left" : "text-right";

  return (
    <section id="contact" className="scroll-mt-24 bg-paper border-t border-gold/12 py-14 md:py-20 px-6 md:px-10">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[36px] border border-gold/25 bg-green px-8 py-16 md:px-16 md:py-20 text-cream shadow-[0_30px_70px_-30px_rgba(15,43,34,0.35)]"
        >
          <div className="absolute -bottom-1/3 -right-1/4 h-[500px] w-[500px] rounded-full bg-gold-light/10 blur-[120px]" />
          <div className="relative grid lg:grid-cols-12 gap-14">
            <div className="lg:col-span-7">
              <p className="font-head text-base tracking-wide leading-relaxed text-gold-light font-semibold uppercase mb-6">{t.tag}</p>
              <h2 className="font-head text-3xl md:text-4xl font-extrabold leading-tight mb-6 max-w-lg">
                {cta.title}
              </h2>
              <p className="text-cream/80 text-lg leading-relaxed max-w-md mb-10">{cta.desc}</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`mailto:${activeContact.email}`}
                  className="inline-flex items-center rounded-full bg-gold-light px-9 py-4 font-head font-bold text-green-deep hover:bg-gold-pale transition-colors"
                >
                  {t.ctaPrimary}
                </a>
                <a
                  href={activeContact.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-cream/40 px-9 py-4 font-head font-bold text-cream hover:bg-cream hover:text-green-deep transition-colors"
                >
                  {t.ctaSecondary}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 lg:border-s lg:border-cream/15 lg:ps-14 space-y-7">
              <div className="group">
                <p className="text-xs uppercase tracking-widest text-gold-light/80 mb-2">{t.address}</p>
                <p className="text-cream/85 leading-relaxed transition-colors duration-300 group-hover:text-cream">{activeContact.address}</p>
              </div>
              <div className="group">
                <p className="text-xs uppercase tracking-widest text-gold-light/80 mb-2">{t.phone}</p>
                {activeContact.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, "")}`}
                    dir="ltr"
                    className={`block text-cream/85 leading-relaxed ${numAlign} transition-colors duration-300 hover:text-gold-light`}
                  >
                    {p}
                  </a>
                ))}
              </div>
              <div className="group">
                <p className="text-xs uppercase tracking-widest text-gold-light/80 mb-2">{t.email}</p>
                <a href={`mailto:${activeContact.email}`} dir="ltr" className={`block text-cream/85 ${numAlign} transition-colors duration-300 hover:text-gold-light`}>
                  {activeContact.email}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

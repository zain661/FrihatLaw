import { motion } from "framer-motion";
import { contactCta } from "../data/home";
import { contact } from "../data/shared";

export default function Contact() {
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
              <p className="font-head text-base tracking-wide leading-relaxed text-gold-light font-semibold uppercase mb-6">ابدأ اليوم</p>
              <h2 className="font-head text-3xl md:text-4xl font-extrabold leading-tight mb-6 max-w-lg">
                {contactCta.title}
              </h2>
              <p className="text-cream/80 text-lg leading-relaxed max-w-md mb-10">{contactCta.desc}</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center rounded-full bg-gold-light px-9 py-4 font-head font-bold text-green-deep hover:bg-gold-pale transition-colors"
                >
                  حجز استشارة
                </a>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-cream/40 px-9 py-4 font-head font-bold text-cream hover:bg-cream hover:text-green-deep transition-colors"
                >
                  واتساب
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 lg:border-r lg:border-cream/15 lg:pr-14 space-y-7">
              <div className="group">
                <p className="text-xs uppercase tracking-widest text-gold-light/80 mb-2">العنوان</p>
                <p className="text-cream/85 leading-relaxed transition-colors duration-300 group-hover:text-cream">{contact.address}</p>
              </div>
              <div className="group">
                <p className="text-xs uppercase tracking-widest text-gold-light/80 mb-2">الهاتف</p>
                {contact.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, "")}`}
                    dir="ltr"
                    className="block text-cream/85 leading-relaxed text-right transition-colors duration-300 hover:text-gold-light"
                  >
                    {p}
                  </a>
                ))}
              </div>
              <div className="group">
                <p className="text-xs uppercase tracking-widest text-gold-light/80 mb-2">البريد الإلكتروني</p>
                <a href={`mailto:${contact.email}`} dir="ltr" className="block text-cream/85 text-right transition-colors duration-300 hover:text-gold-light">
                  {contact.email}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

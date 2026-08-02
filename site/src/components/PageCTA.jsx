import { motion } from "framer-motion";
import { contact } from "../data/shared";

export default function PageCTA({ title, body, button, id, email, whatsapp, phones }) {
  const ctaEmail = email || contact.email;
  const ctaWhatsapp = whatsapp || contact.whatsapp;

  return (
    <section id={id} className="bg-[#F7F5EE] py-24 md:py-32 px-6 md:px-10 scroll-mt-28">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-[#354D40] border border-[#D4AF37]/30 shadow-[0_35px_80px_-25px_rgba(53,77,64,0.45)] px-8 py-16 md:px-16 md:py-20 text-[#F7F5EE] text-center"
        >
          <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_rgba(247,245,238,0.08)]" />
          <div className="absolute -bottom-1/3 -right-1/4 h-[500px] w-[500px] rounded-full bg-[#D4AF37]/15 blur-[120px]" />
          <div className="absolute -top-1/3 -left-1/4 h-[400px] w-[400px] rounded-full bg-[#D4AF37]/10 blur-[110px]" />
          <div className="relative max-w-xl mx-auto">
            <h2 className="font-head text-2xl md:text-4xl font-extrabold leading-tight mb-5">{title}</h2>
            {body && <p className="text-[#F7F5EE]/80 text-lg leading-relaxed mb-10">{body}</p>}
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={`mailto:${ctaEmail}`}
                className="inline-flex items-center rounded-full bg-[#D4AF37] px-9 py-4 font-head font-bold text-[#354D40] hover:bg-[#e0c268] transition-colors"
              >
                {button || "حجز استشارة"}
              </a>
              <a
                href={ctaWhatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-[#F7F5EE]/40 px-9 py-4 font-head font-bold text-[#F7F5EE] hover:bg-[#F7F5EE] hover:text-[#354D40] transition-colors"
              >
                واتساب
              </a>
            </div>
            {phones && phones.length > 0 && (
              <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#F7F5EE]/65">
                {phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/[\s-]/g, "")}`} dir="ltr" className="hover:text-[#D4AF37] transition-colors">
                    {p}
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

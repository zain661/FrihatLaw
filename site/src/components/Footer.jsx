import { Link } from "react-router-dom";
import { nav, contact, contactLink, brand } from "../data/shared";
import { companies } from "../data/home";
import { ip } from "../data/ip";
import { nhr } from "../data/nhr";
import { legal } from "../data/legal";

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="relative inline-block w-fit text-cream/80 transition-colors duration-300 hover:text-cream after:absolute after:-bottom-1 after:right-0 after:h-px after:w-0 after:bg-gold-light after:transition-all after:duration-300 hover:after:w-full"
    >
      {children}
    </Link>
  );
}

const quickLinks = [
  ...["/#about", "/frihat-legal", "/blog"].map((to) => nav.find((item) => item.to === to)),
  contactLink,
];

// Per-entity phone/email shown under each entity name in the "كياناتنا" column.
// Each entity's dedicated direct number, not the shared group line.
const ENTITY_CONTACTS = {
  legal: { phone: legal.office.phones[1], email: legal.office.email },
  ip: { phone: ip.contact.phones[1], email: ip.contact.email },
  nhr: { phone: nhr.contact.phones[1], email: contact.email },
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-green-deep text-cream/90 pt-20 pb-8 px-6 md:px-10 border-t border-gold/25">
      <div className="pointer-events-none absolute -top-32 left-1/3 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[130px]" />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="grid gap-12 lg:grid-cols-12 pb-14 border-b border-cream/10">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-5 w-fit">
              <span className="h-11 w-11 rounded-full bg-paper flex items-center justify-center overflow-hidden shrink-0">
                <img src={brand.logo} alt={brand.nameAr} className="h-9 w-9 object-contain" />
              </span>
              <span className="flex flex-col leading-tight font-head">
                <strong className="text-base font-extrabold text-cream">{brand.nameAr}</strong>
                <em className="not-italic text-[0.62rem] tracking-[0.3em] text-gold-light font-bold">
                  {brand.nameEn.split(" ")[1]}
                </em>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-cream/75 max-w-xs">
              منظومة مؤسسية فلسطينية تجمع الخبرة القانونية، وحماية الملكية الفكرية، وحلول الموارد البشرية تحت مظلة واحدة.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="font-head text-sm tracking-widest leading-relaxed text-gold-light font-semibold uppercase mb-5">كياناتنا</p>
            <ul className="space-y-4 text-sm">
              {companies.map((c) => {
                const entityContact = ENTITY_CONTACTS[c.id];
                return (
                  <li key={c.id}>
                    <FooterLink to={c.href}>{c.name}</FooterLink>
                    {entityContact && (
                      <div className="mt-1 flex flex-col gap-0.5 text-xs text-cream/55">
                        <a href={`tel:${entityContact.phone.replace(/[\s-]/g, "")}`} dir="ltr" className="w-fit text-right hover:text-gold-light transition-colors">
                          {entityContact.phone}
                        </a>
                        <a href={`mailto:${entityContact.email}`} dir="ltr" className="w-fit text-right hover:text-gold-light transition-colors">
                          {entityContact.email}
                        </a>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="font-head text-sm tracking-widest leading-relaxed text-gold-light font-semibold uppercase mb-5">روابط سريعة</p>
            <ul className="space-y-3.5 text-sm">
              {quickLinks.map((item) => (
                <li key={item.to}>
                  <FooterLink to={item.to}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="font-head text-sm tracking-widest leading-relaxed text-gold-light font-semibold uppercase mb-5">تواصل معنا</p>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-2.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mt-0.5 shrink-0 text-gold-light/70">
                  <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                <span className="text-cream/80 leading-relaxed">{contact.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mt-0.5 shrink-0 text-gold-light/70">
                  <path d="M4 5h3.5l1.5 4.5-2 1.5a11 11 0 0 0 5 5l1.5-2 4.5 1.5V19c0 1.1-.9 2-2 2C9.5 21 3 14.5 3 7c0-1.1.9-2 2-2Z" />
                </svg>
                <div className="flex flex-col gap-1">
                  {contact.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} dir="ltr" className="text-cream/80 hover:text-cream transition-colors text-right">
                      {p}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-gold-light/70">
                  <path d="M4 5h16v14H4V5Z" />
                  <path d="m4 6 8 6 8-6" />
                </svg>
                <a href={`mailto:${contact.email}`} dir="ltr" className="text-cream/80 hover:text-cream transition-colors">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 text-xs text-cream/60">
          <p>© 2026 فريحات جروب. جميع الحقوق محفوظة.</p>
          <p className="tracking-widest text-gold-light/60">Legal · IP · NHR</p>
        </div>
      </div>
    </footer>
  );
}

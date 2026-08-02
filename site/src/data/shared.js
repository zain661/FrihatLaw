export const brand = {
  nameAr: "فريحات",
  nameEn: "FRIHAT GROUP",
  logo: "/brand/logo-group.png",
};

export const nav = [
  { label: "الرئيسية", to: "/" },
  { label: "من نحن", to: "/#about" },
  { label: "فريحات محامون ومستشارون", to: "/frihat-legal" },
  { label: "شركة فريحات للملكية الفكرية", to: "/frihat-ip" },
  { label: "شركة كيان NHR للموارد البشرية", to: "/kayan-nhr" },
  { label: "فريق العمل", to: "/team" },
  { label: "المقالات والمدونة", to: "/blog" },
];

// Kept separate from `nav` above: the footer's "quick links" column still
// wants a direct link to the contact section even though the header no
// longer surfaces it as a menu item (it moved to the primary CTA button).
export const contactLink = { label: "تواصل معنا", to: "/#contact" };

export const contact = {
  address: "مبنى فريحات، شارع حيفا، الطابق الأول، بجانب نقابة المقاولين وبنك القاهرة عمان، جنين، فلسطين",
  phones: ["042433012", "+972 56 920 0021", "+972 56 960 7008"],
  email: "info@frihatlaw.ps",
  whatsapp: "https://wa.me/972569200021",
};

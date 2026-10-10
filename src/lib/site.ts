export const ORDER = "https://zingmyorder.com/restaurants/sultan-cafe-201-s-greenville-ave-suite-211-richardson-tx-75081";
export const PHONE = "(972) 528-8570";
export const TEL = "tel:+19725288570";
export const EMAIL = "hakeemrabah@gmail.com";
export const MAPS = "https://www.google.com/maps/dir/?api=1&destination=201+S+Greenville+Ave+Suite+211+Richardson+TX+75081";
export const FB = "https://www.facebook.com/sultancafetexas/";
// From sultancafe.us: 11:30 AM to 12:30 AM. Directory listings say later on weekends; confirm with the owner.
export const HOURS: [number, number] = [11.5, 24.5];

export const asset = (p: string) => (process.env.NEXT_PUBLIC_BASE ?? "") + p;

export type Lang = "en" | "es" | "ar";
export const LANGS: Lang[] = ["en", "es", "ar"];

export function fmt(h: number, l: Lang) {
  const hr = Math.floor(h) % 24, m = String(Math.round((h % 1) * 60)).padStart(2, "0"), h12 = hr % 12 || 12;
  return `${h12}:${m} ${l === "ar" ? (hr < 12 ? "ص" : "م") : hr < 12 ? "AM" : "PM"}`;
}

export function isOpen(now = new Date()) {
  const d = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
  const h = d.getHours() + d.getMinutes() / 60;
  return h < HOURS[1] - 24 || h >= HOURS[0]; // also open just after midnight from last night
}

export const CHROME = {
  en: {
    home: "Home", menu: "Menu", about: "About", gallery: "Gallery", contact: "Contact",
    order: "Order online", orderLong: "Order pickup or delivery", call: "Call",
    tag: "Mediterranean grill & hookah lounge in the heart of Richardson.",
    visit: "Visit", hoursH: "Hours", reach: "Contact", daily: "Open daily", rights: "All rights reserved.",
    open: (t: string) => "Open now · until " + t, opens: (t: string) => "Opens today at " + t,
    langLabel: "Language: English. Switch to Español", themeLabel: "Toggle dark mode", menuBtn: "Open menu",
  },
  es: {
    home: "Inicio", menu: "Menú", about: "Nosotros", gallery: "Galería", contact: "Contacto",
    order: "Ordenar en línea", orderLong: "Ordena para recoger o a domicilio", call: "Llamar",
    tag: "Parrilla mediterránea y hookah lounge en el corazón de Richardson.",
    visit: "Visítanos", hoursH: "Horario", reach: "Contacto", daily: "Abierto todos los días", rights: "Todos los derechos reservados.",
    open: (t: string) => "Abierto ahora · hasta las " + t, opens: (t: string) => "Abre hoy a las " + t,
    langLabel: "Idioma: Español. Cambiar a العربية", themeLabel: "Cambiar modo oscuro", menuBtn: "Abrir menú",
  },
  ar: {
    home: "الرئيسية", menu: "القائمة", about: "من نحن", gallery: "المعرض", contact: "اتصل بنا",
    order: "اطلب أونلاين", orderLong: "اطلب للاستلام أو التوصيل", call: "اتصل",
    tag: "مشويات متوسطية وصالة أرجيلة في قلب ريتشاردسون.",
    visit: "زورونا", hoursH: "ساعات العمل", reach: "تواصل معنا", daily: "مفتوح يوميًا", rights: "جميع الحقوق محفوظة.",
    open: (t: string) => "مفتوح الآن · حتى " + t, opens: (t: string) => "يفتح اليوم الساعة " + t,
    langLabel: "اللغة: العربية. Switch to English", themeLabel: "تبديل الوضع الليلي", menuBtn: "فتح القائمة",
  },
};

export const PAGES = [
  ["home", "/"], ["menu", "/menu/"], ["about", "/about/"], ["gallery", "/gallery/"], ["contact", "/contact/"],
] as const;

export const DISHES: Record<Lang, string[]> = {
  en: ["Shish Tawook", "Lamb Chops", "Mixed Grill", "Kufta Kebab", "Beef Shawarma", "Falafel", "Fattoush", "Baklava", "Kunafa", "Hookah Lounge"],
  es: ["Shish Tawook", "Chuletas de cordero", "Parrillada mixta", "Kufta Kebab", "Shawarma de res", "Falafel", "Fattoush", "Baklava", "Kunafa", "Hookah Lounge"],
  ar: ["شيش طاووق", "ريش غنم", "مشاوي مشكلة", "كفتة كباب", "شاورما لحم", "فلافل", "فتوش", "بقلاوة", "كنافة", "صالة الأرجيلة"],
};

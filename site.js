/* Sultan Café: shared header, footer, language (EN / ES / AR, right-to-left), theme and hours */
(function () {
  const ORDER = "https://zingmyorder.com/restaurants/sultan-cafe-201-s-greenville-ave-suite-211-richardson-tx-75081";
  const PHONE = "(972) 528-8570", TEL = "tel:+19725288570", EMAIL = "hakeemrabah@gmail.com";
  const MAPS = "https://www.google.com/maps/dir/?api=1&destination=201+S+Greenville+Ave+Suite+211+Richardson+TX+75081";
  const FB = "https://www.facebook.com/sultancafetexas/";
  // From sultancafe.us: 11:30 AM to 12:30 AM. Directory listings say later on weekends; confirm with the owner.
  const HOURS = [11.5, 24.5];
  const LANGS = ["en", "es", "ar"];
  const ph = `<bdi dir="ltr">${PHONE}</bdi>`;

  const fmt = (h, l) => {
    const hr = Math.floor(h) % 24, m = String(Math.round((h % 1) * 60)).padStart(2, "0"), h12 = hr % 12 || 12;
    if (l === "ar") return h12 + ":" + m + " " + (hr < 12 ? "ص" : "م");
    return h12 + ":" + m + " " + (hr < 12 ? "AM" : "PM");
  };

  const C = {
    en: {
      home: "Home", menu: "Menu", about: "About", gallery: "Gallery", contact: "Contact",
      order: "Order online", orderLong: "Order pickup or delivery", call: "Call",
      tag: "Mediterranean grill & hookah lounge in the heart of Richardson.",
      visit: "Visit", hoursH: "Hours", reach: "Contact", daily: "Open daily", rights: "All rights reserved.",
      open: t => "Open now · until " + t, opens: t => "Opens today at " + t,
      langLabel: "Language: English. Switch to Español", themeLabel: "Toggle dark mode", menuBtn: "Open menu"
    },
    es: {
      home: "Inicio", menu: "Menú", about: "Nosotros", gallery: "Galería", contact: "Contacto",
      order: "Ordenar en línea", orderLong: "Ordena para recoger o a domicilio", call: "Llamar",
      tag: "Parrilla mediterránea y hookah lounge en el corazón de Richardson.",
      visit: "Visítanos", hoursH: "Horario", reach: "Contacto", daily: "Abierto todos los días", rights: "Todos los derechos reservados.",
      open: t => "Abierto ahora · hasta las " + t, opens: t => "Abre hoy a las " + t,
      langLabel: "Idioma: Español. Cambiar a العربية", themeLabel: "Cambiar modo oscuro", menuBtn: "Abrir menú"
    },
    ar: {
      home: "الرئيسية", menu: "القائمة", about: "من نحن", gallery: "المعرض", contact: "اتصل بنا",
      order: "اطلب أونلاين", orderLong: "اطلب للاستلام أو التوصيل", call: "اتصل",
      tag: "مشويات متوسطية وصالة أرجيلة في قلب ريتشاردسون.",
      visit: "زورونا", hoursH: "ساعات العمل", reach: "تواصل معنا", daily: "مفتوح يوميًا", rights: "جميع الحقوق محفوظة.",
      open: t => "مفتوح الآن · حتى " + t, opens: t => "يفتح اليوم الساعة " + t,
      langLabel: "اللغة: العربية. Switch to English", themeLabel: "تبديل الوضع الليلي", menuBtn: "فتح القائمة"
    }
  };
  const PAGES = [["home", "index.html"], ["menu", "menu.html"], ["about", "about.html"], ["gallery", "gallery.html"], ["contact", "contact.html"]];
  const page = document.body.dataset.page;
  const root = document.documentElement;
  root.classList.add("js");
  const STAR = `<path d="M32 4l8 10 12-2-2 12 10 8-10 8 2 12-12-2-8 10-8-10-12 2 2-12-10-8 10-8-2-12 12 2z"/>`;

  function header(L) {
    const links = PAGES.map(([k, href]) => `<a href="${href}"${k === page ? ' aria-current="page"' : ""}>${L[k]}</a>`).join("");
    return `
    <svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="goldgrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbe7a1"/><stop offset=".45" stop-color="#e2b553"/><stop offset=".7" stop-color="#a8781f"/><stop offset="1" stop-color="#f0cf7a"/></linearGradient></defs></svg>
    <header class="top"><div class="wrap nav">
      <a class="brand" href="index.html" aria-label="Sultan Café"><img src="images/logo.png" alt="Sultan Café" width="330" height="250"></a>
      <nav class="menu-links" aria-label="Main">${links}</nav>
      <div class="tools">
        <button type="button" class="archbtn" id="langbtn" data-l="${lang}" aria-label="${L.langLabel}"><span class="slide"><span>EN</span><span>ES</span><span class="arabic">ع</span></span></button>
        <button type="button" class="starbtn" id="themebtn" aria-label="${L.themeLabel}" aria-pressed="${root.classList.contains("dark")}"><svg viewBox="0 0 64 64" aria-hidden="true"><g class="pt">${STAR}</g><circle class="core" cx="32" cy="32" r="11"/><circle class="moon" cx="32" cy="32" r="7"/></svg></button>
        <a class="btn btn-gold" href="${ORDER}" target="_blank" rel="noopener">${L.order}</a>
        <button type="button" class="burger" id="burger" aria-expanded="false" aria-controls="drawer" aria-label="${L.menuBtn}"><span></span><span></span><span></span></button>
      </div>
    </div></header>
    <div class="drawer" id="drawer">${PAGES.map(([k, href]) => `<a class="dl" href="${href}"${k === page ? ' aria-current="page"' : ""}>${L[k]}</a>`).join("")}
      <a class="btn btn-gold" href="${ORDER}" target="_blank" rel="noopener">${L.orderLong}</a></div>`;
  }

  function footer(L, l) {
    return `
    <footer class="foot"><div class="wrap">
      <div class="foot-grid">
        <div><img src="images/logo.png" alt="Sultan Café" width="330" height="250"><p>${L.tag}</p><a href="${FB}" target="_blank" rel="noopener">Facebook · @sultancafetexas</a></div>
        <div><h4>${L.visit}</h4><a href="${MAPS}" target="_blank" rel="noopener"><bdi>201 S Greenville Ave, Suite 211</bdi><br><bdi>Richardson, TX 75081</bdi></a></div>
        <div><h4>${L.hoursH}</h4><p>${L.daily}<br>${fmt(HOURS[0], l)} - ${fmt(HOURS[1], l)}</p><p class="status" data-status><i></i><span></span></p></div>
        <div><h4>${L.reach}</h4><a href="${TEL}">${ph}</a><a href="mailto:${EMAIL}"><bdi>${EMAIL}</bdi></a><a href="${ORDER}" target="_blank" rel="noopener">${L.order}</a></div>
      </div>
      <div class="foot-base"><span>© ${new Date().getFullYear()} Sultan Café. ${L.rights}</span><span><bdi>201 S Greenville Ave #211 · Richardson, TX</bdi></span></div>
    </div></footer>
    <div class="orderbar"><a class="btn btn-gold" href="${ORDER}" target="_blank" rel="noopener">${L.order}</a><a class="btn btn-line" href="${TEL}">${L.call}</a></div>`;
  }

  function status(L, l) {
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }));
    const h = now.getHours() + now.getMinutes() / 60;
    const open = h < HOURS[1] - 24 || h >= HOURS[0];   // also open just after midnight from last night
    const text = open ? L.open(fmt(HOURS[1], l)) : L.opens(fmt(HOURS[0], l));
    document.querySelectorAll("[data-status]").forEach(el => { el.classList.toggle("open", open); el.querySelector("span").textContent = text; });
  }

  // ---- language: English strings come from the page itself; ES and AR from each page's dictionaries
  const EN = {};
  document.querySelectorAll("[data-i18n]").forEach(el => { EN[el.dataset.i18n] = el.innerHTML; });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => { EN["ph:" + el.dataset.i18nPh] = el.placeholder; });
  document.querySelectorAll("[data-i18n-alt]").forEach(el => { EN["alt:" + el.dataset.i18nAlt] = el.alt; });
  const DICT = { en: EN, es: window.PAGE_ES || {}, ar: window.PAGE_AR || {} };
  const md = document.querySelector('meta[name="description"]');
  DICT.en.__title = document.title;
  DICT.en.__desc = md ? md.content : "";
  let lang = "en";

  function mount() {
    const L = C[lang];
    document.getElementById("site-header").innerHTML = header(L);
    document.getElementById("site-footer").innerHTML = footer(L, lang);
    status(L, lang);
    document.getElementById("langbtn").addEventListener("click", () => setLang(LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length]));
    document.getElementById("themebtn").addEventListener("click", toggleTheme);
    const burger = document.getElementById("burger"), drawer = document.getElementById("drawer");
    burger.addEventListener("click", () => {
      const open = burger.getAttribute("aria-expanded") !== "true";
      burger.setAttribute("aria-expanded", open);
      drawer.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
  }

  function setLang(l) {
    lang = l;
    const d = DICT[l], en = DICT.en;
    root.lang = l;
    root.dir = l === "ar" ? "rtl" : "ltr";
    document.title = d.__title || en.__title;
    if (md) md.content = d.__desc || en.__desc;
    document.querySelectorAll("[data-i18n]").forEach(el => { const v = d[el.dataset.i18n] ?? en[el.dataset.i18n]; if (v !== undefined) el.innerHTML = v; });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => { const k = "ph:" + el.dataset.i18nPh, v = d[k] ?? en[k]; if (v !== undefined) el.placeholder = v; });
    document.querySelectorAll("[data-i18n-alt]").forEach(el => { const k = "alt:" + el.dataset.i18nAlt, v = d[k] ?? en[k]; if (v !== undefined) el.alt = v; });
    mount();
    document.dispatchEvent(new CustomEvent("langchange", { detail: l }));
    try { localStorage.setItem("lang", l); } catch (e) {}
  }

  // ---- theme
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    root.classList.toggle("dark", t === "dark");
    const b = document.getElementById("themebtn");
    if (b) b.setAttribute("aria-pressed", t === "dark");
    try { localStorage.setItem("theme", t); } catch (e) {}
  }
  function toggleTheme() {
    const next = root.classList.contains("dark") ? "light" : "dark";
    if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return applyTheme(next);
    document.startViewTransition(() => applyTheme(next));
  }
  matchMedia("(prefers-color-scheme: light)").addEventListener("change", e => {
    if (root.hasAttribute("data-theme")) return;
    root.classList.toggle("dark", !e.matches);
  });

  // ---- start: ?lang= link, then saved choice, then the browser language
  let init = new URLSearchParams(location.search).get("lang");
  if (!LANGS.includes(init)) { try { init = localStorage.getItem("lang"); } catch (e) { init = null; } }
  if (!LANGS.includes(init)) { const n = (navigator.language || "").toLowerCase(); init = n.startsWith("ar") ? "ar" : n.startsWith("es") ? "es" : "en"; }
  setLang(init);

  // ---- reveal on scroll
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 }) : null;
  document.querySelectorAll(".rv").forEach((el, i) => { el.style.transitionDelay = (i % 4) * 90 + "ms"; io ? io.observe(el) : el.classList.add("in"); });

  window.SULTAN = { ORDER, TEL, PHONE, EMAIL, MAPS, lang: () => lang };
})();

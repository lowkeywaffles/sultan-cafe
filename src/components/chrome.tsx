"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import { Btn, OpenStatus } from "@/components/kit";
import { useLang } from "@/lib/i18n";
import { CHROME, EMAIL, FB, HOURS, LANGS, MAPS, ORDER, PAGES, PHONE, TEL, asset, fmt } from "@/lib/site";
import { cn } from "@/lib/utils";

const STAR = "M32 4l8 10 12-2-2 12 10 8-10 8 2 12-12-2-8 10-8-10-12 2 2-12-10-8 10-8-2-12 12 2z";

/** Language: an arched window; EN, ES and ع slide past like a shutter. */
function LangArch() {
  const { lang, setLang } = useLang();
  const i = LANGS.indexOf(lang);
  return (
    <button type="button" onClick={() => setLang(LANGS[(i + 1) % LANGS.length])} aria-label={CHROME[lang].langLabel}
      className="relative size-11 flex-none cursor-pointer overflow-hidden rounded-t-[22px] rounded-b-md bg-[#0d0b08] transition-transform duration-300 ease-spring active:scale-95 shadow-[inset_0_0_0_1px_#d9ae58,inset_0_0_0_3.5px_#0d0b08,inset_0_0_0_4.5px_rgba(217,174,88,.45)]">
      <span className="absolute inset-x-0 top-0 transition-transform duration-700 ease-spring" style={{ transform: `translateY(${-44 * i}px)` }}>
        {["EN", "ES", "ع"].map((s, n) => (
          <span key={s} className={cn("grid h-11 place-items-center pt-1 text-[#f1d68f]", n === 2 ? "font-[family-name:var(--font-kufi)] text-lg font-bold" : "text-[11.5px] font-bold tracking-[.12em]")}>{s}</span>
        ))}
      </span>
    </button>
  );
}

/** Theme: an 8-point star; turns into a moon at night. The page opens through an arch. */
function StarTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  const { lang } = useLang();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const dark = ready && resolvedTheme === "dark";
  const toggle = () => {
    const next = dark ? "light" : "dark";
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void };
    if (!doc.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return setTheme(next);
    doc.startViewTransition(() => flushSync(() => setTheme(next)));
  };
  return (
    <button type="button" onClick={toggle} aria-label={CHROME[lang].themeLabel} aria-pressed={dark} className="size-11 flex-none cursor-pointer">
      <svg viewBox="0 0 64 64" className="size-full transition-transform duration-1000 ease-spring" style={{ transform: dark ? "rotate(135deg)" : "none" }} aria-hidden="true">
        <defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f1d68f" /><stop offset=".5" stopColor="#d9ae58" /><stop offset="1" stopColor="#b8892f" /></linearGradient></defs>
        <path d={STAR} fill="url(#gg)" />
        <circle cx="32" cy="32" r="11" fill="#0d0b08" />
        <circle cx="32" cy="32" r="7" fill="#e8e1d0" className="transition-opacity duration-500" style={{ opacity: dark ? 1 : 0 }} />
      </svg>
    </button>
  );
}

export function Header() {
  const { lang } = useLang();
  const L = CHROME[lang];
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  const here = (href: string) => (href === "/" ? path === "/" : path.startsWith(href.replace(/\/$/, "")));

  return (
    <>
      <header className="pointer-events-none sticky top-3.5 z-40 px-4">
        <nav aria-label="Main" className="glass pointer-events-auto mx-auto flex h-[68px] max-w-[1180px] items-center gap-4 rounded-full border border-line ps-5 pe-2.5 shadow-[inset_0_1px_0_var(--hi),0_24px_60px_-30px_var(--shadow)]">
          <Link href="/" className="flex-none" aria-label="Sultan Café"><img src={asset("/images/logo.png")} alt="Sultan Café" width={330} height={250} className="h-[46px] w-auto max-sm:h-10" /></Link>
          <div className="mx-auto flex items-center gap-0.5 max-[1060px]:hidden">
            {PAGES.map(([k, href]) => (
              <Link key={k} href={href} aria-current={here(href) ? "page" : undefined}
                className={cn("rounded-full px-4 py-[11px] text-sm font-medium transition-colors duration-300", here(href) ? "bg-panel2 text-ink shadow-[inset_0_0_0_1px_var(--line)]" : "text-soft hover:bg-tint hover:text-ink")}>
                {L[k]}
              </Link>
            ))}
          </div>
          <div className="flex flex-none items-center gap-2 max-[1060px]:ms-auto">
            <LangArch />
            <StarTheme />
            <Btn href={ORDER} small className="max-[1060px]:hidden">{L.order}</Btn>
            <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="drawer" aria-label={L.menuBtn}
              className="relative hidden size-[46px] cursor-pointer rounded-full bg-panel2 shadow-[inset_0_0_0_1px_var(--line)] max-[1060px]:block">
              {[0, 1, 2].map(n => (
                <span key={n} className="absolute inset-x-3.5 h-[1.5px] bg-gold transition-all duration-500 ease-silk"
                  style={{ top: 17 + n * 5, opacity: open && n === 1 ? 0 : 1, transform: open ? (n === 0 ? "translateY(5px) rotate(45deg)" : n === 2 ? "translateY(-5px) rotate(-45deg)" : "none") : "none" }} />
              ))}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div id="drawer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            data-lenis-prevent className="fixed inset-0 z-30 flex flex-col justify-center overflow-y-auto bg-bg/90 px-7 pt-28 pb-10 backdrop-blur-2xl">
            {PAGES.map(([k, href], i) => (
              <motion.div key={k} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i + 0.05, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
                <Link href={href} className={cn("block py-2 font-display text-[44px] leading-tight", here(href) && "gold")}>{L[k]}</Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.7 }} className="mt-8">
              <Btn href={ORDER}>{L.orderLong}</Btn>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  const { lang } = useLang();
  const L = CHROME[lang];
  const ph = <bdi dir="ltr">{PHONE}</bdi>;
  const h4 = "gold mb-[18px] font-display text-xl";
  const a = "mb-2 block text-[15px] text-soft transition-colors hover:text-ink";
  return (
    <>
      <footer className="bg-bg2 pt-28 pb-32 transition-colors duration-500">
        <div className="mx-auto grid max-w-[1240px] grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 px-7 max-[900px]:grid-cols-2 max-sm:grid-cols-1 max-sm:px-4">
          <div>
            <img src={asset("/images/logo.png")} alt="Sultan Café" width={330} height={250} className="mb-[18px] h-[76px] w-auto" />
            <p className="mb-2 max-w-[30ch] text-[15px] text-soft">{L.tag}</p>
            <a className={a} href={FB} target="_blank" rel="noopener">Facebook · @sultancafetexas</a>
          </div>
          <div><h4 className={h4}>{L.visit}</h4><a className={a} href={MAPS} target="_blank" rel="noopener"><bdi>201 S Greenville Ave, Suite 211</bdi><br /><bdi>Richardson, TX 75081</bdi></a></div>
          <div><h4 className={h4}>{L.hoursH}</h4><p className="mb-2 text-[15px] text-soft">{L.daily}<br />{fmt(HOURS[0], lang)} - {fmt(HOURS[1], lang)}</p><OpenStatus /></div>
          <div><h4 className={h4}>{L.reach}</h4><a className={a} href={TEL}>{ph}</a><a className={a} href={`mailto:${EMAIL}`}><bdi>{EMAIL}</bdi></a><a className={a} href={ORDER} target="_blank" rel="noopener">{L.order}</a></div>
        </div>
        <div className="mx-auto mt-20 flex max-w-[1240px] flex-wrap justify-between gap-3 px-7 max-sm:px-4">
          <div className="flex w-full flex-wrap justify-between gap-3 border-t border-line pt-6 text-[13.5px] text-faint">
            <span>© {new Date().getFullYear()} Sultan Café. {L.rights}</span><span><bdi>201 S Greenville Ave #211 · Richardson, TX</bdi></span>
          </div>
        </div>
      </footer>
      <div className="glass fixed inset-x-3 bottom-3 z-30 hidden gap-2 rounded-full p-1.5 shadow-[inset_0_0_0_1px_var(--line),0_20px_40px_-16px_var(--shadow)] max-sm:flex">
        <Btn href={ORDER} small className="flex-1">{L.order}</Btn>
        <Btn href={TEL} small line className="flex-1">{L.call}</Btn>
      </div>
    </>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { PageHero, Reveal, Wrap } from "@/components/kit";
import { useLang, useT } from "@/lib/i18n";
import { asset, type Lang } from "@/lib/site";
import { cn } from "@/lib/utils";

/* Add photos here: { src, alt, altEs, altAr, tag }. Tags: grill, mezze, lounge, desserts */
const GALLERY = [
  { src: "/images/gallery/kufta.webp", tag: "grill", alt: "Kufta kebab skewers with pita, grilled tomatoes, onion and fresh salad", altEs: "Brochetas de kufta con pan pita, tomates asados, cebolla y ensalada fresca", altAr: "أسياخ كفتة كباب مع خبز البيتا والطماطم المشوية والبصل والسلطة الطازجة" },
  { src: "/images/gallery/hummus.webp", tag: "mezze", alt: "Hummus with whole chickpeas, olive oil and parsley", altEs: "Hummus con garbanzos, aceite de oliva y perejil", altAr: "حمص بالحمص الحب وزيت الزيتون والبقدونس" },
  { src: "/images/gallery/shawarma-plate.webp", tag: "grill", alt: "Shawarma plate with fries, tomatoes, onions and garlic sauce", altEs: "Plato de shawarma con papas, tomate, cebolla y salsa de ajo", altAr: "طبق شاورما مع البطاطا والطماطم والبصل وصلصة الثوم" },
  { src: "/images/gallery/fattoush.webp", tag: "mezze", alt: "Fattoush salad with crispy pita chips", altEs: "Ensalada fattoush con totopos de pan pita", altAr: "سلطة فتوش مع الخبز المحمّص المقرمش" },
  { src: "/images/gallery/burger.webp", tag: "grill", alt: "Sultan Burger with cheese, lettuce and tomato on a sesame bun", altEs: "Sultan Burger con queso, lechuga y tomate en pan con ajonjolí", altAr: "برغر سلطان بالجبنة والخس والطماطم في خبز السمسم" },
  { src: "/images/gallery/halloumi.webp", tag: "mezze", alt: "Grilled halloumi cheese with peppers and olives", altEs: "Queso halloumi a la parrilla con pimientos y aceitunas", altAr: "جبنة حلوم مشوية مع الفلفل والزيتون" },
  { src: "/images/gallery/yogurt-dip.webp", tag: "mezze", alt: "Creamy yogurt and cucumber dip with mint", altEs: "Dip cremoso de yogur y pepino con menta", altAr: "صلصة لبن وخيار كريمية بالنعناع" },
];
const TAGS: Record<Lang, Record<string, string>> = {
  en: { all: "All", grill: "From the grill", mezze: "Mezze & salads", lounge: "Lounge", desserts: "Desserts" },
  es: { all: "Todo", grill: "De la parrilla", mezze: "Mezze y ensaladas", lounge: "Lounge", desserts: "Postres" },
  ar: { all: "الكل", grill: "من المشواة", mezze: "مازة وسلطات", lounge: "الصالة", desserts: "الحلويات" },
};
const altOf = (g: (typeof GALLERY)[number], l: Lang) => (l === "es" ? g.altEs : l === "ar" ? g.altAr : g.alt);

export default function GalleryPage() {
  const t = useT("gallery");
  const { lang } = useLang();
  const lenis = useLenis();
  const [tag, setTag] = useState("all");
  const [idx, setIdx] = useState<number | null>(null);
  const shown = GALLERY.filter(g => tag === "all" || g.tag === tag);
  const tags = ["all", ...new Set(GALLERY.map(g => g.tag))];

  const close = useCallback(() => setIdx(null), []);
  const step = useCallback((d: number) => setIdx(i => (i === null ? i : (i + d + shown.length) % shown.length)), [shown.length]);
  useEffect(() => {
    if (idx === null) { lenis?.start(); return; }
    lenis?.stop();
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") close(); if (e.key === "ArrowRight") step(lang === "ar" ? -1 : 1); if (e.key === "ArrowLeft") step(lang === "ar" ? 1 : -1); };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [idx, lenis, close, step, lang]);

  return (
    <>
      <PageHero kicker={t("script")} title={t("title")} lead={t("lead")} />
      <section className="pb-32 max-sm:pb-20">
        <Wrap>
          <Reveal className="mb-12 flex flex-wrap gap-2">
            {tags.map(k => (
              <button key={k} type="button" aria-pressed={tag === k} onClick={() => setTag(k)}
                className={cn("cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium transition-[background-color,color,box-shadow] duration-300", tag === k ? "gold-fill" : "text-soft shadow-[inset_0_0_0_1px_var(--line-2)] hover:text-ink")}>
                {TAGS[lang][k]}
              </button>
            ))}
          </Reveal>
          <motion.div layout className="columns-3 gap-5 max-[900px]:columns-2 max-sm:columns-1">
            <AnimatePresence mode="popLayout">
              {shown.map((g, i) => (
                <motion.button layout key={g.src} type="button" onClick={() => setIdx(i)}
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  className="bezel group mb-5 block w-full cursor-zoom-in break-inside-avoid rounded-[26px]">
                  <span className="block overflow-hidden rounded-[20px]">
                    <img src={asset(g.src)} alt={altOf(g, lang)} loading="lazy" className="w-full transition-transform duration-[1.2s] ease-silk group-hover:scale-105" />
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </Wrap>
      </section>

      <AnimatePresence>
        {idx !== null && shown[idx] && (
          <motion.div role="dialog" aria-modal="true" aria-label={altOf(shown[idx], lang)} onClick={close}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-[#050403]/90 p-6 backdrop-blur-md">
            <motion.img key={shown[idx].src} src={asset(shown[idx].src)} alt={altOf(shown[idx], lang)} onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="max-h-[86vh] w-auto rounded-2xl shadow-[0_0_0_1px_rgba(217,174,88,.4)]" />
            {[["‹", -1, "start-4"], ["›", 1, "end-4"], ["×", 0, "top-4 end-4"]].map(([s, d, pos]) => (
              <button key={s as string} type="button" aria-label={d === 0 ? "Close" : d === 1 ? "Next" : "Previous"}
                onClick={e => { e.stopPropagation(); if (d === 0) close(); else step(lang === "ar" ? -(d as number) : (d as number)); }}
                className={cn("gold-fill absolute grid size-12 cursor-pointer place-items-center rounded-full text-2xl", pos as string, d !== 0 && "top-1/2 -translate-y-1/2")}>
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

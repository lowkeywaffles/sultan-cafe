"use client";

import { useEffect, useState } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { Band, Btn, PageHero, Reveal, Wrap } from "@/components/kit";
import pages from "@/content/pages.json";
import { T, useT } from "@/lib/i18n";
import { ORDER } from "@/lib/site";
import { cn } from "@/lib/utils";

type Item = { key: string; price: string; star: boolean; descKey: string | null };
type Cat = { id: string; titleKey: string; noteKey: string | null; groups: { titleKey: string | null; items: Item[] }[] };
const MENU = (pages as unknown as { menuData: Cat[] }).menuData;
const FAMILY = [{ k: "f1", price: "$103.99" }, { k: "f2", price: "$61.99" }];
const TABS = [["appetizers", "t1"], ["sandwiches", "t2"], ["mains", "t3"], ["family", "t4"], ["desserts", "t5"]];

export default function MenuPage() {
  const t = useT("menu");
  const [active, setActive] = useState("appetizers");

  // the tab bar follows whichever section is under the reading line
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-40% 0px -55% 0px" });
    TABS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} goldTitle />

      <nav aria-label="Menu sections" className="sticky top-[96px] z-20 px-4">
        <div className="glass mx-auto flex max-w-max gap-1 overflow-x-auto rounded-full border border-line p-1.5 [scrollbar-width:none] max-sm:max-w-full">
          {TABS.map(([id, k]) => (
            <a key={id} href={`#${id}`} className={cn("relative flex-none rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300", active === id ? "gold-fill" : "text-soft hover:text-ink")}
              dangerouslySetInnerHTML={{ __html: t(k) }} />
          ))}
        </div>
      </nav>

      <Wrap>
        {MENU.map(cat => (
          <section key={cat.id} id={cat.id} className="scroll-mt-40 pt-24 pb-4">
            <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-line pb-5">
              <T t={t} k={cat.titleKey} as="h2" className="text-[clamp(40px,5vw,64px)]" />
              {cat.noteKey && <T t={t} k={cat.noteKey} className="gold font-display text-xl" />}
            </Reveal>

            {cat.id === "family" ? (
              <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                {FAMILY.map((f, i) => (
                  <Reveal key={f.k} delay={i * 0.08} className="bezel rounded-[30px]">
                    <MagicCard gradientSize={300} gradientColor="rgba(217,174,88,.12)" gradientFrom="#d9ae58" gradientTo="#9c7228" className="rounded-[24px]">
                      <div className="lattice p-10 max-sm:p-7">
                        <T t={t} k={`${f.k}who`} className="gold font-display text-xl" />
                        <T t={t} k={`${f.k}t`} as="h3" className="mt-2 mb-3 text-[40px]" />
                        <div className="mb-4 font-display text-5xl text-gold">{f.price}</div>
                        <T t={t} k={`${f.k}p`} as="p" className="text-soft" />
                      </div>
                    </MagicCard>
                  </Reveal>
                ))}
              </div>
            ) : (
              cat.groups.map((g, gi) => (
                <Reveal key={gi} className="mb-10">
                  {g.titleKey && <T t={t} k={g.titleKey} as="h3" className="gold mb-2 text-xl tracking-normal" />}
                  <div className="grid grid-cols-2 gap-x-14 max-md:grid-cols-1">
                    {g.items.map((it, ii) => (
                      <div key={it.key + ii} className="group border-b border-dashed border-line py-5">
                        <div className="flex items-baseline gap-3">
                          <T t={t} k={it.key} className="font-display text-[23px] leading-tight transition-colors group-hover:text-gold" />
                          {it.star && <i className="size-1.5 flex-none translate-y-[-3px] rotate-45 bg-[#d9ae58]" aria-hidden="true" />}
                          <span className="min-w-5 flex-1 translate-y-[-5px] border-b border-dotted border-line2" />
                          <span className="font-display text-[23px] whitespace-nowrap text-gold">{it.price}</span>
                        </div>
                        {it.descKey && <T t={t} k={it.descKey} as="p" className="mt-1 max-w-[44ch] text-[14.5px] text-soft" />}
                      </div>
                    ))}
                  </div>
                </Reveal>
              ))
            )}
          </section>
        ))}
        <div className="mt-20 mb-32"><Band title={t("ctaTitle")} lead={t("ctaLead")}><Btn href={ORDER} html={t("ctaBtn")} /></Band></div>
      </Wrap>
    </>
  );
}

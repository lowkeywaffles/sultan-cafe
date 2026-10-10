"use client";

import { MagicCard } from "@/components/ui/magic-card";
import { Band, Btn, PageHero, Reveal, Wrap } from "@/components/kit";
import { T, useT } from "@/lib/i18n";
import { asset } from "@/lib/site";
import { cn } from "@/lib/utils";

const SPICES = [
  ["s1", "radial-gradient(circle at 35% 35%,#e8a23a,#a65a12)"],
  ["s2", "radial-gradient(circle at 35% 35%,#c85a3a,#7a2512)"],
  ["s3", "radial-gradient(circle at 35% 35%,#f2c14e,#b97a14)"],
  ["s4", "radial-gradient(circle at 35% 35%,#a8323e,#5c1220)"],
];

export default function AboutPage() {
  const t = useT("about");
  return (
    <>
      <PageHero kicker={t("script")} title={t("title")} lead={t("lead")} />

      <section className="py-32 max-sm:py-20">
        <Wrap className="grid grid-cols-[.9fr_1.1fr] items-center gap-20 max-[960px]:grid-cols-1 max-[960px]:gap-12">
          <Reveal className="w-full max-w-[440px] justify-self-center">
            <div className="aspect-[.8] rounded-t-full rounded-b-[32px] bg-tint p-2 shadow-[inset_0_0_0_1px_var(--line-2),0_60px_120px_-50px_var(--shadow)]">
              <div className="size-full overflow-hidden rounded-t-full rounded-b-[25px]">
                <img src={asset("/images/hummus.webp")} alt={t("alt:alt")} loading="lazy" className="size-full object-cover" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <T t={t} k="e1" className="gold mb-3.5 block font-display text-[19px]" />
            <T t={t} k="h1" as="h2" className="mb-6 text-[clamp(40px,5vw,68px)]" />
            <T t={t} k="p1" as="p" className="mb-4 text-[17.5px] text-soft" />
            <T t={t} k="p2" as="p" className="mb-4 text-[17.5px] text-soft" />
            <T t={t} k="q" as="blockquote" className="my-9 border-s-2 border-[#d9ae58] ps-6 font-display text-[clamp(28px,3vw,40px)] leading-snug italic" />
            <Btn href="/menu/" html={t("btn")} />
          </Reveal>
        </Wrap>
      </section>

      <section className="bg-bg2 py-32 max-sm:py-20">
        <Wrap>
          <Reveal className="mx-auto mb-16 max-w-[760px] text-center">
            <T t={t} k="h2" as="h2" className="mb-5 text-[clamp(46px,6vw,84px)]" />
            <T t={t} k="l2" as="p" className="mx-auto max-w-[52ch] text-lg text-soft" />
          </Reveal>
          <div className="grid grid-cols-4 gap-5 max-[960px]:grid-cols-2 max-sm:grid-cols-1">
            {SPICES.map(([k, bg], i) => (
              <Reveal key={k} delay={i * 0.07} className={cn("bezel rounded-[30px]", i % 2 === 1 && "lg:translate-y-10")}>
                <MagicCard gradientSize={220} gradientColor="rgba(217,174,88,.12)" gradientFrom="#d9ae58" gradientTo="#9c7228" className="h-full rounded-[24px]">
                  <div className="p-8">
                    <div className="mb-7 size-16 rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,.15),0_14px_30px_-12px_rgba(0,0,0,.6)]" style={{ background: bg }} />
                    <T t={t} k={k} as="h3" className="mb-1 text-[28px]" />
                    <T t={t} k={`${k}d`} className="gold mb-3 block font-display text-lg" />
                    <T t={t} k={`${k}p`} as="p" className="text-[15px] text-soft" />
                  </div>
                </MagicCard>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="py-32 max-sm:py-20">
        <Wrap className="grid grid-cols-3 max-[900px]:grid-cols-1 max-[900px]:gap-12">
          {["v1", "v2", "v3"].map((k, i) => (
            <Reveal key={k} delay={i * 0.08} className={cn("pe-10", i > 0 && "border-s border-line ps-10 max-[900px]:border-s-0 max-[900px]:border-t max-[900px]:ps-0 max-[900px]:pt-12")}>
              <T t={t} k={`${k}t`} as="h3" className="mb-3 text-[clamp(32px,3vw,42px)]" />
              <T t={t} k={`${k}p`} as="p" className="max-w-[36ch] text-soft" />
            </Reveal>
          ))}
        </Wrap>
      </section>

      <section className="pb-32 max-sm:pb-20">
        <Wrap><Band title={t("bt")} lead={t("bp")}><Btn href="/contact/#apply" html={t("bb")} /></Band></Wrap>
      </section>
    </>
  );
}

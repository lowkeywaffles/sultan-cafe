"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { Marquee } from "@/components/ui/marquee";
import { Btn, OpenStatus, Reveal, Wrap } from "@/components/kit";
import { T, useLang, useT } from "@/lib/i18n";
import { DISHES, ORDER, TEL, asset } from "@/lib/site";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const DISH_TILES = [
  { k: "d1", price: "$7.99", img: "/images/gallery/hummus.webp", alt: "Hummus with whole chickpeas, olive oil and parsley", cls: "md:col-span-7 md:row-span-2 min-h-[600px] max-md:min-h-[440px]" },
  { k: "d5", price: "$19.99", img: "/images/gallery/kufta.webp", alt: "Kufta kebab skewers with grilled tomato, onion and pita", cls: "md:col-span-5" },
  { k: "d2", price: "$19.99", cls: "md:col-span-5", lattice: true },
  { k: "d3", price: "$23.99", cls: "md:col-span-4" },
  { k: "d4", price: "$24.99", cls: "md:col-span-4" },
  { k: "d6", price: "$5.49", cls: "md:col-span-4", warm: true },
];

function Tile({ t, d }: { t: (k: string) => string; d: (typeof DISH_TILES)[number] }) {
  const body = (
    <>
      <T t={t} k={`${d.k}t`} as="h3" className="mb-2.5 text-[clamp(30px,2.8vw,42px)]" />
      <T t={t} k={`${d.k}p`} as="p" className={cn("mb-6 max-w-[38ch] text-[15.5px]", d.img ? "text-[#cbbd9f]" : "text-soft")} />
      <div className={cn("font-display text-[26px] font-medium", d.img ? "text-[#e8c374]" : "text-gold")}>{d.price}</div>
    </>
  );
  return (
    <Reveal className={cn("bezel group rounded-[30px] transition-transform duration-700 ease-silk hover:-translate-y-1.5", d.cls)}>
      {d.img ? (
        <div className="relative flex h-full flex-col justify-end overflow-hidden rounded-[24px] p-10 text-[#f3e9d4] max-sm:p-7">
          <img src={asset(d.img)} alt={d.alt} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-[2s] ease-silk group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0b08]/5 via-[#0d0b08]/55 to-[#0d0b08]/95" />
          <div className="relative">{body}</div>
        </div>
      ) : (
        <MagicCard gradientSize={260} gradientColor="rgba(217,174,88,.14)" gradientFrom="#d9ae58" gradientTo="#9c7228" className="h-full rounded-[24px]">
          <div className={cn("relative flex h-full min-h-[260px] flex-col justify-end p-9 max-sm:p-7", d.lattice && "lattice", d.warm && "bg-[radial-gradient(120%_90%_at_100%_0%,rgba(217,174,88,.24),transparent_60%)]")}>{body}</div>
        </MagicCard>
      )}
    </Reveal>
  );
}

export default function Home() {
  const t = useT("index");
  const { lang } = useLang();
  const hero = useRef<HTMLDivElement>(null);

  // the arch photo drifts slower than the page and the side plate turns as you scroll: depth, not decoration
  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      const st = { trigger: hero.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".arch-img", { yPercent: 12, scale: 1.14, ease: "none", scrollTrigger: st });
      gsap.to(".plate2", { rotate: 14, y: -60, ease: "none", scrollTrigger: st });
    });
  }, { scope: hero });

  return (
    <>
      <section ref={hero} className="relative isolate overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-[20%] -right-[10%] -z-10 h-[90vh] w-[70vw] bg-[radial-gradient(closest-side,rgba(217,174,88,.14),transparent_70%)]" />
        <div className="lattice fade-mask pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
        <Wrap>
          <div className="grid min-h-[min(760px,calc(100dvh-140px))] grid-cols-[1.15fr_.85fr] items-center gap-16 max-[1060px]:min-h-0 max-[1060px]:grid-cols-1 max-[1060px]:gap-14 max-[1060px]:pt-8">
            <div>
              <Reveal><T t={t} k="welcome" className="gold mb-5 block font-display text-[clamp(24px,2.4vw,30px)]" /></Reveal>
              <Reveal delay={0.1}><T t={t} k="heroTitle" as="h1" className="mb-8 pb-1.5 text-[clamp(54px,6.4vw,96px)] leading-[.98] tracking-[-.03em]" /></Reveal>
              <Reveal delay={0.2}><T t={t} k="heroLead" as="p" className="mb-10 max-w-[44ch] text-lg text-soft" /></Reveal>
              <Reveal delay={0.3} className="flex flex-wrap gap-3">
                <Btn href={ORDER} html={t("ctaOrder")} />
                <Btn href="/menu/" line html={t("ctaMenu")} />
              </Reveal>
            </div>
            <Reveal delay={0.25} className="relative w-full max-w-[460px] justify-self-end max-[1060px]:max-w-[380px] max-[1060px]:justify-self-center rtl:justify-self-start">
              <div className="aspect-[.74] rounded-t-full rounded-b-[32px] bg-tint p-2 shadow-[inset_0_0_0_1px_var(--line-2),0_60px_120px_-50px_var(--shadow)]">
                <div className="size-full overflow-hidden rounded-t-full rounded-b-[25px] bg-[#0d0b08]">
                  <img src={asset("/images/hummus.webp")} alt={t("alt:altHummus")} fetchPriority="high" className="arch-img size-full scale-[1.06] object-cover" />
                </div>
              </div>
              <div className="plate2 absolute bottom-12 -left-20 aspect-square w-[46%] -rotate-6 rounded-full bg-bg p-1.5 shadow-[inset_0_0_0_1px_var(--line-2),0_40px_70px_-30px_var(--shadow)] max-sm:-left-5 max-sm:w-[40%] rtl:left-auto rtl:-right-20 max-sm:rtl:-right-5">
                <img src={asset("/images/gallery/kufta.webp")} alt="" loading="lazy" className="size-full rounded-full object-cover" />
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-[72px] grid grid-cols-[repeat(3,auto)] justify-start border-t border-line max-md:mt-14 max-md:grid-cols-3">
            {[
              ["4.2", "f1"],
              ["12:30", "f2"],
              ["5", "f3"],
            ].map(([num, k], i) => (
              <div key={i} className={cn("py-7 pe-14 max-md:pe-3", i > 0 && "border-s border-line ps-14 max-md:ps-3.5")}>
                <b className="mb-2 block font-display text-[44px] leading-none font-medium tracking-[-.02em] tabular-nums max-md:text-[32px]">{num}</b>
                <T t={t} k={k as string} className="block text-sm text-soft max-md:text-[12.5px]" />
              </div>
            ))}
          </Reveal>
        </Wrap>
      </section>

      <div className="border-y border-line py-7" aria-hidden="true">
        <Marquee pauseOnHover reverse={lang === "ar"} className="[--duration:60s] [--gap:3rem]">
          {DISHES[lang].map(d => (
            <span key={d} className="flex items-center gap-12 font-display text-[clamp(30px,3.4vw,44px)] text-soft italic">
              {d}<i className="size-2 rotate-45 bg-[#d9ae58] opacity-70" />
            </span>
          ))}
        </Marquee>
      </div>

      <section className="py-36 max-sm:py-24">
        <Wrap>
          <Reveal className="mb-[70px] max-w-[760px]">
            <T t={t} k="sigTitle" as="h2" className="mb-5 text-[clamp(46px,6vw,84px)]" />
            <T t={t} k="sigLead" as="p" className="max-w-[58ch] text-lg text-soft" />
          </Reveal>
          <div className="grid auto-rows-[minmax(260px,auto)] grid-cols-1 gap-[18px] md:grid-cols-12">
            {DISH_TILES.map(d => <Tile key={d.k} t={t} d={d} />)}
          </div>
          <Reveal className="mt-14"><Btn href="/menu/" line html={t("fullMenu")} /></Reveal>
        </Wrap>
      </section>

      <section className="bg-bg2 py-36 max-sm:py-24">
        <Wrap>
          <Reveal className="bezel relative grid grid-cols-[1.1fr_.9fr] overflow-hidden rounded-[40px] max-[1060px]:grid-cols-1">
            <BorderBeam size={260} duration={10} colorFrom="#f1d68f" colorTo="#9c7228" borderWidth={1.5} />
            <div className="relative overflow-hidden rounded-[33px] bg-[#0d0b08] px-16 py-20 text-[#f3e9d4] max-sm:px-6 max-sm:py-12">
              <div className="lattice fade-mask pointer-events-none absolute inset-0" aria-hidden="true" />
              <div className="relative">
                <T t={t} k="feastEyebrow" className="mb-3.5 block font-display text-[19px] text-[#dcb465] italic" />
                <T t={t} k="feastTitle" as="h2" className="mb-[18px] text-[clamp(50px,6vw,88px)] tracking-[-.025em] [&_.gold]:text-[#dcb465]" />
                <T t={t} k="feastLead" as="p" className="mb-10 max-w-[40ch] text-[17px] text-[#a99c84]" />
                <div className="font-display text-[clamp(64px,7vw,96px)] leading-none font-medium tracking-[-.03em] text-[#e8c374]">
                  $103.99<T t={t} k="feastServes" className="ms-3 font-sans text-[15px] tracking-normal text-[#a99c84]" />
                </div>
              </div>
            </div>
            <div className="grid content-center gap-[30px] px-14 py-16 max-sm:px-6 max-sm:py-12">
              <T t={t} k="feastInc" className="font-display text-xl text-gold italic" />
              <ul className="grid grid-cols-2 gap-x-7 gap-y-4 max-sm:grid-cols-1">
                {["fi1", "fi2", "fi3", "fi4", "fi5", "fi6"].map(k => <T key={k} t={t} k={k} as="li" className="font-display text-2xl" />)}
              </ul>
              <div className="grid gap-1.5 border-t border-line pt-6">
                <T t={t} k="comboT" as="b" className="font-display text-[26px] font-medium" />
                <span className="text-[15px] text-soft"><span className="font-display text-[26px] text-gold">$61.99</span> <T t={t} k="comboS" /></span>
              </div>
              <div><Btn href={ORDER} html={t("feastBtn")} /></div>
            </div>
          </Reveal>
        </Wrap>
      </section>

      <section className="py-36 max-sm:py-24">
        <Wrap className="grid grid-cols-2 max-md:grid-cols-1 max-md:gap-14">
          <Reveal className="pe-16 max-md:pe-0">
            <T t={t} k="loungeT" as="h3" className="mb-[18px] text-[clamp(40px,4.4vw,64px)] tracking-[-.02em]" />
            <T t={t} k="loungeP" as="p" className="mb-7 max-w-[44ch] text-[17px] text-soft" />
            <T t={t} k="loungeNote" className="gold font-display text-[22px]" />
          </Reveal>
          <Reveal delay={0.1} className="border-s border-line ps-16 max-md:border-s-0 max-md:border-t max-md:ps-0 max-md:pt-14">
            <T t={t} k="cateringT" as="h3" className="mb-[18px] text-[clamp(40px,4.4vw,64px)] tracking-[-.02em]" />
            <T t={t} k="cateringP" as="p" className="mb-7 max-w-[44ch] text-[17px] text-soft" />
            <Btn href="/contact/" line html={t("cateringBtn")} />
          </Reveal>
        </Wrap>
      </section>

      <section className="bg-bg2 py-24 max-sm:py-[72px]">
        <Wrap>
          <Reveal className="grid grid-cols-3 max-[900px]:grid-cols-1 max-[900px]:gap-7">
            {[
              ["iVisit", <p key="a">201 S Greenville Ave, Suite 211</p>, <small key="b">Richardson, TX 75081</small>],
              ["iHours", <T key="a" t={t} k="iHoursP" as="p" />, <OpenStatus key="b" className="mt-2" />],
              ["iCall", <p key="a"><a href={TEL}><bdi dir="ltr">(972) 528-8570</bdi></a></p>, <small key="b"><a href={ORDER} target="_blank" rel="noopener" dangerouslySetInnerHTML={{ __html: t("iOrder") }} /></small>],
            ].map(([k, main, sub], i) => (
              <div key={i} className={cn("pe-10 [&_p]:font-display [&_p]:text-[26px] [&_p]:leading-tight [&_small]:mt-2 [&_small]:block [&_small]:text-[14.5px] [&_small]:text-soft", i > 0 && "border-s border-line ps-10 max-[900px]:border-s-0 max-[900px]:border-t max-[900px]:ps-0 max-[900px]:pt-7")}>
                <T t={t} k={k as string} as="h4" className="gold mb-3.5 text-xl tracking-normal" />
                {main}{sub}
              </div>
            ))}
          </Reveal>
        </Wrap>
      </section>

      <section className="py-36 max-sm:py-24">
        <Wrap>
          <Reveal className="relative overflow-hidden rounded-[40px] bg-[#0d0b08] px-14 py-28 text-center text-[#f3e9d4] shadow-[inset_0_1px_0_rgba(255,236,196,.08),0_0_0_1px_rgba(217,174,88,.25),0_0_0_9px_rgba(217,174,88,.05),0_0_0_10px_rgba(217,174,88,.18)] max-sm:rounded-[30px] max-sm:px-6 max-sm:py-[72px]">
            <div className="lattice fade-mask pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <T t={t} k="bandScript" className="mb-3.5 block font-display text-[clamp(26px,3vw,36px)] text-[#dcb465] italic" />
              <T t={t} k="bandTitle" as="h2" className="mb-[18px] text-[clamp(48px,7vw,96px)] tracking-[-.025em]" />
              <T t={t} k="bandLead" as="p" className="mx-auto mb-9 max-w-[46ch] text-lg text-[#a99c84]" />
              <div className="flex flex-wrap justify-center gap-3">
                <Btn href={ORDER} html={t("bandOrder")} />
                <Btn href="/contact/" line html={t("bandVisit")} className="text-[#f3e9d4] shadow-[inset_0_0_0_1px_rgba(217,174,88,.4)]" />
              </div>
            </div>
          </Reveal>
        </Wrap>
      </section>
    </>
  );
}

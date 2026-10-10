"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { OpenStatus, PageHero, Reveal, Wrap } from "@/components/kit";
import { T, useLang, useT } from "@/lib/i18n";
import { EMAIL, MAPS, TEL } from "@/lib/site";
import { cn } from "@/lib/utils";

const MSG = {
  en: ["Please add your name.", "Add a phone or email so we can reply."],
  es: ["Escribe tu nombre.", "Agrega un teléfono o correo para responderte."],
  ar: ["يرجى كتابة اسمك.", "أضف رقم هاتف أو بريدًا إلكترونيًا حتى نتمكن من الرد."],
};
const ICONS: Record<string, string> = {
  c1: "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  c2: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z",
  c3: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M22 6l-10 7L2 6",
  c4: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 7v5l3 2",
};
const field = "w-full rounded-xl border border-line bg-bg px-3.5 py-3 text-base text-ink transition-[border-color,box-shadow] duration-300 placeholder:text-faint focus:border-[#d9ae58] focus:shadow-[0_0_0_4px_rgba(217,174,88,.15)] focus:outline-none";
const label = "mb-2 block text-[13px] font-semibold text-soft";

export default function ContactPage() {
  const t = useT("contact");
  const { lang } = useLang();
  const [subject, setSubject] = useState("general");
  const [err, setErr] = useState("");
  useEffect(() => { if (location.hash === "#apply") setSubject("job"); }, []);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget.elements as unknown as Record<string, HTMLInputElement>;
    const v = (n: string) => f[n]?.value.trim() ?? "";
    if (!v("name")) { setErr(MSG[lang][0]); f.name.focus(); return; }
    if (!v("phone") && !v("email")) { setErr(MSG[lang][1]); f.phone.focus(); return; }
    setErr("");
    const lines = ["Name: " + v("name")];
    if (v("phone")) lines.push("Phone: " + v("phone"));
    if (v("email")) lines.push("Email: " + v("email"));
    if (subject === "job" && v("position")) lines.push("Position: " + v("position"));
    if (subject === "job" && v("experience")) lines.push("Experience: " + v("experience") + " years");
    lines.push("", v("message"));
    const sel = f.subject as unknown as HTMLSelectElement;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Sultan Café website: " + sel.options[sel.selectedIndex].text)}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  const cards: [string, string | null, React.ReactNode, React.ReactNode][] = [
    ["c1", MAPS, <p key="p">201 S Greenville Ave, Suite 211</p>, <small key="s">Richardson, TX 75081</small>],
    ["c2", TEL, <p key="p"><bdi dir="ltr">(972) 528-8570</bdi></p>, <T key="s" t={t} k="c2s" as="small" />],
    ["c3", `mailto:${EMAIL}`, <p key="p">{EMAIL}</p>, <T key="s" t={t} k="c3s" as="small" />],
    ["c4", null, <T key="p" t={t} k="c4p" as="p" />, <OpenStatus key="s" className="mt-2" />],
  ];

  return (
    <>
      <PageHero kicker={t("script")} title={t("title")} lead={t("lead")} />
      <section className="pb-32 max-sm:pb-20">
        <Wrap>
          <div className="mb-6 grid grid-cols-4 gap-5 max-[960px]:grid-cols-2 max-sm:grid-cols-1">
            {cards.map(([k, href, main, sub], i) => {
              const inner = (
                <MagicCard gradientSize={200} gradientColor="rgba(217,174,88,.12)" gradientFrom="#d9ae58" gradientTo="#9c7228" className="h-full rounded-[22px]">
                  <div className="p-7 [&_p]:text-[16.5px] [&_p]:[overflow-wrap:anywhere] [&_small]:mt-1 [&_small]:block [&_small]:text-sm [&_small]:text-soft">
                    <span className="mb-5 grid size-12 place-items-center rounded-full bg-panel2 text-gold shadow-[inset_0_0_0_1px_var(--line)]">
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONS[k]} /></svg>
                    </span>
                    <T t={t} k={k} as="h3" className="gold mb-2 text-xl tracking-normal" />
                    {main}{sub}
                  </div>
                </MagicCard>
              );
              return (
                <Reveal key={k} delay={i * 0.06} className="bezel rounded-[28px] transition-transform duration-500 ease-silk hover:-translate-y-1">
                  {href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="block h-full">{inner}</a> : inner}
                </Reveal>
              );
            })}
          </div>
          <Reveal className="bezel h-[440px] overflow-hidden rounded-[30px]">
            <iframe title="Map to Sultan Café" loading="lazy" className="size-full rounded-[24px] border-0 [filter:var(--map)]"
              src={`https://maps.google.com/maps?q=201+S+Greenville+Ave+Suite+211,+Richardson,+TX+75081&z=15&output=embed&hl=${lang}`} />
          </Reveal>
        </Wrap>
      </section>

      <section id="apply" className="scroll-mt-24 bg-bg2 py-32 max-sm:py-20">
        <Wrap className="grid grid-cols-[.85fr_1.15fr] items-start gap-14 max-[960px]:grid-cols-1">
          <Reveal>
            <T t={t} k="fe" className="gold mb-3.5 block font-display text-[19px]" />
            <T t={t} k="fh" as="h2" className="mb-5 text-[clamp(40px,4.6vw,62px)]" />
            <T t={t} k="fp" as="p" className="mb-7 text-soft" />
            {["p1", "p2", "p3"].map(k => (
              <div key={k} className="mb-3.5 flex items-start gap-3"><i className="mt-2.5 size-1.5 flex-none rotate-45 bg-[#d9ae58]" /><T t={t} k={k} /></div>
            ))}
          </Reveal>
          <Reveal delay={0.1} className="bezel relative rounded-[32px]">
            <BorderBeam size={220} duration={12} colorFrom="#f1d68f" colorTo="#9c7228" borderWidth={1.5} />
            <form noValidate onSubmit={submit} className="bezel-core grid gap-4 rounded-[26px] p-9 max-sm:p-6">
              <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1">
                <div><label htmlFor="f-name" className={label} dangerouslySetInnerHTML={{ __html: t("l1") }} /><input id="f-name" name="name" autoComplete="name" required className={field} /></div>
                <div><label htmlFor="f-phone" className={label} dangerouslySetInnerHTML={{ __html: t("l2") }} /><input id="f-phone" name="phone" type="tel" autoComplete="tel" className={cn(field, "rtl:[direction:ltr] rtl:text-right")} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1">
                <div><label htmlFor="f-email" className={label} dangerouslySetInnerHTML={{ __html: t("l3") }} /><input id="f-email" name="email" type="email" autoComplete="email" className={cn(field, "rtl:[direction:ltr] rtl:text-right")} /></div>
                <div><label htmlFor="f-subject" className={label} dangerouslySetInnerHTML={{ __html: t("l4") }} />
                  <select id="f-subject" name="subject" value={subject} onChange={e => setSubject(e.target.value)} className={field}>
                    <option value="general" dangerouslySetInnerHTML={{ __html: t("o1") }} />
                    <option value="catering" dangerouslySetInnerHTML={{ __html: t("o2") }} />
                    <option value="job" dangerouslySetInnerHTML={{ __html: t("o3") }} />
                  </select></div>
              </div>
              <AnimatePresence initial={false}>
                {subject === "job" && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }} className="overflow-hidden">
                    <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1">
                      <div><label htmlFor="f-pos" className={label} dangerouslySetInnerHTML={{ __html: t("l5") }} /><input id="f-pos" name="position" className={field} /></div>
                      <div><label htmlFor="f-exp" className={label} dangerouslySetInnerHTML={{ __html: t("l6") }} /><input id="f-exp" name="experience" inputMode="numeric" className={field} /></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div><label htmlFor="f-msg" className={label} dangerouslySetInnerHTML={{ __html: t("l7") }} /><textarea id="f-msg" name="message" placeholder={t("ph:msgph")} className={cn(field, "min-h-[130px] resize-y")} /></div>
              {err && <p role="alert" className="text-sm text-[#e4736b]">{err}</p>}
              <button type="submit" className="gold-fill group flex cursor-pointer items-center justify-center gap-3 rounded-full py-[7px] ps-6 pe-[7px] text-[14.5px] font-semibold transition-transform duration-500 ease-silk active:scale-[.98]">
                <T t={t} k="send" />
                <span className="grid size-[34px] place-items-center rounded-full bg-[#1a1207]/12 transition-transform duration-500 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
                </span>
              </button>
              <T t={t} k="note" as="p" className="text-[13.5px] text-soft" />
            </form>
          </Reveal>
        </Wrap>
      </section>
    </>
  );
}

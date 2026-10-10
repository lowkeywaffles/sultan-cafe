"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { CHROME, HOURS, fmt, isOpen } from "@/lib/site";
import { cn } from "@/lib/utils";

const ARROW = (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

/** Pill button. Gold variant carries a nested arrow island that nudges on hover. */
export function Btn({ href, children, line, small, className, external, html }: {
  href: string; children?: React.ReactNode; line?: boolean; small?: boolean; className?: string; external?: boolean; html?: string;
}) {
  const ext = external ?? /^(https?:|tel:|mailto:)/.test(href);
  const cls = cn(
    "group inline-flex items-center justify-center gap-3 rounded-full whitespace-nowrap font-semibold tracking-[.01em] transition-[transform,box-shadow,background-color] duration-500 ease-silk active:scale-[.98]",
    small ? "text-[14px]" : "text-[14.5px]",
    line ? cn("text-ink shadow-[inset_0_0_0_1px_var(--line-2)] hover:shadow-[inset_0_0_0_1px_#d9ae58] hover:bg-tint", small ? "px-5 py-3" : "px-6 py-[15px]")
         : cn("gold-fill", small ? "py-1.5 ps-5 pe-1.5" : "py-[7px] ps-6 pe-[7px]"),
    className
  );
  const inner = (
    <>
      {html ? <span dangerouslySetInnerHTML={{ __html: html }} /> : children}
      {!line && (
        <span className={cn("grid place-items-center rounded-full bg-[#1a1207]/12 transition-transform duration-500 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5", small ? "size-7" : "size-[34px]")}>{ARROW}</span>
      )}
    </>
  );
  return ext
    ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" className={cls}>{inner}</a>
    : <Link href={href} className={cls}>{inner}</Link>;
}

/** Scroll reveal: a slow fade-up out of soft focus. Visible in the HTML; only animates once JS is running. */
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("rv");
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { rootMargin: "0px 0px -60px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={className} style={{ transitionDelay: `${delay}s` }}>{children}</div>;
}

/** Live "open now" line in Dallas time. */
export function OpenStatus({ className }: { className?: string }) {
  const { lang } = useLang();
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => { setOpen(isOpen()); const t = setInterval(() => setOpen(isOpen()), 60000); return () => clearInterval(t); }, []);
  if (open === null) return null;
  const L = CHROME[lang];
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm font-semibold", className)}>
      <i className={cn("size-2 rounded-full", open ? "bg-[#5fc98a] shadow-[0_0_0_4px_rgba(95,201,138,.18)]" : "bg-faint")} />
      {open ? L.open(fmt(HOURS[1], lang)) : L.opens(fmt(HOURS[0], lang))}
    </span>
  );
}

/** Inner-page hero: big left-aligned title over the star lattice. */
export function PageHero({ kicker, title, lead, goldTitle }: { kicker?: string; title: string; lead: string; goldTitle?: boolean }) {
  return (
    <header className="relative overflow-hidden pt-32 pb-24 max-sm:pt-24 max-sm:pb-16">
      <div className="lattice fade-mask pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1240px] px-7 max-sm:px-4">
        {kicker && <Reveal><span className="gold mb-3 block font-display text-[clamp(22px,2.4vw,30px)]" dangerouslySetInnerHTML={{ __html: kicker }} /></Reveal>}
        <Reveal delay={0.08}>
          <h1 className={cn("mb-6 text-[clamp(64px,10vw,148px)] tracking-[-.03em] leading-[.95] pb-2", goldTitle && "gold")} dangerouslySetInnerHTML={{ __html: title }} />
        </Reveal>
        <Reveal delay={0.16}><p className="max-w-[560px] text-[19px] text-soft" dangerouslySetInnerHTML={{ __html: lead }} /></Reveal>
      </div>
    </header>
  );
}

export const Wrap = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("mx-auto max-w-[1240px] px-7 max-sm:px-4", className)}>{children}</div>
);

/** Closing call-to-action: a black lacquer panel with the star lattice, the same in both themes. */
export function Band({ kicker, title, lead, children }: { kicker?: string; title: string; lead: string; children: React.ReactNode }) {
  return (
    <Reveal className="relative overflow-hidden rounded-[40px] bg-[#0d0b08] px-14 py-28 text-center text-[#f3e9d4] shadow-[inset_0_1px_0_rgba(255,236,196,.08),0_0_0_1px_rgba(217,174,88,.25),0_0_0_9px_rgba(217,174,88,.05),0_0_0_10px_rgba(217,174,88,.18)] max-sm:rounded-[30px] max-sm:px-6 max-sm:py-[72px]">
      <div className="lattice fade-mask pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative">
        {kicker && <span className="mb-3.5 block font-display text-[clamp(26px,3vw,36px)] text-[#dcb465] italic" dangerouslySetInnerHTML={{ __html: kicker }} />}
        <h2 className="mb-[18px] text-[clamp(48px,7vw,96px)] tracking-[-.025em]" dangerouslySetInnerHTML={{ __html: title }} />
        <p className="mx-auto mb-9 max-w-[46ch] text-lg text-[#a99c84]" dangerouslySetInnerHTML={{ __html: lead }} />
        <div className="flex flex-wrap justify-center gap-3">{children}</div>
      </div>
    </Reveal>
  );
}

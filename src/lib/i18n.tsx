"use client";

import { createContext, useContext, useEffect, useState } from "react";
import pages from "@/content/pages.json";
import { LANGS, type Lang } from "./site";

type PageKey = "index" | "menu" | "about" | "gallery" | "contact";
type Dict = Record<string, string>;
const PAGES = pages as unknown as Record<PageKey, Record<Lang, Dict>>;

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "en", setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // start: ?lang= link, then saved choice, then the browser language
  useEffect(() => {
    let init = new URLSearchParams(location.search).get("lang") as Lang | null;
    if (!init || !LANGS.includes(init)) { try { init = localStorage.getItem("lang") as Lang | null; } catch { init = null; } }
    if (!init || !LANGS.includes(init)) {
      const n = navigator.language.toLowerCase();
      init = n.startsWith("ar") ? "ar" : n.startsWith("es") ? "es" : "en";
    }
    setLangState(init);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch {}
  };

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);

/** Translator for one page's strings, falling back to English. */
export function useT(page: PageKey) {
  const { lang } = useLang();
  const d = PAGES[page];
  useEffect(() => {
    const v = d[lang].__title ?? d.en.__title;
    if (v) document.title = v.replace(/&amp;/g, "&");
  }, [lang, d]);
  return (k: string) => d[lang][k] ?? d.en[k] ?? "";
}

/** Renders a translated string that may carry inline markup (gold spans, <bdi>, <br>). Content is our own. */
export function T({ t, k, as: Tag = "span", className }: { t: (k: string) => string; k: string; as?: React.ElementType; className?: string }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: t(k) }} />;
}

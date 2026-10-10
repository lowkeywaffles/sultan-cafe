import type { Metadata, Viewport } from "next";
import { Cormorant, Manrope, Reem_Kufi, Tajawal } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Footer, Header } from "@/components/chrome";
import { SmoothScroll } from "@/components/smooth-scroll";
import { LangProvider } from "@/lib/i18n";
import pages from "@/content/pages.json";
import "./globals.css";

const cormorant = Cormorant({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const kufi = Reem_Kufi({ variable: "--font-kufi", subsets: ["arabic", "latin"] });
const tajawal = Tajawal({ variable: "--font-tajawal", subsets: ["arabic", "latin"], weight: ["400", "500", "700"] });

const en = pages.index.en as Record<string, string>;
const FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230d0b08'/%3E%3Cpath d='M32 6l7.5 9.5 11.5-2-2 11.5 9.5 7.5-9.5 7.5 2 11.5-11.5-2L32 58l-7.5-9.5-11.5 2 2-11.5L5.5 32l9.5-7.5-2-11.5 11.5 2z' fill='%23d9ae58'/%3E%3Ccircle cx='32' cy='32' r='9' fill='%230d0b08'/%3E%3C/svg%3E";

export const metadata: Metadata = {
  title: en.__title.replace(/&amp;/g, "&"),
  description: en.__desc,
  icons: { icon: FAVICON },
  openGraph: { title: "Sultan Café · Richardson, TX", description: "Mediterranean grill & hookah lounge. Open late.", images: ["images/logo.png"] },
};
export const viewport: Viewport = { themeColor: "#0d0b08" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${manrope.variable} ${kufi.variable} ${tajawal.variable}`}>
      <body className="min-h-dvh text-base leading-[1.7]">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <LangProvider>
            <SmoothScroll>
              <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-panel focus:px-4 focus:py-2">Skip to content</a>
              <Header />
              <main id="main">{children}</main>
              <Footer />
            </SmoothScroll>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

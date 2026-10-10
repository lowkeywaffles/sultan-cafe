# Sultan Café: website redesign demo

A premium multi-page redesign of sultancafe.us in Sultan Café's own black-and-gold brand, for 201 S Greenville Ave #211, Richardson, TX 75081 · (972) 528-8570.

Live: https://lowkeywaffles.github.io/sultan-cafe/

## Stack
- **Next.js** (App Router, static export) + **TypeScript** + **Tailwind CSS v4**
- **Magic UI** (shadcn registry): Marquee, MagicCard spotlight, BorderBeam
- **Motion** (menu, gallery filter and lightbox, form), **GSAP ScrollTrigger** (hero parallax), **Lenis** smooth scroll
- English / Spanish / Arabic (right-to-left), `?lang=es` or `?lang=ar`; light/dark via `next-themes`
- Strings live in `src/content/pages.json`; gallery photos are listed in `src/app/gallery/page.tsx`

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```
Pushing to `main` builds and deploys to GitHub Pages (`.github/workflows/pages.yml`).

## Needed before going live
- [x] Gallery photos (added; confirm they are real Sultan dishes)
- [ ] Hours: their site says 11:30 AM–12:30 AM; directories say until 1 AM weeknights / 2 AM weekends
- [ ] Correct descriptions for Mixed Grill Combo and Gyro Plate (their current site repeats other dishes' text)
- [x] OK to show the hookah lounge prominently? Any hookah menu/pricing?
- [ ] Higher-resolution logo file (current one is cut from a screenshot)
- [ ] Which email should receive contact/catering/job messages (currently hakeemrabah@gmail.com)

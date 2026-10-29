# 4Me Lanka Tours — The Island Journal

A complete visual redesign of the supplied React/Vite project, inspired by the landscape depth and immersive navigation of Columbus Travel and Sumène Artense. The design uses original Sri Lankan photographs, forest green, warm paper, vermilion, large Manrope typography, and Instrument Serif.

## Run and build

Requires Node.js 22.12+ and npm.

```bash
npm ci
npm run dev
```

```bash
npx tsc --noEmit
npm run build
```

The production site is in `dist/`. The downloadable project includes a ready-built copy. To deploy to Cloudflare Pages, use `npm run build` with output directory `dist`. For Vercel, the included `vercel.json` preserves single-page application routing, including direct visits to inner pages.

## Design and interactions

- A landscape aperture opens with scroll. The hero automatically cycles through four Sri Lankan scenes, with manual scene selection and pause/play.
- Four landscape chapters use locally bundled GSAP and ScrollTrigger for desktop horizontal pinning. Smaller screens use native swipe and chapter buttons. Reduced motion follows the visitor's device preference and disables automatic motion and pinning.
- An illustrated island finder changes photography, destination details, and the inquiry link when a pin or location tab is selected. The illustration is for destination discovery, not navigation.
- Tours keep the supplied descriptions, routes, prices, and original tour cards. Filters, image previews, detail dialogs, and prefilled trip inquiries work together.
- All 29 destinations, 26 experiences, 18 tours, 22 guest memories, 7 individual reviews, and 15 journal articles from the source are retained.
- A full-screen navigation index, keyboard-accessible dialogs, destination and article search, a guest review carousel, and responsive inner pages complete the experience.
- WhatsApp inquiries open with trip details ready for the visitor to send. No message is sent automatically.

## Editing

`/admin` retains the existing admin implementation. Start with **Island Journal · New Design** to edit the new headline and editorial text. Existing contact, tour, review, fleet, and image controls remain in the project. Image upload slots retain the original browser-preview behavior.

- `src/creative/CreativeSite.tsx` — public routes and scroll animation lifecycle.
- `src/creative/HomeSections.tsx` — the homepage, island finder, tours, guestbook, and journal.
- `src/creative/Pages.tsx` — directories, fleet, contact, and original calculator integration.
- `src/creative/ui.tsx` — shared navigation, footer, dialogs, and typography helpers.
- `src/creative/creative.css` — responsive design system and reduced motion rules.
- `src/content/creativeContent.ts` — new editable copy.
- `src/creative/useTravelData.ts` — the six data collections preserved from the original.
- `src/LegacyApp.tsx` — original public implementation retained as a reference; it is not loaded by the redesign.

The supplied Firebase configuration, rules, and cloud content integration have been retained. Cloud authentication and production Firestore writes were not tested or changed. The supplied pricing, guest stories, and article contents have been preserved rather than independently verified.

## Verification

Production build and TypeScript checks passed. Browser checks covered desktop pinned scroll, the native mobile chapter controls, map selection, all public page routes, destination and article search, tour filters and details, prefilled contact journeys, guestbook filtering and review navigation, and rendering of the retained calculators. Mobile layouts were inspected in a 390 × 844 viewport with no document horizontal overflow.

The GSAP scripts are local project assets. Fonts use Google Fonts with local system fallbacks. Unreferenced export screenshots and duplicate AI Studio temporary media are excluded from the deliverable.

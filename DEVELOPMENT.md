# Development notes

Technical documentation for the Lumen.aid website. For what the organisation does, see
[README.md](README.md).

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

Deploys anywhere static (Vercel / Netlify / Cloudflare Pages): build command
`npm run build`, output directory `dist`. SPA fallbacks are included (`vercel.json` for
Vercel, `public/_redirects` for Netlify) so deep links work on refresh.

## Domain

The site lives at **https://lumenaid.help** (registered at Namecheap). The origin is
declared once in `src/site.js` as `SITE_URL`; canonical links, Open Graph URLs and the
sitemap all read from it, so changing the domain is a one-line edit.

- `index.html` carries the site-wide canonical / Open Graph defaults (what crawlers that
  do not run JavaScript see). The OG image is the logo at `/media/svg.png`, 512 square;
  dropping in a 1200x630 `public/og-image.png` and pointing `og:image` at it would give
  wide link previews instead of small square ones.
- `src/hooks/useSeo.js` sets the per-page description, canonical and OG tags at runtime.
  Every page calls it; new pages should too.
- `public/robots.txt` points at the sitemap. `sitemap.xml` is generated at build time by
  the `lumenaid-sitemap` plugin in `vite.config.js`, straight from the route list and
  `ARTICLES`, so new articles appear in it with no manual edit.

DNS lives at Namecheap (Advanced DNS tab, nameservers stay as Namecheap BasicDNS). Add
`lumenaid.help` and `www.lumenaid.help` in the Vercel project's Settings > Domains first,
then copy the two records it shows into Namecheap:

| Type | Host | Value |
|---|---|---|
| A | `@` | the IP on the domain card (`76.76.21.21`, or `216.198.79.1` on newer projects) |
| CNAME | `www` | the host on the domain card (often a project-specific `*.vercel-dns-0NN.com.`) |

Vercel assigns these per project, so the domain card is the source of truth; copying
another project's values is the usual cause of "Invalid Configuration". Delete the
parking records Namecheap ships with (the `@` A record to `162.255.119.36` and the `www`
CNAME to `parkingpage.namecheap.com`) or the domain keeps resolving to the "for sale"
page. Set `www` to redirect to the apex in Vercel, since the canonical URLs assume apex.

Namecheap's free email forwarding (Domain tab > Redirect Email) can point something like
`hello@lumenaid.help` at the existing Gmail without touching the Vercel records, as long
as the MX records stay on Namecheap's `mail.privateemail.com` default.

Note: if the dev server is running when `tailwind.config.js` changes, restart it or you'll
see "class does not exist" overlay errors.

## Stack

Vite + React 18, react-router-dom, Tailwind CSS, Framer Motion, Lenis (weighty scroll;
wheel/touch only, keyboard scrolling stays native). Fonts self-hosted via Fontsource:
Permanent Marker (headlines), Fraunces (serif statements + article body), Poppins
(wordmark + UI), Noto Nastaliq Urdu (the dua).

## Pages

| Route | What |
|---|---|
| `/` | Scrollytelling home: hero, the problem, what we do, impact, articles teaser, how to help |
| `/app` | Offline Dekho: Samsung phone mockup of the real UI, how the on-device CV works |
| `/articles` | Reading room index + Medium link |
| `/articles/:slug` | Kindle-style reader: A-/A+ text size, paper/dark toggle, progress bar, prev/next; settings persist |
| `/team` | Team of fifteen + join section (roles needed: Media, Marketing) |

## Content pointers

- **Articles** live in `src/content/articles.js`. Copy an existing entry: `slug`, `title`,
  `author`, `dek`, and `blocks` (`{ t: 'p', text }`, `{ t: 'h2', text }`,
  `{ t: 'list', items: [] }`). Reading time is computed automatically.
- **Program media** lives in `public/media/` (`01-fundraisers.jpg`,
  `02-assistive-support.jpg`, `03-partnerships.jpg`, `04-awareness.mp4`), wired in
  `src/sections/Programs.jsx` with alt text alongside.
- **Impact stats** are in `src/sections/Impact.jsx`; update as fundraisers happen.
- **Join-the-team link** is `JOIN_URL` in `src/pages/Team.jsx` (currently the volunteer
  form until the dedicated link exists).
- Favicon (`public/favicon.png`, 64px) and touch icon (`public/apple-touch-icon.png`,
  180px) are resized from the full logo at `public/media/svg.png`.

## Copy rules (owner preferences)

- No em dashes anywhere in rendered text.
- "youth led" unhyphenated.
- No decorative line/stroke elements (scribbles, dividers, kicker dashes were removed).
- No visible dev-note chips; the site must always look publishable.
- Browser tab title is just "Lumen.aid" on every page. `useSeo` enforces this;
  `PER_PAGE_TAB_TITLES` in `src/hooks/useSeo.js` flips it if that ever changes.

## Accessibility contract (keep this true when editing)

- **Reduced motion is a first-class mode.** `MotionPrefs` merges the OS
  `prefers-reduced-motion` setting with the visible "Reduce motion" toggle on the landing
  hero (site-wide, persisted). Every animated scene checks it; pinned/horizontal scenes
  render as stacked columns, reveals/counters/eyes render final state, and Lenis is not
  created at all. The stacked variants are also what mobile gets.
- **No wheel/scroll hijacking.** Scenes are driven by real scroll position (sticky +
  transforms). Space/PageDown/arrows always work.
- **Screen readers never get animation artifacts.** Word-split reveals and count-up numbers
  are `aria-hidden`, with the full sentence / final figure exposed once via `sr-only`.
  DOM order always matches reading order, including inside the horizontal section.
- **Focus never gets stranded inside the horizontal Programs scene.** The only focusable
  elements in chapters are the video's custom play/pause and speaker buttons; focusing them
  aligns the scroll to that chapter (`alignChapter` in `Programs.jsx`). Any new focusable
  element added to a chapter must use the same handler.
- **Nav is visually hidden on the landing hero but always reachable**: CSS forces it
  visible on `:focus-within`, and the corner menu button reveals it on demand. It's always
  shown on other pages and steps aside on the reader (which has its own labelled controls).
- **The native cursor is not hidden.** The custom ring is an augmentation; replacing the OS
  cursor would hurt low-vision users specifically.
- The Urdu dua carries `lang="ur" dir="rtl"` and toggles to English on tap (a real button
  with `aria-pressed`).
- Route changes move focus to `#main`; in-page navigation moves focus to the section.
- The reader's text-size controls are real buttons with labels and an `aria-live` size
  announcement; both reader settings persist in localStorage.
- Focus rings use `currentColor` so they stay visible on every background.
- Video sound is opt-in via the speaker button; nothing autoplays under reduced motion.

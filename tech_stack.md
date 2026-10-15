# Tech Stack

Bloom & City — Hong Kong florist homepage. A static, front-end-only recreation in Traditional Chinese (scope per [TODO.md](TODO.md); no checkout, payments, or backend).

## Overview

| Layer | Choice |
|---|---|
| Type | Static single-page site, no build step, no bundler |
| Languages | HTML5, CSS3, vanilla JavaScript (ES2020+) |
| Dependencies | None — no `package.json`, no npm packages, no framework |
| Runtime requirements | Any static file server; browser only |
| Target locale | `zh-Hant-HK` (Traditional Chinese, Hong Kong) |

## File structure

```
├── TODO.md               # scope checklist and delivery evidence
├── app.config.ts         # Manus platform config (logoUrl; not referenced by the page)
└── public/               # entire site — deploy this directory
    ├── index.html        # single page, 6 sections (95 lines)
    ├── styles.css        # all styling, responsive (1,408 lines)
    ├── app.js            # all interactivity, zero imports (114 lines)
    ├── manus-routes.json # Manus route manifest (one route: "/")
    ├── assets/           # 12 WebP photos (occasions, budgets, promos, favicon)
    └── manus-storage/    # hero image (1920×823 WebP, local mirror)
```

## Front-end details

### Styling
- Hand-written CSS with custom properties (e.g. `--scale` for fluid hero sizing)
- Responsive layouts via media queries (desktop / tablet / mobile; verified at 1440px and 390px)
- Design tokens: blush pink, cream, muted rose, warm brown palette; rounded image cards

### Typography (Google Fonts CDN)
- `Cormorant Garamond` (Latin display), `Noto Serif TC`, `LXGW WenKai TC` (Traditional Chinese)

### Icons and imagery
- Inline SVG sprite (`<symbol>` + `<use>`) for UI/line icons — no icon library
- Photography as optimized WebP files; hero uses `fetchpriority="high"`
- `loading="lazy"` on all below-fold images

### Interactivity (vanilla JS)
- Native `<dialog>` + `showModal()` for search, collections, and info popups
- Event delegation via `data-*` attributes (`data-info`, `data-occasion`, `data-budget`, `data-favorite`)
- Client-side search filtering over an in-file product array
- Favorites persisted in `localStorage` (`bloom-city-favorites`)
- Responsive nav: hamburger toggle + CSS dropdowns; `aria-expanded` state management
- Toast notifications via `aria-live` region; newsletter form gives local-only feedback

### Platform artifacts (Manus)
- `manus-routes.json` — route manifest used by the Manus preview host
- `app.config.ts` — platform config (logo URL); the page draws an inline flower mark instead

## Development and QA

| Task | Command / tool |
|---|---|
| Serve locally | `python3 -m http.server 8000 --directory public` (use a **threaded** server in practice — see note) |
| JS syntax check | `node --check public/app.js` |
| Asset/reference check | HTTP probe of every local `src`/`href`/`url()` reference |
| Render audit | Headless Chrome via CDP: broken images, console errors, horizontal overflow, font load |
| Screenshots | Headless Chrome (`Page.captureScreenshot`, full-page + dialogs + mobile) |

> **Local server note:** the default single-threaded `http.server` intermittently drops concurrent requests (`ERR_SOCKET_NOT_CONNECTED`), breaking lazy-loaded images. Run a `ThreadingHTTPServer` instead.

## Known limitations

- Contact details, WhatsApp number, and newsletter provider are not connected — all such actions are labeled demonstration-only in the UI.
- Favorites/search/subscription flows are front-end only; no orders are created.

# Ekalantor Prokashoni — POS & Ledger (Prototype)

A design prototype for the publisher's POS / ledger system, built with React + Vite.
Theme: cyan, matched to the Ekalantor Prokashoni logo.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually **http://localhost:5173**).

## Build for production (when you're ready to host it online)

```bash
npm run build
```

This outputs a static `dist/` folder you can deploy to any static host
(Vercel, Netlify, your own server, etc.) or serve behind a backend later.

## Project structure

```
ekalantor-pos/
├── public/
│   ├── logo.png       ← your icon logo
│   └── namlipi.png    ← your wordmark
├── src/
│   ├── App.jsx         ← all screens (Login, Dashboard, modals, menus)
│   └── main.jsx        ← React entry point
├── index.html
├── package.json
└── vite.config.js
```

## What's included so far

- **Login screen** — branded with your logo + wordmark
- **Dashboard / Home** — live Dhaka clock, sample prayer times, top navigation
- **Full top menu** — Setup, Order, Sales/Return, Register, Report,
  Account Bill Entry, Accounts Bill Payment, Accounts Reports, Create User, BACKUP
  (all sub-menu items transcribed from your reference screenshots)
- **Create User** — working modal form
- **BACKUP** — animated export preview
- Other menu items currently open a "coming soon" placeholder — these are the
  next screens to design and build.

A small **Preview** switcher pinned to the bottom of the screen lets you jump
directly between the Login and Dashboard views without logging in — remove
`<PreviewBar />` from `App.jsx` before you go live.

## Notes

- All UI copy is in English, no backend is wired up yet — everything here is
  a front-end prototype (no real login, no database).
- The prayer-time card uses sample values; connect a prayer-time API
  (e.g. Aladhan API) later to make it live and auto-updating.
- Colours and fonts are defined at the top of `App.jsx` (`COLORS` object) —
  easy to tweak in one place.

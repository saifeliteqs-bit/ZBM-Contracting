# ZBM Contracting — Premium Interior & Exterior Website

Luxury editorial website. React + Vite + GSAP + Lenis.

## Local Development
```bash
npm install
npm run dev
```

## Build & Deploy
```bash
npm run build      # production build
vercel --prod      # deploy to Vercel
```

Or connect GitHub repo to Vercel — auto-detects Vite.

## Replacing Images
All image URLs live in `src/data/` — never scattered in JSX:
- `siteContent.js` — hero, about, stats, contact text
- `services.js` — service titles, descriptions, images
- `projects.js` — project grid, featured project, process steps

## Colours
Edit `src/styles/variables.scss` — all CSS vars propagate site-wide.

## Logo
`src/assets/zbm-logo.png` — replace file to update everywhere.

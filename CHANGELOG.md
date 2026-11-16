# Changelog

## Portfolio redesign

### Removed

- `src/components/GlobalSpiderManTracker.tsx` and the global tracker mount.
- `src/components/PageTransition.tsx` and its yellow curtain transition.
- `src/components/Engineering.tsx`, `src/components/Education.tsx` (education remains on `/resume`), and `src/components/Notebook.tsx` from the home page.
- The six landscape JPG backdrops, parchment overlays, and unused `meme.png`, `Portfolio.png`, and Sanskrit logo assets.
- Playfair Display, Inter, the direct `framer-motion` dependency, and `react-icons` dependency.
- The simulated 500 ms null loader and `window.lenis` global.

### Added

- `src/motion.theme.ts` shared spring, stagger, and easing tokens.
- `src/lib/LenisContext.tsx`, `src/lib/LenisStore.ts`, and `src/hooks/useLenis.ts` for a cleaned-up Lenis lifecycle and context.
- Dark responsive home sections: masked hero, selected work, stack marquee, bento profile, and contact.
- Desktop pinned work rail with a standard scroll-reveal card stack below 1024px; scroll velocity modulates marquee speed and skew.
- Lazy route and Projects section loading, reduced-motion handling, active navigation, and mobile menu scroll locking.
- WebP portrait and project artwork with 320/640 or 640/1200 width variants and responsive `srcset`.
- This changelog.

### Dependencies

- Added `motion` and `@fontsource/space-grotesk`.
- Kept `lenis`, `@fontsource/jetbrains-mono`, and existing allowed utility dependencies.
- Used a temporary local image conversion tool; it is not in `package.json` or `package-lock.json`.

### Build and performance measurements

- `npm run build`: passes.
- `npm run lint`: passes with no warnings.
- Pre-change build output available in `dist`: initial JS files totaled 465,565 bytes raw (gzip was not recorded before the rebuild).
- Current root route JS is approximately 115.7 KB gzipped across the entry, Motion, React, home, work, and project-data chunks. The project-detail and resume routes remain lazy loaded. This is below the 150 KB target.
- Project artwork source files were reduced to WebP; for example, Astronomical changed from 1.41 MB PNG to 39.7 KB WebP (plus responsive variants).
- Lighthouse scores and the requested 375/768/1440 screenshots were not captured. The browser tool could not connect to the local Vite server (`ERR_CONNECTION_TIMED_OUT`), so those results remain unverified.

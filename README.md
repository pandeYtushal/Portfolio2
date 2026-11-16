# Tushal Anand — Portfolio

A dark, responsive portfolio built with React 18, TypeScript, Vite, Tailwind CSS 4, Motion, and Lenis.

## Commands

- `npm run dev` — local development server
- `npm run build` — type check and production build
- `npm run lint` — ESLint

## Routes

- `/` — selected work and profile
- `/project/:id` — project details sourced from `src/data/projects.ts`
- `/resume` — resume and education
- `*` — not found

## Motion

Spring settings and the shared non-spring easing are defined in `src/motion.theme.ts`. Reduced-motion preferences disable the marquee and hero typing sequence.

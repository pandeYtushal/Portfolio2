# Tushal Pandey | Professional Portfolio

A premium, modern, and responsive portfolio website built with React, Vite, TypeScript, and Tailwind CSS.

**Live Demo**: [tushalpandey.vercel.app](https://tushalpandey.vercel.app)

---

## Key Features

- **Dynamic Design**: Minimalist ambient aesthetics with seamless dark/light mode (no theme flash).
- **Interactive Navbar**: Smooth theme transitions with audio feedback.
- **Project Showcase**: Detailed project cards with status indicators and modal deep-dives.
- **Technical Writing**: Medium RSS feed integration for latest articles.
- **Smooth Scrolling**: Lenis-powered scrolling with reduced-motion support.
- **Premium UX**: Framer Motion animations, magnetic buttons, custom cursor (fine pointer only).
- **Code-split sections**: Lazy-loaded below-the-fold content for faster first paint.

---

## Tech Stack

### Frontend Core
- **React 18** + **TypeScript**
- **Vite 6**
- **Tailwind CSS 4**
- **Framer Motion**
- **Lenis** (smooth scroll)

### Utilities
- **Lucide React** + **react-icons**
- **clsx** + **tailwind-merge**
- **Web Audio API** for subtle click/hover feedback

---

## Project Structure

```
Portfolio/
├── src/
│   ├── components/       # UI sections (Hero, Projects, …)
│   │   └── ui/           # Magnetic, icons
│   ├── data/             # projects.ts, milestones.ts
│   ├── hooks/            # useLenis
│   ├── lib/              # audio, motion, utils
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/               # Static assets, robots.txt, sitemap
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites
- **Node.js** 20+ recommended
- **npm**

### Installation

```bash
git clone https://github.com/pandeYtushal/Portfolio2.git
cd Portfolio2
npm install
npm run dev
```

Open `http://localhost:5173`.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Typecheck + production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (JS + TS) |
| `npm run preview` | Preview production build |

---

## Contact

- **GitHub**: [@pandeYtushal](https://github.com/pandeYtushal)
- **LinkedIn**: [Tushal Pandey](https://www.linkedin.com/in/tushal-pandey-88229b307/)
- **Email**: tushalanand4@gmail.com

---

## License

MIT

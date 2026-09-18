# Tushal Pandey — Portfolio

Personal portfolio built with React, Vite, and TypeScript. Designed with an Awwwards-winning aesthetic focusing on fluid motion, micro-interactions, and premium typography.

**Live**: [tushalpandey.vercel.app](https://tushalpandey.vercel.app)

---

## Key Features

- **Interactive Spider-Man Physics Engine**: A custom draggable SVG Spider-Man that tracks the cursor and reacts to scroll velocity with physical momentum (web stretching, arm flaring, eye widening).
- **Live Environment Sync**: Real-time Heads-Up Display (HUD) showing the current time (IST) and dynamic local weather conditions using the Open-Meteo API.
- **Fluid Page Transitions**: Seamless, Awwwards-style yellow curtain sweeps when navigating between the Home and Project pages.
- **Magnetic UI Elements**: Custom cursor and magnetic buttons that attract to the mouse for a tactile feel.
- **Scroll-Driven Storytelling**: Cinematic reveals and parallax effects powered by Framer Motion and Lenis smooth scrolling.

---

## Stack

- **React 18** + **TypeScript** + **Vite 6**
- **Tailwind CSS 4** — rapid, responsive styling
- **Framer Motion** — physics engines, layout transitions, drag gestures
- **Lucide React** & **React Icons** — iconography
- **Open-Meteo API** — headless weather data

---

## Structure

```
src/
├── components/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── CustomCursor.tsx
│   ├── Footer.tsx
│   ├── GlobalSpiderManTracker.tsx
│   ├── Hero.tsx
│   ├── LiveEnvironment.tsx
│   ├── Manifesto.tsx
│   ├── Navbar.tsx
│   ├── PageTransition.tsx
│   ├── Positioning.tsx
│   ├── Preloader.tsx
│   ├── Projects.tsx
│   ├── ResumeModal.tsx
│   ├── Skills.tsx
│   └── Writing.tsx
├── data/
│   └── projects.ts
├── pages/
│   ├── Home.tsx
│   └── ProjectPage.tsx
├── App.tsx
├── main.tsx
└── index.css
```

---

## Running locally

```bash
git clone https://github.com/pandeYtushal/Portfolio2.git
cd Portfolio2
npm install
npm run dev
```

Open `http://localhost:5173`.

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |

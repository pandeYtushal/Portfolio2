# Tushal Pandey — Portfolio

Personal portfolio built with React, Vite, and TypeScript.

**Live**: [tushalpandey.vercel.app](https://tushalpandey.vercel.app)

---

## Stack

- **React 18** + **TypeScript** + **Vite 6**
- **Tailwind CSS 4**
- **Framer Motion** — animations, layout transitions, drag gestures
- **Lucide React** — icons
- **Web Audio API** — subtle click feedback on theme toggle

---

## Structure

```
src/
├── components/
│   ├── ui/           # Magnetic, Toast
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Writing.tsx
│   ├── Contact.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── data/             # projects.ts
├── lib/              # audio.ts, motion.ts
├── App.tsx
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

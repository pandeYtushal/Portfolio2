# Tushal Pandey | Professional Portfolio

A premium, modern, and responsive portfolio website built with the latest web technologies. This project showcases my technical expertise, creative projects, and latest insights.

**Live Demo**: [tushal-pandey.vercel.app](https://tushal-pandey.vercel.app)

---

## Key Features

- **Dynamic Design**: Minimalist and high-end "Ambient Monochrome" aesthetics with seamless dark/light mode switching.
- **Interactive Navbar**: Features a live world clock and smooth theme transitions with audio feedback.
- **Project Showcase**: Detailed project cards with status indicators (Live/Closed) and modern hover effects.
- **Technical Blog**: Integrated with Medium RSS feed to display the latest articles automatically.
- **Mobile Optimized**: Fully responsive layout with custom infinite-scroll tech stack slider for smaller screens.
- **Premium UX**: Smooth animations with Framer Motion and optimized asset loading.

---

## Tech Stack

### Frontend Core
- **React 19**: Utilizing the latest React features for performance.
- **Tailwind CSS 4**: Next-gen CSS framework for rapid, efficient styling.
- **Vite**: Ultra-fast build tool and development server.
- **Framer Motion**: High-performance animation library.

### Utilities & Tools
- **Lucide React**: For beautiful, consistent iconography.
- **Zustand**: Lightweight and scalable state management.
- **Firebase**: Backend services for real-time data and authentication.
- **PostCSS**: Advanced CSS transformation.

---

## Project Structure

```
Portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Responsive navigation with LiveClock
│   │   ├── Hero.jsx           # Main landing section with tech stack
│   │   ├── Projects.jsx       # Featured work showcase
│   │   ├── Blog.jsx           # Medium article integration
│   │   ├── Contact.jsx        # Social links and reach-out section
│   │   ├── Footer.jsx         # Branding and quotes
│   │   ├── ResumeModal.jsx    # Interactive resume viewer
│   │   └── ui/                # Reusable shadcn/ui components
│   ├── App.jsx                # Core application logic and theme provider
│   ├── main.jsx               # Entry point with StrictMode
│   └── index.css              # Global styles and tailwind directives
├── public/                    # Static assets (images, sounds, icons)
├── package.json               # Dependency management
└── vite.config.js             # Build and alias configuration
```

---

## Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pandeYtushal/Portfolio2.git
   cd Portfolio2
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` to view the site.

### Production Build
```bash
npm run build
```
The optimized bundle will be generated in the `dist` folder.

---

## Contact & Support

If you have any questions or want to collaborate, feel free to reach out:
- **GitHub**: [@pandeYtushal](https://github.com/pandeYtushal)
- **LinkedIn**: [Tushal Anand](https://www.linkedin.com/in/tushal-anand18)
- **Email**: tushalanand4@gmail.com

---

## License
This project is open-source and available under the [MIT License](LICENSE).

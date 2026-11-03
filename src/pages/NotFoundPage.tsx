import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-app-bg text-app-text-primary font-sans antialiased overflow-x-clip selection:bg-app-text-primary selection:text-app-bg flex flex-col">

      {/* Atmospheric background — matches site identity */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none -z-10 select-none"
      >
        <img
          src="/landscape-bg.jpg"
          alt=""
          className="w-full h-full object-cover object-center brightness-[0.98] contrast-[1.02]"
        />
        <div className="absolute inset-0 bg-[#F4F4F0]/65 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-app-bg/30 pointer-events-none" />
      </div>

      {/* Minimal header */}
      <header className="px-6 md:px-12 py-5 flex items-center justify-between border-b border-app-border/50 bg-[#F4F4F0]/80 backdrop-blur-md">
        <Link
          to="/"
          className="group flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest font-bold text-app-text-primary hover:text-amber-800 transition-colors"
          aria-label="Return to homepage"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Portfolio</span>
        </Link>

        <img
          src="/sanskrit-logo-transparent.png"
          alt="Logo"
          className="h-7 w-auto object-contain"
        />
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-8 max-w-2xl"
        >
          {/* Figure label */}
          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-app-text-secondary font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            <span>Error 404 &bull; Page Not Found</span>
          </div>

          {/* Large editorial 404 */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[8rem] sm:text-[12rem] md:text-[16rem] font-serif font-medium leading-none tracking-tight text-app-text-primary/10 select-none"
            aria-hidden="true"
          >
            404
          </motion.h1>

          <div className="-mt-8 flex flex-col items-center gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-tight tracking-tight text-app-text-primary">
              This page doesn't exist.
            </h2>
            <p className="font-sans text-base sm:text-lg text-app-text-secondary leading-relaxed max-w-md">
              The URL you followed may be broken, or the page may have been moved.
              Let's get you back on track.
            </p>
          </div>

          {/* Divider */}
          <div className="w-12 h-[1.5px] bg-app-border" />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-app-text-primary text-app-surface px-8 h-12 font-mono text-xs font-bold uppercase tracking-widest rounded-lg shadow-sm hover:opacity-90 active:scale-[0.98] transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return Home</span>
            </Link>

            <Link
              to="/#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border border-app-border/90 bg-app-surface hover:bg-app-surface-secondary text-app-text-primary px-8 h-12 font-mono text-xs font-bold uppercase tracking-widest rounded-lg shadow-sm active:scale-[0.98] transition-all"
            >
              <span>View Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Valid routes hint */}
          <div className="mt-4 flex flex-col items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-app-text-secondary font-semibold">
              Valid destinations
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: "Home", to: "/" },
                { label: "About", to: "/#about" },
                { label: "Work", to: "/#projects" },
                { label: "Contact", to: "/#contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="px-3.5 py-1.5 rounded-full border border-app-border/80 bg-app-surface/80 font-mono text-[11px] uppercase tracking-wider text-app-text-secondary hover:text-app-text-primary hover:border-app-text-primary/40 transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-6 border-t border-app-border/50 flex items-center justify-between bg-transparent">
        <span className="font-sans text-xs uppercase tracking-widest text-app-text-secondary font-medium">
          © Tushal Pandey. Made with intention.
        </span>
        <span className="font-mono text-xs tracking-widest text-app-text-secondary font-semibold uppercase">
          {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
};

export default NotFoundPage;


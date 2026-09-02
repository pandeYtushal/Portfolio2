import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Copy, Check } from "lucide-react";

export const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("tushalanand4@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // fail silently
    }
  }, []);

  return (
    <section id="contact" className="border-t border-app-border/40 bg-app-bg px-6 py-32 sm:py-44">
      <div className="max-w-5xl mx-auto flex flex-col items-start gap-12">
        <div className="max-w-3xl flex flex-col gap-4">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-app-text-muted">
            07 / CONTACT
          </span>
          <h2 className="text-4xl sm:text-6xl font-sans font-medium tracking-tight text-app-text-primary leading-tight">
            Let&apos;s build something worth remembering.
          </h2>
          <p className="text-base font-mono text-app-text-secondary leading-relaxed">
            Whether you have an autonomous system to architect or a complex product workflow to streamline — my inbox is always open.
          </p>
        </div>

        {/* Email & Actions */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-app-border/40 w-full">
          <a
            href="mailto:tushalanand4@gmail.com"
            className="text-lg sm:text-2xl font-mono font-semibold text-app-accent hover:underline"
          >
            tushalanand4@gmail.com
          </a>

          <button
            onClick={copyEmail}
            className="px-3 py-1.5 rounded text-xs font-mono text-app-text-muted hover:text-app-text-primary border border-app-border/40 hover:border-app-border transition-colors cursor-pointer"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span key="check" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" /> Copied
                </motion.span>
              ) : (
                <motion.span key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1">
                  <Copy className="h-3.5 w-3.5" /> Copy Email
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 text-xs font-mono text-app-text-muted uppercase tracking-widest pt-6">
          <a href="https://github.com/pandeYtushal" target="_blank" rel="noreferrer" className="hover:text-app-text-primary transition-colors">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/tushal-anand18/" target="_blank" rel="noreferrer" className="hover:text-app-text-primary transition-colors">
            LinkedIn
          </a>
          <a href="https://medium.com/@tushalpandey" target="_blank" rel="noreferrer" className="hover:text-app-text-primary transition-colors">
            Medium
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;

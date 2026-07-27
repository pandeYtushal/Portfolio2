import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Copy, Check } from "lucide-react";
import { fadeUpSubtle } from "../lib/motion";
import Magnetic from "./ui/Magnetic";

const SOCIALS = [
  {
    label: "Email",
    val: "tushalanand4@gmail.com",
    href: "mailto:tushalanand4@gmail.com",
    icon: Mail,
    action: "mail",
    hoverClass: "hover:border-app-accent/40 hover:text-app-accent",
    iconClass: "text-app-accent",
  },
  {
    label: "GitHub",
    val: "github.com/pandeYtushal",
    href: "https://github.com/pandeYtushal",
    icon: Github,
    hoverClass: "hover:border-app-text-primary/30 hover:text-app-text-primary",
    iconClass: "text-app-text-muted group-hover:text-app-text-primary",
  },
  {
    label: "LinkedIn",
    val: "linkedin.com/in/tushal-anand18",
    href: "https://www.linkedin.com/in/tushal-anand18/",
    icon: Linkedin,
    hoverClass: "hover:border-[#0077b5]/40 hover:text-[#0077b5]",
    iconClass: "text-app-accent-blue group-hover:text-[#0077b5]",
  },
];

export const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("tushalanand4@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be blocked; fail silently
    }
  }, []);

  return (
    <section id="contact" className="border-t border-app-border bg-app-bg relative overflow-hidden">
      {/* Blurred glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-app-accent/3 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-24">
        <motion.div
          variants={fadeUpSubtle}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative z-10 w-full text-left"
        >
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-text-muted mb-6">
            05 / CONTACT
          </p>

          <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center space-y-6">
            {/* Huge Typographic Headline */}
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-[-0.04em] text-app-text-primary leading-[1.05]">
              LET&apos;S BUILD <br />
              SOMETHING IMPOSSIBLE.
            </h2>

            {/* Interactive Magnetic socials grid */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-12">
              {SOCIALS.map((soc) => {
                const Icon = soc.icon;
                if (soc.action === "mail") {
                  return (
                    <div key={soc.label} className="flex gap-2">
                      <Magnetic>
                        <a
                          href={soc.href}
                          className={`group flex h-12 items-center gap-2 rounded-full border border-app-border bg-app-surface/60 hover:bg-app-surface px-6 text-sm font-semibold text-app-text-secondary transition-all shadow-none ${soc.hoverClass}`}
                        >
                          <Icon className={`h-4 w-4 transition-colors duration-300 ${soc.iconClass}`} />
                          <span>{soc.label}</span>
                        </a>
                      </Magnetic>

                      <Magnetic>
                        <button
                          onClick={copyEmail}
                          className="group flex h-12 w-12 items-center justify-center rounded-full border border-app-border bg-app-surface/60 hover:bg-app-surface text-app-text-secondary hover:text-app-accent hover:border-app-accent/40 transition-all shadow-none cursor-pointer"
                          title="Copy Email"
                          aria-label={copied ? "Email copied" : "Copy email address"}
                        >
                          <AnimatePresence mode="wait">
                            {copied ? (
                              <motion.div
                                key="check"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                              >
                                <Check className="h-4 w-4 text-emerald-500" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="copy"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                              >
                                <Copy className="h-4 w-4" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                        <span className="sr-only" aria-live="polite">
                          {copied ? "Email address copied to clipboard" : ""}
                        </span>
                      </Magnetic>
                    </div>
                  );
                }

                return (
                  <Magnetic key={soc.label}>
                    <a
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex h-12 items-center gap-2 rounded-full border border-app-border bg-app-surface/60 hover:bg-app-surface px-6 text-sm font-semibold text-app-text-secondary transition-all shadow-none ${soc.hoverClass}`}
                    >
                      <Icon className={`h-4 w-4 transition-colors duration-300 ${soc.iconClass}`} />
                      <span>{soc.label}</span>
                    </a>
                  </Magnetic>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

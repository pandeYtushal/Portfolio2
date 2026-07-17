import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, FileText, Copy, Check } from "lucide-react";
import { fadeUpSubtle, easeOut } from "../lib/motion";
import Magnetic from "./ui/Magnetic";
import ResumeModal from "./ResumeModal";

const SOCIALS = [
  { label: "Email", val: "tushalanand4@gmail.com", href: "mailto:tushalanand4@gmail.com", icon: Mail, action: "mail" },
  { label: "GitHub", val: "github.com/pandeYtushal", href: "https://github.com/pandeYtushal", icon: Github },
  { label: "LinkedIn", val: "linkedin.com/in/tushal-pandey", href: "https://www.linkedin.com/in/tushal-pandey-88229b307/", icon: Linkedin }
];

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [showResume, setShowResume] = useState(false);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText("tushalanand4@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          className="relative z-10 space-y-6 max-w-4xl"
        >
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-text-muted">
            05 / Contact
          </p>

          {/* Huge Typographic Headline */}
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-[-0.04em] text-app-text-primary leading-[0.95]">
            Let&apos;s Build <br />
            Something Impossible.
          </h2>

          <p className="text-sm md:text-base leading-relaxed text-app-text-secondary max-w-md pt-2">
            Seeking full-time roles, browser automation challenges, and AI agent architectures. Open to conversations.
          </p>

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
                        className="group flex h-12 items-center gap-2 rounded-full border border-app-border bg-app-surface/60 hover:bg-app-surface px-6 text-sm font-semibold text-app-text-secondary hover:text-app-text-primary transition-all shadow-none"
                      >
                        <Icon className="h-4 w-4 text-app-accent" />
                        <span>{soc.label}</span>
                      </a>
                    </Magnetic>

                    <Magnetic>
                      <button
                        onClick={copyEmail}
                        className="group flex h-12 w-12 items-center justify-center rounded-full border border-app-border bg-app-surface/60 hover:bg-app-surface text-app-text-secondary hover:text-app-text-primary transition-all shadow-none cursor-pointer"
                        title="Copy Email"
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
                    className="group flex h-12 items-center gap-2 rounded-full border border-app-border bg-app-surface/60 hover:bg-app-surface px-6 text-sm font-semibold text-app-text-secondary hover:text-app-text-primary transition-all shadow-none"
                  >
                    <Icon className="h-4 w-4 text-app-accent-blue" />
                    <span>{soc.label}</span>
                  </a>
                </Magnetic>
              );
            })}

            <Magnetic>
              <button
                onClick={() => setShowResume(true)}
                className="group flex h-12 items-center gap-2 rounded-full border border-app-border bg-app-surface/60 hover:bg-app-surface px-6 text-sm font-semibold text-app-text-secondary hover:text-app-text-primary transition-all shadow-none cursor-pointer"
              >
                <FileText className="h-4 w-4 text-purple-400" />
                <span>Resume Deck</span>
              </button>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
    </section>
  );
};

export default Contact;

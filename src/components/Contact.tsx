import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Copy, Check } from "lucide-react";
import { fadeUpSubtle } from "../lib/motion";
import Toast from "./ui/Toast";

const SOCIALS = [
  {
    label: "Email",
    href:  "mailto:tushalanand4@gmail.com",
    icon:  Mail,
    action: "mail" as const,
  },
  {
    label: "GitHub",
    href:  "https://github.com/pandeYtushal",
    icon:  Github,
  },
  {
    label: "LinkedIn",
    href:  "https://www.linkedin.com/in/tushal-anand18/",
    icon:  Linkedin,
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
      // fail silently
    }
  }, []);

  return (
    <>
      <section id="contact" className="border-t border-app-border bg-app-bg">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          variants={fadeUpSubtle}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-start gap-10"
        >
          {/* Label */}
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-text-muted">
            05 / CONTACT
          </p>

          {/* Headline */}
          <div className="max-w-3xl">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-app-text-primary leading-[0.95]">
              LET&apos;S BUILD<br />SOMETHING<br />IMPOSSIBLE.
            </h2>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-app-border" />

          {/* Social links */}
          <div className="flex flex-wrap gap-3">
            {SOCIALS.map((soc) => {
              const Icon = soc.icon;

              if (soc.action === "mail") {
                return (
                  <div key={soc.label} className="flex gap-2">
                    <a
                      id="contact-email-link"
                      href={soc.href}
                      className="inline-flex h-10 items-center gap-2 border border-app-accent/60 bg-transparent px-5 text-[11px] font-mono font-semibold uppercase tracking-wider text-app-accent hover:bg-app-accent hover:text-white transition-colors duration-200"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span>{soc.label}</span>
                    </a>

                    <button
                      id="contact-copy-email-btn"
                      onClick={copyEmail}
                      title="Copy email address"
                      aria-label={copied ? "Email copied" : "Copy email address"}
                      className="inline-flex h-10 w-10 items-center justify-center border border-app-border bg-transparent text-app-text-muted hover:border-app-text-muted hover:text-app-text-primary transition-colors duration-200 cursor-pointer"
                    >
                      <AnimatePresence mode="wait">
                        {copied ? (
                          <motion.div key="check" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.12 }}>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                          </motion.div>
                        ) : (
                          <motion.div key="copy" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.12 }}>
                            <Copy className="h-3.5 w-3.5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <span className="sr-only" aria-live="polite">
                        {copied ? "Email address copied to clipboard" : ""}
                      </span>
                    </button>
                  </div>
                );
              }

              return (
                <a
                  key={soc.label}
                  id={`contact-${soc.label.toLowerCase()}-link`}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 border border-app-border bg-transparent px-5 text-[11px] font-mono font-semibold uppercase tracking-wider text-app-text-secondary hover:border-app-text-muted hover:text-app-text-primary transition-colors duration-200"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{soc.label}</span>
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
    <Toast show={copied} message="Email copied to clipboard" />
    </>
  );
};

export default Contact;

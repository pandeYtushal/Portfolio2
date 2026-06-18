import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, CheckCircle, Copy, Check, Send } from "lucide-react";

const AVAILABILITY = [
  { label: "Full-Time Roles", desc: "" },
  { label: "Research Internships", desc: "" },
  { label: "Freelance Contracts", desc: "" },
];

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "tushalanand4@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn("Failed to copy email address:", err);
    }
  };

  return (
    <section id="contact" className="section-container border-t border-app-border bg-app-bg">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Left Column - Intro and Availability Checklist (7 cols) */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-app-text-muted mb-3">
              Get in Touch
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-app-text-primary sm:text-4xl md:text-5xl">
              Let&apos;s Build Something Meaningful
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-app-text-secondary">
              Open for Full-Time Opportunities, Software Engineering, and Freelance Projects.
            </p>
          </div>

          {/* Availability Badges Checklist */}
          <div className="space-y-4 pt-4 border-t border-app-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-app-text-muted mb-2">
              Current Openings & Interest
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {AVAILABILITY.map((avail) => (
                <div
                  key={avail.label}
                  className="flex items-center gap-2 rounded-full border border-app-border bg-app-surface px-3.5 py-1.5"
                >
                  <CheckCircle className="h-3.5 w-3.5 text-app-accent" />
                  <span className="text-[11px] font-semibold text-app-text-secondary">
                    {avail.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Direct CTA and Links (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:pt-16">
          <div className="rounded-2xl border border-app-border bg-app-surface p-6 space-y-6 shadow-none">
            <h3 className="text-sm font-bold text-app-text-primary border-b border-app-border pb-3">
              Direct Channels
            </h3>

            <div className="space-y-3.5">
              {/* Start conversation button */}
              <motion.a
                href={`mailto:${email}`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 py-3 text-sm font-bold text-white transition hover:bg-zinc-800/90 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 shadow-none cursor-pointer"
              >
                <Send className="h-4 w-4" />
                Start a Conversation
              </motion.a>

              {/* Copy Email button */}
              <motion.button
                onClick={handleCopyEmail}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-app-border bg-transparent py-3 text-sm font-semibold text-app-text-secondary hover:bg-app-surface-secondary hover:text-app-text-primary transition-all duration-300 shadow-none"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-app-accent" />
                    <span className="text-app-accent">Email Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <motion.a
                href="https://github.com/pandeYtushal"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
                className="flex items-center justify-center gap-2 rounded-lg border border-app-border bg-transparent py-2.5 text-xs font-semibold text-app-text-secondary hover:bg-app-surface-secondary hover:text-app-text-primary transition-all duration-300 shadow-none"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/tushal-anand18"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
                className="flex items-center justify-center gap-2 rounded-lg border border-app-border bg-transparent py-2.5 text-xs font-semibold text-app-text-secondary hover:bg-app-surface-secondary hover:text-app-text-primary transition-all duration-300 shadow-none"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </motion.a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;

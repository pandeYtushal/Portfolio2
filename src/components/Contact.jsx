import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

const SOCIALS = [
  {
    label: "Email",
    icon: Mail,
    href: "mailto:tushalanand4@gmail.com",
    hoverBg: "hover:bg-emerald-500 hover:border-emerald-500",
  },
  {
    label: "GitHub",
    icon: Github,
    href: "https://github.com/pandeYtushal",
    hoverBg: "hover:bg-zinc-800 hover:border-zinc-800",
  },
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/tushal-anand18",
    hoverBg: "hover:bg-blue-600 hover:border-blue-600",
  },
];

const Contact = () => {
  return (
    <section id="contact" className="section-container relative overflow-hidden bg-zinc-50 transition-colors duration-300 dark:bg-black">
      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Contact</p>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
            Let&apos;s build something <span className="text-emerald-500">together</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            I&apos;m open to freelance projects, internships, and full-time opportunities where thoughtful frontend work matters.
          </p>
          <div className="mt-6 flex items-center gap-1.5 text-sm text-zinc-500">
            <MapPin className="h-4 w-4" />
            India
          </div>
        </motion.div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="mailto:tushalanand4@gmail.com"
            className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:bg-white dark:text-black dark:hover:bg-emerald-400"
          >
            <Send className="h-4 w-4" />
            Start a Conversation
          </a>

          {SOCIALS.map(({ label, href, icon: Icon, hoverBg }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
              title={label}
              className={`flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-400 transition-all duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-zinc-800 dark:bg-zinc-900 ${hoverBg}`}
            >
              <Icon className="h-6 w-6" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;

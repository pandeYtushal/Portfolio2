import { Mail, Github, Linkedin, Instagram, MapPin } from "lucide-react";

const SOCIALS = [
  { label: "Email",     icon: Mail,      href: "mailto:tushalanand4@gmail.com",              hoverBg: "hover:bg-emerald-500 hover:border-emerald-500" },
  { label: "GitHub",   icon: Github,    href: "https://github.com/pandeYtushal",           hoverBg: "hover:bg-zinc-600 hover:border-zinc-600" },
  { label: "LinkedIn", icon: Linkedin,  href: "https://www.linkedin.com/in/tushal-anand18", hoverBg: "hover:bg-blue-600 hover:border-blue-600" },
  { label: "Instagram",icon: Instagram, href: "https://instagram.com/",                     hoverBg: "hover:bg-pink-600 hover:border-pink-600" },
];

const Contact = () => {
  return (
    <section id="contact" className="relative overflow-hidden bg-zinc-50 py-24 px-4 text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-white">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[120px] dark:bg-emerald-500/8" />

      <div className="relative z-10 mx-auto max-w-6xl px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Contact
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Let&apos;s work{" "}
            <span className="text-emerald-600 dark:text-emerald-500">together</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            I&apos;m always open to new projects, collaborations, or just a
            friendly chat. Pick any channel below and reach out.
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-sm text-zinc-500">
            <MapPin className="h-4 w-4" />
            India
          </div>
        </div>

        {/* Social circles */}
        <div className="flex gap-4">
          {SOCIALS.map(({ label, href, icon: Icon, hoverBg }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              title={label}
              className={`flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-400 transition-all duration-200 hover:text-white hover:scale-110 dark:border-zinc-700 dark:bg-zinc-900 ${hoverBg}`}
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;

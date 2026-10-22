import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Article {
  id: string;
  number: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  link: string;
  featured?: boolean;
}

const ARTICLES_DATA: Article[] = [
  {
    id: "hunter-agent",
    number: "01",
    title: "From Chatbots to Browser Agents: Building Hunterr",
    category: "AI / ENGINEERING",
    date: "JUL 31, 2026",
    readTime: "4 MIN READ",
    excerpt: "How I built a multi-agent AI system that moves past chat — one that understands a goal, reasons through a live webpage, and actually gets the job done.",
    link: "https://medium.com/@tushalpandey/from-chatbots-to-browser-agents-building-hunterr-d33d23266d97",
    featured: true,
  },
  {
    id: "placement-game",
    number: "02",
    title: "The Placement Game Has Changed. Most People Haven't Noticed",
    category: "CAREER",
    date: "MAY 06, 2026",
    readTime: "5 MIN READ",
    excerpt: "From skills-based hiring to strategic outplacement, the rules of getting hired — and letting people go — have been quietly rewritten.",
    link: "https://medium.com/@tushalpandey/the-job-placement-game-has-changed-most-people-havent-noticed-e8123e5c715a",
  },
  {
    id: "css-mistakes",
    number: "03",
    title: "5 CSS Mistakes Every Beginner Makes (And How to Fix Them)",
    category: "FRONTEND",
    date: "FEB 16, 2026",
    readTime: "4 MIN READ",
    excerpt: "If you're learning CSS and your layouts keep breaking in mysterious ways, you're not alone. Here are five common mistakes that trip up beginners.",
    link: "https://medium.com/@tushalpandey/5-css-mistakes-every-beginner-makes-and-how-to-fix-them-0dd1063e7659",
  },
  {
    id: "tutorial-hell",
    number: "04",
    title: "From Tutorial Hell to Building Real Projects",
    category: "MINDSET",
    date: "DEC 26, 2025",
    readTime: "3 MIN READ",
    excerpt: "Tutorial hell isn't about being lazy. You're working hard, but on the wrong things. Here is exactly how I broke the cycle.",
    link: "https://medium.com/@tushalpandey/from-tutorial-hell-to-building-real-projects-1a29da0da735",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export const Notebook = () => {
  const shouldReduce = useReducedMotion();

  return (
    <section id="notebook" className="relative py-28 md:py-40 px-6 md:px-12 text-app-text-primary z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-14 md:gap-20">

        {/* Section Header */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="flex items-center gap-6"
        >
          <motion.span custom={0} variants={fadeUp} className="font-mono text-sm tracking-widest font-bold text-app-text-primary">06</motion.span>
          <motion.span custom={1} variants={fadeUp} className="font-sans text-xs uppercase tracking-widest font-semibold text-app-text-primary">Writings</motion.span>
          <motion.div custom={2} variants={fadeUp} className="h-[1px] flex-1 bg-app-border/70 ml-4" />
        </motion.div>

        {/* Editorial Layout */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 border-t border-app-border/70 pt-10 items-start"
        >
          <motion.div custom={0} variants={fadeUp} className="md:col-span-5 flex flex-col gap-6">
            <h2 className="text-4xl sm:text-5xl font-serif font-medium leading-[1.1] tracking-tight drop-shadow-[0_2px_15px_rgba(244,244,240,0.7)]">
              THOUGHTS &amp; ARTICLES
            </h2>
            <p className="font-sans text-base sm:text-lg text-app-text-secondary leading-relaxed">
              Essays on engineering, design thinking, career, and the things I've learned by building in public. Published on Medium.
            </p>
          </motion.div>

          <div className="md:col-span-7 flex flex-col">
            {ARTICLES_DATA.map((article, idx) => (
              <motion.a
                key={article.id}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group border-b border-app-border/70 py-7 flex flex-col gap-3 hover:translate-x-2 transition-transform duration-300 cursor-pointer"
              >
                {/* Meta row */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-[11px] tracking-widest uppercase text-app-text-secondary font-bold">
                    {article.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-app-text-secondary/50" />
                  <span className="font-mono text-[11px] tracking-widest uppercase text-app-text-secondary font-semibold">
                    {article.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-app-text-secondary/50" />
                  <span className="font-mono text-[11px] tracking-widest uppercase text-app-text-secondary">
                    {article.readTime}
                  </span>
                </div>

                {/* Title + Arrow */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg sm:text-xl font-serif font-medium text-app-text-primary group-hover:text-app-accent transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <div className="shrink-0 mt-0.5 flex items-center justify-center w-8 h-8 rounded-full border border-app-border/50 text-app-text-secondary group-hover:bg-app-text-primary group-hover:text-app-surface group-hover:border-app-text-primary transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                  </div>
                </div>

                {/* Excerpt */}
                <p className="font-sans text-sm text-app-text-secondary leading-relaxed pr-12">
                  {article.excerpt}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Notebook;

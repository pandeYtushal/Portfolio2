import React from "react";
import { motion, useReducedMotion } from "framer-motion";
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
    title: "From Chatbots to Browser Agents",
    category: "AI / ENGINEERING",
    date: "JUL 31, 2026",
    readTime: "4 MIN READ",
    excerpt: "How I built a multi-agent AI system that translates natural language goals into self-healing browser execution loops.",
    link: "https://medium.com/@tushalpandey",
    featured: true,
  },
  {
    id: "placement-game",
    number: "02",
    title: "The New Engineering Meta",
    category: "CAREER",
    date: "MAY 06, 2026",
    readTime: "5 MIN READ",
    excerpt: "Why standard DSA grinding is no longer enough and how building autonomous AI systems separates elite software engineers.",
    link: "https://medium.com/@tushalpandey",
  },
  {
    id: "decentralized-sync",
    number: "03",
    title: "Decentralized State Synchronization",
    category: "SYSTEMS",
    date: "MAR 18, 2026",
    readTime: "6 MIN READ",
    excerpt: "Architecting deterministic state machines and low-latency cache synchronization across distributed client nodes.",
    link: "https://medium.com/@tushalpandey",
  },
  {
    id: "frontend-mistakes",
    number: "04",
    title: "Modern SPA Anti-Patterns",
    category: "FRONTEND",
    date: "FEB 16, 2026",
    readTime: "3 MIN READ",
    excerpt: "From state hoisting anti-patterns to dynamic layout shifts — fixing subtle architectural flaws in modern SPAs.",
    link: "https://medium.com/@tushalpandey",
  },
];

export const Writing = () => {
  const shouldReduce = useReducedMotion();
  const initial = shouldReduce ? "visible" : "hidden";

  return (
    <section
      id="writing"
      className="bg-app-bg py-32 sm:py-48 overflow-hidden relative border-t border-app-border/20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 flex flex-col gap-16 sm:gap-24 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="flex flex-col gap-4"
        >
          <span className="text-sm font-semibold text-app-text-secondary uppercase tracking-widest">
            Thoughts & Articles
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-app-text-primary uppercase">
            Writings.
          </h2>
        </motion.div>

        {/* Article List */}
        <div className="flex flex-col border-t border-app-border/40">
          {ARTICLES_DATA.map((article, i) => (
            <motion.a
              key={article.id}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: i * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-6 py-8 sm:py-12 border-b border-app-border/40 hover:bg-app-surface/30 transition-colors px-4 -mx-4 rounded-2xl"
            >
              {/* Left Meta & Title */}
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 lg:gap-16">
                <span className="text-sm font-bold text-app-text-secondary uppercase tracking-widest hidden sm:block">
                  {article.number}
                </span>
                <div className="flex flex-col gap-2 max-w-2xl">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-app-text-primary group-hover:text-app-text-secondary transition-colors leading-[1.1]">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-app-text-muted mt-2">
                    <span>{article.category}</span>
                    <span className="w-1 h-1 rounded-full bg-app-text-muted" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Right Arrow */}
              <div className="flex items-center justify-between md:justify-end mt-4 md:mt-0">
                <span className="text-xs font-bold uppercase tracking-widest text-app-text-primary md:hidden">Read Article</span>
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-app-border/40 bg-app-surface text-app-text-primary group-hover:bg-app-text-primary group-hover:text-app-bg transition-colors">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Writing;

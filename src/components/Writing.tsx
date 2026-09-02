import React from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Article {
  id: string;
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
    title: "From Chatbots to Browser Agents: Building Hunter",
    category: "AI / BUILDING",
    date: "JUL 31, 2026",
    readTime: "4 MIN READ",
    excerpt: "How I built a multi-agent AI system that translates natural language goals into self-healing browser execution loops.",
    link: "https://medium.com/@tushalpandey",
    featured: true,
  },
  {
    id: "placement-game",
    title: "The Placement Game Has Changed: What CS Students Need Now",
    category: "AI / CAREER",
    date: "MAY 06, 2026",
    readTime: "5 MIN READ",
    excerpt: "Why standard DSA grinding is no longer enough and how building autonomous AI systems separates elite software engineers.",
    link: "https://medium.com/@tushalpandey",
  },
  {
    id: "decentralized-sync",
    title: "Decentralized State Synchronization in Modern Web Architecture",
    category: "SYSTEMS / WEB3",
    date: "MAR 18, 2026",
    readTime: "6 MIN READ",
    excerpt: "Architecting deterministic state machines and low-latency cache synchronization across distributed client nodes.",
    link: "https://medium.com/@tushalpandey",
  },
  {
    id: "frontend-mistakes",
    title: "5 Frontend Mistakes Every Senior Developer Still Makes",
    category: "FRONTEND / UX",
    date: "FEB 16, 2026",
    readTime: "3 MIN READ",
    excerpt: "From state hoisting anti-patterns to dynamic layout shifts — fixing subtle architectural flaws in modern SPAs.",
    link: "https://medium.com/@tushalpandey",
  },
];

const ArticleCard = ({
  article,
  isFeatured = false,
}: {
  article: Article;
  isFeatured?: boolean;
}) => {
  const shouldReduce = useReducedMotion();

  // Controlled spring hover physics for text
  const springConfig = { stiffness: 140, damping: 22, mass: 0.6 };
  const textX = useSpring(0, springConfig);

  const handleMouseEnter = () => {
    if (shouldReduce) return;
    const isPointerCapable = window.matchMedia("(hover: hover)").matches;
    if (!isPointerCapable) return;
    textX.set(4);
  };

  const handleMouseLeave = () => {
    textX.set(0);
  };

  const revealVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  if (isFeatured) {
    return (
      <motion.article
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={revealVariant}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group flex flex-col gap-6 pb-16 border-b border-app-border/30"
      >
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-app-accent">
          FEATURED THOUGHT
        </span>

        <div className="flex flex-col items-start gap-4 max-w-3xl">
          <div className="flex items-center gap-3 text-xs font-mono text-app-text-muted uppercase tracking-widest">
            <span className="text-app-accent font-bold">{article.category}</span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>

          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            <motion.h3
              style={shouldReduce ? undefined : { x: textX }}
              className="text-3xl sm:text-5xl font-sans font-normal tracking-tight text-app-text-primary hover:text-app-accent transition-colors leading-tight"
            >
              {article.title}
            </motion.h3>
          </a>

          <p className="text-xs sm:text-sm font-mono text-app-text-secondary leading-relaxed max-w-2xl">
            {article.excerpt}
          </p>

          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-app-text-primary group-hover:text-app-accent border-b border-app-text-primary/40 group-hover:border-app-accent pb-1 transition-all pt-2"
          >
            <span>READ ARTICLE</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={revealVariant}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group py-12 border-b border-app-border/30 last:border-b-0"
    >
      <div className="flex flex-col items-start gap-4 max-w-3xl">
        <div className="flex items-center gap-3 text-xs font-mono text-app-text-muted uppercase tracking-widest">
          <span className="text-app-accent font-bold">{article.category}</span>
          <span>·</span>
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>

        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
        >
          <motion.h3
            style={shouldReduce ? undefined : { x: textX }}
            className="text-2xl sm:text-4xl font-sans font-normal tracking-tight text-app-text-primary hover:text-app-accent transition-colors leading-tight"
          >
            {article.title}
          </motion.h3>
        </a>

        <p className="text-xs sm:text-sm font-mono text-app-text-secondary leading-relaxed max-w-2xl">
          {article.excerpt}
        </p>

        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-app-text-primary group-hover:text-app-accent border-b border-app-text-primary/40 group-hover:border-app-accent pb-1 transition-all pt-2"
        >
          <span>READ ARTICLE</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
    </motion.article>
  );
};

export const Writing = () => {
  return (
    <section id="writing" className="border-t border-app-border/40 bg-app-bg px-6 py-28 sm:py-40 overflow-x-hidden">
      <div className="max-w-5xl mx-auto flex flex-col gap-20">
        
        {/* Large Editorial Opening */}
        <div className="flex flex-col items-start gap-4 max-w-3xl">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-app-text-muted">
            06 / THOUGHTS
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-normal tracking-tight leading-[0.95] text-app-text-primary uppercase">
            WRITING <br />
            WITHOUT <br />
            <span className="italic font-serif text-app-accent font-normal lowercase">a template.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm font-mono leading-relaxed text-app-text-secondary max-w-md">
            Ideas, experiments, lessons and things I&apos;ve learned while building autonomous systems.
          </p>
        </div>

        {/* Featured Article */}
        <ArticleCard article={ARTICLES_DATA[0]} isFeatured={true} />

        {/* Subsequent Articles */}
        <div className="flex flex-col">
          {ARTICLES_DATA.slice(1).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Writing;

import { m, useReducedMotion } from "motion/react";
import { springs, stagger } from "../motion.theme";
import { Typography, Button } from "@cred/neopop-web/lib/components";
import { fontNameSpaces } from "@cred/neopop-web/lib/primitives";

interface Article {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
  url: string;
}

const articles: Article[] = [
  {
    title: "From Chatbots to Browser Agents: Building Hunterr",
    excerpt:
      "How I built a multi-agent AI system that moves past chat — one that understands a high-level goal, reasons through a live webpage, and actually gets the job done with visual coordinates and self-healing routers.",
    date: "Jul 2026",
    readTime: "6 min read",
    tag: "AI & AGENTS",
    url: "https://medium.com/@tushalpandey/from-chatbots-to-browser-agents-building-hunterr-d33d23266d97",
  },
  {
    title: "The Placement Game Has Changed. Most People Haven’t Noticed",
    excerpt:
      "From skills-based hiring to strategic outplacement, the rules of getting hired — and letting people go — have quietly rewritten themselves. A grounded perspective on what’s actually working in 2026.",
    date: "May 2026",
    readTime: "5 min read",
    tag: "CAREER & SKILLS",
    url: "https://medium.com/@tushalpandey/the-job-placement-game-has-changed-most-people-havent-noticed-e8123e5c715a",
  },
  {
    title: "5 CSS Mistakes Every Beginner Makes (And How to Fix Them)",
    excerpt:
      "A visual, practical guide to mastering Flexbox properties, layout structure traps, responsive scaling, and avoiding anti-patterns so you never struggle with web layouts again.",
    date: "Feb 2026",
    readTime: "4 min read",
    tag: "FRONTEND & CSS",
    url: "https://medium.com/@tushalpandey/5-css-mistakes-every-beginner-makes-and-how-to-fix-them-0dd1063e7659",
  },
  {
    title: "From Tutorial Hell to Building Real Projects",
    excerpt:
      "Breaking free from the comfort trap of 10-hour video courses. How to embrace the blank IDE, navigate stack traces, and build true engineering confidence through independent execution.",
    date: "Dec 2025",
    readTime: "5 min read",
    tag: "ENGINEERING MINDSET",
    url: "https://medium.com/@tushalpandey/from-tutorial-hell-to-building-real-projects-1a29da0da735",
  },
];

export default function Blog() {
  const reduce = useReducedMotion();

  return (
    <section id="blog" className="blog-section section-wrap" aria-labelledby="blog-heading">
      {/* Publications landmark header */}
      <div className="section-heading mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="eyebrow flex items-center gap-2">
            <Typography {...fontNameSpaces.tc12b} color="#9e9e9b">
              PUBLICATIONS <span className="opacity-40">TECHNICAL WRITING &amp; ESSAYS</span>
            </Typography>
          </div>
          <h2 id="blog-heading">
            Words &amp;<br />thoughts<span className="accent">.</span>
          </h2>
          <p className="section-note mt-2">
            Deep dives into autonomous AI browser agents, systems discipline, frontend craft, and engineering mindset.
          </p>
        </div>

        <div className="shrink-0 pt-2 md:pt-0">
          <Button
            variant="secondary"
            kind="elevated"
            size="medium"
            colorMode="dark"
            onClick={() => window.open("https://medium.com/@tushalpandey", "_blank", "noopener,noreferrer")}
            aria-label="Open Medium profile"
          >
            Medium Publication ↗
          </Button>
        </div>
      </div>

      {/* Technical publication matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {articles.map((article, index) => (
          <m.article
            key={article.url}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ ...springs.gentle, delay: index * stagger }}
            className="group relative flex flex-col justify-between p-5 sm:p-6 bg-[#0d0d10] border border-white/[0.08] hover:border-white/20 transition-colors duration-300"
          >
            <div>
              {/* Card Meta Bar */}
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <span className="px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase text-neutral-300 bg-white/[0.05] border border-white/10 font-semibold">
                  {article.tag}
                </span>
                <span className="font-mono text-[11px] text-neutral-500">
                  {article.date} · {article.readTime}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg lg:text-xl font-medium tracking-tight text-white group-hover:text-[var(--accent)] transition-colors duration-200 leading-snug">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus:outline-none focus-visible:underline"
                >
                  {article.title}
                </a>
              </h3>

              {/* Excerpt */}
              <p className="mt-2.5 text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            {/* Read Action */}
            <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-neutral-300 group-hover:text-white transition-colors"
                aria-label={`Read ${article.title} on Medium`}
              >
                <span>Read on Medium</span>
                <span className="text-[var(--accent)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
              <span className="font-mono text-[10px] text-neutral-600">
                0{index + 1}
              </span>
            </div>
          </m.article>
        ))}
      </div>

      {/* External publication index link */}
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-[#0c0c0e] border border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 font-semibold block mb-1">
            ARCHIVE &amp; UPDATES
          </span>
          <p className="text-xs sm:text-sm text-neutral-300">
            More essays, architectural breakdowns, and guides published regularly on Medium.
          </p>
        </div>
        <div className="shrink-0">
          <Button
            variant="primary"
            kind="elevated"
            size="small"
            colorMode="dark"
            onClick={() => window.open("https://medium.com/@tushalpandey", "_blank", "noopener,noreferrer")}
            aria-label="View all posts on Medium"
          >
            Follow @tushalpandey ↗
          </Button>
        </div>
      </div>
    </section>
  );
}

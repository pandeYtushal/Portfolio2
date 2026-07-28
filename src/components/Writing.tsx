import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { fadeUpSubtle, staggerContainer, fadeUp } from "../lib/motion";

const MEDIUM_USERNAME = "tushalpandey";
const RSS_API_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`;

interface MediumPost {
  title: string;
  pubDate: string;
  readingTime: string;
  link: string;
  description: string;
}

const MediumIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const SkeletonRow = () => (
  <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-app-border animate-pulse gap-4">
    <div className="space-y-2.5 flex-1">
      <div className="h-2.5 w-20 bg-app-surface-secondary rounded" />
      <div className="h-5 w-2/3 bg-app-surface-secondary rounded" />
      <div className="h-3 w-5/6 bg-app-surface-secondary rounded" />
    </div>
    <div className="flex items-center gap-4">
      <div className="h-3 w-16 bg-app-surface-secondary rounded" />
      <div className="h-8 w-8 rounded-full bg-app-surface-secondary" />
    </div>
  </div>
);

export const Writing = () => {
  const [posts,   setPosts]   = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res  = await fetch(RSS_API_URL);
        const data = await res.json();

        if (data.status === "ok" && data.items?.length > 0) {
          const formatted = data.items.slice(0, 6).map((item: any) => {
            const clean   = item.description?.replace(/<[^>]*>/g, "").trim() ?? "";
            const excerpt = clean.substring(0, 160) + (clean.length > 160 ? "..." : "");
            const words   = item.content?.replace(/<[^>]*>/g, "").split(/\s+/).length ?? 1000;
            const mins    = Math.ceil(words / 225);
            const date    = new Date(item.pubDate).toLocaleDateString("en-US", {
              month: "short", day: "numeric", year: "numeric",
            });
            return { title: item.title, pubDate: date, readingTime: `${mins} min read`, link: item.link, description: excerpt };
          });
          setPosts(formatted);
        } else {
          setPosts([]);
        }
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (!loading && posts.length === 0) return null;

  return (
    <section id="writing" className="border-t border-app-border bg-app-bg">
      <div className="max-w-5xl mx-auto px-6 py-24">

        {/* Header */}
        <motion.div
          variants={fadeUpSubtle}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 border-b border-app-border pb-8"
        >
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-text-muted mb-4">
            04 / WRITING
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-app-text-primary leading-[1.0]">
            ARTICLES.
          </h2>
          <p className="mt-4 text-sm font-mono leading-relaxed text-app-text-secondary max-w-lg">
            Sharing learnings, challenges, and architectural decisions from building software.
          </p>
        </motion.div>

        {/* Post rows */}
        <motion.div
          variants={staggerContainer(0.06, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col"
        >
          {loading ? (
            <>
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </>
          ) : (
            posts.map((post, i) => (
              <motion.article
                key={post.link + i}
                variants={fadeUp}
                onClick={() => window.open(post.link, "_blank", "noopener,noreferrer")}
                className="group cursor-pointer flex flex-col md:flex-row md:items-center justify-between py-7 border-b border-app-border/70 hover:bg-app-surface/30 -mx-4 px-4 transition-all duration-200 gap-5 rounded"
              >
                {/* Left */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-4 text-[10px] font-mono text-app-text-muted">
                    <span className="flex items-center gap-1 uppercase tracking-wide">
                      <Calendar className="h-2.5 w-2.5" />
                      {post.pubDate}
                    </span>
                    <span className="flex items-center gap-1 uppercase tracking-wide">
                      <Clock className="h-2.5 w-2.5" />
                      {post.readingTime}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-black text-app-text-primary tracking-tight leading-tight group-hover:text-app-accent transition-colors duration-200">
                    {post.title}
                  </h3>

                  <p className="text-[11px] leading-relaxed text-app-text-secondary font-mono max-w-2xl line-clamp-2">
                    {post.description}
                  </p>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-center gap-1.5 text-app-text-muted">
                    <MediumIcon className="h-3 w-3" />
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider">Medium</span>
                  </div>
                  <div className="h-9 w-9 rounded-full border border-app-border flex items-center justify-center text-app-text-muted group-hover:bg-app-text-primary group-hover:text-app-bg group-hover:border-app-text-primary transition-all duration-300">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Writing;

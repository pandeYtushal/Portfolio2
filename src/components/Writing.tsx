import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { fadeUpSubtle, staggerContainer, fadeUp } from "../lib/motion";

// Configurable Medium RSS Feed Endpoint
const MEDIUM_USERNAME = "tushalpandey";
const RSS_API_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`;

interface MediumPost {
  title: string;
  pubDate: string;
  readingTime: string;
  link: string;
  description: string;
}

// Custom sleek Medium SVG Icon
const MediumIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const SkeletonCard = () => (
  <div className="flex flex-col justify-between rounded-2xl border border-app-border bg-app-surface p-6 h-64 animate-pulse shadow-none">
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="h-3.5 w-20 bg-app-surface-secondary rounded" />
        <div className="h-3.5 w-16 bg-app-surface-secondary rounded font-mono" />
      </div>
      <div className="h-6 w-full bg-app-surface-secondary rounded" />
      <div className="h-6 w-3/4 bg-app-surface-secondary rounded" />
      <div className="space-y-2 pt-2">
        <div className="h-3 w-full bg-app-surface-secondary rounded" />
        <div className="h-3 w-5/6 bg-app-surface-secondary rounded" />
      </div>
    </div>
    <div className="mt-8 flex items-center justify-between border-t border-app-border pt-4">
      <div className="h-4 w-12 bg-app-surface-secondary rounded" />
      <div className="h-4 w-24 bg-app-surface-secondary rounded" />
    </div>
  </div>
);

export const Writing = () => {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        const response = await fetch(RSS_API_URL);
        const data = await response.json();

        if (data.status === "ok" && data.items && data.items.length > 0) {
          // Format raw Medium posts
          const formattedPosts = data.items.slice(0, 6).map((item: any) => {
            // Strip HTML tags from description for excerpt
            const cleanText = item.description
              ? item.description.replace(/<[^>]*>/g, "").trim()
              : "";
            const excerpt = cleanText.substring(0, 160) + (cleanText.length > 160 ? "..." : "");

            // Estimate reading time
            const words = item.content ? item.content.replace(/<[^>]*>/g, "").split(/\s+/).length : 1000;
            const minutes = Math.ceil(words / 225);
            const readingTime = `${minutes} min read`;

            // Format date (e.g., Jan 12, 2026)
            const dateObj = new Date(item.pubDate);
            const formattedDate = dateObj.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return {
              title: item.title,
              pubDate: formattedDate,
              readingTime,
              link: item.link,
              description: excerpt,
            };
          });

          setPosts(formattedPosts);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.warn("Failed to fetch Medium posts automatically:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMediumPosts();
  }, []);

  if (!loading && posts.length === 0) {
    return null; // Don't render anything if there are no posts or fetch failed
  }

  return (
    <section id="writing" className="border-t border-app-border bg-app-bg text-left">
      {/* Section Header */}
      <motion.div
        variants={fadeUpSubtle}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-6xl mx-auto px-6 pt-24 pb-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-app-border pb-8">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-app-text-muted mb-3">
              04 / Writing
            </p>
            <h2 className="text-5xl md:text-7xl font-black tracking-[-0.04em] text-app-text-primary leading-none">
              Articles & Insights.
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-app-text-secondary max-w-xs md:text-right">
            Sharing learnings, challenges, and architectural decisions from building software.
          </p>
        </div>
      </motion.div>

      {/* Grid Layout */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
      <motion.div
        variants={staggerContainer(0.05, 0.05)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mx-auto w-full"
      >
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          posts.map((post, idx) => (
            <motion.article
              key={post.link + idx}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              onClick={() => window.open(post.link, "_blank", "noopener,noreferrer")}
              className="group cursor-pointer flex flex-col justify-between rounded-2xl border border-app-border bg-app-surface p-6 transition-all duration-300 hover:border-app-accent/30 hover:shadow-[0_8px_40px_rgba(255,138,0,0.08)] shadow-none"
            >
              <div className="space-y-4">
                {/* Top Meta info */}
                <div className="flex items-center justify-between text-[11px] font-medium text-app-text-muted">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{post.pubDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono rounded-full border border-app-accent/20 bg-app-accent/5 px-2.5 py-0.5 text-app-accent">
                    <Clock className="h-3 w-3" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-app-text-primary line-clamp-2 transition-colors group-hover:text-app-accent">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm leading-relaxed text-app-text-secondary line-clamp-3">
                  {post.description}
                </p>
              </div>

              {/* Bottom Actions footer */}
              <div className="mt-8 flex items-center justify-between border-t border-app-border pt-4">
                <div className="flex items-center gap-1.5 text-app-text-muted">
                  <MediumIcon className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Medium</span>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-app-text-secondary group-hover:text-app-accent transition-colors">
                  <span>Read on Medium</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
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

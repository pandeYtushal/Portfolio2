/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ExternalLink, RefreshCw } from "lucide-react";

const MEDIUM_USERNAME = "tushalpandey";
const FEED_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`;

const stripHtml = (value) => value.replace(/<[^>]+>/g, "").trim();

const BlogSkeleton = () => (
  <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
    {[0, 1, 2].map((item) => (
      <div
        key={item}
        className="min-h-52 animate-pulse rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="mb-4 h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="space-y-2">
          <div className="h-3 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="mt-10 h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    ))}
  </div>
);

const BlogFallback = ({ onRetry }) => (
  <div className="mx-auto max-w-2xl rounded-lg border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
    <p className="text-lg font-bold text-zinc-900 dark:text-white">Insights are taking a short break.</p>
    <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
      Medium did not respond this time, but you can still open the profile directly.
    </p>
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-md border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        <RefreshCw className="h-4 w-4" />
        Retry
      </button>
      <a
        href={`https://medium.com/@${MEDIUM_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 dark:bg-white dark:text-black dark:hover:bg-orange-400"
      >
        Open Medium
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  </div>
);

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(`${FEED_URL}&t=${Date.now()}`);
      if (!response.ok) throw new Error("Unable to load Medium feed");

      const data = await response.json();
      setPosts(data.items ? data.items.slice(0, 3) : []);
    } catch (fetchError) {
      console.error("Failed to fetch blog posts:", fetchError);
      setPosts([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <section id="blog" className="section-container bg-zinc-50 transition-colors duration-300 dark:bg-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
          Latest{" "}
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Insights</span>
        </h2>
        <p className="mt-4 text-zinc-500 dark:text-zinc-400">Technical notes, product lessons, and experiments from Medium.</p>
      </motion.div>

      {loading ? (
        <BlogSkeleton />
      ) : error || posts.length === 0 ? (
        <BlogFallback onRetry={fetchPosts} />
      ) : (
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <motion.a
              key={post.guid}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6 }}
              className="group flex flex-col rounded-lg border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-orange-500 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-orange-500"
            >
              <h3 className="mb-2 text-lg font-bold leading-tight text-zinc-900 transition-colors group-hover:text-orange-500 dark:text-white sm:text-xl">
                {post.title}
              </h3>

              <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {stripHtml(post.description)}
              </p>

              <div className="mt-auto flex items-center justify-between gap-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  {new Date(post.pubDate).toLocaleDateString(undefined, { dateStyle: "medium" })}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-zinc-900 dark:text-white">
                  Read
                  <ExternalLink className="h-3 w-3" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
};

export default Blog;

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

const MEDIUM_USERNAME = "tushalpandey";
const FEED_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch(`${FEED_URL}&t=${new Date().getTime()}`);
      const data = await response.json();
      if (data.items) {
        setPosts(data.items.slice(0, 3));
      }
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
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
          Latest <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Insights</span>
        </h2>
        <p className="mt-4 text-zinc-500 dark:text-zinc-400">Thought leadership and technical articles from Medium.</p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-12">
          <p className="animate-pulse text-zinc-500">Loading insights...</p>
        </div>
      ) : (
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <motion.a
              key={post.guid}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6 }}
              className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-orange-500 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-orange-500"
            >
              <h3 className="mb-2 text-lg font-bold leading-tight text-zinc-900 transition-colors group-hover:text-orange-500 dark:text-white sm:text-xl">
                {post.title}
              </h3>

              <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {post.description.replace(/<[^>]+>/g, "").trim()}
              </p>

              <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  {new Date(post.pubDate).toLocaleDateString(undefined, { dateStyle: "medium" })}
                </span>
                <span className="text-xs font-bold text-zinc-900 dark:text-white">Read on Medium →</span>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
};

export default Blog;
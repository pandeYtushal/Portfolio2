import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MEDIUM_USERNAME = "tushalpandey";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}&t=${new Date().getTime()}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.items.slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section
      id="blog"
      className="section-container bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-white">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-10 text-center text-zinc-900 dark:text-white">
        Blogs
      </motion.h2>

      {loading ? (
        <p className="text-center text-zinc-500">Loading posts...</p>
      ) : (
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <motion.a
              key={post.guid}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6 }}
              className="group bg-white border border-zinc-200
                         rounded-xl p-6 transition hover:border-orange-500 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-red-500">
              <h3 className="text-lg font-semibold mb-2 text-zinc-900 group-hover:text-zinc-700 dark:text-white dark:group-hover:text-white">
                {post.title}
              </h3>

              <p className="text-sm text-zinc-500 line-clamp-3 dark:text-gray-400">
                {post.description.replace(/<[^>]+>/g, "")}
              </p>

              <span className="block mt-4 text-xs text-zinc-400 dark:text-gray-500">
                {new Date(post.pubDate).toDateString()}
              </span>

              <span className="block mt-3 text-sm font-medium text-zinc-900 dark:text-white">
                Read on Medium →
              </span>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
};

export default Blog;
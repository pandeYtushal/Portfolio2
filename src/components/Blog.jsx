import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MEDIUM_USERNAME = "tushalpandey"; 

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`
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
      className="min-h-screen px-6 py-20 bg-black text-white">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-10 text-center">
        Writing on Medium
      </motion.h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading posts...</p>
      ) : (
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <motion.a
              key={post.guid}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6 }}
              className="group bg-zinc-900 border border-zinc-800
                         rounded-xl p-6 transition hover:border-purple-500">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400">
                {post.title}
              </h3>

              <p className="text-sm text-gray-400 line-clamp-3">
                {post.description.replace(/<[^>]+>/g, "")}
              </p>

              <span className="block mt-4 text-xs text-gray-500">
                {new Date(post.pubDate).toDateString()}
              </span>

              <span className="block mt-3 text-sm text-purple-400">
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
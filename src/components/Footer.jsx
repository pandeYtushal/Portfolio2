const Footer = () => {
  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 transition-colors duration-300 dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-8 md:px-12">
        <p className="text-xs italic text-zinc-500 dark:text-zinc-400">
          &quot;The only way to do great work is to love what you do.&quot; -{" "}
          <span className="font-medium not-italic text-zinc-700 dark:text-zinc-300">Steve Jobs</span>
        </p>

        <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>
            Developed with <span className="text-orange-500">Passion</span> by{" "}
            <span className="font-bold text-zinc-900 dark:text-white">Tushal Pandey</span>
          </p>
          <span className="h-3 w-px bg-zinc-200 dark:bg-zinc-800" />
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

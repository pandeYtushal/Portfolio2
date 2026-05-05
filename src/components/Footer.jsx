const Footer = () => {
  return (
    <footer className="w-full border-t border-green-500 bg-black">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-12 py-3">
        {/* Quote + author */}
        <p className="text-xs text-zinc-400 italic">
          "I speak to everyone in the same way." —{" "}
          <span className="not-italic text-zinc-500">Albert Einstein</span>
        </p>
        {/* Credit + copyright */}
        <p className="text-xs text-zinc-400">
          Built by <span className="font-semibold text-orange-400">Tushal Pandey</span>
          <span className="ml-2 text-zinc-600">© {new Date().getFullYear()}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

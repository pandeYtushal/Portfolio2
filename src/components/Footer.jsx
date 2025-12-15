const Footer = () => {
  return (
    <footer className="w-full border-t border-zinc-900 bg-black">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto text-center space-y-3">

          <p className="text-zinc-400 italic text-sm sm:text-base leading-relaxed">
            “I speak to everyone in the same way, whether he is the garbage man
            or the president of the university.”
          </p>

          <p className="text-zinc-500 text-sm">
            — Albert Einstein
          </p>

          <p className="text-zinc-300 text-sm font-medium pt-4">
            Developed by <span className="text-white">Tushal Pandey</span>
          </p>

          <p className="text-zinc-500 text-xs">
            © {new Date().getFullYear()} • All rights reserved
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

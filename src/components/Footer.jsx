const Footer = () => {
  return (
    <footer className="w-full border-t border-green-500 bg-black">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="max-w-3xl mx-auto text-center space-y-2 sm:space-y-3">

          {/* Quote */}
          <p className="text-zinc-400 italic text-xs sm:text-sm md:text-base leading-relaxed">
            “I speak to everyone in the same way, whether he is the garbage man
            or the president of the university.”
          </p>

          {/* Author */}
          <p className="text-zinc-500 text-xs sm:text-sm">
            — Albert Einstein
          </p>

          {/* Credit */}
          <p className="text-zinc-300 text-xs sm:text-sm font-medium pt-3 sm:pt-4">
            Developed by <span className="text-orange-500">Tushal Pandey</span>
          </p>

          {/* Copyright */}
          <p className="text-zinc-500 text-[10px] sm:text-xs">
            © {new Date().getFullYear()} • All rights reserved
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

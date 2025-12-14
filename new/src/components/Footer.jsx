const Footer = () => {
  return (
    <footer className="bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
        <div className="text-center">
          <p className="text-gray-400 mb-3 italic">
            “I speak to everyone in the same way, whether he is the garbage man or the president of the university.”
          </p>

          <p className="text-gray-500 text-sm mb-3">
            ― Albert Einstein
          </p>

          <p className="text-gray-400">
            Developed by Tushal Pandey
          </p>

          <p className="text-gray-500 text-sm mt-1">
            © {new Date().getFullYear()} • All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

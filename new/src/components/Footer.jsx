const Footer = () => {
  return (
    <footer className="bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-400 mb-4 italic">
            &quot;“I speak to everyone in the same way, whether he is the garbage man or the president of the university.”&quot;
          </p>
          <p className="text-gray-500 text-sm mb-4">― Albert Einstein</p>
          <p className="text-gray-400">
            Developed by Tushal
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


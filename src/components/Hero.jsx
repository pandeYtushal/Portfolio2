const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black pb-24"
    >
      {/* Background */}
<div className="absolute inset-0 bg- bg-zinc-950/80 backdrop-blur-sm"></div>
<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(139,92,246,0.12),transparent_60%)]"></div>


      <div className="relative z-10 w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">

          {/* Profile */}
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-linear-to-br bg-zinc-500 p-1">
              <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-4xl md:text-5xl font-bold gradient-text">
                TP
              </div>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Hi, I&apos;m Tushal</span>
          </h2>

          {/* Description */}
        <div className="max-w-4xl mx-auto p-6 md:p-8 hover:border-white transition-colors duration-300">
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">I&apos;m a Computer Science Engineering Student with a strong passion for technology and innovation. My journey in software developmenthas equipped me with expertise in multiple{" "}
    <span className="text-white font-poppins font-medium italic">
      languages, frameworks, and development tools
    </span>.
  </p>
</div>


          {/* Button */}
          <a href="https://drive.google.com/file/d/1MgVDHzFI4jg_Z8vGTaBrgC6r_be2xtAw/view?usp=sharing" target="_blank" rel="noopener noreferrer"
          className="inline-block mt-4 px-6 py-3 cursor-pointer bg-gradient-to-r from-zinc-500 to-zinc-800 text-white rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
          Resume</a>


        </div>
      </div>
    </section>
  );
};

export default Hero;

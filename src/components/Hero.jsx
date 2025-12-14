const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black pb-24"
    >
      {/* Background */}
<div className="absolute inset-0 bg-linear-to-br from-zinc-950 via-zinc-900 to-black"></div>
<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(139,92,246,0.12),transparent_60%)]"></div>


      <div className="relative z-10 w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">

          {/* Profile */}
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-linear-to-br from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-4xl md:text-5xl font-bold gradient-text">
                TP
              </div>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Hi, I&apos;m Tushal</span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-400 mb-6 max-w-3xl mx-auto leading-relaxed">
            I&apos;m a Computer Science Engineering Student with a strong passion
            for technology and innovation. My journey in software development
            has equipped me with expertise in multiple{" "}
            <span className="text-white font-poppins font-medium">
              languages, frameworks, and development tools
            </span>.
          </p>

          {/* Button */}
          <button className="mt-4 px-6 py-3 cursor-pointer bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            Resume
          </button>

        </div>
      </div>
    </section>
  );
};

export default Hero;

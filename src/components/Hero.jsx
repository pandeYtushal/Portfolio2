import LiveClock from "./LiveClock";
const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-black pb-24">
      {/* Background */}
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(139,92,246,0.12),transparent_60%)]" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto pt-24 sm:pt-28">

          <div className="mb-4 flex justify-end"><LiveClock /></div>

          {/* Profile */}
          <div className="mb-6 flex justify-start">
            <div className="relative w-26 h-26 sm:w-20 sm:h-20 border border-zinc-700 rounded-xl hover:border-white transition
                            flex items-center justify-center overflow-hidden">
              <img src="/avtar.jpg"alt="Tushal Pandey"className="w-full h-full object-cover"/>
              <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border border-black rounded-full" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-left">
            <span className="text-orange-400">Tushal Pandey</span>
          </h2>

          {/* Description */}
          <p className="max-w-3xl text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed text-left">
            I&apos;m a Computer Science Engineering Student with a strong passion
            for technology and innovation. My journey in software development has
            equipped me with expertise in multiple{" "}
            <span className="text-white font-medium italic">
              languages, frameworks, and development tools
            </span>.
          </p>

          {/* Button */}
          <div className="mt-6">
            <a
              href="https://drive.google.com/file/d/1yxypi65Sfk0UJZaGyWjlRptqXVhQWdxJ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-gradient-to-r from-zinc-500 to-zinc-800 text-white rounded-xl font-semibold transition-transform duration-300 hover:scale-105">
              Resume
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

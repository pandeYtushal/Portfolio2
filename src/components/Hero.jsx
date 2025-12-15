const Hero = () => {
  return (
    <section id="home"className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black pb-24">
      {/* Background */}
<div className="absolute inset-0 bg-zinc-950 backdrop-blur-sm"></div>
<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(139,92,246,0.12),transparent_60%)]"></div>


      <div className="relative z-10 w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">

         {/* Profile */}
        <div className="mb-8 flex justify-start">
        <div className="relative w-20 h-20 border border-zinc-700 rounded-xl hover:border-white transitionflex items-center justify-center text-xl font-semibold">TP
        <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 rounded-full border-black" /></div>
        </div>


          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 flex justify-start">
            <span className="text-white">Hi, I&apos;m Tushal</span>
          </h2>

         {/* Description */}
         <div className="max-w-4xl p-6 md:p-8 transition-colors duration-300">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-left">
           I&apos;m a Computer Science Engineering Student with a strong passion
           for technology and innovation. My journey in software development has
           equipped me with expertise in multiple{" "}
           <span className="text-white font-poppins font-medium italic">
           languages, frameworks, and development tools</span>.
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

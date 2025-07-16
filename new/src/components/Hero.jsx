

const Hero = () => {
  return (
    <section id="home" className="min-h-screen pt-24 text-center px-4 flex flex-col justify-center">
      <h2 className="text-6xl font-bold mb-4">
        <span className="inline-block animate-fade-in-up">Hi, I'm </span>
        <span className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-mono whitespace-nowrap animate-gradient-x after:content-['|'] after:animate-blink">
          Tushal
        </span>
      </h2>
      <p className="mt-4 max-w-4xl mx-auto text-1xl md:text-2xl text-gray-700 dark:text-gray-300 px-4 leading-relaxed font-medium">
  A passionate Computer Science student at Chandigarh University, driven to solve real-world problems through development and technology.
</p>
     <img src="/avt.jpg" alt="" className="w-40 h-40 rounded-full mx-auto mt-6 object-cover shadow-md" />
<a href="https://drive.google.com/file/d/1iQniWxwgNuYiRnyzY_9fit5ls3ZA5fYc/view?usp=sharing"target="_blank"rel="noopener noreferrer"
  className="mt-8 px-10 py-4 bg-gradient-to-r from-slate-800 to-slate-600 text-white rounded-full font-bold shadow-lg hover:from-blue-400
   hover:to-purple-400 hover:text-black hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 mx-auto text-xl"
>
  Resume
</a>
      {/* Animations */}
           <style>
        {`
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s ease-in-out infinite;
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .after\\:animate-blink::after {
            animation: blink 1s steps(1) infinite;
          }
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in-up {
            animation: fade-in-up 1.2s cubic-bezier(.4,0,.2,1) infinite alternate;
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
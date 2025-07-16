
const Skills = () => {
  return (
    <section id="skills" className="min-h-screen pt-28 bg-white dark:bg-gray-800">
      <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">Tech Stack</h2>
      <p className="text-2xl font-bold text-center text-gray-700 dark:text-gray-300 mb-8">Tech which I used for projects</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10 max-w-4xl mx-auto px-4">
        {/* C++ */}
        <div className="group bg-white/80 dark:bg-gray-900/70 border border-blue-200 dark:border-blue-700 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-400 animate-fade-in">
          <img className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-125" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" alt="C++" />
          <span className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">C++</span>
        </div>
        {/* Python */}
        <div className="group bg-white/80 dark:bg-gray-900/70 border border-yellow-200 dark:border-yellow-700 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-yellow-400 dark:hover:border-yellow-400 animate-fade-in delay-100">
          <img className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-125" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" />
          <span className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">Python</span>
        </div>
        {/* Java */}
        <div className="group bg-white/80 dark:bg-gray-900/70 border border-orange-200 dark:border-orange-700 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-orange-400 dark:hover:border-orange-400 animate-fade-in delay-200">
          <img className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-125" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java" />
          <span className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">Java</span>
        </div>
        {/* JavaScript */}
        <div className="group bg-white/80 dark:bg-gray-900/70 border border-yellow-200 dark:border-yellow-700 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-yellow-400 dark:hover:border-yellow-400 animate-fade-in delay-300">
          <img className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-125" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript" />
          <span className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">JavaScript</span>
        </div>
        {/* HTML */}
        <div className="group bg-white/80 dark:bg-gray-900/70 border border-orange-200 dark:border-orange-700 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-orange-400 dark:hover:border-orange-400 animate-fade-in delay-400">
          <img className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-125" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg" alt="HTML" />
          <span className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">HTML</span>
        </div>
        {/* CSS */}
        <div className="group bg-white/80 dark:bg-gray-900/70 border border-blue-200 dark:border-blue-700 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-400 animate-fade-in delay-500">
          <img className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-125" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original-wordmark.svg" alt="CSS" />
          <span className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">CSS</span>
        </div>
        {/* React */}
        <div className="group bg-white/80 dark:bg-gray-900/70 border border-cyan-200 dark:border-cyan-700 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-cyan-400 dark:hover:border-cyan-400 animate-fade-in delay-600">
          <img className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-125" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" />
          <span className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">React</span>
        </div>
        {/* Tailwind CSS */}
        <div className="group bg-white/80 dark:bg-gray-900/70 border border-teal-200 dark:border-teal-700 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-teal-400 dark:hover:border-teal-400 animate-fade-in delay-700">
          <img className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-125" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" />
          <span className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">Tailwind CSS</span>
        </div>
        {/* Git */}
        <div className="group bg-white/80 dark:bg-gray-900/70 border border-orange-200 dark:border-orange-700 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-orange-400 dark:hover:border-orange-400 animate-fade-in delay-800">
          <img className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-125" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" alt="Git" />
          <span className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">Git</span>
        </div>
        {/* Github */}
        <div className="group bg-white/80 dark:bg-gray-900/70 border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-gray-400 dark:hover:border-gray-400 animate-fade-in delay-900">
          <img className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-125" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="Github" />
          <span className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">Github</span>
        </div>
        {/* VS Code */}
        <div className="group bg-white/80 dark:bg-gray-900/70 border border-blue-200 dark:border-blue-700 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-400 animate-fade-in delay-1000">
          <img className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-125" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" alt="VS Code" />
          <span className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">VS Code</span>
        </div>
        {/* Figma */}
        <div className="group bg-white/80 dark:bg-gray-900/70 border border-pink-200 dark:border-pink-700 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-pink-400 dark:hover:border-pink-400 animate-fade-in delay-1100">
          <img className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-125" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" alt="Figma" />
          <span className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">Figma</span>
        </div>
        {/* Firebase */}
        <div className="group bg-white/80 dark:bg-gray-900/70 border border-yellow-200 dark:border-yellow-700 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-yellow-400 dark:hover:border-yellow-400 animate-fade-in delay-1200">
          <img className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-125" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" alt="Firebase" />
          <span className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">Firebase</span>
        </div>
        {/* MySQL */}
        <div className="group bg-white/80 dark:bg-gray-900/70 border border-blue-200 dark:border-blue-700 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-400 animate-fade-in delay-1300">
          <img className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-125" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" alt="MySQL" />
          <span className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">MySQL</span>
        </div>
        {/* Node.js */}
        <div className="group bg-white/80 dark:bg-gray-900/70 border border-green-200 dark:border-green-700 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-green-400 dark:hover:border-green-400 animate-fade-in delay-1400">
          <img className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-125" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" alt="Node.js" />
          <span className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">Node.js</span>
        </div>
        {/* MongoDB */}
        <div className="group bg-white/80 dark:bg-gray-900/70 border border-green-200 dark:border-green-700 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-green-400 dark:hover:border-green-400 animate-fade-in delay-1500">
          <img className="w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-125" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
          <span className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">MongoDB</span>
        </div>
      </div>
    </section>
  );
};

export default Skills;
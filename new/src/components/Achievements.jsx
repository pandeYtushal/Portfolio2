

const Achievements = () => {
  return (
     <section id="achievements" class="relative min-h-screen py-16 px-6 bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200
      dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 flex flex-col items-center justify-center overflow-hidden">
 
  <div class="flex items-center mb-8 w-full max-w-5xl mx-auto">
    <div class="flex-grow border-t border-blue-300 dark:border-blue-800"></div>
    <span class="mx-4 text-3xl text-blue-600 dark:text-blue-400 animate-bounce">
      <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 17l-5 3 1.9-5.6L4 10.5l5.7-.4L12 5l2.3 5.1 5.7.4-4.9 3.9L17 20z"/>
      </svg>
    </span>
    <div class="flex-grow border-t border-blue-300 dark:border-blue-800"></div>
  </div>
  <h2 class="text-4xl font-extrabold text-center mb-8 text-gray-900 dark:text-white tracking-tight drop-shadow-lg">Achievements</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-5xl">
  

    <div class="bg-white/70 dark:bg-gray-900/60 border border-blue-200 dark:border-blue-800 rounded-2xl shadow-xl p-8 flex flex-col items-center backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-400 animate-fade-in">
      <div class="bg-blue-100 dark:bg-blue-900 rounded-full p-4 mb-5 shadow-lg animate-bounce">
        <svg class="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 17l-5 3 1.9-5.6L4 10.5l5.7-.4L12 5l2.3 5.1 5.7.4-4.9 3.9L17 20z"/>
        </svg>
      </div>
      <h3 class="text-xl font-bold mb-2 text-gray-800 dark:text-white text-center">Qualifed for PMIT 2019</h3>
      <p class="text-gray-600 dark:text-gray-300 text-center">Qualified for Quarter Finals for PMIT in 2019, Kolkata</p>
    </div>
   

    <div class="bg-white/70 dark:bg-gray-900/60 border border-yellow-200 dark:border-yellow-800 rounded-2xl shadow-xl p-8 flex flex-col items-center backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-yellow-400 dark:hover:border-yellow-400 animate-fade-in delay-100">
      <div class="bg-yellow-100 dark:bg-yellow-900 rounded-full p-4 mb-5 shadow-lg animate-bounce">
        <svg class="w-10 h-10 text-yellow-500 dark:text-yellow-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <h3 class="text-xl font-bold mb-2 text-gray-800 dark:text-white text-center">100+ LeetCode Problems</h3>
      <p class="text-gray-600 dark:text-gray-300 text-center">Solved 100+ coding problems on LeetCode, improving DSA and problem-solving skills.</p>
    </div>
 
    <div class="bg-white/70 dark:bg-gray-900/60 border border-green-200 dark:border-green-800 rounded-2xl shadow-xl p-8 flex flex-col items-center backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-green-400 dark:hover:border-green-400 animate-fade-in delay-200">
      <div class="bg-green-100 dark:bg-green-900 rounded-full p-4 mb-5 shadow-lg animate-bounce">
        <svg class="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <h3 class="text-xl font-bold mb-2 text-gray-800 dark:text-white text-center">Open Source Contributor</h3>
      <p class="text-gray-600 dark:text-gray-300 text-center">Contributed to open source projects on GitHub, collaborating with global developers.</p>
    </div>
  </div>
</section>
  );
};

export default Achievements;
import { LiaCodeBranchSolid } from "react-icons/lia";
import { FaCertificate } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";
import { motion } from "framer-motion";

const Achievements = () => {
  const achievements = [
    {
      title: "Open Source Contributor",
      description: "Contributed to open source projects",
      icon: LiaCodeBranchSolid,
    },
    {
      title: "Certified Developer",
      description: "Metacrafter JSPROOF: Beginner Course",
      icon: FaCertificate,
    },
    {
      title: "Certified Developer",
      description: "Metacrafter ETHPROOF: Beginner EVM Course",
      icon: FaCertificate,
    },
    {
      title: "Gaming Competition",
      description: "Qualified for Quarter Finals – PMIT 2019",
      icon: IoGameController,
    },
  ];

  return (
    <section id="achievements" className="section-container">
      {/* Heading */}
      <div className="mb-10 sm:mb-16 text-center">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-5xl leading-tight mb-3">
          <span className="text-zinc-300">Achievements</span>
        </h2>

        {/* Divider */}
        <div className="relative w-32 sm:w-40 overflow-hidden mx-auto mb-4">
          <motion.div className="w-6 h-1 bg-linear-to-r from-blue-500 to-red-600" animate={{ x: [0, 120] }} 
            transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",}} />
        </div>

        <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
          Milestones and accomplishments in my journey
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;

          return (
            <div
              key={index}
              className="bg-zinc-950 rounded-xl p-5 sm:p-6 border border-zinc-800 hover:border-red-500 to-blue-400 transition-all duration-300 hover:-translate-y-1 text-center shadow-lg group">
              {/* Icon */}
              <div className="flex justify-center mb-3 text-green-500 group-hover:text-purple-400 transition">
                <Icon size={36} className="sm:hidden" />
                <Icon size={44} className="hidden sm:block" />
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                {achievement.title}
              </h3>

              <p className="text-gray-400 text-xs sm:text-sm italic leading-relaxed">
                {achievement.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Achievements;

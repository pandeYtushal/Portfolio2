import { LiaCodeBranchSolid } from "react-icons/lia";
import { FaCertificate } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";
import {motion} from "framer-motion";
const Achievements = () => {
  const achievements = [
    {
      title: "Open Source Contributor",
      description: "Contributed to open source projects",
      icon: LiaCodeBranchSolid,
    },
    {
      title: "Certified Developer",
      description: "Metacrafter JSPROOF:BeginnerCourse",
      icon: FaCertificate,
    },
    {
      title: "Certified Developer",
      description: "Metacrafter ETHPROOF:BeginnerEVMCourse",
      icon: FaCertificate,
    },
    {
      title: "Gaming Competition",
      description: "Qualified for Quarter Finals for PMIT 2019",
      icon:IoGameController,
    }

  ];

  return (
    <section id="achievements"className="section-container bg-zinc-950">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-zinc-300">Achievements</span>
        </h2>

        {/* Divider */}
        <div className="relative w-40 overflow-hidden mx-auto">
  <motion.div
    className="w-6 h-1 bg-gradient-to-r from-blue-500 to-purple-600"
    animate={{ x: [0, 120] }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "linear",
    }}
  />
</div>
<p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Milestones and accomplishments in my journey
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;

          return (
            <div
              key={index}
              className="bg-zinc-950 backdrop-blur-sm rounded-xl p-6 border hover:border-purple-500/50 transition-all duration-300 hover:scale-105 group text-center shadow-xl">
              {/* Icon */}
              <div className="flex justify-center mb-4 text-purple-500 group-hover:text-purple-400 transition-colors">
                <Icon size={44} />
              </div>

              <h3 className="text-xl font-bold mb-2 text-white group-hover:gradient-text transition-all">
                {achievement.title}
              </h3>

              <p className="text-gray font-400 italic text-sm md:text-base">
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

import { LiaCodeBranchSolid } from "react-icons/lia";
import { FaCertificate } from "react-icons/fa";

const Achievements = () => {
  const achievements = [
    {
      title: "Open Source Contributor",
      description: "Contributed to 20+ open source projects",
      icon: LiaCodeBranchSolid,
    },
    {
      title: "Certified Developer",
      description: "AWS, Google Cloud, and Azure certified",
      icon: FaCertificate,
    },
  ];

  return (
    <section
      id="achievements"
      className="section-container bg-zinc-950/80 backdrop-blur-sm"
    >
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Achievements</span>
        </h2>

        {/* Divider */}
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>

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
              className="bg-zinc-900/80 rounded-xl p-6 border border-zinc-800 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 group text-center shadow-xl"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4 text-purple-500 group-hover:text-purple-400 transition-colors">
                <Icon size={44} />
              </div>

              <h3 className="text-xl font-bold mb-2 text-white group-hover:gradient-text transition-all">
                {achievement.title}
              </h3>

              <p className="text-gray-400 text-sm">
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

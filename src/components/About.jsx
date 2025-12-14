const About = () => {
  return (
    <section id="about" className="section-container bg-zinc-950/80 backdrop-blur-sm">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">About Me</span>
        </h2>
        <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-purple-600 mx-auto"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="text-lg text-gray-300 leading-relaxed">
            I&apos;m a passionate full-stack developer with a love for creating elegant solutions
            to complex problems. With expertise in modern web technologies, I bring ideas to
            life through clean, efficient code.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            My journey in web development started with a curiosity about how things work on
            the internet. Today, I specialize in building responsive, performant applications
            that provide exceptional user experiences.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            When I&apos;m not coding, you can find me exploring new technologies, contributing to
            open-source projects, or sharing knowledge with the developer community.
          </p>
        </div>

        <div className="relative">
          <div className="bg-linear-to-br from-blue-950/40 to-purple-950/40 rounded-2xl p-8 backdrop-blur-sm border border-zinc-800 shadow-2xl">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">50+</div>
                <div className="text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">3+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">100+</div>
                <div className="text-gray-400">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
                <div className="text-gray-400">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  const socialLinks = [
    { name: 'GitHub', icon: FaGithub, url: 'https://github.com/pandeYtushal' },
    { name: 'LinkedIn', icon: FaLinkedin, url: 'https://linkedin.com/tushalanand-18' },
    { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com/_tushal.pandey' },
    { name: 'Email', icon: FaEnvelope, url: 'mailto:your.tushalanand4@gmail.com' },
  ];

  return (
    <section id="contact" className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Let’s Connect</span>
        </h2>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-zinc-900/80 rounded-xl p-8 border border-zinc-800 shadow-xl">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 px-6 py-3 bg-zinc-800/70 rounded-lg hover:bg-zinc-800 hover:border-purple-500/50 border border-zinc-700 transition-all duration-300 transform hover:scale-105"
                >
                  <IconComponent className="text-xl text-white" />
                  <span className="text-white font-medium">{social.name}</span>
                </a>
              );
            })}
          </div>
       
        </div>
      </div>
    </section>
  );
};

export default Contact;


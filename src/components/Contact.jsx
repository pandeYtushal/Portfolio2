import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const socialLinks = [
    { name: "GitHub", icon: FaGithub, url: "https://github.com/pandeYtushal" },
    { name: "LinkedIn", icon: FaLinkedin, url: "https://www.linkedin.com/in/tushal-anand18" },
    { name: "Instagram", icon: FaInstagram, url: "https://instagram.com/_tushal.pandey" },
    { name: "Email", icon: FaEnvelope, url: "mailto:tushalanand4@gmail.com" },
  ];

  return (
    <section id="contact" className="section-container">
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold">
          <span className="text-zinc-300">Let’s Connect</span>
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group flex items-center gap-3
                px-5 py-2.5
                rounded-full
                bg-zinc-900/80
                border border-zinc-700
                text-zinc-300 text-sm font-medium
                hover:text-white hover:border-zinc-500
                hover:-translate-y-0.5
                transition-all duration-300">
              <Icon className="text-lg text-zinc-400 group-hover:text-white transition" />
              {social.name}
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default Contact;

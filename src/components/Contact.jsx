import React from "react";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-black text-white px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let&apos;s work <span className="text-emerald-500">together</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            I&apos;m always interested in hearing about new projects and opportunities.
            Whether you have a question or just want to say hi, feel free to drop me a line.
          </p>
        </div>

        {/* Social Links */}
        <div className="mt-4 text-center">
          <p className="text-zinc-500 mb-6 font-medium">Connect on Socials</p>
          <div className="flex justify-center gap-6">
            <a href="mailto:tushalanand4@gmail.com"
              className="group flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:bg-emerald-500 group-hover:text-black group-hover:border-emerald-500 transition-all duration-300">
                <Mail className="w-6 h-6" />
              </div>
            </a>
            <a href="https://github.com/pandeYtushal" target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:bg-[#24292e] group-hover:text-white group-hover:border-[#24292e] transition-all duration-300">
                <Github className="w-6 h-6" />
              </div>
            </a>
            <a href="https://www.linkedin.com/in/tushal-anand18" target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                <Linkedin className="w-6 h-6" />
              </div>
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:bg-pink-600 group-hover:text-white group-hover:border-pink-600 transition-all duration-300">
                <Instagram className="w-6 h-6" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

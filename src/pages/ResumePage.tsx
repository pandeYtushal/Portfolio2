import React, { useEffect } from "react";
import { Download, ExternalLink, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const ResumePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pdfUrl = "https://drive.google.com/file/d/1IC8AQ-YlGLaIRvwjntPes1bw7snDX167/view?usp=drive_link";

  return (
    <PageTransition>
      <div className="print:hidden">
        <Navbar />
      </div>
      <div className="min-h-screen bg-app-surface text-app-text-primary pt-24 pb-12 px-4 sm:px-6 md:px-12 flex flex-col">
        <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col gap-8 sm:gap-12">
          
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-app-border pb-6 sm:pb-8 print:hidden">
            <div className="flex flex-col gap-4 sm:gap-6">
              <button 
                onClick={() => navigate(-1)}
                className="self-start flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-app-text-primary hover:text-app-accent transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight mb-2">Curriculum Vitae</h1>
                <p className="font-mono text-xs sm:text-sm text-app-text-secondary font-semibold">Tushal Anand Pandey</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a 
                href={pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 flex-1 sm:flex-none bg-app-surface border border-app-border rounded text-xs sm:text-sm font-semibold hover:bg-app-surface-secondary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View PDF</span>
              </a>
              <a 
                href={pdfUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 flex-1 sm:flex-none bg-app-text-primary text-app-surface rounded text-xs sm:text-sm font-semibold hover:bg-app-text-secondary transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>
            </div>
          </div>

          {/* Resume Content */}
          <div className="bg-app-bg border border-app-border shadow-sm p-5 sm:p-8 md:p-12 flex flex-col gap-8 sm:gap-12 font-sans selection:bg-app-text-primary selection:text-app-bg print:bg-transparent print:border-none print:shadow-none print:p-0">
            
            {/* Header / Contact */}
            <div className="flex flex-col items-center justify-center text-center gap-2 pb-8 border-b border-app-border">
              <h2 className="text-3xl font-serif font-semibold tracking-tight uppercase">Tushal Anand</h2>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-app-text-secondary">
                <a href="mailto:tushalanand4@gmail.com" className="hover:text-app-text-primary">tushalanand4@gmail.com</a>
                <span className="hidden sm:inline">&middot;</span>
                <span>+91 9576344606</span>
                <span className="hidden sm:inline">&middot;</span>
                <a href="https://www.linkedin.com/in/tushal-anand18/" target="_blank" rel="noreferrer" className="hover:text-app-text-primary">LinkedIn</a>
                <span className="hidden sm:inline">&middot;</span>
                <a href="https://github.com/pandeYtushal" target="_blank" rel="noreferrer" className="hover:text-app-text-primary">GitHub</a>
              </div>
            </div>

            {/* Profile Summary */}
            <section className="flex flex-col gap-4">
              <h3 className="font-bold uppercase tracking-widest text-sm border-b border-app-border pb-2">Profile Summary</h3>
              <p className="text-base text-app-text-secondary leading-relaxed">
                Computer Science Engineering graduate specializing in full-stack web development, AI workflow automation, and decentralized technologies. Proven track record of building production-ready applications using React, JavaScript/TypeScript, and Firebase, along with published research in zero-knowledge cryptography. Adept at full-stack application lifecycle management, API integration, and collaborative software engineering.
              </p>
            </section>

            {/* Education */}
            <section className="flex flex-col gap-4">
              <h3 className="font-bold uppercase tracking-widest text-sm border-b border-app-border pb-2">Education</h3>
              <div className="flex flex-col gap-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-semibold text-app-text-primary">B.E. in Computer Science and Engineering</h4>
                  <span className="text-sm font-mono text-app-text-secondary font-semibold">Aug 2022 &ndash; Jun 2026</span>
                </div>
                <p className="text-app-text-secondary text-sm italic">Chandigarh University</p>
              </div>
            </section>

            {/* Experience */}
            <section className="flex flex-col gap-4">
              <h3 className="font-bold uppercase tracking-widest text-sm border-b border-app-border pb-2">Experience</h3>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-semibold text-app-text-primary">Apprenticeship <span className="font-normal text-app-text-secondary mx-1">|</span> Metacrafters</h4>
                  <span className="text-sm font-mono text-app-text-secondary font-semibold">May 2024 &ndash; Jul 2024</span>
                </div>
                <ul className="list-disc pl-5 text-sm text-app-text-secondary space-y-1.5 leading-relaxed">
                  <li>Completed an intensive hands-on apprenticeship focused on modern web development and smart contract engineering fundamentals, including decentralized application design.</li>
                  <li>Applied structured learning to real-world coding exercises, building strong proficiency in Web3 architectures, problem-solving, and web technologies.</li>
                </ul>
              </div>
            </section>

            {/* Skills */}
            <section className="flex flex-col gap-4">
              <h3 className="font-bold uppercase tracking-widest text-sm border-b border-app-border pb-2">Skills</h3>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-1">
                  <span className="font-semibold text-app-text-primary">Languages</span>
                  <span className="sm:col-span-3 text-app-text-secondary">C, C++, JavaScript, TypeScript, HTML5, CSS3</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-1">
                  <span className="font-semibold text-app-text-primary">Frontend</span>
                  <span className="sm:col-span-3 text-app-text-secondary">React.js, React 19, Tailwind CSS, Zustand, Vite</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-1">
                  <span className="font-semibold text-app-text-primary">Backend & Databases</span>
                  <span className="sm:col-span-3 text-app-text-secondary">Firebase, Firestore, REST APIs, Authentication Protocols</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-1">
                  <span className="font-semibold text-app-text-primary">CS Fundamentals</span>
                  <span className="sm:col-span-3 text-app-text-secondary">Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-1">
                  <span className="font-semibold text-app-text-primary">Tools & Platforms</span>
                  <span className="sm:col-span-3 text-app-text-secondary">Git, GitHub, Vercel, VS Code, Figma, CI/CD Basics</span>
                </div>
              </div>
            </section>

            {/* Projects */}
            <section className="flex flex-col gap-4">
              <h3 className="font-bold uppercase tracking-widest text-sm border-b border-app-border pb-2">Projects</h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-semibold text-app-text-primary">Hunter &ndash; Autonomous AI Browser Copilot <span className="font-normal text-app-text-secondary mx-1">|</span> <a href="https://github.com/pandeYtushal" className="hover:underline">GitHub</a></h4>
                    <span className="text-sm font-mono text-app-text-secondary font-semibold">2026</span>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-app-text-secondary space-y-1.5 leading-relaxed">
                    <li>Built an AI-powered browser copilot that automates business workflows from natural language instructions across multiple digital platforms.</li>
                    <li>Developed intelligent requirement analysis, document matching, and automated form-filling features to eliminate manual operational friction.</li>
                    <li>Coordinated planning, execution, and reporting modules while managing multiple parallel workflows.</li>
                  </ul>
                  <p className="text-xs text-app-text-secondary font-medium italic mt-1">Tools: JavaScript, TypeScript, Node.js, Web Automation, AI Agents</p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-semibold text-app-text-primary">Melody &ndash; Music Streaming Platform <span className="font-normal text-app-text-secondary mx-1">|</span> <a href="https://github.com/pandeYtushal" className="hover:underline">GitHub</a></h4>
                    <span className="text-sm font-mono text-app-text-secondary font-semibold">2026</span>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-app-text-secondary space-y-1.5 leading-relaxed">
                    <li>Developed and deployed a consumer-facing web platform supporting secure authentication, third-party API integration, and dynamic audio state management.</li>
                    <li>Independently managed project planning, feature prioritization, cloud deployment, and issue resolution while maintaining high performance.</li>
                  </ul>
                  <p className="text-xs text-app-text-secondary font-medium italic mt-1">Tools: React 19, Tailwind CSS, Firebase, Zustand, Vite</p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-semibold text-app-text-primary">Smart Civic Issue Reporting Platform <span className="font-normal text-app-text-secondary mx-1">|</span> <a href="https://github.com/pandeYtushal" className="hover:underline">GitHub</a></h4>
                    <span className="text-sm font-mono text-app-text-secondary font-semibold">2025</span>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-app-text-secondary space-y-1.5 leading-relaxed">
                    <li>Built a complaint management web application that streamlines municipal issue reporting, tracking, and resolution through structured digital workflows.</li>
                    <li>Implemented Firebase Authentication and Firestore real-time database for secure access and automated status updates.</li>
                  </ul>
                  <p className="text-xs text-app-text-secondary font-medium italic mt-1">Tools: React.js, Tailwind CSS, Firebase, JavaScript</p>
                </div>
              </div>
            </section>

            {/* Achievements & Certifications */}
            <section className="flex flex-col gap-4">
              <h3 className="font-bold uppercase tracking-widest text-sm border-b border-app-border pb-2">Achievements & Certifications</h3>
              <ul className="list-disc pl-5 text-sm text-app-text-secondary space-y-2 leading-relaxed">
                <li><span className="font-semibold text-app-text-primary">Publication:</span> Co-authored "Privacy-Preserving Smart Contracts Using Zero-Knowledge Proofs," accepted for publication in Springer and presented at ICICC-2026.</li>
                <li><span className="font-semibold text-app-text-primary">Certifications:</span> NPTEL Certified in IoT, Cloud IoT, and Edge Machine Learning, demonstrating continuous structured skill development.</li>
                <li><span className="font-semibold text-app-text-primary">Web3 Credentials:</span> Earned JSProof and ETHProof certifications from Metacrafters, building strong core fundamentals in decentralized systems.</li>
                <li><span className="font-semibold text-app-text-primary">Technical Research:</span> Authored comprehensive review papers on Blockchain Voting Systems and Zero-Knowledge Cryptography.</li>
              </ul>
            </section>

          </div>
        </div>
      </div>
      <div className="print:hidden">
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ResumePage;

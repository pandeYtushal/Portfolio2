import React, { useEffect } from "react";
import { Download, ExternalLink, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSEO, BASE_URL } from "../hooks/useSEO";

export default function ResumePage() {
  const navigate = useNavigate();

  useSEO({
    title: "Curriculum Vitae — Tushal Anand",
    description:
      "Curriculum Vitae of Tushal Anand — Computer Science Engineer specialising in full-stack web development, AI workflow automation, and decentralized technologies.",
    canonical: `${BASE_URL}/resume`,
    ogImage: `${BASE_URL}/avtar.webp`,
    ogType: "profile",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pdfUrl = "https://drive.google.com/file/d/1IC8AQ-YlGLaIRvwjntPes1bw7snDX167/view?usp=drive_link";

  return (
    <>
      <div className="print:hidden">
        <Navbar />
      </div>
      <main id="main-content" tabIndex={-1} className="resume-page min-h-screen bg-app-surface text-app-text-primary pt-24 pb-12 px-4 sm:px-6 md:px-12 flex flex-col">
        <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col gap-8 sm:gap-12">
          
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-app-border pb-6 sm:pb-8 print:hidden">
            <div className="flex flex-col gap-4 sm:gap-6">
              <button 
                onClick={() => navigate(-1)}
                className="action-link action-link-back flex items-center gap-2"
                aria-label="Back to previous page"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight mb-2">Curriculum Vitae</h1>
                <p className="font-mono text-xs sm:text-sm text-app-text-secondary font-semibold">Tushal Anand</p>
              </div>
            </div>

            <div className="resume-actions flex items-center gap-3">
              <a 
                href={pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="action-link flex items-center gap-2"
                aria-label="View original PDF in Google Drive"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View PDF</span>
              </a>
              <a 
                href={pdfUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="action-link action-link-emphasis flex items-center gap-2"
                aria-label="Download resume PDF"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>
            </div>
          </div>

          {/* Resume Content */}
          <div className="bg-app-bg border border-app-border shadow-sm p-5 sm:p-8 md:p-12 flex flex-col gap-8 sm:gap-12 font-sans selection:bg-app-text-primary selection:text-app-bg print:bg-transparent print:border-none print:shadow-none print:p-0">
            
            {/* Header / Contact */}
            <header className="flex flex-col items-center justify-center text-center gap-2 pb-8 border-b border-app-border">
              <h2 className="text-3xl font-serif font-semibold tracking-tight uppercase">Tushal Anand</h2>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-app-text-secondary">
                <a href="mailto:tushalanand4@gmail.com" className="hover:text-app-text-primary">tushalanand4@gmail.com</a>
                <span className="hidden sm:inline" aria-hidden="true">&middot;</span>
                <span>+91 9576344606</span>
                <span className="hidden sm:inline" aria-hidden="true">&middot;</span>
                <a href="https://www.linkedin.com/in/tushal-anand18/" target="_blank" rel="noreferrer" className="hover:text-app-text-primary">LinkedIn</a>
                <span className="hidden sm:inline" aria-hidden="true">&middot;</span>
                <a href="https://github.com/pandeYtushal" target="_blank" rel="noreferrer" className="hover:text-app-text-primary">GitHub</a>
              </div>
            </header>

            {/* Profile Summary */}
            <section className="flex flex-col gap-4">
              <h3 className="font-bold uppercase tracking-widest text-sm border-b border-app-border pb-2 text-app-text-primary">Profile Summary</h3>
              <p className="text-base text-app-text-secondary leading-relaxed">
                Computer Science Engineering graduate specializing in full-stack web development, AI workflow automation, and decentralized technologies. Proven track record of building production-ready applications using React, JavaScript/TypeScript, and Firebase, along with published research in zero-knowledge cryptography. Adept at full-stack application lifecycle management, API integration, and collaborative software engineering.
              </p>
            </section>

            {/* Technical Skills */}
            <section className="flex flex-col gap-4">
              <h3 className="font-bold uppercase tracking-widest text-sm border-b border-app-border pb-2 text-app-text-primary">Technical Skills</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-app-text-secondary">
                <div>
                  <strong className="text-app-text-primary block mb-1">Languages:</strong>
                  <span>C, C++, JavaScript (ES6+), TypeScript, Python, SQL</span>
                </div>
                <div>
                  <strong className="text-app-text-primary block mb-1">Frontend &amp; UI:</strong>
                  <span>React.js, Next.js, Tailwind CSS, Framer Motion, HTML5/CSS3</span>
                </div>
                <div>
                  <strong className="text-app-text-primary block mb-1">Backend &amp; Cloud:</strong>
                  <span>Node.js, Firebase (Auth, Firestore, Storage), REST APIs, Supabase</span>
                </div>
                <div>
                  <strong className="text-app-text-primary block mb-1">Tools &amp; Systems:</strong>
                  <span>Git, GitHub, Postman, Linux</span>
                </div>
              </div>
            </section>

            {/* Work Experience */}
            <section className="flex flex-col gap-6">
              <h3 className="font-bold uppercase tracking-widest text-sm border-b border-app-border pb-2 text-app-text-primary">Work Experience</h3>
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="font-semibold text-base text-app-text-primary">Freelance Software Engineer</h4>
                    <p className="text-sm text-app-text-secondary">Self-Employed &middot; Remote</p>
                  </div>
                  <span className="text-sm font-mono text-app-text-secondary font-semibold">Jan 2026 &ndash; Present</span>
                </div>
                <ul className="list-disc pl-5 text-sm text-app-text-secondary space-y-1.5 leading-relaxed">
                  <li>Architected and deployed responsive, high-performance web applications and landing pages for clients.</li>
                  <li>Integrated headless APIs, state stores, and real-time backend synchronization using React, TypeScript, and modern styling libraries.</li>
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="font-semibold text-base text-app-text-primary">Web3 Developer Intern</h4>
                    <p className="text-sm text-app-text-secondary">Metacrafters &middot; Remote</p>
                  </div>
                  <span className="text-sm font-mono text-app-text-secondary font-semibold">Jun 2024 &ndash; Aug 2024</span>
                </div>
                <ul className="list-disc pl-5 text-sm text-app-text-secondary space-y-1.5 leading-relaxed">
                  <li>Built and deployed smart contracts on Ethereum testnets using Solidity, Hardhat, and Remix IDE.</li>
                  <li>Developed decentralized frontends using React and Ethers.js to interact with smart contract states.</li>
                </ul>
              </div>
            </section>

            {/* Projects */}
            <section className="flex flex-col gap-6">
              <h3 className="font-bold uppercase tracking-widest text-sm border-b border-app-border pb-2 text-app-text-primary">Featured Projects</h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-semibold text-app-text-primary">
                      Pulse &ndash; Quiet System Layer for Windows
                      <span className="font-normal text-app-text-secondary mx-1.5">|</span>
                      <a href="https://pulse-website-nine.vercel.app/" target="_blank" rel="noreferrer" className="hover:underline text-app-accent font-medium">Live Site</a>
                      <span className="font-normal text-app-text-secondary mx-1.5">|</span>
                      <a href="https://github.com/pandeYtushal/Pulse" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                    </h4>
                    <span className="text-sm font-mono text-app-text-secondary font-semibold">2026</span>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-app-text-secondary space-y-1.5 leading-relaxed">
                    <li>Developed a quiet desktop system layer in Tauri 2, React, and Rust reading Windows system state, media controls, and notifications.</li>
                    <li>Integrated low-level Windows APIs with sub-millisecond IPC communication across system services.</li>
                  </ul>
                  <p className="text-xs text-app-text-secondary font-medium italic mt-1">Tools: Tauri 2, React, TypeScript, Rust, Windows APIs</p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-semibold text-app-text-primary">
                      Hunter &ndash; Autonomous Browser Copilot
                      <span className="font-normal text-app-text-secondary mx-1.5">|</span>
                      <a href="https://huntterr.vercel.app/" target="_blank" rel="noreferrer" className="hover:underline text-app-accent font-medium">Live Demo</a>
                      <span className="font-normal text-app-text-secondary mx-1.5">|</span>
                      <a href="https://github.com/pandeYtushal/Hunter" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                    </h4>
                    <span className="text-sm font-mono text-app-text-secondary font-semibold">2026</span>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-app-text-secondary space-y-1.5 leading-relaxed">
                    <li>Built an autonomous AI browser agent translating natural language goals into self-healing DOM actions.</li>
                    <li>Developed coordinate-based visual matching resilient against layout shifts and class renaming.</li>
                  </ul>
                  <p className="text-xs text-app-text-secondary font-medium italic mt-1">Tools: JavaScript, Manifest V3, Chrome Extension API, Vision Models</p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-semibold text-app-text-primary">
                      Astronomical &ndash; Indian Mathematical Astronomy Archive
                      <span className="font-normal text-app-text-secondary mx-1.5">|</span>
                      <a href="https://astronomical-chi.vercel.app/" target="_blank" rel="noreferrer" className="hover:underline text-app-accent font-medium">Live Site</a>
                      <span className="font-normal text-app-text-secondary mx-1.5">|</span>
                      <a href="https://github.com/pandeYtushal/Astronomical" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                    </h4>
                    <span className="text-sm font-mono text-app-text-secondary font-semibold">2026</span>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-app-text-secondary space-y-1.5 leading-relaxed">
                    <li>Built a Next.js 15 multimedia web archive documenting 1,500 years of astronomy with d3-geo observatory mapping and scroll-velocity physics.</li>
                  </ul>
                  <p className="text-xs text-app-text-secondary font-medium italic mt-1">Tools: Next.js 15, React 19, Framer Motion, d3-geo</p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-semibold text-app-text-primary">
                      Smart Civic Platform &ndash; Municipal Complaint Management
                      <span className="font-normal text-app-text-secondary mx-1.5">|</span>
                      <a href="https://urbanreport.vercel.app/" target="_blank" rel="noreferrer" className="hover:underline text-app-accent font-medium">Live Demo</a>
                      <span className="font-normal text-app-text-secondary mx-1.5">|</span>
                      <a href="https://github.com/pandeYtushal/Urban-Utility-Report" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                    </h4>
                    <span className="text-sm font-mono text-app-text-secondary font-semibold">2026</span>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-app-text-secondary space-y-1.5 leading-relaxed">
                    <li>Developed citizen utility reporting with HTML5 Canvas client-side compression reducing image payload by 70%.</li>
                    <li>Implemented Firebase Auth and Firestore real-time subscriptions for ticket tracking.</li>
                  </ul>
                  <p className="text-xs text-app-text-secondary font-medium italic mt-1">Tools: React.js, Tailwind CSS, Firebase, Canvas API</p>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="flex flex-col gap-4">
              <h3 className="font-bold uppercase tracking-widest text-sm border-b border-app-border pb-2 text-app-text-primary">Education</h3>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h4 className="font-semibold text-app-text-primary">Bachelor of Technology in Computer Science &amp; Engineering</h4>
                  <p className="text-sm text-app-text-secondary">Lovely Professional University</p>
                </div>
                <span className="text-sm font-mono text-app-text-secondary font-semibold">Graduated 2026</span>
              </div>
            </section>

            {/* Achievements & Certifications */}
            <section className="flex flex-col gap-4">
              <h3 className="font-bold uppercase tracking-widest text-sm border-b border-app-border pb-2 text-app-text-primary">Achievements &amp; Certifications</h3>
              <ul className="list-disc pl-5 text-sm text-app-text-secondary space-y-2 leading-relaxed">
                <li><strong className="font-semibold text-app-text-primary">Publication:</strong> Co-authored "Privacy-Preserving Smart Contracts Using Zero-Knowledge Proofs," accepted for publication in Springer and presented at ICICC-2026.</li>
                <li><strong className="font-semibold text-app-text-primary">Certifications:</strong> NPTEL Certified in IoT, Cloud IoT, and Edge Machine Learning.</li>
                <li><strong className="font-semibold text-app-text-primary">Web3 Credentials:</strong> Earned JSProof and ETHProof certifications from Metacrafters.</li>
              </ul>
            </section>

          </div>
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}

import { useSEO, BASE_URL } from "../hooks/useSEO";

const pdfUrl = "https://drive.google.com/file/d/1IC8AQ-YlGLaIRvwjntPes1bw7snDX167/preview";

export default function ResumePage() {
  useSEO({
    title: "Resume — Tushal Anand",
    description: "Resume of Tushal Anand, Software Engineer.",
    canonical: `${BASE_URL}/resume`,
    ogImage: `${BASE_URL}/avtar.webp`,
    ogType: "profile",
  });

  return <main id="main-content" className="resume-viewer"><iframe src={pdfUrl} title="Tushal Anand resume" allow="autoplay" allowFullScreen /></main>;
}

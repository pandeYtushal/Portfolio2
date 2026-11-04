/**
 * jsonld.ts
 * Typed JSON-LD structured data builders for the portfolio.
 * Only accurate, verifiable information is included.
 */

const BASE_URL = "https://tushal.site";

/** Person schema — represents Tushal Anand's professional identity */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tushal Anand",
    alternateName: "Tushal Pandey",
    url: BASE_URL,
    image: `${BASE_URL}/avtar.png`,
    jobTitle: "Software Engineer",
    description:
      "Computer Science Engineer based in India specialising in React, TypeScript, browser automation, and AI agent systems.",
    email: "tushalanand4@gmail.com",
    sameAs: [
      "https://github.com/pandeYtushal",
      "https://www.linkedin.com/in/tushal-anand18/",
      "https://medium.com/@tushalpandey",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Chandigarh University",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mohali",
        addressRegion: "Punjab",
        addressCountry: "IN",
      },
    },
    knowsAbout: [
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
      "Firebase",
      "AI Agents",
      "Browser Automation",
      "Rust",
      "Tauri",
    ],
  };
}

/** WebSite schema — represents the portfolio website */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tushal Anand — Portfolio",
    url: BASE_URL,
    description:
      "Personal portfolio of Tushal Anand — Computer Science Engineer and developer of Pulse, Hunter, Astronomical, and other production systems.",
    author: {
      "@type": "Person",
      name: "Tushal Anand",
      url: BASE_URL,
    },
    inLanguage: "en-IN",
  };
}

/** SoftwareApplication schema — for individual project pages */
export function softwareApplicationSchema(project: {
  title: string;
  description: string;
  url: string;
  image: string;
  tech: string[];
  status: string;
  link: string;
  source: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: project.url,
    image: `${BASE_URL}${project.image}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      name: "Tushal Anand",
      url: BASE_URL,
    },
    programmingLanguage: project.tech,
    ...(project.link ? { installUrl: project.link } : {}),
    ...(project.source ? { codeRepository: project.source } : {}),
  };
}

/** BreadcrumbList schema for project detail pages */
export function breadcrumbSchema(projectTitle: string, projectSlug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: `${BASE_URL}/#projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: projectTitle,
        item: `${BASE_URL}/project/${projectSlug}`,
      },
    ],
  };
}


import {
  aiProjects,
  uxUiProjects,
  type AiProject,
  type UxUiProject,
  type SubProjectPart,
} from "@/lib/content";

export interface BookProject {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  tools: string[];
  link: string;
  screenshot: string;
  status: string;
  highlights: string[];
  hasModal?: boolean;
  subProjects?: SubProjectPart[];
}

export const BOOK_PROJECTS: BookProject[] = [
  ...aiProjects.map((p, idx) => ({
    id: p.id,
    number: `0${idx + 1}`,
    title: p.title,
    tagline: p.tagline,
    category: p.category,
    description: p.description,
    tools: p.tools,
    link: p.link,
    screenshot: p.screenshot,
    status: p.status || "Live Project",
    highlights: p.highlights,
  })),
  ...uxUiProjects.map((p, idx) => ({
    id: `ux-${p.number}`,
    number: `0${aiProjects.length + idx + 1}`,
    title: p.title,
    tagline: p.subtitle,
    category: p.category,
    description: p.subtitle,
    tools: p.hasModal ? ["Miro", "Stitch"] : ["Figma"],
    link: p.link || "#",
    screenshot: p.coverImage,
    status: p.title.includes("Equifiz")
      ? "Shipped in Production"
      : p.hasModal
      ? "Research & Prototype"
      : "Design System & Figma",
    highlights: p.hasModal
      ? [
          "Complete gaming UX research & player personas on Miro",
          "Interactive gaming UI prototype built with Stitch with Google",
          "Comprehensive design tokens & micro-interactions",
        ]
      : p.title.includes("Palmist")
      ? [
          "Complete redesign from AI aesthetic to human-crafted touch",
          "Design system architecture documented inside Figma",
          "Refined typography scales & conversion-focused user flows",
        ]
      : [
          "Fintech production application for equity & asset workflows",
          "Shipped in live customer production environment",
          "Complex data density tables and financial interaction models",
        ],
    hasModal: p.hasModal,
    subProjects: p.subProjects,
  })),
];


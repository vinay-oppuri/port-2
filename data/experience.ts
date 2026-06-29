import { createElement } from "react";
import type { IconType } from "react-icons";
import {
  SiFirebase,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const icon = (Icon: IconType, className: string) => createElement(Icon, { className });

const technology = (name: string, Icon: IconType, className: string) => ({
  name,
  logo: icon(Icon, className),
});

export const experiences = [
  {
    companyName: "IIIT Raichur Website",
    logo: "/experience/collegelogo.png",
    status: "working",
    role: "Full Stack Developer",
    timeline: "August 2025 - Present",
    location: "India (Remote)",
    technologies: [
      technology("Next.js", SiNextdotjs, "h-4 w-4 text-foreground"),
      technology("Tailwind CSS", SiTailwindcss, "h-5 w-5 text-[#38BDF8]"),
      technology("React", SiReact, "h-4 w-4 text-[#61DAFB]"),
      technology("TypeScript", SiTypescript, "h-4 w-4 text-[#3178C6]"),
      technology("Node.js", SiNodedotjs, "h-5 w-5 text-[#3C873A]"),
      technology("Firebase", SiFirebase, "h-5 w-5 text-[#FF6B35]"),
    ],
    responsibilities: [
      "Maintain and enhance multiple official web platforms under the iiitr.ac.in domain, contributing to their modernization with a scalable Next.js App Router architecture",
      "Developed the Training & Placement Cell Portal (tnp-iiitr.vercel.app) using Next.js and Tailwind CSS",
      "Architected reusable and scalable components, improving development efficiency and maintainability across projects."
    ],
  },
];

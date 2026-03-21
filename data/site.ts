import { createElement } from "react";
import { Code2, Mail, MapPin, type LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiBun,
  SiExpress,
  SiGithub,
  SiGooglegemini,
  SiLinkedin,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiShadcnui,
  SiTailwindcss,
  SiTrpc,
  SiTypescript,
  SiX,
} from "react-icons/si";

type AppIcon = LucideIcon | IconType;

const icon = (Icon: AppIcon, className: string) => createElement(Icon, { className });

const skill = (name: string, href: string, Icon: AppIcon, className: string) => ({
  name,
  href,
  component: icon(Icon, className),
});

export const heroConfig = {
  name: "Vinay",
  fullName: "Oppuri Vinay Reddy",
  title: ["A Full Stack Web Developer", "AI Engineer"],
  info: [
    { name: "Full Stack Developer", logo: icon(Code2, "w-4 h-4") },
    { name: "Hyderabad, India", logo: icon(MapPin, "w-4 h-4") },
    { name: "oppurivinay25@gmail.com", logo: icon(Mail, "w-4 h-4") },
  ],
  mainSkills: [
    skill("Bun", "https://bun.sh/", SiBun, "h-4 w-4 text-foreground"),
    skill("Next.js", "https://nextjs.org/", SiNextdotjs, "h-4 w-4 text-foreground"),
    skill("Typescript", "https://www.typescriptlang.org/", SiTypescript, "h-4 w-4 text-[#3178C6]"),
    skill("Tailwind CSS", "https://tailwindcss.com/", SiTailwindcss, "h-4 w-4 text-[#38BDF8]"),
    skill("PostgreSQL", "https://www.postgresql.org/", SiPostgresql, "h-4 w-4 text-[#336791]"),
    skill("tRPC", "https://trpc.io/", SiTrpc, "h-4 w-4 text-[#0D9488]"),
    skill("Better Auth", "https://better-auth.com/", SiShadcnui, "h-4 w-4 text-[#9333EA]"),
  ],
  skills: {
    frontend: [
      skill("Next.js", "https://nextjs.org/", SiNextdotjs, "h-4 w-4 text-foreground"),
      skill("React", "https://react.dev/", SiReact, "h-4 w-4 text-[#61DAFB]"),
      skill("Typescript", "https://www.typescriptlang.org/", SiTypescript, "h-4 w-4 text-[#3178C6]"),
      skill("Tailwind CSS", "https://tailwindcss.com/", SiTailwindcss, "h-4 w-4 text-[#38BDF8]"),
    ],
    backend: [
      skill("Node.js", "https://nodejs.org/", SiNodedotjs, "h-4 w-4 text-[#339933]"),
      skill("PostgreSQL", "https://www.postgresql.org/", SiPostgresql, "h-4 w-4 text-[#336791]"),
      skill("MongoDB", "https://www.mongodb.com/", SiMongodb, "h-4 w-4 text-[#47A248]"),
      skill("Express.js", "https://expressjs.com/", SiExpress, "h-4 w-4 text-foreground"),
      skill("tRPC", "https://trpc.io/", SiTrpc, "h-4 w-4 text-[#0D9488]"),
      skill("Better Auth", "https://better-auth.com/", SiShadcnui, "h-4 w-4 text-[#9333EA]"),
    ],
    ai: [
      skill("Gemini", "https://deepmind.google/technologies/gemini/", SiGooglegemini, "h-4 w-4 text-[#8E75B2]"),
    ],
  },
  description: {
    about:
      "Full Stack & AI Engineer building scalable web apps and intelligent systems with Next.js, React, Node.js, TypeScript, PostgreSQL, and MongoDB.",
  },
};

export const socialLinks = [
  {
    name: "X",
    href: "https://x.com/vinayoppuri",
    icon: icon(SiX, "text-foreground"),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/vinay-oppuri/",
    icon: icon(SiLinkedin, "text-[#0A66C2]"),
  },
  {
    name: "Github",
    href: "https://github.com/vinay-oppuri",
    icon: icon(SiGithub, "text-foreground"),
  },
];

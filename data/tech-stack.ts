import { createElement } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiExpress,
  SiTrpc,
  SiShadcnui,
  SiPython,
  SiDocker,
  SiGit,
  SiLinux,
  SiJavascript,
  SiFastapi,
  SiRedis,
  SiAmazonwebservices,
  SiAmazons3,
  SiAmazonec2,
} from "react-icons/si";
import {
  Database,
  Layers,
  ServerCog,
  Globe,
  Droplet,
  Zap,
  Brain,
  Network,
  GitMerge,
} from "lucide-react";

export type SkillItem = { name: string; icon: React.ReactNode };
export type SkillGroupData = { label: string; icon: React.ReactNode; skills: SkillItem[] };

const ic = (Icon: React.ElementType, cls: string) =>
  createElement(Icon, { className: cls });

// ─── Full Stack ────────────────────────────────────────────────────────────────
export const fullStackSections: SkillGroupData[] = [
  {
    label: "Frontend",
    icon: ic(Globe, "w-4 h-4 sm:w-5 sm:h-5"),
    skills: [
      { name: "Next.js",      icon: ic(SiNextdotjs,   "w-5 h-5 md:w-6 md:h-6 text-foreground") },
      { name: "React",        icon: ic(SiReact,       "w-5 h-5 md:w-6 md:h-6 text-[#61DAFB]") },
      { name: "TypeScript",   icon: ic(SiTypescript,  "w-5 h-5 md:w-6 md:h-6 text-[#3178C6]") },
      { name: "Tailwind CSS", icon: ic(SiTailwindcss, "w-5 h-5 md:w-6 md:h-6 text-[#38BDF8]") },
      { name: "JavaScript",   icon: ic(SiJavascript,  "w-5 h-5 md:w-6 md:h-6 text-[#F7DF1E]") },
    ],
  },
  {
    label: "Backend",
    icon: ic(ServerCog, "w-4 h-4 sm:w-5 sm:h-5"),
    skills: [
      { name: "Node.js",     icon: ic(SiNodedotjs, "w-5 h-5 md:w-6 md:h-6 text-[#339933]") },
      { name: "Express.js",  icon: ic(SiExpress,   "w-5 h-5 md:w-6 md:h-6 text-foreground") },
      { name: "FastAPI",     icon: ic(SiFastapi,   "w-5 h-5 md:w-6 md:h-6 text-[#009688]") },
      { name: "tRPC",        icon: ic(SiTrpc,      "w-5 h-5 md:w-6 md:h-6 text-[#0D9488]") },
      { name: "Better Auth", icon: ic(SiShadcnui,  "w-5 h-5 md:w-6 md:h-6 text-[#9333EA]") },
      { name: "Python",      icon: ic(SiPython,    "w-5 h-5 md:w-6 md:h-6 text-[#3776AB]") },
      { name: "DrizzleORM",  icon: ic(Droplet,     "w-5 h-5 md:w-6 md:h-6 text-[#C5F74F]") },
      { name: "Inngest",     icon: ic(Zap,         "w-5 h-5 md:w-6 md:h-6 text-[#7C3AED]") },
    ],
  },
  {
    label: "Database",
    icon: ic(Database, "w-4 h-4 sm:w-5 sm:h-5"),
    skills: [
      { name: "PostgreSQL", icon: ic(SiPostgresql, "w-5 h-5 md:w-6 md:h-6 text-[#336791]") },
      { name: "MongoDB",    icon: ic(SiMongodb,    "w-5 h-5 md:w-6 md:h-6 text-[#47A248]") },
      { name: "Redis",      icon: ic(SiRedis,      "w-5 h-5 md:w-6 md:h-6 text-[#DC382D]") },
      { name: "NeonDB",     icon: ic(Database,     "w-5 h-5 md:w-6 md:h-6 text-[#00E599]") },
    ],
  },
  {
    label: "DevOps & Tools",
    icon: ic(Layers, "w-4 h-4 sm:w-5 sm:h-5"),
    skills: [
      { name: "Git",        icon: ic(SiGit,        "w-5 h-5 md:w-6 md:h-6 text-[#F05032]") },
      { name: "Docker",     icon: ic(SiDocker,     "w-5 h-5 md:w-6 md:h-6 text-[#2496ED]") },
      { name: "Linux",      icon: ic(SiLinux,      "w-5 h-5 md:w-6 md:h-6 text-foreground") },
      { name: "Turborepo",  icon: ic(Zap,          "w-5 h-5 md:w-6 md:h-6 text-[#EF4444]") },
      { name: "CI/CD",      icon: ic(GitMerge,     "w-5 h-5 md:w-6 md:h-6 text-[#22C55E]") },
    ],
  },
  {
    label: "AI & LLM",
    icon: ic(Brain, "w-4 h-4 sm:w-5 sm:h-5"),
    skills: [
      { name: "LangChain",  icon: ic(Brain,   "w-5 h-5 md:w-6 md:h-6 text-[#1C7C54]") },
      { name: "LangGraph",  icon: ic(Network, "w-5 h-5 md:w-6 md:h-6 text-[#F59E0B]") },
    ],
  },
  {
    label: "Cloud Services",
    icon: ic(SiAmazonwebservices, "w-4 h-4 sm:w-5 sm:h-5 text-[#FF9900]"),
    skills: [
      { name: "AWS S3",  icon: ic(SiAmazons3,  "w-5 h-5 md:w-6 md:h-6 text-[#569A3F]") },
      { name: "AWS EC2", icon: ic(SiAmazonec2, "w-5 h-5 md:w-6 md:h-6 text-[#FF9900]") },
    ],
  },
];

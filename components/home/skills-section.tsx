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
  SiKubernetes,
  SiFastapi,
  SiRedis,
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

type SkillItem = { name: string; icon: React.ReactNode };
type SkillGroupData = { label: string; icon: React.ReactNode; skills: SkillItem[] };

const ic = (Icon: React.ElementType, cls: string) =>
  createElement(Icon, { className: cls });

// ─── Full Stack ────────────────────────────────────────────────────────────────
const fullStackSections: SkillGroupData[] = [
  {
    label: "Frontend",
    icon: <Globe className="w-3.5 h-3.5" />,
    skills: [
      { name: "Next.js",      icon: ic(SiNextdotjs,   "w-4 h-4 text-foreground") },
      { name: "React",        icon: ic(SiReact,       "w-4 h-4 text-[#61DAFB]") },
      { name: "TypeScript",   icon: ic(SiTypescript,  "w-4 h-4 text-[#3178C6]") },
      { name: "Tailwind CSS", icon: ic(SiTailwindcss, "w-4 h-4 text-[#38BDF8]") },
      { name: "JavaScript",   icon: ic(SiJavascript,  "w-4 h-4 text-[#F7DF1E]") },
    ],
  },
  {
    label: "Backend",
    icon: <ServerCog className="w-3.5 h-3.5" />,
    skills: [
      { name: "Node.js",     icon: ic(SiNodedotjs, "w-4 h-4 text-[#339933]") },
      { name: "Express.js",  icon: ic(SiExpress,   "w-4 h-4 text-foreground") },
      { name: "FastAPI",     icon: ic(SiFastapi,   "w-4 h-4 text-[#009688]") },
      { name: "tRPC",        icon: ic(SiTrpc,      "w-4 h-4 text-[#0D9488]") },
      { name: "Better Auth", icon: ic(SiShadcnui,  "w-4 h-4 text-[#9333EA]") },
      { name: "Python",      icon: ic(SiPython,    "w-4 h-4 text-[#3776AB]") },
      { name: "DrizzleORM",  icon: ic(Droplet,     "w-4 h-4 text-[#C5F74F]") },
      { name: "Inngest",     icon: ic(Zap,         "w-4 h-4 text-[#7C3AED]") },
    ],
  },
  {
    label: "Database",
    icon: <Database className="w-3.5 h-3.5" />,
    skills: [
      { name: "PostgreSQL", icon: ic(SiPostgresql, "w-4 h-4 text-[#336791]") },
      { name: "MongoDB",    icon: ic(SiMongodb,    "w-4 h-4 text-[#47A248]") },
      { name: "Redis",      icon: ic(SiRedis,      "w-4 h-4 text-[#DC382D]") },
      { name: "NeonDB",     icon: ic(Database,     "w-4 h-4 text-[#00E599]") },
    ],
  },
  {
    label: "DevOps & Tools",
    icon: <Layers className="w-3.5 h-3.5" />,
    skills: [
      { name: "Git",        icon: ic(SiGit,        "w-4 h-4 text-[#F05032]") },
      { name: "Docker",     icon: ic(SiDocker,     "w-4 h-4 text-[#2496ED]") },
      { name: "Linux",      icon: ic(SiLinux,      "w-4 h-4 text-foreground") },
      { name: "Turborepo",  icon: ic(Zap,          "w-4 h-4 text-[#EF4444]") },
      { name: "CI/CD",      icon: ic(GitMerge,     "w-4 h-4 text-[#22C55E]") },
    ],
  },
  {
    label: "AI & LLM",
    icon: <Brain className="w-3.5 h-3.5" />,
    skills: [
      { name: "LangChain",  icon: ic(Brain,   "w-4 h-4 text-[#1C7C54]") },
      { name: "LangGraph",  icon: ic(Network, "w-4 h-4 text-[#F59E0B]") },
    ],
  },
];

// ─── SkillChip ─────────────────────────────────────────────────────────────────
function SkillChip({ name, icon }: SkillItem) {
  return (
    <div className="skill-chip flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl cursor-default group">
      <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
        {icon}
      </span>
      <span className="text-xs font-medium text-foreground/75 group-hover:text-foreground transition-colors duration-200 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

// ─── SkillGroup ────────────────────────────────────────────────────────────────
function SkillGroup({ label, icon, skills }: SkillGroupData) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <p className="text-[11px] uppercase tracking-widest font-semibold">{label}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <SkillChip key={s.name} {...s} />
        ))}
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function SkillsSection() {
  return (
    <section className="w-full flex flex-col gap-6 mt-6">
      {/* Heading */}
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground font-mono">Technical</p>
        <h2 className="text-2xl font-bold text-foreground">Skills</h2>
      </div>

      {/* Summary line for HR */}
      <p className="text-sm text-muted-foreground leading-relaxed -mt-2">
        Proficient across the full product lifecycle — from building responsive UIs and scalable
        APIs to deploying robust applications in production.
      </p>

      <div className="clay rounded-2xl p-4 md:p-6 flex flex-col gap-5 md:gap-7">
        {fullStackSections.map((s) => (
          <SkillGroup key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}

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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      { name: "Next.js",      icon: ic(SiNextdotjs,   "w-5 h-5 text-foreground") },
      { name: "React",        icon: ic(SiReact,       "w-5 h-5 text-[#61DAFB]") },
      { name: "TypeScript",   icon: ic(SiTypescript,  "w-5 h-5 text-[#3178C6]") },
      { name: "Tailwind CSS", icon: ic(SiTailwindcss, "w-5 h-5 text-[#38BDF8]") },
      { name: "JavaScript",   icon: ic(SiJavascript,  "w-5 h-5 text-[#F7DF1E]") },
    ],
  },
  {
    label: "Backend",
    icon: <ServerCog className="w-3.5 h-3.5" />,
    skills: [
      { name: "Node.js",     icon: ic(SiNodedotjs, "w-5 h-5 text-[#339933]") },
      { name: "Express.js",  icon: ic(SiExpress,   "w-5 h-5 text-foreground") },
      { name: "FastAPI",     icon: ic(SiFastapi,   "w-5 h-5 text-[#009688]") },
      { name: "tRPC",        icon: ic(SiTrpc,      "w-5 h-5 text-[#0D9488]") },
      { name: "Better Auth", icon: ic(SiShadcnui,  "w-5 h-5 text-[#9333EA]") },
      { name: "Python",      icon: ic(SiPython,    "w-5 h-5 text-[#3776AB]") },
      { name: "DrizzleORM",  icon: ic(Droplet,     "w-5 h-5 text-[#C5F74F]") },
      { name: "Inngest",     icon: ic(Zap,         "w-5 h-5 text-[#7C3AED]") },
    ],
  },
  {
    label: "Database",
    icon: <Database className="w-3.5 h-3.5" />,
    skills: [
      { name: "PostgreSQL", icon: ic(SiPostgresql, "w-5 h-5 text-[#336791]") },
      { name: "MongoDB",    icon: ic(SiMongodb,    "w-5 h-5 text-[#47A248]") },
      { name: "Redis",      icon: ic(SiRedis,      "w-5 h-5 text-[#DC382D]") },
      { name: "NeonDB",     icon: ic(Database,     "w-5 h-5 text-[#00E599]") },
    ],
  },
  {
    label: "DevOps & Tools",
    icon: <Layers className="w-3.5 h-3.5" />,
    skills: [
      { name: "Git",        icon: ic(SiGit,        "w-5 h-5 text-[#F05032]") },
      { name: "Docker",     icon: ic(SiDocker,     "w-5 h-5 text-[#2496ED]") },
      { name: "Linux",      icon: ic(SiLinux,      "w-5 h-5 text-foreground") },
      { name: "Turborepo",  icon: ic(Zap,          "w-5 h-5 text-[#EF4444]") },
      { name: "CI/CD",      icon: ic(GitMerge,     "w-5 h-5 text-[#22C55E]") },
    ],
  },
  {
    label: "AI & LLM",
    icon: <Brain className="w-3.5 h-3.5" />,
    skills: [
      { name: "LangChain",  icon: ic(Brain,   "w-5 h-5 text-[#1C7C54]") },
      { name: "LangGraph",  icon: ic(Network, "w-5 h-5 text-[#F59E0B]") },
    ],
  },
];

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function SkillsSection() {
  return (
    <section className="w-full flex flex-col gap-6 mt-6">
      {/* Heading */}
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground font-mono uppercase">Tech Stack</p>
      </div>

      <div className="clay rounded-2xl p-4 md:p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-4 leading-loose">
          {fullStackSections.map((section, idx) => (
            <div key={section.label} className="flex items-center flex-wrap gap-3">
              <div className="flex items-center gap-0">
                {section.skills.map((skill) => (
                  <Tooltip key={skill.name} delayDuration={100}>
                    <TooltipTrigger asChild>
                      <div className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer opacity-80 hover:opacity-100 flex items-center justify-center">
                        {skill.icon}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={5}>
                      <p className="font-medium text-xs">{skill.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>

              {/* Separator */}
              {idx < fullStackSections.length - 1 && (
                <span className="text-border mx-1 select-none">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

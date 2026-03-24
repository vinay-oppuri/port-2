"use client";

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
  SiTensorflow,
  SiScikitlearn,
  SiDocker,
  SiGit,
  SiLinux,
  SiJavascript,
  SiGooglegemini,
  SiJupyter,
  SiKubernetes,
} from "react-icons/si";
import {
  Brain,
  GitMerge,
  Cpu,
  Zap,
  Network,
  FlaskConical,
  Database,
  Layers,
  ServerCog,
  Globe,
  Code2,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
      { name: "tRPC",        icon: ic(SiTrpc,      "w-4 h-4 text-[#0D9488]") },
      { name: "Better Auth", icon: ic(SiShadcnui,  "w-4 h-4 text-[#9333EA]") },
      { name: "Python",      icon: ic(SiPython,    "w-4 h-4 text-[#3776AB]") },
    ],
  },
  {
    label: "Database",
    icon: <Database className="w-3.5 h-3.5" />,
    skills: [
      { name: "PostgreSQL", icon: ic(SiPostgresql, "w-4 h-4 text-[#336791]") },
      { name: "MongoDB",    icon: ic(SiMongodb,    "w-4 h-4 text-[#47A248]") },
    ],
  },
  {
    label: "DevOps & Tools",
    icon: <Layers className="w-3.5 h-3.5" />,
    skills: [
      { name: "Git",        icon: ic(SiGit,        "w-4 h-4 text-[#F05032]") },
      { name: "Docker",     icon: ic(SiDocker,     "w-4 h-4 text-[#2496ED]") },
      { name: "Linux",      icon: ic(SiLinux,      "w-4 h-4 text-foreground") },
      { name: "Kubernetes", icon: ic(SiKubernetes, "w-4 h-4 text-[#326CE5]") },
    ],
  },
];

// ─── AI ────────────────────────────────────────────────────────────────────────
const aiSections: SkillGroupData[] = [
  {
    label: "Frameworks",
    icon: <Code2 className="w-3.5 h-3.5" />,
    skills: [
      { name: "FastAPI",      icon: ic(Zap,           "w-4 h-4 text-[#009688]") },
      { name: "TensorFlow",   icon: ic(SiTensorflow,  "w-4 h-4 text-[#FF6F00]") },
      { name: "Scikit-learn", icon: ic(SiScikitlearn, "w-4 h-4 text-[#F7931E]") },
      { name: "Transformers", icon: ic(Brain,         "w-4 h-4 text-[#9333EA]") },
      { name: "Hugging Face", icon: ic(FlaskConical,  "w-4 h-4 text-[#FFD21E]") },
      { name: "Jupyter",      icon: ic(SiJupyter,     "w-4 h-4 text-[#F37626]") },
    ],
  },
  {
    label: "LLM & Agents",
    icon: <Brain className="w-3.5 h-3.5" />,
    skills: [
      { name: "LangChain",  icon: ic(Network,        "w-4 h-4 text-foreground") },
      { name: "LangGraph",  icon: ic(GitMerge,       "w-4 h-4 text-foreground") },
      { name: "RAG",        icon: ic(Database,       "w-4 h-4 text-[#8B5CF6]") },
      { name: "Gemini API", icon: ic(SiGooglegemini, "w-4 h-4 text-[#8E75B2]") },
    ],
  },
  {
    label: "MLOps",
    icon: <Cpu className="w-3.5 h-3.5" />,
    skills: [
      { name: "MLOps",      icon: ic(Cpu,        "w-4 h-4 text-[#0EA5E9]") },
      { name: "Docker",     icon: ic(SiDocker,   "w-4 h-4 text-[#2496ED]") },
      { name: "Kubernetes", icon: ic(SiKubernetes,"w-4 h-4 text-[#326CE5]") },
    ],
  },
];

// ─── SkillChip ─────────────────────────────────────────────────────────────────
function SkillChip({ name, icon }: SkillItem) {
  return (
    <div className="clay clay-interactive flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl cursor-default group hover:-translate-y-0.5 hover:scale-[1.03] transition-all duration-200">
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

// ─── TabPanel ──────────────────────────────────────────────────────────────────
function TabPanel({ sections }: { sections: SkillGroupData[] }) {
  return (
    <div className="clay rounded-2xl p-4 md:p-6 flex flex-col gap-5 md:gap-7">
      {sections.map((s) => (
        <SkillGroup key={s.label} {...s} />
      ))}
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function SkillsSection() {
  return (
    <section className="w-full flex flex-col gap-6 mt-6">
      {/* Heading */}
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">Technical</p>
        <h2 className="text-2xl font-bold text-foreground">Skills</h2>
      </div>

      {/* Summary line for HR */}
      <p className="text-sm text-muted-foreground leading-relaxed -mt-2">
        Proficient across the full product lifecycle — from building responsive UIs and scalable
        APIs to training and deploying AI/ML systems in production.
      </p>

      {/* Tabs */}
      <Tabs defaultValue="ai">
        <TabsList className="mb-2 clay w-full sm:w-fit">
          <TabsTrigger value="fullstack" className="data-[state=active]:bg-foreground/75! data-[state=active]:text-background! gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            Full Stack
          </TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-foreground/75! data-[state=active]:text-background! gap-1.5">
            <Brain className="w-3.5 h-3.5" />
            AI / ML
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fullstack">
          <TabPanel sections={fullStackSections} />
        </TabsContent>

        <TabsContent value="ai">
          <TabPanel sections={aiSections} />
        </TabsContent>
      </Tabs>
    </section>
  );
}

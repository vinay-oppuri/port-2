import { createElement } from "react";
import type { IconType } from "react-icons";
import {
  SiDrizzle,
  SiGooglegemini,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiShadcnui,
  SiTailwindcss,
  SiTrpc,
  SiTurborepo,
  SiTypescript,
} from "react-icons/si";

const icon = (Icon: IconType, className: string) => createElement(Icon, { className });

const tag = (name: string, Icon: IconType, className: string) => ({
  name,
  logo: icon(Icon, className),
});

export const ProjectsData = [
  {
    id: "inzite",
    title: "Inzite",
    description:
      "AI-powered platform delivering actionable startup insights through market analysis, competitor intelligence, and interactive strategic reports.",
    features: [
      "Deep market analysis and trend forecasting",
      "Interactive AI Chat Interface",
      "Dynamic strategic reports with motion UI",
      "Competitor intelligence gathering",
      "Technology stack evaluation",
      "Data-driven startup insights",
    ],
    motivation:
      "I created Inzite to help entrepreneurs and investors make data-backed decisions. The goal was to aggregate complex market data into actionable insights, reducing the risk associated with early-stage startup ventures.",
    tags: [
      tag("React", SiReact, "h-5 w-5 text-[#61DAFB]"),
      tag("Node.js", SiNodedotjs, "h-5 w-5 text-[#3C873A]"),
      tag("Next.js", SiNextdotjs, "h-5 w-5 text-foreground"),
      tag("Typescript", SiTypescript, "h-5 w-5 text-[#3178C6]"),
      tag("Tailwind CSS", SiTailwindcss, "h-5 w-5 text-[#38BDF8]"),
      tag("Drizzle ORM", SiDrizzle, "h-5 w-5 text-foreground"),
      tag("NeonDB", SiPostgresql, "h-5 w-5 text-[#336791]"),
      tag("GeminiAI", SiGooglegemini, "h-5 w-5 text-[#4285F4]"),
      tag("Shadcn UI", SiShadcnui, "h-5 w-5 text-foreground"),
    ],
    imageUrl: "/projects/inzite.png",
    liveUrl: "https://inzite.vinayweb.in/",
    githubUrl: "https://github.com/vinay-oppuri/inzite",
    status: "All Systems Operational",
  },
  {
    id: "resanlys",
    title: "Resanlys",
    description:
      "Resanlys is an AI platform that analyzes resumes against job descriptions to score match, highlight gaps, and suggest improvements.",
    features: [
      "Upload resumes and parse them into structured, machine-readable data",
      "Analyze job descriptions to extract required skills, tools, and experience",
      "AI-powered resume-to-job description matching with percentage score",
      "Identify missing keywords and underrepresented skills",
      "Suggest bullet-point and section-level resume improvements",
      "Generate ATS-friendly LaTeX resumes and export as PDF",
    ],
    motivation:
      "I built Resanlys to solve resumes being rejected by ATS systems despite strong candidate profiles. The goal was to create a transparent, explainable AI system that helps users understand resume-role fit and make concrete improvements.",
    tags: [
      tag("Next.js", SiNextdotjs, "h-5 w-5 text-foreground"),
      tag("TypeScript", SiTypescript, "h-5 w-5 text-[#3178C6]"),
      tag("Tailwind CSS", SiTailwindcss, "h-5 w-5 text-[#38BDF8]"),
      tag("tRPC", SiTrpc, "h-5 w-5 text-[#0D9488]"),
      tag("Drizzle ORM", SiDrizzle, "h-5 w-5 text-foreground"),
      tag("NeonDB", SiPostgresql, "h-5 w-5 text-[#336791]"),
      tag("Gemini AI", SiGooglegemini, "h-5 w-5 text-[#4285F4]"),
      tag("Turborepo", SiTurborepo, "h-5 w-5 text-foreground"),
      tag("Shadcn UI", SiShadcnui, "h-5 w-5 text-foreground"),
    ],
    imageUrl: "/projects/resanlys.png",
    liveUrl: "https://resanlys.vinayweb.in/",
    githubUrl: "https://github.com/vinay-oppuri/resanlys",
    status: "Building",
  },
  {
    id: "ai-agent-meetings",
    title: "AI-Agent Meetings",
    description:
      "MeetAI lets users create AI agents to schedule meetings, generate post-meeting summaries, and answer follow-up questions once meetings are completed.",
    features: [
      "Create custom AI agents for meeting management",
      "Automated meeting scheduling and coordination",
      "Generate comprehensive post-meeting summaries",
      "Interactive Q&A with meeting context",
    ],
    motivation:
      "I built this to solve fragmented meeting information and time-consuming scheduling plus follow-ups. I wanted to use AI to make meetings more productive and less administrative.",
    tags: [
      tag("Next.js", SiNextdotjs, "h-5 w-5 text-foreground"),
      tag("Typescript", SiTypescript, "h-5 w-5 text-[#3178C6]"),
      tag("Tailwind CSS", SiTailwindcss, "h-5 w-5 text-[#38BDF8]"),
      tag("tRPC", SiTrpc, "h-5 w-5 text-[#0D9488]"),
      tag("GeminiAI", SiGooglegemini, "h-5 w-5 text-[#4285F4]"),
      tag("Shadcn UI", SiShadcnui, "h-5 w-5 text-foreground"),
    ],
    imageUrl: "/projects/ai-agent.png",
    liveUrl: "https://meet.vinayweb.in/",
    githubUrl: "https://github.com/vinay-oppuri/genai",
    status: "Building",
  },
];

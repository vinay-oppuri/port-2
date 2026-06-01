import { createElement } from "react";
import type { IconType } from "react-icons";
import {
  SiDrizzle,
  SiFastapi,
  SiGooglegemini,
  SiHuggingface,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
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
    id: "rescomail",
    title: "Rescomail",
    description:
      "Rescomail is a comprehensive AI job application copilot for resume parsing, deep ATS intelligence, and highly personalized cold email generation.",
    features: [
      "Upload resumes (PDF) and parse them into structured, machine-readable data",
      "AI-powered ATS intelligence pipeline utilizing semantic embeddings for predictive compatibility scoring",
      "Identify matched keywords and critical skill gaps against job requirements with RAG-grounded recruiter guidance",
      "Generate strengths, risks, and actionable rewrite suggestions per evidence gap",
      "Auto-generate dynamic cold emails enriched with real-time company web scraping (Tavily)",
      "Persist and browse full ATS analysis and cold outreach history per resume",
      "Seamless authentication (Email/Google OAuth) and robust session management via Better Auth",
      "Organization-level multi-tenancy with per-org subscription, billing, and credit usage tracking",
    ],
    motivation:
      "I built Rescomail to help candidates understand why their resumes get filtered out by ATS systems before a human ever reads them. The goal was to provide an explainable, evidence-based scoring engine that surfaces concrete keyword gaps and rewrite opportunities, while also streamlining the outreach process through highly targeted, AI-generated cold emails.",
    tags: [
      tag("Next.js", SiNextdotjs, "h-5 w-5 text-foreground"),
      tag("TypeScript", SiTypescript, "h-5 w-5 text-[#3178C6]"),
      tag("FastAPI", SiFastapi, "h-5 w-5 text-[#009688]"),
      tag("Python", SiPython, "h-5 w-5 text-[#3776AB]"),
      tag("Tailwind CSS", SiTailwindcss, "h-5 w-5 text-[#38BDF8]"),
      tag("Drizzle ORM", SiDrizzle, "h-5 w-5 text-foreground"),
      tag("NeonDB", SiPostgresql, "h-5 w-5 text-[#336791]"),
      tag("Gemini AI", SiGooglegemini, "h-5 w-5 text-[#4285F4]"),
      tag("Hugging Face", SiHuggingface, "h-5 w-5 text-[#FFD21E]"),
      tag("Turborepo", SiTurborepo, "h-5 w-5 text-foreground"),
      tag("Shadcn UI", SiShadcnui, "h-5 w-5 text-foreground"),
    ],
    imageUrl: "/projects/rescomail.png",
    liveUrl: "https://rescomail.vinayweb.in/",
    githubUrl: "https://github.com/vinay-oppuri/rescomail",
    status: "Operational",
  },
  {
    id: "mono",
    title: "Mono",
    description:
      "Mono is an AI agent platform that lets users create custom AI assistants with unique personalities and instructions, then chat with them persistently",
    features: [
      "Sign up with email/password, GitHub, or Google via Better Auth",
      "Create and manage AI agents with custom names and instructions",
      "Start and manage persistent chats with any agent",
      "AI-powered replies using Gemini (gemini-2.5-flash) with conversation history",
      "Persistent chat message history stored per session",
      "Search and paginate agents and chats",
      "Meetings module with status lifecycle (upcoming, active, completed, processing, cancelled)",
      "Video calling integration via Stream Video SDK",
    ],
    motivation:
      "I built Mono to explore how custom AI agents with distinct instructions can power different workflows in a single unified chat interface. The goal was to make it easy to spin up purpose-built assistants without any configuration overhead.",
    tags: [
      tag("Next.js", SiNextdotjs, "h-5 w-5 text-foreground"),
      tag("TypeScript", SiTypescript, "h-5 w-5 text-[#3178C6]"),
      tag("Tailwind CSS", SiTailwindcss, "h-5 w-5 text-[#38BDF8]"),
      tag("tRPC", SiTrpc, "h-5 w-5 text-[#0D9488]"),
      tag("Drizzle ORM", SiDrizzle, "h-5 w-5 text-foreground"),
      tag("NeonDB", SiPostgresql, "h-5 w-5 text-[#336791]"),
      tag("Gemini AI", SiGooglegemini, "h-5 w-5 text-[#4285F4]"),
      tag("Shadcn UI", SiShadcnui, "h-5 w-5 text-foreground"),
    ],
    imageUrl: "/projects/mono.png",
    liveUrl: "https://mono.vinayweb.in/",
    githubUrl: "https://github.com/vinay-oppuri/mono",
    status: "Operational",
  },
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
  }
];

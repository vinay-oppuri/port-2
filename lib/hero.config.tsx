import { SendIcon } from "lucide-react";
import {
  SiBun,
  SiDrizzle,
  SiExpress,
  SiFirebase,
  SiGithub,
  SiGoogledocs,
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
  SiTurborepo,
  SiTypescript,
  SiX
} from "react-icons/si";

export const heroConfig = {
  name: "Vinay",
  fullName: "Oppuri Vinay Reddy",
  title: "A Full Stack Web Developer • Agentic AI Engineer",
  avatar: "/avatars/avatar-rounded.png",

  mainSkills: [
    {
      name: "Bun",
      href: "https://bun.sh/",
      component: <SiBun className="h-4 w-4 text-foreground" />,
    },
    {
      name: "Next.js",
      href: "https://nextjs.org/",
      component: <SiNextdotjs className="h-4 w-4 text-foreground" />,
    },
    {
      name: "Typescript",
      href: "https://www.typescriptlang.org/",
      component: <SiTypescript className="h-4 w-4 text-[#3178C6]" />,
    },
    {
      name: "Tailwind CSS",
      href: "https://tailwindcss.com/",
      component: <SiTailwindcss className="h-4 w-4 text-[#38BDF8]" />,
    },
    {
      name: "PostgreSQL",
      href: "https://www.postgresql.org/",
      component: <SiPostgresql className="h-4 w-4 text-[#336791]" />,
    },
    {
      name: "tRPC",
      href: "https://trpc.io/",
      component: <SiTrpc className="h-4 w-4 text-[#0D9488]" />,
    },
    {
      name: "Better Auth",
      href: "https://better-auth.com/",
      component: <SiShadcnui className="h-4 w-4 text-[#9333EA]" />,
    },
  ],

  skills: {
    frontend: [
      {
        name: "Next.js",
        href: "https://nextjs.org/",
        component: <SiNextdotjs className="h-4 w-4 text-foreground" />,
      },
      {
        name: "React",
        href: "https://react.dev/",
        component: <SiReact className="h-4 w-4 text-[#61DAFB]" />,
      },
      {
        name: "Typescript",
        href: "https://www.typescriptlang.org/",
        component: <SiTypescript className="h-4 w-4 text-[#3178C6]" />,
      },
      {
        name: "Tailwind CSS",
        href: "https://tailwindcss.com/",
        component: <SiTailwindcss className="h-4 w-4 text-[#38BDF8]" />,
      },
    ],
    backend: [
      {
        name: "Node.js",
        href: "https://nodejs.org/",
        component: <SiNodedotjs className="h-4 w-4 text-[#339933]" />,
      },
      {
        name: "PostgreSQL",
        href: "https://www.postgresql.org/",
        component: <SiPostgresql className="h-4 w-4 text-[#336791]" />,
      },
      {
        name: "MongoDB",
        href: "https://www.mongodb.com/",
        component: <SiMongodb className="h-4 w-4 text-[#47A248]" />,
      },
      {
        name: "Express.js",
        href: "https://expressjs.com/",
        component: <SiExpress className="h-4 w-4 text-foreground" />,
      },
      {
        name: "tRPC",
        href: "https://trpc.io/",
        component: <SiTrpc className="h-4 w-4 text-[#0D9488]" />,
      },
      {
        name: "Better Auth",
        href: "https://better-auth.com/",
        component: <SiShadcnui className="h-4 w-4 text-[#9333EA]" />,
      },
    ],
    ai: [
      {
        name: "Gemini",
        href: "https://deepmind.google/technologies/gemini/",
        component: <SiGooglegemini className="h-4 w-4 text-[#8E75B2]" />,
      },
    ],
  },

  description: {
    template:
      "I build interactive web apps using Next.js, React, Bun, Typescript and PostgreSQL. With a focus on UI design. Enthusiastic about Three.js, driven by a keen eye for design.",
    about:
      "I am a Full Stack Developer and Agentic AI Engineer focused on building scalable web apps and intelligent systems. My expertise spans the modern JavaScript ecosystem Next.js, React, Node.js, TypeScript paired with PostgreSQL and MongoDB. I am enthusiastic about AI agents automating workflows and enhancing productivity, while also enjoying new technologies and UI/UX design.",
  },

  buttons: [
    {
      variant: "outline",
      text: "Resume / CV",
      href: "/resume",
      icon: <SiGoogledocs />,
    },
    {
      variant: "default",
      text: "Get in touch",
      href: "/contact",
      icon: <SendIcon />,
    },
  ],
};

// ------------------ SOCIAL LINKS ------------------

export const socialLinks = [
  {
    name: "X",
    href: "https://x.com/yourusername",
    icon: <SiX className="text-foreground" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/yourusername/",
    icon: <SiLinkedin className="text-[#0A66C2]" />,
  },
  {
    name: "Github",
    href: "https://github.com/vinay-oppuri",
    icon: <SiGithub className="text-foreground" />,
  },
  // {
  //   name: "Email",
  //   href: "mailto:oppurivinay25@gmail.com",
  //   icon: <SiMaildotcom className="text-[#D44638]" />,
  // },
];

// ------------------ PROJECT TAG ICONS ------------------

export const ProjectsData = [
  {
    id: "inzite",
    title: "Inzite",
    description: "AI-powered platform delivering actionable startup insights through market analysis, competitor intelligence, and interactive strategic reports.",
    features: [
      "Deep market analysis & trend forecasting",
      "Interactive AI Chat Interface",
      "Dynamic Strategic Reports with Motion UI",
      "Competitor intelligence gathering",
      "Technology stack evaluation",
      "Data-driven startup insights"
    ],
    motivation: "I created Inzite to help entrepreneurs and investors make data-backed decisions. The goal was to aggregate complex market data into actionable insights, reducing the risk associated with early-stage startup ventures.",
    tags: [
      { name: "React", logo: <SiReact className="h-5 w-5 text-[#61DAFB]" /> },
      { name: "Node.js", logo: <SiNodedotjs className="h-5 w-5 text-[#3C873A]" /> },
      { name: "Next.js", logo: <SiNextdotjs className="h-5 w-5 text-foreground" /> },
      { name: "Typescript", logo: <SiTypescript className="h-5 w-5 text-[#3178C6]" /> },
      { name: "Tailwind CSS", logo: <SiTailwindcss className="h-5 w-5 text-[#38BDF8]" /> },
      { name: "Drizzle ORM", logo: <SiDrizzle className="h-5 w-5 text-foreground" /> },
      { name: "NeonDB", logo: <SiPostgresql className="h-5 w-5 text-[#336791]" /> },
      { name: "GeminiAI", logo: <SiGooglegemini className="h-5 w-5 text-[#4285F4]" /> },
      { name: "Shadcn UI", logo: <SiShadcnui className="h-5 w-5 text-foreground" /> },
    ],
    imageUrl: "/projects/inzite.png",
    liveUrl: "https://inzite.vinayweb.in/",
    githubUrl: "https://github.com/vinay-oppuri/inzite",
    status: "All Systems Operational"
  },
  {
    id: "resanlys",
    title: "Resanlys",
    description: "Resanlys is an AI platform that analyzes resumes against job descriptions to score match, highlight gaps, and suggest improvements.",
    features: [
      "Upload resumes and parse them into structured, machine-readable data",
      "Analyze job descriptions to extract required skills, tools, and experience",
      "AI-powered resume ↔ job description matching with percentage score",
      "Identify missing keywords and underrepresented skills",
      "Suggest bullet-point and section-level resume improvements",
      "Generate ATS-friendly LaTeX resumes and export as PDF"
    ],
    motivation:
      "I built resanlys to solve the common problem of resumes being rejected by ATS systems despite strong candidate profiles. The goal was to create a transparent, explainable AI system that helps users understand how well their resume matches a role and what concrete changes can improve their chances.",
    tags: [
      { name: "Next.js", logo: <SiNextdotjs className="h-5 w-5 text-foreground" /> },
      { name: "TypeScript", logo: <SiTypescript className="h-5 w-5 text-[#3178C6]" /> },
      { name: "Tailwind CSS", logo: <SiTailwindcss className="h-5 w-5 text-[#38BDF8]" /> },
      { name: "tRPC", logo: <SiTrpc className="h-5 w-5 text-[#0D9488]" /> },
      { name: "Drizzle ORM", logo: <SiDrizzle className="h-5 w-5 text-foreground" /> },
      { name: "NeonDB", logo: <SiPostgresql className="h-5 w-5 text-[#336791]" /> },
      { name: "Gemini AI", logo: <SiGooglegemini className="h-5 w-5 text-[#4285F4]" /> },
      { name: "Turborepo", logo: <SiTurborepo className="h-5 w-5 text-foreground" /> },
      // { name: "Inngest", logo: <SiInngest className="h-5 w-5 text-foreground" /> },
      { name: "Shadcn UI", logo: <SiShadcnui className="h-5 w-5 text-foreground" /> },
    ],
    imageUrl: "/projects/resanlys.png",
    liveUrl: "https://resanlys.vinayweb.in/",
    githubUrl: "https://github.com/vinay-oppuri/resanlys",
    status: "Building"
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
      "Interactive Q&A with meeting context"
    ],
    motivation: "I built this to solve the problem of fragmented meeting information and the time-consuming nature of scheduling and follow-ups. I wanted to leverage AI to make meetings more productive and less administrative.",
    tags: [
      { name: "Next.js", logo: <SiNextdotjs className="h-5 w-5 text-foreground" /> },
      { name: "Typescript", logo: <SiTypescript className="h-5 w-5 text-[#3178C6]" /> },
      { name: "Tailwind CSS", logo: <SiTailwindcss className="h-5 w-5 text-[#38BDF8]" /> },
      { name: "tRPC", logo: <SiTrpc className="h-5 w-5 text-[#0D9488]" /> },
      { name: "GeminiAI", logo: <SiGooglegemini className="h-5 w-5 text-[#4285F4]" /> },
      { name: "Shadcn UI", logo: <SiShadcnui className="h-5 w-5 text-foreground" /> },
    ],
    imageUrl: "/projects/ai-agent.png",
    liveUrl: "https://meet.vinayweb.in/",
    githubUrl: "https://github.com/vinay-oppuri/genai",
    status: "Building"
  },
];


export const experiences = [
  {
    companyName: "IIIT Raichur Website",
    logo: "/experience/collegelogo.png",
    status: "Working",
    role: "Full Stack Developer",
    timeline: "August 2025 – Present",
    location: "India (Remote)",
    technologies: [
      { name: "Next.js", logo: <SiNextdotjs className="h-4 w-4 text-foreground" /> },
      { name: "Tailwind CSS", logo: <SiTailwindcss className="h-5 w-5 text-[#38BDF8]" /> },
      { name: "React", logo: <SiReact className="h-4 w-4 text-[#61DAFB]" /> },
      { name: "TypeScript", logo: <SiTypescript className="h-4 w-4 text-[#3178C6]" /> },
      { name: "Node.js", logo: <SiNodedotjs className="h-5 w-5 text-[#3C873A]" /> },
      { name: "Firebase", logo: <SiFirebase className="h-5 w-5 text-[#FF6B35]" /> },
    ],
    responsibilities: [
      "Built and optimized the entire college website with modern full-stack technologies.",
      "Implemented dynamic dashboards, authentication, and admin features.",
      "Improved performance, accessibility, and UI/UX for students & faculty.",
      "Integrated secure API endpoints and optimized backend workflows.",
    ],
  },
  // add more entries here...
];
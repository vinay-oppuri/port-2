import { SendIcon } from "lucide-react";
import {
  SiExpress,
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
  SiTypescript,
  SiX
} from "react-icons/si";

export const heroConfig = {
  name: "Vinay",
  fullName: "Oppuri Vinay Reddy",
  title: "A Full Stack Web Developer • Agentic AI Engineer",
  avatar: "/avatar.png",

  skills: [
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

  description: {
    template:
      "I build interactive web apps using Next.js, React, Bun, Typescript and PostgreSQL. With a focus on UI design. Enthusiastic about Three.js, driven by a keen eye for design.",
    about: "",
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
    liveUrl: "https://agents-meet-ai.vercel.app/",
    githubUrl: "https://github.com/vinay-oppuri/genai",
    status: "Building"
  },

  {
    id: "inzite",
    title: "Inzite",
    description:
      "Inzite delivers actionable startup insights through market analysis, competitor intelligence, and technology evaluation to guide smarter business decisions.",
    features: [
      "Deep market analysis and trend forecasting",
      "Competitor intelligence gathering",
      "Technology stack evaluation and recommendations",
      "Data-driven startup insights"
    ],
    motivation: "I created Inzite to help entrepreneurs and investors make data-backed decisions. The goal was to aggregate complex market data into actionable insights, reducing the risk associated with early-stage startup ventures.",
    tags: [
      { name: "React", logo: <SiReact className="h-5 w-5 text-[#61DAFB]" /> },
      { name: "Node.js", logo: <SiNodedotjs className="h-5 w-5 text-[#3C873A]" /> },
      { name: "Next.js", logo: <SiNextdotjs className="h-5 w-5 text-foreground" /> },
      { name: "Typescript", logo: <SiTypescript className="h-5 w-5 text-[#3178C6]" /> },
      { name: "Tailwind CSS", logo: <SiTailwindcss className="h-5 w-5 text-[#38BDF8]" /> },
      { name: "GeminiAI", logo: <SiGooglegemini className="h-5 w-5 text-[#4285F4]" /> },
      { name: "Shadcn UI", logo: <SiShadcnui className="h-5 w-5 text-foreground" /> },
    ],
    imageUrl: "/projects/inzite.png",
    liveUrl: "https://inzite.vercel.app/",
    githubUrl: "https://github.com/vinay-oppuri/inzite",
    status: "Building"
  },
];


export const experiences = [
  {
    companyName: "IIIT Raichur Website",
    logo: "/collegelogo.png",
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
      { name: "MongoDB", logo: <SiMongodb className="h-5 w-5 text-[#47A248]" /> },
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
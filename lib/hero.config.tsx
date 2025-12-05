import { GrChat } from "react-icons/gr";
import {
  SiExpress,
  SiGithub,
  SiGoogledocs,
  SiGooglegemini,
  SiLinkedin,
  SiMaildotcom,
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
  title: "A Full Stack web developer.",
  avatar: "/avatar.png",

  skills: [
    {
      name: "Next.js",
      href: "https://nextjs.org/",
      component: <SiNextdotjs className="h-4 w-4 text-white" />,
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
      icon: <SiGoogledocs/>,
    },
    {
      variant: "default",
      text: "Get in touch",
      href: "/contact",
      icon: <GrChat/>,
    },
  ],
};

// ------------------ SOCIAL LINKS ------------------

export const socialLinks = [
  {
    name: "X",
    href: "https://x.com/yourusername",
    icon: <SiX className="text-white" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/yourusername/",
    icon: <SiLinkedin className="text-[#0A66C2]" />,
  },
  {
    name: "Github",
    href: "https://github.com/yourusername",
    icon: <SiGithub className="text-white" />,
  },
  {
    name: "Email",
    href: "mailto:your@email.com",
    icon: <SiMaildotcom className="text-[#D44638]" />,
  },
];

// ------------------ PROJECT TAG ICONS ------------------

export const ProjectsData = [
  {
    title: "AI-Agent Meetings",
    description:
      "MeetAI lets users create AI agents to schedule meetings, generate post-meeting summaries, and answer follow-up questions once meetings are completed.",
    tags: [
      <SiNextdotjs className="h-5 w-5 text-white" />,
      <SiTypescript className="h-5 w-5 text-[#3178C6]" />,
      <SiTailwindcss className="h-5 w-5 text-[#38BDF8]" />,
      <SiTrpc className="h-5 w-5 text-[#0D9488]" />,
      <SiGooglegemini className="h-5 w-5 text-[#4285F4]" />,
      <SiShadcnui className="h-5 w-5 text-white" />,
    ],
    imageUrl: "/projects/ai-agent.png",
    liveUrl: "https://agents-meet-ai.vercel.app/",
    githubUrl: "https://github.com/vinay-oppuri/genai",
  },

  {
    title: "Interactive Data Dashboard",
    description:
      "A dynamic dashboard for visualizing complex datasets. Features real-time data fetching, interactive charts, and customizable reports. Backend powered by Node.js and MongoDB.",
    tags: [
      <SiReact className="h-5 w-5 text-[#61DAFB]" />,
      <SiNodedotjs className="h-5 w-5 text-[#3C873A]" />,
      <SiMongodb className="h-5 w-5 text-[#47A248]" />,
      <SiExpress className="h-5 w-5 text-white" />,
    ],
    imageUrl: "/projects/dashboard.png",
    liveUrl: "#",
    githubUrl: "#",
  },
];
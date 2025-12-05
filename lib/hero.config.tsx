// SVG Icon Components
import Github from '@/components/technologies/Github';
import LinkedIn from '@/components/technologies/LinkedIn';
import Mail from '@/components/technologies/Mail';
import X from '@/components/technologies/X';

// Technology SVG Components
import Bun from '@/components/technologies/Bun';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Prisma from '@/components/technologies/Prisma';
import ReactIcon from '@/components/technologies/ReactIcon';
import TypeScript from '@/components/technologies/TypeScript';

/**
 * @field TypeScript - TypeScript icon component
 * @field ReactIcon - React icon component
 * @field NextJs - Next.js icon component
 * @field Bun - Bun icon component
 * @field PostgreSQL - PostgreSQL icon component
 * @field NodeJs - Node.js icon component
 * @field MongoDB - MongoDB icon component
 * @field Prisma - Prisma icon component
 * @field JavaScript - JavaScript icon component
 */
export const skillComponents = {
  TypeScript: TypeScript,
  ReactIcon: ReactIcon,
  NextJs: NextJs,
  Bun: Bun,
  PostgreSQL: PostgreSQL,
  NodeJs: NodeJs,
  MongoDB: MongoDB,
  Prisma: Prisma,
  JavaScript: JavaScript,
};

/**
 * Configuration for the hero section of the portfolio.
 * Defines personal information, skills, description, and call-to-action buttons.
 */
export const heroConfig = {
  // Personal Information
  name: 'Vinay',
  title: 'A Full Stack web developer.',
  avatar: '/avatar.png', // Keeping this path as avatar.png is currently the placeholder
  // Skills Configuration
  // Each skill includes its name, a link to its official website, and the corresponding component name
  skills: [
    {
      name: 'Typescript',
      href: 'https://www.typescriptlang.org/',
      component: 'TypeScript',
    },
    {
      name: 'React',
      href: 'https://react.dev/',
      component: 'ReactIcon',
    },
    {
      name: 'Next.js',
      href: 'https://nextjs.org/',
      component: 'NextJs',
    },
    {
      name: 'Bun',
      href: 'https://bun.sh/',
      component: 'Bun',
    },
    {
      name: 'PostgreSQL',
      href: 'https://www.postgresql.org/',
      component: 'PostgreSQL',
    },
  ],

  // Description Configuration
  // The template uses {skills:index} placeholders to dynamically insert skill components
  description: {
    template:'I build interactive web apps using {skills:0}, {skills:1}, {skills:2}, {skills:3} and {skills:4}. With a focus on <b>UI</b> design. Enthusiastic about <b>Three.js</b>, driven by a keen eye for design.',
    about: ''
  },

  // Buttons Configuration
  // Each button includes its variant for styling, text, href, and an icon identifier
  buttons: [
    {
      variant: 'outline',
      text: 'Resume / CV',
      href: '/resume',
      icon: 'CV',
    },
    {
      variant: 'default',
      text: 'Get in touch',
      href: '/contact',
      icon: 'Chat',
    },
  ],
};

/**
 * Configuration for social media links.
 * Each link includes its name, href, and the corresponding SVG icon component.
 */
export const socialLinks = [
  {
    name: 'X',
    href: 'https://x.com/yourusername',
    icon: <X />,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yourusername/',
    icon: <LinkedIn />,
  },
  {
    name: 'Github',
    href: 'https://github.com/yourusername',
    icon: <Github />,
  },
  {
    name: 'Email',
    href: 'mailto:your@email.com',
    icon: <Mail />,
  },
];


// hero.config.ts

export const ProjectsData = [
  {
    title: "AI-Agent Meetings",
    description:
      "MeetAI lets users create AI agents to schedule meetings, generate post-meeting summaries, and answer follow-up questions once meetings are completed.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "TRPC",
      "GeminiAI",
      "Inngest",
      "ShadCN",
    ],
    imageUrl: "/projects/ai-agent.png", // Update with your real image
    liveUrl: "https://agents-meet-ai.vercel.app/",
    githubUrl: "https://github.com/vinay-oppuri/genai",
  },

  {
    title: "Interactive Data Dashboard",
    description:
      "A dynamic dashboard for visualizing complex datasets. Features real-time data fetching, interactive charts, and customizable reports. Backend powered by Node.js and MongoDB.",
    tags: ["React", "Node.js", "MongoDB", "D3.js", "Express"],
    imageUrl: "/projects/dashboard.png",
    liveUrl: "#",
    githubUrl: "#",
  },
]
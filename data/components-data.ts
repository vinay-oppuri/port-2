export interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ShowcaseComponent {
  id: string;
  name: string;
  description: string;
  docs: string;
  installation?: string;
  usageImport?: string;
  usageCode?: string;
  props?: ComponentProp[];
}

export const componentsData: ShowcaseComponent[] = [
  {
    id: "char-animation",
    name: "Char Animation",
    description: "An animated character component that emphasizes text with a bold font weight transition.",
    docs: "### Setup\nEnsure you have `motion/react` installed and the `cn` utility configured.",
    installation: "pnpm dlx shadcn@latest add https://vinayweb.in/r/char-animation.json",
    usageImport: "import CharAnimation from \"@/components/ui/char-animation\"",
    usageCode: `<CharAnimation text="Hello World!" className="text-4xl text-white font-sans" />`,
    props: [
      { name: "text", type: "string", default: "-", description: "The string of text to be animated character by character." },
      { name: "className", type: "string", default: "-", description: "Optional CSS classes to apply to the wrapper element." }
    ]
  },
  {
    id: "pill-scroll",
    name: "Pill Scroll",
    description: "An animated floating scroll navigation menu that shows a table of contents and reading progress.",
    docs: "### Setup\nEnsure you have `motion/react`, `lucide-react`, and `react-icons` installed, and the `cn` utility configured.",
    installation: "pnpm dlx shadcn@latest add https://vinayweb.in/r/pill-scroll.json",
    usageImport: "import PillScroll from \"@/components/ui/pill-scroll\"",
    usageCode: `<PillScroll title="On this page" data={tocData} />`,
    props: [
      { name: "title", type: "string", default: "-", description: "The title of the TOC." },
      { name: "data", type: "TOC_INTERFACE[]", default: "-", description: "Array of TOC items with name, value, and info." },
      { name: "value", type: "TOC_INTERFACE", default: "-", description: "Currently selected TOC item." },
      { name: "setValue", type: "(v: TOC_INTERFACE) => void", default: "-", description: "Callback when a TOC item is selected." },
      { name: "ref", type: "RefObject<HTMLElement | null>", default: "-", description: "Ref to the scrollable container." },
      { name: "className", type: "string", default: "-", description: "Optional CSS classes." }
    ]
  },
  {
    id: "iphone",
    name: "iPhone",
    description: "A realistic, CSS-only iPhone frame mockup to wrap and display your content.",
    docs: "### Setup\nEnsure you have the `cn` utility configured.",
    installation: "pnpm dlx shadcn@latest add https://vinayweb.in/r/iphone.json",
    usageImport: "import { Iphone } from \"@/components/ui/iphone\"",
    usageCode: `<Iphone>\n  <div className="flex h-full items-center justify-center bg-violet-500 text-white">Screen Content</div>\n</Iphone>`,
    props: [
      { name: "className", type: "string", default: "-", description: "Optional CSS classes to apply to the device frame." },
      { name: "children", type: "React.ReactNode", default: "-", description: "The content to display inside the device screen." }
    ]
  },
];
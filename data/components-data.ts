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
    installation: "npx shadcn@latest add https://siddz.com/r/char-animation.json",
    usageImport: "import CharAnimation from \"@/components/char-animation\"",
    usageCode: `<CharAnimation text="Hello World!" className="text-4xl text-white font-sans" />`,
    props: [
      { name: "text", type: "string", default: "-", description: "The string of text to be animated character by character." },
      { name: "className", type: "string", default: "-", description: "Optional CSS classes to apply to the wrapper element." }
    ]
  },
  {
    id: "random-box",
    name: "Random Box",
    description: "A simple interactive box that changes its background color when clicked, perfect for testing routing and live previews.",
    docs: "### Setup\nNo additional dependencies required.",
    installation: "npx shadcn@latest add https://siddz.com/r/random-box.json",
    usageImport: "import RandomBox from \"@/components/random-box\"",
    usageCode: `<RandomBox className="my-custom-class" />`,
    props: [
      { name: "className", type: "string", default: "-", description: "Optional CSS classes to apply to the box." }
    ]
  },
  {
    id: "pill-scroll",
    name: "Pill Scroll",
    description: "An animated floating scroll navigation menu that shows a table of contents and reading progress.",
    docs: "### Setup\nEnsure you have `motion/react`, `lucide-react`, and `react-icons` installed, and the `cn` utility configured.",
    installation: "npx shadcn@latest add https://siddz.com/r/pill-scroll.json",
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
];

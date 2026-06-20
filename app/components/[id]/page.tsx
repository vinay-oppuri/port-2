import { ComponentsShowcaseClient } from "@/components/components-showcase";
import { notFound } from "next/navigation";

const validIds = ["clay-tilt-card", "magnetic-button", "hover-reveal-text", "retro-terminal"];

const nameMap: Record<string, string> = {
  "clay-tilt-card": "Clay Tilt Card",
  "magnetic-button": "Magnetic Button",
  "hover-reveal-text": "Hover Reveal Text",
  "retro-terminal": "Retro Terminal",
};

type Props = {
  params: Promise<{ id: string }>;
};

// Generate dynamic SEO metadata matching the active slug component name
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const name = nameMap[id] || "Component";
  return {
    title: `${name} | Components Library`,
    description: `Interactive preview playground, code implementation, and setup documentation for the ${name} component.`,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  // Render 404 if the component slug is invalid
  if (!validIds.includes(id)) {
    notFound();
  }

  return <ComponentsShowcaseClient componentId={id} />;
}

import { ComponentsShowcaseClient } from "@/components/components-showcase";
import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import { componentsData } from "@/components/components-data";
import { DemoRegistry } from "@/components/demo-registry";

const validIds = componentsData.map((c) => c.id);

const nameMap: Record<string, string> = componentsData.reduce((acc, curr) => {
  acc[curr.id] = curr.name;
  return acc;
}, {} as Record<string, string>);

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

  let componentCode = `// ${id} code placeholder\n// Component file not found`;
  try {
    const filePath = path.join(process.cwd(), "components", `${id}.tsx`);
    componentCode = await fs.readFile(filePath, "utf8");
  } catch (error) {
    // Fallback if the component file doesn't exist
  }

  let demoCode = `// Demo code placeholder\n// Demo file not found`;
  try {
    const demoPath = path.join(process.cwd(), "components", "demos", `${id}-demo.tsx`);
    demoCode = await fs.readFile(demoPath, "utf8");
  } catch (error) {
    // Fallback if registry reading fails
  }

  const DemoComponent = DemoRegistry[id] || null;

  return (
    <ComponentsShowcaseClient componentId={id} componentCode={componentCode} demoCode={demoCode}>
      {DemoComponent ? <DemoComponent /> : null}
    </ComponentsShowcaseClient>
  );
}

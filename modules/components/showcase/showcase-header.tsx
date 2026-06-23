import { ShowcaseComponent } from "@/data/components-data";

export function ShowcaseHeader({ component }: { component: ShowcaseComponent }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl md:text-2xl font-bold tracking-tight font-mono text-primary">
        {component.name}
      </h2>
      <p className="text-sm md:text-base text-muted-foreground max-w-3xl leading-relaxed">
        {component.description}
      </p>
    </div>
  );
}

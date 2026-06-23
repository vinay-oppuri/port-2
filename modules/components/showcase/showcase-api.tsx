import { ShowcaseComponent } from "@/data/components-data";

export function ShowcaseApi({ component }: { component: ShowcaseComponent }) {
  if (!component.props || component.props.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xs text-muted-foreground uppercase tracking-widest font-bold font-mono border-b border-border pb-2">
        API Reference
      </h3>

      <div className="w-full overflow-hidden rounded-xl border border-foreground/5 bg-muted/40 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="border-b border-foreground/5 bg-background text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
              <tr>
                <th className="p-4 font-bold w-1/4">Property</th>
                <th className="p-4 font-bold w-1/4">Type</th>
                <th className="p-4 font-bold w-1/6">Default</th>
                <th className="p-4 font-bold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-foreground/90">
              {component.props.map((prop, idx) => (
                <tr key={idx} className="hover:bg-muted/40 transition-colors">
                  <td className="p-4 font-mono font-semibold text-zinc-900 dark:text-zinc-100">{prop.name}</td>
                  <td className="p-4 text-indigo-600 dark:text-indigo-400 font-mono text-[11px]">{prop.type}</td>
                  <td className="p-4 font-mono text-muted-foreground">{prop.default || "-"}</td>
                  <td className="p-4 font-sans text-muted-foreground leading-relaxed">{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

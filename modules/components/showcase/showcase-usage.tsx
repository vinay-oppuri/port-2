import { ShowcaseComponent } from "@/data/components-data";

export function ShowcaseUsage({ component }: { component: ShowcaseComponent }) {
  if (!component.usageImport && !component.usageCode) return null;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xs text-muted-foreground uppercase tracking-widest font-bold font-mono border-b border-border pb-2">
        Usage
      </h3>

      {component.usageImport && (
        <div className="flex flex-col gap-2.5">
          <p className="text-sm text-muted-foreground">Import structural context hooks or wrappers:</p>
          <div className="relative rounded-xl bg-muted/40 px-4 py-2.5 overflow-hidden shadow-inner">
            <code className="text-xs font-mono text-foreground">
              <span className="text-purple-400">import</span> {"{"} <span className="text-sky-300">{component.name.replace(/\s+/g, '')}</span> {"}"} <span className="text-purple-400">from</span> <span className="text-amber-200">"{component.usageImport.split('from "')[1]?.replace('"', '') || component.usageImport.split('from ')[1]?.replace(/["']/g, '')}"</span>
            </code>
          </div>
        </div>
      )}

      {component.usageCode && (
        <div className="flex flex-col gap-2.5 mt-2">
          <p className="text-sm text-muted-foreground">Inject elements into target views:</p>
          <div className="relative rounded-xl bg-muted/40 p-4 overflow-hidden shadow-inner">
            <pre className="text-xs font-mono overflow-x-auto text-foreground scrollbar-none">
              <code>{component.usageCode}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

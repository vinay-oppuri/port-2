"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ShowcaseComponent } from "@/data/components-data";

export function ShowcaseInstallation({
  component,
  componentCode,
}: {
  component: ShowcaseComponent;
  componentCode: string;
}) {
  const [copiedInstall, setCopiedInstall] = useState(false);

  if (!component.installation) return null;

  const handleCopyInstall = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xs text-muted-foreground uppercase tracking-widest font-bold font-mono border-b border-border pb-2">
        Installation
      </h3>

      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="h-9 mb-4 p-0.5 bg-muted/40! rounded-lg w-fit border-foreground/5!">
          <TabsTrigger disabled value="cli" className="px-3 py-1 text-xs font-medium rounded-md transition-all data-[state=active]:bg-background! data-[state=active]:text-foreground! data-[state=active]:shadow-sm! text-muted-foreground! hover:text-foreground! border-none!">CLI</TabsTrigger>
          <TabsTrigger value="manual" className="px-3 py-1 text-xs font-medium rounded-md transition-all data-[state=active]:bg-background! data-[state=active]:text-foreground! data-[state=active]:shadow-sm! text-muted-foreground! hover:text-foreground! border-none!">Manual</TabsTrigger>
        </TabsList>

        <TabsContent value="cli" className="flex flex-col gap-3 mt-0 focus-visible:ring-0">
          <p className="text-sm text-muted-foreground">Run the initialization command inside your workspace directory:</p>

          <div className="flex items-center gap-1 rounded-lg w-fit bg-muted/40 p-1 mb-2">
            <button className="px-3 py-1 text-xs font-medium bg-background shadow-sm rounded text-foreground font-mono">npm</button>
            <button className="px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground font-mono transition-colors">pnpm</button>
            <button className="px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground font-mono transition-colors">yarn</button>
            <button className="px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground font-mono transition-colors">bun</button>
          </div>

          <div className="relative rounded-2xl bg-muted/40 overflow-hidden flex items-center justify-between px-4 py-2 shadow-inner">
            <code className="text-xs font-mono select-all text-foreground">{component.installation}</code>
            <button
              aria-label="Copy installation command"
              onClick={() => handleCopyInstall(component.installation!)}
              className="p-2 hover:bg-background rounded-lg text-foreground transition-all active:scale-95"
            >
              {copiedInstall ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
          </div>
        </TabsContent>

        <TabsContent value="manual" className="flex flex-col gap-3 mt-0 focus-visible:ring-0">
          <p className="text-sm text-muted-foreground">Generate a primitive architecture file and transplant the implementation directly:</p>
          <div className="relative rounded-xl border border-foreground/5 bg-muted/40 text-foreground overflow-hidden flex flex-col max-h-100 shadow-md">
            <div className="relative flex items-center justify-between p-3 border-b border-foreground/5 bg-background select-none font-mono">
              <span className="text-[11px] text-muted-foreground font-semibold tracking-wide">
                {component.id}.tsx
              </span>
              <button
                aria-label="Copy component code"
                onClick={() => handleCopyInstall(componentCode)}
                className="absolute right-2 flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-muted/40 hover:bg-muted/60 text-foreground! border border-foreground/5! cursor-pointer transition-all active:scale-95"
              >
                {copiedInstall ? (
                  <>
                    <Check size={12} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-auto font-mono text-xs leading-relaxed text-zinc-200 flex-1 thin-scrollbar">
              <code>{componentCode}</code>
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

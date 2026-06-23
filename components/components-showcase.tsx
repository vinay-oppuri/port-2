"use client";

import { useState } from "react";
import { Copy, Check, Eye, Code, Expand } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { componentsData } from "@/components/components-data";

export function ComponentsShowcaseClient({
  componentId,
  componentCode,
  demoCode,
  children,
}: {
  componentId: string;
  componentCode: string;
  demoCode: string;
  children?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);

  const activeComponent = componentsData.find((c) => c.id === componentId) || componentsData[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(demoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyInstall = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full text-foreground max-w-7xl mx-auto px-2 py-6">
      {/* Component Header Metadata */}
      <div className="flex flex-col gap-2 pb-5">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-sans text-zinc-900 dark:text-zinc-50">
          {activeComponent.name}
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-3xl leading-relaxed">
          {activeComponent.description}
        </p>
      </div>

      {/* Main Tabs Workspace */}
      <Tabs defaultValue="preview" className="w-full rounded-xl border border-foreground/5! overflow-hidden shadow-sm flex flex-col">
        {/* Navigation / Control Bar */}
        <div className="flex items-center justify-between p-1 border-b border-foreground/5 bg-background! dark:bg-zinc-900/50 select-none">
          <TabsList className="bg-transparent gap-1 h-9">
            <TabsTrigger
              value="preview"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all data-[state=active]:bg-muted/40! data-[state=active]:text-foreground! data-[state=active]:shadow-sm! text-muted-foreground! hover:text-foreground! border-none!"
            >
              <Eye size={13} />
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all data-[state=active]:bg-muted/40! data-[state=active]:text-foreground! data-[state=active]:shadow-sm! text-muted-foreground! hover:text-foreground! border-none!"
            >
              <Code size={13} />
              Code
            </TabsTrigger>
          </TabsList>

          {/* Context Utility Operations */}
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="inline-flex items-center justify-center p-2 text-muted-foreground hover:text-foreground hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer rounded-lg border border-transparent hover:border-border/50"
                  aria-label="Expand Preview"
                >
                  <Expand size={14} />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-full p-0 overflow-hidden bg-background border-border h-[80vh] rounded-xl shadow-2xl">
                <DialogTitle className="sr-only">{activeComponent.name} Fullscreen Preview</DialogTitle>
                <div
                  className="w-full h-full flex items-center justify-center relative bg-card/45"
                  style={{
                    backgroundImage: "radial-gradient(var(--border) 1.2px, transparent 1.2px)",
                    backgroundSize: "16px 16px",
                  }}
                >
                  <div className="relative z-10 p-6 w-full h-full flex items-center justify-center overflow-auto">
                    {children}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Preview Tab View Window */}
        <TabsContent value="preview" className="m-0 border-none outline-none focus-visible:ring-0">
          <div className="flex flex-col">
            <div
              className="relative w-full bg-card/45 p-8 md:p-12 flex items-center justify-center overflow-hidden min-h-[350px] group"
              style={{
                backgroundImage: "radial-gradient(var(--border) 1.2px, transparent 1.2px)",
                backgroundSize: "16px 16px",
              }}
            >
              {children ? (
                children
              ) : (
                <div className="p-8 flex flex-col items-center text-center max-w-sm w-full gap-3 bg-background border border-border/80 rounded-xl shadow-sm">
                  <h4 className="font-semibold text-sm text-foreground">Preview Empty</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Interactive demo for <b>{activeComponent.name}</b> is not yet registered. Add your JSX wrapper elements to activate the live playground.
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Code Content View Window */}
        <TabsContent value="code" className="m-0 border-none outline-none focus-visible:ring-0">
          <div className="relative flex flex-col h-[350px] group bg-[#0a0a0a]">
            <button
              onClick={handleCopyCode}
              aria-label="Copy demo code"
              className="w-fit absolute top-4 right-4 flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded bg-foreground/5 hover:bg-foreground/10 text-foreground border border-foreground/10 cursor-pointer transition-all opacity-0 group-hover:opacity-100 z-10"
            >
              {copied ? (
                <>
                  <Check size={11} className="text-emerald-500" />
                  <span className="text-emerald-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={11} />
                  <span>Copy</span>
                </>
              )}
            </button>
            <pre className="p-4 overflow-auto font-mono text-xs leading-relaxed text-zinc-100 flex-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
              <code className="block select-all">{demoCode}</code>
            </pre>
          </div>
        </TabsContent>
      </Tabs>

      {/* Structured Documentation Section */}
      <div className="flex flex-col gap-14 mt-8 w-full pb-16">
        {/* INSTALLATION SPECIFICATIONS */}
        {activeComponent.installation && (
          <div className="flex flex-col gap-4">
            <h3 className="text-xs text-muted-foreground uppercase tracking-widest font-bold font-mono border-b border-border pb-2">
              Installation
            </h3>

            <Tabs defaultValue="cli" className="w-full">
              <TabsList className="h-9 mb-4 p-0.5 bg-muted/40! rounded-lg w-fit border-foreground/5!">
                <TabsTrigger value="cli" className="px-3 py-1 text-xs font-medium rounded-md transition-all data-[state=active]:bg-background! data-[state=active]:text-foreground! data-[state=active]:shadow-sm! text-muted-foreground! hover:text-foreground! border-none!">CLI</TabsTrigger>
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
                  <code className="text-xs font-mono select-all text-foreground">{activeComponent.installation}</code>
                  <button
                    aria-label="Copy installation command"
                    onClick={() => handleCopyInstall(activeComponent.installation!)}
                    className="p-2 hover:bg-background rounded-lg text-foreground transition-all active:scale-95"
                  >
                    {copiedInstall ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </TabsContent>

              <TabsContent value="manual" className="flex flex-col gap-3 mt-0 focus-visible:ring-0">
                <p className="text-sm text-muted-foreground">Generate a primitive architecture file and transplant the implementation directly:</p>
                <div className="relative rounded-xl border border-foreground/5 bg-muted/40 text-foreground overflow-hidden flex flex-col h-[380px] shadow-md">
                  <div className="relative flex items-center justify-between p-3 border-b border-foreground/5 bg-background select-none font-mono">
                    <span className="text-[11px] text-muted-foreground font-semibold tracking-wide">
                      {activeComponent.id}.tsx
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
                  <pre className="p-4 overflow-auto font-mono text-xs leading-relaxed text-zinc-200 flex-1 scrollbar-thin scrollbar-thumb-zinc-800">
                    <code>{componentCode}</code>
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* DEPLOYMENT AND CONSUMPTION USAGE */}
        {(activeComponent.usageImport || activeComponent.usageCode) && (
          <div className="flex flex-col gap-4">
            <h3 className="text-xs text-muted-foreground uppercase tracking-widest font-bold font-mono border-b border-border pb-2">
              Usage
            </h3>

            {activeComponent.usageImport && (
              <div className="flex flex-col gap-2.5">
                <p className="text-sm text-muted-foreground">Import structural context hooks or wrappers:</p>
                <div className="relative rounded-xl bg-muted/40 px-4 py-2.5 overflow-hidden shadow-inner">
                  <code className="text-xs font-mono text-foreground">
                    <span className="text-purple-400">import</span> {"{"} <span className="text-sky-300">{activeComponent.name.replace(/\s+/g, '')}</span> {"}"} <span className="text-purple-400">from</span> <span className="text-amber-200">"{activeComponent.usageImport.split('from "')[1]?.replace('"', '') || activeComponent.usageImport.split('from ')[1]?.replace(/["']/g, '')}"</span>
                  </code>
                </div>
              </div>
            )}

            {activeComponent.usageCode && (
              <div className="flex flex-col gap-2.5 mt-2">
                <p className="text-sm text-muted-foreground">Inject elements into target views:</p>
                <div className="relative rounded-xl bg-muted/40 p-4 overflow-hidden shadow-inner">
                  <pre className="text-xs font-mono overflow-x-auto text-foreground scrollbar-none">
                    <code>{activeComponent.usageCode}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* RUNTIME PROPS DECLARATION INTERFACE */}
        {activeComponent.props && activeComponent.props.length > 0 && (
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
                    {activeComponent.props.map((prop, idx) => (
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
        )}
      </div>
    </div>
  );
}
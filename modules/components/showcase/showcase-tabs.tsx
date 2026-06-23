"use client";

import { useState } from "react";
import { Copy, Check, Eye, Code, Expand } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { ShowcaseComponent } from "@/data/components-data";

export function ShowcaseTabs({
  component,
  demoCode,
  children,
}: {
  component: ShowcaseComponent;
  demoCode: string;
  children?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(demoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
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
              <DialogTitle className="sr-only">{component.name} Fullscreen Preview</DialogTitle>
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
            className="relative w-full bg-card/50 p-8 md:p-12 flex items-center justify-center overflow-hidden min-h-90 group"
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
                  Interactive demo for <b>{component.name}</b> is not yet registered. Add your JSX wrapper elements to activate the live playground.
                </p>
              </div>
            )}
          </div>
        </div>
      </TabsContent>

      {/* Code Content View Window */}
      <TabsContent value="code" className="m-0 border-none outline-none focus-visible:ring-0">
        <div className="relative flex flex-col h-[350px] group bg-muted/50">
          <button
            onClick={handleCopyCode}
            aria-label="Copy demo code"
            className="w-fit absolute top-4 right-4 flex items-center gap-1 text-xs px-2 py-1 rounded bg-foreground/5 backdrop-blur-md hover:bg-foreground/10 text-foreground border border-foreground/10 cursor-pointer transition-all opacity-0 group-hover:opacity-100 z-10"
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
          <pre className="p-4 overflow-auto font-mono text-xs leading-relaxed text-primary flex-1 thin-scrollbar">
            <code className="block select-all">{demoCode}</code>
          </pre>
        </div>
      </TabsContent>
    </Tabs>
  );
}

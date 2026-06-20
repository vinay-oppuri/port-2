"use client";

import { useState } from "react";
import { Copy, Check, Eye, Code } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ShowcaseComponent {
  id: string;
  name: string;
  description: string;
  code: string;
  docs: string;
}

const componentsData: ShowcaseComponent[] = [
  {
    id: "clay-tilt-card",
    name: "Clay Tilt Card",
    description: "A premium 3D tilt card effect with interactive springy rotation and dynamic cursor-aligned glare spotlights.",
    code: `// Clay Tilt Card code placeholder
// Add your custom ClayTiltCard implementation here.`,
    docs: "### Setup\nNo installation steps registered yet."
  },
  {
    id: "magnetic-button",
    name: "Magnetic Button",
    description: "A highly tactile spring-loaded button. It detects the mouse position and magnetically pulls toward the cursor.",
    code: `// Magnetic Button code placeholder
// Add your custom MagneticButton implementation here.`,
    docs: "### Setup\nNo installation steps registered yet."
  },
  {
    id: "hover-reveal-text",
    name: "Hover Reveal Text",
    description: "A text display component that reveals an organic glowing backdrop gradient and floating highlights when hovered.",
    code: `// Hover Reveal Text code placeholder
// Add your custom HoverRevealText implementation here.`,
    docs: "### Setup\nNo installation steps registered yet."
  },
  {
    id: "retro-terminal",
    name: "Retro Terminal",
    description: "An interactive CLI shell widget displaying system status, mock commands, and running build configurations.",
    code: `// Retro Terminal code placeholder
// Add your custom RetroTerminal implementation here.`,
    docs: "### Setup\nNo installation steps registered yet."
  }
];

export function ComponentsShowcaseClient({ componentId }: { componentId: string }) {
  const [copied, setCopied] = useState(false);

  const activeComponent = componentsData.find((c) => c.id === componentId) || componentsData[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeComponent.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 w-full text-foreground">
      {/* Component Header Metadata */}
      <div className="flex flex-col gap-1 border-b border-foreground/10 pb-4">
        <div className="flex items-center gap-2">
        </div>
        <h2 className="text-xl md:text-2xl font-bold mt-1 font-sans">{activeComponent.name}</h2>
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
          {activeComponent.description}
        </p>
      </div>

      {/* Action Tabs utilizing native Shadcn Tabs primitive */}
      <Tabs defaultValue="preview" className="w-full flex flex-col gap-4">
        <TabsList className="font-sans">
          <TabsTrigger value="preview" className="flex items-center gap-1.5 cursor-pointer">
            <Eye size={12} />
            <span>Preview</span>
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center gap-1.5 cursor-pointer">
            <Code size={12} />
            <span>Code</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab content renders */}
        <TabsContent value="preview">
          <div className="flex flex-col gap-4">
            {/* Dot Grid Showcase Box */}
            <div
              className="relative w-full rounded-2xl border border-foreground/10 bg-card/45 p-8 md:p-12 flex items-center justify-center overflow-hidden min-h-[300px]"
              style={{
                backgroundImage: "radial-gradient(var(--border) 1.2px, transparent 1.2px)",
                backgroundSize: "16px 16px",
              }}
            >
              {/* Empty State Showcase Card inside Preview Grid */}
              <div className="p-8 flex flex-col items-center text-center max-w-sm w-full gap-4 relative z-20">
                <div className="flex flex-col gap-1.5 font-mono">
                  <h4 className="font-bold text-sm text-foreground">Preview Empty</h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Interactive demo for <b>{activeComponent.name}</b> is not yet registered. Add your JSX wrapper elements to activate the live playground.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code">
          <div className="relative rounded-xl border border-foreground/10 bg-secondary/15 overflow-hidden flex flex-col h-[350px]">
            <div className="flex items-center justify-between px-4 py-2 border-b border-foreground/10 bg-foreground/5 select-none font-mono">
              <span className="text-[10px] text-muted-foreground uppercase font-bold">
                {activeComponent.id}.tsx
              </span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded bg-foreground/5 hover:bg-foreground/10 text-foreground border border-foreground/10 cursor-pointer transition-all"
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
            </div>
            <pre className="p-4 overflow-auto font-mono text-[11px] leading-relaxed text-foreground/50 flex-1 thin-scrollbar">
              <code>{activeComponent.code}</code>
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

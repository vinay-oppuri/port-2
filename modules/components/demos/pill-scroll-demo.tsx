"use client";

import { useState } from "react";
import PillScroll, { TOC_INTERFACE } from "@/modules/components/comps/pill-scroll";

export default function PillScrollDemo() {
  const [activeItem, setActiveItem] = useState<TOC_INTERFACE | undefined>(undefined);

  const tocData: TOC_INTERFACE[] = [
    { name: "Introduction", info: "1 min" },
    { name: "Getting Started", info: "2 min" },
    { name: "Usage", info: "5 min" },
    { name: "API Reference", info: "3 min" },
  ];

  return (
    <div className="relative h-[400px] w-full rounded-xl border border-foreground/5 bg-background overflow-hidden flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-4 mb-16">
        <h3 className="text-xl font-bold">Pill Scroll Demo</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Click the floating pill to open the Table of Contents. Scroll inside the page to see the progress ring update.
        </p>
      </div>

      <div className="absolute bottom-6">
        <PillScroll
          title="On this page"
          data={tocData}
          value={activeItem}
          setValue={setActiveItem}
        />
      </div>
    </div>
  );
}

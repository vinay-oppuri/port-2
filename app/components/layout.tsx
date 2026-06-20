"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Layers, Home, ChevronLeft, ChevronRight } from "lucide-react";
import DynamicScrollIslandTOC, { TOC_INTERFACE } from "@/components/ui/dynamic-scroll";
import { cn } from "@/lib/utils";

const componentsList = [
  { id: "clay-tilt-card", name: "Clay Tilt Card"},
  { id: "magnetic-button", name: "Magnetic Button"},
  { id: "hover-reveal-text", name: "Hover Reveal Text"},
  { id: "retro-terminal", name: "Retro Terminal"}
];

const tocData: TOC_INTERFACE[] = componentsList.map((comp) => ({
  name: comp.name,
  value: comp.id,
}));

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const activeId = pathname.split("/").pop() || "";
  const activeComponent = componentsList.find((c) => c.id === activeId);
  const activeIndex = componentsList.findIndex((c) => c.id === activeId);
  const isSlugPage = componentsList.some((c) => c.id === activeId);

  const handlePrev = () => {
    let newIndex = activeIndex - 1;
    if (activeIndex === -1 || newIndex < 0) {
      newIndex = componentsList.length - 1;
    }
    router.push(`/components/${componentsList[newIndex].id}`);
  };

  const handleNext = () => {
    let newIndex = activeIndex + 1;
    if (activeIndex === -1 || newIndex >= componentsList.length) {
      newIndex = 0;
    }
    router.push(`/components/${componentsList[newIndex].id}`);
  };

  const handleSelect = (item: TOC_INTERFACE) => {
    if (item.value) {
      router.push(`/components/${item.value}`);
    }
  };

  const currentValue = tocData.find((t) => t.value === activeId) || tocData[0];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto py-6 px-4 font-sans text-foreground">
      
      {/* Topbar Header */}
      <header className="flex justify-between items-center border-b border-foreground/10 pb-4 mt-8 md:mt-24 mb-6 relative">
        <Link
          href="/components"
          className={cn(
            "text-base font-bold hover:opacity-85 transition-all flex items-center gap-1.5",
            pathname === "/components" && "text-ring"
          )}
        >
          <Home size={16} />
          <span>Components Library</span>
        </Link>

        {/* Action Controls Container */}
        <div className="flex items-center gap-2">
          {/* Prev & Next Navigation Buttons */}
          <div className="flex items-center gap-1 p-1 clay bg-foreground/5! border border-foreground/10 rounded-lg">
            <button
              onClick={handlePrev}
              title="Previous Component"
              className="p-1 rounded hover:bg-foreground/5 text-foreground/80 hover:text-foreground cursor-pointer transition-all flex items-center justify-center"
            >
              <ChevronLeft size={14} />
            </button>
            <div className="w-px h-3 bg-foreground/15" />
            <button
              onClick={handleNext}
              title="Next Component"
              className="p-1 rounded hover:bg-foreground/5 text-foreground/80 hover:text-foreground cursor-pointer transition-all flex items-center justify-center"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation & Workspace Panels */}
      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Left Sidebar Links */}
        {isSlugPage && (
          <aside className="hidden fixed top-40 left-30 w-full md:w-56 md:flex flex-col gap-4 shrink-0">
            <div className="text-xs uppercase text-muted-foreground font-bold tracking-wider px-2">
              Components List
            </div>
            <nav className="flex md:flex-col flex-wrap gap-2">
              {componentsList.map((comp) => {
                const isActive = comp.id === activeId;
                return (
                  <Link
                    key={comp.id}
                    href={`/components/${comp.id}`}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center justify-between border",
                      isActive
                        ? "clay-badge bg-foreground/5! border-foreground/15 text-foreground"
                        : "bg-transparent border-transparent hover:bg-foreground/5 text-foreground/75 hover:text-foreground"
                    )}
                  >
                    <span>{comp.name}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        )}

        {/* Dynamic Nested Route Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      {/* Mobile Floating Navigation Pill (Dynamic Island style dd-scroll) */}
      {activeId && activeComponent && (
        <div className="fixed font-sans bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
          <DynamicScrollIslandTOC
            title="Component Selector"
            data={tocData}
            value={currentValue}
            setValue={handleSelect}
          />
        </div>
      )}
    </div>
  );
}

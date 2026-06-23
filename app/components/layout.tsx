"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Layers, Home, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import DynamicScrollIslandTOC, { TOC_INTERFACE } from "@/components/ui/dynamic-scroll";
import { cn } from "@/lib/utils";
import { componentsData } from "@/data/components-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const componentsList = componentsData.map(comp => ({
  id: comp.id,
  name: comp.name
}));

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
    <div className="flex flex-col w-full max-w-4xl mx-auto p-4 font-sans text-foreground">
      {pathname !== "/components" && (
        <header className="flex justify-between items-center pb-4 mt-8 md:mt-24 mb-0 relative">
          <Link
            href="/components"
            className={cn(
              "text-sm md:text-base text-muted-foreground font-mono tracking-tighter hover:opacity-85 transition-all flex items-center gap-1.5",
              pathname === "/components" && "text-ring"
            )}
          >
            <ArrowLeft className="mr-1 h-3 md:h-4 w-3 md:w-4" /> Back to Components
          </Link>

          {/* Action Controls Container */}
          <div className="flex items-center gap-3">
            {/* Quick Jump Dropdown */}
            <div className="hidden sm:block">
              <Select value={activeId} onValueChange={(val) => router.push(`/components/${val}`)}>
                <SelectTrigger className="h-8 w-[180px] text-xs! clay">
                  <SelectValue placeholder="Select Component" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] border-foreground/5!">
                  {componentsList.map((comp) => (
                    <SelectItem key={comp.id} value={comp.id} className="text-xs cursor-pointer">
                      {comp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Prev & Next Navigation Buttons */}
            <div className="flex items-center gap-1 p-1 clay bg-muted/40 border border-foreground/5 rounded-lg">
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
      )}

      {/* Navigation & Workspace Panels */}
      <div className="flex flex-col md:flex-row gap-8 w-full">
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

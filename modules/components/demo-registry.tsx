import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export const DemoRegistry: Record<string, ComponentType> = {
  "char-animation": dynamic(() => import("@/modules/components/demos/char-animation-demo")),
  "random-box": dynamic(() => import("@/modules/components/demos/random-box-demo")),
  "pill-scroll": dynamic(() => import("@/modules/components/demos/pill-scroll-demo")),
  "iphone": dynamic(() => import("@/modules/components/demos/iphone-demo")),
  // Register new component demos here mapping their ID to their dynamic import
};

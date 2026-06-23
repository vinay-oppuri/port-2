import dynamic from "next/dynamic";

export const DemoRegistry: Record<string, React.ComponentType<any>> = {
  "char-animation": dynamic(() => import("@/components/demos/char-animation-demo")),
  "random-box": dynamic(() => import("@/components/demos/random-box-demo")),
  // Register new component demos here mapping their ID to their dynamic import
};

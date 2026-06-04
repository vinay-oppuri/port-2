"use client"

import Link from "@/components/ui/link";
import { socialLinks } from "@/data";
import { useSyncExternalStore } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const SocialLinks = () => {
  const mounted = useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );

  if (!mounted) return null

  return (
    <div
      className="
        fixed z-50 hidden md:flex flex-col items-center
        left-0 bottom-auto top-1/2 -translate-y-1/2 translate-x-0
        gap-4 shadow-inner shadow-foreground/5
        bg-foreground/2 backdrop-blur-lg 
        px-4 py-6 rounded-r-2xl
      "
    >
      {socialLinks.map((link) => (
        <Tooltip key={link.name}>
          <TooltipTrigger asChild>
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-foreground! group"
            >
              {link.icon}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="font-semibold">{link.name}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

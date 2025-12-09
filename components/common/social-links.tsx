"use client"

import Link from "next/link";
import { socialLinks } from "@/lib/hero.config";
import { useEffect, useState } from "react";

export const SocialLinks = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if(!mounted) return null

  return (
    <div
      className="
        fixed 
        bottom-0 left-1/2 -translate-x-1/2 
        md:left-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0
        flex md:flex-col items-center 
        gap-4
        bg-foreground/5 backdrop-blur-lg 
        px-4 md:px-4 py-2 md:py-6
        rounded-t-2xl md:rounded-r-2xl md:rounded-none shadow-lg
      "
    >
      {socialLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white w-7 h-7 flex items-center justify-center"
        >
          {link.icon}
        </Link>
      ))}
    </div>
  );
};
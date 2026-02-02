"use client";

import { useEffect, useState } from "react";
import { TextHoverEffect } from "../ui/text-hover-effect";
import Link from "next/link";
import { ArrowRight, Hexagon } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaDiscord, FaWhatsapp } from "react-icons/fa";
import { AvatarLogo } from "../common/AvatarLogo";
import { Input } from "../ui/input";
import { socialLinks } from "@/lib/hero.config";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { navLinks } from "./1-Header";

const Footer = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <footer className="w-full relative overflow-hidden md:py-4 py-2 mb-10 md:mb-0 bg-background">
      {/* Pre-footer large text */}
      <div className="h-70 flex items-center justify-center md:py-6 py-0 mb-0">
        <TextHoverEffect text="ViNAY" />
      </div>

      <div className="w-full flex flex-col items-center justify-center mx-auto px-2 md:px-6 border-t border-foreground/10 pt-8 md:pt-16">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
          {/* Brand & Newsletter - Spans 5 columns */}
          <div className="w-full md:w-auto space-y-6 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <AvatarLogo className="w-full h-full rounded-full text-ring" />
              </div>
              <span className="text-xl font-bold tracking-wider text-foreground">ViNAY OPPURI</span>
            </div>

            <p className="text-muted-foreground max-w-sm">
              I&apos;m a software engineer who loves building cool stuff, passionate about technology and always looking for new challenges.
            </p>

            <div className="w-[80%] relative max-w-sm mt-4">
              <div className="flex items-center justify-center relative">
                <Input
                  type="email"
                  placeholder="Enter your feedback..."
                  className="w-full rounded-lg py-3 px-4 pr-12 transition-all placeholder:text-muted-foreground/50 text-foreground"
                />
                <button className="absolute right-1 top-1 h-6 w-6 my-autonnnn bg-primary text-primary-foreground rounded-md flex items-center justify-center hover:opacity-90 transition-opacity">
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Links Sections - Spans 7 columns */}
          <div className="w-full md:w-auto flex items-center justify-center md:justify-end gap-12 md:gap-8">

            {/* Company Column */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold tracking-wider text-foreground/80 uppercase">Navigate</h4>
              <ul className="space-y-2">
                {navLinks.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Column */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold tracking-wider text-foreground/80 uppercase">Connect</h4>
              <ul className="space-y-2">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full border-t border-foreground/10 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-auto text-xs text-muted-foreground font-mono text-center md:text-left">
                // PUBLISHED_BY_VINAY_OPPURI
          </div>

          <div className="w-full md:w-auto flex items-center justify-center md:justify-end gap-2">
            {socialLinks.map((link) => (
              <Tooltip key={link.name}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 flex items-center justify-center"
                  >
                    {link.icon}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{link.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}

            <div className="h-4 w-px bg-foreground/10 mx-2"></div>

            {/* Status Indicator */}
            <div className="flex items-center gap-2 bg-secondary/30 px-3 py-1.5 rounded-full border border-foreground/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-medium tracking-wide text-green-500">ALL SYSTEMS NORMAL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
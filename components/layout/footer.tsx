"use client";

import { cloneElement, isValidElement } from "react";
import Link from "@/components/ui/link";
import { heroConfig, siteEmail, socialLinks } from "@/data";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { FeedbackDialog } from "./feedback-dialog";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Resume", href: "/resume" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const renderMonochromeIcon = (icon: React.ReactNode) => {
    if (!isValidElement(icon)) return icon;

    return cloneElement(
      icon as React.ReactElement<{ className?: string }>,
      { className: "w-4 h-4 text-foreground/70!" }
    );
  }

  return (
    <footer className="w-full bg-background px-4 pb-18 md:pb-24 pt-10">
      <div className="flex flex-col md:flex-row md:justify-between gap-8 border-t border-foreground/10 pt-8">
        
        {/* Top Mobile / Left Desktop */}
        <div className="flex flex-row md:flex-col justify-between md:justify-start gap-4 md:gap-12 w-full md:w-auto">
          
          {/* Left Section: Navigate */}
          <nav aria-label="Footer navigation" className="space-y-3">
            <div className="uppercase font-mono text-xs text-muted-foreground font-medium tracking-wider">
              Navigate
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 md:flex md:flex-wrap md:items-center md:gap-6">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Desktop Copyright (Hidden on Mobile) */}
          <div className="hidden md:flex flex-col gap-1.5 text-xs font-mono text-foreground/40">
            <p>&copy; {currentYear} {heroConfig.name}. All rights reserved.</p>
            <p>Available for selected full-stack and AI projects.</p>
          </div>

          {/* Mobile Right Section: Connect & Feedback (Hidden on Desktop, rendered here for mobile row layout) */}
          <div className="flex md:hidden flex-col gap-4 items-end text-right shrink-0">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase font-mono tracking-wider text-foreground/50">
                Connect
              </p>
              <div className="flex flex-wrap items-center gap-2 justify-end">
                {socialLinks.map((link) => (
                  <Tooltip key={link.name}>
                    <TooltipTrigger asChild>
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.name}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:border-foreground/20 hover:bg-foreground/5 hover:text-foreground"
                      >
                        {renderMonochromeIcon(link.icon)}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{link.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
            <FeedbackDialog />
          </div>
        </div>

        {/* Desktop Right Section: Connect & Feedback (Hidden on Mobile) */}
        <div className="hidden md:flex flex-col gap-8 items-end text-right shrink-0">
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase font-mono tracking-wider text-foreground/50">
              Connect
            </p>
            <div className="flex flex-wrap items-center gap-2 justify-end">
              {socialLinks.map((link) => (
                <Tooltip key={`desktop-${link.name}`}>
                  <TooltipTrigger asChild>
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:border-foreground/20 hover:bg-foreground/5 hover:text-foreground"
                    >
                      {renderMonochromeIcon(link.icon)}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{link.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
          <FeedbackDialog />
        </div>

      </div>

      {/* Mobile Copyright (Hidden on Desktop) */}
      <div className="flex md:hidden flex-col gap-1.5 text-xs font-mono text-foreground/40 mt-8">
        <p>&copy; {currentYear} {heroConfig.name}. All rights reserved.</p>
        <p>Available for selected full-stack and AI projects.</p>
      </div>
      
    </footer>
  );
};

export default Footer;

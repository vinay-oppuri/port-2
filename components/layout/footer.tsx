"use client";

import { cloneElement, isValidElement } from "react";
import Link from "@/components/ui/link";
import { heroConfig, siteEmail, socialLinks } from "@/data";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { FeedbackDialog } from "./feedback-dialog";
import { Mail, MapPin } from "lucide-react";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Blogs", href: "/blogs" },
  { name: "Resume", href: "/resume" },
  { name: "Contact", href: "/contact" },
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
    <footer className="w-full bg-background px-2 pb-18 md:pb-24 pt-10">
      <div className="border-t border-foreground/10 pt-8">
        <div className="grid gap-8 md:grid-cols-[1.35fr_1fr]">
          <div className="space-y-4">
            <div className="space-y-2">
              <Link
                href="/"
                className="inline-flex text-sm font-semibold text-foreground transition-colors hover:text-foreground/80"
              >
                {heroConfig.name}
              </Link>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                {heroConfig.description.about}
              </p>
            </div>

            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link
                href={`mailto:${siteEmail}`}
                className="inline-flex w-fit items-center gap-2 transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                {siteEmail}
              </Link>
              <p className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Hyderabad, India
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-[1fr_auto]">
            <nav aria-label="Footer navigation" className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-foreground/50">
                Navigate
              </p>
              <div className="grid gap-2">
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

            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-foreground/50">
                Connect
              </p>
              <div className="flex items-center gap-2">
                {socialLinks.map((link) => (
                  <Tooltip key={link.name}>
                    <TooltipTrigger asChild>
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.name}
                        className="flex h-9 w-9 items-center justify-center rounded-full  text-muted-foreground transition-colors hover:border-foreground/20 hover:bg-foreground/5 hover:text-foreground"
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
              <FeedbackDialog />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-foreground/10 pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {currentYear} {heroConfig.name}. All rights reserved.</p>
          <p className="font-mono text-foreground/40">Available for selected full-stack and AI projects.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

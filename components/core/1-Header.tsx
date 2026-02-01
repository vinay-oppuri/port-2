"use client";

import { useState, useEffect } from "react";
import { AvatarLogo } from "../common/AvatarLogo";
import Link from "next/link";
import { heroConfig } from "@/lib/hero.config";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { circleBlurTopRightCSS, injectAnimationStyles } from "@/lib/theme-animation";

const navLinks = [
  { name: "Work", href: "/experience" },
  { name: "Blogs", href: "/blogs" },
  { name: "Projects", href: "/projects" },
]

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    document.startViewTransition?.(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    });

    injectAnimationStyles(circleBlurTopRightCSS);
  };


  useEffect(() => setMounted(true), [])
  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center backdrop-blur-lg sm:px-6 border-b border-foreground/5 px-4 py-4">

      {/* Left: Avatar + Desktop Nav */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Avatar */}
        <Link href="/">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:scale-105 transition-transform">
            <AvatarLogo className="w-full h-full rounded-full text-sky-300 dark:text-orange-400 transition-colors duration-300" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-foreground text-sm font-medium">
          {navLinks.map((link, idx) => (
            <Link href={link.href} key={idx} className="group relative">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-foreground/80 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Right: Theme Toggle + Mobile Menu Button */}
      <div className="flex items-center space-x-3 ">
        {/* Theme Toggle */}
        <Link href='https://github.com/vinay-oppuri' target="_blank">
          <Button variant='outline' className="text-foreground/80">
            <span className="text-xs">Github</span> <FaGithub />
          </Button>
        </Link>
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme == 'dark' ? <Sun /> : <Moon />}
        </Button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden rounded-lg text-foreground/80 hover:bg-muted transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size='18' /> : <Menu size='18' />}
        </button>
      </div>

      {/* Mobile Navigation Menu (Simple Dropdown) */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-b border-foreground/5 rounded-b-lg shadow-lg md:hidden animate-in slide-in-from-top-5 fade-in duration-200">
          <nav className="flex flex-col p-4 space-y-1">
            <Link
              href="/experience"
              onClick={() => setMenuOpen(false)}
              className="p-3 rounded-md hover:bg-muted transition-colors text-foreground font-medium text-sm"
            >
              Work
            </Link>
            <Link
              href="/blogs"
              onClick={() => setMenuOpen(false)}
              className="p-3 rounded-md hover:bg-muted transition-colors text-foreground font-medium text-sm"
            >
              Blogs
            </Link>
            <Link
              href="/projects"
              onClick={() => setMenuOpen(false)}
              className="p-3 rounded-md hover:bg-muted transition-colors text-foreground font-medium text-sm"
            >
              Projects
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
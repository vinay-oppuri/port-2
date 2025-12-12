"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroConfig } from "@/lib/hero.config";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { circleBlurTopRightCSS, injectAnimationStyles } from "@/lib/theme-animation";

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
          <div className="relative w-9 h-9 sm:w-10 sm:h-10">
            <Image
              src="/avatar-light.png"
              alt={heroConfig.name}
              fill
              className="rounded-full object-cover transition-transform hover:scale-105 dark:hidden"
            />
            <Image
              src="/avatar-dark.png"
              alt={heroConfig.name}
              fill
              className="rounded-full object-cover transition-transform hover:scale-105 hidden dark:block"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-foreground text-sm font-medium">
          <Link href="/experience">Work</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/projects">Projects</Link>
        </nav>
      </div>

      {/* Right: Theme Toggle + Mobile Menu Button */}
      <div className="flex items-center space-x-3">
        {/* Theme Toggle */}
        <Link href='www.github.com/vinay-oppuri'>
          <Button variant='outline' className="text-foreground/80">
            <span className="text-xs">Github</span> <FaGithub />
          </Button>
        </Link>
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme == 'dark' ? <Sun /> : <Moon />}
        </Button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-background/90 backdrop-blur-xs border-b border-border/40 shadow-lg md:hidden animate-slide-down">
          <nav className="flex flex-col p-4 space-y-4 text-foreground text-base font-medium">
            <Link href="/work" onClick={() => setMenuOpen(false)}>
              Work
            </Link>
            <Link href="/blogs" onClick={() => setMenuOpen(false)}>
              Blogs
            </Link>
            <Link href="/projects" onClick={() => setMenuOpen(false)}>
              Projects
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroConfig } from "@/lib/hero.config";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center backdrop-blur-lg sm:px-6 border-b border-border/40 px-4 py-4 md:px-0">
      
      {/* Left: Avatar + Desktop Nav */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Avatar */}
        <Link href="/">
          <Image
            src={theme === "dark" ? "/avatar-dark.png" : "/avatar-light.png"}
            alt={heroConfig.name}
            width={36}
            height={36}
            className="rounded-full sm:w-10 sm:h-10 transition-transform hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-foreground text-sm font-medium">
          <Link href="/work">Work</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/projects">Projects</Link>
        </nav>
      </div>

      {/* Right: Theme Toggle + Mobile Menu Button */}
      <div className="flex items-center space-x-3">
        {/* Theme Toggle */}
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
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
        <div className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg border-b border-border/40 shadow-lg md:hidden animate-slide-down">
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
};
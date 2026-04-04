"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Moon, Sun, X, MenuIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { circleBlurTopRightCSS, injectAnimationStyles } from "@/lib/theme-animation";
import Logo from "../common/Logo";

export const navLinks = [
  { name: "Work", href: "/experience" },
  { name: "Blogs", href: "/blogs" },
  { name: "Projects", href: "/projects" },
  // {name: "Contact", href: "/contact"}
]

const HeaderSkeleton = () => (
  <header
    aria-hidden="true"
    className="sticky top-0 z-50 w-full max-w-3xl mx-auto flex justify-between items-center backdrop-blur-lg px-4 py-4 animate-pulse"
  >
    <div className="flex items-center space-x-3 sm:space-x-8">
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-foreground/10" />
      <div className="hidden md:flex items-center gap-1.5 mt-0.5">
        <div className="h-3 w-2 rounded bg-foreground/10" />
        <div className="h-2.5 w-12 rounded bg-foreground/10" />
      </div>
    </div>

    <div className="hidden md:flex items-center space-x-6">
      <div className="h-3 w-10 rounded bg-foreground/10" />
      <div className="h-3 w-12 rounded bg-foreground/10" />
      <div className="h-3 w-14 rounded bg-foreground/10" />
    </div>

    <div className="flex items-center space-x-3">
      <div className="flex items-center gap-1 rounded-full p-1 clay">
        <div className="h-6 w-14 rounded-full bg-foreground/10" />
        <div className="w-px h-4 bg-foreground/15" />
        <div className="h-6 w-6 rounded-full bg-foreground/10" />
      </div>
      <div className="md:hidden h-5 w-5 rounded bg-foreground/10" />
    </div>
  </header>
);

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );

  const toggleTheme = () => {
    document.startViewTransition?.(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    });

    injectAnimationStyles(circleBlurTopRightCSS);
  };

  if (!mounted) return <HeaderSkeleton />;

  return (
    <header className={`sticky top-0 z-50 w-full max-w-3xl mx-auto flex flex-col backdrop-blur-lg transition-all ${menuOpen ? "bg-background/95" : ""}`}>
      <div className="flex justify-between items-center px-4 py-4 w-full">
        <div className="flex items-center space-x-3 sm:space-x-8">
          <Link
            href="/"
            className="flex items-center gap-0 group"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:scale-105 transition-transform">
              <Logo className="w-full h-full rounded-full text-foreground" />
            </div>
            <span className="hidden md:block ml-3 text-[18px] font-thin text-foreground/15 mx-2 leading-none select-none">
              /
            </span>
            <span className="hidden md:block text-[11px] uppercase tracking-[0.07em] text-foreground/25 font-normal leading-none mt-0.5">
              portfolio
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-foreground text-sm font-medium">
          {navLinks.map((link, idx) => (
            <Link href={link.href} key={idx} className="group relative opacity-80 hover:opacity-100 transition-opacity duration-300">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-foreground transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Right: Theme Toggle + Mobile Menu Button */}
        <div className="flex items-center space-x-3 ">

          {/* Theme Toggle */}
          <div className="flex items-center gap-1 p-1 clay rounded-full!">
            <Button variant="ghost" size="sm" className="rounded-full gap-2 px-3 h-8 text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all clay-interactive" asChild>
              <Link href='https://github.com/vinay-oppuri' target="_blank" className="flex items-center gap-2">
                <span className="text-xs font-medium">Github</span>
                <FaGithub size={16} />
              </Link>
            </Button>

            <div className="w-px h-4 bg-foreground/15" />

            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all clay-interactive" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-full text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu - Simple Dropdown Overlay */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-background md:hidden animate-in slide-in-from-top-2 fade-in duration-200">
          <nav className="flex flex-col px-2 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors font-medium text-sm"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
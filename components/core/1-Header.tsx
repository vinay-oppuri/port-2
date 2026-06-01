"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Moon, Sun, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Experience", href: "/experience" },
  { name: "Resume", href: "/resume" },
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
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return <HeaderSkeleton />;

  return (
    <header className={`sticky top-0 z-50 w-full max-w-3xl mx-auto flex flex-col backdrop-blur-lg transition-all ${menuOpen ? "bg-background/95" : ""}`}>
      <div className="flex justify-between items-center px-4 py-4 w-full">
        <nav className="flex items-center space-x-6 text-foreground text-sm font-medium">
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
            <Button variant="ghost" size="sm" className="rounded-full gap-2 px-3 h-8 text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all clay-interactive">
              <Search />
            </Button>

            <div className="w-px h-4 bg-foreground/15" />

            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all clay-interactive" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
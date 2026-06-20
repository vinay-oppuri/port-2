"use client";

import { useSyncExternalStore } from "react";
import Link from "@/components/ui/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Logo from "../common/Logo";
import { SearchCommand } from "../search-command";
import { playClickSound } from "@/hooks/use-sound";

export const navLinks = [
  { name: "Work", href: "/experience" },
  // { name: "Blogs", href: "/blogs" },
  { name: "Projects", href: "/projects" },
  { name: "Components", href: "/components" },
]

const HeaderSkeleton = () => (
  <header
    aria-hidden="true"
    className="sticky top-0 z-50 w-full max-w-3xl mx-auto flex flex-col backdrop-blur-lg animate-pulse"
  >
    <div className="flex justify-between items-center px-4 py-4 w-full font-mono tracking-tighter">
      <div className="flex items-center space-x-3 sm:space-x-8">
        <div className="flex items-center gap-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-foreground/10" />
          <span className="hidden md:block ml-3 text-[18px] font-thin text-foreground/15 mx-2 leading-none select-none">
            /
          </span>
          <div className="hidden md:block h-3 w-16 rounded bg-foreground/10 mt-0.5" />
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-6">
        {navLinks.map((_, idx) => (
          <div key={idx} className="h-3 w-12 rounded bg-foreground/10" />
        ))}
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center gap-1 p-1 clay rounded-full!">
          <div className="h-8 w-20 rounded-full bg-foreground/10" />
          <div className="w-px h-4 bg-foreground/15" />
          <div className="h-8 w-8 rounded-full bg-foreground/10" />
        </div>
      </div>
    </div>
  </header>
);

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );

  const toggleTheme = () => {
    playClickSound();
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return <HeaderSkeleton />;

  return (
    <header className="sticky top-0 z-50 w-full max-w-3xl mx-auto flex flex-col backdrop-blur-lg transition-all">
      <div className="flex justify-between items-center px-4 py-4 w-full font-mono tracking-tighter">
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
            <SearchCommand />
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

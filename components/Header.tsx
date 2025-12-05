"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { heroConfig } from '@/lib/hero.config';
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SocialLinks } from './SocialLinks';

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setMounted(true)
  }, []) 

  if (!mounted) {
    return null;
  }

  return (
    <header className="flex justify-between items-center py-4 px-6">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Image src={heroConfig.avatar} alt={heroConfig.name} width={40} height={40} className="rounded-full" />
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/work" className="text-white hover:text-gray-300">
            Work
          </Link>
          <Link href="/blogs" className="text-white hover:text-gray-300">
            Blogs
          </Link>
          <Link href="/projects" className="text-white hover:text-gray-300">
            Projects
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
};

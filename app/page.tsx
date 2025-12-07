"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Home/1-Header";
import { heroConfig } from "@/lib/hero.config";
import { Button } from "@/components/ui/button";
import SpotifyNowPlaying from "@/components/Home/2-Spotify";
import ExperienceCard from "@/components/Home/3-Experience";
import ProjectsPage from "@/components/Home/4-Projects";
import AboutPage from "@/components/Home/5-AboutMe";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Page = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <section className="flex flex-col items-start space-y-6 mx-auto md:mt-12 w-full px-4 py-4 md:px-8">

      {/* Avatar */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-foreground/10 flex items-center justify-center overflow-hidden">
        <Image
          src={theme === "dark" ? "/avatar-dark.png" : "/avatar-light.png"}
          width={130}
          height={130}
          alt="Avatar"
          className="rounded-full object-cover"
        />
      </div>

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-foreground">
        Hi, I'm {heroConfig.name} — <span className="text-muted-foreground"> {heroConfig.title} </span>
      </h1>

      {/* DESCRIPTION */}
      <p className="text-md sm:text-lg text-gray-400 leading-relaxed flex flex-wrap gap-2">
        I build interactive web apps using
        {heroConfig.skills.map((skill, i) => (
          <span
            key={i}
            className="flex items-center justify-center px-2 py-1 bg-foreground/10 border border-dashed border-muted-foreground/40 rounded-lg text-xs sm:text-sm font-medium text-foreground gap-1"
          >
            {skill.component}
            {skill.name}
          </span>
        ))}
        . I focus on <b>UI</b> design, explore <b>Three.js</b>, and am passionate about <b>Agentic AI</b> systems.
      </p>


      {/* Buttons */}
      <div className="w-full flex flex-col md:flex-row justify-center md:justify-end gap-3 p-4 md:p-0">
        {heroConfig.buttons.map((button) => (
          <Button
            asChild
            key={button.text}
            variant={button.variant === "outline" ? "outline" : "default"}
            className="px-4 py-2 text-sm sm:text-base"
          >
            <Link href={button.href}>
              {button.icon} {button.text}
            </Link>
          </Button>
        ))}
      </div>


      {/* Sections */}
      <div className="w-full flex flex-col pt-6 gap-6">
        <SpotifyNowPlaying />
        <ExperienceCard />
        <ProjectsPage />
        <AboutPage />
      </div>
    </section>
  );
};

export default Page;
"use client";

import Link from "next/link";
import { heroConfig } from "@/lib/hero.config";
import { Button } from "@/components/ui/button";
import ExperienceCard from "@/components/core/3-Experience";
import ProjectsPage from "@/components/core/4-Projects";
import AboutPage from "@/components/core/5-AboutMe";
import GitHubActivity from "@/components/core/7-GithubActivity";
import ContactDialog from "@/components/core/8-Contact";
import { AvatarLogo } from "@/components/common/AvatarLogo";
import { useState, useEffect } from "react";

const Page = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroConfig.title.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col items-start space-y-4 mx-auto mt-12 md:mt-24 w-full px-4 py-4 md:px-8">
      <div className="flex items-center justify-center gap-6">
        <AvatarLogo className="w-20 h-20 sm:w-24 sm:h-24 rounded-full text-ring/85 dark:text-ring" />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-foreground">
            Hi, I&apos;m {heroConfig.name}
          </h1>
          <div className="h-5 overflow-hidden relative inline-flex items-center py-2">
            <span
              key={index}
              className="text-muted-foreground text-xs md:text-base font-medium animate-in slide-in-from-bottom-2 duration-300 fill-mode-both"
            >
              {heroConfig.title[index]}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 my-4">
        {heroConfig.info.map((info, i) => (
          <div key={i} className="flex items-center gap-3 text-foreground/85">
            <div className="flex items-center justify-center w-9 h-9 bg-foreground/2! border border-white/5 rounded-lg text-foreground/60 shadow-sm">
              {info.logo}
            </div>
            <span className="text-xs sm:text-sm">{info.name}</span>
          </div>
        ))}
      </div>

      <p className="text-sm sm:text-base min-[1920px]:text-lg text-muted-foreground leading-relaxed flex flex-wrap gap-2">
        I build interactive web apps using
        {heroConfig.mainSkills.map((skill, i) => (
          <Link
            key={i}
            href={skill.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-1.5 py-0.5 bg-foreground/10 border border-dashed border-foreground/20 skill-inner-shadow rounded-sm text-xs font-medium text-foreground gap-1"
          >
            {skill.component}
            {skill.name}
          </Link>
        ))}
        . I focus on <b>UI</b> design, explore <b>Three.js</b>, and I&apos;m
        passionate about <b>Agentic AI</b> systems.
      </p>

      <div className="w-full flex flex-row justify-start gap-3 md:p-0 mt-2">
        {heroConfig.buttons.map((button) => (
          <Button
            asChild
            key={button.text}
            variant={button.variant === "outline" ? "outline" : "default"}
            className="h-9 md:h-10 text-xs md:text-sm hover:-translate-y-1 transition-all! duration-300"
          >
            <Link href={button.href}>
              {button.icon} {button.text}
            </Link>
          </Button>
        ))}
      </div>

      <div className="w-full flex flex-col pt-6 gap-6">
        <ExperienceCard />
        <ProjectsPage />
        <AboutPage />
        <GitHubActivity />
        <ContactDialog />
      </div>
    </section>
  );
};

export default Page;

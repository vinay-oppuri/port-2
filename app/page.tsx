"use client";

import Link from "next/link";
import { heroConfig } from "@/data";
import { Button } from "@/components/ui/button";
import ExperienceCard from "@/components/core/3-Experience";
import ProjectsPage from "@/components/core/4-Projects";
import AboutPage from "@/components/core/5-AboutMe";
import GitHubActivity from "@/components/core/7-GithubActivity";
import ContactDialog from "@/components/core/8-Contact";
import { AvatarLogo } from "@/components/common/AvatarLogo";
import RotatingText from "@/components/react-bits/RotatingText";
import { SendIcon } from "lucide-react";
import { SiGoogledocs } from "react-icons/si";
import SkillsSection from "@/components/core/6-Skills";

const Page = () => {
  return (
    <section className="flex flex-col items-start space-y-4 mx-auto mt-12 md:mt-24 w-full px-4 py-4 md:px-8">
      <div className="flex items-center justify-center gap-3 md:gap-6">
        <AvatarLogo className="w-18 h-full sm:w-24 rounded-full text-ring/85 dark:text-ring" />
        <div className="flex flex-col gap-1 md:gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-foreground">
            Hi, I&apos;m {heroConfig.name}
          </h1>
          <div className="h-5 overflow-hidden relative inline-flex items-center py-2">
            <RotatingText
              texts={["AI Engineer", "Full Stack Developer"]}
              mainClassName="text-muted-foreground text-base md:text-lg font-medium"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
        </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 my-4">
        {heroConfig.info.map((info, i) => (
          <div key={i} className="flex items-center gap-3 text-muted-foreground leading-relaxed ">
            <div className="flex items-center justify-center w-9 h-9 clay">
              {info.logo}
            </div>
            <span className="text-sm md:text-base font-semibold">{info.name}</span>
          </div>
        ))}
      </div>

      <p className="text-sm sm:text-base min-[1920px]:text-lg text-muted-foreground leading-relaxed flex flex-wrap mt-4 gap-2">
        I build interactive web apps using
        {heroConfig.mainSkills.map((skill, i) => (
          <Link
            key={i}
            href={skill.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-2 py-1 clay-badge text-xs font-medium text-foreground gap-1.5 clay-interactive"
          >
            {skill.component}
            {skill.name}
          </Link>
        ))}
        . I focus on <b>UI</b> design, explore <b>Three.js</b>, and I&apos;m
        passionate about <b>Agentic AI</b> systems.
      </p>

      <div className="w-full flex flex-row justify-start gap-3 md:p-0 mt-2">
        <Button
          asChild
          variant="outline"
          className="h-9 md:h-10 text-xs md:text-sm clay hover:-translate-y-1 transition-all duration-300"
        >
          <Link href='/resume'>
            <SiGoogledocs /> Resume / CV
          </Link>
        </Button>
        <Button
          asChild
          variant="default"
          className="h-9 md:h-10 text-xs md:text-sm clay bg-foreground! shadow-none! hover:-translate-y-1 transition-all duration-300"
        >
          <Link href='/contact'>
            <SendIcon /> Get in touch
          </Link>
        </Button>
      </div>

      <div className="w-full flex flex-col pt-6 gap-6">
        <ExperienceCard />
        <ProjectsPage />
        <AboutPage />
        <SkillsSection />
        <GitHubActivity />
        <ContactDialog />
      </div>
    </section>
  );
};

export default Page;

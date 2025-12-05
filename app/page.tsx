"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Home/1-Header";
import { heroConfig, skillComponents } from "@/lib/hero.config";
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Renders description text + skill pills
  const renderDescription = (
    template: string,
    skills: typeof heroConfig.skills
  ) => {
    const parts = template.split(/(\{skills:\d+\})/g);

    return (
      <p className="text-base sm:text-lg text-gray-400 mb-6 max-w-xl text-left leading-relaxed">
        {parts.map((part, index) => {
          if (part.startsWith("{skills:") && part.endsWith("}")) {
            const skillIndex = Number(part.replace(/\D/g, ""));
            const skill = skills[skillIndex];
            const Icon =
              skillComponents[skill.component as keyof typeof skillComponents];

            return (
              <span
                key={index}
                className="inline-flex items-center mx-1 sm:mx-2 px-2 sm:px-3 py-1 bg-muted rounded-full text-xs sm:text-sm font-medium text-secondary-foreground"
              >
                <Link
                  href={skill.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-1 flex items-center justify-center"
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
                {skill.name}
              </span>
            );
          }

          return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
        })}
      </p>
    );
  };

  return (
    <>
      <Header />

      <section className="flex flex-col items-start space-y-6 mx-auto w-full p-4">
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
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-foreground">
          Hi, I'm {heroConfig.name} — {heroConfig.title}
        </h1>

        {/* Description */}
        {renderDescription(heroConfig.description.template, heroConfig.skills)}

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          {heroConfig.buttons.map((button) => (
            <Button
              asChild
              key={button.text}
              variant={button.variant === "outline" ? "outline" : "default"}
              className="px-4 py-2 text-sm sm:text-base"
            >
              <Link href={button.href}>{button.text}</Link>
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
    </>
  );
};

export default Page;
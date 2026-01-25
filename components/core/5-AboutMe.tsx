"use client";

import Image from "next/image";
import { heroConfig } from "@/lib/hero.config";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

const AboutPage = () => {
  const skills = heroConfig.skills;
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="flex flex-col gap-8 sm:gap-10 w-full px-2 md:px-0 py-4">

      {/* Heading */}
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">About</p>
        <h1 className="text-2xl font-bold text-foreground">Me</h1>
      </div>

      {/* Main About Section */}
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10">

        {/* Left: Avatar */}
        <div className="rounded-xl overflow-hidden h-40 w-40 md:h-60 md:w-60 aspect-square relative shrink-0">
          <Image
            src="/avatars/avatar-light.png"
            alt="Profile Avatar"
            fill
            className="rounded-lg object-cover w-full h-full dark:hidden"
          />
          <Image
            src="/avatars/avatar-dark.png"
            alt="Profile Avatar"
            fill
            className="rounded-lg object-cover w-full h-full hidden dark:block"
          />
        </div>

        {/* Right: Info */}
        <div className="flex flex-col gap-4 max-w-2xl text-left">

          <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
            {heroConfig.fullName}
          </h2>

          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            {heroConfig.description.about ||
              "I'm a Full Stack developer who loves building digital products, solving real-world problems, and experimenting with modern tech stacks."}
          </p>

        </div>
      </div>

      {/* Skills Section */}
      <div className="flex flex-col gap-2 mt-4">
        <p className="font-semibold text-foreground">Skills</p>

        <div className="flex flex-col gap-4">
          {(Object.entries(skills) as [string, typeof skills.frontend][]).map(([category, items]) => (
            <div key={category} className="flex flex-col gap-2">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-medium">{category}</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {items.map((skill, index) => (
                  <Badge key={index} variant='secondary' className="border border-dashed border-muted-foreground/40 rounded-sm px-2 py-1 gap-1">
                    <span>{skill.component}</span>
                    <span>{skill.name}</span>
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
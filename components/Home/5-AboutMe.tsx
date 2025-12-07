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
      <div>
        <p className="text-sm text-muted-foreground">About</p>
        <h1 className="text-2xl font-bold text-foreground">Me</h1>
      </div>

      {/* Main About Section */}
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10">

        {/* Left: Avatar */}
        <div className="rounded-xl overflow-hidden mx-auto md:mx-0 w-40 h-40 md:w-150 md:h-70">
          <Image
            src={theme === "dark" ? "/avatar-dark.png" : "/avatar-light.png"}
            alt="Profile Avatar"
            width={500}
            height={500}
            className="rounded-lg object-cover w-full h-full"
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

          {/* Skills Section */}
          <div className="flex flex-col gap-2 mt-4">
            <p className="font-semibold text-foreground">Skills</p>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {skills.map((skill, index) => (
                <Badge key={index} variant='secondary' className="border border-dashed border-muted-foreground/40 rounded-sm px-2 py-1 gap-1">
                  <span>{skill.component}</span>
                  <span>{skill.name}</span>
                </Badge>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutPage;
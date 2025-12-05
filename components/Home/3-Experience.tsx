"use client";

import Image from "next/image";
import { Badge } from "../ui/badge";
import { SiMongodb, SiNextdotjs, SiNodedotjs, SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";

const ExperienceCard = () => {

  const technologies = [
    {name: 'Next.js', logo: <SiNextdotjs/> },
    {name: 'Tailwind CSS', logo: <SiTailwindcss/> },
    {name: 'React', logo: <SiReact/> },
    {name: 'TypeScript', logo: <SiTypescript/>},
    {name: 'Node.js', logo: <SiNodedotjs/>},
    {name: 'MongoDB', logo: <SiMongodb/>},
  ]
            

  return (
    <div className="flex flex-col rounded-xl max-w-4xl gap-6 w-full px-4 py-16 md:px-0">

      {/* Section Title */}
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">Featured</p>
        <h2 className="text-2xl font-semibold text-foreground">Experience</h2>
      </div>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

        {/* Left */}
        <div className="flex items-start gap-3">
          {/* Company Icon */}
          <Image
            src='/collegelogo.png'
            alt="Logo"
            width={60}
            height={60}
            className="bg-foreground/5 rounded-sm p-2 border border-foreground/20"
          />

          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2">
              <h3 className="text-lg font-bold text-secondary-foreground">
                IIIT Raichur Website
              </h3>

              <Badge className="bg-green-600/20 flex items-center gap-1 rounded-lg text-foreground py-0">
                <span className="text-lg md:text-xl font-bold text-green-500">•</span>
                Working
              </Badge>
            </div>

            <p className="text-md text-muted-foreground">Full Stack Developer</p>
          </div>
        </div>

        {/* Right Side (dates + location) */}
        <div className="text-left sm:text-right">
          <p className="text-secondary-foreground text-sm sm:text-base">
            August 2025 – Present
          </p>
          <p className="text-muted-foreground text-sm">India (Remote)</p>
        </div>
      </div>

      {/* Technologies */}
      <div>
        <p className="text-lg font-semibold text-foreground mb-3">
          Technologies & Tools
        </p>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, id) => (
            <Badge variant='default' key={id} className="flex gap-2">
              {tech.logo} {tech.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Bullet Points */}
      <ul className="text-muted-foreground space-y-2 text-[15px] leading-relaxed">
        <li className="flex gap-2">
          <span>•</span>
          Built and optimized the entire college website with modern full-stack technologies.
        </li>

        <li className="flex gap-2">
          <span>•</span>
          Implemented dynamic dashboards, authentication, and admin features.
        </li>

        <li className="flex gap-2">
          <span>•</span>
          Improved performance, accessibility, and UI/UX for students & faculty.
        </li>

        <li className="flex gap-2">
          <span>•</span>
          Integrated secure API endpoints and optimized backend workflows.
        </li>
      </ul>
    </div>
  );
};

export default ExperienceCard;

"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Github } from "lucide-react";
import { ProjectsData } from "@/lib/hero.config";
import { Button } from "../ui/button";

const ProjectsPage = () => {
  const projects = ProjectsData.slice(0, 2)

  return (
    <section className="flex flex-col gap-6 w-full px-2 md:px-0 py-4">

      {/* Header */}
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">Featured</p>
        <h1 className="text-2xl font-bold text-foreground">Projects</h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="overflow-hidden bg-white/5 border border-white/10 hover:border-foreground/20 transition rounded-lg p-0"
          >
            {/* IMAGE */}
            <div className="h-40 md:h-48 w-full bg-linear-to-r from-pink-600 to-purple-600">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={600}
                height={300}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* CONTENT */}
            <CardHeader >
              <div className="flex flex-row justify-between items-center gap-2">
                <CardTitle className="text-base sm:text-xl text-foreground">
                  {project.title}
                </CardTitle>

                {/* ICONS */}
                <div className="flex gap-3 text-muted-foreground">
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      className="hover:text-white transition"
                    >
                      <Globe className="h-5 w-5" />
                    </Link>
                  )}

                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="hover:text-white transition"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-2 md:gap-3">

              {/* DESCRIPTION */}
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                {project.description}
              </p>

              {/* TAGS */}
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-2">
                  Technologies
                </p>

                {/* <div className="flex flex-wrap gap-0"> */}
                  {project.tags.map((tag, id) => (
                    <Badge key={id} className="bg-transparent p-1">
                      <span className="text-md">{tag}</span>
                    </Badge>
                  ))}
                {/* </div> */}
              </div>


              {/* FOOTER */}
              <div className="flex flex-row justify-between items-center py-4">
                <Badge
                  variant="secondary"
                  className="bg-green-600/20 dark:text-green-500 text-foreground rounded-md px-3 py-1 text-xs"
                >
                  ● All Systems Operational
                </Badge>

                <span className="text-muted-foreground text-sm hover:underline cursor-pointer">
                  <span className="hidden md:flex">View Details →</span>
                  <span className="flex md:hidden">Details →</span>
                </span>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
      <div className="w-full flex justify-center mt-10 mb-4">
        <Link href="/projects">
          <Button variant='outline' className="px-4 md:px-6 py-2 text-sm md:text-md font-semibold">
            Show all projects
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ProjectsPage;
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Github } from "lucide-react";
import { ProjectsData } from "@/lib/hero.config";

const ProjectsPage = () => {
  const projects = ProjectsData;

  return (
    <section className="flex flex-col gap-6 w-full p-4">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">Featured</p>
        <h1 className="text-2xl font-bold text-foreground">Projects</h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="overflow-hidden bg-white/5 border border-white/10 hover:border-foreground/20 transition rounded-lg"
          >
            {/* IMAGE */}
            <div className="h-40 sm:h-48 w-full bg-linear-to-r from-pink-600 to-purple-600">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={600}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <CardHeader className="pb-2">
              <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2">
                <CardTitle className="text-lg sm:text-xl text-foreground">
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

            <CardContent className="space-y-4">
              
              {/* DESCRIPTION */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.description}
              </p>

              {/* TAGS */}
              <div>
                <p className="text-sm font-semibold text-secondary-foreground mb-2">
                  Technologies
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-foreground/10 text-secondary-foreground px-2 py-0.5 rounded-md text-xs sm:text-sm"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-3">
                <Badge
                  variant="secondary"
                  className="bg-green-600/20 dark:text-green-500 text-foreground rounded-md px-3 py-1 text-xs sm:text-sm"
                >
                  ● All Systems Operational
                </Badge>

                <span className="text-muted-foreground text-sm hover:underline cursor-pointer">
                  View Details →
                </span>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProjectsPage;
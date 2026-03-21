import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Globe, Github } from "lucide-react";
import { ProjectsData } from "@/data";
import { cn } from "@/lib/utils";

type ProjectItem = (typeof ProjectsData)[number];

interface ProjectCardsProps {
  projects: ProjectItem[];
}

export function ProjectCards({ projects }: ProjectCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project) => (
        <Card
          key={project.title}
          className="overflow-hidden p-0 group clay-card clay-interactive"
        >
          <div className="relative h-48 md:h-48 w-full project-bg-ocean overflow-hidden group">
            <div className="absolute top-2 left-2 z-20">
              <Badge
                variant="secondary"
                className={cn(
                  "flex items-center gap-2 text-foreground/90 rounded-md px-2 py-1 text-[10px] border border-white/10 bg-black/40 backdrop-blur-md shadow-sm",
                  project.status === "Building" ? "text-red-100" : "text-emerald-100"
                )}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className={cn(
                      "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                      project.status === "Building" ? "bg-red-400" : "bg-emerald-400"
                    )}
                  />
                  <span
                    className={cn(
                      "relative inline-flex rounded-full h-1.5 w-1.5",
                      project.status === "Building" ? "bg-red-500" : "bg-emerald-500"
                    )}
                  />
                </span>
                <span className="font-semibold tracking-wide uppercase">
                  {project.status === "Building" ? "Building" : "Operational"}
                </span>
              </Badge>
            </div>
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={600}
              height={300}
              className="absolute -bottom-2 left-80 -translate-x-1/2 scale-150 h-auto border-2 border-white/30 shadow-2xl transition-all duration-500 ease-out transform-[perspective(1000px)_rotateX(40deg)_rotateZ(-15deg)]"
            />
          </div>

          <CardHeader>
            <div className="flex flex-row justify-between items-center gap-2">
              <CardTitle className="text-base sm:text-xl text-foreground transition-all duration-300">
                {project.title}
              </CardTitle>

              <div className="flex gap-3 text-muted-foreground/80">
                {project.liveUrl && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} live demo`}
                        className="hover:text-foreground transition-all duration-300 hover:scale-110 active:scale-95"
                      >
                        <Globe className="h-5 w-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Live Demo</p>
                    </TooltipContent>
                  </Tooltip>
                )}

                {project.githubUrl && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub repository`}
                        className="hover:text-foreground transition-all duration-300 hover:scale-110 active:scale-95"
                      >
                        <Github className="h-5 w-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Github Repo</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-2">
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
              {project.description}
            </p>

            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-2">
                Technologies
              </p>

              {project.tags.map((tag, id) => (
                <Tooltip key={id}>
                  <TooltipTrigger asChild>
                    <Badge className="bg-transparent p-1">
                      <span className="text-md">{tag.logo}</span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tag.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            <div className="flex flex-row justify-end items-center pb-4 pt-2">
              <Link
                href={`/projects/${project.id}`}
                className="group/link flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <span className="relative">
                  View Details
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover/link:w-full" />
                </span>
                <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

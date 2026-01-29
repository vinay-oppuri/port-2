
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Github } from "lucide-react";
import { ProjectsData } from "@/lib/hero.config";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="overflow-hidden bg-white/5 border border-white/5 hover:border-white/10 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-500 rounded-lg p-0 group"
          >
            {/* IMAGE */}
            <div className="relative h-48 md:h-48 w-full project-bg-ocean overflow-hidden group">
              <div className="absolute top-2 left-2 z-20">
                <Badge
                  variant="secondary"
                  className={cn("flex items-center gap-2 text-foreground/90 rounded-md px-2 py-1 text-[10px] border border-white/10 bg-black/40 backdrop-blur-md shadow-sm", project.status === "Building" ? "text-red-100" : "text-emerald-100")}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", project.status === "Building" ? "bg-red-400" : "bg-emerald-400")}></span>
                    <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5", project.status === "Building" ? "bg-red-500" : "bg-emerald-500")}></span>
                  </span>
                  <span className="font-semibold tracking-wide uppercase">{project.status === "Building" ? "Building" : "Operational"}</span>
                </Badge>
              </div>
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={600}
                height={300}
                className="absolute -bottom-2 left-80 -translate-x-1/2 scale-150 h-auto border-2 border-white/30 shadow-2xl transition-all duration-500 ease-out transform-[perspective(1000px)_rotateX(40deg)_rotateZ(-15deg)] "
              />
            </div>

            {/* CONTENT */}
            <CardHeader >
              <div className="flex flex-row justify-between items-center gap-2">
                <CardTitle className="text-base sm:text-xl text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300">
                  {project.title}
                </CardTitle>

                {/* ICONS */}
                <div className="flex gap-3 text-muted-foreground/80">
                  {project.liveUrl && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={project.liveUrl}
                          target="_blank"
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
                {/* </div> */}
              </div>


              {/* FOOTER */}
              <div className="flex flex-row justify-end items-center pb-4 pt-2">
                <Link href={`/projects/${project.id}`} className="group/link flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300">
                  <span className="relative">
                    View Details
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover/link:w-full"></span>
                  </span>
                  <span className="group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
      <div className="w-full flex justify-center my-4">
        <Link href="/projects">
          <Button variant='outline' className="text-xs md:text-sm text-primary/80 font-normal group hover:bg-primary/5 hover:text-primary transition-all duration-300 border-white/10 hover:border-primary/20">
            Show all projects
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ProjectsPage;
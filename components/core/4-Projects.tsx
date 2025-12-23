
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
            className="overflow-hidden bg-white/5 border border-white/5 hover:border-foreground/10 hover:shadow-xl hover:shadow-foreground/5 hover:-translate-y-1 transition-all duration-300 rounded-lg p-0"
          >
            {/* IMAGE */}
            <div className="relative h-48 md:h-48 w-full project-bg-ocean overflow-hidden group">
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
                <CardTitle className="text-base sm:text-xl text-foreground">
                  {project.title}
                </CardTitle>

                {/* ICONS */}
                <div className="flex gap-3 text-muted-foreground">
                  {project.liveUrl && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          className="hover:text-foreground transition"
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
                          className="hover:text-foreground transition"
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
              <div className="flex flex-row justify-between items-center pb-4">
                <Badge
                  variant="secondary"
                  className={cn("text-foreground/80 rounded-md px-2 py-1 text-xs", project.status === "Building" ? "bg-red-600/20" : "bg-green-600/20")}
                >
                  <span className={cn("text-xs animate-pulse", project.status === "Building" ? "text-red-600" : "text-green-600")}>●</span> 
                  {project.status === "Building" ? "Building" : "All Systems Operational"}
                </Badge>

                <Link href={`/projects/${project.id}`} className="text-muted-foreground text-sm hover:underline cursor-pointer">
                  <span className="hidden md:flex">View Details →</span>
                  <span className="flex md:hidden">Details →</span>
                </Link>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
      <div className="w-full flex justify-center my-4">
        <Link href="/projects">
          <Button variant='outline' className="text-xs md:text-sm text-primary/80 font-normal">
            Show all projects
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ProjectsPage;
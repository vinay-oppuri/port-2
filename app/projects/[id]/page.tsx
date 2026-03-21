import { ProjectsData } from "@/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProjectDetailsPageProps {
  params: Promise<{ id: string }>;
}

const ProjectDetailsPage = async ({ params }: ProjectDetailsPageProps) => {
  const { id } = await params;
  const project = ProjectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto flex flex-col gap-4 px-4 py-8 md:py-12">
      <Link href="/projects">
        <Button variant="secondary" className="text-foreground/80 mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Button>
      </Link>

      <div className="space-y-8">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden project-bg-ocean group shadow-2xl">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={1200}
            height={600}
            className="absolute -bottom-4 left-60 md:left-160 -translate-x-1/2 scale-120 md:scale-140 h-auto w-[90%] md:w-auto border-2 border-white/30 shadow-2xl transform-[perspective(1000px)_rotateX(20deg)_rotateZ(-10deg)] md:transform-[perspective(1000px)_rotateX(40deg)_rotateZ(-25deg)] object-cover object-top"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            {project.liveUrl && (
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Button>
              </Link>
            )}
            {project.githubUrl && (
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" />
                  GitHub Repo
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="space-y-8">
            {project.features && (
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">What users can do</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </section>
            )}

            {project.motivation && (
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Why I built this</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.motivation}
                </p>
              </section>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Badge
                      variant="secondary"
                      className="p-2 hover:bg-secondary/80 transition-colors"
                    >
                      <span className="text-lg">{tag.logo}</span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tag.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t flex justify-center">
          <Link href="/projects">
            <Button variant="outline" size="lg">
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;

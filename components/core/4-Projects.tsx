
import Link from "next/link";
import { ProjectsData } from "@/lib/hero.config";
import { Button } from "../ui/button";
import { ProjectCards } from "./project-cards";

const ProjectsPage = () => {
  const projects = ProjectsData.slice(0, 2)

  return (
    <section className="flex flex-col gap-6 w-full px-2 md:px-0 py-4">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">Featured</p>
        <h2 className="text-2xl font-bold text-foreground">Projects</h2>
      </div>

      <ProjectCards projects={projects} />
      <div className="w-full flex justify-center my-4">
        <Link href="/projects">
          <Button variant='outline' className="text-xs md:text-sm text-foreground/80 font-normal group hover:bg-foreground/5 hover:text-foreground transition-all duration-300 border-foreground/10 hover:border-foreground/20">
            Show all projects
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ProjectsPage;

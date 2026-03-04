import { ProjectsData } from "@/lib/hero.config";
import { ProjectCards } from "@/components/core/project-cards";

const Page = () => {
  return (
    <section className="flex flex-col gap-6 w-full px-4 py-4 md:px-8">
      <div className="flex flex-col items-center text-center border-b border-foreground/10 gap-3 md:gap-6 mt-6 md:mt-12 mb-4 md:mb-8 py-8 px-4">
        <h1 className="text-3xl md:text-5xl font-bold">Projects</h1>
        <p className="text-md md:text-xl text-muted-foreground font-semibold">
          My projects and work across different technologies and domains.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-2">All Projects</h2>
      <ProjectCards projects={ProjectsData} />
    </section>
  );
};

export default Page;

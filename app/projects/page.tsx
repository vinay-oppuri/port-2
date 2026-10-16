import { ProjectsData } from "@/data";
import { ProjectCards } from "@/modules/home/components/project-cards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "My projects and work across different technologies and domains.",
};

const Page = () => {
  return (
    <section className="flex flex-col gap-6 w-full py-4">
      <div className="flex flex-col items-center text-center border-b border-foreground/10 gap-3 md:gap-6 mt-6 md:mt-12 mb-8 pb-8 px-4">
        <h1 className="text-2xl md:text-3xl font-anton tracking-wide">Projects</h1>
        <p className="text-sm md:text-base text-muted-foreground font-semibold">
          My projects and work across different technologies and domains.
        </p>
      </div>

      <ProjectCards projects={ProjectsData} />
    </section>
  );
};

export default Page;

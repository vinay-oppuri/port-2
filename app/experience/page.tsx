
import { ExperienceList } from "@/components/core/experience-list";
import { experiences } from "@/data";

const Page = () => {
  return (
    <section className="flex flex-col gap-6 w-full px-4 py-4 md:px-8">
      <div className="flex flex-col items-center text-center border-b border-foreground/10 gap-3 md:gap-6 mt-6 md:mt-12 mb-8 pb-8 px-4">
        <h1 className="text-2xl md:text-4xl font-bold">Work Experience</h1>
        <p className="text-sm md:text-lg text-muted-foreground font-semibold">
          My work experience across different companies and roles.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-2">All Experience</h2>
      <ExperienceList items={experiences} />
    </section>
  );
};

export default Page;


import { ExperienceList } from "@/components/core/experience-list";
import { experiences } from "@/lib/hero.config";

const Page = () => {
  return (
    <section className="flex flex-col gap-6 w-full px-6 py-4 md:px-10">
      <div className="flex flex-col items-center text-center border-b gap-3 md:gap-6 mt-6 md:mt-12 mb-4 md:mb-8 p-8">
        <h1 className="text-3xl md:text-5xl font-bold">Work Experience</h1>
        <p className="text-md md:text-xl text-muted-foreground font-semibold">
          My work experience across different companies and roles.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-2">All Experience</h2>
      <ExperienceList items={experiences} />
    </section>
  );
};

export default Page;

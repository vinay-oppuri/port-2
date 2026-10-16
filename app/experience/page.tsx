
import { ExperienceList } from "@/modules/home/components/experience-list";
import { experiences } from "@/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work Experience",
  description: "My work experience across different companies and roles.",
};

const Page = () => {
  return (
    <section className="flex flex-col gap-6 w-full py-4">
      <div className="flex flex-col items-center text-center border-b border-foreground/10 gap-3 md:gap-6 mt-6 md:mt-12 mb-8 pb-8 px-4">
        <h1 className="text-2xl md:text-3xl font-anton tracking-wide">Work Experience</h1>
        <p className="text-sm md:text-base text-muted-foreground font-semibold">
          My work experience across different companies and roles.
        </p>
      </div>

      <ExperienceList items={experiences} />
    </section>
  );
};

export default Page;

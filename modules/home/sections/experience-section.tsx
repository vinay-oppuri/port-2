
import { experiences } from "@/data";
import { Button } from "../../../components/ui/button";
import Link from "@/components/ui/link";
import { ExperienceList } from "../components/experience-list";

const ExperienceAccordion = () => {
  const topExperiences = experiences.slice(0, 2);

  return (
    <div className="w-full mx-auto px-0 py-4">
      <p className="text-sm text-muted-foreground font-mono">Featured</p>
      <h2 className="text-2xl font-semibold mb-8">Experience</h2>
      <ExperienceList items={topExperiences} />

      {/* BOTTOM BUTTON */}
      <div className="w-full flex justify-center my-4">
        <Button asChild variant='outline' className="text-xs md:text-sm text-foreground/80 font-normal group hover:bg-primary/5 hover:text-primary transition-all duration-300 border-foreground/10 hover:border-primary/20">
          <Link href="/experience">
            Show all work experiences
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ExperienceAccordion;

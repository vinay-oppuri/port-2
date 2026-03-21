import { heroConfig } from "@/lib/hero.config";
import { AvatarLogo } from "../common/AvatarLogo";

const AboutPage = () => {
  // Aggregate a flat list of skills for the minimal icon row
  const allSkills = [
    ...heroConfig.skills.frontend,
    ...heroConfig.skills.backend,
  ];

  // Deduplicate by name to have a clean, unique row of icons
  const uniqueSkills = Array.from(new Map(allSkills.map((item) => [item.name, item])).values());

  return (
    <section className="flex flex-col w-full px-2 md:px-0 py-4">

      {/* Heading */}
      <div className="flex flex-col gap-1 mb-6">
        <p className="text-sm text-muted-foreground">About</p>
        <h2 className="text-2xl font-bold text-foreground">Me</h2>
      </div>

      {/* Main About Section */}
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">

        {/* Left: Avatar */}
        <div className="rounded-2xl overflow-hidden h-40 w-40 md:h-52 md:w-52 aspect-square relative shrink-0 clay">
          <AvatarLogo className="w-full h-full text-ring/85 dark:text-ring scale-105 transition-transform duration-300" />
        </div>

        {/* Right: Info */}
        <div className="flex flex-col gap-6 max-w-xl text-left pt-1 md:pt-2">

          <h2 className="text-xl md:text-2xl font-semibold text-foreground">
            {heroConfig.fullName}
          </h2>

          <p className="text-muted-foreground leading-relaxed text-sm">
            {heroConfig.description.about}
          </p>

          {/* Minimal Skills Row */}
          <div className="flex flex-col gap-2 mt-2">
            <p className="text-sm font-semibold text-muted-foreground">Skills</p>
            <div className="flex flex-wrap gap-3 items-center text-foreground/80 [&_svg]:size-5 md:[&_svg]:size-6">
              {uniqueSkills.map((skill, index) => (
                <div key={index} title={skill.name} className="clay p-2 rounded-xl hover:text-foreground transition-colors cursor-pointer hover:-translate-y-1 hover:scale-105 transform duration-200 clay-interactive">
                  {skill.component}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutPage;

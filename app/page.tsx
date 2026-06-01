import Link from "next/link";
import { heroConfig, socialLinks } from "@/data";
// import { AvatarLogo } from "@/components/common/AvatarLogo";
import { Button } from "@/components/ui/button";
import ExperienceCard from "@/components/core/3-Experience";
import ProjectsPage from "@/components/core/4-Projects";
import AboutPage from "@/components/core/5-AboutMe";
import GitHubActivity from "@/components/core/7-GithubActivity";
import ContactDialog from "@/components/core/8-Contact";
import { SendIcon } from "lucide-react";
import { SiGoogledocs } from "react-icons/si";
import SkillsSection from "@/components/core/6-Skills";

const Page = () => {
  return (
    <section className="flex flex-col items-start space-y-4 mx-auto mt-12 w-full px-4 py-4 md:px-8">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 sm:w-18 sm:h-18 bg-muted/30 rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-border/50">
          {/* <AvatarLogo className="w-full h-full text-foreground/90 p-2" /> */}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {heroConfig.name}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-medium">
            AI Engineer
          </p>
        </div>
      </div>

      <div className="flex items-center gap-8 mt-6 mb-2">
        {heroConfig.info.map((info, i) => (
          <div key={i} className={`flex flex-col gap-1.5 ${info.title === "pronouns" && "hidden md:flex"}`}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
              {info.title}
            </span>
            <div className="flex items-center gap-2 text-xs md:text-sm text-foreground font-medium">
              <span className="text-muted-foreground">{info.logo}</span>
              <Link 
                href={info.title === "email" ? `mailto:${info.name}` : '#'}
                className={`${info.title === "email" ? "hover:underline" : "" }` }
              >
                {info.name}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm sm:text-base text-foreground/80 leading-relaxed max-w-2xl">
        <span>{heroConfig.description.about}</span>
        <span>
          {" "}Currently working with{" "}
          {heroConfig.mainSkills.map((skill, i) => {
            const isLast = i === heroConfig.mainSkills.length - 1;
            const isSecondLast = i === heroConfig.mainSkills.length - 2;
            return (
              <span key={i}>
                <Link
                  href={skill.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground hover:underline transition-colors"
                >
                  {skill.name}
                </Link>
                {!isLast && (isSecondLast ? ", and " : ", ")}
                {isLast && "."}
              </span>
            );
          })}
        </span>
      </div>

      <div className="flex items-center gap-5 mt-6 mb-4">
        {socialLinks.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <span className="[&>svg]:w-[18px] [&>svg]:h-[18px] [&>svg]:text-muted-foreground">{link.icon}</span>
            <span className="sr-only">{link.name}</span>
          </Link>
        ))}
      </div>

      <div className="w-full flex flex-col pt-6 gap-6">
        <ExperienceCard />
        <ProjectsPage />
        <AboutPage />
        <SkillsSection />
        <GitHubActivity />
        <ContactDialog />
      </div>
    </section>
  );
};

export default Page;

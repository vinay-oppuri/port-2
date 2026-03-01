import Link from "next/link";
import { heroConfig } from "@/lib/hero.config";
import { Button } from "@/components/ui/button";
import ExperienceCard from "@/components/core/3-Experience";
import ProjectsPage from "@/components/core/4-Projects";
import AboutPage from "@/components/core/5-AboutMe";
import GitHubActivity from "@/components/core/6-GithubActivity";
import ContactDialog from "@/components/core/7-Contact";
import { AvatarLogo } from "@/components/common/AvatarLogo";
import SpotifyLastPlayed from "@/components/core/2-Spotify";

const Page = () => {
  return (
    <section className="flex flex-col items-start space-y-4 mx-auto mt-12 md:mt-24 w-full px-4 py-4 md:px-8">
      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-foreground/10 p-1 flex items-center justify-center overflow-hidden">
        <AvatarLogo className="w-full h-full rounded-full text-ring" />
      </div>

      <h1 className="text-2xl sm:text-3xl min-[1920px]:text-5xl font-bold leading-tight text-foreground">
        Hi, I&apos;m {heroConfig.name} -{" "}
        <span className="text-muted-foreground">{heroConfig.title}</span>
      </h1>

      <p className="text-sm sm:text-base min-[1920px]:text-lg text-muted-foreground leading-relaxed flex flex-wrap gap-2">
        I build interactive web apps using
        {heroConfig.mainSkills.map((skill, i) => (
          <Link
            key={i}
            href={skill.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-2 py-1 bg-foreground/10 border border-dashed border-foreground/20 shadow-inner shadow-foreground/5 rounded-sm text-xs font-medium text-foreground gap-1"
          >
            {skill.component}
            {skill.name}
          </Link>
        ))}
        . I focus on <b>UI</b> design, explore <b>Three.js</b>, and I&apos;m
        passionate about <b>Agentic AI</b> systems.
      </p>

      <div className="w-full flex flex-row justify-start gap-3 md:p-0 mt-2">
        {heroConfig.buttons.map((button) => (
          <Button
            asChild
            key={button.text}
            variant={button.variant === "outline" ? "outline" : "default"}
            className="h-9 md:h-10 text-xs md:text-sm hover:-translate-y-1 transition-all duration-300"
          >
            <Link href={button.href}>
              {button.icon} {button.text}
            </Link>
          </Button>
        ))}
      </div>

      <div className="w-full flex flex-col pt-6 gap-6">
        <SpotifyLastPlayed />
        <ExperienceCard />
        <ProjectsPage />
        <AboutPage />
        <GitHubActivity />
        <ContactDialog />
      </div>
    </section>
  );
};

export default Page;

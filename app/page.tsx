import Link from "@/components/ui/link";
import { heroConfig, siteEmail, socialLinks } from "@/data";
import { Button } from "@/components/ui/button";
import ExperienceCard from "@/modules/home/sections/experience-section";
import ProjectsPage from "@/modules/home/sections/projects-section";
import { AvatarLogo } from "@/components/common/AvatarLogo";
import { TextFlip } from "@/components/ui/text-flip";
import { SendIcon } from "lucide-react";
import { SiGoogledocs } from "react-icons/si";
import dynamic from "next/dynamic";

const GitHubActivity = dynamic(
  () => import("@/modules/home/sections/github-activity-section")
);
const ContactDialog = dynamic(
  () => import("@/modules/home/sections/contact-section")
);
const SkillsSection = dynamic(
  () => import("@/modules/home/sections/skills-section")
);
const DDScroll = dynamic(
  () => import("@/components/common/dd-scroll")
);

const Page = () => {
  return (
    <main className="w-full">
      <DDScroll />
      <section id="hero" className="flex flex-col justify-center items-start space-y-4 mx-auto w-full min-h-screen px-4 py-12 md:px-8">
        <div className="flex items-center justify-center gap-3 md:gap-6 font-mono">
          <AvatarLogo className="w-16 h-full sm:w-20 rounded-lg text-ring/85 dark:text-ring" />
          <div className="flex flex-col gap-1 md:gap-2">
            <h1 className="text-2xl sm:text-3xl font-mono font-bold leading-tight text-foreground">
              {heroConfig.name}
            </h1>
            <div className="h-5 overflow-hidden relative inline-flex items-center py-2">
              <TextFlip
                as="span"
                className="text-muted-foreground text-sm md:text-base font-mono! tracking-tighter!"
                interval={3}
              >
                <span>Applied AI Engineer</span>
                <span>Full Stack Developer</span>
                <span>Generative AI Engineer</span>
              </TextFlip>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 my-4">
          {heroConfig.info.map((info, i) => {
            const isEmail = info.name === siteEmail;

            return (
              <div key={i} className="flex items-center gap-3 text-muted-foreground leading-relaxed ">
                <div className="flex items-center justify-center w-9 h-9 clay">
                  {info.logo}
                </div>
                {isEmail ? (
                  <Link
                    href={`mailto:${info.name}`}
                    className="text-sm md:text-base font-mono tracking-tighter hover:underline underline-offset-4"
                  >
                    {info.name}
                  </Link>
                ) : (
                  <span className="text-sm md:text-base font-mono tracking-tighter">{info.name}</span>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-sm sm:text-base min-[1920px]:text-lg text-muted-foreground leading-relaxed flex flex-wrap font-mono tracking-tighter mt-4 gap-2">
          I build interactive web apps using
          {heroConfig.mainSkills.map((skill, i) => (
            <Link
              key={i}
              href={skill.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-2 py-1 clay-badge text-xs text-foreground gap-1.5 clay-interactive"
            >
              {skill.component}
              {skill.name}
            </Link>
          ))}
          . I focus on <b>UI/UX</b> design, exploring <b>GSAP</b> and I&apos;m passionate about <b>Agentic AI</b> systems.
        </p>

        <div className="w-full flex flex-row justify-start gap-3 md:p-0 mt-2">
          <Button
            asChild
            variant="outline"
            className="h-9 md:h-10 text-xs md:text-sm clay hover:-translate-y-1! transition-all! duration-300! font-mono tracking-tighter!"
          >
            <Link href='/resume'>
              <SiGoogledocs /> Resume / CV
            </Link>
          </Button>
          <Button
            asChild
            variant="default"
            className="h-9 md:h-10 text-xs md:text-sm clay! bg-foreground! shadow-none! hover:-translate-y-1! transition-all! duration-300! font-mono tracking-tighter!"
          >
            <Link href='/contact'>
              <SendIcon /> Get in touch
            </Link>
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="w-8 h-8 flex items-center justify-center clay rounded-sm!">
              {link.icon}
            </Link>
          ))}
        </div>
      </section>

      <section className="w-full flex flex-col gap-6 px-4 md:px-8 mx-auto pb-16">
        <div id="experience"><ExperienceCard /></div>
        <div id="projects"><ProjectsPage /></div>
        <div id="skills"><SkillsSection /></div>
        <div id="github"><GitHubActivity /></div>
        <div id="contact"><ContactDialog /></div>
      </section>
    </main>
  );
};

export default Page;

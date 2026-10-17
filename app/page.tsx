import Link from "@/components/ui/link";
import { heroConfig, siteEmail, socialLinks } from "@/data";
import { Button } from "@/components/ui/button";
import { AvatarLogo } from "@/components/common/AvatarLogo";
import { TextFlip } from "@/components/ui/text-flip";
import { MessageCircleIcon } from "lucide-react";
import { SiGoogledocs } from "react-icons/si";
import dynamic from "next/dynamic";

const ExperienceCard = dynamic(
  () => import("@/modules/home/sections/experience-section")
);
const ProjectsPage = dynamic(
  () => import("@/modules/home/sections/projects-section")
);

const GitHubActivity = dynamic(
  () => import("@/modules/home/sections/github-activity-section")
);
const ContactDialog = dynamic(
  () => import("@/modules/home/sections/contact-section")
);
const SkillsSection = dynamic(
  () => import("@/modules/home/sections/skills-section")
);


const Page = () => {

  return (
    <main className="w-full px-4 sm:px-0">
      <section id="hero" className="flex flex-col justify-center items-start space-y-5 mx-auto w-full min-h-[80vh] py-16 md:py-24">
        <div className="flex items-center gap-4 sm:gap-5">
          <AvatarLogo className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-foreground/10 shrink-0 shadow-xs" />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {heroConfig.name}
            </h1>
            <div className="h-5 overflow-hidden relative inline-flex items-center py-2">
              <TextFlip
                as="span"
                className="text-muted-foreground text-sm sm:text-base"
                interval={3}
              >
                <span>Applied AI Engineer</span>
                <span>Full Stack Developer</span>
                <span>Generative AI Engineer</span>
              </TextFlip>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-muted-foreground">
          <Link
            href={`mailto:${siteEmail}`}
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
          >
            {siteEmail}
          </Link>
        </div>

        <div className="space-y-3 max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed pt-1">
          <p>
            I build thoughtful, interactive web applications with a focus on polished UI/UX and product craftsmanship.
          </p>
          <p>
            Deeply interested in <span className="text-foreground font-medium">Applied AI Engineering</span> and{" "}
            <span className="text-foreground font-medium">Generative AI</span> - designing autonomous agent systems, intelligent interfaces, and production workflows powered by modern foundation models.
          </p>
        </div>

        <div className="w-full flex flex-wrap items-center gap-3 pt-2">
          <Button
            asChild
            variant="custom"
            className="h-9 px-6 text-xs sm:text-sm font-normal rounded-md!"
          >
            <Link href='/contact'>
              <MessageCircleIcon className="w-3.5 h-3.5 fill-current" /> Get in touch
            </Link>
          </Button>
          <Button
            asChild
            variant="customInverted"
            className="h-9 px-6 text-xs sm:text-sm font-normal rounded-md!"
          >
            <Link href='/resume'>
              <SiGoogledocs className="w-3.5 h-3.5" /> Resume / CV
            </Link>
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-2 pt-1">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="w-9 h-9 btn-chat-inverted flex items-center justify-center border border-foreground/10 rounded-md hover:bg-muted/50 transition-colors">
              {link.icon}
            </Link>
          ))}
        </div>
      </section>

      <section className="w-full flex flex-col gap-6 mx-auto pb-16">
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

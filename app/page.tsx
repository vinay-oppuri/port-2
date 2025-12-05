import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { heroConfig, skillComponents } from "@/lib/hero.config";
import { Button } from "@/components/ui/button";
import SpotifyNowPlaying from "@/components/spotify";

const Page = () => {
  // Renders description text + skill pills
  const renderDescription = (
    template: string,
    skills: typeof heroConfig.skills
  ) => {
    const parts = template.split(/(\{skills:\d+\})/g);

    return (
      <p className="text-lg text-gray-400 mb-8 max-w-2xl text-left leading-relaxed">
        {parts.map((part, index) => {
          // Replace {skills:x} with skill icons
          if (part.startsWith("{skills:") && part.endsWith("}")) {
            const skillIndex = Number(part.replace(/\D/g, ""));
            const skill = skills[skillIndex];
            const Icon =
              skillComponents[skill.component as keyof typeof skillComponents];

            return (
              <span
                key={index}
                className="inline-flex items-center mx-2 px-3 py-1 bg-gray-800 rounded-full text-sm font-medium text-white"
              >
                <Link
                  href={skill.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-1 flex items-center justify-center"
                >
                  <Icon className="w-4 h-4" />
                </Link>
                {skill.name}
              </span>
            );
          }

          // Render text normally
          return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
        })}
      </p>
    );
  };

  return (
    <>
      <Header />

      <section className="flex flex-col items-start p-8 space-y-6">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
          <Image src="/avatar.png" width={120} height={120} alt="Avatar" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-foreground">
          Hi, I'm {heroConfig.name} — {heroConfig.title}
        </h1>

        {/* Description */}
        {renderDescription(
          heroConfig.description.template,
          heroConfig.skills
        )}

        {/* Buttons */}
        <div className="flex space-x-4">
          {heroConfig.buttons.map((button) => (
            <Button
              asChild
              key={button.text}
              variant={button.variant === "outline" ? "outline" : "default"}
            >
              <Link href={button.href}>{button.text}</Link>
            </Button>
          ))}
        </div>

        {/* Spotify Widget */}
        <div className="w-full pt-6">
          <SpotifyNowPlaying />
        </div>
      </section>
    </>
  );
};

export default Page;
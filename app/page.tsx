import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { heroConfig, skillComponents } from "@/lib/hero.config";
import { Button } from "@/components/ui/button";
import SpotifyNowPlaying from "@/components/spotify"; // Ensure this path is correct
import SpotifyPlayer from "@/components/spotify";

const Page = () => {
  // Renders template description with embedded skills
  const renderDescription = (
    template: string,
    skills: typeof heroConfig.skills
  ) => {
    const parts = template.split(/(\{skills:\d+\})/g);

    return (
      <p className="text-lg text-gray-400 mb-8 max-w-2xl text-left">
        {parts.map((part, index) => {
          if (part.startsWith("{skills:") && part.endsWith("}")) {
            const skillIndex = parseInt(part.substring(8, part.length - 1), 10);
            const skill = skills[skillIndex];
            if (skill) {
              const SkillIcon =
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
                    className="mr-1 w-4 h-4 flex items-center justify-center"
                  >
                    <SkillIcon />
                  </Link>
                  {skill.name}
                </span>
              );
            }
          }

          const __html = part.replace(/<(\/?)b>/g, "<$1strong>");
          return <span key={index} dangerouslySetInnerHTML={{ __html }} />;
        })}
      </p>
    );
  };

  return (
    <>
      <Header />

      <section className="flex flex-col items-start min-h-[calc(100vh-80px)] p-8">
        {/* Avatar */}
        <div className="flex justify-start mb-8">
          <div className="w-32 h-32 rounded-full bg-gray-600 flex items-center justify-center">
            <Image
              src={heroConfig.avatar}
              alt={heroConfig.name}
              width={120}
              height={120}
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold mb-4 text-white text-left">
          Hi, I'm {heroConfig.name} — {heroConfig.title}
        </h1>

        {/* Description with injected skills */}
        {renderDescription(
          heroConfig.description.template,
          heroConfig.skills
        )}

        {/* Buttons */}
        <div className="flex space-x-4 ml-auto">
          {heroConfig.buttons.map((button) => (
            <Button
              asChild
              key={button.text}
              variant={
                button.variant === "outline" ? "outline" : "default"
              }
            >
              <Link href={button.href}>{button.text}</Link>
            </Button>
          ))}
        </div>

        {/* 🟢 Spotify Widget Inside Hero */}
        <div className="w-full">
          {/* <SpotifyPlayer />  */}
          <SpotifyNowPlaying />
        </div>
      </section>
    </>
  );
};

export default Page;
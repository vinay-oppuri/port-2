import Link from "next/link";
import { socialLinks } from "@/lib/hero.config";

export const SocialLinks = () => {
  return (
    <div
      className="
        fixed 
        bottom-4 left-1/2 -translate-x-1/2 
        md:left-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0
        flex md:flex-col items-center 
        gap-4
        bg-foreground/10 backdrop-blur-lg 
        p-3 md:p-4
        rounded-2xl shadow-lg
      "
    >
      {socialLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white w-7 h-7 flex items-center justify-center"
        >
          {link.icon}
        </Link>
      ))}
    </div>
  );
};
import Link from "next/link";
import { socialLinks } from "@/lib/hero.config";

export const SocialLinks = () => {
  return (
    <div className="flex justify-center space-x-6 mt-8">
      {socialLinks.map((link) => (
        <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white w-6 h-6 flex items-center justify-center">
          {link.icon}
        </Link>
      ))}
    </div>
  );
};

import Image from "next/image";
import { cn } from "@/lib/utils";

export const AvatarLogo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("h-20 w-20 overflow-hidden", className)}>
      <Image
        src="/avatars/profile.jpeg"
        alt="Vinay Oppuri"
        width={80}
        height={80}
        priority
        className="h-full w-full object-cover scale-125 -translate-y-2"
      />
    </div>
  );
};
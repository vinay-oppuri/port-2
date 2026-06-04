import { fullStackSections } from "@/data/tech-stack";
import { ChevronRightIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function SkillsSection() {
  return (
    <section className="w-full flex flex-col gap-6 mt-10">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground font-mono uppercas">Tech</p>
        <h2 className="text-2xl font-bold text-foreground">Stack</h2>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        {fullStackSections.map((section) => (
          <div key={section.label} className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-3 md:gap-6 group items-start  pb-5 md:pb-6">
            <div className="flex items-center gap-2.5 text-foreground/80 font-mono tracking-tighter md:pt-1.5">
              <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                {section.icon}
              </div>
              <span className="text-xs sm:text-sm font-medium">{section.label}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {section.skills.map((skill) => (
                <Tooltip key={skill.name}>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center p-0.5 md:p-1">
                      {skill.icon}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" sideOffset={5} className="font-mono text-xs">
                    {skill.name}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

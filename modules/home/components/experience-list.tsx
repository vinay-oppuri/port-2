import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LinkPreview } from "@/components/ui/link-preview";
import { experiences } from "@/data";

type ExperienceItem = (typeof experiences)[number];

interface ExperienceListProps {
  items: ExperienceItem[];
}

export function ExperienceList({ items }: ExperienceListProps) {
  return (
    <Accordion defaultValue="exp-0" type="single" collapsible className="flex flex-col pt-2 md:pt-4">
      {items.map((exp, idx) => (
        <AccordionItem
          key={idx}
          value={`exp-${idx}`}
          className="relative border-b-0 border-l group"
        >
          <div className="h-4 w-4 rounded-full flex items-center justify-center shrink-0 absolute -left-2 -top-2">
            {exp.status === "working" ? (
              <div className="w-2 h-2 rounded-full bg-green-500 ring-4 ring-green-500/20" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-muted-foreground/30 group-hover:bg-muted-foreground/50 transition-colors" />
            )}
          </div>

          {/* Content */}
          <div className="pl-6 md:pl-8 pb-8 last:pb-0 relative -top-3">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 md:gap-4 w-full text-left">
              <div className="flex flex-col gap-1.5 md:gap-1">
                <div className="flex flex-wrap items-center gap-2 font-semibold text-sm md:text-base text-foreground/90">
                  <AccordionTrigger className="no-arrow p-0 hover:no-underline font-semibold text-sm md:text-base text-foreground/90 [&>svg]:hidden cursor-pointer">
                    {exp.role}
                  </AccordionTrigger>
                  <div className="h-1 w-1 bg-foreground rounded-full" />
                  <LinkPreview
                    url={("companyUrl" in exp && exp.companyUrl ? (exp.companyUrl as string) : "https://iiitr.ac.in/")}
                    className="text-xs text-muted-foreground font-sans hover:text-foreground transition-colors underline decoration-dotted underline-offset-4 decoration-muted-foreground/60 hover:decoration-foreground cursor-pointer"
                  >
                    {exp.companyName}
                  </LinkPreview>
                </div>
                <AccordionTrigger className="no-arrow p-0 hover:no-underline text-xs md:text-sm text-muted-foreground [&>svg]:hidden text-left cursor-pointer">
                  {exp.location}
                </AccordionTrigger>
              </div>

              <AccordionTrigger className="no-arrow p-0 hover:no-underline flex items-center gap-2 text-xs sm:text-sm sm:text-right text-muted-foreground font-normal whitespace-nowrap pt-1 sm:pt-0 cursor-pointer">
                <span>{exp.timeline}</span>
              </AccordionTrigger>
            </div>

            <AccordionContent className="mt-4 space-y-6">
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <div>
                  <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                    {exp.responsibilities.map((res, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="select-none text-muted-foreground/50">·</span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {exp.technologies.map((tech, i) => (
                    <Tooltip key={i} delayDuration={100}>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-center transition-opacity hover:opacity-80 cursor-pointer">
                          {tech.logo}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent sideOffset={5}>
                        <p className="font-medium text-xs">{tech.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              )}
            </AccordionContent>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

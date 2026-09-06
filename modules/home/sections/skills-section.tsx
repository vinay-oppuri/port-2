"use client";

import { fullStackSections, SkillItem } from "@/data/tech-stack";

function getLoopedSkills(skills: SkillItem[], minCount = 16): SkillItem[] {
  if (!skills.length) return [];
  const repeatCount = Math.max(2, Math.ceil(minCount / skills.length));
  const evenRepeat = repeatCount % 2 === 0 ? repeatCount : repeatCount + 1;
  const list: SkillItem[] = [];
  for (let i = 0; i < evenRepeat; i++) {
    list.push(...skills);
  }
  return list;
}

export default function SkillsSection() {
  return (
    <section className="w-full flex flex-col gap-6 mt-10">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground font-mono uppercase">Tech</p>
        <h2 className="text-2xl font-bold text-foreground">Stack</h2>
      </div>

      <div className="flex flex-col gap-5 w-full mt-2">
        {fullStackSections.map((section, idx) => {
          const isReverse = idx % 2 === 1;
          const loopedSkills = getLoopedSkills(section.skills, 16);
          // Set speed proportional to items to maintain consistent visual pace
          const duration = Math.max(25, section.skills.length * 4.5);

          return (
            <div key={section.label} className="flex flex-col gap-2 w-full">
              {/* Category Title */}
              <div className="flex items-center gap-2 px-1">
                <h3 className="text-[10px] font-mono text-foreground/85 uppercase tracking-wider">
                  {section.label}
                </h3>
              </div>

              {/* Horizontal Loop Marquee Track */}
              <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] py-1">
                <div
                  className={`flex items-center gap-2.5 w-max ${
                    isReverse ? "animate-marquee-right" : "animate-marquee-left"
                  } group-hover:[animation-play-state:paused]`}
                  style={{ "--marquee-speed": `${duration}s` } as React.CSSProperties}
                >
                  {loopedSkills.map((skill, sIdx) => (
                    <div
                      key={`${skill.name}-${sIdx}`}
                      className="flex items-center gap-2.5 px-3.5 py-2 text-foreground/90 bg-muted/30 dark:bg-muted/20 border border-foreground/5 hover:border-foreground/20 hover:bg-muted/60 dark:hover:bg-muted/40 hover:scale-105 transition-all duration-200 cursor-default shrink-0 select-none"
                    >
                      <div className="flex items-center justify-center shrink-0 w-4.5 h-4.5 [&_svg]:w-full! [&_svg]:h-full!">
                        {skill.icon}
                      </div>
                      <span className="text-xs font-mono tracking-tight whitespace-nowrap">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}





"use client";

import { heroConfig } from "@/lib/hero.config";

export default function SkillsSection() {
    const { skills } = heroConfig;

    return (
        <div className="w-full flex flex-col gap-8 mt-6">
            <div className="flex flex-col gap-1 border-b border-foreground/10 pb-4">
                <p className="text-sm text-muted-foreground">Technical</p>
                <h2 className="text-2xl font-bold text-foreground">Skills</h2>
            </div>

            <div className="flex flex-col gap-8 md:gap-10 mt-2">
                {(Object.entries(skills) as [string, typeof skills.frontend][]).map(
                    ([category, items]) => (
                        <div
                            key={category}
                            className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8"
                        >
                            <h3 className="text-xs md:text-sm md:w-32 uppercase tracking-widest text-muted-foreground font-semibold pt-1 md:shrink-0">
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-x-6 gap-y-4 flex-1">
                                {items.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2.5 group cursor-default"
                                    >
                                        <span className="[&_svg]:size-5 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                                            {skill.component}
                                        </span>
                                        <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

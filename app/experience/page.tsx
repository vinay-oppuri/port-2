"use client";

import Image from "next/image";
import { experiences } from "@/lib/hero.config";

import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

import { Badge } from "@/components/ui/badge";

const Page = () => {
    const topExperiences = experiences

    return (
        <div className="w-full max-h-screen mx-auto px-4 py-4 md:px-8">
            <div className="flex flex-col items-center justify-center border-b gap-3 md:gap-6 mt-6 md:mt-12 mb-4 md:mb-8 p-8">
                <h1 className="text-3xl md:text-5xl font-bold">Work Experience</h1>
                <h1 className="text-md md:text-xl text-muted-foreground font-semibold">My work experiences across different companies and roles.</h1>
            </div>
            <h2 className="text-2xl font-semibold mb-8">All Experience</h2>

            <Accordion
                defaultValue="exp-0"
                type="single"
                collapsible
                className="space-y-6"
            >
                {topExperiences.map((exp, idx) => (
                    <AccordionItem
                        key={idx}
                        value={`exp-${idx}`}
                        className="border-b-0 px-2 md:px-4"
                    >
                        {/* TOP SECTION */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 w-full font-semibold">

                            {/* LEFT SIDE CONTENT */}
                            <div className="flex items-start gap-4 w-full">
                                <Image
                                    src={exp.logo}
                                    width={58}
                                    height={58}
                                    alt="Logo"
                                    className="bg-foreground/5 h-18 md:h-13 w-20 md:w-14 rounded-md p-2 shrink-0"
                                />

                                <div className="flex flex-col gap-1.5 md:gap-0">
                                    <AccordionTrigger className="no-arrow p-0 hover:no-underline flex flex-wrap items-center gap-2 text-left">
                                        <h3 className="font-bold text-md md:text-lg">{exp.companyName}</h3>

                                        <Badge className="flex items-center gap-2 bg-green-600/20 text-[9px] md:text-xs text-foreground rounded-sm px-2 py-0.5">
                                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                            {exp.status}
                                        </Badge>
                                    </AccordionTrigger>

                                    <p className="text-xs md:text-sm text-muted-foreground">{exp.role}</p>
                                </div>
                            </div>

                            {/* RIGHT SIDE — DATES & LOCATION */}
                            <div className="text-sm sm:text-right text-muted-foreground whitespace-nowrap">
                                <p>{exp.timeline}</p>
                                <p>{exp.location}</p>
                            </div>

                        </div>

                        {/* CONTENT SECTION */}
                        <AccordionContent className="mt-6 space-y-6">

                            {/* TECHNOLOGIES */}
                            <div>
                                <h4 className="text-base md:text-lg font-semibold mb-2">Technologies & Tools</h4>

                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech, i) => (
                                        <Badge
                                            key={i}
                                            variant="secondary"
                                            className="flex gap-2 items-center text-xs md:text-md font-semibold border border-dashed border-muted-foreground/40 px-3 py-1 rounded-md"
                                        >
                                            {tech.logo} {tech.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* RESPONSIBILITIES */}
                            <div>
                                <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                                    {exp.responsibilities.map((res, i) => (
                                        <li key={i} className="flex text-sm md:text-base gap-2">
                                            <span>▪</span>
                                            {res}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default Page
// "use client"

import { Mail, MapPin, Phone, Linkedin } from "lucide-react";
import { socialLinks } from "@/lib/hero.config";

const ContactDialog = () => {
    const emailToUse = "oppurivinay25@gmail.com";
    const linkedInLink = socialLinks.find(link => link.name.toLowerCase() === "linkedin");

    return (
        <section className="flex flex-col gap-8 sm:gap-10 w-full px-2 md:px-0 py-4">

            {/* Header */}
            <div className="flex flex-col gap-1">
                <p className="text-sm text-muted-foreground">Contact</p>
                <h2 className="text-2xl font-bold text-foreground">Me</h2>
            </div>

            <div className="w-full flex flex-col items-start gap-8">

                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-2xl">
                    Whether you have a specific project in mind, need technical consulting, or just want to connect, I&apos;m always open to discussing new opportunities.
                </p>

                <div className="flex flex-col gap-4 sm:gap-6 w-full">

                    {/* Email */}
                    <div className="flex items-center gap-4 sm:gap-5 py-1.5 group cursor-pointer w-full">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center rounded-xl sm:rounded-xl border btn-inner-shadow bg-primary/5 text-muted-foreground transition-all duration-300 group-hover:border-ring/20 group-hover:text-ring group-hover:bg-ring/10">
                            <Mail className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 leading-none transition-colors group-hover:text-ring">Email</span>
                            <a href={`mailto:${emailToUse}`} className="text-sm sm:text-base font-bold text-foreground transition-colors group-hover:text-ring truncate">
                                {emailToUse}
                            </a>
                        </div>
                    </div>

                    {/* LinkedIn */}
                    {linkedInLink && (
                        <div className="flex items-center gap-4 sm:gap-5 py-1.5 group cursor-pointer w-full">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center rounded-xl sm:rounded-xl border btn-inner-shadow bg-primary/5 text-muted-foreground transition-all duration-300 group-hover:border-ring/20 group-hover:text-ring group-hover:bg-ring/10">
                                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 leading-none transition-colors group-hover:text-ring">LinkedIn</span>
                                <a href={linkedInLink.href} target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base font-bold text-foreground transition-colors group-hover:text-ring truncate">
                                    Vinay Oppuri
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Location */}
                    <div className="flex items-center gap-4 sm:gap-5 py-1.5 group cursor-pointer w-full">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center rounded-xl sm:rounded-xl border btn-inner-shadow bg-primary/5 text-muted-foreground transition-all duration-300 group-hover:border-ring/20 group-hover:text-ring group-hover:bg-ring/10">
                            <MapPin className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 leading-none transition-colors group-hover:text-ring">Location</span>
                            <span className="text-sm sm:text-base font-bold text-foreground transition-colors group-hover:text-ring truncate">
                                Hyderabad, India
                            </span>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-4 sm:gap-5 py-1.5 group cursor-pointer w-full">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center rounded-xl sm:rounded-xl border btn-inner-shadow bg-primary/5 text-muted-foreground transition-all duration-300 group-hover:border-ring/20 group-hover:text-ring group-hover:bg-ring/10">
                            <Phone className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 leading-none transition-colors group-hover:text-ring">Phone</span>
                            <a href="tel:+917569972659" className="text-sm sm:text-base font-bold text-foreground transition-colors group-hover:text-ring truncate">
                                +91 75699 72659
                            </a>
                        </div>
                    </div>

                </div >
            </div >
        </section >
    );
};

export default ContactDialog;
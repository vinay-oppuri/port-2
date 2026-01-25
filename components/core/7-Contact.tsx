// "use client"

import Link from "next/link";
import { Button } from "../ui/button";

const ContactDialog = () => {
    return (
        <section className="w-full max-w-3xl mx-auto flex flex-col items-center text-center gap-5 rounded-2xl border border-border bg-linear-to-b from-background/80 to-background/40 backdrop-blur px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-12 mt-10">
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                Hey, you scrolled this far — let&apos;s talk.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/contact">
                    <Button
                        size="lg"
                        className="w-60 md:w-35 px-6 text-xs sm:text-sm font-semibold tracking-tight"
                    >
                        Contact Form
                    </Button>
                </Link>


                <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="h-px w-6 bg-border" />
                    <span className="text-xs sm:text-sm uppercase tracking-widest">
                        or
                    </span>
                    <span className="h-px w-6 bg-border" />
                </div>

                <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=oppurivinay25@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button
                        size="lg"
                        variant="outline"
                        className="w-60 md:w-35 px-6 text-xs sm:text-sm font-semibold tracking-tight"
                    >
                        Email Me
                    </Button>
                </a>

            </div>
        </section>
    );
};

export default ContactDialog;
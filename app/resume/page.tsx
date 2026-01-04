"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/common/loading-state";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Page = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return <LoadingScreen />;

    return (
        <div className="w-full min-h-screen mx-auto px-6 py-4 md:px-10 pb-20">
            <div className="flex flex-col items-center text-center border-b gap-3 md:gap-6 mt-6 md:mt-12 mb-8 md:mb-12 p-8">
                <h1 className="text-3xl md:text-5xl font-bold">Resume</h1>
                <p className="text-md md:text-xl text-muted-foreground font-semibold">
                    View or download my resume.
                </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex justify-end">
                    <a href="/Full_Stack_Resume.pdf" download="VinayOppuri_Resume.pdf" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Download PDF
                        </Button>
                    </a>
                </div>

                <div className="w-full h-[800px] border rounded-xl overflow-hidden shadow-sm bg-muted/10">
                    <iframe
                        src="/Full_Stack_Resume.pdf#toolbar=0"
                        className="w-full h-full"
                        title="Resume PDF"
                    />
                </div>
            </div>
        </div>
    );
};

export default Page;
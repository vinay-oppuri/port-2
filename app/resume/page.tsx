import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "View or download my resume.",
};

const Page = () => {
  return (
    <div className="w-full min-h-screen mx-auto py-4 pb-20">
      <div className="flex flex-col items-center text-center border-b gap-3 md:gap-6 mt-6 md:mt-12 mb-8 md:mb-12 p-8">
        <h1 className="text-2xl md:text-3xl font-anton tracking-wide">Resume</h1>
        <p className="text-sm md:text-base text-muted-foreground font-semibold">
          View or download my resume.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-end">
          <a
            href="/Resume.pdf"
            download="VinayOppuri_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="gap-2 cursor-pointer">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </a>
        </div>

        <div className="w-full h-[852px]">
          <iframe
            src="/Resume.pdf#toolbar=0"
            className="w-full h-full"
            title="Resume PDF"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;

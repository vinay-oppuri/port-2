import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  return (
    <div className="w-full min-h-screen mx-auto px-6 py-4 md:px-10 pb-20">
      <div className="flex flex-col items-center text-center border-b gap-3 md:gap-6 mt-6 md:mt-12 mb-8 md:mb-12 p-8">
        <h1 className="text-3xl md:text-5xl font-bold">Resume</h1>
        <p className="text-md md:text-xl text-muted-foreground font-semibold">
          View or download my resumes.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <Tabs defaultValue="fullstack" className="w-full space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <TabsList className="grid w-full sm:w-[400px] grid-cols-2 clay">
              <TabsTrigger value="fullstack">Full Stack Engineer</TabsTrigger>
              <TabsTrigger value="ai">AI Engineer</TabsTrigger>
            </TabsList>

            {/* The download buttons are configured depending on which tab is active using Next.js nested state, but for a pure client-render bypass we can keep them inside TabsContent or just render 2 distinct TabsContents with their own headers */}
          </div>

          <TabsContent value="fullstack" className="space-y-6 mt-0">
            <div className="flex justify-end">
              <a
                href="/Full_Stack_Resume.pdf"
                download="VinayOppuri_FullStack_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Full Stack PDF
                </Button>
              </a>
            </div>

            <div className="w-full h-[800px] border rounded-xl overflow-hidden shadow-sm bg-muted/10">
              <iframe
                src="/Full_Stack_Resume.pdf#toolbar=0"
                className="w-full h-full"
                title="Full Stack Resume PDF"
              />
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6 mt-0">
            <div className="flex justify-end">
              <a
                href="/AI_Engineer_Resume.pdf"
                download="VinayOppuri_AIEngineer_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download AI PDF
                </Button>
              </a>
            </div>

            <div className="w-full h-[800px] border rounded-xl overflow-hidden shadow-sm bg-muted/10">
              <iframe
                src="/AI_Engineer_Resume.pdf#toolbar=0"
                className="w-full h-full"
                title="AI Engineer Resume PDF"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;

import { Metadata } from "next";
import Link from "next/link";
import { componentsData } from "@/data/components-data";

export const metadata: Metadata = {
  title: "Components Library",
  description: "A gorgeous, interactive library of custom UI components designed in the Claymorphism aesthetic.",
};

const Page = () => {
  return (
    <div className="w-full flex flex-col items-center pt-12 md:pt-24 px-4 text-center">
      <div className="flex flex-col items-start max-w-4xl w-full gap-8">
        <h2 className="text-3xl text-left font-bold font-mono tracking-tighter text-primary">Components Library</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
          {componentsData.map((component) => (
            <Link key={component.id} href={`/components/${component.id}`}>
              <div className="p-4 bg-muted/40 border border-foreground/5 rounded-md hover:bg-muted/50 transition-colors hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] group cursor-pointer h-full flex flex-col">
                <h3 className="font-bold text-sm md:text-base text-foreground font-sans tracking-tighter mb-2 group-hover:text-primary transition-colors">
                  {component.name}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground grow">
                  {component.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Page;

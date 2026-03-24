import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <section className="flex flex-col gap-6 w-full px-4 py-4 md:px-8">
      <div className="flex flex-col items-center text-center border-b border-foreground/10 gap-3 md:gap-6 mt-6 md:mt-12 mb-8 pb-8 px-4">
        <h1 className="text-2xl md:text-4xl font-bold">Blogs</h1>
        <p className="text-sm md:text-lg text-muted-foreground font-semibold max-w-2xl">
          Technical notes, build breakdowns, and lessons from shipping products.
        </p>
      </div>

      <div className="max-w-2xl mx-auto rounded-xl border border-foreground/10 bg-foreground/5 p-6 md:p-8 text-center">
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          This section is being prepared. In the meantime, check my latest work and
          project details.
        </p>
        <div className="mt-6 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/projects">Explore Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Page;

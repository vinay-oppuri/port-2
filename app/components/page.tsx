import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components Library",
  description: "A gorgeous, interactive library of custom UI components designed in the Claymorphism aesthetic.",
};

const Page = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="p-10 flex flex-col items-center max-w-md w-full gap-6 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] transition-all">
        <h3 className="font-bold text-lg text-foreground font-mono tracking-tighter">Welcome to the Library</h3>
        <p className="text-xs text-muted-foreground leading-relaxed font-mono tracking-tighter">
          There are no components available at the moment, but they will be arriving soon. Please check back later!
        </p>
      </div>
    </div>
  );
};

export default Page;

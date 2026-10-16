import Link from "@/components/ui/link";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[68vh] items-center justify-center py-12">
      <div className="w-full max-w-xl rounded-2xl p-8 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">404 ERROR</p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-anton tracking-wide text-foreground">Page Not Found</h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          The page you tried to open is not available or has been moved.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild className="h-9! gap-2 bg-foreground text-background">
            <Link href="/">
              <Home className="h-4 w-4 fill-background" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" />
              Browse Projects
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

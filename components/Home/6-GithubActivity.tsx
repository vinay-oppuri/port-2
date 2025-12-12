"use client";

import { GitHubCalendar } from "react-github-calendar";
import { MoveRight } from "lucide-react";
import { useTheme } from "next-themes";

export default function GitHubActivity() {
  const { theme } = useTheme();

  return (
    <div className="w-full">

      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">Featured</p>
          <h1 className="text-2xl font-bold text-foreground">GitHub Activity</h1>
        </div>

        <a
          href="https://github.com/vinay-oppuri"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors font-medium"
        >
          View Profile <MoveRight className="w-4 h-4" />
        </a>
      </header>

      {/* Calendar */}
      <div className="px-4 py-6 -mx-2 overflow-x-auto rounded-lg flex justify-center shadow-inner-strong">
        <GitHubCalendar
          username="vinay-oppuri"
          blockSize={9}
          blockMargin={3}
          fontSize={12}
          colorScheme={theme === "dark" ? "dark" : "light"}
          year={new Date().getFullYear()}
        />
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Contributions are based on UTC time.
      </p>
    </div>
  );
}
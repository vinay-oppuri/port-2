"use client";

export default function LoadingScreen() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6 animate-fadeIn">
      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-foreground/20 border-t-foreground rounded-full animate-spin"></div>

      {/* Skeleton Lines */}
      <div className="flex flex-col gap-3 w-52">
        <div className="h-3 rounded bg-foreground/10 animate-pulse"></div>
        <div className="h-3 rounded bg-foreground/10 animate-pulse"></div>
        <div className="h-3 rounded bg-foreground/10 animate-pulse"></div>
      </div>
    </div>
  );
}
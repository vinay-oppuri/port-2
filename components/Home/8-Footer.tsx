"use client";

const Footer = () => {
  return (
    <footer className="w-full flex justify-center py-6 mb-16 md:mb-0 px-4">
      <div
        className="
          px-4 md:px-6 py-2.5 rounded-xl
          bg-foreground/5 backdrop-blur-xl
          border border-foreground/10
          text-xs md:text-sm text-muted-foreground
          whitespace-nowrap
        "
      >
        <p className="flex items-center gap-1">
          Developed by 
          <span className="font-semibold text-foreground">Vinay</span>
          <span className="opacity-70">•</span>
          2025 — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
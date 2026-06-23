"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface RandomBoxProps {
  className?: string;
}

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
];

export default function RandomBox({ className }: RandomBoxProps) {
  const [colorIndex, setColorIndex] = useState(0);

  const handleClick = () => {
    setColorIndex((prev) => (prev + 1) % colors.length);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "w-32 h-32 rounded-2xl shadow-lg cursor-pointer transition-colors duration-300 flex items-center justify-center text-white font-bold select-none",
        colors[colorIndex],
        className
      )}
    >
      Click Me
    </div>
  );
}

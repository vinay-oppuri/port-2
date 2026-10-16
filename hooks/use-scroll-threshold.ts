"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollThreshold(threshold = 60) {
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);

  useEffect(() => {
    let raf = 0;
    const handleScroll = () => {
      raf = 0;
      const next = window.scrollY > threshold;
      if (next !== isScrolledRef.current) {
        isScrolledRef.current = next;
        setIsScrolled(next);
      }
    };

    const scheduleScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(handleScroll);
    };

    handleScroll();
    window.addEventListener("scroll", scheduleScroll, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", scheduleScroll);
    };
  }, [threshold]);

  return isScrolled;
}

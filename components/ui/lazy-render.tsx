"use client";

import React, { useEffect, useState, useRef, ReactNode } from "react";

interface LazyRenderProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
}

export function LazyRender({
  children,
  fallback,
  rootMargin = "150px",
  threshold = 0.01,
}: LazyRenderProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return (
    <div ref={containerRef} className="w-full">
      {isIntersecting ? children : fallback}
    </div>
  );
}

export default LazyRender;

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import DynamicScrollIslandTOC, { TOC_INTERFACE } from "@/components/ui/dynamic-scroll";

const data: TOC_INTERFACE[] = [
  { name: "Hero", value: "hero" },
  { name: "Experience", value: "experience" },
  { name: "Projects", value: "projects" },
  { name: "About", value: "about" },
  { name: "Skills", value: "skills" },
  { name: "GitHub Activity", value: "github" },
  { name: "Contact", value: "contact" },
  { name: "Resume", value: "/resume" },
];

export const DDScroll = () => {
  const [currentValue, setCurrentValue] = useState<TOC_INTERFACE>(data[0]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If we're not on the main page, set the value to the current path if it exists in data
    if (pathname !== "/") {
      const match = data.find((d) => d.value === pathname);
      if (match) setCurrentValue(match);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const matchingData = data.find((d) => d.value === id);
            if (matchingData) {
              setCurrentValue(matchingData);
            }
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    // Give components time to mount
    const timeoutId = setTimeout(() => {
      data.forEach((item) => {
        if (item.value && !item.value.startsWith("/")) {
          const el = document.getElementById(item.value);
          if (el) observer.observe(el);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [pathname]);

  const handleSelect = (item: TOC_INTERFACE) => {
    setCurrentValue(item);
    if (item.value) {
      if (item.value.startsWith("/")) {
        router.push(item.value);
      } else {
        if (pathname !== "/") {
          router.push(`/#${item.value}`);
          // Wait for navigation and then scroll
          setTimeout(() => {
            const el = document.getElementById(item.value!);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }, 300);
        } else {
          const el = document.getElementById(item.value);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <DynamicScrollIslandTOC
        data={data}
        value={currentValue}
        setValue={handleSelect}
        lPrefix="dd-scroll"
      />
    </div>
  );
};

export default DDScroll;

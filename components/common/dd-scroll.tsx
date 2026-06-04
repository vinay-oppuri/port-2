"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import DynamicScrollIslandTOC, { TOC_INTERFACE } from "@/components/ui/dynamic-scroll";

const data: TOC_INTERFACE[] = [
  { name: "Home", value: "hero", info: "Start your journey here" },
  { name: "Experience", value: "experience", info: "My professional background" },
  { name: "Projects", value: "projects", info: "Things I've built" },
  { name: "Skills", value: "skills", info: "Technologies I use" },
  { name: "GitHub Activity", value: "github", info: "My open source contributions" },
  { name: "Contact", value: "contact", info: "Let's get in touch" },
];

export const DDScroll = () => {
  const [currentValue, setCurrentValue] = useState<TOC_INTERFACE>(data[0]);
  const router = useRouter();
  const pathname = usePathname();
  const isScrolling = useRef(false);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const matchingData = data.find((d) => d.value === id);
            if (matchingData) {
              setCurrentValue((prev) =>
                prev.name === matchingData.name ? prev : matchingData
              );
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
    isScrolling.current = true;

    setTimeout(() => {
      isScrolling.current = false;
    }, 1200);

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
        title="Section Navigation"
        data={data}
        value={currentValue}
        setValue={handleSelect}
      />
    </div>
  );
};

export default DDScroll;

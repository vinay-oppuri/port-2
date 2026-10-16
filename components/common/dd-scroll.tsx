"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import DynamicScrollIslandTOC, { TOC_INTERFACE } from "@/components/ui/dynamic-scroll";
import { useScrollThreshold } from "@/hooks/use-scroll-threshold";
import { cn } from "@/lib/utils";

const data: TOC_INTERFACE[] = [
  { name: "Home", value: "hero", info: "Start your journey here" },
  { name: "Experience", value: "experience", info: "My professional background" },
  { name: "Projects", value: "projects", info: "Things I've built" },
  { name: "Skills", value: "skills", info: "Technologies I use" },
  { name: "GitHub", value: "github", info: "My open source contributions" },
  { name: "Contact", value: "contact", info: "Let's get in touch" },
];

const pageRoutes = [
  { name: "Work", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Components", href: "/components" },
  { name: "Blogs", href: "/blogs" },
  { name: "Resume", href: "/resume" },
  { name: "Contact", href: "/contact" },
];

export const DDScroll = () => {
  const isScrolled = useScrollThreshold(60);
  const [currentValue, setCurrentValue] = useState<TOC_INTERFACE>(data[0]);
  const router = useRouter();
  const pathname = usePathname();
  const isScrolling = useRef(false);

  const activePage = pageRoutes.find(
    (p) => pathname === p.href || pathname.startsWith(p.href + "/")
  );
  const pageValue: TOC_INTERFACE = activePage
    ? { name: activePage.name, value: activePage.href }
    : {
        name:
          pathname.replace(/^\//, "").split("/")[0].charAt(0).toUpperCase() +
          pathname.replace(/^\//, "").split("/")[0].slice(1),
        value: pathname,
      };

  const displayedValue = pathname !== "/" ? pageValue : currentValue;

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
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "transition-all duration-500 ease-in-out",
        isScrolled
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-28 opacity-0 pointer-events-none"
      )}
    >
      <DynamicScrollIslandTOC
        title="Sections"
        data={data}
        value={displayedValue}
        setValue={handleSelect}
      />
    </div>
  );
};

export default DDScroll;

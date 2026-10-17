"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";
import { TbChevronDown } from "react-icons/tb";
import { Search, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "@/components/ui/link";
import { playClickSound } from "@/hooks/use-sound";
import { triggerSearchDialog } from "@/components/common/search";

export interface TOC_INTERFACE {
  name: string;
  value?: string;
  info?: string;
}

interface Props {
  title?: string;
  value?: TOC_INTERFACE;
  setValue?: (v: TOC_INTERFACE) => void;
  data: TOC_INTERFACE[];
  ref?: RefObject<HTMLElement | null>;
  className?: string;
}

const defaultPages = [
  { name: "Work", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Components", href: "/components" },
  { name: "Blogs", href: "/blogs" },
  { name: "Resume", href: "/resume" },
  { name: "Contact", href: "/contact" }
];

const DynamicScrollIslandTOC = ({
  title,
  data,
  value: _v,
  setValue: _setValue,
  ref,
  className,
}: Props) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<TOC_INTERFACE>(data[0]);
  const selectedValue = _v ?? internalValue;
  const containerRef = useRef<HTMLDivElement>(null);

  const matchingPage = defaultPages.find(
    (page) => pathname === page.href || (page.href !== "/" && pathname.startsWith(page.href + "/"))
  );

  const displayValue: TOC_INTERFACE =
    pathname !== "/" && title !== "Component Selector"
      ? {
          name: matchingPage
            ? matchingPage.name
            : pathname.replace(/^\//, "").split("/")[0].charAt(0).toUpperCase() +
              pathname.replace(/^\//, "").split("/")[0].slice(1),
          value: pathname,
        }
      : selectedValue;

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleSelect(value: TOC_INTERFACE) {
    if (_v === undefined) {
      setInternalValue(value);
    }
    setOpen(false);
    _setValue?.(value);
  }

  function handleToggle() {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }
    setOpen((prev) => !prev);
  }

  const p = { data, open, value: displayValue, setValue: handleSelect, ref, onToggle: handleToggle };
  const txt = <Text {...p} />;

  return (
    <div
      ref={containerRef}
      className={cn("relative z-50 select-none", className)}
    >
      {/* Navigation Menu Popover Div */}
      {open && (
        <div
          role="dialog"
          aria-label="Navigation Menu"
          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-[min(340px,calc(100vw-32px))] rounded-2xl bg-black dark:bg-[#121212] border border-foreground/5 shadow-2xl p-2.5 flex flex-col z-50 text-white animate-in fade-in duration-150"
        >
          {/* Top: Search bar button */}
          <div className="w-full pb-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                triggerSearchDialog();
              }}
              aria-label="Search commands and pages"
              className="w-full flex items-center justify-between px-2.5 py-1.5 mb-2 rounded-full bg-muted border border-foreground/5 text-muted-foreground hover:text-foreground transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-xs font-medium">Search...</span>
              </div>
            </button>
          </div>

          <div className="flex gap-2.5 w-full text-white">
            {/* Left: Section names */}
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider px-2 pb-1.5 select-none">
                {title || "Sections"}
              </div>
              <div className="flex flex-col gap-0.5 overflow-y-auto max-h-[195px] no-scrollbar">
                {data.map((i) => {
                  const isActive = selectedValue?.name === i.name;
                  return (
                    <button
                      key={i.name}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(i);
                      }}
                      aria-label={i.name}
                      className={cn(
                        "cursor-pointer flex items-center text-left rounded-md px-2 py-1.5 w-full transition-colors text-xs",
                        isActive
                          ? "bg-white/12 text-white font-semibold"
                          : "text-neutral-400 hover:text-white hover:bg-white/5 font-medium"
                      )}
                    >
                      <span className="truncate">{i.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="w-px bg-white/10 self-stretch my-0.5 shrink-0" />

            {/* Right: Pages */}
            <div className="w-28 sm:w-32 flex flex-col shrink-0">
              <div className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider px-2 pb-1.5 select-none">
                Pages
              </div>
              <div className="flex flex-col gap-0.5 overflow-y-auto max-h-[195px] no-scrollbar">
                {defaultPages.map((page) => {
                  const isActive = pathname === page.href || pathname.startsWith(page.href + "/");
                  return (
                    <Link
                      key={page.href}
                      href={page.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center text-left rounded-md px-2 py-1.5 w-full transition-colors text-xs",
                        isActive
                          ? "bg-white/12 text-white font-semibold"
                          : "text-neutral-400 hover:text-white hover:bg-white/5 font-medium"
                      )}
                    >
                      <span className="truncate">{page.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pill bar — compact, clean, static dimensions */}
      <div
        className={cn(
          "relative flex items-center h-11 px-3 md:px-2 w-[140px] md:w-[min(200px,calc(100vw-32px))] rounded-full",
          "bg-black dark:bg-[#121212] border border-foreground/5 shadow-lg",
          "text-white dark:text-foreground/80 select-none",
          open && "ring-1 ring-white/10"
        )}
      >
        {txt}
      </div>
    </div>
  );
};

export default DynamicScrollIslandTOC;

function Text({
  open,
  value,
  ref,
  onToggle,
}: Props & { open: boolean; value?: TOC_INTERFACE; onToggle?: () => void }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );
  const circum = 2 * Math.PI * 10 - 0.5;
  const progressCircleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let raf = 0;
    const scrollContainer = ref?.current as HTMLElement | undefined;

    const updateProgress = () => {
      raf = 0;
      const scrollTop = scrollContainer
        ? scrollContainer.scrollTop
        : window.scrollY || document.documentElement.scrollTop;
      const scrollable = scrollContainer
        ? scrollContainer.scrollHeight - scrollContainer.clientHeight
        : document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, scrollTop / scrollable)) : 0;

      progressCircleRef.current?.style.setProperty(
        "stroke-dashoffset",
        `${circum * (1 - progress)}`
      );
    };

    const scheduleUpdate = () => {
      if (!raf) raf = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    const target: HTMLElement | Window = scrollContainer ?? window;
    target.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      target.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [circum, ref]);

  return (
    <div className="flex items-center justify-between gap-1 w-full">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle?.();
        }}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="flex items-center gap-2 cursor-default md:cursor-pointer flex-1 min-w-0 select-none text-left"
      >
        <div className="flex items-center justify-center shrink-0">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              className="stroke-white/20"
              strokeWidth="3"
              fill="none"
            />
            <circle
              ref={progressCircleRef}
              cx="12"
              cy="12"
              r="10"
              className="stroke-white/80"
              strokeWidth="3"
              fill="none"
              strokeDasharray={circum}
              strokeDashoffset={circum}
              strokeLinecap="round"
              transform="rotate(-90 12 12)"
            />
          </svg>
        </div>
        <div className="relative overflow-hidden flex items-center gap-2 min-w-0">
          <p className="font-semibold text-xs whitespace-nowrap truncate">
            {value?.name || "Contents"}
          </p>
          <div className="hidden md:block text-white/60 shrink-0">
            <TbChevronDown
              strokeWidth={2.5}
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </div>
        </div>
      </button>

      <div className="hidden md:flex items-center gap-1.5 shrink-0 pr-1">
        <div className="w-px h-3.5 bg-white/15" />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            playClickSound();
            const current = resolvedTheme || theme;
            setTheme(current === "dark" ? "light" : "dark");
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          aria-label="Toggle theme"
          className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer flex items-center justify-center relative z-20"
        >
          {mounted ? (
            (resolvedTheme || theme) === "dark" ? (
              <Sun className="w-4 h-4 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 transition-transform duration-300 hover:-rotate-12" />
            )
          ) : (
            <div className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
} from "motion/react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { TbChevronUp } from "react-icons/tb";


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

const DynamicScrollIslandTOC = ({
  title,
  data,
  value: _v,
  setValue: _setValue,
  ref,
  className,
}: Props) => {
  const [open, setOpen] = useState(false);
  // isExpanded stays true until the exit animation fully completes,
  // so the outer layout container doesn't collapse while content is mid-exit.
  const [isExpanded, setIsExpanded] = useState(false);
  const [internalValue, setInternalValue] = useState<TOC_INTERFACE>(data[0]);
  const selectedValue = _v ?? internalValue;
  const containerRef = useRef<HTMLDivElement>(null);

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

  function handleSelect(value: TOC_INTERFACE) {
    if (_v === undefined) {
      setInternalValue(value);
    }
    setOpen(false);
    _setValue?.(value);
  }

  function handleToggle() {
    if (!open) {
      setIsExpanded(true);  // expand layout immediately on open
      setOpen(true);
    } else {
      setOpen(false);       // trigger exit animation; layout collapses in onExitComplete
    }
  }

  const p = { data, open, value: selectedValue, setValue: handleSelect, ref };
  const txt = <Text {...p} />;
  const items = <Items {...p} />;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative z-51 cursor-pointer select-none",
        "[--height-opened:150px] [--width-opened:350px] [--width:220px]",
        "text-white dark:text-foreground/80",
        className,
      )}
    >
      <motion.div
        layout
        role="button"
        aria-label={open ? "Close" : "Open"}
        tabIndex={0}
        onClick={handleToggle}
        style={{ borderRadius: 24, willChange: isExpanded ? "width, height" : "transform" }}
        className={cn(
          "relative cursor-pointer overflow-hidden outline-hidden!",
          "bg-black dark:bg-[#121212] clay-island",
          // Drive size from isExpanded, not open — so it only collapses after exit completes
          isExpanded
            ? "flex flex-col justify-center px-3 py-4 pb-14 min-h-(--height-opened) w-xs md:w-sm"
            : "flex items-center h-11 px-1.5 w-[min(220px,calc(100vw-32px))]"
        )}
      >
        {/* Expanded content: header + items */}
        <AnimatePresence
          onExitComplete={() => setIsExpanded(false)} // collapse layout only after exit animation done
        >
          {open && (
            <motion.div
              key="toc-expanded"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.05, ease: "easeIn" }}
            >
              <div className="flex px-4">
                <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide pb-3">
                  {title}
                </div>
              </div>
              {items}
              <div className="flex items-center justify-center px-4 pt-3">
                <div className="w-full h-px mx-auto bg-white/5" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pill bar — absolute when expanded, normal flow when collapsed */}
        <motion.div layout className={isExpanded ? "absolute bottom-3 right-3 left-3" : "w-full"}>
          {txt}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DynamicScrollIslandTOC;



function Items({ setValue, data, value }: Props & { value?: TOC_INTERFACE }) {
  return (
    <div className="group flex flex-col gap-1.5 transition-opacity">
      <AnimatePresence initial={false}>
        {data.map((i, idx) => {
          const isActive = value?.name === i.name;
          const label = i.name;

          return (
            <motion.div
              key={i.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{
                duration: 0.18,
                delay: idx * 0.04,
                ease: "easeOut",
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setValue?.(i);
                }}
                aria-label={label}
                className={cn(
                  "cursor-pointer flex items-center justify-between text-left rounded-lg px-2 py-2 w-full",
                  isActive
                    ? "bg-white/10 border border-white/3 shadow-sm"
                    : "hover:bg-white/5"
                )}
              >
                <span className={cn(
                  "font-semibold text-sm whitespace-nowrap px-2",
                  isActive ? "text-white" : "text-muted-foreground"
                )}>
                  {label}
                </span>
                {i.info && (
                  <span className={cn(
                    "text-xs text-right px-2",
                    isActive ? "text-white/70" : "text-muted-foreground/60"
                  )}>
                    {i.info}
                  </span>
                )}
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function Text({
  open,
  value,
  ref,
}: Props & { open: boolean; value?: TOC_INTERFACE }) {
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
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 px-3">
        <motion.div
          layout="position"
          className="relative flex items-center justify-center h-2 w-2"
        >
          <div className="absolute inset-0 bg-white rounded-full blur-[3px] opacity-80" />
          <div className="absolute inset-0 bg-white rounded-full" />
        </motion.div>
        <motion.div
          layout="position"
          className="relative overflow-hidden flex items-center"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={value?.name || "Contents"}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0 }}
              className="font-bold text-xs md:text-sm justify-center tracking-wide whitespace-nowrap"
            >
              {value?.name || "Contents"}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.div
        layout="position"
        className="flex items-center justify-center gap-2"
      >
        <motion.div className="mt-0.5 text-white/80">
          <motion.div
            layout="position"
            animate={{ rotate: open ? 0 : 180 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <TbChevronUp strokeWidth={2.5} className="h-4 w-4" />
          </motion.div>
        </motion.div>
        <svg
          width="32"
          height="32"
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
      </motion.div>
    </div>
  );
}
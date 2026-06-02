"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Transition,
} from "motion/react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { TbChevronUp } from "react-icons/tb";


export interface TOC_INTERFACE {
  name: string;
  value?: string;
  info?: string;
}

interface Props {
  value?: TOC_INTERFACE;
  setValue?: (v: TOC_INTERFACE) => void;
  data: TOC_INTERFACE[];
  ref?: RefObject<HTMLElement | null>;
  transition?: Transition;
  className?: string;
  lPrefix?: string;
}

const DynamicScrollIslandTOC = ({
  data,
  value: _v,
  setValue: _setValue,
  ref,
  className,
  lPrefix,
  transition = { type: "spring", duration: 0.5, bounce: 0.1 },
}: Props) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<TOC_INTERFACE>(data[0]);
  const selectedValue = _v ?? internalValue;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") return setOpen(false);
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

  const p = { data, open, value: selectedValue, setValue: handleSelect, ref, lPrefix };
  const txt = <Text {...p} />;
  const items = <Items {...p} />;

  return (
    <MotionConfig transition={transition}>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            role="button"
            aria-label="Close"
            onClick={() => {
              setOpen(false);
            }}
            className="bg-d-bg/10 fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <div
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
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          style={{ borderRadius: 24, willChange: open ? "width, height" : "transform" }}
          className={cn(
            "relative cursor-pointer overflow-hidden outline-hidden!",
            "bg-black dark:bg-[#121212] clay-island",
            open
              ? "flex flex-col justify-center p-5 pb-14 min-h-(--height-opened) w-[min(350px,calc(100vw-32px))]"
              : "flex items-center h-11 px-1.5 w-[min(220px,calc(100vw-32px))]"
          )}
        >
          {open && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              {items}
            </motion.div>
          )}
          <motion.div layout className={open ? "absolute bottom-3 right-3 left-3" : "w-full"}>
            {txt}
          </motion.div>
        </motion.div>
      </div>
    </MotionConfig>
  );
};

export default DynamicScrollIslandTOC;



function Items({ setValue, data, value }: Props & { value?: TOC_INTERFACE }) {
  return (
    <div className="group flex flex-col gap-1.5 transition-opacity">
      {data.map((i) => {
        const isActive = value?.name === i.name;
        return (
          <button
            key={i.name}
            onClick={() => setValue?.(i)}
            aria-label={i.name}
            className={cn(
              "cursor-pointer flex items-center justify-between text-left rounded-full px-3 py-2 w-full",
              isActive
                ? "bg-white/5 border border-white/5 shadow-sm"
                : "hover:bg-white/5"
            )}
          >
            <span className={cn(
              "font-semibold text-sm whitespace-nowrap px-2",
              isActive ? "text-white" : "text-muted-foreground"
            )}>
              {i.name}
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
        );
      })}
    </div>
  );
}

function Text({
  open,
  value,
  ref,
}: Props & { open: boolean }) {
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

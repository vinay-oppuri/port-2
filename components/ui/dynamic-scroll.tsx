"use client";

import { clickSound } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  MotionValue,
  Transition,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useState } from "react";
import { TbChevronUp, TbX } from "react-icons/tb";


const playClick = () => {
  if (clickSound) {
    clickSound.play();
  }
};

export interface TOC_INTERFACE {
  name: string;
  value?: string;
  info?: string;
}

interface Props {
  value?: TOC_INTERFACE;
  setValue?: (v: TOC_INTERFACE) => void;
  data: TOC_INTERFACE[];
  ref?: any;
  transition?: Transition;
  className?: string;
  lPrefix?: string;
}

const cKey = "toc-wrapper";
const iKey = "toc-items";

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
  const [value, setValue] = useState(_v);
  const { scrollYProgress: sp } = useScroll(ref ? { container: ref } : undefined);

  useEffect(() => {
    if (_v !== undefined) {
      setValue(_v);
    }
  }, [_v]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") return setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleSelect(value: TOC_INTERFACE) {
    playClick();
    setValue(value);
    _setValue?.(value);
  }

  const p = { data, open, value, setValue: handleSelect, ref, lPrefix };
  const txt = <Text sp={sp} {...p} />;
  const items = <Items {...p} />;

  return (
    <MotionConfig transition={transition}>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            role="button"
            aria-label="Close"
            onClick={() => {
              playClick();
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
        {/* closed div  */}
        <motion.div
          role="button"
          aria-label="Open"
          tabIndex={0}
          onClick={() => {
            playClick();
            setOpen((prev) => !prev);
          }}
          layoutId={`${lPrefix}-${cKey}`}
          style={{ borderRadius: 24 }}
          className={cn(
            "relative flex h-10 cursor-pointer items-center overflow-hidden px-1 outline-hidden!",
            "min-w-[200px] bg-black dark:bg-[#121212] clay-island",
          )}
        >
          <div className="absolute top-0 left-1/2 h-full w-[calc(var(--width-opened)-50px)] -translate-x-1/2">
            <motion.div
              layoutId={`${lPrefix}-${iKey}`}
              layout="position"
              className="h-full w-full"
            />
          </div>

          <div className="w-full">{txt}</div>
        </motion.div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <AnimatePresence mode="popLayout" initial={false}>
            {open && (
              <motion.div
                role="button"
                aria-label="Close"
                tabIndex={0}
                onClick={() => {
                  playClick();
                  setOpen((prev) => !prev);
                }}
                layoutId={`${lPrefix}-${cKey}`}
                className={cn(
                  "cursor-pointer justify-center overflow-hidden p-5 pb-14",
                  "min-h-(--height-opened) w-(--width-opened) bg-black dark:bg-[#121212] clay-island",
                )}
                style={{ borderRadius: 24 }}
              >
                <motion.div layoutId={`${lPrefix}-${iKey}`} layout="position">
                  {items}
                </motion.div>
                <div className="absolute bottom-3 right-3 left-3">{txt}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
              "cursor-pointer flex items-center justify-between text-left rounded-md px-3 py-2 w-full",
              isActive
                ? "bg-white/5 border border-white/5 shadow-sm"
                : "hover:bg-white/5"
            )}
          >
            <span className={cn(
              "font-semibold text-sm whitespace-nowrap",
              isActive ? "text-white" : "text-muted-foreground"
            )}>
              {i.name}
            </span>
            {i.info && (
              <span className={cn(
                "text-xs text-right ml-4",
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
  sp,
  lPrefix,
}: Props & { open: boolean; sp: MotionValue }) {
  const circum = 2 * Math.PI * 10 - 0.5;
  const val = useTransform(sp, [0, 1], [circum, 0]);
  const sVal = useSpring(val, { visualDuration: 0.1, bounce: 0 });

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 px-3">
        <motion.div
          layoutId={`${lPrefix}-toc-dot`}
          layout="position"
          className="h-2 w-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
        <motion.div
          layout="position"
          layoutId={`${lPrefix}-toc-text-container`}
          className="relative overflow-hidden flex items-center"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={value?.name || "Contents"}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0 }}
              className="font-bold text-sm tracking-wide whitespace-nowrap"
            >
              {value?.name || "Contents"}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.div
        layoutId={`${lPrefix}-toc-svg-progress`}
        className="flex items-center justify-center gap-2"
      >
        <motion.div className="mt-0.5 text-white/80">
          <motion.div
            layout="position"
            layoutId={`${lPrefix}-toc-chevron`}
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
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            className="stroke-white/80"
            strokeWidth="3"
            fill="none"
            strokeDasharray={circum}
            strokeDashoffset={sVal}
            strokeLinecap="round"
            transform="rotate(-90 12 12)"
          />
        </svg>
      </motion.div>
    </div>
  );
}

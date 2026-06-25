import { Sun, Camera } from "lucide-react"
import { Iphone } from "../comps/iphone"

const time = "9:41"
const date = "Wednesday, June 25"

export default function IphoneDemo() {
  return (
    <Iphone size="xs">
      <div className="relative flex h-full flex-col justify-between bg-linear-to-t dark:bg-linear-to-b from-white to-blue-300 dark:from-blue-950 dark:to-black p-4 select-none">

        <div className="flex items-center justify-between px-1 text-[10px] font-semibold text-red-950/70 dark:text-white/60">
          <span>5G</span>
          <span>100%</span>
        </div>

        <div className="absolute left-0 right-0 top-15 flex flex-col items-center gap-1">
          <p className="text-[10px] font-normal tracking-wide text-red-950/50 dark:text-white/45">
            {date}
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-white dark:text-white">
            {time}
          </h1>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex w-full justify-between px-1">
            <button className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/10 border border-foreground/5">
              <Sun className="h-3 w-3 stroke-[1.5] text-foreground/80" />
            </button>
            <button className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/10 border border-foreground/5">
              <Camera className="h-3 w-3 stroke-[1.5] text-foreground/80" />
            </button>
          </div>
          <div className="h-[2px] w-16 rounded-full bg-foreground/30" />
        </div>

      </div>
    </Iphone>
  )
}
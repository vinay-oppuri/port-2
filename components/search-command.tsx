"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  BriefcaseIcon,
  CodeIcon,
  FileTextIcon,
  HomeIcon,
  MailIcon,
  MoonIcon,
  PenToolIcon,
  Search,
  SunIcon,
  MonitorIcon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { socialLinks } from "@/data/site"
import Logo from "./common/Logo"

export function SearchCommand() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="rounded-full gap-2 px-3 h-8 text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all clay-interactive"
        onClick={() => setOpen(true)}
      >
        <span className="text-xs font-medium inline-block">Search</span>
        <Search size={16} />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} className="border-border/80!">
        <CommandInput className="ml-2!" placeholder="Type a command or search..." />
        <CommandList className="font-mono tracking-tighter bg-background border border-border/60 p-1 mx-2 md:mx-3 my-1 md:my-2 rounded-xl! [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <HomeIcon className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/experience"))}>
              <BriefcaseIcon className="mr-2 h-4 w-4" />
              <span>Experience</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/projects"))}>
              <CodeIcon className="mr-2 h-4 w-4" />
              <span>Projects</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/blogs"))}>
              <PenToolIcon className="mr-2 h-4 w-4" />
              <span>Blogs</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/resume"))}>
              <FileTextIcon className="mr-2 h-4 w-4" />
              <span>Resume</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/contact"))}>
              <MailIcon className="mr-2 h-4 w-4" />
              <span>Contact</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Socials">
            {socialLinks.map((link) => (
              <CommandItem key={link.name} onSelect={() => runCommand(() => window.open(link.href, "_blank"))}>
                <div className="mr-2 flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4">{link.icon}</div>
                <span>{link.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <SunIcon className="mr-2 h-4 w-4" />
              <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <MoonIcon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <MonitorIcon className="mr-2 h-4 w-4" />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <div className="flex items-center justify-between w-full px-4 pb-4 pt-2">
          <Logo className="w-7 h-7 text-foreground" />
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
            <kbd className="inline-flex select-none items-center justify-center rounded border bg-muted px-1.5 py-0.5 font-mono text-xs font-medium text-foreground">
              ↵
            </kbd>
            <span>to page</span>
          </div>
        </div>
      </CommandDialog>
    </>
  )
}
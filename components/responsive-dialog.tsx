"use client"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "./ui/dialog"

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"

interface ResponsiveDialogProps {
  title: string
  description: string
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger?: React.ReactNode
  className?: string
  hideHeader?: boolean
}

export const ResponsiveDialog = ({
  title,
  description,
  children,
  open,
  onOpenChange,
  trigger,
  className,
  hideHeader
}: ResponsiveDialogProps) => {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange} direction="top">
        {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
        <DrawerContent className="rounded-b-2xl border-b bg-background shadow-lg">
          {hideHeader ? (
            <DrawerHeader className="sr-only">
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
            </DrawerHeader>
          ) : (
            <DrawerHeader className="pb-2 pt-4 px-4 border-b">
              <DrawerTitle className="text-base font-semibold">{title}</DrawerTitle>
              <DrawerDescription className="text-sm text-muted-foreground">
                {description}
              </DrawerDescription>
            </DrawerHeader>
          )}
          <div className={cn("px-4 py-4 overflow-y-auto max-h-[60vh]", hideHeader && "p-0 max-h-[85vh]")}>
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={cn("max-w-sm! rounded-2xl shadow-xl", className)}>
        <DialogHeader className={cn(hideHeader && "sr-only")}>
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className={cn("py-2", hideHeader && "p-0")}>{children}</div>
      </DialogContent>
    </Dialog>
  )
}

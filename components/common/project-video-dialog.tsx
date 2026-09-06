"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VideoPlayer } from "@/components/ui/video-player";
import { ProjectItem } from "@/data/projects";

interface ProjectVideoDialogProps {
  project: ProjectItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectVideoDialog({
  project,
  open,
  onOpenChange,
}: ProjectVideoDialogProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl w-[95vw] sm:w-[90vw] md:w-[85vw] p-0 overflow-hidden border border-white/15 dark:border-white/10 bg-black/95 backdrop-blur-2xl shadow-2xl rounded-2xl gap-0 duration-300 [&_button[data-slot=dialog-close]]:bg-black/60 [&_button[data-slot=dialog-close]]:text-white/80 [&_button[data-slot=dialog-close]]:hover:text-white [&_button[data-slot=dialog-close]]:hover:bg-black/80 [&_button[data-slot=dialog-close]]:border [&_button[data-slot=dialog-close]]:border-white/10 [&_button[data-slot=dialog-close]]:z-40 [&_button[data-slot=dialog-close]]:top-3 [&_button[data-slot=dialog-close]]:right-3"
        showCloseButton={true}
      >
        <DialogTitle className="sr-only">
          {project.title} Video Demo
        </DialogTitle>
        <DialogDescription className="sr-only">
          {project.description}
        </DialogDescription>

        <div className="w-full bg-black relative">
          {open && project.videoUrl ? (
            <VideoPlayer
              src={project.videoUrl}
              poster={project.imageUrl}
              title={project.title}
              autoPlay={true}
              className="rounded-2xl border-none shadow-none"
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

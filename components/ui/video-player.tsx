"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  Maximize,
  Minimize,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  className?: string;
  onEnded?: () => void;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
  const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;
  return `${formattedMins}:${formattedSecs}`;
}

export function VideoPlayer({
  src,
  poster,
  title,
  autoPlay = false,
  className,
  onEnded,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number>(0);

  // Actively suppress Internet Download Manager (IDM) browser extension injected elements
  useEffect(() => {
    const suppressIdm = () => {
      const selectors = [
        "#idm_panel",
        '[id*="idm_panel"]',
        '[class*="idm_panel"]',
        '[id*="__idm_id__"]',
        'div[id^="__idm_"]',
        'div[class*="idm_"]',
        "idm-panel",
        "idm-video-panel",
      ];
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          (el as HTMLElement).style.setProperty("display", "none", "important");
          (el as HTMLElement).style.setProperty("visibility", "hidden", "important");
          (el as HTMLElement).style.setProperty("opacity", "0", "important");
          (el as HTMLElement).style.setProperty("pointer-events", "none", "important");
          try {
            el.remove();
          } catch {}
        });
      });

      // Also inspect root children that might be injected IDM host containers
      document.querySelectorAll("body > *").forEach((el) => {
        const text = el.textContent || "";
        if (
          text.includes("Download video from this page") ||
          text.includes("Download this video")
        ) {
          (el as HTMLElement).style.setProperty("display", "none", "important");
          try {
            el.remove();
          } catch {}
        }
      });
    };

    suppressIdm();
    const interval = setInterval(suppressIdm, 500);
    const observer = new MutationObserver(suppressIdm);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  // Auto-hide controls helper
  const triggerControlsVisibility = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false);
      }
    }, 2500);
  }, []);

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          triggerControlsVisibility();
        })
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
          video
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => { });
        });
    } else {
      video.pause();
      setIsPlaying(false);
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    }
  }, [triggerControlsVisibility]);

  // Seek to specific progress
  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = progressTrackRef.current;
    const video = videoRef.current;
    if (!track || !video || !video.duration) return;

    const rect = track.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const percentage = clickX / rect.width;
    video.currentTime = percentage * video.duration;
    setCurrentTime(video.currentTime);
    triggerControlsVisibility();
  };

  // Handle timeline hover for timestamp preview
  const handleTimelineMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = progressTrackRef.current;
    const video = videoRef.current;
    if (!track || !video || !video.duration) return;

    const rect = track.getBoundingClientRect();
    const hoverX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const percentage = hoverX / rect.width;
    setHoverPosition(hoverX);
    setHoverTime(percentage * video.duration);
  };

  const handleTimelineMouseLeave = () => {
    setHoverTime(null);
  };

  // Volume change
  const handleVolumeChange = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;
    const clamped = Math.max(0, Math.min(1, newVolume));
    video.volume = clamped;
    setVolume(clamped);
    if (clamped === 0) {
      video.muted = true;
      setIsMuted(true);
    } else if (isMuted) {
      video.muted = false;
      setIsMuted(false);
    }
    triggerControlsVisibility();
  };

  // Mute / Unmute toggle
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
      if (volume === 0) {
        video.volume = 0.5;
        setVolume(0.5);
      }
    } else {
      video.muted = true;
      setIsMuted(true);
    }
    triggerControlsVisibility();
  };

  // Fullscreen toggle
  const toggleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      try {
        await container.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Fullscreen error:", err);
      }
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen to fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Keyboard controls
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      switch (e.code) {
        case "Space":
        case "KeyK":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowUp":
          e.preventDefault();
          handleVolumeChange(volume + 0.1);
          break;
        case "ArrowDown":
          e.preventDefault();
          handleVolumeChange(volume - 0.1);
          break;
        case "KeyM":
          e.preventDefault();
          toggleMute();
          break;
        case "KeyF":
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [togglePlay, volume, isMuted]);

  // Autoplay on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (autoPlay) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            triggerControlsVisibility();
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    }

    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [autoPlay, triggerControlsVisibility]);

  // Progress update & buffer update
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);

    if (video.buffered.length > 0) {
      try {
        const bufferedTime = video.buffered.end(video.buffered.length - 1);
        setBufferedEnd(bufferedTime);
      } catch { }
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPercent = duration > 0 ? (bufferedEnd / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onMouseMove={triggerControlsVisibility}
      onMouseEnter={triggerControlsVisibility}
      onMouseLeave={() => {
        if (isPlaying) setShowControls(false);
      }}
      className={cn(
        "relative w-full aspect-video bg-black rounded-xl overflow-hidden group/player select-none shadow-2xl border border-white/10 outline-none focus-visible:ring-1 focus-visible:ring-white/30",
        className
      )}
    >
      {/* Native Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
          }
        }}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => {
          setIsBuffering(false);
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setShowControls(true);
          onEnded?.();
        }}
        onClick={togglePlay}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* Center Buffering Spinner */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        </div>
      )}

      {/* Persistent Center Resume Button when paused (does not fade while paused) */}
      <AnimatePresence>
        {!isPlaying && !isBuffering && (
          <motion.div
            key="center-resume-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="pointer-events-auto w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/5 flex items-center justify-center transition-all duration-200 hover:scale-108 active:scale-95 cursor-pointer"
              aria-label="Resume video"
              title="Resume"
            >
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Overlay: Pause/Resume, Timeline, Sound Options, Fullscreen */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "absolute inset-x-0 bottom-0 z-30 flex flex-col justify-end bg-linear-to-t from-black/95 via-black/60 to-transparent pt-12 pb-3 px-3 sm:px-4 transition-all duration-300",
          showControls
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        )}
      >
        {/* Scrubber / Progress Bar Container */}
        <div
          ref={progressTrackRef}
          onClick={seekTo}
          onMouseMove={handleTimelineMouseMove}
          onMouseLeave={handleTimelineMouseLeave}
          className="relative py-2 cursor-pointer group/track"
        >
          {/* Track Background */}
          <div className="relative h-1.5 group-hover/track:h-2.5 transition-all duration-200 w-full rounded-full bg-white/25 overflow-hidden">
            {/* Buffered Progress */}
            <div
              style={{ width: `${bufferedPercent}%` }}
              className="absolute left-0 top-0 bottom-0 bg-white/30 transition-all duration-150"
            />
            {/* Played Progress */}
            <div
              style={{ width: `${progressPercent}%` }}
              className="absolute left-0 top-0 bottom-0 bg-primary/90 dark:bg-white rounded-full transition-all duration-75"
            />
          </div>

          {/* Scrubber Thumb */}
          <div
            style={{ left: `${progressPercent}%` }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-lg border border-black/20 opacity-0 group-hover/track:opacity-100 transition-all duration-150 pointer-events-none scale-75 group-hover/track:scale-100"
          />

          {/* Hover Time Preview Tooltip */}
          {hoverTime !== null && (
            <div
              style={{ left: `${hoverPosition}px` }}
              className="absolute -top-7 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 backdrop-blur-md text-white border border-white/20 text-[10px] font-mono shadow-md pointer-events-none"
            >
              {formatTime(hoverTime)}
            </div>
          )}
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between gap-2 pt-1">
          {/* Left Actions: Pause/Resume, Sound Options, Time */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Pause / Resume Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="p-1.5 rounded-full hover:bg-white/15 text-white/90 hover:text-white transition-all active:scale-90 cursor-pointer overflow-hidden"
              aria-label={isPlaying ? "Pause (k/space)" : "Resume (k/space)"}
              title={isPlaying ? "Pause" : "Resume"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Pause className="w-5 h-5 fill-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Play className="w-5 h-5 fill-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Sound Options: Mute/Unmute & Volume Slider */}
            <div className="flex items-center gap-1.5 group/volume">
              <button
                type="button"
                onClick={toggleMute}
                className="p-1.5 rounded-md hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label={isMuted ? "Unmute (m)" : "Mute (m)"}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : volume < 0.5 ? (
                  <Volume1 className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                aria-label="Volume slider"
                className="w-14 sm:w-20 h-1 rounded-full bg-white/20 accent-white cursor-pointer transition-all duration-200"
              />
            </div>

            {/* Timestamp Counter */}
            <div className="font-mono text-[11px] sm:text-xs text-white/90 pl-1 tracking-tight">
              <span>{formatTime(currentTime)}</span>
              <span className="text-white/40 mx-1">/</span>
              <span className="text-white/60">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Actions: Fullscreen */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-1.5 rounded-md hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label={isFullscreen ? "Exit fullscreen (f)" : "Fullscreen (f)"}
              title={isFullscreen ? "Exit fullscreen (f)" : "Fullscreen (f)"}
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

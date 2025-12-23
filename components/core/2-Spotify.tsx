import { useEffect, useState, useRef } from "react";
import useSWR from "swr";
import { SiSpotify } from "react-icons/si";
import { PauseIcon, PlayIcon, Loader2, SkipForward, SkipBack } from "lucide-react";
import { Button } from "../ui/button";
import { useSpotifyWebPlayer } from "@/hooks/useSpotifyWebPlayer";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function SpotifyLastPlayed() {
  const { data: track } = useSWR("/api/spotify/recent", fetcher);
  const { player, sdkReady, isPlaying, currentTrack, nextTracks, playTrack, skipToNext, skipToPrevious, seek } = useSpotifyWebPlayer();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);



  useEffect(() => {
    if (!isPlaying || !currentTrack || isDragging) return;
    const interval = setInterval(() => setProgress((p) => Math.min(p + 1000, currentTrack.duration)), 1000);
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, isDragging]);

  useEffect(() => {
    if (currentTrack && !isDragging) setProgress(currentTrack.position);
  }, [currentTrack, isDragging]);

  const handlePlayPause = async () => {
    if (!track?.uri) return;
    setLoading(true);
    console.log("Attempting to play. Track data:", track);
    try {
      if (currentTrack) {
        await player?.togglePlay();
      } else {
        // Use albumUri as context to ensure we have a valid queue (next songs) and avoid restriction errors
        await playTrack(track.uri, track.albumUri);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const active = currentTrack || track;
  if (!active) return null; // Or loading state

  const duration = active.duration || active.duration_ms || 0;
  const curProgress = currentTrack ? progress : 0;
  const fmt = (ms: number) => new Date(ms).toISOString().substr(14, 5);

  return (
    <>
      <div className="flex text-muted-foreground text-sm font-semibold items-center gap-2 -mb-3">
        <SiSpotify size={22} color="#1DB954" /> Last Played
      </div>
      <div className="flex w-full bg-foreground/5 shadow-inner-strong rounded-lg p-4 flex-col gap-6 min-h-16">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <img src={active.image || active.albumImageUrl} alt={active.name} className="w-12 h-12 rounded-md shadow-lg object-cover" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-foreground text-base leading-none truncate max-w-[200px]">{active.name}</h3>
              <p className="text-sm text-muted-foreground truncate max-w-[200px]">{active.artist}</p>
            </div>
          </div>
          <Button variant="secondary" size="icon" className="hidden md:flex my-auto" onClick={handlePlayPause} disabled={!sdkReady && !track}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : isPlaying ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
          </Button>
        </div>

        {(isPlaying || currentTrack) && (
          <div className="flex items-center justify-between gap-6 pt-4 border-t border-border">
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-8 text-right font-mono">{fmt(curProgress)}</span>
                <div className="relative flex-1 h-1 group">
                  <input
                    type="range" min={0} max={duration} value={curProgress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => { setIsDragging(false); seek(progress); }}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => { setIsDragging(false); seek(progress); }}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                    disabled={!currentTrack}
                  />
                  <div className="absolute top-0 left-0 w-full h-1 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(curProgress / duration) * 100}%` }} />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground w-8 font-mono">{fmt(duration)}</span>
              </div>
              {nextTracks.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Next:</span>
                  <span className="text-xs text-foreground/80 tracking-wider max-w-[200px]">{nextTracks[0].name}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-foreground/80">
              <Button variant="secondary" size="icon" onClick={skipToPrevious}><SkipBack className="size-4" /></Button>
              <Button variant="secondary" size="icon" onClick={skipToNext} disabled={nextTracks.length === 0}><SkipForward className="size-4" /></Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
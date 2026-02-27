"use client";

import useSWR from "swr";
import { SiSpotify } from "react-icons/si";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const SpotifySkeleton = () => (
  <>
    <div className="flex text-muted-foreground text-sm font-semibold items-center gap-2 -mb-3 animate-pulse">
      <SiSpotify size={22} color="#1DB954" /> Last Played
    </div>
    <div
      aria-hidden="true"
      className="flex w-full bg-foreground/5 shadow-inner-strong rounded-lg p-4 flex-col gap-6 min-h-16 animate-pulse"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-md bg-foreground/15" />
        <div className="flex flex-col gap-2">
          <div className="h-3 w-36 rounded bg-foreground/15" />
          <div className="h-3 w-24 rounded bg-foreground/10" />
        </div>
      </div>
    </div>
  </>
);

export default function SpotifyLastPlayed() {
  const { data: track, isLoading } = useSWR("/api/spotify", fetcher);

  if (isLoading) return <SpotifySkeleton />;
  if (!track?.name) return null;

  return (
    <>
      <div className="flex text-muted-foreground text-sm font-semibold items-center gap-2 -mb-3">
        <SiSpotify size={22} color="#1DB954" /> Last Played
      </div>
      <div className="flex w-full bg-foreground/5 shadow-inner-strong rounded-lg p-4 flex-col gap-6 min-h-16">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <img src={track.albumImageUrl} alt={track.name} className="w-12 h-12 rounded-md shadow-lg object-cover" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-foreground text-base leading-none truncate max-w-[200px]">{track.name}</h3>
              <p className="text-sm text-muted-foreground truncate max-w-[200px]">{track.artist}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

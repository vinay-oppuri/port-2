// components/SpotifyNowPlaying.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { SiSpotify } from "react-icons/si";
import { PauseIcon, PlayIcon } from "lucide-react";
import { Button } from "./ui/button";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

declare global {
  interface Window {
    Spotify?: any;
    onSpotifyWebPlaybackSDKReady?: () => void;
  }
}

export default function SpotifyNowPlaying() {
  const { data: nowPlaying } = useSWR("/api/spotify", fetcher, {
    refreshInterval: 15000,
  });

  const { data: recent } = useSWR(
    !nowPlaying?.isPlaying ? "/api/spotify/recent" : null,
    fetcher
  );

  const [sdkReady, setSdkReady] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load SDK
  useEffect(() => {
    if (window.Spotify) {
      setSdkReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => setSdkReady(true);
  }, []);

  // Create Player
  useEffect(() => {
    if (!sdkReady || !window.Spotify || playerRef.current) return;

    const player = new window.Spotify.Player({
      name: "Vinay Portfolio Player",
      getOAuthToken: async (cb: any) => {
        const res = await fetch("/api/spotify/token");
        const json = await res.json();
        cb(json.accessToken);
      },
      volume: 0.5,
    });

    playerRef.current = player;

    player.addListener("ready", async ({ device_id }: any) => {
      console.log("PLAYER READY", device_id);
      setDeviceId(device_id);

      // Transfer Playback
      const res = await fetch("/api/spotify/token");
      const { accessToken } = await res.json();

      await fetch("https://api.spotify.com/v1/me/player", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          device_ids: [device_id],
          play: false,
        }),
      });

      // Auto-load last played
      if (recent?.songUrl) {
        const uri = "spotify:track:" + recent.songUrl.split("/").pop();
        await fetch(
          `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uris: [uri] }),
          }
        );
      }
    });

    player.addListener("player_state_changed", (state: any) => {
      if (!state) return;
      setIsPlaying(!state.paused);
    });

    player.connect();
  }, [sdkReady, recent]);

  const track = nowPlaying?.isPlaying ? nowPlaying : recent;

  if (!track) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <SiSpotify size={22} color="#1DB954" />
        <p className="text-sm font-medium text-muted-foreground">{track.source}</p>
      </div>
      <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center gap-3">
        {track.albumImageUrl && (
          <img
            src={track.albumImageUrl}
            className="w-12 h-12 rounded"
            alt="album"
          />
        )}
        <div className="flex-1">
          <p className="font-semibold text-foreground">{track.name}</p>
          <p className="text-sm text-muted-foreground">{track.artist}</p>
        </div>

        <Button
          onClick={() => playerRef.current.togglePlay()}
          className="bg-background text-foreground hover:bg-background/60"
        >
          {isPlaying ? <PauseIcon className="size-4"/> : <PlayIcon className="size-4"/>}
        </Button>
      </div>
    </div>
  );
}

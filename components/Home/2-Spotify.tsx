"use client";

import useSWR from "swr";
import { useState, useEffect } from "react";
import { SiSpotify } from "react-icons/si";
import { PlayIcon, PauseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function SpotifyNowPlaying() {
  /* ================= DATA ================= */
  const { data: nowPlaying, mutate } = useSWR("/api/spotify", fetcher, {
    refreshInterval: 15000,
  });

  const { data: recent } = useSWR("/api/spotify/recent", fetcher);

  /* ================= STATE ================= */
  const [loading, setLoading] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [player, setPlayer] = useState<any>(null);

  const isPlaying = nowPlaying?.isPlaying;
  const track = isPlaying ? nowPlaying : recent;

  /* ================= SDK ================= */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    // @ts-ignore
    window.onSpotifyWebPlaybackSDKReady = () => {
      fetch("/api/spotify/token")
        .then((res) => res.json())
        .then(({ token }) => {
          // @ts-ignore
          const player = new window.Spotify.Player({
            name: "My Portfolio Web Player",
            getOAuthToken: (cb: any) => {
              cb(token);
            },
            volume: 0.5,
          });

          player.addListener("ready", ({ device_id }: any) => {
            console.log("Ready with Device ID", device_id);
            setDeviceId(device_id);
          });

          player.addListener("not_ready", ({ device_id }: any) => {
            console.log("Device ID has gone offline", device_id);
          });

          player.connect();
          setPlayer(player);
        });
    };
  }, []);

  /* ================= ACTION ================= */
  const togglePlayPause = async () => {
    if (!track) return;

    // Mobile fix: Activate element to allow audio playback
    if (player) {
      await player.activateElement();
    }

    setLoading(true);

    const action = isPlaying ? "pause" : "play";

    const res = await fetch("/api/spotify/controls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action,
        deviceId // Pass the SDK device ID if we have it
      }),
    });

    const json = await res.json();

    if (json?.reason === "NO_ACTIVE_DEVICE") {
      console.warn("No active device and could not transfer.");
    }

    await mutate();
    setLoading(false);
  };

  /* ================= RENDER ================= */
  return (
    <div className="flex flex-col gap-3 min-h-[90px]">
      {/* Header */}
      <div className="flex items-center gap-2">
        <SiSpotify size={22} color="#1DB954" />
        <p className="text-sm font-medium text-muted-foreground">
          {isPlaying ? "Playing on Spotify" : "Last played on Spotify"}
        </p>
      </div>

      {/* Player Card */}
      <div className="bg-foreground/5 shadow-inner-strong p-4 rounded-lg flex items-center gap-3">
        {track?.albumImageUrl && (
          <img
            src={track.albumImageUrl}
            alt="album"
            className="w-12 h-12 rounded"
          />
        )}

        <div className="flex-1">
          <p className="font-semibold text-foreground">
            {track?.title ?? "Not playing"}
          </p>
          <p className="text-sm text-muted-foreground">
            {track?.artist ?? ""}
          </p>
        </div>

        <Button
          variant="secondary"
          size="icon"
          onClick={togglePlayPause}
          disabled={loading}
          title={
            isPlaying ? "Pause on Spotify" : "Play on Spotify"
          }
        >
          {isPlaying ? (
            <PauseIcon className="size-4" />
          ) : (
            <PlayIcon className="size-4" />
          )}
        </Button>
      </div>

      {/* Hint */}
      <p className="text-xs text-muted-foreground">
        Audio plays in the Spotify app or Web Player
      </p>
    </div>
  );
}

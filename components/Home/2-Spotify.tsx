// components/SpotifyNowPlaying.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { SiSpotify } from "react-icons/si";
import { PauseIcon, PlayIcon, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

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
  const playerRef = useRef<SpotifyPlayer | null>(null);
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

  const [error, setError] = useState<string | null>(null);

  // Create Player
  useEffect(() => {
    if (!sdkReady || !window.Spotify || playerRef.current) return;

    const player = new window.Spotify.Player({
      name: "Vinay Portfolio Player",
      getOAuthToken: async (cb: (token: string) => void) => {
        try {
          const res = await fetch("/api/spotify/token");
          if (!res.ok) throw new Error("Failed to get token");
          const json = await res.json();
          cb(json.accessToken);
        } catch (e) {
          console.error("Token fetch failed", e);
          setError("Auth Error: Check console");
        }
      },
      volume: 0.25,
    });

    playerRef.current = player;

    player.addListener("ready", async ({ device_id }: { device_id: string }) => {
      console.log("PLAYER READY", device_id);
      setDeviceId(device_id);

      // Transfer Playback with Retry
      const res = await fetch("/api/spotify/token");
      const { accessToken } = await res.json();

      const transferWithRetry = async (retries = 5, delay = 1000) => {
        for (let i = 0; i < retries; i++) {
          try {
            console.log(`[Spotify Frontend] Activating Web Player (attempt ${i + 1}/${retries})...`);
            const res = await fetch("https://api.spotify.com/v1/me/player", {
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

            if (res.status === 204) {
              console.log("[Spotify Frontend] Web Player activated successfully!");
              return true;
            }

            if (res.status === 404) {
              console.warn("[Spotify Frontend] Web Player needs more time to wake up, retrying...");
            } else {
              console.warn(`[Spotify Frontend] Activation failed with status ${res.status}`);
            }
          } catch (e) {
            console.error("Failed to activate playback", e);
          }
          // Wait before retry
          await new Promise((r) => setTimeout(r, delay));
        }
        return false;
      };

      await transferWithRetry();

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

  const isLoading = !nowPlaying && !recent;
  const track = nowPlaying?.isPlaying ? nowPlaying : recent;

  const [isActivating, setIsActivating] = useState(false);

  return (
    <div className="flex flex-col gap-3 min-h-[90px]">
      {/* prevents height collapse flicker */}

      {/* Header */}
      <div className="flex gap-2 items-center">
        {isLoading ? (
          <>
            <div className="w-5 h-5 rounded bg-foreground/10 animate-pulse"></div>
            <div className="w-20 h-3 rounded bg-foreground/10 animate-pulse"></div>
          </>
        ) : (
          <>
            <SiSpotify size={22} color="#1DB954" />
            <p className="text-sm font-medium text-muted-foreground">
              {error ? <span className="text-red-500">{error}</span> : track?.source}
            </p>
          </>
        )}
      </div>

      {/* Body */}
      <div className="bg-foreground/5 shadow-inner-strong p-4 rounded-lg flex items-center gap-3 min-h-[64px]">

        {isLoading ? (
          /* ⭐ SKELETON — stays mounted */
          <>
            <div className="w-12 h-12 bg-foreground/10 rounded animate-pulse"></div>

            <div className="flex-1 flex flex-col gap-2">
              <div className="w-32 h-4 bg-foreground/10 rounded animate-pulse"></div>
              <div className="w-24 h-3 bg-foreground/10 rounded animate-pulse"></div>
            </div>

            <div className="w-10 h-10 rounded bg-foreground/10 animate-pulse"></div>
          </>
        ) : (
          /* ⭐ CONTENT — replaces skeleton without unmounting parent div */
          <>
            {track?.albumImageUrl && (
              <img
                src={track.albumImageUrl}
                className="w-12 h-12 rounded"
                alt="album"
              />
            )}

            <div className="flex-1">
              <p className="font-semibold text-foreground">{track?.name}</p>
              <p className="text-sm text-muted-foreground">{track?.artist}</p>
            </div>

            <Button
              variant='secondary'
              size='icon'
              onClick={async () => {
                const player = playerRef.current;
                if (player) {
                  setIsActivating(true);
                  try {
                    await player.activateElement();
                    await player.togglePlay();
                  } catch (e) {
                    console.error("Playback failed", e);
                  } finally {
                    setIsActivating(false);
                  }
                }
              }}
              disabled={!sdkReady || isActivating}
              className={!sdkReady || isActivating ? "opacity-50 cursor-not-allowed" : ""}
            >
              {isActivating ? (
                <Loader2 className="size-4 animate-spin" />
              ) : isPlaying ? (
                <PauseIcon className="size-4" />
              ) : (
                <PlayIcon className="size-4" />
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
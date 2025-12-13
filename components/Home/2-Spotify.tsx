"use client";

import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { SiSpotify } from "react-icons/si";
import { PauseIcon, PlayIcon } from "lucide-react";
import { Button } from "../ui/button";
import { SpotifyPlayer } from "@/types/spotify";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function SpotifyNowPlaying() {
  /* -------------------- DATA -------------------- */
  const { data: nowPlaying } = useSWR("/api/spotify", fetcher, {
    refreshInterval: 15000,
  });

  const { data: recent } = useSWR(
    !nowPlaying?.isPlaying ? "/api/spotify/recent" : null,
    fetcher
  );

  /* -------------------- STATE -------------------- */
  const [sdkReady, setSdkReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  const playerRef = useRef<SpotifyPlayer | null>(null);

  const isMobile =
    typeof window !== "undefined" &&
    /Mobi|Android|iPhone/i.test(navigator.userAgent);

  /* -------------------- SYNC PLAY STATE -------------------- */
  useEffect(() => {
    if (nowPlaying?.isPlaying !== undefined) {
      setIsPlaying(nowPlaying.isPlaying);
    }
  }, [nowPlaying]);

  /* -------------------- LOAD SPOTIFY SDK -------------------- */
  useEffect(() => {
    if (window.Spotify) {
      setSdkReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    script.onload = () => setSdkReady(true);
    document.body.appendChild(script);
  }, []);

  /* -------------------- CREATE PLAYER -------------------- */
  useEffect(() => {
    if (!sdkReady || !window.Spotify || playerRef.current) return;
    if (isMobile && !unlocked) return;

    const player = new window.Spotify.Player({
      name: "Vinay Portfolio Player",
      getOAuthToken: async (cb) => {
        const res = await fetch("/api/spotify/token");
        const { accessToken } = await res.json();
        cb(accessToken);
      },
      volume: 0.25,
    });

    playerRef.current = player;

    /* -------- PLAYER READY (TRANSFER ONLY, NO AUTOPLAY) -------- */
    player.addListener("ready", async ({ device_id }) => {
      console.log("Spotify Player ready:", device_id);
      setDeviceId(device_id);

      try {
        const res = await fetch("/api/spotify/token");
        const { accessToken } = await res.json();

        // 🔑 Transfer playback WITHOUT playing
        await fetch("https://api.spotify.com/v1/me/player", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            device_ids: [device_id],
            play: false, // ❌ no autoplay
          }),
        });
      } catch (e) {
        console.error("Playback transfer failed", e);
      }
    });

    player.addListener("player_state_changed", (state) => {
      if (state) {
        setIsPlaying(!state.paused);
      }
    });

    player.addListener("not_ready", ({ device_id }) => {
      console.log("Spotify Player offline:", device_id);
    });

    player.connect();
  }, [sdkReady, unlocked, isMobile]);

  /* -------------------- UI DATA -------------------- */
  const isLoading = !nowPlaying && !recent;
  const track = nowPlaying?.isPlaying ? nowPlaying : recent;

  /* -------------------- PLAY HANDLER -------------------- */
  const handlePlayPause = async () => {
    // SDK path
    if (playerRef.current) {
      const state = await playerRef.current.getCurrentState();

      if (!state) {
        // Player has device but no active track → resume via API
        if (deviceId) {
          const res = await fetch("/api/spotify/token");
          const { accessToken } = await res.json();

          await fetch(
            `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          setIsPlaying(true);
        }
      } else {
        await playerRef.current.togglePlay();
      }
      return;
    }

    // Fallback API path
    const action = isPlaying ? "pause" : "play";
    setIsPlaying(action === "play");

    await fetch("/api/spotify/controls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
  };

  /* -------------------- RENDER -------------------- */
  return (
    <div className="flex flex-col gap-3 min-h-[90px]">
      {/* 🔓 Mobile audio unlock */}
      {isMobile && !unlocked && (
        <Button
          className="w-full bg-[#1DB954] text-white"
          onClick={async () => {
            setUnlocked(true);
            try {
              await playerRef.current?.activateElement();
            } catch { }
          }}
        >
          Enable Spotify Player
        </Button>
      )}

      {/* Header */}
      <div className="flex gap-2 items-center">
        {isLoading ? (
          <>
            <div className="w-5 h-5 rounded bg-foreground/10 animate-pulse" />
            <div className="w-20 h-3 rounded bg-foreground/10 animate-pulse" />
          </>
        ) : (
          <>
            <SiSpotify size={22} color="#1DB954" />
            <p className="text-sm font-medium text-muted-foreground">
              {track?.source}
            </p>
          </>
        )}
      </div>

      {/* Body */}
      <div className="bg-foreground/5 shadow-inner-strong p-4 rounded-lg flex items-center gap-3 min-h-[64px]">
        {isLoading ? (
          <>
            <div className="w-12 h-12 bg-foreground/10 rounded animate-pulse" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="w-32 h-4 bg-foreground/10 rounded animate-pulse" />
              <div className="w-24 h-3 bg-foreground/10 rounded animate-pulse" />
            </div>
            <div className="w-10 h-10 rounded bg-foreground/10 animate-pulse" />
          </>
        ) : (
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
              <p className="text-sm text-muted-foreground">
                {track?.artist}
              </p>
            </div>

            <Button variant="secondary" size="icon" onClick={handlePlayPause}>
              {isPlaying ? (
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
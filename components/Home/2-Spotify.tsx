"use client";

import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { SiSpotify } from "react-icons/si";
import { PlayIcon, PauseIcon, PowerIcon } from "lucide-react";
import { Button } from "../ui/button";
import { SpotifyPlayer } from "@/types/spotify";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function SpotifyNowPlaying() {
  /* ================= DATA ================= */
  const { data: recent } = useSWR("/api/spotify/recent", fetcher);

  /* ================= STATE ================= */
  const [sdkReady, setSdkReady] = useState(false);
  const [playerStarted, setPlayerStarted] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  const playerRef = useRef<SpotifyPlayer | null>(null);

  /* ================= LOAD SDK ================= */
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

  /* ================= CREATE PLAYER ================= */
  useEffect(() => {
    if (!sdkReady || !playerStarted || playerRef.current) return;

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

    player.addListener("ready", async ({ device_id }) => {
      console.log("Spotify Player ready:", device_id);
      setDeviceId(device_id);
      setPlayerReady(true);

      // Transfer playback ownership ONLY (no autoplay)
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
    });

    player.addListener("player_state_changed", (state) => {
      if (!state) return;
      setIsPlaying(!state.paused);
    });

    player.addListener("not_ready", ({ device_id }) => {
      console.warn("Player offline:", device_id);
    });

    player.connect();
  }, [sdkReady, playerStarted]);

  /* ================= START PLAYER ================= */
  const startPlayer = async () => {
    if (!playerRef.current) {
      setPlayerStarted(true);
      return;
    }

    // Unlock browser audio (CRITICAL)
    try {
      await playerRef.current.activateElement();
      console.log("Audio unlocked");
    } catch (e) {
      console.error("Audio unlock failed", e);
    }
  };

  /* ================= PLAY / PAUSE ================= */
  const togglePlayPause = async () => {
    if (!playerRef.current || !playerReady) return;

    const state = await playerRef.current.getCurrentState();

    // First resume → load track ONCE
    if (!state && deviceId && recent?.songUrl) {
      const trackId = recent.songUrl.split("/").pop();
      if (!trackId) return;

      const uri = `spotify:track:${trackId}`;
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
          body: JSON.stringify({ uris: [uri] }),
        }
      );

      setIsPlaying(true);
      return;
    }

    // Normal pause / resume
    await playerRef.current.togglePlay();
  };

  /* ================= RENDER ================= */
  return (
    <div className="flex flex-col gap-3 min-h-[100px]">
      {/* Header */}
      <div className="flex items-center gap-2">
        <SiSpotify size={22} color="#1DB954" />
        <span className="text-sm text-muted-foreground">
          Spotify Player
        </span>
      </div>

      {/* Body */}
      <div className="bg-foreground/5 p-4 rounded-lg flex items-center gap-3">
        {recent?.albumImageUrl && (
          <img
            src={recent.albumImageUrl}
            alt="album"
            className="w-12 h-12 rounded"
          />
        )}

        <div className="flex-1">
          <p className="font-semibold">
            {recent?.name ?? "No track"}
          </p>
          <p className="text-sm text-muted-foreground">
            {recent?.artist ?? ""}
          </p>
        </div>

        {/* START PLAYER (one-time) */}
        {!playerStarted && (
          <Button
            variant="secondary"
            size="icon"
            onClick={startPlayer}
            title="Start Spotify Player"
          >
            <PowerIcon className="size-4" />
          </Button>
        )}

        {/* PLAY / PAUSE */}
        {playerStarted && (
          <Button
            variant="secondary"
            size="icon"
            onClick={togglePlayPause}
            disabled={!playerReady}
            title={isPlaying ? "Pause" : "Resume"}
          >
            {isPlaying ? (
              <PauseIcon className="size-4" />
            ) : (
              <PlayIcon className="size-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
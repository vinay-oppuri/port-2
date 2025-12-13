import { useEffect, useRef, useState, useCallback } from "react";

export function useSpotifyWebPlayer() {
    const [sdkReady, setSdkReady] = useState(false);
    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [currentTrack, setCurrentTrack] = useState<any>(null);
    const [nextTracks, setNextTracks] = useState<any[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const playerRef = useRef<SpotifyPlayer | null>(null);

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

    useEffect(() => {
        if (!sdkReady || !window.Spotify || playerRef.current) return;

        console.log("Initializing Spotify Player...");

        const player = new window.Spotify.Player({
            name: "Vinay Portfolio Player",
            getOAuthToken: async (cb) => {
                try {
                    console.log("Fetching token...");
                    const res = await fetch("/api/spotify/token");
                    if (!res.ok) {
                        console.error("Token fetch failed with status:", res.status);
                        return;
                    }
                    const { accessToken } = await res.json();
                    console.log("Token received");
                    cb(accessToken);
                } catch (e) {
                    console.error("Token fetch error", e);
                }
            },
            volume: 0.25,
        });

        playerRef.current = player;

        player.addListener("ready", ({ device_id }) => {
            console.log("Ready with Device ID", device_id);
            setDeviceId(device_id);
        });

        player.addListener("not_ready", ({ device_id }) => {
            console.log("Device ID has gone offline", device_id);
        });

        player.addListener("initialization_error", ({ message }) => {
            console.error("Initialization Error:", message);
        });

        player.addListener("authentication_error", ({ message }) => {
            console.error("Authentication Error:", message);
        });

        player.addListener("account_error", ({ message }) => {
            console.error("Account Error:", message);
        });

        player.addListener("player_state_changed", (state) => {
            if (!state) return;
            setIsPlaying(!state.paused);
            const current = state.track_window.current_track;
            setCurrentTrack({
                uri: current.uri,
                name: current.name,
                artist: current.artists[0].name,
                image: current.album.images[0]?.url,
                duration: state.duration,
                position: state.position,
            });
            setNextTracks(state.track_window.next_tracks);
        });

        player.connect().then(success => {
            if (success) {
                console.log("The Web Playback SDK successfully connected to Spotify!");
            } else {
                console.error("The Web Playback SDK could not connect to Spotify");
            }
        });
    }, [sdkReady]);

    const playTrack = useCallback(async (uri: string, contextUri?: string) => {
        if (!deviceId) return;
        try {
            const res = await fetch("/api/spotify/token");
            if (!res.ok) return;
            const { accessToken } = await res.json();

            await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${accessToken}` },
                body: JSON.stringify(contextUri ? { context_uri: contextUri, offset: { uri } } : { uris: [uri] }),
            });
        } catch (e) {
            console.error(e);
        }
    }, [deviceId]);

    const control = useCallback(async (action: "next" | "previous" | "resume" | "pause") => {
        if (!playerRef.current) return;
        if (action === "next") await playerRef.current.nextTrack();
        if (action === "previous") await playerRef.current.previousTrack();
        if (action === "resume") await playerRef.current.resume();
        if (action === "pause") await playerRef.current.pause();
    }, []);

    const seek = useCallback(async (position: number) => {
        await playerRef.current?.seek(position);
    }, []);

    return {
        player: playerRef.current,
        sdkReady,
        isPlaying,
        currentTrack,
        nextTracks,
        playTrack,
        skipToNext: () => control("next"),
        skipToPrevious: () => control("previous"),
        seek,
    };
}

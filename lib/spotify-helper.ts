import { Buffer } from "buffer";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

export async function getAccessToken() {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  const json = await res.json();
  return json.access_token;
}

export async function getNowPlaying() {
  const token = await getAccessToken();
  const res = await fetch(NOW_PLAYING, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 204 || !res.ok) {
    return { status: res.status, data: null };
  }

  return { status: res.status, data: await res.json() };
}

export async function getRecentlyPlayed() {
  const token = await getAccessToken();
  const res = await fetch(RECENT, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return { status: res.status, data: res.ok ? await res.json() : null };
}

export async function play() {
  const token = await getAccessToken();
  await fetch("https://api.spotify.com/v1/me/player/play", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export async function pause() {
  const token = await getAccessToken();
  await fetch("https://api.spotify.com/v1/me/player/pause", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}
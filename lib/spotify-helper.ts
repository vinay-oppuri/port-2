import { Buffer } from "buffer";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const RECENT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";
const NOW_PLAYING = "https://api.spotify.com/v1/me/player/currently-playing";

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

async function fetchWithRetry(url: string, options: RequestInit) {
  let retries = 3;
  while (retries > 0) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`Spotify API Error: ${res.status}`);
      return res;
    } catch (error) {
      retries--;
      if (retries === 0) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  throw new Error("Fetch failed after retries");
}

export async function getAccessToken() {
  const res = await fetchWithRetry(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
    cache: 'no-store',
  });

  const json = await res.json();
  return json.access_token;
}

export async function getRecentlyPlayed() {
  const token = await getAccessToken();
  const res = await fetchWithRetry(RECENT, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return { status: res.status, data: await res.json() };
}

export async function getNowPlaying() {
  const token = await getAccessToken();
  const res = await fetchWithRetry(NOW_PLAYING, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 204) {
    return { status: res.status, data: null };
  }

  return { status: res.status, data: await res.json() };
}
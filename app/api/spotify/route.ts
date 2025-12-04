import { NextResponse } from "next/server";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

// Error response utility
const errorResponse = (message: string, status: number, details?: any) => {
  console.error("Spotify API Error:", message, details ? details : "");
  return NextResponse.json({ error: message }, { status });
};

const getAccessToken = async () => {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
    });

    if (!response.ok) {
      const errorData = await response.text();
      return errorResponse(`Failed to get access token: ${response.statusText}`, response.status, errorData);
    }

    return response.json();
  } catch (error: any) {
    return errorResponse(`Error fetching access token: ${error.message}`, 500);
  }
};

export async function GET() {
  // Check for environment variables
  if (!client_id || !client_secret || !refresh_token) {
    return errorResponse("Missing Spotify API environment variables. Please check your .env.local file.", 500);
  }

  const tokenResponse = await getAccessToken();
  if (tokenResponse.error) {
    return tokenResponse;
  }
  const { access_token } = tokenResponse;

  try {
    // Try "Now Playing"
    let res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: "no-store", // Ensure fresh data
    });

    if (res.status === 204) {
      // If nothing is playing, try "Last Played"
      res = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
        headers: { Authorization: `Bearer ${access_token}` },
        cache: "no-store", // Ensure fresh data
      });

      if (!res.ok) {
        const errorData = await res.text();
        return errorResponse(`Failed to fetch recently played: ${res.statusText}`, res.status, errorData);
      }

      const data = await res.json();
      if (!data.items || data.items.length === 0) {
        return NextResponse.json({ isPlaying: false }); // Explicitly return empty data for no tracks
      }
      return NextResponse.json({ isPlaying: false, ...data.items[0].track }); // Return last played track
    } else if (!res.ok) {
      const errorData = await res.text();
      return errorResponse(`Failed to fetch currently playing: ${res.statusText}`, res.status, errorData);
    }

    const data = await res.json();
    if (!data.item) {
      return NextResponse.json({ isPlaying: false }); // Explicitly return empty data for no track
    }
    return NextResponse.json({ isPlaying: true, ...data.item }); // Return currently playing track
  } catch (error: any) {
    return errorResponse(`Error fetching Spotify data: ${error.message}`, 500);
  }
}


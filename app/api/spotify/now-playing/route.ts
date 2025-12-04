import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify";

export async function GET() {
  try {
    const access_token = await getAccessToken();

    // ⭐ 1. Try CURRENTLY PLAYING
    const nowRes = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        cache: "no-store",
      }
    );

    // If something is playing
    if (nowRes.status === 200) {
      const now = await nowRes.json();
      if (now?.item) {
        return NextResponse.json({
          type: "now_playing",
          track: now.item,
        });
      }
    }

    // ⭐ 2. Otherwise get LAST PLAYED
    const recentRes = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        cache: "no-store",
      }
    );

    if (!recentRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch recently played" },
        { status: recentRes.status }
      );
    }

    const recent = await recentRes.json();

    if (recent.items?.length > 0) {
      return NextResponse.json({
        type: "last_played",
        track: recent.items[0].track,
      });
    }

    return NextResponse.json({
      type: "empty",
      track: null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}

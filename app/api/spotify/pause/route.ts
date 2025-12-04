import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify";

export async function POST() {
  try {
    const access_token = await getAccessToken();

    const res = await fetch("https://api.spotify.com/v1/me/player/pause", {
      method: "PUT",
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const text = await res.text();
    if (!res.ok) {
      return NextResponse.json(
        { error: "Spotify pause failed", body: text },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

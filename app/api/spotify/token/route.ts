// app/api/spotify/token/route.ts
import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify-helper";

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    console.log("Using Refresh Token:", process.env.SPOTIFY_REFRESH_TOKEN?.substring(0, 10) + "...");
    console.log("Generated Access Token:", accessToken.substring(0, 10) + "...");
    return NextResponse.json({ accessToken });
  } catch (error: any) {
    console.error("Token generation error:", error);
    return NextResponse.json({ error: error.message || "Token error", details: error.toString() }, { status: 500 });
  }
}
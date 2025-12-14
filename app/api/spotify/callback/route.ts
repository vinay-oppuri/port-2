import { NextResponse } from "next/server";
import { Buffer } from "buffer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID!;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI!

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri,
    }),
  });

  const text = await tokenResponse.text();

  if (!tokenResponse.ok) {
    console.error("Spotify callback error:", tokenResponse.status, text);
    return NextResponse.json(
      { error: "Failed to exchange code", details: text },
      { status: tokenResponse.status }
    );
  }

  const data = JSON.parse(text);
  return NextResponse.json(data);
} 
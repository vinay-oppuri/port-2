// app/api/spotify/route.ts
import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify-helper";

export const dynamic = "force-dynamic";

export async function GET() {
  const empty = {
    isPlaying: false,
    name: null,
    artist: null,
    album: null,
    albumImageUrl: null,
    songUrl: null,
    source: "none",
  };

  try {
    const response = await getNowPlaying();

    if (response.status === 204 || !response.data || !response.data.item) {
      return NextResponse.json(empty);
    }

    const song = response.data;

    return NextResponse.json({
      isPlaying: song.is_playing,
      name: song.item.name,
      artist: song.item.artists.map((a: any) => a.name).join(", "),
      album: song.item.album.name,
      albumImageUrl: song.item.album.images?.[0]?.url,
      songUrl: song.item.external_urls.spotify,
      source: "Playing Now",
    });
  } catch (e) {
    return NextResponse.json(empty);
  }
}
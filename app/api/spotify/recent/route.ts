// app/api/spotify/recent/route.ts
import { NextResponse } from "next/server";
import { getRecentlyPlayed } from "@/lib/spotify-helper";

export const dynamic = "force-dynamic";

export async function GET() {
  const empty = {
    isPlaying: false,
    name: null,
    artist: null,
    album: null,
    albumImageUrl: null,
    songUrl: null,
    uri: null,
    context_uri: null,
    duration_ms: 0,
    source: "recent",
  };

  try {
    const response = await getRecentlyPlayed();
    if (!response.data?.items?.length) return NextResponse.json(empty);

    const track = response.data.items[0].track;

    return NextResponse.json({
      isPlaying: false,
      name: track.name,
      artist: track.artists.map((a: any) => a.name).join(", "),
      album: track.album.name,
      albumImageUrl: track.album.images?.[0]?.url,
      songUrl: track.external_urls.spotify,
      uri: track.uri,
      context_uri: track.context?.uri || null,
      duration_ms: track.duration_ms,
      source: "Last Played",
    });
  } catch {
    return NextResponse.json(empty);
  }
}
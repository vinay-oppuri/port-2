import { NextResponse } from "next/server";
import { getRecentlyPlayed } from "@/lib/spotify-helper";

export const dynamic = "force-dynamic";

const empty = {
  isPlaying: false,
  name: null,
  artist: null,
  album: null,
  albumImageUrl: null,
  songUrl: null,
  uri: null,
  context_uri: null,
  albumUri: null,
  duration_ms: 0,
  source: "recent",
};

export async function GET() {
  try {
    const response = await getRecentlyPlayed();
    const recent = response.data?.items?.[0];
    const item = recent?.track;
    const context = recent?.context;

    if (response.status === 204 || !item) {
      return NextResponse.json(empty);
    }

    return NextResponse.json({
      isPlaying: false,
      name: item.name,
      artist: item.artists.map((artist: { name: string }) => artist.name).join(", "),
      album: item.album.name,
      albumImageUrl: item.album.images?.[0]?.url,
      songUrl: item.external_urls.spotify,
      uri: item.uri,
      context_uri: context?.uri || null,
      albumUri: item.album.uri,
      duration_ms: item.duration_ms,
      source: "Last Played",
    });
  } catch (e) {
    console.error("Spotify API Error:", e);
    return NextResponse.json(empty);
  }
}

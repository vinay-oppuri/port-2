import { NextResponse } from "next/server";
import { getRecentlyPlayed, getNowPlaying } from "@/lib/spotify-helper";

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
    albumUri: null,
    duration_ms: 0,
    source: "recent",
  };

  try {
    // Try to get currently playing (or paused) track first
    let response = await getNowPlaying();
    let isNowPlaying = true;

    // If no content (204) or no item, fallback to recently played
    if (response.status === 204 || !response.data || !response.data.item) {
      response = await getRecentlyPlayed();
      isNowPlaying = false;
    }

    if (!response.data?.items?.length && !response.data?.item) {
      return NextResponse.json(empty);
    }

    // Handle different structures: NowPlaying has `item`, RecentlyPlayed has `items[0].track`
    const item = isNowPlaying ? response.data.item : response.data.items[0].track;
    const context = isNowPlaying ? response.data.context : response.data.items[0].context;

    if (!item) {
      return NextResponse.json(empty);
    }

    return NextResponse.json({
      isPlaying: isNowPlaying ? response.data.is_playing : false,
      name: item.name,
      artist: item.artists.map((a: any) => a.name).join(", "),
      album: item.album.name,
      albumImageUrl: item.album.images?.[0]?.url,
      songUrl: item.external_urls.spotify,
      uri: item.uri,
      context_uri: context?.uri || null,
      albumUri: item.album.uri,
      duration_ms: item.duration_ms,
      source: isNowPlaying ? "Now Playing" : "Last Played",
    });
  } catch (e) {
    console.error("Spotify API Error:", e);
    return NextResponse.json(empty);
  }
}
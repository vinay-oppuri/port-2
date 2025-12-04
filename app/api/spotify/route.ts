
import { NextResponse } from 'next/server';
import { getNowPlaying } from '@/lib/spotify';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400 || !response.data) {
      return NextResponse.json({ isPlaying: false });
    }

    const song = response.data;

    if (!song || !song.item) {
      return NextResponse.json({ isPlaying: false });
    }

    const isPlaying = song.is_playing;
    const name = song.item.name;
    const artist = song.item.artists?.map((_artist) => _artist.name).join(', ') || 'Unknown Artist';
    const album = song.item.album?.name || 'Unknown Album';
    const albumImageUrl = song.item.album?.images?.[0]?.url;
    const songUrl = song.item.external_urls?.spotify;

    return NextResponse.json({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      name,
    });
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return NextResponse.json({ isPlaying: false });
  }
}


'use client';

import useSWR from 'swr';
import { SiSpotify } from 'react-icons/si';
import { NowPlayingData } from '@/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SpotifyNowPlaying = () => {
  const { data, error } = useSWR<NowPlayingData>('/api/spotify', fetcher, { // Changed to SWR
    refreshInterval: 1000 * 30, // Refresh every 30 seconds
  });

  if (error) {
    return (
      <div className="flex items-center gap-2 ">
        <SiSpotify size={20} color={'#1ED760'} />
        <p className="text-sm font-medium">Error loading Spotify data</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center gap-2">
        <SiSpotify size={20} color={'#1ED760'} />
        <p className="text-sm font-medium">Not playing</p>
      </div>
    );
  }

  const { isPlaying, songUrl, name, artist, album, albumImageUrl } = data;

  return (
    <div className="flex items-center gap-2">
      <SiSpotify size={20} color={'#1ED760'} />
      {isPlaying ? (
        <a
          href={songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium hover:underline"
        >
          {name} by {artist}
        </a>
      ) : (
        <p className="text-sm font-medium">Not playing</p>
      )}
    </div>
  );
};

export default SpotifyNowPlaying;

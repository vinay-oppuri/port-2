"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { PlayIcon } from "@heroicons/react/24/outline";

interface SpotifyTrack {
  album: {
    name: string;
    artists: { name: string }[];
    images: { url: string }[];
  };
  name: string;
  external_urls: { spotify: string };
  isPlaying?: boolean; // Add isPlaying property
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SpotifyNowPlaying() {
  const { data, error } = useSWR<SpotifyTrack>("/api/spotify", fetcher);

  if (error) {
    console.error("SWR Spotify error:", error);
    return null; // Or display a user-friendly error
  }

  if (!data || !data.isPlaying) {
    return null; // Or a loading state, or a message like "Not playing anything" if desired
  }

  const albumImage = data.album?.images[0]?.url; // Safe navigation
  const artists = data.album?.artists?.map((artist) => artist.name).join(", "); // Safe navigation

  return (
    <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg mt-8 max-w-md mx-auto">
      {albumImage && (
        <img src={albumImage} alt={data.album.name} className="w-16 h-16 rounded" />
      )}
      <div className="flex-1">
        <p className="text-sm text-gray-400">{data.isPlaying ? "Now playing" : "Last played"}</p>
        <a href={data.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:underline">
          {data.name}
        </a>
        <p className="text-gray-400 text-sm">{artists}</p>
      </div>
      <PlayIcon className="text-green-500 w-6 h-6" />
    </div>
  );
}

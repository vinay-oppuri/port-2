// types/index.ts
export interface NowPlayingData {
    album?: string;
    albumImageUrl?: string;
    artist?: string;
    isPlaying: boolean;
    songUrl?: string;
    name?: string;
    source?: "current" | "recent";
  }
  
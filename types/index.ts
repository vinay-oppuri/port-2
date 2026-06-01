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

export type ContributionDay = {
  contributionCount: number;
  date: string;
  color: string;
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export type ContributionCalendar = {
  totalContributions: number;
  colors: string[];
  weeks: ContributionWeek[];
};

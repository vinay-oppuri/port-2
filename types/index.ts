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

type ContributionDay = {
  contributionCount: number;
  date: string;
  color: string;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

type ContributionCalendar = {
  totalContributions: number;
  colors: string[];
  weeks: ContributionWeek[];
};

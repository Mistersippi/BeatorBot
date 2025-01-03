export interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  score: number;
  totalTracks: number;
  genre: string;
  timestamp: string;
  avatarUrl?: string;
  previousRank?: number;
  badges?: string[];
  // New fields
  totalChallenges: number;
  winStreak: number;
  bestGenre: string;
  isFriend?: boolean;
  lastActive: string;
}

export type LeaderboardFilter = 'all' | 'friends' | 'weekly' | 'monthly';
export type GenreFilter = 'all' | 'pop' | 'rock' | 'jazz' | 'classical' | 'edm' | 'hiphop';
export type SortOption = 'score' | 'recent' | 'streak' | 'total_challenges';
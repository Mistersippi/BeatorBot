import { GameResult, Answer } from '../Challenge/types';
import type { Database } from '../../../lib/database.types';

export interface ResultsProps {
  result: GameResult;
}

export interface ResultsStatsProps {
  result: GameResult;
}

export interface ResultsBreakdownProps {
  result: GameResult;
  tracks: Database['public']['Tables']['submissions']['Row'][];
}

export interface ResultsHeaderProps {
  result: GameResult;
  userProfile: Database['public']['Tables']['profiles']['Row'];
}

export interface ResultsActionsProps {
  result: GameResult;
  onShare: () => void;
  onPlayAgain: () => void;
}

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: GameResult;
}

export interface LeaderboardEntry extends Database['public']['Tables']['game_results']['Row'] {
  profile: Database['public']['Tables']['profiles']['Row'];
}

export interface LeaderboardProps {
  timeframe: 'daily' | 'weekly' | 'monthly' | 'all-time';
  genre?: string;
  limit?: number;
}

export interface LeaderboardStats {
  totalGames: number;
  averageScore: number;
  topGenres: Array<{
    genre: string;
    count: number;
    averageScore: number;
  }>;
  playerRank?: number;
  personalBest?: number;
}

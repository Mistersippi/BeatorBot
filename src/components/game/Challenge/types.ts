import type { Database } from '../../../lib/database.types';

export type GameTrack = Database['public']['Tables']['submissions']['Row'] & {
  duration: number;
};

export interface GameState {
  currentTrack: number;
  score: number;
  totalTracks: number;
  answers: Answer[];
  startTime: string;
  endTime?: string;
}

export interface Answer {
  trackId: string;
  guess: boolean;
  isCorrect: boolean;
  timeSpent: number;
}

export interface ProgressStats {
  correct: number;
  total: number;
  percentage: number;
  averageTime: number;
}

export interface GameResult {
  userId: string;
  genre: string;
  score: number;
  totalTracks: number;
  answers: Answer[];
  startTime: string;
  endTime: string;
  metadata: {
    averageTime: number;
    streakCount: number;
    genreAccuracy: Record<string, number>;
  };
}

export interface AudioPlayerState {
  isPlaying: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  volume: number;
}

export interface GuessButtonsProps {
  onGuess: (isAI: boolean) => void;
  disabled: boolean;
  timeLimit?: number;
}
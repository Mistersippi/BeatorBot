export type SubmissionStatus = 'all' | 'pending' | 'approved' | 'rejected';
export type SortOption = 'recent' | 'popular' | 'guesses';

export interface Submission {
  id: string;
  title: string;
  artist: string;
  genre: string;
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string;
  submittedAt: string;
  stats: {
    plays: number;
    uniquePlays: number;
    correctGuesses: number;
    incorrectGuesses: number;
    averageListenTime: number;
    shares: number;
  };
  analytics: {
    countries: { [key: string]: number };
    timeline: { date: string; plays: number }[];
    peakPosition: number;
  };
}
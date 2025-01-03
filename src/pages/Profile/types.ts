export interface Profile {
  id: string;
  auth_id: string;
  username: string;
  email: string;
  bio: string | null;
  avatar_url: string | null;
  account_status: 'active' | 'suspended' | 'deleted';
  account_type: 'user' | 'admin';
  has_set_username: boolean;
  metadata: {
    social_links?: {
      spotify?: string;
      soundcloud?: string;
      instagram?: string;
      twitter?: string;
    };
    preferences?: {
      visibility: 'public' | 'private' | 'friends';
      notifications: {
        challenges: boolean;
        comments: boolean;
        newsletter: boolean;
      };
    };
  };
  created_at: string;
  updated_at: string;
}

export interface GameStats {
  totalPlays: number;
  winRate: number;
  bestGenre: string;
  longestStreak: number;
  recentActivity: {
    date: string;
    genre: string;
    score: number;
  }[];
}

export interface FeaturedTrack {
  id: string;
  title: string;
  genre: string;
  plays: number;
  imageUrl: string;
  audioUrl: string;
}
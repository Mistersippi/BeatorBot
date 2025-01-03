import type { Database } from '../database.types';

export type UserRole = 'admin' | 'moderator' | 'user';

export interface AdminUser extends Database['public']['Tables']['users']['Row'] {
  role: UserRole;
}

export interface AdminStats {
  totalUsers: number;
  newUsersToday: number;
  pendingSubmissions: number;
  totalSubmissions: number;
  totalGuesses: number;
  accuracyRate: number;
}
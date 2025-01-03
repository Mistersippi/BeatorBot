import { Trophy, Music, Zap, Users } from 'lucide-react';
import type { LeaderboardEntry } from './types';

interface LeaderboardStatsProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

export function LeaderboardStats({ entries, currentUserId }: LeaderboardStatsProps) {
  const currentUser = entries.find(entry => entry.id === currentUserId);
  if (!currentUser) return null;

  const stats = [
    {
      icon: Trophy,
      label: 'Your Rank',
      value: `#${currentUser.rank}`,
      color: 'text-yellow-500'
    },
    {
      icon: Music,
      label: 'Best Genre',
      value: currentUser.bestGenre,
      color: 'text-purple-500'
    },
    {
      icon: Zap,
      label: 'Win Streak',
      value: currentUser.winStreak,
      color: 'text-orange-500'
    },
    {
      icon: Users,
      label: 'Total Challenges',
      value: currentUser.totalChallenges,
      color: 'text-blue-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {stats.map(({ icon: Icon, label, value, color }) => (
        <div key={label} className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-opacity-10 ${color} bg-current`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="font-semibold">{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
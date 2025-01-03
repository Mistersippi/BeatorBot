import { motion } from 'framer-motion';
import { Trophy, Target, Zap, Music } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { RecentActivity } from './RecentActivity';

const mockStats = {
  totalPlays: 150,
  winRate: 75,
  bestGenre: 'Jazz',
  longestStreak: 12,
  recentActivity: [
    { date: '2024-03-10', genre: 'Jazz', score: 8 },
    { date: '2024-03-09', genre: 'Pop', score: 7 },
    { date: '2024-03-08', genre: 'Rock', score: 9 }
  ]
};

export function GameStats() {
  const stats = [
    {
      icon: Trophy,
      label: 'Win Rate',
      value: `${mockStats.winRate}%`,
      color: 'text-yellow-500'
    },
    {
      icon: Target,
      label: 'Total Plays',
      value: mockStats.totalPlays,
      color: 'text-blue-500'
    },
    {
      icon: Zap,
      label: 'Best Streak',
      value: mockStats.longestStreak,
      color: 'text-orange-500'
    },
    {
      icon: Music,
      label: 'Best Genre',
      value: mockStats.bestGenre,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
      <RecentActivity activity={mockStats.recentActivity} />
    </div>
  );
}
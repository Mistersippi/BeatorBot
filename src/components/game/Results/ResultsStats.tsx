import { motion } from 'framer-motion';
import { Trophy, Clock, Zap, Target } from 'lucide-react';
import type { Track } from '../Challenge/types';

interface ResultsStatsProps {
  result: {
    score: number;
    totalTracks: number;
    metadata: {
      averageTime: number;
      streakCount: number;
      genreAccuracy: { [genre: string]: number };
      genre: string;
    };
  };
}

export function ResultsStats({ result }: ResultsStatsProps) {
  const accuracy = (result.score / result.totalTracks) * 100;
  const averageTime = result.metadata.averageTime;
  const streak = result.metadata.streakCount;
  
  const stats = [
    {
      icon: Trophy,
      label: 'Score',
      value: `${result.score}/${result.totalTracks}`,
      color: 'text-yellow-500',
      detail: `${accuracy.toFixed(1)}% accuracy`
    },
    {
      icon: Clock,
      label: 'Average Time',
      value: `${averageTime.toFixed(1)}s`,
      color: 'text-blue-500',
      detail: 'per track'
    },
    {
      icon: Zap,
      label: 'Best Streak',
      value: streak.toString(),
      color: 'text-purple-500',
      detail: 'correct in a row'
    },
    {
      icon: Target,
      label: 'Genre Accuracy',
      value: `${(result.metadata.genreAccuracy[result.metadata.genre] * 100).toFixed(1)}%`,
      color: 'text-green-500',
      detail: result.metadata.genre
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-4"
        >
          <div className="flex items-center space-x-3 mb-3">
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
            <span className="text-sm text-gray-600">{stat.label}</span>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.detail}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
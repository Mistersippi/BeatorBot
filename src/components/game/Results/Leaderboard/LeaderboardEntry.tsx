import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Minus, Medal } from 'lucide-react';
import type { LeaderboardEntry } from './types';

interface LeaderboardEntryProps {
  entry: LeaderboardEntry;
  isCurrentUser: boolean;
}

export function LeaderboardEntry({ entry, isCurrentUser }: LeaderboardEntryProps) {
  const { rank, previousRank, username, score, totalTracks, avatarUrl, badges = [] } = entry;
  const scorePercentage = Math.round((score / totalTracks) * 100);
  
  const rankChange = previousRank ? previousRank - rank : 0;
  const getRankChangeIcon = () => {
    if (rankChange > 0) return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (rankChange < 0) return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getMedalColor = () => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-amber-600';
    return 'text-purple-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative p-4 rounded-xl transition-colors
        ${isCurrentUser ? 'bg-purple-50 ring-2 ring-purple-200' : 'bg-white hover:bg-gray-50'}
      `}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 w-16">
          <Medal className={`w-5 h-5 ${getMedalColor()}`} />
          <span className="font-bold">{rank}</span>
          {rankChange !== 0 && getRankChangeIcon()}
        </div>

        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <img
              src={avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
              alt={username}
              className="w-10 h-10 rounded-full"
            />
            {isCurrentUser && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
            )}
          </div>

          <div>
            <div className="font-medium">{username}</div>
            {badges.length > 0 && (
              <div className="flex gap-1 mt-1">
                {badges.map((badge, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-right">
          <div className="font-bold text-lg">{scorePercentage}%</div>
          <div className="text-sm text-gray-500">
            {score}/{totalTracks} correct
          </div>
        </div>
      </div>
    </motion.div>
  );
}
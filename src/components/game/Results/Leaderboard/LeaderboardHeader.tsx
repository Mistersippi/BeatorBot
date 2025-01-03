import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export function LeaderboardHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
        <Trophy className="w-8 h-8 text-purple-600" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Global Leaderboard</h2>
      <p className="text-gray-600">See how you rank against other players worldwide</p>
    </motion.div>
  );
}
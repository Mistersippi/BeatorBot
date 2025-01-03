import { motion } from 'framer-motion';
import { ProgressStats } from './types';

interface ProgressTrackerProps {
  stats: ProgressStats;
}

export function ProgressTracker({ stats }: ProgressTrackerProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Your Progress</h2>
        <div className="text-lg">
          <span className="text-purple-600 font-bold">{stats.correct}</span>
          <span className="text-gray-400 mx-1">/</span>
          <span>{stats.total}</span>
        </div>
      </div>
      
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${stats.percentage}%` }}
          className="h-full bg-purple-600"
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <p className="text-center text-sm text-gray-600 mt-2">
        {stats.percentage}% Accuracy
      </p>
    </div>
  );
}
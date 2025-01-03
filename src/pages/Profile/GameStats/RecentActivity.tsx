import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface RecentActivityProps {
  activity: {
    date: string;
    genre: string;
    score: number;
  }[];
}

export function RecentActivity({ activity }: RecentActivityProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Activity className="w-5 h-5 text-purple-600" />
        <h2 className="font-semibold">Recent Activity</h2>
      </div>

      <div className="space-y-4">
        {activity.map((item, index) => (
          <motion.div
            key={item.date}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium">{item.genre}</p>
              <p className="text-sm text-gray-500">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{item.score}/10</p>
              <p className="text-sm text-gray-500">Score</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
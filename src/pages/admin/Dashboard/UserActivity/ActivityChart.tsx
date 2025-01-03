import { motion } from 'framer-motion';
import { BarChart2 } from 'lucide-react';

interface DataPoint {
  date: string;
  activeUsers: number;
}

interface ActivityChartProps {
  data: DataPoint[];
  isLoading?: boolean;
}

export function ActivityChart({ data, isLoading }: ActivityChartProps) {
  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.activeUsers));

  return (
    <div className="relative h-64">
      <div className="absolute inset-0 flex items-end justify-between gap-2">
        {data.map((point, index) => {
          const height = (point.activeUsers / maxValue) * 100;
          return (
            <motion.div
              key={point.date}
              className="relative flex-1"
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-purple-600 opacity-10 rounded-t-lg" />
              <div
                className="absolute inset-0 bg-purple-600 rounded-t-lg"
                style={{ height: `${height}%` }}
              />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
                {new Date(point.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">
                {point.activeUsers}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
import { motion } from 'framer-motion';
import { Play, Calendar } from 'lucide-react';

interface TimelineData {
  date: string;
  plays: number;
}

interface AnalyticsChartProps {
  timeline: TimelineData[];
}

export function AnalyticsChart({ timeline }: AnalyticsChartProps) {
  const maxPlays = Math.max(...timeline.map(day => day.plays));

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Play className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold">Plays Over Time</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>Last 7 days</span>
        </div>
      </div>

      <div className="relative h-48">
        <div className="absolute inset-0 flex items-end justify-between gap-2">
          {timeline.map((day, index) => {
            const height = (day.plays / maxPlays) * 100;
            return (
              <motion.div
                key={day.date}
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
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">
                  {day.plays}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
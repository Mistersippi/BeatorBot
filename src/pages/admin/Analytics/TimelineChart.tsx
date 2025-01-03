import { BarChart2 } from 'lucide-react';

interface TimelineChartProps {
  timeRange: '7d' | '30d' | '90d';
}

export function TimelineChart({ timeRange }: TimelineChartProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold">User Activity</h3>
        </div>
      </div>

      <div className="h-64 flex items-center justify-center text-gray-500">
        Activity data will appear here when the app is live
      </div>
    </div>
  );
}
import { motion } from 'framer-motion';
import { Users, Music2, Brain, Target } from 'lucide-react';

interface OverviewStatsProps {
  timeRange: '7d' | '30d' | '90d';
}

export function OverviewStats({ timeRange }: OverviewStatsProps) {
  // Placeholder data - will be replaced with real data when app is live
  const stats = [
    {
      icon: Users,
      label: 'Total Users',
      value: '0',
      change: '+0%',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Music2,
      label: 'Submissions',
      value: '0',
      change: '+0%',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: Brain,
      label: 'AI Detection Rate',
      value: '0%',
      change: '+0%',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Target,
      label: 'Avg. Daily Plays',
      value: '0',
      change: '+0%',
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(({ icon: Icon, label, value, change, color }) => (
        <motion.div
          key={label}
          whileHover={{ y: -2 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-lg ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="font-medium">{label}</h3>
          </div>

          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-semibold">{value}</p>
            <p className="text-sm text-green-600">{change}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
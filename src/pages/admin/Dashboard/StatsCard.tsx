import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  change?: number;
  changeLabel?: string;
  total?: number;
  icon: LucideIcon;
  color: 'blue' | 'purple' | 'green' | 'yellow';
}

const colorMap = {
  blue: 'text-blue-600 bg-blue-100',
  purple: 'text-purple-600 bg-purple-100',
  green: 'text-green-600 bg-green-100',
  yellow: 'text-yellow-600 bg-yellow-100'
};

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeLabel = 'increase',
  total,
  icon: Icon,
  color
}: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl p-6 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-3 rounded-lg ${colorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="font-medium text-gray-900">{title}</h3>
      </div>

      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-semibold">{value}</p>
        {change !== undefined && (
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+{change} {changeLabel}</span>
          </div>
        )}
        {total !== undefined && (
          <p className="text-sm text-gray-500">
            of {total} total
          </p>
        )}
      </div>
    </motion.div>
  );
}
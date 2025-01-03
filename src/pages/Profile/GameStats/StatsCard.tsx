import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: string;
}

export function StatsCard({ icon: Icon, label, value, color }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="p-4 bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-opacity-10 ${color} bg-current`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="font-semibold">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}
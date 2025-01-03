import { motion } from 'framer-motion';
import { Users, Shield, Clock } from 'lucide-react';

export function AccessStats() {
  const stats = [
    {
      icon: Users,
      label: 'Total Users',
      value: '0',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Shield,
      label: 'Active Roles',
      value: '3',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: Clock,
      label: 'Avg. Session',
      value: '0m',
      color: 'text-green-600 bg-green-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Access Overview</h3>
      <div className="space-y-4">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <motion.div
            key={label}
            whileHover={{ y: -2 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-medium">{label}</span>
            </div>
            <span className="text-lg font-semibold">{value}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
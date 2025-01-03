import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, Clock, XCircle } from 'lucide-react';
import { supabase } from '../../../lib/supabase/client';

interface UserStatsData {
  totalUsers: number;
  activeUsers: number;
  suspendedUsers: number;
  deletedUsers: number;
}

export function UserStats() {
  const [stats, setStats] = useState<UserStatsData>({
    totalUsers: 0,
    activeUsers: 0,
    suspendedUsers: 0,
    deletedUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { count: totalUsers } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true });

        const { count: activeUsers } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })
          .eq('account_status', 'active');

        const { count: suspendedUsers } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })
          .eq('account_status', 'suspended');

        const { count: deletedUsers } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })
          .eq('account_status', 'deleted');

        setStats({
          totalUsers: totalUsers || 0,
          activeUsers: activeUsers || 0,
          suspendedUsers: suspendedUsers || 0,
          deletedUsers: deletedUsers || 0
        });
      } catch (error) {
        console.error('Error fetching user stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const metrics = [
    {
      icon: Users,
      label: 'Total Users',
      value: stats.totalUsers,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: CheckCircle,
      label: 'Active Users',
      value: stats.activeUsers,
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Clock,
      label: 'Suspended',
      value: stats.suspendedUsers,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      icon: XCircle,
      label: 'Deleted',
      value: stats.deletedUsers,
      color: 'text-red-600 bg-red-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="font-semibold mb-4">User Statistics</h2>
      <div className="space-y-4">
        {metrics.map(({ icon: Icon, label, value, color }) => (
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
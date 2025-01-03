import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music2, CheckCircle, XCircle, Clock, BarChart2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase/client';

interface TrackStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  aiGenerated: number;
  humanCreated: number;
}

export function TrackStats() {
  const [stats, setStats] = useState<TrackStats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    aiGenerated: 0,
    humanCreated: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch total tracks
        const { count: total } = await supabase
          .from('submissions')
          .select('*', { count: 'exact', head: true });

        // Fetch pending tracks
        const { count: pending } = await supabase
          .from('submissions')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        // Fetch approved tracks
        const { count: approved } = await supabase
          .from('submissions')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'approved');

        // Fetch rejected tracks
        const { count: rejected } = await supabase
          .from('submissions')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'rejected');

        // Fetch AI vs human stats
        const { count: aiGenerated } = await supabase
          .from('submissions')
          .select('*', { count: 'exact', head: true })
          .eq('is_ai_generated', true);

        setStats({
          total: total || 0,
          pending: pending || 0,
          approved: approved || 0,
          rejected: rejected || 0,
          aiGenerated: aiGenerated || 0,
          humanCreated: (total || 0) - (aiGenerated || 0)
        });
      } catch (error) {
        console.error('Error fetching track stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 bg-gray-200 rounded" />
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const metrics = [
    {
      icon: Music2,
      label: 'Total Tracks',
      value: stats.total,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: Clock,
      label: 'Pending Review',
      value: stats.pending,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      icon: CheckCircle,
      label: 'Approved',
      value: stats.approved,
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: XCircle,
      label: 'Rejected',
      value: stats.rejected,
      color: 'text-red-600 bg-red-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-purple-600" />
          Track Statistics
        </h2>

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

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold mb-4">AI vs Human Distribution</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>AI Generated</span>
              <span>{Math.round((stats.aiGenerated / stats.total) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(stats.aiGenerated / stats.total) * 100}%` }}
                className="h-full bg-purple-600 rounded-full"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Human Created</span>
              <span>{Math.round((stats.humanCreated / stats.total) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(stats.humanCreated / stats.total) * 100}%` }}
                className="h-full bg-green-600 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
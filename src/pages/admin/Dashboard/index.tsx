import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Music2, CheckCircle, BarChart2 } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { RecentActivity } from './RecentActivity';
import { PendingSubmissions } from './PendingSubmissions';
import { UserActivity } from './UserActivity';
import { SubmissionDistribution } from './SubmissionDistribution';
import { supabase } from '../../../lib/supabase/client';
import type { AdminStats } from '../../../lib/admin/types';

export function Dashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    newUsersToday: 0,
    pendingSubmissions: 0,
    totalSubmissions: 0,
    totalGuesses: 0,
    accuracyRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch total users
        const { count: totalUsers } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true });

        // Fetch new users today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const { count: newUsersToday } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', today.toISOString());

        // Fetch submissions stats
        const { count: pendingSubmissions } = await supabase
          .from('submissions')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        const { count: totalSubmissions } = await supabase
          .from('submissions')
          .select('*', { count: 'exact', head: true });

        // Fetch guesses stats
        const { count: totalGuesses } = await supabase
          .from('guesses')
          .select('*', { count: 'exact', head: true });

        const { count: correctGuesses } = await supabase
          .from('guesses')
          .select('*', { count: 'exact', head: true })
          .eq('is_correct', true);

        setStats({
          totalUsers: totalUsers || 0,
          newUsersToday: newUsersToday || 0,
          pendingSubmissions: pendingSubmissions || 0,
          totalSubmissions: totalSubmissions || 0,
          totalGuesses: totalGuesses || 0,
          accuracyRate: totalGuesses ? Math.round((correctGuesses || 0) / totalGuesses * 100) : 0
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome to the Beat or Bot admin dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          change={stats.newUsersToday}
          changeLabel="new today"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Pending Submissions"
          value={stats.pendingSubmissions}
          total={stats.totalSubmissions}
          icon={Music2}
          color="purple"
        />
        <StatsCard
          title="Total Guesses"
          value={stats.totalGuesses}
          icon={CheckCircle}
          color="green"
        />
        <StatsCard
          title="Accuracy Rate"
          value={`${stats.accuracyRate}%`}
          icon={BarChart2}
          color="yellow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <UserActivity />
        </div>
        <SubmissionDistribution />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PendingSubmissions />
        <RecentActivity />
      </div>
    </div>
  );
}
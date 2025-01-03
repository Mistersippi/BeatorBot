import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, User, Music2, CheckCircle } from 'lucide-react';
import { supabase } from '../../../lib/supabase/client';

interface ActivityEvent {
  id: string;
  type: 'new_user' | 'new_submission' | 'submission_approved';
  title: string;
  description: string;
  timestamp: string;
  icon: typeof Activity;
  color: string;
}

export function RecentActivity() {
  const [activities, setActivities] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentActivity() {
      try {
        // Fetch recent user signups
        const { data: newUsers } = await supabase
          .from('users')
          .select('id, created_at, email')
          .order('created_at', { ascending: false })
          .limit(3);

        // Fetch recent submissions
        const { data: newSubmissions } = await supabase
          .from('submissions')
          .select('id, created_at, title, artist_name')
          .order('created_at', { ascending: false })
          .limit(3);

        // Fetch recently approved submissions
        const { data: approvedSubmissions } = await supabase
          .from('submissions')
          .select('id, approved_at, title, artist_name')
          .not('approved_at', 'is', null)
          .order('approved_at', { ascending: false })
          .limit(3);

        // Combine and sort activities
        const allActivities: ActivityEvent[] = [
          ...(newUsers?.map(user => ({
            id: `user-${user.id}`,
            type: 'new_user' as const,
            title: 'New User Signup',
            description: user.email,
            timestamp: user.created_at,
            icon: User,
            color: 'text-blue-600 bg-blue-100'
          })) || []),
          ...(newSubmissions?.map(sub => ({
            id: `sub-${sub.id}`,
            type: 'new_submission' as const,
            title: 'New Submission',
            description: `${sub.title} by ${sub.artist_name}`,
            timestamp: sub.created_at,
            icon: Music2,
            color: 'text-purple-600 bg-purple-100'
          })) || []),
          ...(approvedSubmissions?.map(sub => ({
            id: `app-${sub.id}`,
            type: 'submission_approved' as const,
            title: 'Submission Approved',
            description: `${sub.title} by ${sub.artist_name}`,
            timestamp: sub.approved_at!,
            icon: CheckCircle,
            color: 'text-green-600 bg-green-100'
          })) || [])
        ].sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ).slice(0, 5);

        setActivities(allActivities);
      } catch (error) {
        console.error('Error fetching recent activity:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentActivity();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 bg-gray-200 rounded" />
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-semibold">Recent Activity</h2>
      </div>

      {activities.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No recent activity</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className={`p-2 rounded-lg ${activity.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-600 truncate">{activity.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
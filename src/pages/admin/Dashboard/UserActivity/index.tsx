import { useState, useEffect } from 'react';
import { BarChart2 } from 'lucide-react';
import { supabase } from '../../../../lib/supabase/client';
import { DateRangeFilter } from './DateRangeFilter';
import { ActivityChart } from './ActivityChart';

type DateRange = '24h' | '7d' | '30d' | '90d';

interface DataPoint {
  date: string;
  activeUsers: number;
}

export function UserActivity() {
  const [dateRange, setDateRange] = useState<DateRange>('7d');
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivityData() {
      try {
        setLoading(true);
        const { data: sessions, error } = await supabase
          .from('user_sessions')
          .select('started_at')
          .gte('started_at', getStartDate(dateRange))
          .order('started_at', { ascending: true });

        if (error) throw error;

        // Group sessions by date and count unique users
        const groupedData = sessions?.reduce((acc: Record<string, number>, session) => {
          const date = new Date(session.started_at).toISOString().split('T')[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        // Convert to array format
        const chartData = Object.entries(groupedData || {}).map(([date, count]) => ({
          date,
          activeUsers: count
        }));

        setData(chartData);
      } catch (error) {
        console.error('Error fetching activity data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchActivityData();
  }, [dateRange]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold">User Activity</h3>
        </div>
        <DateRangeFilter
          currentRange={dateRange}
          onChange={setDateRange}
        />
      </div>

      <ActivityChart data={data} isLoading={loading} />
    </div>
  );
}

function getStartDate(range: DateRange): string {
  const now = new Date();
  switch (range) {
    case '24h':
      return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    case '7d':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    case '30d':
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    case '90d':
      return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString();
  }
}
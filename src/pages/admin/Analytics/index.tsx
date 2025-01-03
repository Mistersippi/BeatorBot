import { useState } from 'react';
import { OverviewStats } from './OverviewStats';
import { TimelineChart } from './TimelineChart';
import { GeographicDistribution } from './GeographicDistribution';
import { UserRetention } from './UserRetention';

export function Analytics() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-gray-600">Track platform performance and user engagement</p>
      </div>

      <div className="space-y-6">
        <OverviewStats timeRange={timeRange} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TimelineChart timeRange={timeRange} />
          <GeographicDistribution />
        </div>

        <UserRetention />
      </div>
    </div>
  );
}
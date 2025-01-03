import { useState } from 'react';
import { SubmissionsHeader } from './SubmissionsHeader';
import { SubmissionsList } from './SubmissionsList';
import { SubmissionStats } from './SubmissionStats';
import { SubmissionFilters } from './SubmissionFilters';
import { AnalyticsOverview } from './AnalyticsOverview';
import { useSubmissions } from '../../lib/submissions/hooks';
import type { SubmissionStatus, SortOption } from './types';

export function Submissions() {
  const [status, setStatus] = useState<SubmissionStatus>('all');
  const [sort, setSort] = useState<SortOption>('recent');
  const { submissions, loading, error } = useSubmissions();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-24 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <SubmissionsHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <SubmissionFilters
              currentStatus={status}
              currentSort={sort}
              onStatusChange={setStatus}
              onSortChange={setSort}
            />
            <SubmissionsList 
              submissions={submissions}
              status={status} 
              sort={sort}
              loading={loading}
              error={error}
            />
          </div>
          <div className="space-y-8">
            <SubmissionStats submissions={submissions} />
            <AnalyticsOverview />
          </div>
        </div>
      </div>
    </div>
  );
}
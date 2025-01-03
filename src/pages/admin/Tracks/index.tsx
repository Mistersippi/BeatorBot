import { useState } from 'react';
import { TracksList } from './TracksList';
import { TrackFilters } from './TrackFilters';
import { TrackStats } from './TrackStats';

export type TrackFilter = 'all' | 'pending' | 'approved' | 'rejected';
export type SortOption = 'recent' | 'oldest' | 'title' | 'artist';

export function Tracks() {
  const [filter, setFilter] = useState<TrackFilter>('all');
  const [sort, setSort] = useState<SortOption>('recent');
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Track Management</h1>
        <p className="text-gray-600">Review and manage track submissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <TrackFilters
            filter={filter}
            sort={sort}
            search={search}
            onFilterChange={setFilter}
            onSortChange={setSort}
            onSearchChange={setSearch}
          />
          <TracksList
            filter={filter}
            sort={sort}
            search={search}
          />
        </div>
        <div>
          <TrackStats />
        </div>
      </div>
    </div>
  );
}
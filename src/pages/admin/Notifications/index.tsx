import { useState } from 'react';
import { NotificationsList } from './NotificationsList';
import { NotificationFilters } from './NotificationFilters';
import { NotificationStats } from './NotificationStats';
import { NotificationComposer } from './NotificationComposer';

export function Notifications() {
  const [filter, setFilter] = useState<'all' | 'sent' | 'scheduled' | 'draft'>('all');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Notifications</h1>
        <p className="text-gray-600">Manage and send notifications to users</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <NotificationFilters
            currentFilter={filter}
            onFilterChange={setFilter}
          />
          <NotificationsList filter={filter} />
        </div>
        <div className="space-y-6">
          <NotificationStats />
          <NotificationComposer />
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { UsersList } from './UsersList';
import { UserFilters } from './UserFilters';
import { UserStats } from './UserStats';
import type { UserFilter, SortOption } from './types';

export function Users() {
  const [filter, setFilter] = useState<UserFilter>('all');
  const [sort, setSort] = useState<SortOption>('recent');
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-gray-600">Manage user accounts and permissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <UserFilters
            filter={filter}
            sort={sort}
            search={search}
            onFilterChange={setFilter}
            onSortChange={setSort}
            onSearchChange={setSearch}
          />
          <UsersList
            filter={filter}
            sort={sort}
            search={search}
          />
        </div>
        <div>
          <UserStats />
        </div>
      </div>
    </div>
  );
}
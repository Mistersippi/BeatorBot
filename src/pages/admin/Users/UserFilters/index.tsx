import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { FilterTabs } from './FilterTabs';
import { SortDropdown } from './SortDropdown';
import type { UserFilter, SortOption } from '../Users';

interface UserFiltersProps {
  filter: UserFilter;
  sort: SortOption;
  search: string;
  onFilterChange: (filter: UserFilter) => void;
  onSortChange: (sort: SortOption) => void;
  onSearchChange: (search: string) => void;
}

export function UserFilters({
  filter,
  sort,
  search,
  onFilterChange,
  onSortChange,
  onSearchChange
}: UserFiltersProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search users by name or email..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <FilterTabs currentFilter={filter} onFilterChange={onFilterChange} />
        <SortDropdown currentSort={sort} onSortChange={onSortChange} />
      </div>
    </div>
  );
}
import { motion } from 'framer-motion';
import { Search, Users, CheckCircle, Clock, XCircle } from 'lucide-react';
import type { UserFilter, SortOption } from './types';

interface UserFiltersProps {
  filter: UserFilter;
  sort: SortOption;
  search: string;
  onFilterChange: (filter: UserFilter) => void;
  onSortChange: (sort: SortOption) => void;
  onSearchChange: (search: string) => void;
}

const filters: { value: UserFilter; label: string; icon: typeof Users }[] = [
  { value: 'all', label: 'All Users', icon: Users },
  { value: 'active', label: 'Active', icon: CheckCircle },
  { value: 'suspended', label: 'Suspended', icon: Clock },
  { value: 'deleted', label: 'Deleted', icon: XCircle }
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'username', label: 'Username A-Z' },
  { value: 'email', label: 'Email A-Z' }
];

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
        <div className="flex flex-wrap gap-2">
          {filters.map(({ value, label, icon: Icon }) => (
            <motion.button
              key={value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onFilterChange(value)}
              className={`
                inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium
                ${filter === value 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
              `}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </motion.button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {sortOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              Sort by: {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
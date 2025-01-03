import { ChevronDown } from 'lucide-react';
import type { SortOption } from '../Users';

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function SortDropdown({ currentSort, onSortChange }: SortDropdownProps) {
  const options: { value: SortOption; label: string }[] = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'username', label: 'Username A-Z' },
    { value: 'email', label: 'Email A-Z' }
  ];

  return (
    <div className="relative">
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="appearance-none bg-white pl-4 pr-10 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            Sort by: {label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}
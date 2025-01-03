import { motion } from 'framer-motion';
import { Clock, TrendingUp } from 'lucide-react';
import type { SubmissionStatus, SortOption } from './types';

interface SubmissionFiltersProps {
  currentStatus: SubmissionStatus;
  currentSort: SortOption;
  onStatusChange: (status: SubmissionStatus) => void;
  onSortChange: (sort: SortOption) => void;
}

const statusFilters: { value: SubmissionStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' }
];

const sortOptions: { value: SortOption; label: string; icon: typeof Clock }[] = [
  { value: 'recent', label: 'Most Recent', icon: Clock },
  { value: 'popular', label: 'Most Popular', icon: TrendingUp }
];

export function SubmissionFilters({
  currentStatus,
  currentSort,
  onStatusChange,
  onSortChange
}: SubmissionFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-xl p-4 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {statusFilters.map(({ value, label }) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStatusChange(value)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium
              ${currentStatus === value 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
            `}
          >
            {label}
          </motion.button>
        ))}
      </div>

      <div className="flex gap-2">
        {sortOptions.map(({ value, label, icon: Icon }) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSortChange(value)}
            className={`
              inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium
              ${currentSort === value 
                ? 'bg-purple-100 text-purple-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
            `}
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
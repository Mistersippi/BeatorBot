import { motion } from 'framer-motion';
import { Users, CheckCircle, XCircle, Clock } from 'lucide-react';
import type { UserFilter } from '../Users';

interface FilterTabsProps {
  currentFilter: UserFilter;
  onFilterChange: (filter: UserFilter) => void;
}

export function FilterTabs({ currentFilter, onFilterChange }: FilterTabsProps) {
  const filters = [
    { value: 'all', label: 'All Users', icon: Users },
    { value: 'active', label: 'Active', icon: CheckCircle },
    { value: 'suspended', label: 'Suspended', icon: Clock },
    { value: 'deleted', label: 'Deleted', icon: XCircle }
  ] as const;

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ value, label, icon: Icon }) => (
        <motion.button
          key={value}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onFilterChange(value)}
          className={`
            inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium
            ${currentFilter === value 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
          `}
        >
          <Icon className="w-4 h-4 mr-2" />
          {label}
        </motion.button>
      ))}
    </div>
  );
}
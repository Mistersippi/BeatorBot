import { motion } from 'framer-motion';
import { Bell, Clock, Send, FileEdit } from 'lucide-react';

interface NotificationFiltersProps {
  currentFilter: 'all' | 'sent' | 'scheduled' | 'draft';
  onFilterChange: (filter: 'all' | 'sent' | 'scheduled' | 'draft') => void;
}

export function NotificationFilters({ currentFilter, onFilterChange }: NotificationFiltersProps) {
  const filters = [
    { value: 'all', label: 'All', icon: Bell },
    { value: 'sent', label: 'Sent', icon: Send },
    { value: 'scheduled', label: 'Scheduled', icon: Clock },
    { value: 'draft', label: 'Drafts', icon: FileEdit }
  ] as const;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
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
    </div>
  );
}
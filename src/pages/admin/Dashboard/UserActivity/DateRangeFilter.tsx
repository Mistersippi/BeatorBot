import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

type DateRange = '24h' | '7d' | '30d' | '90d';

interface DateRangeFilterProps {
  currentRange: DateRange;
  onChange: (range: DateRange) => void;
}

export function DateRangeFilter({ currentRange, onChange }: DateRangeFilterProps) {
  const ranges: { value: DateRange; label: string }[] = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  return (
    <div className="flex items-center gap-2">
      <Calendar className="w-5 h-5 text-gray-400" />
      <div className="flex gap-2">
        {ranges.map(({ value, label }) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(value)}
            className={`
              px-3 py-1 text-sm rounded-lg
              ${currentRange === value 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
            `}
          >
            {label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
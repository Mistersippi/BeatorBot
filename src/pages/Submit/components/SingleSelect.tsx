import { useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, Check } from 'lucide-react';

interface SingleSelectProps {
  label: string;
  icon: LucideIcon;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
}

export function SingleSelect({
  label,
  icon: Icon,
  options,
  value,
  onChange,
  helperText
}: SingleSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          {label}
        </div>
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          {value || 'Select an option...'}
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-1"
          >
            {options.map(option => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-purple-50 flex items-center justify-between"
              >
                <span className={value === option ? 'text-purple-600 font-medium' : 'text-gray-700'}>
                  {option}
                </span>
                {value === option && (
                  <Check className="w-4 h-4 text-purple-600" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {helperText && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
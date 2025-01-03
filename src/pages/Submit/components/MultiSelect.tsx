import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, X, Search } from 'lucide-react';

interface MultiSelectProps {
  label: string;
  icon: LucideIcon;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  helperText?: string;
}

export function MultiSelect({
  label,
  icon: Icon,
  options,
  value,
  onChange,
  helperText
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    const newValue = value.includes(option)
      ? value.filter(v => v !== option)
      : [...value, option];
    onChange(newValue);
  };

  // Group options by category
  const categories = options.reduce((acc, option) => {
    if (option.startsWith('//')) {
      const category = option.slice(2).trim();
      acc[category] = [];
    } else if (option.trim() && Object.keys(acc).length > 0) {
      const lastCategory = Object.keys(acc)[Object.keys(acc).length - 1];
      if (option.toLowerCase().includes(searchQuery.toLowerCase())) {
        acc[lastCategory].push(option);
      }
    }
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="space-y-2" ref={containerRef}>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Icon className="w-4 h-4 text-purple-600" />
          {label}
        </label>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          {isOpen ? 'Done' : 'Add Tags'}
        </button>
      </div>

      {/* Selected Tags Display */}
      <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-2 rounded-lg border border-gray-200 bg-white">
        {value.length === 0 ? (
          <span className="text-sm text-gray-500">No {label.toLowerCase()} selected</span>
        ) : (
          value.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium group hover:bg-purple-200 transition-colors"
            >
              {tag}
              <button
                onClick={() => toggleOption(tag)}
                className="hover:bg-purple-200 rounded-full p-0.5 focus:outline-none"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-lg"
          >
            {/* Search Bar */}
            <div className="p-3 border-b border-gray-200 bg-gray-50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${label.toLowerCase()}...`}
                  className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Tags Grid */}
            <div className="max-h-[400px] overflow-y-auto p-3 space-y-4">
              {Object.entries(categories).map(([category, categoryOptions]) => (
                <div key={category} className="space-y-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categoryOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => toggleOption(option)}
                        className={`
                          px-3 py-2 rounded-lg text-sm font-medium text-left
                          transition-colors duration-150 hover:bg-purple-50
                          ${value.includes(option)
                            ? 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                            : 'bg-gray-50 text-gray-700 hover:bg-purple-50'
                          }
                        `}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {searchQuery && Object.values(categories).flat().length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No matching {label.toLowerCase()} found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {helperText && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
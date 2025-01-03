import { useState } from 'react';
import { LucideIcon, X, Search } from 'lucide-react';

interface TagSelectorProps {
  label: string;
  icon: LucideIcon;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  helperText?: string;
}

export function TagSelector({
  label,
  icon: Icon,
  options,
  value,
  onChange,
  helperText
}: TagSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTag = (tag: string) => {
    const newValue = value.includes(tag)
      ? value.filter(v => v !== tag)
      : [...value, option];
    onChange(newValue);
  };

  // Group options by category
  const categories = options.reduce((acc, option) => {
    if (option.startsWith('//')) {
      const currentCategory = option.slice(2).trim();
      acc[currentCategory] = [];
    } else if (option.trim()) {
      const currentCategory = Object.keys(acc)[Object.keys(acc).length - 1];
      if (currentCategory && option.toLowerCase().includes(searchQuery.toLowerCase())) {
        acc[currentCategory].push(option);
      }
    }
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Icon className="w-4 h-4 text-purple-600" />
          {label}
        </label>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${label.toLowerCase()}...`}
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        />
      </div>

      {/* Selected Tags */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium group hover:bg-purple-200 transition-colors"
            >
              {tag}
              <button
                onClick={() => toggleTag(tag)}
                className="hover:bg-purple-200 rounded-full p-0.5 focus:outline-none"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Tag Categories */}
      <div className="space-y-6">
        {Object.entries(categories).map(([category, categoryTags]) => (
          <div key={category} className="space-y-3">
            <h3 className="text-sm font-medium text-gray-500">
              {category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categoryTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium text-left
                    transition-colors duration-150
                    ${value.includes(tag)
                      ? 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                      : 'bg-gray-50 text-gray-700 hover:bg-purple-50'
                    }
                  `}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ))}

        {searchQuery && Object.values(categories).flat().length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No matching {label.toLowerCase()} found
          </div>
        )}
      </div>

      {helperText && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}

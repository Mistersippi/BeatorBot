import { useState, useMemo } from 'react';
import { LucideIcon, ChevronRight, X, AlertCircle } from 'lucide-react';

interface Category {
  name: string;
  description: string;
  moods?: string[];
  activities?: string[];
}

interface CategorySelectProps {
  label: string;
  icon: LucideIcon;
  categories: Record<string, Category>;
  value: string[];
  onChange: (value: string[]) => void;
  helperText?: string;
  type: 'mood' | 'activity';
}

const MAX_CATEGORIES = 3;
const MAX_ITEMS_PER_CATEGORY = 3;

export function CategorySelect({
  label,
  icon: Icon,
  categories,
  value,
  onChange,
  helperText,
  type
}: CategorySelectProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Group selected items by their categories
  const selectedByCategory = useMemo(() => {
    const result: Record<string, string[]> = {};
    Object.entries(categories).forEach(([categoryKey, category]) => {
      const items = type === 'mood' ? category.moods : category.activities;
      const selectedInCategory = items?.filter(item => value.includes(item)) || [];
      if (selectedInCategory.length > 0) {
        result[categoryKey] = selectedInCategory;
      }
    });
    return result;
  }, [categories, value, type]);

  const selectedCategoriesCount = Object.keys(selectedByCategory).length;

  const toggleItem = (item: string, categoryKey: string) => {
    if (value.includes(item)) {
      // Always allow removing items
      onChange(value.filter(v => v !== item));
    } else {
      // Check if we can add more items
      const currentCategoryItems = selectedByCategory[categoryKey] || [];
      
      if (currentCategoryItems.length >= MAX_ITEMS_PER_CATEGORY) {
        alert(`You can only select up to ${MAX_ITEMS_PER_CATEGORY} items per category`);
        return;
      }

      if (!selectedByCategory[categoryKey] && selectedCategoriesCount >= MAX_CATEGORIES) {
        alert(`You can only select items from ${MAX_CATEGORIES} categories`);
        return;
      }

      onChange([...value, item]);
    }
  };

  const getItemsForCategory = (category: Category) => {
    return type === 'mood' ? category.moods || [] : category.activities || [];
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-purple-600" />
          {label}
        </div>
      </label>

      {/* Selection Limits Info */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <AlertCircle className="w-4 h-4" />
        <span>
          Select up to {MAX_ITEMS_PER_CATEGORY} items from {MAX_CATEGORIES} different categories
        </span>
      </div>

      {/* Selected Items */}
      {value.length > 0 && (
        <div className="space-y-3">
          {Object.entries(selectedByCategory).map(([categoryKey, items]) => (
            <div key={categoryKey} className="space-y-1">
              <div className="text-sm font-medium text-gray-500">
                {categories[categoryKey].name} ({items.length}/{MAX_ITEMS_PER_CATEGORY})
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map(item => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium group hover:bg-purple-200 transition-colors"
                  >
                    {item}
                    <button
                      onClick={() => toggleItem(item, categoryKey)}
                      className="hover:bg-purple-200 rounded-full p-0.5 focus:outline-none"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {selectedCategory ? (
          <div>
            {/* Category Header */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="w-full px-4 py-3 bg-gray-50 border-b border-gray-200 text-left flex items-center gap-2 hover:bg-gray-100"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span className="font-medium">{categories[selectedCategory].name}</span>
              <span className="text-sm text-gray-500">
                {categories[selectedCategory].description}
              </span>
              {selectedByCategory[selectedCategory] && (
                <span className="ml-auto text-sm text-purple-600">
                  {selectedByCategory[selectedCategory].length}/{MAX_ITEMS_PER_CATEGORY} selected
                </span>
              )}
            </button>

            {/* Items Grid */}
            <div className="p-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {getItemsForCategory(categories[selectedCategory]).map(item => (
                <button
                  key={item}
                  onClick={() => toggleItem(item, selectedCategory)}
                  disabled={!value.includes(item) && 
                    selectedByCategory[selectedCategory]?.length >= MAX_ITEMS_PER_CATEGORY}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium text-left
                    transition-colors duration-150
                    ${value.includes(item)
                      ? 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                      : selectedByCategory[selectedCategory]?.length >= MAX_ITEMS_PER_CATEGORY
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-50 text-gray-700 hover:bg-purple-50'
                    }
                  `}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Categories List */
          <div className="divide-y divide-gray-200">
            {Object.entries(categories).map(([key, category]) => {
              const isSelectable = selectedByCategory[key] || selectedCategoriesCount < MAX_CATEGORIES;
              const selectedCount = selectedByCategory[key]?.length || 0;

              return (
                <button
                  key={key}
                  onClick={() => isSelectable && setSelectedCategory(key)}
                  disabled={!isSelectable}
                  className={`
                    w-full px-4 py-3 text-left flex items-center justify-between
                    ${isSelectable ? 'hover:bg-gray-50 group' : 'opacity-50 cursor-not-allowed'}
                  `}
                >
                  <div>
                    <div className="font-medium text-gray-900">{category.name}</div>
                    <div className="text-sm text-gray-500">{category.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedCount > 0 && (
                      <span className="text-sm text-purple-600">
                        {selectedCount}/{MAX_ITEMS_PER_CATEGORY}
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {helperText && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}

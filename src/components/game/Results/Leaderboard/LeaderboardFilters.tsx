import { motion } from 'framer-motion';
import { Users, Calendar, Trophy, Music } from 'lucide-react';
import type { LeaderboardFilter, GenreFilter } from './types';

interface LeaderboardFiltersProps {
  currentFilter: LeaderboardFilter;
  currentGenre: GenreFilter;
  onFilterChange: (filter: LeaderboardFilter) => void;
  onGenreChange: (genre: GenreFilter) => void;
}

export function LeaderboardFilters({
  currentFilter,
  currentGenre,
  onFilterChange,
  onGenreChange
}: LeaderboardFiltersProps) {
  const filters: { id: LeaderboardFilter; label: string; icon: typeof Users }[] = [
    { id: 'all', label: 'All Players', icon: Trophy },
    { id: 'friends', label: 'Friends', icon: Users },
    { id: 'weekly', label: 'This Week', icon: Calendar },
    { id: 'monthly', label: 'This Month', icon: Calendar }
  ];

  const genres: { id: GenreFilter; label: string }[] = [
    { id: 'all', label: 'All Genres' },
    { id: 'pop', label: 'Pop' },
    { id: 'rock', label: 'Rock' },
    { id: 'jazz', label: 'Jazz' },
    { id: 'classical', label: 'Classical' },
    { id: 'edm', label: 'EDM' },
    { id: 'hiphop', label: 'Hip Hop' }
  ];

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-wrap gap-2">
        {filters.map(({ id, label, icon: Icon }) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onFilterChange(id)}
            className={`
              inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium
              ${currentFilter === id 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-50 text-purple-600 hover:bg-purple-100'}
            `}
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </motion.button>
        ))}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Music className="w-4 h-4 text-gray-400 flex-shrink-0" />
        {genres.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onGenreChange(id)}
            className={`
              px-3 py-1 rounded-full text-sm whitespace-nowrap
              ${currentGenre === id 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
            `}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
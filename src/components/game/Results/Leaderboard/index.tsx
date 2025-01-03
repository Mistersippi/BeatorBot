import { useState } from 'react';
import { motion } from 'framer-motion';
import { LeaderboardHeader } from './LeaderboardHeader';
import { LeaderboardFilters } from './LeaderboardFilters';
import { LeaderboardStats } from './LeaderboardStats';
import { LeaderboardSort } from './LeaderboardSort';
import { LeaderboardEntry } from './LeaderboardEntry';
import { LeaderboardSkeleton } from './LeaderboardSkeleton';
import type { LeaderboardProps, LeaderboardFilter, GenreFilter, SortOption } from './types';

export function Leaderboard({ 
  entries, 
  currentUserId,
  isLoading,
  onLoadMore,
  hasMore = false
}: LeaderboardProps) {
  const [currentFilter, setCurrentFilter] = useState<LeaderboardFilter>('all');
  const [currentGenre, setCurrentGenre] = useState<GenreFilter>('all');
  const [currentSort, setCurrentSort] = useState<SortOption>('score');

  // Filter and sort entries based on current selections
  const filteredEntries = entries.filter(entry => {
    if (currentFilter === 'friends' && !entry.isFriend) return false;
    if (currentGenre !== 'all' && entry.genre !== currentGenre) return false;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <LeaderboardHeader />
      <LeaderboardStats entries={entries} currentUserId={currentUserId} />
      <LeaderboardFilters
        currentFilter={currentFilter}
        currentGenre={currentGenre}
        onFilterChange={setCurrentFilter}
        onGenreChange={setCurrentGenre}
      />
      <LeaderboardSort
        currentSort={currentSort}
        onSortChange={setCurrentSort}
      />
      
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {isLoading ? (
          <LeaderboardSkeleton />
        ) : (
          filteredEntries.map((entry) => (
            <LeaderboardEntry
              key={entry.id}
              entry={entry}
              isCurrentUser={entry.id === currentUserId}
            />
          ))
        )}
        
        {!isLoading && filteredEntries.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No entries found for the selected filters
          </div>
        )}
      </div>
    </motion.div>
  );
}
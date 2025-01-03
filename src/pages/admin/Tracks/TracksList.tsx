import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../../lib/supabase/client';
import { TrackCard } from './TrackCard';
import type { TrackFilter, SortOption } from './index';
import type { Database } from '../../../lib/database.types';

type Track = Database['public']['Tables']['submissions']['Row'];

interface TracksListProps {
  filter: TrackFilter;
  sort: SortOption;
  search: string;
}

export function TracksList({ filter, sort, search }: TracksListProps) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        let query = supabase
          .from('submissions')
          .select('*');

        // Apply filter
        if (filter !== 'all') {
          query = query.eq('status', filter);
        }

        // Apply search
        if (search) {
          query = query.or(`title.ilike.%${search}%,artist_name.ilike.%${search}%`);
        }

        // Apply sort
        switch (sort) {
          case 'recent':
            query = query.order('created_at', { ascending: false });
            break;
          case 'oldest':
            query = query.order('created_at', { ascending: true });
            break;
          case 'title':
            query = query.order('title', { ascending: true });
            break;
          case 'artist':
            query = query.order('artist_name', { ascending: true });
            break;
        }

        const { data, error } = await query;
        if (error) throw error;
        setTracks(data || []);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTracks();
  }, [filter, sort, search]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-gray-100 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tracks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white rounded-xl"
          >
            <p className="text-gray-500">No tracks found</p>
          </motion.div>
        ) : (
          tracks.map((track) => (
            <motion.div
              key={track.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <TrackCard track={track} onStatusChange={() => {
                // Refetch tracks when status changes
                setTracks(prev => prev.filter(t => t.id !== track.id));
              }} />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
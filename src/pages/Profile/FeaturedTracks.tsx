import { motion } from 'framer-motion';
import { Music, Play, Pause } from 'lucide-react';
import { useState } from 'react';

const mockTracks = [
  {
    id: '1',
    title: 'Summer Breeze',
    genre: 'Jazz',
    plays: 1234,
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    audioUrl: 'https://example.com/track1.mp3'
  },
  {
    id: '2',
    title: 'Night Drive',
    genre: 'Electronic',
    plays: 987,
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
    audioUrl: 'https://example.com/track2.mp3'
  }
];

export function FeaturedTracks() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Music className="w-5 h-5 text-purple-600" />
        <h2 className="text-xl font-semibold">Featured Tracks</h2>
      </div>

      <div className="space-y-4">
        {mockTracks.map(track => (
          <motion.div
            key={track.id}
            whileHover={{ y: -2 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100"
          >
            <img
              src={track.imageUrl}
              alt={track.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            
            <div className="flex-1">
              <h3 className="font-medium">{track.title}</h3>
              <p className="text-sm text-gray-600">{track.genre}</p>
              <p className="text-sm text-gray-500">{track.plays.toLocaleString()} plays</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPlayingId(playingId === track.id ? null : track.id)}
              className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700"
            >
              {playingId === track.id ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
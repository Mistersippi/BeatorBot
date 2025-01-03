import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Music2, CheckCircle, XCircle, Clock, Play, 
  Pause, BarChart2, MessageSquare 
} from 'lucide-react';
import { supabase } from '../../../lib/supabase/client';
import type { Database } from '../../../lib/database.types';

type Track = Database['public']['Tables']['submissions']['Row'];

interface TrackCardProps {
  track: Track;
  onStatusChange: () => void;
}

export function TrackCard({ track, onStatusChange }: TrackCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusConfig = {
    pending: { 
      icon: Clock, 
      className: 'text-yellow-500 bg-yellow-50',
      label: 'Pending Review'
    },
    approved: { 
      icon: CheckCircle, 
      className: 'text-green-500 bg-green-50',
      label: 'Approved'
    },
    rejected: { 
      icon: XCircle, 
      className: 'text-red-500 bg-red-50',
      label: 'Rejected'
    }
  };

  const handleStatusChange = async (newStatus: Track['status']) => {
    try {
      setIsSubmitting(true);
      const { error } = await supabase
        .from('submissions')
        .update({ 
          status: newStatus,
          ...(newStatus === 'approved' ? { approved_at: new Date().toISOString() } : {}),
          ...(feedback ? { review_notes: feedback } : {})
        })
        .eq('id', track.id);

      if (error) throw error;
      onStatusChange();
    } catch (error) {
      console.error('Error updating track status:', error);
    } finally {
      setIsSubmitting(false);
      setShowFeedback(false);
    }
  };

  const StatusIcon = statusConfig[track.status].icon;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Music2 className="w-8 h-8 text-purple-600" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg">{track.title}</h3>
              <p className="text-gray-600">{track.artist_name}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${statusConfig[track.status].className}`}>
              <div className="flex items-center gap-1">
                <StatusIcon className="w-4 h-4" />
                <span>{statusConfig[track.status].label}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Genre</p>
              <p className="font-medium">{track.genre}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Submitted</p>
              <p className="font-medium">
                {new Date(track.created_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <p className="font-medium">{track.is_ai_generated ? 'AI' : 'Human'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-purple-600 text-white rounded-full"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </motion.button>

            <div className="flex-1 flex items-center gap-4">
              {track.status === 'pending' && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFeedback(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100"
                    disabled={isSubmitting}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Add Feedback
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleStatusChange('approved')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                    disabled={isSubmitting}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleStatusChange('rejected')}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                    disabled={isSubmitting}
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </motion.button>
                </>
              )}

              {track.status === 'approved' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100"
                >
                  <BarChart2 className="w-4 h-4" />
                  View Analytics
                </motion.button>
              )}
            </div>
          </div>

          {showFeedback && (
            <div className="mt-4">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Add feedback for the artist..."
                className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setShowFeedback(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleStatusChange('rejected')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Reject with Feedback
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
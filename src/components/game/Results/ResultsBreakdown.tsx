import { motion } from 'framer-motion';
import { Check, X, Clock, Music } from 'lucide-react';
import { ResultsBreakdownProps } from './types';

export function ResultsBreakdown({ result, tracks }: ResultsBreakdownProps) {
  const formatTime = (seconds: number) => {
    return `${seconds.toFixed(1)}s`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Track Breakdown</h3>
      <div className="space-y-4">
        {result.answers.map((answer, index) => {
          const track = tracks.find(t => t.id === answer.trackId);
          if (!track) return null;

          return (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50"
            >
              <div className="flex-shrink-0">
                {answer.isCorrect ? (
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <X className="w-5 h-5 text-red-600" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-medium truncate">{track.title}</h4>
                  <span className="text-xs text-gray-500">by {track.artist_name}</span>
                </div>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(answer.timeSpent)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Music className="w-4 h-4" />
                    <span>{track.is_ai_generated ? 'AI Generated' : 'Human Artist'}</span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 text-sm">
                <div className={`px-3 py-1 rounded-full ${
                  answer.isCorrect 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {answer.guess ? 'Guessed AI' : 'Guessed Human'}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X, Share2 } from 'lucide-react';
import type { Track } from './types';

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tracks: Track[];
  answers: boolean[];
  score: number;
}

export function ResultsModal({ isOpen, onClose, tracks, answers, score }: ResultsModalProps) {
  const percentage = Math.round((score / tracks.length) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="min-h-full flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="relative p-6">
                  <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>

                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                      <Award className="w-8 h-8 text-purple-600" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Challenge Complete!</h2>
                    <p className="text-xl text-gray-600">
                      You scored {score} out of {tracks.length} ({percentage}%)
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {tracks.map((track, index) => (
                      <div
                        key={track.id}
                        className={`flex items-center justify-between p-4 rounded-xl ${
                          answers[index] === track.isAI
                            ? 'bg-green-50 text-green-900'
                            : 'bg-red-50 text-red-900'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={track.imageUrl}
                            alt={track.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-medium">{track.title}</h3>
                            <p className="text-sm opacity-75">{track.artist}</p>
                          </div>
                        </div>
                        <div className="text-sm font-medium">
                          {track.isAI ? 'AI Generated' : 'Real Artist'}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={() => {/* Implement share functionality */}}
                      className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                    >
                      <Share2 className="w-5 h-5 mr-2" />
                      Share Results
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
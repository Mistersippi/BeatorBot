import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { AnalyticsChart } from './AnalyticsChart';
import { AnalyticsStats } from './AnalyticsStats';
import { GeographicDistribution } from './GeographicDistribution';
import type { Submission } from '../types';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission?: Submission;
}

export function AnalyticsModal({ isOpen, onClose, submission }: AnalyticsModalProps) {
  if (!submission) return null;

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
                className="w-full max-w-4xl bg-white rounded-2xl shadow-xl"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold">{submission.title}</h2>
                      <p className="text-gray-600">{submission.artist}</p>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-8">
                    <AnalyticsStats stats={submission.stats} />
                    <AnalyticsChart timeline={submission.analytics.timeline} />
                    <GeographicDistribution countries={submission.analytics.countries} />
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
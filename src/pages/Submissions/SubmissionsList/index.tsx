import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SubmissionCard } from './SubmissionCard';
import { AnalyticsModal } from '../AnalyticsModal';
import type { SubmissionStatus, SortOption } from '../types';
import type { Database } from '../../../lib/database.types';

type Submission = Database['public']['Tables']['submissions']['Row'];

interface SubmissionsListProps {
  submissions: Submission[];
  status: SubmissionStatus;
  sort: SortOption;
  loading: boolean;
  error: Error | null;
}

export function SubmissionsList({ 
  submissions,
  status,
  sort,
  loading,
  error 
}: SubmissionsListProps) {
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="text-center py-12 bg-white rounded-xl">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading submissions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-white rounded-xl">
        <p className="text-red-500">Failed to load submissions. Please try again.</p>
      </div>
    );
  }

  const filteredSubmissions = submissions.filter(submission => 
    status === 'all' || submission.status === status
  );

  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    if (sort === 'recent') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    return 0;
  });

  if (sortedSubmissions.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl">
        <Music2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
        <p className="text-gray-500 mb-6">
          Share your music with our community and let listeners discover your talent.
        </p>
        <Link 
          to="/submit"
          className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Submit Your First Track
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {sortedSubmissions.map((submission) => (
            <motion.div
              key={submission.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SubmissionCard
                submission={submission}
                onViewAnalytics={setSelectedSubmission}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnalyticsModal
        isOpen={!!selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
        submission={submissions.find(s => s.id === selectedSubmission)}
      />
    </>
  );
}
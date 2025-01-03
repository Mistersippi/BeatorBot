import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, BarChart2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../../../lib/supabase/client';
import type { Database } from '../../../lib/database.types';

type Submission = Database['public']['Tables']['submissions']['Row'];

interface SubmissionCardProps {
  submission: Submission;
  onViewAnalytics: (id: string) => void;
}

export function SubmissionCard({ submission, onViewAnalytics }: SubmissionCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const StatusIcon = statusConfig[submission.status].icon;

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this submission?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('submissions')
        .delete()
        .eq('id', submission.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting submission:', error);
      alert('Failed to delete submission. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl p-6 shadow-sm"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold mb-1">{submission.title}</h3>
          <p className="text-sm text-gray-600">{submission.artist_name}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-sm ${statusConfig[submission.status].className}`}>
            <div className="flex items-center gap-1">
              <StatusIcon className="w-4 h-4" />
              <span>{statusConfig[submission.status].label}</span>
            </div>
          </div>
          {submission.status === 'pending' && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
              title="Delete submission"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">Genre</p>
          <p className="font-semibold">{submission.genre}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Submitted</p>
          <p className="font-semibold">
            {new Date(submission.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Type</p>
          <p className="font-semibold">{submission.is_ai_generated ? 'AI' : 'Human'}</p>
        </div>
      </div>

      {submission.status === 'approved' ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onViewAnalytics(submission.id)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100"
        >
          <BarChart2 className="w-4 h-4" />
          View Analytics
        </motion.button>
      ) : (
        <div className="text-center text-sm text-gray-500 py-2">
          Analytics will be available after approval
        </div>
      )}
    </motion.div>
  );
}
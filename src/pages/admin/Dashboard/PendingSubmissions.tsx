import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music2, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../../lib/supabase/client';
import type { Database } from '../../../lib/database.types';

type Submission = Database['public']['Tables']['submissions']['Row'];

export function PendingSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPendingSubmissions() {
      try {
        const { data, error } = await supabase
          .from('submissions')
          .select('*')
          .eq('status', 'pending')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        setSubmissions(data || []);
      } catch (error) {
        console.error('Error fetching pending submissions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPendingSubmissions();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from('submissions')
        .update({ status: 'approved', approved_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      setSubmissions(prev => prev.filter(sub => sub.id !== id));
    } catch (error) {
      console.error('Error approving submission:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('submissions')
        .update({ status: 'rejected' })
        .eq('id', id);

      if (error) throw error;
      setSubmissions(prev => prev.filter(sub => sub.id !== id));
    } catch (error) {
      console.error('Error rejecting submission:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 bg-gray-200 rounded" />
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Music2 className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-semibold">Pending Submissions</h2>
      </div>

      {submissions.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No pending submissions</p>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <motion.div
              key={submission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h3 className="font-medium">{submission.title}</h3>
                <p className="text-sm text-gray-600">{submission.artist_name}</p>
                <p className="text-xs text-gray-500">
                  Submitted {new Date(submission.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleApprove(submission.id)}
                  className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                >
                  <CheckCircle className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleReject(submission.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  <XCircle className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

interface SubmissionProgressProps {
  isUploading: boolean;
  progress: number;
}

export function SubmissionProgress({ isUploading, progress }: SubmissionProgressProps) {
  if (!isUploading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center"
      >
        <Loader className="w-8 h-8 text-purple-600 animate-spin mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-4">Uploading Your Track</h3>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-purple-600 h-2 rounded-full"
          />
        </div>
        
        <p className="text-gray-600">Please wait while we process your submission...</p>
      </motion.div>
    </div>
  );
}
import { motion } from 'framer-motion';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';

interface SubmissionSuccessProps {
  onClose: () => void;
}

export function SubmissionSuccess({ onClose }: SubmissionSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-16 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center"
      >
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Track Submitted Successfully!</h2>
          <p className="text-gray-600">Thank you for sharing your music with us.</p>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold">What happens next?</h3>
          </div>
          <ul className="text-left space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <span>Our team will review your submission within 48 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <span>You'll receive an email notification once the review is complete</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <span>If approved, your track will be added to our challenge pool</span>
            </li>
          </ul>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
        >
          View My Submissions
        </motion.button>
      </motion.div>
    </div>
  );
}
import { motion } from 'framer-motion';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';
import type { SubmissionFormData } from '../../../lib/submissions/types';

interface SubmissionConfirmationProps {
  data: SubmissionFormData;
  onClose: () => void;
  onEdit: () => void;
}

export function SubmissionConfirmation({ data, onClose, onEdit }: SubmissionConfirmationProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Track Successfully Uploaded!</h2>
          <p className="text-gray-600">Here's a summary of your submission</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold mb-4">Track Details</h3>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-gray-600">Title:</dt>
              <dd className="font-medium">{data.trackTitle}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Artist:</dt>
              <dd className="font-medium">{data.artistName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Genre:</dt>
              <dd className="font-medium">{data.genre}</dd>
            </div>
            {data.energyLevel && (
              <div className="flex justify-between">
                <dt className="text-gray-600">Energy Level:</dt>
                <dd className="font-medium">{data.energyLevel}</dd>
              </div>
            )}
            {data.moodTags?.length > 0 && (
              <div className="flex justify-between">
                <dt className="text-gray-600">Moods:</dt>
                <dd className="font-medium">{data.moodTags.join(', ')}</dd>
              </div>
            )}
            {data.activityTags?.length > 0 && (
              <div className="flex justify-between">
                <dt className="text-gray-600">Activities:</dt>
                <dd className="font-medium">{data.activityTags.join(', ')}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold">What happens next?</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <span>Our team will review your submission within 48 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <span>You'll receive an email notification once approved</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <span>Your track will be added to our challenge pool</span>
            </li>
          </ul>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onEdit}
            className="px-4 py-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            Add More Details
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Done
          </button>
        </div>
      </div>
    </motion.div>
  );
}
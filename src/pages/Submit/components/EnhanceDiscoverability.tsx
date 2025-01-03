import { motion } from 'framer-motion';
import { Tag, ArrowRight } from 'lucide-react';
import type { SubmissionFormData } from '../../../lib/submissions/types';

interface EnhanceDiscoverabilityProps {
  data: SubmissionFormData;
  onClose: () => void;
  onEdit: () => void;
}

export function EnhanceDiscoverability({ data, onClose, onEdit }: EnhanceDiscoverabilityProps) {
  const missingFields = [];
  
  if (!data.moodTags?.length) missingFields.push('Mood tags');
  if (!data.activityTags?.length) missingFields.push('Activity tags');
  if (!data.energyLevel) missingFields.push('Energy level');
  if (!data.timeTags?.length) missingFields.push('Time of day tags');

  if (missingFields.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-purple-50 rounded-xl p-6 mb-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <Tag className="w-5 h-5 text-purple-600" />
        <h3 className="font-semibold">Enhance Your Track's Discoverability</h3>
      </div>

      <p className="text-gray-700 mb-4">
        Consider adding the following to help more listeners discover your track:
      </p>

      <ul className="space-y-2 mb-6">
        {missingFields.map((field) => (
          <li key={field} className="flex items-start gap-2 text-gray-600">
            <ArrowRight className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
            <span>{field}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800"
        >
          Skip for Now
        </button>
        <button
          onClick={onEdit}
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          Add More Details
        </button>
      </div>
    </motion.div>
  );
}
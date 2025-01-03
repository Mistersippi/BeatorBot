import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Activity, Sun, Zap, Cloud, Music2, ChevronDown, ChevronUp } from 'lucide-react';
import { MultiSelect } from './MultiSelect';
import { SingleSelect } from './SingleSelect';
import type { SubmissionFormData } from '../../../lib/submissions/types';
import {
  MOOD_OPTIONS,
  ACTIVITY_OPTIONS,
  TIME_OPTIONS,
  ENERGY_OPTIONS,
  WEATHER_OPTIONS
} from '../../../lib/submissions/constants';

interface AdvancedTaggingProps {
  data: SubmissionFormData;
  onChange: (data: Partial<SubmissionFormData>) => void;
}

export function AdvancedTagging({ data, onChange }: AdvancedTaggingProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-purple-600" />
          <span className="font-semibold">Advanced Tagging</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-purple-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-purple-600" />
        )}
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-6 bg-gray-50 rounded-xl p-6"
        >
          <MultiSelect
            label="Mood Tags"
            icon={Tag}
            options={MOOD_OPTIONS}
            value={data.moodTags || []}
            onChange={(moodTags) => onChange({ moodTags })}
            helperText="Select moods that best describe your track"
          />

          <MultiSelect
            label="Activity Tags"
            icon={Activity}
            options={ACTIVITY_OPTIONS}
            value={data.activityTags || []}
            onChange={(activityTags) => onChange({ activityTags })}
            helperText="Select activities your track is suitable for"
          />

          <MultiSelect
            label="Time of Day"
            icon={Sun}
            options={TIME_OPTIONS}
            value={data.timeTags || []}
            onChange={(timeTags) => onChange({ timeTags })}
            helperText="When is your track best enjoyed?"
          />

          <SingleSelect
            label="Energy Level"
            icon={Zap}
            options={ENERGY_OPTIONS}
            value={data.energyLevel || ''}
            onChange={(energyLevel) => onChange({ energyLevel })}
            helperText="How energetic is your track?"
          />

          <MultiSelect
            label="Weather Vibe"
            icon={Cloud}
            options={WEATHER_OPTIONS}
            value={data.weatherTags || []}
            onChange={(weatherTags) => onChange({ weatherTags })}
            helperText="What weather does your track suit best?"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center gap-2">
                <Music2 className="w-4 h-4" />
                BPM (Optional)
              </div>
            </label>
            <input
              type="number"
              min="1"
              max="300"
              value={data.bpm || ''}
              onChange={(e) => onChange({ bpm: e.target.value ? Number(e.target.value) : undefined })}
              className="w-32 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent px-3 py-2"
              placeholder="e.g. 120"
            />
            <p className="mt-1 text-sm text-gray-500">Approximate tempo of your track</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
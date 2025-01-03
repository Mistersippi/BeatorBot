import { Tag, Activity, Sun, Zap, Cloud, Music2 } from 'lucide-react';
import { MultiSelect } from './MultiSelect';
import { SingleSelect } from './SingleSelect';
import { CategorySelect } from './CategorySelect';
import type { SubmissionFormData } from '../../../lib/submissions/types';
import {
  MOOD_CATEGORIES,
  ACTIVITY_CATEGORIES,
  TIME_OPTIONS,
  ENERGY_OPTIONS,
  WEATHER_OPTIONS
} from '../../../lib/submissions/constants';

interface AdvancedTagsProps {
  data: {
    moodTags: string[];
    activityTags: string[];
    timeOfDay: string;
    energyLevel: string;
    weatherVibe: string;
    bpm?: number;
  };
  onChange: (data: {
    moodTags: string[];
    activityTags: string[];
    timeOfDay: string;
    energyLevel: string;
    weatherVibe: string;
    bpm?: number;
  }) => void;
}

export function AdvancedTags({ data, onChange }: AdvancedTagsProps) {
  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Tag className="w-5 h-5" />
        Advanced Tagging
      </h3>

      <div className="space-y-6">
        {/* Category-based selectors for Mood and Activity */}
        <CategorySelect
          label="Mood Tags"
          icon={Tag}
          categories={MOOD_CATEGORIES}
          value={data.moodTags || []}
          onChange={(moodTags) => onChange({ moodTags })}
          helperText="Select moods that best describe your track"
          type="mood"
        />

        <CategorySelect
          label="Activity Tags"
          icon={Activity}
          categories={ACTIVITY_CATEGORIES}
          value={data.activityTags || []}
          onChange={(activityTags) => onChange({ activityTags })}
          helperText="Select activities your track is best suited for"
          type="activity"
        />
      </div>

      <div className="space-y-6 bg-gray-50 rounded-xl p-6">
        {/* Simple dropdowns for Time, Energy, and Weather */}
        <SingleSelect
          label="Time of Day"
          icon={Sun}
          options={TIME_OPTIONS}
          value={data.timeOfDay || ''}
          onChange={(timeOfDay) => onChange({ timeOfDay })}
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

        <SingleSelect
          label="Weather Vibe"
          icon={Cloud}
          options={WEATHER_OPTIONS}
          value={data.weatherVibe || ''}
          onChange={(weatherVibe) => onChange({ weatherVibe })}
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
      </div>
    </div>
  );
}
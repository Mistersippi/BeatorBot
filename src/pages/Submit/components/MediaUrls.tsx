import { Music, Image } from 'lucide-react';
import { FormField } from '../../../components/form/FormField';
import type { SubmissionFormData } from '../../../lib/submissions/types';

interface MediaUrlsProps {
  data: SubmissionFormData;
  onChange: (data: Partial<SubmissionFormData>) => void;
  errors: Record<string, string>;
}

export function MediaUrls({ data, onChange, errors }: MediaUrlsProps) {
  return (
    <div className="space-y-6">
      <FormField
        label="Audio URL"
        required
        type="url"
        value={data.audioUrl}
        onChange={(e) => onChange({ audioUrl: e.target.value })}
        icon={Music}
        error={errors.audioUrl}
        helperText="Direct MP3/WAV links, Google Drive, Dropbox, or Suno AI links"
      />

      <FormField
        label="Image URL (Optional)"
        type="url"
        value={data.imageUrl}
        onChange={(e) => onChange({ imageUrl: e.target.value })}
        icon={Image}
        error={errors.imageUrl}
        helperText="Cover art or artist photo. Recommended: 1200x1200px"
      />
    </div>
  );
}
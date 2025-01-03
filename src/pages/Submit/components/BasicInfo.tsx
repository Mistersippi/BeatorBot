import { FormField } from '../../../components/form/FormField';
import { GenreSelect } from '../../../components/submit/GenreSelect';
import type { SubmissionFormData } from '../../../lib/submissions/types';

interface BasicInfoProps {
  data: SubmissionFormData;
  onChange: (data: Partial<SubmissionFormData>) => void;
  errors: Record<string, string>;
}

export function BasicInfo({ data, onChange, errors }: BasicInfoProps) {
  return (
    <div className="space-y-6">
      <FormField
        label="Track Title"
        required
        type="text"
        value={data.trackTitle}
        onChange={(e) => onChange({ trackTitle: e.target.value })}
        error={errors.trackTitle}
      />

      <FormField
        label="Artist Name"
        required
        type="text"
        value={data.artistName}
        onChange={(e) => onChange({ artistName: e.target.value })}
        error={errors.artistName}
      />

      <GenreSelect
        value={data.genre}
        onChange={(genre) => onChange({ genre })}
        error={errors.genre}
      />
    </div>
  );
}
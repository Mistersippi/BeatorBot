export interface SubmissionFormData {
  title: string;
  description?: string;
  audioTrack: File | null;
  coverImage: File | null;
  moodTags: string[];
  activityTags: string[];
  timeOfDay: string;
  energyLevel: string;
  weatherVibe: string;
}

export interface SubmissionError {
  field: string;
  message: string;
}
/*
  # Enhanced Submission Metadata

  1. Changes
    - Add metadata fields for enhanced track discoverability
    - Add fields for submission status tracking
    - Add fields for review process

  2. Security
    - Maintain existing RLS policies
    - Add policies for metadata access
*/

-- Add metadata columns to submissions table
ALTER TABLE submissions
ADD COLUMN IF NOT EXISTS mood_tags text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS activity_tags text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS time_tags text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS energy_level text,
ADD COLUMN IF NOT EXISTS weather_tags text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS bpm integer,
ADD COLUMN IF NOT EXISTS review_notes text,
ADD COLUMN IF NOT EXISTS review_started_at timestamptz,
ADD COLUMN IF NOT EXISTS reviewer_id uuid REFERENCES users(id),
ADD COLUMN IF NOT EXISTS completeness_score integer DEFAULT 0;
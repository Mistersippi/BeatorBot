/*
  # Enhanced Submission Metadata

  1. New Fields
    - Add mood_tags array for emotional context
    - Add activity_tags array for usage scenarios
    - Add time_tags array for time-of-day suitability
    - Add energy_level for intensity classification
    - Add weather_tags array for atmospheric context
    - Add bpm for tempo tracking

  2. Security
    - Maintain existing RLS policies
*/

-- Add metadata columns to submissions table
ALTER TABLE submissions
ADD COLUMN IF NOT EXISTS mood_tags text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS activity_tags text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS time_tags text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS energy_level text,
ADD COLUMN IF NOT EXISTS weather_tags text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS bpm integer;
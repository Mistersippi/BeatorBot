-- Add missing columns to submissions table
ALTER TABLE submissions 
  ADD COLUMN IF NOT EXISTS subgenre TEXT,
  ADD COLUMN IF NOT EXISTS spotify_url TEXT,
  ADD COLUMN IF NOT EXISTS apple_music_url TEXT,
  ADD COLUMN IF NOT EXISTS artist_website TEXT,
  ADD COLUMN IF NOT EXISTS mood_tags TEXT[],
  ADD COLUMN IF NOT EXISTS activity_tags TEXT[],
  ADD COLUMN IF NOT EXISTS time_of_day TEXT,
  ADD COLUMN IF NOT EXISTS energy_level TEXT,
  ADD COLUMN IF NOT EXISTS weather_vibe TEXT;

-- Update the database types
COMMENT ON TABLE submissions IS 'Table storing user track submissions';
COMMENT ON COLUMN submissions.subgenre IS 'Subgenre of the track';
COMMENT ON COLUMN submissions.spotify_url IS 'Optional Spotify artist URL';
COMMENT ON COLUMN submissions.apple_music_url IS 'Optional Apple Music artist URL';
COMMENT ON COLUMN submissions.artist_website IS 'Optional artist website URL';
COMMENT ON COLUMN submissions.mood_tags IS 'Array of mood tags for the track';
COMMENT ON COLUMN submissions.activity_tags IS 'Array of activity tags for the track';
COMMENT ON COLUMN submissions.time_of_day IS 'Best time of day to listen to the track';
COMMENT ON COLUMN submissions.energy_level IS 'Energy level of the track';
COMMENT ON COLUMN submissions.weather_vibe IS 'Weather vibe that matches the track';

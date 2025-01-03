-- Add description column to submissions table
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS description TEXT;

-- Update the database types
COMMENT ON TABLE submissions IS 'Table storing user track submissions';
COMMENT ON COLUMN submissions.description IS 'Optional description of the track';

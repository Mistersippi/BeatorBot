/*
  # Update RLS Policies

  1. Changes
    - Drop existing policies safely
    - Create new policies with unique names for users and submissions tables
    - Fix policy naming conflicts
    
  2. Security
    - Maintain row level security
    - Ensure proper access control
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Drop users policies
  IF EXISTS (
    SELECT 1 FROM pg_policy 
    WHERE polrelid = 'users'::regclass
  ) THEN
    DROP POLICY IF EXISTS "Enable insert for authenticated users" ON users;
    DROP POLICY IF EXISTS "Enable read access for authenticated users" ON users;
    DROP POLICY IF EXISTS "Enable update for users based on auth_id" ON users;
  END IF;

  -- Drop submissions policies
  IF EXISTS (
    SELECT 1 FROM pg_policy 
    WHERE polrelid = 'submissions'::regclass
  ) THEN
    DROP POLICY IF EXISTS "Enable insert for authenticated users" ON submissions;
    DROP POLICY IF EXISTS "Enable read access for own submissions" ON submissions;
    DROP POLICY IF EXISTS "Enable read access for approved submissions" ON submissions;
    DROP POLICY IF EXISTS "Enable update for own submissions" ON submissions;
  END IF;
END $$;

-- Create new policies with unique names
-- Users table policies
CREATE POLICY "auth_users_create_profile_v3"
  ON users FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "users_read_own_profile_v3"
  ON users FOR SELECT
  USING (auth.uid() = auth_id);

CREATE POLICY "users_update_own_profile_v3"
  ON users FOR UPDATE
  USING (auth.uid() = auth_id);

-- Submissions table policies
CREATE POLICY "users_create_submissions_v3"
  ON submissions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = submissions.user_id 
      AND users.auth_id = auth.uid()
    )
  );

CREATE POLICY "users_view_own_submissions_v3"
  ON submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = submissions.user_id 
      AND users.auth_id = auth.uid()
    )
  );

CREATE POLICY "anyone_view_approved_submissions_v3"
  ON submissions FOR SELECT
  USING (status = 'approved');

CREATE POLICY "users_update_own_submissions_v3"
  ON submissions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = submissions.user_id 
      AND users.auth_id = auth.uid()
    )
  );
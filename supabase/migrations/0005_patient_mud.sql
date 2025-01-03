/*
  # Update RLS Policies

  1. Changes
    - Drop existing policies
    - Add new policies with unique names
    - Fix policy checks using correct column names

  2. Security
    - Maintain data isolation between users
    - Allow authenticated users to create profiles
    - Enable submissions management
*/

-- Drop existing policies if they exist
DO $$ BEGIN
  -- Users table policies
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Enable insert for authenticated users' AND tablename = 'users') THEN
    DROP POLICY "Enable insert for authenticated users" ON users;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Enable read access for authenticated users' AND tablename = 'users') THEN
    DROP POLICY "Enable read access for authenticated users" ON users;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Enable update for users based on auth_id' AND tablename = 'users') THEN
    DROP POLICY "Enable update for users based on auth_id" ON users;
  END IF;

  -- Submissions table policies
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Enable insert for authenticated users' AND tablename = 'submissions') THEN
    DROP POLICY "Enable insert for authenticated users" ON submissions;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Enable read access for own submissions' AND tablename = 'submissions') THEN
    DROP POLICY "Enable read access for own submissions" ON submissions;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Enable read access for approved submissions' AND tablename = 'submissions') THEN
    DROP POLICY "Enable read access for approved submissions" ON submissions;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Enable update for own submissions' AND tablename = 'submissions') THEN
    DROP POLICY "Enable update for own submissions" ON submissions;
  END IF;
END $$;

-- Create new policies with unique names
-- Users table policies
CREATE POLICY "auth_users_create_profile_v2"
  ON users FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "users_read_own_profile_v2"
  ON users FOR SELECT
  USING (auth.uid() = auth_id);

CREATE POLICY "users_update_own_profile_v2"
  ON users FOR UPDATE
  USING (auth.uid() = auth_id);

-- Submissions table policies
CREATE POLICY "users_create_submissions_v2"
  ON submissions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = submissions.user_id 
      AND users.auth_id = auth.uid()
    )
  );

CREATE POLICY "users_view_own_submissions_v2"
  ON submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = submissions.user_id 
      AND users.auth_id = auth.uid()
    )
  );

CREATE POLICY "anyone_view_approved_submissions_v2"
  ON submissions FOR SELECT
  USING (status = 'approved');

CREATE POLICY "users_update_own_submissions_v2"
  ON submissions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = submissions.user_id 
      AND users.auth_id = auth.uid()
    )
  );
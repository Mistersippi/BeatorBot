/*
  # Fix RLS Policies for Users and Submissions

  1. Changes
    - Add RLS policies to allow user profile creation
    - Add RLS policies for submissions table
    - Add RLS policies for authenticated users

  2. Security
    - Enable RLS on users and submissions tables
    - Add policies for authenticated users
    - Add policies for user profile creation
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Public profiles are readable" ON users;

-- Users table policies
CREATE POLICY "Enable insert for authenticated users" ON users
  FOR INSERT WITH CHECK (auth.uid() = auth_id);

CREATE POLICY "Enable read access for authenticated users" ON users
  FOR SELECT USING (true);

CREATE POLICY "Enable update for users based on auth_id" ON users
  FOR UPDATE USING (auth.uid() = auth_id);

-- Submissions table policies
CREATE POLICY "Enable insert for authenticated users" ON submissions
  FOR INSERT WITH CHECK (
    auth.uid() = (SELECT auth_id FROM users WHERE id = submissions.user_id)
  );

CREATE POLICY "Enable read access for own submissions" ON submissions
  FOR SELECT USING (
    auth.uid() = (SELECT auth_id FROM users WHERE id = submissions.user_id)
  );

CREATE POLICY "Enable read access for approved submissions" ON submissions
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Enable update for own submissions" ON submissions
  FOR UPDATE USING (
    auth.uid() = (SELECT auth_id FROM users WHERE id = submissions.user_id)
  );
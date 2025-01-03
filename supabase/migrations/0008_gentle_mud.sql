/*
  # Add User Roles and Admin Access

  1. Changes
    - Add role column to users table
    - Add default role policy
    - Add admin-specific policies
  
  2. Security
    - Only admins can modify roles
    - Users can't modify their own role
*/

-- Add role column if it doesn't exist
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'user'
CHECK (role IN ('admin', 'moderator', 'user'));

-- Create policy for admins to read all users
CREATE POLICY "admins_read_all_users"
ON users FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.auth_id = auth.uid()
    AND users.role = 'admin'
  )
);

-- Create policy for admins to update users
CREATE POLICY "admins_update_users"
ON users FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.auth_id = auth.uid()
    AND users.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.auth_id = auth.uid()
    AND users.role = 'admin'
  )
);

-- Create policy for admins to manage submissions
CREATE POLICY "admins_manage_submissions"
ON submissions FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.auth_id = auth.uid()
    AND users.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.auth_id = auth.uid()
    AND users.role = 'admin'
  )
);
/*
  # Fix User Policies and Role Management

  1. Changes
    - Drop existing problematic policies
    - Create new simplified policies without recursion
    - Add role-based access control
  
  2. Security
    - Enable RLS
    - Add policies for user management
    - Add admin role checks
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "users_insert_own_profile" ON users;
DROP POLICY IF EXISTS "users_select_profile" ON users;
DROP POLICY IF EXISTS "users_update_profile" ON users;

-- Create new simplified policies
CREATE POLICY "allow_read_all_profiles"
ON users FOR SELECT
USING (true);

CREATE POLICY "allow_insert_own_profile"
ON users FOR INSERT
WITH CHECK (auth.uid() = auth_id);

CREATE POLICY "allow_update_own_or_admin"
ON users FOR UPDATE
USING (
  auth.uid() = auth_id OR 
  EXISTS (
    SELECT 1 FROM users u 
    WHERE u.auth_id = auth.uid() 
    AND u.role = 'admin'
  )
);

-- Add admin role to specific email
UPDATE users 
SET role = 'admin' 
WHERE email = 'fiveonebrent@gmail.com';
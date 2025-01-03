-- Drop all existing policies
DROP POLICY IF EXISTS "enable_all_access_for_admin" ON users;
DROP POLICY IF EXISTS "enable_read_for_authenticated" ON users;
DROP POLICY IF EXISTS "enable_update_for_own_profile" ON users;
DROP POLICY IF EXISTS "enable_insert_for_signup" ON users;

-- Create new simplified policies
CREATE POLICY "users_insert_own_profile"
ON users FOR INSERT
WITH CHECK (auth.uid() = auth_id);

CREATE POLICY "users_select_profile"
ON users FOR SELECT
USING (true);  -- Allow read access to all authenticated users

CREATE POLICY "users_update_profile"
ON users FOR UPDATE
USING (
  -- Allow users to update their own profile OR if they are an admin
  auth.uid() = auth_id OR 
  EXISTS (
    SELECT 1 FROM users 
    WHERE auth_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_users_auth_id_role ON users(auth_id, role);
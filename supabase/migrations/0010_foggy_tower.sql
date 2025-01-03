-- Drop existing policies
DROP POLICY IF EXISTS "auth_users_create_profile_v3" ON users;
DROP POLICY IF EXISTS "users_read_own_profile_v3" ON users;
DROP POLICY IF EXISTS "users_update_own_profile_v3" ON users;
DROP POLICY IF EXISTS "admins_read_all_users" ON users;
DROP POLICY IF EXISTS "admins_update_users" ON users;

-- Create new policies without recursion
CREATE POLICY "users_create_profile"
ON users FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "users_read_own_profile"
ON users FOR SELECT
USING (auth.uid() = auth_id OR role = 'admin');

CREATE POLICY "users_update_own_profile"
ON users FOR UPDATE
USING (auth.uid() = auth_id OR role = 'admin')
WITH CHECK (auth.uid() = auth_id OR role = 'admin');
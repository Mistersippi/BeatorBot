-- Drop existing policies
DROP POLICY IF EXISTS "users_create_profile" ON users;
DROP POLICY IF EXISTS "users_read_own_profile" ON users;
DROP POLICY IF EXISTS "users_update_own_profile" ON users;

-- Create new simplified policies
CREATE POLICY "enable_all_access_for_admin"
ON users FOR ALL
USING (
  auth.uid() IN (
    SELECT auth_id FROM users WHERE role = 'admin'
  )
);

CREATE POLICY "enable_read_for_authenticated"
ON users FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "enable_update_for_own_profile"
ON users FOR UPDATE
USING (auth.uid() = auth_id);

CREATE POLICY "enable_insert_for_signup"
ON users FOR INSERT
WITH CHECK (auth.uid() = auth_id);
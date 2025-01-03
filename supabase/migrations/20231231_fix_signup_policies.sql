-- Drop existing policies
DROP POLICY IF EXISTS "service_role_all" ON public.users;
DROP POLICY IF EXISTS "users_insert_own" ON public.users;
DROP POLICY IF EXISTS "users_update_own" ON public.users;
DROP POLICY IF EXISTS "users_read_own" ON public.users;

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Service role policy (can do everything)
CREATE POLICY "service_role_all"
ON public.users
AS PERMISSIVE
FOR ALL
TO authenticated
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Users can read their own data
CREATE POLICY "users_read_own"
ON public.users
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (auth.uid() = auth_id);

-- Users can create their profile during signup
CREATE POLICY "users_insert_own"
ON public.users
AS PERMISSIVE
FOR INSERT
TO authenticated
WITH CHECK (
  -- Allow if the auth_id matches the authenticated user
  auth.uid() = auth_id
  -- OR if the user is being created during signup/email verification
  OR EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id = auth_id
    AND email = current_setting('request.jwt.claims')::json->>'email'
  )
);

-- Users can update their own data
CREATE POLICY "users_update_own"
ON public.users
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING (auth.uid() = auth_id)
WITH CHECK (auth.uid() = auth_id);

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON public.users TO authenticated;
GRANT USAGE ON SEQUENCE users_id_seq TO authenticated;

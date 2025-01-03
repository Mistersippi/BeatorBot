-- Drop existing policies
DROP POLICY IF EXISTS "service_role_all" ON public.users;
DROP POLICY IF EXISTS "users_insert_own" ON public.users;
DROP POLICY IF EXISTS "users_update_own" ON public.users;
DROP POLICY IF EXISTS "users_read_own" ON public.users;
DROP POLICY IF EXISTS "users_insert_during_signup" ON public.users;

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Service role policy (can do everything)
CREATE POLICY "service_role_all"
ON public.users
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Allow inserts during signup if the auth_id matches
CREATE POLICY "users_insert_during_signup"
ON public.users
FOR INSERT
TO anon, authenticated
WITH CHECK (
    -- Allow if the auth_id matches the user's ID
    auth.uid() = auth_id
    OR 
    -- Or if it matches a valid user in auth.users
    EXISTS (
        SELECT 1 
        FROM auth.users au 
        WHERE au.id = auth_id 
        AND au.email = email
        AND au.email_confirmed_at IS NOT NULL
    )
);

-- Users can read their own data
CREATE POLICY "users_read_own"
ON public.users
FOR SELECT
TO authenticated
USING (auth.uid() = auth_id);

-- Users can update their own data
CREATE POLICY "users_update_own"
ON public.users
FOR UPDATE
TO authenticated
USING (auth.uid() = auth_id)
WITH CHECK (auth.uid() = auth_id);

-- First, drop all existing policies
DROP POLICY IF EXISTS "service_role_all" ON public.users;
DROP POLICY IF EXISTS "users_insert_own" ON public.users;
DROP POLICY IF EXISTS "users_update_own" ON public.users;
DROP POLICY IF EXISTS "users_read_own" ON public.users;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Allow public registration" ON public.users;

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create a simple policy that allows authenticated users to do everything with their own records
CREATE POLICY "authenticated_users"
ON public.users
FOR ALL
TO authenticated
USING (
  -- For SELECT, UPDATE, DELETE operations
  auth.uid() = auth_id OR
  -- For INSERT operations during signup
  (auth.uid() IS NOT NULL AND auth_id = auth.uid())
)
WITH CHECK (
  -- For INSERT, UPDATE operations
  auth.uid() = auth_id
);

-- Grant basic permissions to authenticated users
GRANT ALL ON public.users TO authenticated;
GRANT USAGE ON SEQUENCE users_id_seq TO authenticated;

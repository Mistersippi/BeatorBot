-- Remove full_name column from users table
ALTER TABLE public.users
DROP COLUMN IF EXISTS full_name;

-- Remove any triggers related to full_name
DROP TRIGGER IF EXISTS set_default_full_name ON public.users;
DROP FUNCTION IF EXISTS set_default_full_name();

-- Ensure admin role is set and synced correctly
DO $$ 
BEGIN
  -- First ensure the user exists and has admin role
  UPDATE users 
  SET role = 'admin' 
  WHERE email = 'fiveonebrent@gmail.com'
  AND role != 'admin';

  -- Then sync the role to auth.users metadata
  UPDATE auth.users 
  SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{role}',
    '"admin"'
  )
  WHERE email = 'fiveonebrent@gmail.com';
END $$;

-- Improve role sync trigger to be more robust
CREATE OR REPLACE FUNCTION sync_user_role()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    UPDATE auth.users 
    SET raw_user_meta_data = jsonb_set(
      COALESCE(raw_user_meta_data, '{}'::jsonb),
      '{role}',
      to_jsonb(NEW.role)
    )
    WHERE id = NEW.auth_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger with better error handling
DROP TRIGGER IF EXISTS sync_role_to_auth ON users;
CREATE TRIGGER sync_role_to_auth
  AFTER UPDATE ON users
  FOR EACH ROW
  WHEN (NEW.role IS DISTINCT FROM OLD.role)
  EXECUTE FUNCTION sync_user_role();
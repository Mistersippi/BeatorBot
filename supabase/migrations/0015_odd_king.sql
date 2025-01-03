-- Ensure admin role is set correctly
UPDATE users 
SET role = 'admin' 
WHERE email = 'fiveonebrent@gmail.com'
AND role != 'admin';

-- Create function to sync user role
CREATE OR REPLACE FUNCTION sync_user_role()
RETURNS TRIGGER AS $$
BEGIN
  -- Update auth.users metadata when role changes
  UPDATE auth.users 
  SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{role}',
    to_jsonb(NEW.role)
  )
  WHERE id = NEW.auth_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to keep role in sync
DROP TRIGGER IF EXISTS sync_role_to_auth ON users;
CREATE TRIGGER sync_role_to_auth
  AFTER UPDATE OF role ON users
  FOR EACH ROW
  EXECUTE FUNCTION sync_user_role();
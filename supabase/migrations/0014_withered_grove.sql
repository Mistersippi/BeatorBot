/*
  # Username Constraints and Handling

  1. Changes
    - Add unique constraint for usernames
    - Add username validation check
    - Add trigger for username uniqueness check
  
  2. Security
    - Prevent duplicate usernames
    - Ensure username format validity
*/

-- Add username constraints
ALTER TABLE users
ADD CONSTRAINT username_unique UNIQUE (username),
ADD CONSTRAINT username_format CHECK (
  username ~* '^[a-zA-Z0-9][a-zA-Z0-9_-]{2,29}$'
);

-- Function to check username availability
CREATE OR REPLACE FUNCTION check_username_availability()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM users 
    WHERE LOWER(username) = LOWER(NEW.username)
    AND id != NEW.id
  ) THEN
    RAISE EXCEPTION 'Username already taken';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for username uniqueness check
CREATE TRIGGER ensure_username_unique
  BEFORE INSERT OR UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION check_username_availability();
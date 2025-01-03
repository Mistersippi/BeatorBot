/*
  # Ensure Admin Role for Specific User
  
  1. Changes
    - Sets admin role for specific email
    - Updates auth metadata to match
  2. Security
    - Only affects single user
    - Preserves existing data
*/

-- First ensure the user exists in the users table with admin role
INSERT INTO users (auth_id, email, role)
SELECT 
  au.id as auth_id,
  au.email,
  'admin' as role
FROM auth.users au
WHERE au.email = 'fiveonebrent@gmail.com'
ON CONFLICT (auth_id) 
DO UPDATE SET role = 'admin'
WHERE users.role != 'admin';

-- Then ensure auth.users metadata has the role
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'fiveonebrent@gmail.com';
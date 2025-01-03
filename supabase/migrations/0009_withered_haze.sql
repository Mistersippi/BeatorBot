/*
  # Add Admin User

  1. Changes
    - Update specific user to admin role
  
  2. Security
    - Only updates a single specific user
    - Maintains existing role-based security
*/

UPDATE users
SET role = 'admin'
WHERE email = 'fiveonebrent@gmail.com';
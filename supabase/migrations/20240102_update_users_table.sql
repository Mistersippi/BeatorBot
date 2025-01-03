-- Add has_set_username column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS has_set_username BOOLEAN DEFAULT FALSE;

-- Update existing users to have has_set_username set to true
UPDATE users SET has_set_username = TRUE WHERE username IS NOT NULL;

-- Update RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" ON users
FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON users
FOR UPDATE USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON users
FOR INSERT WITH CHECK (auth.uid() = id);

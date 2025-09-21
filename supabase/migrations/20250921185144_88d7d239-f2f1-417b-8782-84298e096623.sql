-- Enable RLS on the admins table for security
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows querying admin records (for login verification)
-- This is for admin login only, so we allow read access for authentication
CREATE POLICY "Allow admin login verification" ON admins
FOR SELECT
USING (true);
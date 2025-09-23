-- Create admin user for testing
-- Note: This would normally be done through Supabase Auth UI
-- For testing purposes, we'll set up the data structure

-- First create the admin user manually in Supabase Auth UI with:
-- Email: admin@lesarconsults.com
-- Password: password

-- Then insert their profile record (replace UUID with actual user ID from auth.users)
-- This is just for reference - the actual user creation should be done through Supabase Auth UI

-- Example for when the user is created:
-- INSERT INTO public.profiles (id, email, full_name, is_admin)
-- VALUES (
--   'ACTUAL_USER_UUID_FROM_AUTH_USERS',
--   'admin@lesarconsults.com',
--   'Admin User',
--   true
-- );
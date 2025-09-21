-- Create admins table (temporary; use hashed passwords in production)
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL, -- TEMPORARY: plaintext for prototype only
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert the test admin account
INSERT INTO admins (username, password)
VALUES ('admin', 'password')
ON CONFLICT (username) DO NOTHING;
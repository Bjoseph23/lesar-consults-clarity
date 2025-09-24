-- Fix storage RLS policies for admin uploads
-- Remove conflicting policies first
DROP POLICY IF EXISTS "Allow authenticated insert on storage.objects" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated update on storage.objects" ON storage.objects;
DROP POLICY IF EXISTS "Allow select on storage.objects" ON storage.objects;

-- Create proper admin-only policies for resources bucket
CREATE POLICY "Admin users can upload to resources bucket" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (
  bucket_id = 'resources' AND 
  public.is_admin(auth.uid())
);

CREATE POLICY "Admin users can update resources bucket objects" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (
  bucket_id = 'resources' AND 
  public.is_admin(auth.uid())
) 
WITH CHECK (
  bucket_id = 'resources' AND 
  public.is_admin(auth.uid())
);

CREATE POLICY "Admin users can delete from resources bucket" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (
  bucket_id = 'resources' AND 
  public.is_admin(auth.uid())
);

-- Keep the public read policy for resources bucket
-- (This allows public access to view uploaded images/files)
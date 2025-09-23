-- Fix RLS policies for admin resource editing and storage

-- 1. Allow authenticated admins to manage resources
DROP POLICY IF EXISTS "Allow authenticated CRUD on resources" ON public.resources;
CREATE POLICY "Allow authenticated CRUD on resources"
  ON public.resources
  FOR ALL
  USING (auth.role() = 'authenticated');

-- 2. Fix storage policies for image uploads
DROP POLICY IF EXISTS "Allow authenticated insert on storage.objects" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated update on storage.objects" ON storage.objects; 
DROP POLICY IF EXISTS "Allow select on storage.objects" ON storage.objects;

CREATE POLICY "Allow authenticated insert on storage.objects"
  ON storage.objects
  FOR INSERT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on storage.objects"
  ON storage.objects
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow select on storage.objects"
  ON storage.objects
  FOR SELECT
  USING (true);
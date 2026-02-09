-- ============================================================================
-- Setup Supabase Storage for Contact Form File Uploads
-- Run this in Supabase SQL Editor
-- ============================================================================

-- Create storage bucket for contact form attachments
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'contact-attachments',
  'contact-attachments',
  true,
  10485760, -- 10MB in bytes
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/jpg',
    'image/png'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Storage Policies
-- ============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can upload contact attachments" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view contact attachments" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete contact attachments" ON storage.objects;

-- Allow anyone to upload files (needed for public contact forms)
CREATE POLICY "Anyone can upload contact attachments"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'contact-attachments');

-- Allow anyone to view files (public bucket)
CREATE POLICY "Anyone can view contact attachments"
ON storage.objects FOR SELECT
USING (bucket_id = 'contact-attachments');

-- Only admins can delete files
CREATE POLICY "Admins can delete contact attachments"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'contact-attachments' AND
  auth.jwt() ->> 'role' IN ('admin', 'super_admin')
);

-- ============================================================================
-- Add file_urls column to contact_submissions table
-- ============================================================================
DO $$ 
BEGIN
  BEGIN 
    ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS file_urls JSONB;
  EXCEPTION WHEN OTHERS THEN 
    NULL; 
  END;
END $$;

-- ============================================================================
-- Verify setup
-- ============================================================================
SELECT 
  id, 
  name, 
  public, 
  file_size_limit,
  allowed_mime_types
FROM storage.buckets 
WHERE id = 'contact-attachments';

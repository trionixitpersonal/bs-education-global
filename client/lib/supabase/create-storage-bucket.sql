-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Drop ALL existing policies first
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can view own documents" ON storage.objects;
  DROP POLICY IF EXISTS "Users can upload own documents" ON storage.objects;
  DROP POLICY IF EXISTS "Users can update own documents" ON storage.objects;
  DROP POLICY IF EXISTS "Users can delete own documents" ON storage.objects;
  DROP POLICY IF EXISTS "Admins can view all documents" ON storage.objects;
  DROP POLICY IF EXISTS "Admins can delete all documents" ON storage.objects;
END $$;

-- Storage policy: Users can view their own documents
CREATE POLICY "Users can view own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'documents' AND 
  (name LIKE auth.uid()::text || '/%')
);

-- Storage policy: Users can upload their own documents
CREATE POLICY "Users can upload own documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents' AND 
  (name LIKE auth.uid()::text || '/%')
);

-- Storage policy: Users can update their own documents
CREATE POLICY "Users can update own documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'documents' AND 
  (name LIKE auth.uid()::text || '/%')
);

-- Storage policy: Users can delete their own documents
CREATE POLICY "Users can delete own documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'documents' AND 
  (name LIKE auth.uid()::text || '/%')
);

-- Optional: Admin access to all documents
CREATE POLICY "Admins can view all documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'documents' AND 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

CREATE POLICY "Admins can delete all documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'documents' AND 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

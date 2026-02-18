-- SAFE FIX for Documentation - Handles existing policies
-- Run this in Supabase Dashboard > SQL Editor
-- This safely removes and recreates only the document_guides policies

-- Drop all existing document_guides policies (safe to run multiple times)
DROP POLICY IF EXISTS "Admin write document_guides" ON public.document_guides;
DROP POLICY IF EXISTS "Allow public read access" ON public.document_guides;
DROP POLICY IF EXISTS "Public read document_guides" ON public.document_guides;
DROP POLICY IF EXISTS "Allow admin write" ON public.document_guides;

-- Create fresh public read policy
CREATE POLICY "Public read document_guides" ON public.document_guides 
  FOR SELECT 
  USING (true);

-- Done! Document guides are now publicly readable

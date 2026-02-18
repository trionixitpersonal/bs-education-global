-- IMMEDIATE FIX for Documentation Support - RLS Issue
-- Run this in Supabase Dashboard > SQL Editor
-- This removes problematic RLS policies and allows public read access

-- Step 1: Drop all problematic document_guides policies
DROP POLICY IF EXISTS "Admin write document_guides" ON public.document_guides;

-- Step 2: Create simple public read policy (no condition checking)
CREATE POLICY "Public read document_guides" ON public.document_guides 
  FOR SELECT 
  USING (true);

-- Done! This allows anyone to read documentation guides

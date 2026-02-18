-- Fix for Documentation Support - RLS Policy Issue
-- Run this in your Supabase SQL Editor to allow public read access to documentation guides

-- First, drop the restrictive FOR ALL policy that blocks public access
DROP POLICY IF EXISTS "Admin write document_guides" ON public.document_guides;

-- Create separate policies for different operations
-- Allow anyone to read documentation guides
CREATE POLICY "Allow public read access on document_guides" ON public.document_guides 
  FOR SELECT 
  USING (true);

-- Allow only admins to insert, update, and delete documentation guides
CREATE POLICY "Admin write document_guides" ON public.document_guides 
  FOR INSERT 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin update document_guides" ON public.document_guides 
  FOR UPDATE 
  USING (public.is_admin());

CREATE POLICY "Admin delete document_guides" ON public.document_guides 
  FOR DELETE 
  USING (public.is_admin());

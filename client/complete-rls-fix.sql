-- COMPLETE FIX for RLS policies
-- Run this entire script in your Supabase SQL Editor

-- Step 1: Drop ALL existing policies on profiles table
DROP POLICY IF EXISTS "Allow admin full access" ON public.profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow public read access" ON public.profiles;
DROP POLICY IF EXISTS "Allow admin write" ON public.profiles;

-- Step 2: Drop ALL existing policies on other tables that reference profiles
DROP POLICY IF EXISTS "Allow admin write" ON public.universities;
DROP POLICY IF EXISTS "Allow admin write" ON public.programs;
DROP POLICY IF EXISTS "Allow admin write" ON public.scholarships;
DROP POLICY IF EXISTS "Allow admin write" ON public.qs_rankings;
DROP POLICY IF EXISTS "Allow admin write" ON public.study_destinations;
DROP POLICY IF EXISTS "Allow admin write" ON public.visa_guides;
DROP POLICY IF EXISTS "Allow admin write" ON public.application_steps;
DROP POLICY IF EXISTS "Allow admin write" ON public.document_guides;
DROP POLICY IF EXISTS "Allow admin write" ON public.resources;
DROP POLICY IF EXISTS "Allow admin write" ON public.faqs;
DROP POLICY IF EXISTS "Allow admin write" ON public.support_options;
DROP POLICY IF EXISTS "Allow admin read all submissions" ON public.contact_submissions;

-- Step 3: Create a helper function to check if user is admin (without recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND raw_user_meta_data->>'role' IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 4: Create new non-recursive policies for profiles
CREATE POLICY "Users can read own profile" ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Step 5: Recreate admin write policies WITHOUT referencing profiles table
-- These policies use the service role or check metadata instead

CREATE POLICY "Admin write universities" ON public.universities 
  FOR ALL 
  USING (public.is_admin());

CREATE POLICY "Admin write programs" ON public.programs 
  FOR ALL 
  USING (public.is_admin());

CREATE POLICY "Admin write scholarships" ON public.scholarships 
  FOR ALL 
  USING (public.is_admin());

CREATE POLICY "Admin write qs_rankings" ON public.qs_rankings 
  FOR ALL 
  USING (public.is_admin());

CREATE POLICY "Admin write study_destinations" ON public.study_destinations 
  FOR ALL 
  USING (public.is_admin());

CREATE POLICY "Admin write visa_guides" ON public.visa_guides 
  FOR ALL 
  USING (public.is_admin());

CREATE POLICY "Admin write application_steps" ON public.application_steps 
  FOR ALL 
  USING (public.is_admin());

CREATE POLICY "Admin write document_guides" ON public.document_guides 
  FOR ALL 
  USING (public.is_admin());

CREATE POLICY "Admin write resources" ON public.resources 
  FOR ALL 
  USING (public.is_admin());

CREATE POLICY "Admin write faqs" ON public.faqs 
  FOR ALL 
  USING (public.is_admin());

CREATE POLICY "Admin write support_options" ON public.support_options 
  FOR ALL 
  USING (public.is_admin());

CREATE POLICY "Admin read submissions" ON public.contact_submissions 
  FOR SELECT 
  USING (public.is_admin());

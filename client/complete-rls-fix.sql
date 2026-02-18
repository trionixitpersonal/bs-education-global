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

-- Step 5: Recreate policies - PUBLIC READ + ADMIN WRITE
-- These policies allow public read access to content while restricting writes to admins

-- UNIVERSITIES
CREATE POLICY "Allow public read universities" ON public.universities 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admin write universities" ON public.universities 
  FOR INSERT 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin update universities" ON public.universities 
  FOR UPDATE 
  USING (public.is_admin());

CREATE POLICY "Admin delete universities" ON public.universities 
  FOR DELETE 
  USING (public.is_admin());

-- PROGRAMS
CREATE POLICY "Allow public read programs" ON public.programs 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admin write programs" ON public.programs 
  FOR INSERT 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin update programs" ON public.programs 
  FOR UPDATE 
  USING (public.is_admin());

CREATE POLICY "Admin delete programs" ON public.programs 
  FOR DELETE 
  USING (public.is_admin());

-- SCHOLARSHIPS (only show active ones to public)
CREATE POLICY "Allow public read active scholarships" ON public.scholarships 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admin read all scholarships" ON public.scholarships 
  FOR SELECT 
  USING (public.is_admin());

CREATE POLICY "Admin write scholarships" ON public.scholarships 
  FOR INSERT 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin update scholarships" ON public.scholarships 
  FOR UPDATE 
  USING (public.is_admin());

CREATE POLICY "Admin delete scholarships" ON public.scholarships 
  FOR DELETE 
  USING (public.is_admin());

-- QS RANKINGS
CREATE POLICY "Allow public read rankings" ON public.qs_rankings 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admin write rankings" ON public.qs_rankings 
  FOR INSERT 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin update rankings" ON public.qs_rankings 
  FOR UPDATE 
  USING (public.is_admin());

CREATE POLICY "Admin delete rankings" ON public.qs_rankings 
  FOR DELETE 
  USING (public.is_admin());

-- STUDY DESTINATIONS
CREATE POLICY "Allow public read destinations" ON public.study_destinations 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admin write destinations" ON public.study_destinations 
  FOR INSERT 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin update destinations" ON public.study_destinations 
  FOR UPDATE 
  USING (public.is_admin());

CREATE POLICY "Admin delete destinations" ON public.study_destinations 
  FOR DELETE 
  USING (public.is_admin());

-- VISA GUIDES
CREATE POLICY "Allow public read visa_guides" ON public.visa_guides 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admin write visa_guides" ON public.visa_guides 
  FOR INSERT 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin update visa_guides" ON public.visa_guides 
  FOR UPDATE 
  USING (public.is_admin());

CREATE POLICY "Admin delete visa_guides" ON public.visa_guides 
  FOR DELETE 
  USING (public.is_admin());

-- APPLICATION STEPS
CREATE POLICY "Allow public read application_steps" ON public.application_steps 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admin write application_steps" ON public.application_steps 
  FOR INSERT 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin update application_steps" ON public.application_steps 
  FOR UPDATE 
  USING (public.is_admin());

CREATE POLICY "Admin delete application_steps" ON public.application_steps 
  FOR DELETE 
  USING (public.is_admin());

-- DOCUMENT GUIDES
CREATE POLICY "Allow public read document_guides" ON public.document_guides 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admin write document_guides" ON public.document_guides 
  FOR INSERT 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin update document_guides" ON public.document_guides 
  FOR UPDATE 
  USING (public.is_admin());

CREATE POLICY "Admin delete document_guides" ON public.document_guides 
  FOR DELETE 
  USING (public.is_admin());

-- RESOURCES
CREATE POLICY "Allow public read resources" ON public.resources 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admin write resources" ON public.resources 
  FOR INSERT 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin update resources" ON public.resources 
  FOR UPDATE 
  USING (public.is_admin());

CREATE POLICY "Admin delete resources" ON public.resources 
  FOR DELETE 
  USING (public.is_admin());

-- FAQS (only show active ones to public)
CREATE POLICY "Allow public read active faqs" ON public.faqs 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admin read all faqs" ON public.faqs 
  FOR SELECT 
  USING (public.is_admin());

CREATE POLICY "Admin write faqs" ON public.faqs 
  FOR INSERT 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin update faqs" ON public.faqs 
  FOR UPDATE 
  USING (public.is_admin());

CREATE POLICY "Admin delete faqs" ON public.faqs 
  FOR DELETE 
  USING (public.is_admin());

-- SUPPORT OPTIONS (only show active ones to public)
CREATE POLICY "Allow public read active support_options" ON public.support_options 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admin read all support_options" ON public.support_options 
  FOR SELECT 
  USING (public.is_admin());

CREATE POLICY "Admin write support_options" ON public.support_options 
  FOR INSERT 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin update support_options" ON public.support_options 
  FOR UPDATE 
  USING (public.is_admin());

CREATE POLICY "Admin delete support_options" ON public.support_options 
  FOR DELETE 
  USING (public.is_admin());

-- CONTACT SUBMISSIONS (only admins can read)
CREATE POLICY "Admin read submissions" ON public.contact_submissions 
  FOR SELECT 
  USING (public.is_admin());

CREATE POLICY "Allow public submit contact" ON public.contact_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- COMPREHENSIVE FIX for All RLS Policies
-- Run this in Supabase Dashboard > SQL Editor
-- This removes all problematic policies and restores proper access

-- ============================================
-- STEP 1: Drop all problematic admin policies
-- ============================================

DROP POLICY IF EXISTS "Admin write universities" ON public.universities;
DROP POLICY IF EXISTS "Admin write programs" ON public.programs;
DROP POLICY IF EXISTS "Admin write scholarships" ON public.scholarships;
DROP POLICY IF EXISTS "Admin write qs_rankings" ON public.qs_rankings;
DROP POLICY IF EXISTS "Admin write study_destinations" ON public.study_destinations;
DROP POLICY IF EXISTS "Admin write visa_guides" ON public.visa_guides;
DROP POLICY IF EXISTS "Admin write application_steps" ON public.application_steps;
DROP POLICY IF EXISTS "Admin write document_guides" ON public.document_guides;
DROP POLICY IF EXISTS "Admin write resources" ON public.resources;
DROP POLICY IF EXISTS "Admin write faqs" ON public.faqs;
DROP POLICY IF EXISTS "Admin write support_options" ON public.support_options;
DROP POLICY IF EXISTS "Admin read submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow admin full access" ON public.profiles;

-- ============================================
-- STEP 2: Create public read-only policies
-- ============================================

-- UNIVERSITIES - Public read
CREATE POLICY "Public read universities" ON public.universities 
  FOR SELECT 
  USING (true);

-- PROGRAMS - Public read
CREATE POLICY "Public read programs" ON public.programs 
  FOR SELECT 
  USING (true);

-- SCHOLARSHIPS - Public read (active only)
CREATE POLICY "Public read active scholarships" ON public.scholarships 
  FOR SELECT 
  USING (is_active = true);

-- QS RANKINGS - Public read
CREATE POLICY "Public read qs_rankings" ON public.qs_rankings 
  FOR SELECT 
  USING (true);

-- STUDY DESTINATIONS - Public read
CREATE POLICY "Public read study_destinations" ON public.study_destinations 
  FOR SELECT 
  USING (true);

-- VISA GUIDES - Public read
CREATE POLICY "Public read visa_guides" ON public.visa_guides 
  FOR SELECT 
  USING (true);

-- APPLICATION STEPS - Public read
CREATE POLICY "Public read application_steps" ON public.application_steps 
  FOR SELECT 
  USING (true);

-- DOCUMENT GUIDES - Public read (THIS IS THE KEY FIX)
CREATE POLICY "Public read document_guides" ON public.document_guides 
  FOR SELECT 
  USING (true);

-- RESOURCES - Public read
CREATE POLICY "Public read resources" ON public.resources 
  FOR SELECT 
  USING (true);

-- FAQS - Public read (active only)
CREATE POLICY "Public read active faqs" ON public.faqs 
  FOR SELECT 
  USING (is_active = true);

-- SUPPORT OPTIONS - Public read (active only)
CREATE POLICY "Public read active support_options" ON public.support_options 
  FOR SELECT 
  USING (is_active = true);

-- CONTACT SUBMISSIONS - Public insert for contact form
CREATE POLICY "Public insert contact_submissions" ON public.contact_submissions 
  FOR INSERT 
  USING (true);

-- PROFILES - Users can read and update their own profile
CREATE POLICY "Users read own profile" ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users update own profile" ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- ============================================
-- STEP 3: Write access (Service Role Only)
-- ============================================
-- NOTE: Service role (SUPABASE_SERVICE_ROLE_KEY) bypasses RLS
-- So we don't need additional policies for admin operations
-- The service role is used by the API routes and can write to any table

-- If you want to add explicit admin role checks in the future, uncomment below:
-- CREATE POLICY "Admin all universities" ON public.universities FOR ALL USING (auth.jwt() ->> 'role' = 'authenticated' AND auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- ============================================
-- VERIFICATION
-- ============================================
-- After running this script:
-- 1. Public pages can READ documentation, universities, programs, etc.
-- 2. Admin API endpoints (using service role key) can CREATE/UPDATE/DELETE
-- 3. Users can read/update their own profiles
-- 4. Contact form can be submitted by anyone

-- To test:
-- 1. Check frontend documentation page loads (GET /api/documentation)
-- 2. Check admin can create new guides (POST /api/documentation)
-- 3. Check admin can edit/delete guides (PUT/DELETE /api/documentation/[id])

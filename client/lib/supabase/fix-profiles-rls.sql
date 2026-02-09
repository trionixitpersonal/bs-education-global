-- Fix infinite recursion in profiles table RLS policies
-- Run this in your Supabase SQL Editor

-- Drop all existing policies on profiles table
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "public_profiles_select" ON public.profiles;
DROP POLICY IF EXISTS "public_profiles_insert" ON public.profiles;
DROP POLICY IF EXISTS "public_profiles_update" ON public.profiles;

-- Create simple, non-recursive policies for profiles table

-- Users can view their own profile (using auth.uid() directly, no recursion)
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile during registration
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Service role bypass (for admin operations via service key)
-- No need for admin policies since service role bypasses RLS

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.profiles TO anon;

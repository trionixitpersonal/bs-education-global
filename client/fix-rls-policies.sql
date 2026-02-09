-- Fix for infinite recursion in RLS policies
-- Run this in your Supabase SQL Editor

-- Drop the problematic policy
DROP POLICY IF EXISTS "Allow admin full access" ON public.profiles;

-- Create simpler, non-recursive policies for profiles
-- Allow users to read their own profile
CREATE POLICY "Users can read own profile" ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Allow service role full access (this is for server-side operations)
-- Service role bypasses RLS, so this is handled automatically

-- For INSERT, we need to allow profile creation when a user signs up
CREATE POLICY "Users can insert own profile" ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

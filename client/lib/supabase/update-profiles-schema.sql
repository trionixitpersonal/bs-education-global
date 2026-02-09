-- Add additional profile fields for user profile management
-- Run this in your Supabase SQL Editor

-- Add new columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS country TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE;

-- Create index for phone lookups (optional but useful)
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON public.profiles(phone);

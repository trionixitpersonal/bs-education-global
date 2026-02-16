-- Migration: Add user account approval system
-- Run this in your Supabase SQL Editor to enable the account approval feature

-- Add is_approved column to profiles table (if not already exists)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT false;

-- Create index for faster approval queries
CREATE INDEX IF NOT EXISTS idx_profiles_is_approved ON public.profiles(is_approved);

-- Update existing admin/super_admin users to be automatically approved
UPDATE public.profiles 
SET is_approved = true 
WHERE role IN ('admin', 'super_admin');

-- Add comment to explain the column
COMMENT ON COLUMN public.profiles.is_approved IS 'Flag to indicate if user account has been approved by admin. Regular users start with false, admins auto-approved.';

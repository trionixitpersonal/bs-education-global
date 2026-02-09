-- Make university_id nullable in programs table
-- Run this in Supabase SQL Editor

ALTER TABLE public.programs 
ALTER COLUMN university_id DROP NOT NULL;

-- Also update the level check constraint to match dialog options
ALTER TABLE public.programs 
DROP CONSTRAINT IF EXISTS programs_level_check;

ALTER TABLE public.programs 
ADD CONSTRAINT programs_level_check 
CHECK (level IN ('Undergraduate', 'Graduate', 'PhD'));

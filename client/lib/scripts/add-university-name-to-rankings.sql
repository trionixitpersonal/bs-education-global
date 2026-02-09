-- Add university_name column to qs_rankings table
ALTER TABLE public.qs_rankings
ADD COLUMN IF NOT EXISTS university_name TEXT;

-- Make university_id nullable since we'll use university_name instead
ALTER TABLE public.qs_rankings
ALTER COLUMN university_id DROP NOT NULL;

-- Drop the foreign key constraint if it exists
ALTER TABLE public.qs_rankings
DROP CONSTRAINT IF EXISTS qs_rankings_university_id_fkey;

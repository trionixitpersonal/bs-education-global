-- Add guide_link column to visa_guides table
ALTER TABLE public.visa_guides ADD COLUMN IF NOT EXISTS guide_link TEXT;

-- Comment to describe the column
COMMENT ON COLUMN public.visa_guides.guide_link IS 'URL link for the full visa guide (optional)';

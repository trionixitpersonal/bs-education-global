-- Optional table to track university search queries for analytics
-- Run this in Supabase SQL Editor if you want to track user searches

CREATE TABLE IF NOT EXISTS university_search_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  study_level TEXT NOT NULL,
  subject TEXT NOT NULL,
  location TEXT NOT NULL,
  session TEXT NOT NULL,
  user_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for analytics queries
CREATE INDEX idx_search_queries_created_at ON university_search_queries(created_at DESC);
CREATE INDEX idx_search_queries_location ON university_search_queries(location);
CREATE INDEX idx_search_queries_study_level ON university_search_queries(study_level);

-- Enable RLS
ALTER TABLE university_search_queries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for search tracking)
CREATE POLICY "Anyone can submit search queries"
  ON university_search_queries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can view (for admin analytics)
CREATE POLICY "Authenticated users can view search queries"
  ON university_search_queries
  FOR SELECT
  TO authenticated
  USING (true);

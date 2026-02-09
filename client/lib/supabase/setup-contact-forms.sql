-- ============================================================================
-- Setup Contact Forms System - Run this in Supabase SQL Editor
-- ============================================================================
-- This script creates tables for contact forms OR adds missing columns if tables exist
-- ============================================================================

-- ============================================================================
-- Drop the table if it exists (CAUTION: This will delete all existing data!)
-- Comment out the next two lines if you want to keep existing data
-- ============================================================================
-- DROP TABLE IF EXISTS contact_submissions CASCADE;
-- DROP TABLE IF EXISTS email_settings CASCADE;

-- ============================================================================
-- Create contact_submissions table for all support form entries
-- ============================================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('contact', 'consultation', 'review', 'verification')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'cancelled')),
  
  -- Common fields for all types
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Contact form specific
  subject TEXT,
  message TEXT,
  
  -- Consultation form specific
  preferred_date DATE,
  preferred_time TIME,
  consultation_type TEXT,
  
  -- Review form specific
  review_type TEXT,
  
  -- Verification form specific
  document_type TEXT,
  destination_country TEXT,
  
  -- Additional info (used by all types)
  additional_info TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  admin_notes TEXT
);

-- ============================================================================
-- Add missing columns if table already exists
-- (These will fail silently if columns already exist - that's expected)
-- ============================================================================
DO $$ 
BEGIN
  -- Drop old check constraints if they exist
  BEGIN ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_type_check; EXCEPTION WHEN OTHERS THEN NULL; END;
  BEGIN ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_status_check; EXCEPTION WHEN OTHERS THEN NULL; END;
  
  -- Add core columns that might be missing
  BEGIN ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS type TEXT; EXCEPTION WHEN OTHERS THEN NULL; END;
  BEGIN ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new'; EXCEPTION WHEN OTHERS THEN NULL; END;
  
  -- Add other columns that might be missing
  BEGIN ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS phone TEXT; EXCEPTION WHEN OTHERS THEN NULL; END;
  BEGIN ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS subject TEXT; EXCEPTION WHEN OTHERS THEN NULL; END;
  BEGIN ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS message TEXT; EXCEPTION WHEN OTHERS THEN NULL; END;
  BEGIN ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS additional_info TEXT; EXCEPTION WHEN OTHERS THEN NULL; END;
  BEGIN ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS preferred_date DATE; EXCEPTION WHEN OTHERS THEN NULL; END;
  BEGIN ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS preferred_time TIME; EXCEPTION WHEN OTHERS THEN NULL; END;
  BEGIN ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS consultation_type TEXT; EXCEPTION WHEN OTHERS THEN NULL; END;
  BEGIN ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS review_type TEXT; EXCEPTION WHEN OTHERS THEN NULL; END;
  BEGIN ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS document_type TEXT; EXCEPTION WHEN OTHERS THEN NULL; END;
  BEGIN ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS destination_country TEXT; EXCEPTION WHEN OTHERS THEN NULL; END;
  BEGIN ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS admin_notes TEXT; EXCEPTION WHEN OTHERS THEN NULL; END;
  BEGIN ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(); EXCEPTION WHEN OTHERS THEN NULL; END;
  
  -- Add constraints back
  BEGIN ALTER TABLE contact_submissions ADD CONSTRAINT contact_submissions_type_check CHECK (type IN ('contact', 'consultation', 'review', 'verification')); EXCEPTION WHEN OTHERS THEN NULL; END;
  BEGIN ALTER TABLE contact_submissions ADD CONSTRAINT contact_submissions_status_check CHECK (status IN ('new', 'in_progress', 'completed', 'cancelled')); EXCEPTION WHEN OTHERS THEN NULL; END;
END $$;

-- ============================================================================
-- Create email_settings table for SMTP configuration
-- ============================================================================
CREATE TABLE IF NOT EXISTS email_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  smtp_host TEXT NOT NULL,
  smtp_port INTEGER NOT NULL DEFAULT 587,
  smtp_user TEXT NOT NULL,
  smtp_password TEXT,
  from_email TEXT NOT NULL,
  from_name TEXT DEFAULT 'BS Education',
  to_email TEXT NOT NULL, -- Where form submissions are sent
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- Create indexes for better performance
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_contact_submissions_type ON contact_submissions(type);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

-- ============================================================================
-- Enable Row Level Security
-- ============================================================================
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON contact_submissions;
DROP POLICY IF EXISTS "Admins can view all submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Admins can manage submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Admins can view email settings" ON email_settings;
DROP POLICY IF EXISTS "Admins can manage email settings" ON email_settings;

-- Contact submissions policies
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all submissions"
  ON contact_submissions FOR SELECT
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'super_admin')
  );

CREATE POLICY "Admins can manage submissions"
  ON contact_submissions FOR ALL
  USING (
    auth.jwt() ->>  'role' IN ('admin', 'super_admin')
  );

-- Email settings policies (only admins)
CREATE POLICY "Admins can view email settings"
  ON email_settings FOR SELECT
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'super_admin')
  );

CREATE POLICY "Admins can manage email settings"
  ON email_settings FOR ALL
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'super_admin')
  );

-- ============================================================================
-- Insert default email settings (update with your actual values)
-- ============================================================================
INSERT INTO email_settings (
  smtp_host,
  smtp_port,
  smtp_user,
  from_email,
  from_name,
  to_email,
  is_active
) VALUES (
  'smtp.gmail.com',
  587,
  'your-email@gmail.com',
  'noreply@bsedu.com.au',
  'BS Education Support',
  'admin@bsedu.com.au',
  false
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- Setup complete! You can now use the contact forms system.
-- ============================================================================
-- Uncomment the queries below to view submissions after you have some data:

-- View all submissions grouped by type
-- SELECT 
--   type,
--   status,
--   COUNT(*) as total_count
-- FROM contact_submissions
-- GROUP BY type, status
-- ORDER BY type, status;

-- View recent submissions
-- SELECT 
--   id,
--   type,
--   name,
--   email,
--   phone,
--   status,
--   created_at
-- FROM contact_submissions
-- ORDER BY created_at DESC
-- LIMIT 50;

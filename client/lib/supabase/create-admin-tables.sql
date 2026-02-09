-- Create or modify universities table
CREATE TABLE IF NOT EXISTS universities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  country TEXT,
  city TEXT,
  website TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns to universities if they don't exist
ALTER TABLE universities ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE universities ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Update existing universities to set is_active if NULL
UPDATE universities SET is_active = true WHERE is_active IS NULL;

-- Add unique constraint on name if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'universities_name_key' 
    AND conrelid = 'universities'::regclass
  ) THEN
    ALTER TABLE universities ADD CONSTRAINT universities_name_key UNIQUE (name);
  END IF;
END $$;

-- Create programs table
CREATE TABLE IF NOT EXISTS programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  university_id UUID REFERENCES universities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level TEXT NOT NULL, -- Undergraduate, Graduate, PhD
  description TEXT,
  duration TEXT,
  tuition_fee TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(university_id, name, level)
);

-- Add missing columns to programs if they don't exist
ALTER TABLE programs ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE programs ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE programs ADD COLUMN IF NOT EXISTS duration TEXT;
ALTER TABLE programs ADD COLUMN IF NOT EXISTS tuition_fee TEXT;
ALTER TABLE programs ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE programs ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Drop NOT NULL constraint from tuition column if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'programs' AND column_name = 'tuition'
  ) THEN
    ALTER TABLE programs ALTER COLUMN tuition DROP NOT NULL;
  END IF;
END $$;

-- Add unique constraint on programs (university_id, name, level) if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'programs_university_id_name_level_key' 
    AND conrelid = 'programs'::regclass
  ) THEN
    ALTER TABLE programs ADD CONSTRAINT programs_university_id_name_level_key UNIQUE (university_id, name, level);
  END IF;
END $$;

-- Create intakes table
CREATE TABLE IF NOT EXISTS intakes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE, -- e.g., "Fall 2026", "Spring 2027"
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns to intakes if they don't exist
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add unique constraint on intakes name if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'intakes_name_key' 
    AND conrelid = 'intakes'::regclass
  ) THEN
    ALTER TABLE intakes ADD CONSTRAINT intakes_name_key UNIQUE (name);
  END IF;
END $$;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_programs_university ON programs(university_id);
CREATE INDEX IF NOT EXISTS idx_programs_active ON programs(is_active);
CREATE INDEX IF NOT EXISTS idx_universities_active ON universities(is_active);
CREATE INDEX IF NOT EXISTS idx_intakes_active ON intakes(is_active);

-- Add RLS policies for universities
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow read access to active universities" ON universities;
DROP POLICY IF EXISTS "Allow admins to manage universities" ON universities;

-- Allow everyone to read active universities
CREATE POLICY "Allow read access to active universities"
  ON universities FOR SELECT
  USING (is_active = true);

-- Only admins can insert/update/delete universities
CREATE POLICY "Allow admins to manage universities"
  ON universities FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Add RLS policies for programs
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow read access to active programs" ON programs;
DROP POLICY IF EXISTS "Allow admins to manage programs" ON programs;

-- Allow everyone to read active programs
CREATE POLICY "Allow read access to active programs"
  ON programs FOR SELECT
  USING (is_active = true);

-- Only admins can insert/update/delete programs
CREATE POLICY "Allow admins to manage programs"
  ON programs FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Add RLS policies for intakes
ALTER TABLE intakes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow read access to active intakes" ON intakes;
DROP POLICY IF EXISTS "Allow admins to manage intakes" ON intakes;

-- Allow everyone to read active intakes
CREATE POLICY "Allow read access to active intakes"
  ON intakes FOR SELECT
  USING (is_active = true);

-- Only admins can insert/update/delete intakes
CREATE POLICY "Allow admins to manage intakes"
  ON intakes FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Insert some sample data (remove after admin panel is ready)
INSERT INTO universities (name, country, city, website, is_active) VALUES
  ('Harvard University', 'United States', 'Cambridge', 'https://www.harvard.edu', true),
  ('Stanford University', 'United States', 'Stanford', 'https://www.stanford.edu', true),
  ('MIT', 'United States', 'Cambridge', 'https://www.mit.edu', true),
  ('Oxford University', 'United Kingdom', 'Oxford', 'https://www.ox.ac.uk', true),
  ('Cambridge University', 'United Kingdom', 'Cambridge', 'https://www.cam.ac.uk', true)
ON CONFLICT (name) DO UPDATE SET
  country = EXCLUDED.country,
  city = EXCLUDED.city,
  website = EXCLUDED.website,
  is_active = EXCLUDED.is_active;

INSERT INTO intakes (name, start_date, end_date, is_active) VALUES
  ('Fall 2026', '2026-09-01', '2026-12-31', true),
  ('Spring 2027', '2027-01-01', '2027-05-31', true),
  ('Fall 2027', '2027-09-01', '2027-12-31', true),
  ('Spring 2028', '2028-01-01', '2028-05-31', true)
ON CONFLICT (name) DO UPDATE SET
  start_date = EXCLUDED.start_date,
  end_date = EXCLUDED.end_date,
  is_active = EXCLUDED.is_active;

-- Insert sample programs for each university
DO $$
DECLARE
  univ_id UUID;
BEGIN
  FOR univ_id IN SELECT id FROM universities LOOP
    INSERT INTO programs (university_id, name, level, duration, tuition_fee, is_active) VALUES
      (univ_id, 'Computer Science', 'Undergraduate', '4 years', '$50,000/year', true),
      (univ_id, 'Computer Science', 'Graduate', '2 years', '$60,000/year', true),
      (univ_id, 'Business Administration', 'Undergraduate', '4 years', '$45,000/year', true),
      (univ_id, 'Business Administration', 'Graduate', '2 years', '$55,000/year', true),
      (univ_id, 'Engineering', 'Undergraduate', '4 years', '$48,000/year', true),
      (univ_id, 'Engineering', 'Graduate', '2 years', '$58,000/year', true)
    ON CONFLICT (university_id, name, level) DO UPDATE SET
      duration = EXCLUDED.duration,
      tuition_fee = EXCLUDED.tuition_fee,
      is_active = EXCLUDED.is_active;
  END LOOP;
END $$;

-- Create applications table if it doesn't exist
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  university_id UUID REFERENCES universities(id),
  university_name TEXT,
  program_id UUID REFERENCES programs(id),
  program_name TEXT,
  program_level TEXT,
  intake_id UUID REFERENCES intakes(id),
  intake TEXT,
  status TEXT DEFAULT 'draft',
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns to applications if they don't exist
ALTER TABLE applications ADD COLUMN IF NOT EXISTS university_id UUID REFERENCES universities(id);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS program_id UUID REFERENCES programs(id);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS intake_id UUID REFERENCES intakes(id);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS university_name TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS program_name TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS program_level TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS intake TEXT;

-- Add index for applications
CREATE INDEX IF NOT EXISTS idx_applications_user ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_university ON applications(university_id);
CREATE INDEX IF NOT EXISTS idx_applications_program ON applications(program_id);
CREATE INDEX IF NOT EXISTS idx_applications_intake ON applications(intake_id);

-- Add RLS policies for applications
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own applications" ON applications;
DROP POLICY IF EXISTS "Admins can view all applications" ON applications;
DROP POLICY IF EXISTS "Users can create own applications" ON applications;
DROP POLICY IF EXISTS "Users can update own applications" ON applications;
DROP POLICY IF EXISTS "Users can delete own applications" ON applications;

-- Users can only see their own applications
CREATE POLICY "Users can view own applications"
  ON applications FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all applications
CREATE POLICY "Admins can view all applications"
  ON applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Users can create their own applications
CREATE POLICY "Users can create own applications"
  ON applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own applications
CREATE POLICY "Users can update own applications"
  ON applications FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own applications
CREATE POLICY "Users can delete own applications"
  ON applications FOR DELETE
  USING (auth.uid() = user_id);

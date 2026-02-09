-- BS Education Platform Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Universities table
CREATE TABLE public.universities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  ranking INTEGER,
  description TEXT,
  image_url TEXT,
  tuition_range TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Programs table
CREATE TABLE public.programs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  university_id UUID REFERENCES public.universities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('Undergraduate', 'Graduate', 'PhD')),
  duration TEXT NOT NULL,
  tuition TEXT NOT NULL,
  description TEXT,
  requirements TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Scholarships table
CREATE TABLE public.scholarships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  amount TEXT NOT NULL,
  deadline DATE NOT NULL,
  eligibility TEXT[] NOT NULL,
  country TEXT NOT NULL,
  university TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('Undergraduate', 'Graduate', 'PhD', 'All')),
  category TEXT NOT NULL,
  application_link TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- QS Rankings table
CREATE TABLE public.qs_rankings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  university_id UUID REFERENCES public.universities(id) ON DELETE CASCADE,
  rank INTEGER NOT NULL,
  country TEXT NOT NULL,
  region TEXT NOT NULL CHECK (region IN ('Global', 'Asia', 'Europe', 'North America', 'Latin America', 'Middle East', 'Africa')),
  discipline TEXT NOT NULL CHECK (discipline IN ('Engineering', 'Business', 'Medicine', 'Arts', 'Science', 'Technology', 'Law', 'Overall')),
  score NUMERIC(5,2) NOT NULL,
  year INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Study Destinations table
CREATE TABLE public.study_destinations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  cost_of_living TEXT NOT NULL,
  student_life TEXT,
  culture TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Destination Universities junction table
CREATE TABLE public.destination_universities (
  destination_id UUID REFERENCES public.study_destinations(id) ON DELETE CASCADE,
  university_id UUID REFERENCES public.universities(id) ON DELETE CASCADE,
  PRIMARY KEY (destination_id, university_id)
);

-- Visa Guides table
CREATE TABLE public.visa_guides (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  country TEXT NOT NULL,
  flag_emoji TEXT,
  visa_type TEXT NOT NULL,
  requirements TEXT[] NOT NULL,
  processing_time TEXT NOT NULL,
  cost TEXT NOT NULL,
  documents TEXT[] NOT NULL,
  description TEXT NOT NULL,
  guide_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Application Process Steps table
CREATE TABLE public.application_steps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  country TEXT NOT NULL,
  duration TEXT NOT NULL,
  requirements TEXT[] NOT NULL,
  tips TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Document Guides table
CREATE TABLE public.document_guides (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  country TEXT NOT NULL,
  visa_type TEXT NOT NULL,
  documents TEXT[] NOT NULL,
  checklist TEXT[] NOT NULL,
  templates TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Resources table
CREATE TABLE public.resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Guide', 'Article', 'Video', 'Tool', 'Template')),
  link TEXT NOT NULL,
  read_time TEXT,
  tags TEXT[],
  published_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Support FAQs table
CREATE TABLE public.faqs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Support Options table
CREATE TABLE public.support_options (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  link TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Help', 'Contact', 'FAQ', 'Booking')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Contact Form Submissions table
CREATE TABLE public.contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better performance
CREATE INDEX idx_universities_country ON public.universities(country);
CREATE INDEX idx_programs_university ON public.programs(university_id);
CREATE INDEX idx_scholarships_deadline ON public.scholarships(deadline);
CREATE INDEX idx_scholarships_active ON public.scholarships(is_active);
CREATE INDEX idx_qs_rankings_rank ON public.qs_rankings(rank);
CREATE INDEX idx_contact_status ON public.contact_submissions(status);
CREATE INDEX idx_faqs_category ON public.faqs(category);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qs_rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visa_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies - Public Read Access
CREATE POLICY "Allow public read access" ON public.universities FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.programs FOR SELECT USING (true);
CREATE POLICY "Allow public read access on active scholarships" ON public.scholarships FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access" ON public.qs_rankings FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.study_destinations FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.visa_guides FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.application_steps FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.document_guides FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Allow public read access on active FAQs" ON public.faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access on active support" ON public.support_options FOR SELECT USING (is_active = true);

-- Admin Write Access Policies
CREATE POLICY "Allow admin full access" ON public.profiles FOR ALL USING (
  auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'super_admin'))
);

CREATE POLICY "Allow admin write" ON public.universities FOR ALL USING (
  auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'super_admin'))
);

CREATE POLICY "Allow admin write" ON public.programs FOR ALL USING (
  auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'super_admin'))
);

CREATE POLICY "Allow admin write" ON public.scholarships FOR ALL USING (
  auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'super_admin'))
);

CREATE POLICY "Allow admin write" ON public.qs_rankings FOR ALL USING (
  auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'super_admin'))
);

CREATE POLICY "Allow admin write" ON public.study_destinations FOR ALL USING (
  auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'super_admin'))
);

CREATE POLICY "Allow admin write" ON public.visa_guides FOR ALL USING (
  auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'super_admin'))
);

CREATE POLICY "Allow admin write" ON public.application_steps FOR ALL USING (
  auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'super_admin'))
);

CREATE POLICY "Allow admin write" ON public.document_guides FOR ALL USING (
  auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'super_admin'))
);

CREATE POLICY "Allow admin write" ON public.resources FOR ALL USING (
  auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'super_admin'))
);

CREATE POLICY "Allow admin write" ON public.faqs FOR ALL USING (
  auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'super_admin'))
);

CREATE POLICY "Allow admin write" ON public.support_options FOR ALL USING (
  auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'super_admin'))
);

CREATE POLICY "Allow admin read all submissions" ON public.contact_submissions FOR SELECT USING (
  auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'super_admin'))
);

CREATE POLICY "Allow public insert submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_universities_updated_at BEFORE UPDATE ON public.universities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON public.programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_scholarships_updated_at BEFORE UPDATE ON public.scholarships FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_qs_rankings_updated_at BEFORE UPDATE ON public.qs_rankings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_study_destinations_updated_at BEFORE UPDATE ON public.study_destinations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_visa_guides_updated_at BEFORE UPDATE ON public.visa_guides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_application_steps_updated_at BEFORE UPDATE ON public.application_steps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_document_guides_updated_at BEFORE UPDATE ON public.document_guides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON public.resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_support_options_updated_at BEFORE UPDATE ON public.support_options FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON public.contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

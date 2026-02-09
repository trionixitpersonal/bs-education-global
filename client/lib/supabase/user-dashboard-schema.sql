-- User Dashboard Tables Schema
-- Run this in your Supabase SQL Editor to create tables for applications and documents

-- Applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  university_name TEXT NOT NULL,
  program_name TEXT NOT NULL,
  program_level TEXT DEFAULT 'Undergraduate' CHECK (program_level IN ('Undergraduate', 'Graduate', 'PhD')),
  intake TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'under_review', 'accepted', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Documents table
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT DEFAULT 'other' CHECK (type IN ('passport', 'transcript', 'resume', 'letter', 'certificate', 'other')),
  file_url TEXT NOT NULL,
  file_size INTEGER DEFAULT 0,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON public.applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON public.documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_type ON public.documents(type);

-- Enable Row Level Security
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for applications
CREATE POLICY "Users can view their own applications" ON public.applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications" ON public.applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications" ON public.applications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own applications" ON public.applications
  FOR DELETE USING (auth.uid() = user_id);

-- Admin policies for applications
CREATE POLICY "Admins can view all applications" ON public.applications
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'super_admin'))
  );

CREATE POLICY "Admins can update all applications" ON public.applications
  FOR UPDATE USING (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'super_admin'))
  );

-- RLS Policies for documents
CREATE POLICY "Users can view their own documents" ON public.documents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own documents" ON public.documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents" ON public.documents
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents" ON public.documents
  FOR DELETE USING (auth.uid() = user_id);

-- Admin policies for documents
CREATE POLICY "Admins can view all documents" ON public.documents
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('admin', 'super_admin'))
  );

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

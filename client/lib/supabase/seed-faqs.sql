-- ============================================================================
-- Create FAQs table if it doesn't exist
-- ============================================================================
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- Clear existing FAQs (optional - comment out if you want to keep existing)
-- ============================================================================
TRUNCATE TABLE faqs CASCADE;

-- ============================================================================
-- Seed FAQs from frontend (support-data.ts)
-- ============================================================================
INSERT INTO faqs (question, answer, category, order_index, is_active) VALUES
(
  'How do I find universities that match my profile?',
  'Use our university finder tool by entering your academic qualifications, preferred country, program of interest, and budget. Our system will match you with suitable universities based on your criteria.',
  'Universities',
  1,
  true
),
(
  'What documents do I need for university applications?',
  'Typically, you''ll need academic transcripts, diplomas, English proficiency test scores (IELTS/TOEFL), statement of purpose, letters of recommendation, CV/resume, and passport copy. Requirements vary by university and country.',
  'Applications',
  2,
  true
),
(
  'How long does the visa application process take?',
  'Visa processing times vary by country: USA (2-8 weeks), UK (3-6 weeks), Canada (4-20 weeks), Australia (1-4 months), Germany (4-12 weeks). It''s recommended to apply at least 3-4 months before your program starts.',
  'Visa',
  3,
  true
),
(
  'Can I work while studying abroad?',
  'Most countries allow international students to work part-time (usually 20 hours per week during term time) with a valid student visa. Some countries like Canada allow full-time work during breaks. Check specific country regulations.',
  'Visa',
  4,
  true
),
(
  'How do I apply for scholarships?',
  'Research scholarships that match your profile, prepare required documents (academic records, essays, recommendation letters), meet eligibility criteria, and submit applications before deadlines. Our platform helps you discover and track scholarship opportunities.',
  'Scholarships',
  5,
  true
),
(
  'What is the difference between IELTS and TOEFL?',
  'IELTS is British English focused and accepted globally, while TOEFL is American English focused. IELTS uses a 9-band scale, TOEFL uses a 0-120 score. Both test reading, writing, listening, and speaking. Choose based on your target country and university requirements.',
  'Applications',
  6,
  true
),
(
  'Do I need health insurance to study abroad?',
  'Yes, most countries require international students to have health insurance. Some countries like Australia require Overseas Student Health Cover (OSHC), while others may accept private insurance. Check your destination country''s specific requirements.',
  'Visa',
  7,
  true
),
(
  'How much money do I need to show for visa applications?',
  'Financial requirements vary: USA (varies by program), UK (£1,334/month for London), Canada (CAD $10,000+ per year), Australia (AUD $21,041 per year), Germany (€11,208 per year). You''ll need bank statements showing sufficient funds.',
  'Visa',
  8,
  true
),
(
  'Can I bring my family with me on a student visa?',
  'Many countries allow dependents (spouse and children) on student visas, but requirements vary. You''ll typically need to show additional financial support and may need separate visa applications for family members.',
  'Visa',
  9,
  true
),
(
  'What happens if my visa is rejected?',
  'If your visa is rejected, you''ll receive a rejection letter with reasons. You can reapply after addressing the issues, appeal the decision (if applicable), or seek guidance from our visa experts to improve your application.',
  'Visa',
  10,
  true
);

-- ============================================================================
-- Verify the data was inserted
-- ============================================================================
SELECT COUNT(*) as total_faqs FROM faqs;

-- ============================================================================
-- View all FAQs ordered by order_index
-- ============================================================================
SELECT 
  id,
  question,
  category,
  order_index,
  is_active,
  created_at
FROM faqs
ORDER BY order_index ASC;

-- ============================================================================
-- Optional: Enable Row Level Security (RLS) for FAQs
-- ============================================================================
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view active FAQs" ON faqs;
DROP POLICY IF EXISTS "Admins can manage FAQs" ON faqs;

-- Allow everyone to read active FAQs (public access)
CREATE POLICY "Anyone can view active FAQs"
  ON faqs FOR SELECT
  USING (is_active = true);

-- Only authenticated admins can insert/update/delete FAQs
CREATE POLICY "Admins can manage FAQs"
  ON faqs FOR ALL
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'super_admin')
  );

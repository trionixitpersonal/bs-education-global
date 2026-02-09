-- Script to identify and clean up duplicate programs
-- Run EACH STEP SEPARATELY in Supabase SQL Editor

-- ============================================================================
-- STEP 1: View all duplicates (programs with same university_id, name, and level)
-- ============================================================================
SELECT 
  university_id,
  name,
  level,
  COUNT(*) as duplicate_count,
  ARRAY_AGG(id) as program_ids
FROM programs
GROUP BY university_id, name, level
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC, name;

-- ============================================================================
-- STEP 2: Delete duplicate programs (keeping only the one with smallest ID)
-- RUN THIS ONLY AFTER REVIEWING STEP 1 RESULTS
-- ============================================================================
DELETE FROM programs
WHERE id IN (
  SELECT p1.id
  FROM programs p1
  INNER JOIN programs p2 ON 
    p1.university_id = p2.university_id 
    AND p1.name = p2.name 
    AND p1.level = p2.level
    AND p1.id > p2.id
);

-- ============================================================================
-- STEP 3: Drop existing constraint if it exists, then add unique constraint
-- ============================================================================
-- First drop if exists
ALTER TABLE programs 
DROP CONSTRAINT IF EXISTS unique_program_per_university;

-- Then add the constraint
ALTER TABLE programs 
ADD CONSTRAINT unique_program_per_university 
UNIQUE (university_id, name, level);

-- ============================================================================
-- STEP 4: Verify cleanup - This should return NO ROWS if successful
-- ============================================================================
SELECT 
  university_id,
  name,
  level,
  COUNT(*) as count
FROM programs
GROUP BY university_id, name, level
HAVING COUNT(*) > 1;

-- ============================================================================
-- STEP 5: View ALL programs with university names
-- ============================================================================
SELECT 
  p.id,
  u.name as university_name,
  p.name as program_name,
  p.level,
  p.duration,
  p.tuition
FROM programs p
LEFT JOIN universities u ON p.university_id = u.id
ORDER BY u.name, p.name, p.level;

-- ============================================================================
-- ALTERNATIVE: If you want to delete ALL programs and start fresh
-- DANGER: This will delete ALL programs! Only use if you want to start over
-- ============================================================================
-- TRUNCATE TABLE programs CASCADE;

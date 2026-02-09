-- Complete fix for programs table university_id issues
-- Run this in your Supabase SQL Editor

-- Step 1: Make university_id nullable (if not already)
ALTER TABLE programs 
ALTER COLUMN university_id DROP NOT NULL;

-- Step 2: Update any existing "undefined" string values to NULL
UPDATE programs 
SET university_id = NULL 
WHERE university_id = 'undefined' OR university_id = '';

-- Step 3: Check if there's a foreign key constraint and handle it
-- First, find the constraint name (if it exists)
DO $$ 
DECLARE
    constraint_name text;
BEGIN
    -- Find foreign key constraint on university_id
    SELECT tc.constraint_name INTO constraint_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.constraint_column_usage ccu 
        ON tc.constraint_name = ccu.constraint_name
    WHERE tc.table_name = 'programs' 
        AND tc.constraint_type = 'FOREIGN KEY'
        AND ccu.column_name = 'university_id'
    LIMIT 1;
    
    -- Drop the constraint if it exists
    IF constraint_name IS NOT NULL THEN
        EXECUTE format('ALTER TABLE programs DROP CONSTRAINT %I', constraint_name);
        RAISE NOTICE 'Dropped foreign key constraint: %', constraint_name;
    ELSE
        RAISE NOTICE 'No foreign key constraint found on university_id';
    END IF;
END $$;

-- Step 4: Re-add the foreign key constraint with ON DELETE SET NULL
-- This way, if a university is deleted, the program's university_id becomes NULL instead of failing
ALTER TABLE programs
ADD CONSTRAINT programs_university_id_fkey 
FOREIGN KEY (university_id) 
REFERENCES universities(id) 
ON DELETE SET NULL;

-- Verify the changes
SELECT 
    column_name,
    is_nullable,
    data_type
FROM information_schema.columns
WHERE table_name = 'programs' AND column_name = 'university_id';

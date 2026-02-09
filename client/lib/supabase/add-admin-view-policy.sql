-- Drop existing admin view policy if it exists
DROP POLICY IF EXISTS "Admins can view all applications" ON applications;
DROP POLICY IF EXISTS "Admins can update all applications" ON applications;

-- Allow admins to view all applications
CREATE POLICY "Admins can view all applications"
  ON applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Allow admins to update all applications
CREATE POLICY "Admins can update all applications"
  ON applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

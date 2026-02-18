# Documentation Support Fix - RLS Policy Issue

## Problem

The documentation guides are visible in the admin panel but showing "No documentation guides found" on the frontend. This is caused by an RLS (Row Level Security) policy issue in Supabase.

### Root Cause

The `complete-rls-fix.sql` script uses `FOR ALL` policies which restrict all operations (SELECT, INSERT, UPDATE, DELETE) to admins only. This blocks public read access to documentation guides, even though they should be publicly readable.

**Problematic policy:**
```sql
CREATE POLICY "Admin write document_guides" ON public.document_guides 
  FOR ALL 
  USING (public.is_admin());
```

This prevents non-admin users (including the frontend API using service role) from reading the documentation guides.

## Solution

Run the updated `complete-rls-fix.sql` file which includes:
1. **Separate SELECT policies** - Allow public read access to all content
2. **Separate INSERT/UPDATE/DELETE policies** - Restrict modifications to admins only

This approach properly separates read permissions from write permissions.

## How to Apply the Fix

### Option 1: Quick Fix (Recommended for existing databases)

Run the `fix-documentation-rls.sql` script in your Supabase SQL Editor:

```sql
-- This script specifically fixes the document_guides table
-- Go to: Supabase Dashboard > Your Project > SQL Editor
-- Copy and paste the contents of fix-documentation-rls.sql
-- Click "RUN"
```

### Option 2: Complete Fix (For future deployments)

Replace the `complete-rls-fix.sql` script with the updated version. This ensures all tables have proper public/admin policies.

## Updated Complete RLS Policy Structure

The fixed policies follow this pattern for each public data table:

```sql
-- Public READ access
CREATE POLICY "Allow public read [table_name]" ON public.[table_name] 
  FOR SELECT 
  USING (true);

-- Admin-only WRITE access
CREATE POLICY "Admin insert [table_name]" ON public.[table_name] 
  FOR INSERT 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin update [table_name]" ON public.[table_name] 
  FOR UPDATE 
  USING (public.is_admin());

CREATE POLICY "Admin delete [table_name]" ON public.[table_name] 
  FOR DELETE 
  USING (public.is_admin());
```

### Tables Affected

All public data tables now use this pattern:
- universities
- programs
- scholarships
- qs_rankings
- study_destinations
- visa_guides
- application_steps
- **document_guides** ← This was the immediate issue
- resources
- faqs
- support_options

## Testing the Fix

After applying the fix, verify that:

1. ✅ Admin panel can still create/edit/delete documentation guides
2. ✅ Frontend `/api/documentation` endpoint returns data
3. ✅ Documentation page displays all guides

## Why This Happened

1. The initial schema used `FOR ALL` policies that referenced the profiles table
2. This caused recursion issues when RLS tried to check user roles
3. The `complete-rls-fix.sql` was created to fix recursion but didn't properly restore public read access
4. Instead of using `FOR ALL` with a condition, separate policies should be used:
   - `FOR SELECT` for public read
   - `FOR INSERT/UPDATE/DELETE` for admin write

## Prevention

For future RLS policy implementation:
1. Always separate SELECT operations from write operations
2. Use `FOR SELECT USING (condition)` for read access
3. Use separate `FOR INSERT/UPDATE/DELETE` for write operations
4. This avoids the `FOR ALL` pitfall and makes policies clearer

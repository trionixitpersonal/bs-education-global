# URGENT: RLS Policy Fix Required for Live Server

## Current Situation

- ✅ Admin panel can access documentation management
- ❌ Server error when accessing admin page
- ❌ Frontend shows "No documentation guides found"

**Root Cause:** RLS policies on `document_guides` table are still blocking public read access, and the current policies may have database reference issues.

## Immediate Steps to Fix

### Step 1: Apply the Comprehensive RLS Fix

1. Go to **Supabase Dashboard** → Your Project
2. Click **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy and paste the entire contents of **`comprehensive-rls-fix.sql`** from this folder
5. Click **RUN** (blue button)
6. Wait for success confirmation

This script will:
- ✅ Remove all problematic policies
- ✅ Add public read access to all content tables
- ✅ Allow write access via service role (admin API)
- ✅ Fix the documentation guides issue

### Step 2: Verify the Fix Works

After running the SQL:

1. **Test Admin Panel:**
   - Go to `/admin/dashboard/documentation`
   - You should see documentation guides without server error
   - Try creating a new guide

2. **Test Frontend:**
   - Go to `/documentation`
   - Should see all documentation guides displayed

3. **Check API directly:**
   - Open browser console and test: `fetch('/api/documentation').then(r => r.json()).then(console.log)`
   - Should return an array of documentation guides

## Why This Works

The issue was complex RLS policies that:
1. ❌ Used recursive checks (referencing profiles table)
2. ❌ Used `FOR ALL` which blocked SELECT operations
3. ❌ Tried to check admin status in the database policy

The fix uses:
1. ✅ Simple `FOR SELECT USING (true)` for public read access
2. ✅ Service role bypass for all write operations (no policy check needed)
3. ✅ Separate policies for different operation types

## File Guide

| File | Purpose | When to Use |
|------|---------|------------|
| `comprehensive-rls-fix.sql` | Complete fix for all tables | **USE THIS FIRST** - Run on live database |
| `simple-rls-fix.sql` | Quick fix for document_guides only | Use if comprehensive fix fails |
| `fix-documentation-rls.sql` | Uses `is_admin()` function | Only if is_admin() function exists |
| `complete-rls-fix.sql` | Old version with issues | Don't use |

## Before & After

### Before (Broken)
```sql
-- This blocked everything if not authenticated
CREATE POLICY "Admin write document_guides" ON public.document_guides 
  FOR ALL USING (public.is_admin());
```

### After (Fixed)
```sql
-- Allows anyone to read
CREATE POLICY "Public read document_guides" ON public.document_guides 
  FOR SELECT USING (true);

-- Writes handled by service role (bypasses RLS)
-- No explicit policy needed
```

## Troubleshooting

**Still seeing "Server error"?**
- Verify the SQL ran without errors
- Check Supabase project settings → Database Logs
- Clear browser cache and reload

**Still seeing "No documentation guides found" on frontend?**
- Check if data exists: Go to Supabase SQL Editor and run:
  ```sql
  SELECT COUNT(*) FROM document_guides;
  ```
- If count is 0, add some test data in admin panel first

**Admin can't create new guides after fix?**
- Verify `SUPABASE_SERVICE_ROLE_KEY` environment variable is set
- Check server logs for detailed error message

## Quick Reference

**Affected Tables:**
- document_guides ← Main issue
- universities, programs, scholarships, etc. → Also fixed
- profiles → Fixed for user access
- contact_submissions → Fixed for form submissions

All tables now allow:
- ✅ Public READ access
- ✅ Admin WRITE access (service role)

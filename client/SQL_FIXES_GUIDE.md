# SQL Fixes Guide

## Which Script to Use?

### Option 1: Quick Fix (Document Guides Only) ⚡
**File:** `safe-document-guides-fix.sql`

Use this if:
- Only need to fix documentation guides
- Want smallest, safest script
- Getting "policy already exists" error
- Don't want to touch other tables

**Time:** 1 second  
**Risk:** Very low - only touches document_guides table

```bash
# What it does:
- Drops all old document_guides policies
- Creates single public read policy
- Done!
```

### Option 2: Complete Fix (All Tables) 🔧
**File:** `comprehensive-rls-fix.sql`

Use this if:
- Want to fix ALL content tables at once
- Previously had issues with multiple tables
- Setting up fresh database
- Don't mind dropping and recreating all policies

**Time:** 3-5 seconds  
**Risk:** Low - drops old policies before creating new ones, includes error handling

**What it fixes:**
- ✅ document_guides (documentation)
- ✅ universities
- ✅ programs  
- ✅ scholarships
- ✅ qs_rankings
- ✅ study_destinations
- ✅ visa_guides
- ✅ application_steps
- ✅ resources
- ✅ faqs
- ✅ support_options
- ✅ contact_submissions
- ✅ profiles (user access)

### Option 3: Fix What's Broken (Old Approach) ⚠️
**File:** `fix-documentation-rls.sql`

⚠️ **Not recommended** - doesn't drop existing policies  
Only use if you know old policies don't exist

---

## Step-by-Step Instructions

### For Safe Document Guides Fix:

1. Go to **Supabase.com** → Your Project
2. Click **SQL Editor** (left sidebar)
3. Click **New Query** → **New blank query**
4. Copy entire contents of **`safe-document-guides-fix.sql`**
5. Paste into editor
6. Click **RUN** button (blue)
7. Wait for success message

### For Comprehensive Fix:

1. Go to **Supabase.com** → Your Project
2. Click **SQL Editor**
3. Click **New Query** → **New blank query**
4. Copy entire contents of **`comprehensive-rls-fix.sql`**
5. Paste into editor
6. Click **RUN** button (blue)
7. Wait for success message

---

## Error Messages & Solutions

### "ERROR: 42710: policy already exists"
- **Cause:** Old policy still on database
- **Solution:** Use `safe-document-guides-fix.sql` or `comprehensive-rls-fix.sql` (both drop old policies)
- **Don't use:** `fix-documentation-rls.sql` or `fix-policies.js`

### "ERROR: 42601: only WITH CHECK expression allowed for INSERT"
- **Cause:** SQL syntax error in INSERT policy
- **Solution:** Fixed in current version - use latest `comprehensive-rls-fix.sql`

### "No documentation guides found" after applying fix
- **Cause:** No data in database OR RLS policy not applied correctly
- **Solutions:**
  1. Check if data exists: `SELECT COUNT(*) FROM document_guides;`
  2. Check if policy exists: Go to Table → RLS Policies → should see "Public read document_guides"
  3. Try re-running the safe fix script

---

## Verification Checklist

After running the SQL:

- [ ] No error message appears (or says "Success")
- [ ] Can see "Public read document_guides" policy in Supabase RLS settings
- [ ] Documentation API test returns data:
  ```bash
  curl https://bsedu.com.au/api/documentation
  ```
  Should return JSON array of documents

- [ ] Frontend documentation page shows guides
- [ ] Admin can create new guides without error
- [ ] Admin can edit/delete guides without error

---

## Quick Reference

| Issue | Script | Time |
|-------|--------|------|
| Only doc guides broken | `safe-document-guides-fix.sql` | 1s |
| Multiple things broken | `comprehensive-rls-fix.sql` | 5s |
| Getting "already exists" error | Either of above | 1-5s |
| Fresh database setup | `comprehensive-rls-fix.sql` | 5s |

---

## Never Use

❌ `fix-policies.js` - Old Node.js script, deprecated  
❌ `fix-rls-policies.sql` - Old version with issues  
❌ `complete-rls-fix.sql` - Old version with issues  
❌ `fix-programs-schema.sql` - For programs tables only  
❌ `fix-programs-complete.sql` - For programs tables only

---

## Need Custom Setup?

If you need to:
- Fix only specific tables (not all)
- Use different policy names
- Setup admin-only access instead of public
- Setup partial public access

...tell me and I can create a custom SQL script for your needs.

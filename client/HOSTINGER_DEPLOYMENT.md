# Hostinger Deployment Guide - BS Education

## Current Issues & Fixes Applied

### Issue 1: Admin Login Page Not Styled ❌→✅
**Problem:** Login page displaying without CSS styling (Tailwind not compiled)
**Solution:** Added inline fallback styles to admin login page
**Status:** ✅ Fixed in code

### Issue 2: Authentication Server Error (Error page) ❌→✅
**Problem:** After login, redirecting to `/api/auth/error` which doesn't exist
**Solution:** Created proper `/auth/error` page
**Status:** ✅ Fixed in code

### Issue 3: Documentation Not Showing on Frontend ❌→Pending
**Problem:** RLS policies blocking public read access to document_guides
**Solution:** Need to apply SQL fixes to Supabase database
**Status:** ⏳ Requires manual SQL execution

---

## Deployment Steps

### Step 1: Set Required Environment Variables

On Hostinger, add these to your `.env` file or hosting environment variables:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth
NEXTAUTH_SECRET=generate_a_random_secret_key_here
NEXTAUTH_URL=https://bsedu.com.au

# App URL (for API calls)
NEXT_PUBLIC_APP_URL=https://bsedu.com.au
```

**To generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Step 2: Build Configuration

Ensure your build command is:
```bash
npm run build
```

And start command is:
```bash
npm start
```

### Step 3: Apply RLS Policies to Supabase Database

**If you get an error about policies already existing:**

Use the safer script instead - it drops old policies first:

1. Go to **https://supabase.com** → Your Project
2. Click **SQL Editor**
3. Click **New Query**
4. Copy and paste the contents of **`safe-document-guides-fix.sql`** (if only document_guides needs fixing)
   - OR use `comprehensive-rls-fix.sql` (drops and recreates all policies - safe to run multiple times now)
5. Click **RUN**

**Why you might get "policy already exists" error:**
- Policies from previous deployments are still on the database
- The updated `comprehensive-rls-fix.sql` now drops all existing policies first before creating new ones
- This makes it safe to run multiple times

This enables public read access to documentation and other content.

### Step 4: Verify Deployment

**Check admin login:**
- Navigate to `https://bsedu.com.au/admin/login`
- Should see properly styled login form
- Should be able to login with admin credentials

**Check documentation page:**
- Navigate to `https://bsedu.com.au/documentation`
- Should see documentation guides listed

**Check admin dashboard:**
- After login, should access admin dashboard
- Should be able to create/edit/delete guides without server error

---

## Troubleshooting

### Still seeing styling issues on login page?

1. **Clear browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
   - Or completely clear browser cache

2. **Check CSS is being served:**
   - Right-click page → Inspect → Network tab
   - Look for CSS files being downloaded
   - Should see `_next/static/css/` files

3. **Check build output:**
   - Hostinger should have build logs
   - Check if build completed successfully
   - Look for CSS errors in build output

### Getting auth error page?

1. **Verify NEXTAUTH_SECRET is set:**
   - Should be a random 32-character string
   - Generate with: `openssl rand -base64 32`

2. **Verify NEXTAUTH_URL matches your domain:**
   - Should be: `https://bsedu.com.au`
   - Not `http://` for production

3. **Check server logs:**
   - Hostinger dashboard → Logs
   - Look for auth-related errors

### Still showing "No documentation guides found"?

1. **Database has data?**
   - Login to Supabase SQL Editor
   - Run: `SELECT COUNT(*) FROM document_guides;`
   - Should return number > 0

2. **RLS Policy applied?**
   - Go to Supabase → Authentication → Policies
   - Look for "Public read document_guides" policy
   - Should exist and be enabled

3. **Check API endpoint:**
   - In browser console, run:
     ```javascript
     fetch('/api/documentation').then(r => r.json()).then(console.log)
     ```
   - Should return array of documents

### Getting "policy already exists" error?

1. **Use the safe script:**
   - Copy contents of `safe-document-guides-fix.sql` instead
   - This shows up when policies from old deployments exist

2. **Or run the updated comprehensive fix:**
   - The updated `comprehensive-rls-fix.sql` now drops all existing policies first
   - Safe to run multiple times
   - Recreates everything from scratch

3. **Manual fix if needed:**
   ```sql
   -- Just drop and recreate the problematic policy
   DROP POLICY IF EXISTS "Public read document_guides" ON public.document_guides;
   
   CREATE POLICY "Public read document_guides" ON public.document_guides 
     FOR SELECT 
     USING (true);
   ```

---

## Environment Variables Reference

| Variable | Example | Notes |
|----------|---------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | From Supabase dashboard |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Public key from Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Secret key - keep secure! |
| `NEXTAUTH_SECRET` | `iE4...` | Generated random string |
| `NEXTAUTH_URL` | `https://bsedu.com.au` | Your domain URL |
| `NEXT_PUBLIC_APP_URL` | `https://bsedu.com.au` | For API calls from frontend |

---

## Quick Checklist

- [ ] Environment variables set in Hostinger
- [ ] `npm run build` completes successfully
- [ ] Supabase RLS policies applied (comprehensive-rls-fix.sql)
- [ ] Admin login page shows with styling
- [ ] Can login to admin accounts
- [ ] Admin dashboard loads without errors
- [ ] Documentation page shows guides
- [ ] Can create/edit/delete documentation from admin panel

---

## If Still Having Issues

1. **Check Hostinger build logs** - Look for TypeScript/build errors
2. **Verify all env vars are set** - Missing even one can cause issues
3. **Check Supabase status** - Is the database running?
4. **Clear all caches** - Browser, CDN, everything
5. **Rebuild from scratch:**
   ```bash
   npm install
   npm run build
   ```

---

## Contact

If issues persist:
1. Check Hostinger support documentation
2. Review Supabase logs at https://supabase.com
3. Look at server error logs in Hostinger dashboard
4. Share server logs for diagnosis

# Hostinger Authentication Troubleshooting Guide

## Current Environment Variables Check

Your Hostinger setup has these variables:
- ✅ NEXT_PUBLIC_SUPABASE_URL
- ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
- ✅ SUPABASE_SERVICE_ROLE_KEY
- ✅ NEXTAUTH_URL (https://bsedu.com.au)
- ✅ NEXTAUTH_SECRET
- ⚠️ ADMIN_EMAIL & ADMIN_PASSWORD (these are NOT used by the auth system)

## Issues Identified

### 1. **Admin User Doesn't Exist in Supabase**
The login fails because:
- The code tries to authenticate users via Supabase's `signInWithPassword()`
- Admin users must exist in Supabase with role metadata
- Your credentials stored in env vars are NOT creating/validating users

### 2. **NEXTAUTH_SECRET Issues**
The secret shown might be too short or invalid. It should be:
- 32+ characters long
- Cryptographically random
- **NEVER hardcoded in simple text**

### 3. **Missing Admin User in Database**
You need to create an admin user in Supabase manually.

## Solutions

### Solution 1: Create Admin User in Supabase Dashboard

1. Go to: https://app.supabase.com
2. Select your project
3. Go to **Authentication → Users**
4. Click **"Add user"**
5. Create user with:
   - Email: `director@bsedu.com.au`
   - Password: (strong password, NOT the one in env)
   - Email confirmed: ✓ Check this
6. After creating, edit the user and add custom metadata:
   ```json
   {
     "full_name": "Director",
     "role": "admin"
   }
   ```

### Solution 2: Update NEXTAUTH_SECRET

Your NEXTAUTH_SECRET should be stronger. Generate a new one:

**Windows PowerShell:**
```powershell
$bytes = [byte[]]::new(32)
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$secret = [Convert]::ToBase64String($bytes)
Write-Output $secret
```

Then update it in Hostinger environment variables.

### Solution 3: Verify Environment Variables on Hostinger

Make sure these are set correctly in Hostinger Control Panel:

```
✓ NEXT_PUBLIC_SUPABASE_URL=https://ysgsbcpwoupsdtrkqsli.supabase.co
✓ NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkJXVCJ9...
✓ SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkJXVCJ9...
✓ NEXTAUTH_URL=https://bsedu.com.au
✓ NEXTAUTH_SECRET=(32+ char random string)
⚠️ ADMIN_EMAIL=director@bsedu.com.au (optional, for reference)
⚠️ ADMIN_PASSWORD=adminpassword123 (NOT used in auth, can remove)
✓ NEXT_PUBLIC_SITE_URL=https://bsedu.com.au
```

### Solution 4: Test Authentication Flow

Create a test script to verify Supabase connection:

**File: `client/test-auth-hostinger.js`**
```javascript
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuth() {
  try {
    console.log("Testing authentication...");
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "director@bsedu.com.au",
      password: "YOUR_PASSWORD_HERE"
    });

    if (error) {
      console.error("Login failed:", error.message);
      return;
    }

    console.log("✅ Login successful!");
    console.log("User:", data.user.email);
    console.log("Role:", data.user.user_metadata?.role);
  } catch (err) {
    console.error("Error:", err);
  }
}

testAuth();
```

## Deployment Checklist

After making changes:

- [ ] Created admin user in Supabase with `role: "admin"`
- [ ] Updated NEXTAUTH_SECRET to secure 32+ char string
- [ ] Verified all env vars are in Hostinger control panel
- [ ] Cleared browser cookies/cache
- [ ] Redeployed site from GitHub (or wait for auto-deploy)
- [ ] Tested login at: https://bsedu.com.au/admin/login

## Debugging Steps

If login still doesn't work:

1. **Check Supabase logs:**
   - Go to https://app.supabase.com → Project → Logs
   - Look for auth errors

2. **Check Hostinger logs:**
   - Hostinger Control Panel → Logs
   - Look for Node.js/deployment errors

3. **Test Supabase directly:**
   - Use Supabase CLI or API testing tool
   - Verify user exists with correct metadata

4. **Check NEXTAUTH configuration:**
   - Ensure NEXTAUTH_URL matches your domain exactly
   - Ensure NEXTAUTH_SECRET is set and valid

## Regular Login Process

Once admin user is created, login works like this:

1. User enters email/password in `/admin/login`
2. Next.js sends to NextAuth CredentialsProvider
3. CredentialsProvider calls Supabase auth API
4. Supabase returns user data with `user_metadata.role`
5. NextAuth checks if role === "admin"
6. If yes, user is logged in with admin access

The ADMIN_EMAIL and ADMIN_PASSWORD env variables are NOT used in this flow - they're just for reference.

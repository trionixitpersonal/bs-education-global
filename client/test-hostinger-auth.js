#!/usr/bin/env node

/**
 * Hostinger Authentication Test Script
 * Run this to verify Supabase connection and admin user setup
 * 
 * Usage:
 * node test-hostinger-auth.js director@bsedu.com.au your_password
 */

const https = require("https");

function makeRequest(url, options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(data),
            headers: res.headers,
          });
        } catch {
          resolve({
            status: res.statusCode,
            data: data,
            headers: res.headers,
          });
        }
      });
    });

    req.on("error", reject);
    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
}

async function testSupabaseAuth() {
  const email = process.argv[2] || "director@bsedu.com.au";
  const password = process.argv[3];

  if (!password) {
    console.error("❌ Error: Please provide a password as second argument");
    console.error("Usage: node test-hostinger-auth.js email@example.com password");
    process.exit(1);
  }

  console.log("🔍 Testing Supabase Authentication...\n");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Error: Missing Supabase environment variables");
    console.error("Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY");
    process.exit(1);
  }

  console.log(`📍 Supabase URL: ${supabaseUrl}`);
  console.log(`🔑 Testing with email: ${email}\n`);

  try {
    // Step 1: Test connection
    console.log("1️⃣  Testing Supabase connection...");
    const connectionUrl = new URL(supabaseUrl);
    const connResult = await makeRequest(
      `${supabaseUrl}/auth/v1/health`,
      {
        method: "GET",
        headers: {
          "apikey": supabaseKey,
          "Content-Type": "application/json",
        },
      }
    );

    if (connResult.status === 200) {
      console.log("   ✅ Supabase connection successful\n");
    } else {
      console.log(
        `   ❌ Connection failed (Status: ${connResult.status})\n`
      );
    }

    // Step 2: Test authentication
    console.log("2️⃣  Testing authentication...");
    const authResult = await makeRequest(
      `${supabaseUrl}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          "apikey": supabaseKey,
          "Content-Type": "application/json",
        },
      },
      {
        email: email,
        password: password,
      }
    );

    if (authResult.status === 200) {
      console.log("   ✅ Authentication successful\n");

      // Step 3: Get user info
      console.log("3️⃣  Retrieving user information...");
      const userUrl = `${supabaseUrl}/auth/v1/user`;
      const userResult = await makeRequest(
        userUrl,
        {
          method: "GET",
          headers: {
            "apikey": supabaseKey,
            "Authorization": `Bearer ${authResult.data.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (userResult.status === 200) {
        const user = userResult.data;
        console.log("   ✅ User data retrieved\n");
        console.log("📋 User Information:");
        console.log(`   ID: ${user.id}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Email Confirmed: ${user.email_confirmed}`);
        console.log(`   Role: ${user.user_metadata?.role || "NOT SET ❌"}`);
        console.log(`   Full Name: ${user.user_metadata?.full_name || "NOT SET"}\n`);

        if (!user.user_metadata?.role) {
          console.warn("⚠️  WARNING: User role is not set!");
          console.warn("   You must set role='admin' in user metadata for admin login.\n");
        }

        if (user.user_metadata?.role === "admin") {
          console.log("✅ User has admin role - login should work!");
        }
      } else {
        console.log(`   ❌ Failed to retrieve user data (Status: ${userResult.status})\n`);
      }
    } else {
      console.log(`   ❌ Authentication failed (Status: ${authResult.status})`);
      console.log(`   Error: ${authResult.data?.error_description || authResult.data?.error || authResult.data}\n`);

      if (authResult.status === 400) {
        console.error(
          "⚠️  Invalid credentials or user does not exist.\n"
        );
        console.error(
          "Make sure the admin user is created in Supabase.\n"
        );
      }
    }

    // Step 4: Check environment
    console.log("4️⃣  Environment Variables Check:");
    console.log(
      `   NEXTAUTH_URL: ${process.env.NEXTAUTH_URL ? "✅ Set" : "❌ Not set"}`
    );
    console.log(
      `   NEXTAUTH_SECRET: ${process.env.NEXTAUTH_SECRET ? "✅ Set (" + process.env.NEXTAUTH_SECRET.length + " chars)" : "❌ Not set"}`
    );
    console.log(
      `   NEXT_PUBLIC_SUPABASE_URL: ✅ Set`
    );
    console.log(
      `   NEXT_PUBLIC_SUPABASE_ANON_KEY: ✅ Set`
    );
    console.log(
      `   SUPABASE_SERVICE_ROLE_KEY: ${process.env.SUPABASE_SERVICE_ROLE_KEY ? "✅ Set" : "⚠️  Not set (optional)"}\n`
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

testSupabaseAuth();

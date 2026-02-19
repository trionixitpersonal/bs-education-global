#!/usr/bin/env node

/**
 * NextAuth Environment Validation Script
 * Run before starting the Next.js app to validate all required variables
 */

const requiredEnvVars = {
  "NEXT_PUBLIC_SUPABASE_URL": "Supabase project URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY": "Supabase anonymous key",
  "NEXTAUTH_URL": "NextAuth callback URL (https://bsedu.com.au)",
  "NEXTAUTH_SECRET": "NextAuth secret (32+ character random string)"
};

const optionalEnvVars = {
  "SUPABASE_SERVICE_ROLE_KEY": "Supabase service role key (optional)",
  "NEXT_PUBLIC_SITE_URL": "Public site URL (optional)"
};

console.log("🔍 Validating environment variables...\n");

let hasErrors = false;

// Check required variables
console.log("📋 Required Variables:");
Object.entries(requiredEnvVars).forEach(([key, description]) => {
  const value = process.env[key];
  if (value) {
    const displayValue = value.length > 30 ? value.substring(0, 30) + "..." : value;
    console.log(`  ✅ ${key}: ${displayValue}`);
  } else {
    console.log(`  ❌ ${key}: NOT SET`);
    console.log(`     Description: ${description}`);
    hasErrors = true;
  }
});

// Check optional variables
console.log("\n📋 Optional Variables:");
Object.entries(optionalEnvVars).forEach(([key, description]) => {
  const value = process.env[key];
  if (value) {
    const displayValue = value.length > 30 ? value.substring(0, 30) + "..." : value;
    console.log(`  ✅ ${key}: ${displayValue}`);
  } else {
    console.log(`  ⚠️  ${key}: NOT SET (${description})`);
  }
});

// Validate NEXTAUTH_SECRET length
if (process.env.NEXTAUTH_SECRET) {
  const secretLength = process.env.NEXTAUTH_SECRET.length;
  if (secretLength < 32) {
    console.log(`\n⚠️  WARNING: NEXTAUTH_SECRET is only ${secretLength} characters (should be 32+)`);
    hasErrors = true;
  }
}

// Validate NEXTAUTH_URL format
if (process.env.NEXTAUTH_URL) {
  const url = process.env.NEXTAUTH_URL;
  if (!url.startsWith("https://") && !url.startsWith("http://")) {
    console.log(`\n❌ ERROR: NEXTAUTH_URL must start with https:// or http://`);
    console.log(`   Current value: ${url}`);
    hasErrors = true;
  }
}

console.log("\n" + "=".repeat(50));
if (hasErrors) {
  console.log("❌ Validation FAILED - Fix the errors above");
  process.exit(1);
} else {
  console.log("✅ All required variables are set correctly");
  console.log("\n🚀 Ready to start the application!");
  process.exit(0);
}

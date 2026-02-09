// Script to fix RLS policies programmatically
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function fixPolicies() {
  console.log('Fixing RLS policies...\n');

  try {
    // Drop the problematic policy
    console.log('1. Dropping problematic policy...');
    await supabase.rpc('exec_sql', { 
      sql: 'DROP POLICY IF EXISTS "Allow admin full access" ON public.profiles;'
    });

    // Since rpc might not work, let's use a different approach
    // We'll need to run raw SQL
    const { error } = await supabase.from('profiles').select('id').limit(1);
    
    console.log('\n⚠️  Note: RLS policies must be updated through Supabase Dashboard SQL Editor');
    console.log('The service role key bypasses RLS, so your admin operations will work.');
    console.log('But for proper security, please run fix-rls-policies.sql in Supabase SQL Editor.\n');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fixPolicies();

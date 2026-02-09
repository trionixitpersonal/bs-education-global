// Test script to verify Supabase authentication
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Testing Supabase Authentication...');
console.log('URL:', supabaseUrl);
console.log('Service Key:', supabaseServiceKey ? 'Present' : 'Missing');

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function testAuth() {
  const email = 'director@bsedu.com.au';
  const password = 'adminpassword123';
  
  console.log('\n1. Testing authentication with email:', email);
  
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.error('❌ Auth Error:', authError.message);
      return;
    }

    console.log('✅ Authentication successful!');
    console.log('User ID:', authData.user.id);
    console.log('User Email:', authData.user.email);

    console.log('\n2. Fetching user profile...');
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      console.error('❌ Profile Error:', profileError.message);
      return;
    }

    console.log('✅ Profile found!');
    console.log('Full Name:', profile.full_name);
    console.log('Role:', profile.role);
    console.log('Email:', profile.email);

    if (profile.role === 'admin' || profile.role === 'super_admin') {
      console.log('\n✅ User has admin access!');
    } else {
      console.log('\n❌ User does not have admin role');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

testAuth();

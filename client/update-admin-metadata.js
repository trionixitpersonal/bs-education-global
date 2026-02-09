// Script to update admin user metadata
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

async function updateAdminMetadata() {
  const email = 'director@bsedu.com.au';
  
  console.log('Updating admin user metadata...\n');

  try {
    // Get the user by email
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('Error listing users:', listError.message);
      return;
    }

    const user = users.find(u => u.email === email);
    
    if (!user) {
      console.error('User not found:', email);
      return;
    }

    console.log('Found user:', user.id);

    // Update user metadata with admin role
    const { data, error } = await supabase.auth.admin.updateUserById(
      user.id,
      {
        user_metadata: {
          role: 'super_admin',
          full_name: 'BS Education Admin'
        }
      }
    );

    if (error) {
      console.error('Error updating metadata:', error.message);
      return;
    }

    console.log('✅ Successfully updated user metadata!');
    console.log('Role:', data.user.user_metadata.role);
    console.log('Full Name:', data.user.user_metadata.full_name);
    console.log('\nYou can now login with:');
    console.log('Email:', email);
    console.log('Password: adminpassword123');

  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
}

updateAdminMetadata();

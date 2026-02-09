import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, full_name, role, password } = body;
    
    console.log("Creating user with data:", { email, full_name, role });
    
    // Use provided password or generate a random one
    const userPassword = password || Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12);
    
    // Step 1: Create auth user first
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: userPassword,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        full_name,
        role: role || "user"
      }
    });

    if (authError) {
      console.error("Auth error creating user:", authError);
      return NextResponse.json(
        { error: authError.message || "Failed to create auth user" },
        { status: 500 }
      );
    }

    // Step 2: Create or update profile
    const { data: profileData, error: profileError } = await supabaseAdmin
      .from("profiles")
      .upsert({
        id: authData.user.id,
        email,
        full_name,
        role: role || "user"
      })
      .select()
      .single();

    if (profileError) {
      console.error("Profile error:", profileError);
      // Try to clean up auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json(
        { error: profileError.message || "Failed to create profile" },
        { status: 500 }
      );
    }

    return NextResponse.json(profileData, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create user:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create user" },
      { status: 500 }
    );
  }
}

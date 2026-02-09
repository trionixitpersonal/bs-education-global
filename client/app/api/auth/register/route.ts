import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, full_name, role } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Create auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: full_name || "",
        role: role || "user"
      }
    });

    if (authError) {
      console.error("Auth error creating user:", authError);
      return NextResponse.json(
        { error: authError.message || "Failed to create account" },
        { status: 500 }
      );
    }

    // Create profile
    const { data: profileData, error: profileError } = await supabaseAdmin
      .from("profiles")
      .upsert({
        id: authData.user.id,
        email,
        full_name: full_name || "",
        role: role || "user"
      })
      .select()
      .single();

    if (profileError) {
      console.error("Profile error:", profileError);
      // Clean up auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json(
        { error: profileError.message || "Failed to create profile" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Account created successfully", user: profileData },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Failed to register user:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create account" },
      { status: 500 }
    );
  }
}

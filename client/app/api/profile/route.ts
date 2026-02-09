import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createClient } from "@supabase/supabase-js";

// GET - Fetch user profile
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("GET /api/profile - Fetching profile for:", session.user.email);

    // Use service role key to bypass RLS
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("email", session.user.email)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }

    console.log("Profile fetched:", profile);
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error in GET /api/profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { full_name, phone, address, city, country, date_of_birth } = body;

    console.log("PUT /api/profile - Updating profile for:", session.user.email);
    console.log("Data to update:", { full_name, phone, address, city, country, date_of_birth });

    // Use service role key for admin-level operations
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // First, get the user's ID from their email
    const { data: userProfile, error: fetchError } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("email", session.user.email)
      .single();

    if (fetchError || !userProfile) {
      console.error("Error fetching user profile:", fetchError);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("Found user ID:", userProfile.id);

    // Prepare update data - convert empty strings to null for date field
    const updateData: any = {
      full_name: full_name || null,
      phone: phone || null,
      address: address || null,
      city: city || null,
      country: country || null,
      date_of_birth: date_of_birth || null,
      updated_at: new Date().toISOString(),
    };

    // Update profile in database using user's ID
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update(updateData)
      .eq("id", userProfile.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating profile:", error);
      return NextResponse.json({ error: "Failed to update profile", details: error.message }, { status: 500 });
    }

    console.log("Profile updated successfully:", data);
    return NextResponse.json({ success: true, profile: data });
  } catch (error) {
    console.error("Error in PUT /api/profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

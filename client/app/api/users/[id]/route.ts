import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = (await request.json()) as {
      email?: string;
      full_name?: string;
      role?: string;
      password?: string;
    };
    const { id } = await params;
    const { email, full_name, role, password } = body;

    // Update auth user metadata and password if provided
    const authUpdate: {
      user_metadata: { full_name: string; role: string };
      password?: string;
    } = {
      user_metadata: {
        full_name: full_name || "",
        role: role || "",
      }
    };

    // Only update password if provided
    if (password && password.trim() !== "") {
      authUpdate.password = password;
    }

    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
      id,
      authUpdate
    );

    if (authError) {
      console.error("Auth error updating user:", authError);
      return NextResponse.json(
        { error: authError.message || "Failed to update auth user" },
        { status: 500 }
      );
    }

    // Update profile
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({ email, full_name, role })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating profile:", error);
      return NextResponse.json(
        { error: error.message || "Failed to update user" },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data[0]);
  } catch (error: unknown) {
    console.error("Failed to update user:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Delete auth user (this will cascade delete the profile)
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (authError) {
      console.error("Error deleting auth user:", authError);
      return NextResponse.json(
        { error: authError.message || "Failed to delete user" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Failed to delete user:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete user" },
      { status: 500 }
    );
  }
}

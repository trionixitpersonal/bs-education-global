import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: applicationId } = await params;
    const userId = (session.user as any).id;

    const { data, error } = await supabaseAdmin
      .from("applications")
      .select("*")
      .eq("id", applicationId)
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching application:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Failed to fetch application:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const userId = (session.user as any).id;

    // Only allow users to delete their own applications
    const { error } = await supabaseAdmin
      .from("applications")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      console.error("Error deleting application:", error);
      return NextResponse.json(
        { error: error.message || "Failed to delete application" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to delete application:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete application" },
      { status: 500 }
    );
  }
}

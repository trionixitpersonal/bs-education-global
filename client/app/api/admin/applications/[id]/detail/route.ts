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

    const userRole = (session.user as any).role;
    
    // Only admins can view individual applications
    if (!['admin', 'super_admin'].includes(userRole)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id: applicationId } = await params;

    // Fetch application with user profile
    const { data: application, error: appError } = await supabaseAdmin
      .from("applications")
      .select("*")
      .eq("id", applicationId)
      .single();

    if (appError) {
      console.error("Error fetching application:", appError);
      return NextResponse.json({ error: appError.message }, { status: 500 });
    }

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // Fetch user profile
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, email, phone, address, city, country")
      .eq("id", application.user_id)
      .single();

    return NextResponse.json({
      ...application,
      profiles: profile
    });
  } catch (error: any) {
    console.error("Failed to fetch application:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

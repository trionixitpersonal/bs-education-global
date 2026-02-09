import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as any).role;
    
    // Only admins can update application status
    if (!['admin', 'super_admin'].includes(userRole)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { status } = await request.json();
    const { id: applicationId } = await params;

    console.log("Updating application:", applicationId, "to status:", status);

    // Prepare update data
    const updateData: any = { 
      status,
      updated_at: new Date().toISOString()
    };

    // Only set submitted_at if status is 'submitted' and it wasn't set before
    if (status === 'submitted') {
      updateData.submitted_at = new Date().toISOString();
    }

    // Update the application status
    const { data, error } = await supabaseAdmin
      .from("applications")
      .update(updateData)
      .eq("id", applicationId)
      .select()
      .single();

    if (error) {
      console.error("Error updating application status:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Application updated successfully:", data);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Failed to update application status:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

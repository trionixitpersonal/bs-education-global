import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as any).role;
    
    // Only admins can view user documents
    if (!['admin', 'super_admin'].includes(userRole)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { userId } = await params;

    console.log("Fetching documents for userId:", userId);

    // Fetch all documents for the user
    const { data: documents, error } = await supabaseAdmin
      .from("documents")
      .select("*")
      .eq("user_id", userId)
      .order("uploaded_at", { ascending: false });

    if (error) {
      console.error("Error fetching documents:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Documents found:", documents?.length || 0);
    return NextResponse.json(documents || []);
  } catch (error: any) {
    console.error("Failed to fetch documents:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

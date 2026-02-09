import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Get applications count
    const { data: applications, error: appsError } = await supabaseAdmin
      .from("applications")
      .select("status")
      .eq("user_id", userId);

    if (appsError) {
      console.error("Error fetching applications:", appsError);
    }

    // Get documents count
    const { data: documents, error: docsError } = await supabaseAdmin
      .from("documents")
      .select("id")
      .eq("user_id", userId);

    if (docsError) {
      console.error("Error fetching documents:", docsError);
    }

    const totalApplications = applications?.length || 0;
    const pendingApplications = applications?.filter(
      a => ['draft', 'submitted', 'under_review'].includes(a.status)
    ).length || 0;
    const approvedApplications = applications?.filter(
      a => a.status === 'accepted'
    ).length || 0;
    const totalDocuments = documents?.length || 0;

    return NextResponse.json({
      totalApplications,
      pendingApplications,
      approvedApplications,
      totalDocuments,
    });
  } catch (error: any) {
    console.error("Failed to fetch user stats:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

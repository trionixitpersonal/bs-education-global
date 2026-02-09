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

    const userRole = (session.user as any).role;
    
    // Only admins and super_admins can view all applications
    if (!['admin', 'super_admin'].includes(userRole)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // First, get all applications
    const { data: applications, error: appsError } = await supabaseAdmin
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (appsError) {
      console.error("Error fetching applications:", appsError);
      return NextResponse.json({ error: appsError.message }, { status: 500 });
    }

    // Then get user profiles for each application
    const userIds = [...new Set(applications?.map(app => app.user_id) || [])];
    
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, email")
      .in("id", userIds);

    if (profilesError) {
      console.error("Error fetching profiles:", profilesError);
    }

    // Get document counts for each user
    const { data: documentCounts, error: docCountError } = await supabaseAdmin
      .from("documents")
      .select("user_id")
      .in("user_id", userIds);

    if (docCountError) {
      console.error("Error fetching document counts:", docCountError);
    }

    // Create a map of user_id to document count
    const docCountMap = new Map<string, number>();
    documentCounts?.forEach(doc => {
      docCountMap.set(doc.user_id, (docCountMap.get(doc.user_id) || 0) + 1);
    });

    // Merge the data
    const applicationsWithProfiles = applications?.map(app => ({
      ...app,
      profiles: profiles?.find(p => p.id === app.user_id) || null,
      document_count: docCountMap.get(app.user_id) || 0
    })) || [];

    console.log("Fetched applications:", applicationsWithProfiles.length);
    return NextResponse.json(applicationsWithProfiles);
  } catch (error: any) {
    console.error("Failed to fetch applications:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

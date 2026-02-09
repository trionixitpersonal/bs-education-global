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

    const { data, error } = await supabaseAdmin
      .from("applications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching applications:", error);
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await request.json();

    const { data, error } = await supabaseAdmin
      .from("applications")
      .insert([
        {
          user_id: userId,
          university_id: body.university_id || null,
          university_name: body.university_name,
          program_id: body.program_id || null,
          program_name: body.program_name,
          program_level: body.program_level || "Undergraduate",
          intake_id: body.intake_id || null,
          intake: body.intake || "",
          status: "draft",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating application:", error);
      return NextResponse.json(
        { error: error.message || "Failed to create application" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create application:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create application" },
      { status: 500 }
    );
  }
}

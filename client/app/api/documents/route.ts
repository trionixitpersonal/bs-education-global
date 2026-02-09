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
      .from("documents")
      .select("*")
      .eq("user_id", userId)
      .order("uploaded_at", { ascending: false });

    if (error) {
      console.error("Error fetching documents:", error);
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Failed to fetch documents:", error);
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
      .from("documents")
      .insert([
        {
          user_id: userId,
          name: body.name,
          type: body.type,
          file_url: body.file_url,
          file_size: body.file_size,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating document:", error);
      return NextResponse.json(
        { error: error.message || "Failed to create document" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create document:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create document" },
      { status: 500 }
    );
  }
}

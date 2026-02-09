import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data, error } = await supabaseAdmin
      .from("universities")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching university:", error);
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch university:", error);
    return NextResponse.json(
      { error: "University not found" },
      { status: 404 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const { data, error } = await supabaseAdmin
      .from("universities")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating university:", error);
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to update university:", error);
    return NextResponse.json(
      { error: "Failed to update university" },
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
    const { error } = await supabaseAdmin
      .from("universities")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting university:", error);
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete university:", error);
    return NextResponse.json(
      { error: "Failed to delete university" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const { data, error } = await supabaseAdmin
      .from("qs_rankings")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating ranking:", error);
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to update ranking:", error);
    return NextResponse.json(
      { error: "Failed to update ranking" },
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
      .from("qs_rankings")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting ranking:", error);
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete ranking:", error);
    return NextResponse.json(
      { error: "Failed to delete ranking" },
      { status: 500 }
    );
  }
}

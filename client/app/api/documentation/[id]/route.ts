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
      .from("document_guides")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating documentation guide:", error);
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to update documentation guide:", error);
    return NextResponse.json(
      { error: "Failed to update documentation guide" },
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
      .from("document_guides")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting documentation guide:", error);
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete documentation guide:", error);
    return NextResponse.json(
      { error: "Failed to delete documentation guide" },
      { status: 500 }
    );
  }
}

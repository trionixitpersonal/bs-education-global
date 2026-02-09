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
      .from("visa_guides")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating visa guide:", error);
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to update visa guide:", error);
    return NextResponse.json(
      { error: "Failed to update visa guide" },
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
      .from("visa_guides")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting visa guide:", error);
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete visa guide:", error);
    return NextResponse.json(
      { error: "Failed to delete visa guide" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { data, error } = await supabaseAdmin
      .from("post_arrival_support")
      .update(body)
      .eq("id", id)
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Error updating post arrival support:", error);
    return NextResponse.json(
      { error: "Failed to update post arrival support" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await supabaseAdmin
      .from("post_arrival_support")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post arrival support:", error);
    return NextResponse.json(
      { error: "Failed to delete post arrival support" },
      { status: 500 }
    );
  }
}

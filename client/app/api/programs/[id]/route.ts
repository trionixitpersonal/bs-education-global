import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    console.log("Updating program with data:", body);
    
    const { data, error } = await supabaseAdmin
      .from("programs")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error updating program:", error);
      return NextResponse.json(
        { error: error.message, details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Failed to update program:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update program" },
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
      .from("programs")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase error deleting program:", error);
      return NextResponse.json(
        { error: error.message, details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to delete program:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete program" },
      { status: 500 }
    );
  }
}

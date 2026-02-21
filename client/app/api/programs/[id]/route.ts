import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

function sanitizeProgramPayload(body: Record<string, unknown> | null | undefined) {
  return {
    university_id: typeof body?.university_id === "string" ? body.university_id : null,
    name: typeof body?.name === "string" ? body.name : "",
    level: typeof body?.level === "string" ? body.level : "",
    duration: typeof body?.duration === "string" ? body.duration : "",
    tuition: typeof body?.tuition === "string" ? body.tuition : "",
    description: typeof body?.description === "string" ? body.description : "",
    requirements: Array.isArray(body?.requirements)
      ? body.requirements.filter((item): item is string => typeof item === "string")
      : [],
  };
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as Record<string, unknown>;
    const payload = sanitizeProgramPayload(body);
    
    console.log("Updating program with data:", body);
    
    const { data, error } = await supabaseAdmin
      .from("programs")
      .update(payload)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase error updating program:", error);
      return NextResponse.json(
        { error: error.message, details: error },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Program not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data[0]);
  } catch (error: unknown) {
    console.error("Failed to update program:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update program" },
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
  } catch (error: unknown) {
    console.error("Failed to delete program:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete program" },
      { status: 500 }
    );
  }
}

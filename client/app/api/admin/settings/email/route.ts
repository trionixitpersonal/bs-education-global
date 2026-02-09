import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("email_settings")
      .select("*")
      .eq("is_active", true)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "no rows returned" - not an error in this case
      console.error("Error fetching email settings:", error);
    }

    return NextResponse.json(data || null);
  } catch (error) {
    console.error("Failed to fetch email settings:", error);
    return NextResponse.json(null);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // First, check if settings exist
    const { data: existing } = await supabaseAdmin
      .from("email_settings")
      .select("id")
      .limit(1)
      .single();

    let result;

    if (existing) {
      // Update existing settings
      const { data, error } = await supabaseAdmin
        .from("email_settings")
        .update({
          ...body,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Insert new settings
      const { data, error } = await supabaseAdmin
        .from("email_settings")
        .insert([body])
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Failed to save email settings:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save email settings" },
      { status: 500 }
    );
  }
}

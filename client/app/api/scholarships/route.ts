import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("scholarships")
      .select("*")
      .order("deadline", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Failed to fetch scholarships:", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabaseAdmin
      .from("scholarships")
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error("Supabase error creating scholarship:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create scholarship:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create scholarship" },
      { status: 500 }
    );
  }
}

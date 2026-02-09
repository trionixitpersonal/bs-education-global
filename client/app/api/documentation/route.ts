import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("document_guides")
      .select("*")
      .order("country", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Failed to fetch documentation guides:", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabaseAdmin
      .from("document_guides")
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error("Error creating documentation guide:", error);
      throw error;
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Failed to create documentation guide:", error);
    return NextResponse.json(
      { error: "Failed to create documentation guide" },
      { status: 500 }
    );
  }
}

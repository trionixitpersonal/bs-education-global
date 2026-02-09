import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("country_requirements")
      .select("*")
      .order("country", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching country requirements:", error);
    return NextResponse.json(
      { error: "Failed to fetch country requirements" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabaseAdmin
      .from("country_requirements")
      .insert([body])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Error creating country requirement:", error);
    return NextResponse.json(
      { error: "Failed to create country requirement" },
      { status: 500 }
    );
  }
}

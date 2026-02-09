import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("interview_preparation")
      .select("*")
      .order("category", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching interview preparation:", error);
    return NextResponse.json(
      { error: "Failed to fetch interview preparation" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabaseAdmin
      .from("interview_preparation")
      .insert([body])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Error creating interview preparation:", error);
    return NextResponse.json(
      { error: "Failed to create interview preparation" },
      { status: 500 }
    );
  }
}

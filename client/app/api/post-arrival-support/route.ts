import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("post_arrival_support")
      .select("*")
      .order("category", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching post arrival support:", error);
    return NextResponse.json(
      { error: "Failed to fetch post arrival support" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabaseAdmin
      .from("post_arrival_support")
      .insert([body])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Error creating post arrival support:", error);
    return NextResponse.json(
      { error: "Failed to create post arrival support" },
      { status: 500 }
    );
  }
}

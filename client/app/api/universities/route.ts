import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function GET() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("Missing Supabase configuration");
      return NextResponse.json([], { status: 200 });
    }

    const { data, error } = await supabaseAdmin
      .from("universities")
      .select("*")
      .order("ranking", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(data || [], { status: 200 });
  } catch (error) {
    console.error("Failed to fetch universities:", error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabaseAdmin
      .from("universities")
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error("Error creating university:", error);
      throw error;
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Failed to create university:", error);
    return NextResponse.json(
      { error: "Failed to create university" },
      { status: 500 }
    );
  }
}

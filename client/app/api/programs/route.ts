import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("programs")
      .select(`
        *,
        universities (
          id,
          name
        )
      `)
      .order("name", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Failed to fetch programs:", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log("Creating program with data:", body);
    
    // Check for duplicates: same university + name + level
    if (body.university_id && body.name && body.level) {
      const { data: existingPrograms, error: checkError } = await supabaseAdmin
        .from("programs")
        .select("*")
        .eq("university_id", body.university_id)
        .eq("name", body.name)
        .eq("level", body.level);

      if (checkError) {
        console.error("Error checking for duplicates:", checkError);
      } else if (existingPrograms && existingPrograms.length > 0) {
        return NextResponse.json(
          { 
            error: "Duplicate program detected", 
            message: `This program (${body.name} - ${body.level}) already exists for this university.` 
          },
          { status: 409 }
        );
      }
    }
    
    const { data, error } = await supabaseAdmin
      .from("programs")
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error("Supabase error creating program:", error);
      return NextResponse.json(
        { error: error.message, details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create program:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create program" },
      { status: 500 }
    );
  }
}

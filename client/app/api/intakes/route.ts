import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("intakes")
      .select("id, name, start_date, end_date")
      .eq("is_active", true)
      .order("start_date");

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Error fetching intakes:", error);
    return NextResponse.json(
      { error: "Failed to fetch intakes" },
      { status: 500 }
    );
  }
}

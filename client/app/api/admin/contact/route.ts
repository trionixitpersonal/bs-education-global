import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    let query = supabaseAdmin
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (type && type !== "all") {
      query = query.eq("type", type);
    }

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching contact submissions:", error);
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Failed to fetch contact submissions:", error);
    return NextResponse.json([]);
  }
}

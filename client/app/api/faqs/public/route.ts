import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

// Public endpoint - only returns active FAQs
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("faqs")
      .select("id, question, answer, category, order_index")
      .eq("is_active", true)
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Failed to fetch public FAQs:", error);
    return NextResponse.json([]);
  }
}

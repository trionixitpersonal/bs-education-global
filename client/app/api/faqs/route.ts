import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function GET() {
  try {
    // Admin endpoint - returns all FAQs
    const { data, error } = await supabaseAdmin
      .from("faqs")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Failed to fetch FAQs:", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Set default values if not provided
    const faqData = {
      ...body,
      is_active: body.is_active !== undefined ? body.is_active : true,
      order_index: body.order_index || 0
    };
    
    const { data, error } = await supabaseAdmin
      .from("faqs")
      .insert([faqData])
      .select()
      .single();

    if (error) {
      console.error("Error creating FAQ:", error);
      throw error;
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Failed to create FAQ:", error);
    return NextResponse.json(
      { error: "Failed to create FAQ" },
      { status: 500 }
    );
  }
}

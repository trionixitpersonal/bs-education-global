import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions);
    if (!session?.user || ((session.user as any).role !== "admin" && (session.user as any).role !== "super_admin")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status"); // "pending", "approved", "all"

    let query = supabaseAdmin
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (status === "pending") {
      query = query.eq("is_approved", false).neq("role", "admin").neq("role", "super_admin");
    } else if (status === "approved") {
      query = query.eq("is_approved", true);
    }

    const { data: users, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to fetch users" },
        { status: 500 }
      );
    }

    return NextResponse.json({ users }, { status: 200 });
  } catch (error: any) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions);
    if (!session?.user || ((session.user as any).role !== "admin" && (session.user as any).role !== "super_admin")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { userId, approved } = body;

    if (!userId || approved === undefined) {
      return NextResponse.json(
        { error: "userId and approved status are required" },
        { status: 400 }
      );
    }

    console.log(`Updating user ${userId} approval status to ${approved}`);

    const { data: user, error } = await supabaseAdmin
      .from("profiles")
      .update({ is_approved: approved })
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      console.error("Supabase error updating user:", error);
      return NextResponse.json(
        { error: error.message || "Failed to update user" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: `User ${approved ? "approved" : "rejected"}`, user },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Failed to update user:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update user" },
      { status: 500 }
    );
  }
}

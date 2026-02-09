import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const userId = (session.user as any).id;

    // Get the document to verify ownership and get file URL
    const { data: document, error: dbError } = await supabaseAdmin
      .from("documents")
      .select("file_url")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (dbError || !document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    if (!document.file_url || document.file_url === "placeholder-url") {
      return NextResponse.json({ error: "File not available" }, { status: 404 });
    }

    // Create a signed URL valid for 60 seconds
    const { data, error } = await supabaseAdmin.storage
      .from('documents')
      .createSignedUrl(document.file_url, 60);

    if (error) {
      console.error("Error creating signed URL:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ signedUrl: data.signedUrl });
  } catch (error: any) {
    console.error("Failed to get document URL:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get document URL" },
      { status: 500 }
    );
  }
}
